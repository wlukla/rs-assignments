import {
  feelsLikeElement, windElement, humidityElement, threeDaysDayElements, dateElement,
} from './weather';
import { lonElement, latElement, cityElement } from './location';

const dropdownElement = document.querySelector('.lang-dropdown');
const langElements = document.querySelectorAll('.lang-dropdown__item');
const langButton = document.querySelector('.current');
const currentLangElement = document.querySelector('.current__lang');
const headingElement = document.querySelector('.weather-info__heading');
const TRANSLATE_KEY = '32ced2e24bb04d0380649acdc1688faa';

const dict = [
  ['Overcast', 'Прогноз', 'Прогноз'],
  ['Feels like:', 'Ощущается как:', 'Відчувається як:'],
  ['Wind:', 'Ветер:', 'Вітер:'],
  ['Humidity:', 'Влажность:', 'Вологість:'],
  ['Longitude', 'Долгота:', 'Довгота:'],
  ['Latitude:', 'Широта:', 'Широта:'],
];

const dayDict = [
  ['Mon', 'Пн', 'Пн'],
  ['Tue', 'Вт', 'Вт'],
  ['Wed', 'Ср', 'Ср'],
  ['Thu', 'Чт', 'Чт'],
  ['Fri', 'Пт', 'Пт'],
  ['Sat', 'Сб', 'Сб'],
  ['Sun', 'Вс', 'Нд'],
];

const monthDict = [
  ['Jan', 'Янв', 'Січ'],
  ['Feb', 'Фев', 'Лют'],
  ['Mar', 'Мар', 'Бер'],
  ['Apr', 'Апр', 'Кві'],
  ['May', 'Май', 'Тра'],
  ['Jun', 'Июнь', 'Чер'],
  ['Jul', 'Июль', 'Лип'],
  ['Aug', 'Авг', 'Сер'],
  ['Sep', 'Сен', 'Вер'],
  ['Oct', 'Окт', 'Жов'],
  ['Nov', 'Ноя', 'Лис'],
  ['Dec', 'Дек', 'Груд'],
];

const langArr = [
  'en-US', 'ru-RU', 'uk-UA',
];

function showHideDropdown() {
  if (dropdownElement.classList.contains('lang-dropdown_active')) {
    dropdownElement.classList.remove('lang-dropdown_active');
  } else {
    dropdownElement.classList.add('lang-dropdown_active');
  }
}

function changeCurrent(elem) {
  currentLangElement.innerHTML = elem.innerHTML;
  showHideDropdown();
}

function getCityData(lang) {
  const city = cityElement.innerHTML.split(', ')[0];
  const url = `https://api.opencagedata.com/geocode/v1/json?key=${TRANSLATE_KEY}&q=${city}&language=${lang}`;
  const data = fetch(url).then((res) => res.json());
  return data;
}

async function changeElements(i) {
  headingElement.innerHTML = dict[0][i];

  const feelsLikeElementText = feelsLikeElement.innerHTML.split(':');
  feelsLikeElementText[0] = dict[1][i];
  feelsLikeElement.innerHTML = feelsLikeElementText.join('');

  const windElementText = windElement.innerHTML.split(':');
  windElementText[0] = dict[2][i];
  windElement.innerHTML = windElementText.join('');

  const humidityElementText = humidityElement.innerHTML.split(':');
  humidityElementText[0] = dict[3][i];
  humidityElement.innerHTML = humidityElementText.join('');

  for (let d = 0; d < threeDaysDayElements.length; d += 1) {
    for (let j = 0; j < dayDict.length; j += 1) {
      if (dayDict[j].includes(threeDaysDayElements[d].innerHTML)) {
        threeDaysDayElements[d].innerHTML = dayDict[j][i];
      }
    }
  }

  const lon = lonElement.innerHTML.split(' ')[1];
  lonElement.innerHTML = `${dict[4][i]} ${lon}`;

  const lat = latElement.innerHTML.split(' ')[1];
  latElement.innerHTML = `${dict[5][i]} ${lat}`;

  window.localStorage.setItem('lang', i);
}

async function translateCity() {
  const langIndex = window.localStorage.getItem('lang');
  const data = await getCityData(langArr[langIndex]);
  cityElement.innerHTML = data.results[0].formatted;
}

function translateDate() {
  const langIndex = window.localStorage.getItem('lang');
  const dateArr = dateElement.innerHTML.split(' ');

  for (let j = 0; j < dayDict.length; j += 1) {
    if (dayDict[j].includes(dateArr[0])) {
      dateArr[0] = dayDict[j][langIndex];
    }
  }

  for (let j = 0; j < monthDict.length; j += 1) {
    if (monthDict[j].includes(dateArr[1])) {
      dateArr[1] = monthDict[j][langIndex];
    }
  }

  dateElement.innerHTML = dateArr.join(' ');
}

export {
  dropdownElement, showHideDropdown, langButton, changeCurrent, langElements, changeElements,
  dayDict, currentLangElement, translateCity, translateDate,
};
