import './style.scss';
import 'normalize.css';
import * as Netlify from './netlify';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let ctxScale = 4;

const colorSwitcher = document.querySelector('.color__icon_current');
const prevColor = document.querySelector('.color__icon_prev');
const red = document.querySelector('.color__icon_red');
const blue = document.querySelector('.color__icon_blue');
let lastColor = colorSwitcher.value;

const toolButtons = document.querySelectorAll('.sheet__tool');
const [fill, pick, pencil, eraser, stroke] = toolButtons;
let instrument = null;
let isDrawing = false;

const penSizesContainer = document.querySelector('.pen-sizes');
const penSizesElements = document.querySelectorAll('.pen-sizes__item');
let penSize = ctxScale;

const sizeButtons = document.querySelectorAll('.sheet__size-switcher');
const [size128Button, size64Button, size32Button] = sizeButtons;

const strokeData = {
  x1: null,
  y1: null,
  x2: null,
  y2: null,
};

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
  } else if (e.path.includes(stroke)) {
    instrument = 4;
    makeActive(stroke);
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

function fillArea(startX, startY) {
  const colorLayer = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixelStack = [[startX, startY]];
  const initialPos = (startY * 4) * canvas.width + startX * 4;
  const startR = colorLayer.data[initialPos];
  const startG = colorLayer.data[initialPos + 1];
  const startB = colorLayer.data[initialPos + 2];

  const fillColorR = parseInt(colorSwitcher.value.slice(1, 3), 16);
  const fillColorG = parseInt(colorSwitcher.value.slice(3, 5), 16);
  const fillColorB = parseInt(colorSwitcher.value.slice(5, 7), 16);

  function matchStartColor(pixelPos) {
    const r = colorLayer.data[pixelPos];
    const g = colorLayer.data[pixelPos + 1];
    const b = colorLayer.data[pixelPos + 2];

    return (r === startR && g === startG && b === startB);
  }

  function colorPixel(pixelPos) {
    colorLayer.data[pixelPos] = fillColorR;
    colorLayer.data[pixelPos + 1] = fillColorG;
    colorLayer.data[pixelPos + 2] = fillColorB;
    colorLayer.data[pixelPos + 3] = 255;
  }

  while (pixelStack.length) {
    let reachLeft = false;
    let reachRight = false;
    const drawingBoundTop = 0;
    const newPos = pixelStack.pop();
    const x = newPos[0];
    let y = newPos[1];
    let pixelPos = (y * canvas.width + x) * 4;
    pixelPos = (y * canvas.width + x) * 4;
    while (y - 1 >= drawingBoundTop && matchStartColor(pixelPos)) {
      y -= 1;
      pixelPos -= canvas.width * 4;
    }
    pixelPos += canvas.width * 4;
    y += 1;
    while ((y + 1) < canvas.height - 1 && matchStartColor(pixelPos)) {
      y += 1;
      colorPixel(pixelPos);

      if (x > 0) {
        if (matchStartColor(pixelPos - 4)) {
          if (!reachLeft) {
            pixelStack.push([x - 1, y]);
            reachLeft = true;
          }
        } else if (reachLeft) {
          reachLeft = false;
        }
      }

      if (x < canvas.width - 1) {
        if (matchStartColor(pixelPos + 4)) {
          if (!reachRight) {
            pixelStack.push([x + 1, y]);
            reachRight = true;
          }
        } else if (reachRight) {
          reachRight = false;
        }
      }

      pixelPos += canvas.width * 4;
    }
  }
  ctx.putImageData(colorLayer, 0, 0);
}

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

canvas.addEventListener('click', (e) => {
  if (instrument === 0) {
    fillArea(e.offsetX, e.offsetY);
  }
});

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;

  if (instrument === 2) {
    drawPixel(e);
  } else if (instrument === 3) {
    erasePixel(e);
  } else if (instrument === 4) {
    strokeData.x1 = e.offsetX;
    strokeData.y1 = e.offsetY;
    console.log(strokeData);
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
  } else if (instrument === 4 && isDrawing) {
    strokeData.x2 = e.offsetX;
    strokeData.y2 = e.offsetY;
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
