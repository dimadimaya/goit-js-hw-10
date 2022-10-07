import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const input = document.querySelector('#search-box');

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
  let searchCountry = event.target.value.trim();
  fetchCountries(searchCountry).then(renderCountryCard).catch(catchError);
}

function renderCountryCard(country) {
  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (country.length > 1) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = createMarckupCountryList(country);
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = createMarckupCountryInfo(country[0]);
  }
}

function catchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function createMarckupCountryList(country) {
  return country
    .map(
      ({ name, flags }) => `
      <li class="country-list-item"><img src="${flags.png}" alt="${name.official}" width="32">${name.official}</li>`
    )
    .join('');
}

function createMarckupCountryInfo(country) {
  const { name, flags, capital, population, languages } = country;
  return `
        <div class="country-info-main">
          <img src="${flags.svg}" alt="${name.official}" width=60 height=40>
          <h2>${name.official}</h2>
        </div>
        <div class="country-info-secondary">
          <p>Capital: ${capital} </p>
          <p>Population: ${population}</p>
          <p>Langueges: ${Object.values(languages)}</p>
        </div>
    `;
}
