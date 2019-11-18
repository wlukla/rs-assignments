import './style.scss';
import 'normalize.css'
import * as Netlify from './netlify';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let ctxScale = 1;
let data = '';

const colorSwitcher = document.querySelector('.color__icon_current');
const prevColor = document.querySelector('.color__icon_prev');
const red = document.querySelector('.color__icon_red');
const blue = document.querySelector('.color__icon_blue');
let lastColor = colorSwitcher.value;

const toolButtons = document.querySelectorAll('.sheet__tool');
const [fill, pick, pencil] = toolButtons;
let instrument = null;
let isDrawing = false;

const input = document.querySelector('.form__text-input');

const sizeButtons = document.querySelectorAll('.sheet__size-switcher');
const [size128Button, size256Button, size512Button] = sizeButtons;

// disable smoothing
ctx.msImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

function changeScale(i) {
  ctxScale = i;
  window.localStorage.setItem('scale', ctxScale);
}

function makeActive(btn) {
  sizeButtons.forEach((button) => button.classList.remove('sheet__size-switcher_active'));
  btn.classList.add('sheet__size-switcher_active');
}

window.onload = () => {
  instrument = 2;
  toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
  pencil.classList.add('sheet__tool_selected');

  // updating everything from storage
  if (localStorage.getItem('data') !== null) {
    // setting last color
    colorSwitcher.value = window.localStorage.getItem('color');

    // setting link to image
    data = window.localStorage.getItem('lastImg');

    // drawing canvas
    const oldImg = new Image();
    oldImg.src = localStorage.getItem('data');
    oldImg.onload = async () => {
      ctxScale = +localStorage.getItem('scale');
      ctx.drawImage(oldImg, 0, 0);
      // highliting last canvas size
      if (ctxScale === 1) {
        makeActive(size512Button);
      } else if (ctxScale === 2) {
        makeActive(size256Button);
      } else if (ctxScale === 4) {
        makeActive(size128Button);
      }
    };
  } else {
    // seting canvas size to 128x128
    changeScale(4);
  }
};

function saveCtx() {
  window.localStorage.setItem('data', canvas.toDataURL());
  window.localStorage.setItem('color', colorSwitcher.value);
}

document.addEventListener('click', (e) => {
  // rewrite with make active

  if (e.path.includes(pencil)) {
    instrument = 2;
    toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
    pencil.classList.add('sheet__tool_selected');
  } else if (e.path.includes(fill)) {
    instrument = 0;
    toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
    fill.classList.add('sheet__tool_selected');
  } else if (e.path.includes(pick)) {
    instrument = 1;
    toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
    pick.classList.add('sheet__tool_selected');
  }
});

function drawPixel(e) {
  const startX = Math.floor(e.offsetX / ctxScale) * ctxScale;
  const startY = Math.floor(e.offsetY / ctxScale) * ctxScale;
  ctx.fillStyle = colorSwitcher.value;
  ctx.fillRect(startX, startY, ctxScale, ctxScale);
}

canvas.addEventListener('click', (e) => {
  if (instrument === 2) {
    drawPixel(e);
  }
  saveCtx();
});

document.addEventListener('click', (e) => {
  // change current color to red
  if (e.target === red) {
    lastColor = red.value;
    prevColor.value = colorSwitcher.value;
    colorSwitcher.value = red.value;
  }
  // change current color to blue
  if (e.target === blue) {
    lastColor = blue.value;
    prevColor.value = colorSwitcher.value;
    colorSwitcher.value = blue.value;
  }
  // change current color to previous color
  if (e.target === prevColor) {
    [prevColor.value, colorSwitcher.value] = [colorSwitcher.value, prevColor.value];
  }
});

canvas.addEventListener('mousedown', (e) => {
  if (instrument === 2) {
    isDrawing = true;
    drawPixel(e);
  }
});

canvas.addEventListener('mouseout', () => {
  if (instrument === 2) {
    isDrawing = false;
  }
  saveCtx();
});

canvas.addEventListener('mousemove', (e) => {
  if (instrument === 2 && isDrawing) {
    drawPixel(e);
  }
});

canvas.addEventListener('mouseup', () => {
  if (instrument === 2) {
    isDrawing = false;
  }
});

document.addEventListener('keydown', (e) => {
  // change instrument with keys
  if (e.code === 'KeyB') {
    instrument = 0;
    toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
    fill.classList.add('sheet__tool_selected');
  } else if (e.code === 'KeyP') {
    instrument = 2;
    toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
    pencil.classList.add('sheet__tool_selected');
  } else if (e.code === 'KeyC') {
    instrument = 1;
    toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
    pick.classList.add('sheet__tool_selected');
  }
});

colorSwitcher.addEventListener('change', () => {
  // update previous color if current changed
  prevColor.value = lastColor;
  lastColor = colorSwitcher.value;
  window.localStorage.setItem('color', lastColor);
});

// unsplash.com access key
const key = '234ecb2a20225f9a826c1c7d1f299dad56d2b0c182718bfbcbe53102ab3b481b';

function getLinkToImage() {
  const city = input.value;
  let url = ['https://api.unsplash.com/photos/random?=&client_id=', key].join('');

  if (city) {
    // update request if city is defined
    url = ['https://api.unsplash.com/photos/random?query=town,', city, '&client_id=', key].join('');
  }

  async function getLink(req) {
    const response = await fetch(req);
    const json = await response.json();
    const link = await json.urls.small;
    return link;
  }

  return getLink(url);
}

let hasImage = false;

function addImage(img) {
  const pixelSize = ctxScale;
  let startX = 0;
  let startY = 0;
  const canvasSize = 512;
  let ws = 0;
  let hs = 0;

  // resize image to fill whole canvas
  if (img.width > img.height) {
    hs = (img.height / img.width) * canvasSize;
    ws = canvasSize;
    startY = (canvasSize - hs) / 2;
  } else if (img.height > img.width) {
    ws = (img.width / img.height) * canvasSize;
    hs = canvasSize;
    startX = (canvasSize - ws) / 2;
  } else {
    ws = canvasSize / pixelSize;
    hs = canvasSize / pixelSize;
  }

  const w = ws / pixelSize;
  const h = hs / pixelSize;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw small image on canvas
  ctx.drawImage(img, startX, startY, w, h);
  // store canvas
  const smallImg = new Image();
  smallImg.src = canvas.toDataURL();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  smallImg.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw small image on whole canvas
    ctx.drawImage(smallImg, startX, startY, w, h, startX, startY, ws, hs);
    saveCtx();
    hasImage = true;
  };
}

function displayImage(link) {
  window.localStorage.setItem('lastImg', link);

  const img = new Image();

  img.onload = () => {
    addImage(img);
    saveCtx();
  };

  img.crossOrigin = 'anonymous';
  img.src = link;
}

const loadButton = document.querySelector('.form__load');

loadButton.addEventListener('click', async () => {
  data = await getLinkToImage();
  displayImage(data);
});

// greyscale
function toGrey() {
  const [width, height] = [canvas.width, canvas.height];
  // getting pixels array from canvas
  const imgPixels = ctx.getImageData(0, 0, width, height);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * 4) * width + x * 4;
      const avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
      imgPixels.data[i] = avg;
      imgPixels.data[i + 1] = avg;
      imgPixels.data[i + 2] = avg;
    }
  }

  ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
}


const BWButton = document.querySelector('.form__bw');
BWButton.addEventListener('click', () => {
  if (hasImage) {
    toGrey();
  } else {
    alert('Load image first');
  }
});

size128Button.addEventListener('click', () => {
  makeActive(size128Button);
  changeScale(4);
  displayImage(data);
  saveCtx();
});

size256Button.addEventListener('click', () => {
  makeActive(size256Button);
  changeScale(2);
  displayImage(data);
  saveCtx();
});

size512Button.addEventListener('click', () => {
  makeActive(size512Button);
  changeScale(1);
  displayImage(data);
  saveCtx();
});

// prevent form from reloading
const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
});

// github authorization
const loginBtn = document.querySelector('.menu__login');
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const authenticator = new Netlify.Default({});
  authenticator.authenticate({ provider: 'github', scope: 'user' }, (err, d) => {
    if (err) {
      alert(['Error Authenticating with GitHub: ', err].join(''));
    } else {
      alert(['Authenticated with GitHub. Access Token: ', d.token].join(''));
    }
  });
});
