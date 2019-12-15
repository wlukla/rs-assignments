import {
  feelsLikeElement, windElement, humidityElement, threeDaysDayElements,
} from './weather';

const dropdownElement = document.querySelector('.lang-dropdown');
const langElements = document.querySelectorAll('.lang-dropdown__item');
const langButton = document.querySelector('.current');
const currentLangElement = document.querySelector('.current__lang');
const headingElement = document.querySelector('.weather-info__heading');

const dict = [
  ['Overcast', 'Прогноз', 'Прогноз'],
  ['Feels like:', 'Ощущается как:', 'Відчувається як:'],
  ['Wind:', 'Ветер:', 'Вітер:'],
  ['Humidity:', 'Влажность:', 'Вологість:'],
];

const dayDict = [
  ['Mon', 'Пн', 'Пн'],
  ['Tue', 'Вт', 'Вт'],
  ['Wen', 'Ср', 'Ср'],
  ['Thu', 'Чт', 'Чт'],
  ['Fri', 'Пт', 'Пт'],
  ['Sat', 'Сб', 'Сб'],
  ['Sun', 'Вс', 'Нд'],
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

function changeElements(i) {
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
      if (threeDaysDayElements[d].innerHTML === dayDict[j][0]) {
        threeDaysDayElements[d].innerHTML = dayDict[j][i];
      }
    }
  }
}

export {
  dropdownElement, showHideDropdown, langButton, changeCurrent, langElements, changeElements,
  dayDict,
};
