const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(element){
  this.element = element;
};

// 2: sub to Countries loaded and populates dropdown
SelectView.prototype.bindEvents = function(){
  PubSub.subscribe('Country:countries-loaded', (evt) => {
    const allCountries = evt.detail; //is .detail correct here?
    this.populate(allCountries);
  });

  // 3: user makes selection, trigger a publish (Selectview Change)
  this.element.addEventListener('change', (evt) => {
    const selectedIndex = evt.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  });
};

// gets used in 2
SelectView.prototype.populate = function(countryData){
  countryData.forEach((country, index) => {
    const option = document.createElement('option');
    option.textContent = country.name;
    option.value = index;
    this.element.appendChild(option);
  })
}

module.exports = SelectView;
