const Country = require('./models/country.js');
const CountryView = require('./views/country_view.js');
const SelectView = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const selectElement = document.querySelector('select#countries');
  const countryDropdown = new SelectView(selectElement);
  countryDropdown.bindEvents();

  const country = new Country();
  country.getData();

  const countryList = document.querySelector('div#country');
  const countryView = new CountryView(countryList);
  countryView.bindEvents();
});
