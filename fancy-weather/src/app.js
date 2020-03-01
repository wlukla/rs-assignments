import './render';
import 'normalize.css';
import './style.scss';
import * as Location from './location';
import * as Weather from './weather';
import * as Background from './background';
import updateMap from './map';
import * as VoiceInput from './voice-input';
import * as Translate from './translate';

import './assets/img/weather-icons/id2.svg';
import './assets/img/weather-icons/id3.svg';
import './assets/img/weather-icons/id5.svg';
import './assets/img/weather-icons/id6.svg';
import './assets/img/weather-icons/id7.svg';
import './assets/img/weather-icons/id8.svg';
import './assets/img/weather-icons/id80.svg';

import './assets/img/arrow-down.svg';
import './assets/img/refresh-icon.svg';
import './assets/img/voice-input.svg';

window.addEventListener('load', async () => {
  await Location.setUserPosition();
  const city = Location.cityElement.innerHTML.replace(' ', '');
  const data = await Weather.loadTemp(city);
  Background.updateBackground();

  if (window.localStorage.getItem('lang')) {
    const lang = window.localStorage.getItem('lang');
    Translate.changeCurrent(Translate.langElements[lang]);
    Translate.changeElements(lang);
    Translate.showHideDropdown();
    Translate.translateDate();
    Translate.translateCity();
  } else {
    Translate.changeElements(0);
  }

  const grad = window.localStorage.getItem('grad');
  if (grad === 'F') {
    Weather.toFarenheit();
  }
  updateMap(data);
});

window.addEventListener('keydown', async (e) => {
  if (document.activeElement === Weather.input
    && e.key === 'Enter') {
    const city = await Translate.getCityName();
    const data = await Weather.updateTemp(city);
    Background.updateBackground();
    updateMap(data);
    Translate.translateDate();
    Translate.translateCity();
  }
});

Weather.searchButton.addEventListener('click', async () => {
  const city = await Translate.getCityName();
  const data = await Weather.updateTemp(city);
  Background.updateBackground();
  updateMap(data);
  Translate.translateDate();
  Translate.translateCity();
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

VoiceInput.voiceInputElement.addEventListener('click', () => {
  VoiceInput.startDicating();
});

Translate.langButton.addEventListener('click', () => {
  Translate.showHideDropdown();
});

Translate.langElements[0].addEventListener('click', () => {
  Translate.changeCurrent(Translate.langElements[0]);
  Translate.changeElements(0);
  Translate.translateDate();
  Translate.translateCity();
});

Translate.langElements[1].addEventListener('click', () => {
  Translate.changeCurrent(Translate.langElements[1]);
  Translate.changeElements(1);
  Translate.translateDate();
  Translate.translateCity();
});

Translate.langElements[2].addEventListener('click', () => {
  Translate.changeCurrent(Translate.langElements[2]);
  Translate.changeElements(2);
  Translate.translateDate();
  Translate.translateCity();
});
