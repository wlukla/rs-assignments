import { cityElement } from './location';

const refreshButton = document.querySelector('.refresh-button');

const UNSPLASH_KEY = '234ecb2a20225f9a826c1c7d1f299dad56d2b0c182718bfbcbe53102ab3b481b';

async function getLink() {
  const city = cityElement.innerHTML.replace(' ', '');
  const url = `https://api.unsplash.com/photos/random?query=city,${city}'&client_id=${UNSPLASH_KEY}`;

  const data = await fetch(url).then((res) => res.json());
  const link = data.urls.full;

  return link;
}

function setBackground(link) {
  document.body.style.backgroundImage = `url('${link}')`;
}

async function updateBackground() {
  const link = await getLink();
  setBackground(link);
}

export { updateBackground, refreshButton };
