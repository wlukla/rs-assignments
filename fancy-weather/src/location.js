const IP_TOKEN = '116408751d826f';
const lonElement = document.querySelector('.location__lon');
const latElement = document.querySelector('.location__lat');
const cityElement = document.querySelector('.head__city');

async function getLocation() {
  const url = `https://ipinfo.io/?token=${IP_TOKEN}`;
  const data = await fetch(url).then((res) => res.json());

  return data;
}

function setCoordinates(data) {
  const [lon, lat] = data.loc.split(',');
  lonElement.innerHTML = `Longitude: ${lon}`;
  latElement.innerHTML = `Latitude: ${lat}`;
}

function setCity(data) {
  const city = `${data.city}, ${data.country}`;
  cityElement.innerHTML = city;
}

async function setUserPosition() {
  const data = await getLocation();
  setCoordinates(data);
  setCity(data);
}

export {
  setUserPosition, cityElement, latElement, lonElement,
};
