const PubSub = require('../helpers/pub_sub.js');

const CountryView = function (list) {
  this.list = list;
}

// this page purely receives the JSON data via the API and only renders it to the page
CountryView.prototype.bindEvents = function () {
  PubSub.subscribe('Country:selected-country-ready', (evt) => {
    const country = evt.detail;
    this.render(country);
    console.log(country);
  });
};

CountryView.prototype.render = function (country) {
  const info = document.createElement('p');
  const flag = document.createElement('img');
  info.textContent = `${country.name} is situated in the ${country.region} region.`;
  flag.src = country.flag;
  flag.alt = country.name;
  this.list.appendChild(info);
  this.list.appendChild(flag);
}

module.exports = CountryView;


// //6: responds to animal ready --> renders the output on the screen
// AnimalInfoView.prototype.bindEvents = function(){
//   PubSub.subscribe('Animals:selected-animal-ready', (evt) => {
//     const animal = evt.detail;
//     this.render(animal);
//   });
// };
// gets used in 6
// AnimalInfoView.prototype.render = function(animal){
//   const infoParagraph = document.createElement('p');
//   infoParagraph.textContent = `The ${animal.species}, of class '${animal.class}', has a maximum speed of ${animal.maxSpeed} km/h.`;
//   this.container.innerHTML = '';
//   this.container.appendChild(infoParagraph);
// };
