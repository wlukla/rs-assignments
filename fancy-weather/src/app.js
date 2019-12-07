import 'normalize.css';
import './style.scss';
import setUserLocation from './location';

window.addEventListener('load', () => {
  setUserLocation();
});
