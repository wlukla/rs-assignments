import { cityElement, lonElement, latElement } from './location';

const WEATHER_KEY = 'fb91c1e036059dcec537578ece8cdcf8';
const input = document.querySelector('.search__input');
const todayTempElement = document.querySelector('.current-weather__grad');
const searchButton = document.querySelector('.search__button');
const feelsLikeElement = document.querySelector('.weather-info__feels-like');
const windElement = document.querySelector('.weather-info__wind');
const humidityElement = document.querySelector('.weather-info__humidity');
const timeElement = document.querySelector('.head__time');
const dateElement = document.querySelector('.head__date');
const threeDaysTempElements = document.querySelectorAll('.bottom__grad');
const threeDaysDayElements = document.querySelectorAll('.day__name');
const todayIconElement = document.querySelector('.current-weather__img');
const threeDaysIconElements = document.querySelectorAll('.bottom__img');
const gradButtons = document.querySelectorAll('.grad-switch-button__item');

function getFeelsLikeCelsius(temp, hum) {
  return Math.round(-8.78469475556
    + 1.61139411 * temp
    + 2.33854883889 * hum
    - 0.14611605 * temp * hum
    - 0.012308094 * temp ** 2
    - 0.0164248277778 * hum ** 2 + 0.002211732 * hum * temp ** 2
    + 0.00072546 * temp * hum ** 2 - 0.000003582 * temp ** 2 * hum ** 2);
}

function celsiusToFarenheit(temp) {
  return Math.round((Number(temp) * (9 / 5)) + 32);
}

function farenheitToCelsius(temp) {
  return Math.round((Number(temp) - 32) * (5 / 9));
}

async function getWeatherDataByInput() {
  const city = input.value;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${WEATHER_KEY}&units=metric`;

  const data = await fetch(url).then((res) => res.json());
  return data;
}

async function getWeatherDataByUserPosition(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${WEATHER_KEY}&units=metric`;

  const data = await fetch(url).then((res) => res.json());
  return data;
}

function setLocation(data) {
  const city = data.city.name;
  const { country } = data.city;

  cityElement.innerHTML = `${city}, ${country}`;
}

function setTodayTemperature(data) {
  const tempInfo = data.list[0];

  const { temp, humidity } = tempInfo.main;
  const wind = tempInfo.wind.speed;
  const feelsLike = getFeelsLikeCelsius(temp, humidity / 100);

  todayTempElement.innerHTML = `${Math.round(temp)}°`;

  const wordFeelsLike = feelsLikeElement.innerHTML.split(':')[0];
  feelsLikeElement.innerHTML = `${wordFeelsLike}: ${feelsLike}°`;

  const wordWind = windElement.innerHTML.split(':')[0];
  windElement.innerHTML = `${wordWind}: ${wind} m/s`;

  const wordHumidity = humidityElement.innerHTML.split(':')[0];
  humidityElement.innerHTML = `${wordHumidity}: ${humidity}%`;
}

function setTime(data) {
  const { timezone } = data.city;
  const date = new Date();
  let hours = date.getUTCHours() + timezone / 60 / 60;
  const minutes = date.getUTCMinutes();

  if (hours > 23) {
    hours -= 24;
  }

  const time = `${hours}:${minutes}`;
  timeElement.innerHTML = `${time}`;
}

function setDate(data) {
  const date = `${new Date(data.list[0].dt * 1000)
    .toString()
    .split(' ')
    .slice(0, 3)
    .join(' ')},`;
  dateElement.innerHTML = date;
}

function setThreeDaysIcons(weatherArr) {
  for (let i = 0; i < threeDaysIconElements.length; i += 1) {
    let weatherId = weatherArr[i].weather[0].id;

    if (weatherId > 800) {
      weatherId = 80;
    } else {
      weatherId = Math.floor(weatherId / 100);
    }

    const path = `assets/img/id${weatherId}.svg`;
    threeDaysIconElements[i].src = path;
  }
}

function setThreeDaysNames(data) {
  const todayDate = new Date().getDate();
  const weatherArr = data.list.filter((el) => {
    const dayDate = Number(new Date(el.dt).getDate());
    const dayHours = Number(el.dt_txt.slice(11, 13));
    return dayDate !== todayDate && dayHours === 15;
  });

  for (let i = 0; i < threeDaysTempElements.length; i += 1) {
    threeDaysDayElements[i].innerHTML = `${new Date(weatherArr[i].dt * 1000)
      .toString()
      .slice(0, 3)}`;
  }
}

function setThreeDaysTemperature(data) {
  const todayDate = new Date().getDate();
  const weatherArr = data.list.filter((el) => {
    const dayDate = Number(new Date(el.dt).getDate());
    const dayHours = Number(el.dt_txt.slice(11, 13));
    return dayDate !== todayDate && dayHours === 15;
  });

  for (let i = 0; i < threeDaysTempElements.length; i += 1) {
    threeDaysTempElements[i].innerHTML = `${Math.round(weatherArr[i].main.temp)}°`;
  }

  setThreeDaysIcons(weatherArr);
}

function setTodayIcon(data) {
  const tempInfo = data.list[0];
  const weatherId = tempInfo.weather[0].id > 800 ? 80 : Math.floor(tempInfo.weather[0].id / 100);
  const weatherIconPath = `assets/img/id${weatherId}.svg`;

  todayIconElement.src = weatherIconPath;
}

function setCoordinates(data) {
  const { lat, lon } = data.city.coord;
  lonElement.innerHTML = `Longitude: ${lon}`;
  latElement.innerHTML = `Latitude: ${lat}`;
}

async function updateTemp() {
  const data = await getWeatherDataByInput();
  setLocation(data);
  setDate(data);
  setTime(data);
  setTodayTemperature(data);
  setThreeDaysTemperature(data);
  setTodayIcon(data);
  setCoordinates(data);
  input.value = '';
  return data;
}

async function loadTemp(city) {
  const data = await getWeatherDataByUserPosition(city);
  setDate(data);
  setTime(data);
  setTodayTemperature(data);
  setThreeDaysNames(data);
  setThreeDaysTemperature(data);
  setTodayIcon(data);
  setCoordinates(data);
  input.value = '';
  return data;
}

function toFarenheit() {
  if (gradButtons[1].classList.contains('grad-switch-button__item_active')) {
    const todayTempCelsius = todayTempElement
      .innerHTML
      .slice(0, todayTempElement.innerHTML.length - 1);
    const todayTempFarenheit = `${celsiusToFarenheit(todayTempCelsius)}°`;
    todayTempElement.innerHTML = todayTempFarenheit;

    const feelsLikeCelsius = feelsLikeElement
      .innerHTML
      .split(' ')[2]
      .slice(0, feelsLikeElement.innerHTML.split(' ')[2].length - 1);
    const wordFeelsLike = feelsLikeElement.innerHTML.split(':')[0];
    const feelsLikeFarenheit = `${wordFeelsLike}: ${celsiusToFarenheit(feelsLikeCelsius)}°`;
    feelsLikeElement.innerHTML = feelsLikeFarenheit;

    for (let i = 0; i < threeDaysTempElements.length; i += 1) {
      const celsius = threeDaysTempElements[i]
        .innerHTML
        .slice(0, threeDaysTempElements[i].innerHTML.length - 1);
      const farenheit = `${celsiusToFarenheit(celsius)}°`;
      threeDaysTempElements[i].innerHTML = farenheit;
    }

    gradButtons[1].classList.remove('grad-switch-button__item_active');
    gradButtons[0].classList.add('grad-switch-button__item_active');
  }
}

function toCelsius() {
  if (gradButtons[0].classList.contains('grad-switch-button__item_active')) {
    const todayTempFarenheit = todayTempElement
      .innerHTML
      .slice(0, todayTempElement.innerHTML.length - 1);
    const todayTempCelsius = `${farenheitToCelsius(todayTempFarenheit)}°`;
    todayTempElement.innerHTML = todayTempCelsius;

    const feelsLikeFarenheit = feelsLikeElement
      .innerHTML
      .split(' ')[2]
      .slice(0, feelsLikeElement.innerHTML.split(' ')[2].length - 1);
    const wordFeelsLike = feelsLikeElement.innerHTML.split(':')[0];
    const feelsLikeCelsius = `${wordFeelsLike}: ${farenheitToCelsius(feelsLikeFarenheit)}°`;
    feelsLikeElement.innerHTML = feelsLikeCelsius;

    for (let i = 0; i < threeDaysTempElements.length; i += 1) {
      const farenheit = threeDaysTempElements[i]
        .innerHTML
        .slice(0, threeDaysTempElements[i].innerHTML.length - 1);
      const celsius = `${farenheitToCelsius(farenheit)}°`;
      threeDaysTempElements[i].innerHTML = celsius;
    }

    gradButtons[0].classList.remove('grad-switch-button__item_active');
    gradButtons[1].classList.add('grad-switch-button__item_active');
  }
}

export {
  searchButton, updateTemp, loadTemp, gradButtons, toFarenheit, toCelsius, input,
  feelsLikeElement, windElement, humidityElement, threeDaysDayElements,
};
