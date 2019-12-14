import 'normalize.css';
import './style.scss';
import * as Location from './location';
import * as Weather from './weather';
import * as Background from './background';
import './assets/img/weather-icons/id2.svg';
import './assets/img/weather-icons/id3.svg';
import './assets/img/weather-icons/id5.svg';
import './assets/img/weather-icons/id6.svg';
import './assets/img/weather-icons/id7.svg';
import './assets/img/weather-icons/id8.svg';
import './assets/img/weather-icons/id80.svg';

window.addEventListener('load', async () => {
  await Location.setUserPosition();
  const city = Location.cityElement.innerHTML.replace(' ', '');
  await Weather.loadTemp(city);
  Background.updateBackground();
});

Weather.searchButton.addEventListener('click', async () => {
  await Weather.updateTemp();
  Background.updateBackground();
});

Weather.gradButtons[0].addEventListener('click', () => {
  Weather.toFarenheit();
});

Weather.gradButtons[1].addEventListener('click', () => {
  Weather.toCelsius();
});

Background.refreshButton.addEventListener('click', () => {
  Background.updateBackground();
});
