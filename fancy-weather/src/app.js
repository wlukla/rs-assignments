import 'normalize.css';
import './style.scss';
import * as Location from './location';
import * as Weather from './weather';

window.addEventListener('load', async () => {
  await Location.setUserPosition();
  const city = Location.cityElement.innerHTML.replace(' ', '');
  Weather.loadTemp(city);
});

Weather.searchButton.addEventListener('click', () => {
  Weather.updateTemp();
});
