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
  let hours = date.getUTCHours() + timezone / 60 / 60;
  const minutes = date.getUTCMinutes();

  if (hours > 23) {
    hours -= 24;
  }

  const time = `${hours}:${minutes}`;
  timeElement.innerHTML = `${time}`;
}

function setDate(data) {
  const date = `${new Date(data.list[0].dt)
    .toString()
    .split(' ')
    .slice(0, 3)
    .join(' ')},`;
  dateElement.innerHTML = date;
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
    threeDaysDayElements[i].innerHTML = `${new Date(weatherArr[i].dt * 1000)
      .toString()
      .slice(0, 3)}`;
  }
}


async function updateTemp() {
  const data = await getWeatherDataByInput();
  setDate(data);
  setTime(data);
  setTodayTemperature(data);
  setThreeDaysTemperature(data);
}

async function loadTemp(city) {
  const data = await getWeatherDataByUserPosition(city);
  setDate(data);
  setTime(data);
  setTodayTemperature(data);
  setThreeDaysTemperature(data);
}

export { searchButton, updateTemp, loadTemp };
