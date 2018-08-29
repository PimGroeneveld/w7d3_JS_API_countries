const PubSub = require('../helpers/pub_sub.js');

const Country = function () {
  this.text = null;
}

// 1: gets country info via API -> publishes to select_view
Country.prototype.getData = function (){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    if(xhr.status != 200){
      return;
    }
    const jsonString = xhr.responseText; //get response back as string of text
    const data = JSON.parse(jsonString); //convert string back into JSON object
    this.text = data; //sets this.text from above to the actual country
    PubSub.publish("Country:countries-loaded", this.text); //publishes it to country_view
    // console.log(data); //--> this is full list of countries+info
  });
  // initialize
  xhr.open("GET", "https://restcountries.eu/rest/v2/all");
  //add request header: only get JSO back and no HTML
  xhr.setRequestHeader("Accept", "application/json");
  //send request
  xhr.send();

  //4: Selects specific country for presentation
  PubSub.subscribe('SelectView:change', (evt) => {
    const selectedIndex = evt.detail;
    this.publishCountryDetail(selectedIndex);
  });
};

//5: publishes "get country" -> gets index selected by user click and connects specific country info to it
Country.prototype.publishCountryDetail = function(countryIndex){
  const selectedCountry = this.text[countryIndex];
  PubSub.publish('Country:selected-country-ready', selectedCountry)
  // console.log(selectedCountry); //-> gives correct country per index
};

module.exports = Country;
