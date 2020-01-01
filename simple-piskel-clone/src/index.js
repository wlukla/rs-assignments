import './style.scss';
import 'normalize.css';
import * as Netlify from './netlify';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let ctxScale = 1;

const colorSwitcher = document.querySelector('.color__icon_current');
const prevColor = document.querySelector('.color__icon_prev');
const red = document.querySelector('.color__icon_red');
const blue = document.querySelector('.color__icon_blue');
let lastColor = colorSwitcher.value;

const toolButtons = document.querySelectorAll('.sheet__tool');
const [fill, pick, pencil, eraser] = toolButtons;
let instrument = null;
let isDrawing = false;

const penSizesContainer = document.querySelector('.pen-sizes');
const penSizesElements = document.querySelectorAll('.pen-sizes__item');
let penSize = 1;

const sizeButtons = document.querySelectorAll('.sheet__size-switcher');
const [size128Button, size64Button, size32Button] = sizeButtons;

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
  if (btn.classList.contains('size-switcher')) {
    sizeButtons.forEach((button) => button.classList.remove('sheet__size-switcher_active'));
    btn.classList.add('sheet__size-switcher_active');
  } else {
    toolButtons.forEach((button) => button.classList.remove('sheet__tool_selected'));
    btn.classList.add('sheet__tool_selected');
  }
}

window.onload = () => {
  instrument = 2;
  toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
  pencil.classList.add('sheet__tool_selected');

  if (localStorage.getItem('data') !== null) {
    colorSwitcher.value = window.localStorage.getItem('color');

    const oldImg = new Image();
    oldImg.src = localStorage.getItem('data');
    oldImg.onload = async () => {
      ctxScale = +localStorage.getItem('scale');
      ctx.drawImage(oldImg, 0, 0);
    };

    if (ctxScale === 4) {
      makeActive(size128Button);
    } else if (ctxScale === 8) {
      makeActive(size64Button);
    } else if (ctxScale === 16) {
      makeActive(size32Button);
    }
  } else {
    changeScale(4);
  }
};

function saveCtx() {
  window.localStorage.setItem('data', canvas.toDataURL());
  window.localStorage.setItem('color', colorSwitcher.value);
}

document.addEventListener('click', (e) => {
  if (e.path.includes(pencil)) {
    instrument = 2;
    makeActive(pencil);
  } else if (e.path.includes(fill)) {
    instrument = 0;
    makeActive(fill);
  } else if (e.path.includes(pick)) {
    instrument = 1;
    makeActive(pick);
  } else if (e.path.includes(eraser)) {
    instrument = 3;
    makeActive(eraser);
  }

  if (e.path.includes(penSizesContainer)) {
    if ([...penSizesElements].indexOf(e.target) !== -1) {
      const current = e.target;
      penSize = ([...penSizesElements].indexOf(current) + 1) * ctxScale;
    }
  }
});

function drawPixel(e) {
  const startX = Math.floor(e.offsetX / ctxScale) * ctxScale;
  const startY = Math.floor(e.offsetY / ctxScale) * ctxScale;
  ctx.fillStyle = colorSwitcher.value;
  ctx.fillRect(startX, startY, penSize, penSize);
}

function erasePixel(e) {
  const x = Math.floor(e.offsetX / ctxScale) * ctxScale;
  const y = Math.floor(e.offsetY / ctxScale) * ctxScale;
  ctx.clearRect(x, y, penSize, penSize);
}

canvas.addEventListener('click', (e) => {
  if (instrument === 2) {
    drawPixel(e);
  } else if (instrument === 3) {
    erasePixel(e);
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
  isDrawing = true;

  if (instrument === 2) {
    drawPixel(e);
  } else if (instrument === 3) {
    erasePixel(e);
  }
});

canvas.addEventListener('mouseout', () => {
  if (instrument === 2 || instrument === 3) {
    isDrawing = false;
  }
  saveCtx();
});

canvas.addEventListener('mousemove', (e) => {
  if (instrument === 2 && isDrawing) {
    drawPixel(e);
  } else if (instrument === 3 && isDrawing) {
    erasePixel(e);
  }
});

canvas.addEventListener('mouseup', () => {
  if (instrument === 2 || instrument === 3) {
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

size128Button.addEventListener('click', () => {
  makeActive(size128Button);
  changeScale(4);
  saveCtx();
});

size64Button.addEventListener('click', () => {
  makeActive(size64Button);
  changeScale(8);
  saveCtx();
});

size32Button.addEventListener('click', () => {
  makeActive(size32Button);
  changeScale(16);
  saveCtx();
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
