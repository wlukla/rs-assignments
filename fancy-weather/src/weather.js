const WEATHER_KEY = 'fb91c1e036059dcec537578ece8cdcf8';
const input = document.querySelector('.search__input');
const todayTempElement = document.querySelector('.current-weather__grad');
const searchButton = document.querySelector('.search__button');
const feelsLikeElement = document.querySelector('.weather-info__feels-like');
const windElement = document.querySelector('.weather-info__wind');
const humidityElement = document.querySelector('.weather-info__humidity');
const timeElement = document.querySelector('.head__time');
const dateElement = document.querySelector('.head__date');

function getFeelsLikeCelsius(temp, hum) {
  return Math.round(-8.78469475556
    + 1.61139411 * temp
    + 2.33854883889 * hum
    - 0.14611605 * temp * hum
    - 0.012308094 * temp ** 2
    - 0.0164248277778 * hum ** 2 + 0.002211732 * hum * temp ** 2
    + 0.00072546 * temp * hum ** 2 - 0.000003582 * temp ** 2 * hum ** 2);
}

async function getWeatherDataByInput() {
  const city = input.value;
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${WEATHER_KEY}&units=metric`;

  const data = await fetch(url).then((res) => res.json());
  return data;
}

async function getWeatherDataByUserPosition(city) {
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${WEATHER_KEY}&units=metric`;

  const data = await fetch(url).then((res) => res.json());
  return data;
}

function setTodayTemperature(data) {
  const tempInfo = data.list[0];

  const { temp, humidity } = tempInfo.main;
  const wind = tempInfo.wind.speed;
  const feelsLike = getFeelsLikeCelsius(temp, humidity / 100);

  todayTempElement.innerHTML = `${Math.round(temp)}°`;
  feelsLikeElement.innerHTML = `Feels like: ${feelsLike}°`;
  windElement.innerHTML = `Wind: ${wind} m/s`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
}

function setTime(data) {
  const { timezone } = data.city;
  const date = new Date();
  const hours = date.getUTCHours() + timezone / 60 / 60;
  const minutes = date.getUTCMinutes();

  const time = `${hours}:${minutes}`;
  timeElement.innerHTML = `${time}`;
}

async function updateTemp() {
  const data = await getWeatherDataByInput();
  setTime(data);
  setTodayTemperature(data);
}

async function loadTemp(city) {
  const data = await getWeatherDataByUserPosition(city);
  setTime(data);
  setTodayTemperature(data);
}

export { searchButton, updateTemp, loadTemp };
