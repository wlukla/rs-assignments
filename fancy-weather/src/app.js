import 'normalize.css';
import './style.scss';
import setUserLocation from './location';
import * as Weather from './weather';

window.addEventListener('load', () => {
  setUserLocation();
});

Weather.searchButton.addEventListener('click', () => {
  Weather.updateTemp();
});
