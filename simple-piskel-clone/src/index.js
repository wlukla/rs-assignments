import './style.scss';
import 'normalize.css';
import * as Scale from './canvas/size-switch';
import * as Color from './canvas/color-switch';
import * as Tool from './canvas/tools';
import * as Netlify from './netlify';

const loginBtn = document.querySelector('.menu__login');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let ctxScale = 4;
let lastColor = Color.colorSwitcher.value;
let instrument = null;
let isDrawing = false;
let penSize = ctxScale;

let drawData = {
  x1: null,
  y1: null,
  x2: null,
  y2: null,
};

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

function makeActive(btn) {
  if (btn.classList.contains('size-switcher')) {
    Scale.sizeButtons.forEach((button) => {
      button.classList.remove('sheet__size-switcher_active');
    });

    btn.classList.add('sheet__size-switcher_active');
  } else {
    Tool.toolButtons.forEach((button) => {
      button.classList.remove('sheet__tool_selected');
    });

    btn.classList.add('sheet__tool_selected');
  }
}

window.onload = () => {
  instrument = 2;
  Tool.toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
  Tool.pencil.classList.add('sheet__tool_selected');

  if (localStorage.getItem('data') !== null) {
    Color.colorSwitcher.value = window.localStorage.getItem('color');

    const oldImg = new Image();
    oldImg.src = localStorage.getItem('data');
    oldImg.onload = async () => {
      ctxScale = +localStorage.getItem('scale');
      ctx.drawImage(oldImg, 0, 0);
    };

    if (ctxScale === 4) {
      makeActive(Scale.size128Button);
    } else if (ctxScale === 8) {
      makeActive(Scale.size64Button);
    } else if (ctxScale === 16) {
      makeActive(Scale.size32Button);
    }
  } else {
    Scale.changeScale(4);
    ctxScale = 4;
  }
};

function saveCtx() {
  window.localStorage.setItem('data', canvas.toDataURL());
  window.localStorage.setItem('color', Color.colorSwitcher.value);
}

document.addEventListener('click', (e) => {
  if (e.path.includes(Tool.pencil)) {
    instrument = 2;
    makeActive(Tool.pencil);
  } else if (e.path.includes(Tool.fill)) {
    instrument = 0;
    makeActive(Tool.fill);
  } else if (e.path.includes(Tool.pick)) {
    instrument = 1;
    makeActive(Tool.pick);
  } else if (e.path.includes(Tool.eraser)) {
    instrument = 3;
    makeActive(Tool.eraser);
  } else if (e.path.includes(Tool.stroke)) {
    instrument = 4;
    makeActive(Tool.stroke);
  } else if (e.path.includes(Tool.fillSame)) {
    instrument = 5;
    makeActive(Tool.fillSame);
  }

  if (e.path.includes(Tool.penSizesContainer)) {
    penSize = Tool.changePenSize(e, ctxScale);
  }
});

document.addEventListener('click', (e) => {
  // change current color to predifined
  if (e.target === Color.red || e.target === Color.blue) {
    lastColor = e.target.value;
    Color.setCurrentColor(e.target);
  }
  // change current color to previous color
  if (e.target === Color.prevColor) {
    Color.switchColors();
  }
});

canvas.addEventListener('click', (e) => {
  if (instrument === 0) {
    Tool.fillArea(e.offsetX, e.offsetY, Color.colorSwitcher.value);
  } else if (instrument === 5) {
    Tool.fillPixelsSame(Color.colorSwitcher.value);
  }

  saveCtx();
});

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;

  if (instrument === 2) {
    drawData.x1 = e.offsetX;
    drawData.y1 = e.offsetY;
    Tool.drawPixel(e, ctxScale, penSize, Color.colorSwitcher.value);
  } else if (instrument === 3) {
    Tool.erasePixel(e, ctxScale, penSize);
  } else if (instrument === 4) {
    strokeData.x1 = e.offsetX;
    strokeData.y1 = e.offsetY;
    Tool.drawPixel(e, ctxScale, penSize, Color.colorSwitcher.value);
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
    drawData.x2 = e.offsetX;
    drawData.y2 = e.offsetY;
    drawData = Tool.draw(drawData, Color.colorSwitcher.value, ctxScale, penSize);
  } else if (instrument === 3 && isDrawing) {
    Tool.erasePixel(e, ctxScale, penSize);
  } else if (instrument === 4 && isDrawing) {
    const oldImg = new Image();
    oldImg.src = localStorage.getItem('data');
    oldImg.onload = async () => {
      ctxScale = +localStorage.getItem('scale');
      ctx.drawImage(oldImg, 0, 0);
      strokeData.x2 = e.offsetX;
      strokeData.y2 = e.offsetY;
      Tool.drawLine(strokeData, ctxScale, penSize, Color.colorSwitcher.value);
    };
    // strokeData.x2 = e.offsetX;
    // strokeData.y2 = e.offsetY;
    // Tool.drawLine(strokeData, ctxScale, penSize, Color.colorSwitcher.value);
  }
});

canvas.addEventListener('mouseup', () => {
  if (instrument === 2 || instrument === 3 || instrument === 4) {
    isDrawing = false;
  }
});

document.addEventListener('keydown', (e) => {
  // change instrument with keys
  if (e.code === 'KeyB') {
    instrument = 0;
    Tool.toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
    Tool.fill.classList.add('sheet__tool_selected');
  } else if (e.code === 'KeyP') {
    instrument = 2;
    Tool.toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
    Tool.pencil.classList.add('sheet__tool_selected');
  } else if (e.code === 'KeyC') {
    instrument = 1;
    Tool.toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
    Tool.pick.classList.add('sheet__tool_selected');
  }
});

Color.colorSwitcher.addEventListener('change', () => {
  // update previous color if current changed
  Color.prevColor.value = lastColor;
  lastColor = Color.colorSwitcher.value;
  window.localStorage.setItem('color', lastColor);
});

Scale.size128Button.addEventListener('click', () => {
  makeActive(Scale.size128Button);
  Scale.changeScale(4);
  ctxScale = 4;
  saveCtx();
});

Scale.size64Button.addEventListener('click', () => {
  makeActive(Scale.size64Button);
  Scale.changeScale(8);
  ctxScale = 8;
  saveCtx();
});

Scale.size32Button.addEventListener('click', () => {
  makeActive(Scale.size32Button);
  Scale.changeScale(16);
  ctxScale = 16;
  saveCtx();
});

// github authorization
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
