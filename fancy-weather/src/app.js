import 'normalize.css';
import './style.scss';
import * as Location from './location';
import * as Weather from './weather';
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
  Weather.loadTemp(city);
});

Weather.searchButton.addEventListener('click', () => {
  Weather.updateTemp();
});
