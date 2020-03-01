const MAP_KEY = 'AIzaSyDdVGeaV2xofDELkV8F_pIf2mz7m8h1-aY';
const mapElement = document.querySelector('.map__iframe');

export default function updateMap(data) {
  const { lat, lon } = data.city.coord;
  const url = `https://www.google.com/maps/embed/v1/view?key=${MAP_KEY}&center=${lat},${lon}&zoom=10`;
  mapElement.src = url;
}
