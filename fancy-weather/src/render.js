export default function render() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  document.body.appendChild(wrapper);

  const left = document.createElement('div');
  left.classList.add('left');
  wrapper.appendChild(left);

  const controlBlock = document.createElement('div');
  controlBlock.classList.add('control-block');
  left.appendChild(controlBlock);

  const refreshButton = document.createElement('div');
  refreshButton.classList.add('refresh-button', 'button');
  controlBlock.appendChild(refreshButton);

  const refreshButtonImg = document.createElement('img');
  refreshButtonImg.classList.add('refresh-button__img');
  refreshButtonImg.setAttribute('src', 'assets/img/refresh-icon.svg');
  refreshButtonImg.setAttribute('alt', 'refresh icon');
  refreshButton.appendChild(refreshButtonImg);

  const langSwitchButton = document.createElement('div');
  langSwitchButton.classList.add('lang-switch-button');
  controlBlock.appendChild(langSwitchButton);

  const current = document.createElement('div');
  current.classList.add('current', 'button');
  langSwitchButton.appendChild(current);

  const currentLang = document.createElement('span');
  currentLang.classList.add('current__lang');
  currentLang.innerHTML = 'EN';
  current.appendChild(currentLang);

  const currentImg = document.createElement('img');
  currentImg.classList.add('current__img');
  currentImg.setAttribute('src', 'assets/img/arrow-down.svg');
  currentImg.setAttribute('alt', 'arrow down icon');
  current.appendChild(currentImg);

  const langDropdown = document.createElement('div');
  langDropdown.classList.add('lang-dropdown');
  langSwitchButton.appendChild(langDropdown);

  const langDropdownItem1 = document.createElement('span');
  langDropdownItem1.classList.add('lang-dropdown__item');
  langDropdownItem1.innerHTML = 'EN';

  const langDropdownItem2 = langDropdownItem1.cloneNode(true);
  langDropdownItem2.innerHTML = 'RU';
  const langDropdownItem3 = langDropdownItem1.cloneNode(true);
  langDropdownItem3.innerHTML = 'UA';
  langDropdown.appendChild(langDropdownItem1);
  langDropdown.appendChild(langDropdownItem2);
  langDropdown.appendChild(langDropdownItem3);

  const gradSwitchButton = document.createElement('div');
  gradSwitchButton.classList.add('grad-switch-button', 'button');
  controlBlock.appendChild(gradSwitchButton);

  const gradSwitchButtonItem1 = document.createElement('span');
  gradSwitchButtonItem1.classList.add('grad-switch-button__item');
  gradSwitchButtonItem1.innerHTML = '°F';
  gradSwitchButton.appendChild(gradSwitchButtonItem1);

  const gradSwitchButtonItem2 = document.createElement('span');
  gradSwitchButtonItem2.classList.add('grad-switch-button__item', 'grad-switch-button__item_active');
  gradSwitchButtonItem2.innerHTML = '°C';
  gradSwitchButton.appendChild(gradSwitchButtonItem2);

  const todayWeatherBlock = document.createElement('div');
  todayWeatherBlock.classList.add('today-weather-block');
  left.appendChild(todayWeatherBlock);

  const head = document.createElement('div');
  head.classList.add('head');
  todayWeatherBlock.appendChild(head);

  const headCity = document.createElement('h2');
  headCity.classList.add('head__city');
  head.appendChild(headCity);

  const headDate = document.createElement('span');
  headDate.classList.add('head__date');
  head.appendChild(headDate);

  const headTime = document.createElement('span');
  headTime.classList.add('head__time');
  head.appendChild(headTime);

  const currentWeather = document.createElement('div');
  currentWeather.classList.add('current-weather');
  todayWeatherBlock.appendChild(currentWeather);

  const currentWeatherGrad = document.createElement('h2');
  currentWeatherGrad.classList.add('current-weather__grad');
  currentWeather.appendChild(currentWeatherGrad);

  const weatherInfo = document.createElement('div');
  weatherInfo.classList.add('weather-info');
  currentWeather.appendChild(weatherInfo);

  const weatherInfoImg = document.createElement('img');
  weatherInfoImg.classList.add('weather-info__img');
  weatherInfoImg.setAttribute('width', '150px');
  weatherInfoImg.setAttribute('height', '150px');
  weatherInfoImg.setAttribute('alt', 'weather icon');
  weatherInfoImg.setAttribute('src', '#');
  weatherInfo.appendChild(weatherInfoImg);


  const weatherInfoHeading = document.createElement('span');
  weatherInfoHeading.classList.add('weather-info__heading', 'weather-info__item');
  weatherInfo.appendChild(weatherInfoHeading);

  const weatherInfoFeelsLike = document.createElement('span');
  weatherInfoFeelsLike.classList.add('weather-info__feels-like', 'weather-info__item');
  weatherInfo.appendChild(weatherInfoFeelsLike);

  const weatherInfoWind = document.createElement('span');
  weatherInfoWind.classList.add('weather-info__wind', 'weather-info__item');
  weatherInfo.appendChild(weatherInfoWind);

  const weatherInfoHumidity = document.createElement('span');
  weatherInfoHumidity.classList.add('weather-info__humidity', 'weather-info__item');
  weatherInfo.appendChild(weatherInfoHumidity);

  const threeDaysBlock = document.createElement('div');
  threeDaysBlock.classList.add('three-days-block');
  left.appendChild(threeDaysBlock);

  const day1 = document.createElement('div');
  day1.classList.add('day');

  const dayName = document.createElement('h3');
  dayName.classList.add('day__name');
  day1.appendChild(dayName);

  const bottom = document.createElement('div');
  bottom.classList.add('bottom');

  const bottomGrad = document.createElement('span');
  bottomGrad.classList.add('bottom__grad');
  bottom.appendChild(bottomGrad);

  const bottomImg = document.createElement('img');
  bottomImg.classList.add('bottom__img');
  bottomImg.setAttribute('src', '#');
  bottomImg.setAttribute('alt', 'weather icon');
  bottomImg.setAttribute('width', '50px');
  bottomImg.setAttribute('height', '50px');
  bottom.appendChild(bottomImg);

  day1.appendChild(bottom);

  const day2 = day1.cloneNode(true);
  const day3 = day1.cloneNode(true);

  threeDaysBlock.appendChild(day1);
  threeDaysBlock.appendChild(day2);
  threeDaysBlock.appendChild(day3);

  const geoBlock = document.createElement('div');
  geoBlock.classList.add('geo-block');
  wrapper.appendChild(geoBlock);

  const search = document.createElement('div');
  search.classList.add('search');
  geoBlock.appendChild(search);

  const input = document.createElement('input');
  input.classList.add('search__input');
  input.setAttribute('type', 'text');
  input.setAttribute('x-webkit-speech', 'true');
  search.appendChild(input);

  const searchImg = document.createElement('img');
  searchImg.classList.add('search__icon');
  searchImg.setAttribute('src', 'assets/img/voice-input.svg');
  searchImg.setAttribute('alt', 'voice input icon');
  searchImg.setAttribute('width', '30');
  searchImg.setAttribute('height', '30');
  search.append(searchImg);

  const searchButton = document.createElement('button');
  searchButton.classList.add('search__button');
  searchButton.innerHTML = 'Search';
  search.append(searchButton);

  const location = document.createElement('div');
  location.classList.add('location');
  geoBlock.appendChild(location);

  const map = document.createElement('div');
  map.classList.add('map');
  location.appendChild(map);

  const mapIframe = document.createElement('iframe');
  mapIframe.classList.add('map__iframe');
  mapIframe.setAttribute('frameborder', '0');
  mapIframe.setAttribute('style', 'border:0');
  mapIframe.setAttribute('allowfullscreen', 'true');
  map.appendChild(mapIframe);

  const locationLon = document.createElement('span');
  locationLon.classList.add('location__lon');
  location.appendChild(locationLon);

  const locationLat = document.createElement('span');
  locationLat.classList.add('location__lat');
  location.appendChild(locationLat);
}
