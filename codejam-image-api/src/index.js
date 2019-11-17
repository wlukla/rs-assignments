import './style.scss';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.msImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
const colorSwitcher = document.querySelector('.color__icon_current');
const prevColor = document.querySelector('.color__icon_prev');
const red = document.querySelector('.color__icon_red');
const blue = document.querySelector('.color__icon_blue');
let lastColor = colorSwitcher.value;

const toolButtons = document.querySelectorAll('.sheet__tool');
const fill = toolButtons[0];
const pick = toolButtons[1];
const pencil = toolButtons[2];
let instrument = null;
let isDrawing = false;
const input = document.querySelector('.form__text-input');

let ctxScale = 1;

function scale(i) {
  ctxScale = i;
  window.localStorage.setItem('scale', ctxScale);
}

window.onload = function () {
  instrument = 2;
  toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
  pencil.classList.add('sheet__tool_selected');

  if (localStorage.getItem('data') !== null) {
    data = window.localStorage.getItem('lastImg');
    const oldImg = new Image();
    oldImg.src = localStorage.getItem('data');
    oldImg.onload = async () => {
      ctxScale = +localStorage.getItem('scale');
      ctx.drawImage(oldImg, 0, 0);
      if (ctxScale === 1) {
        makeActive(size512Button);
      } else if (ctxScale === 2) {
        makeActive(size256Button);
      } else if (ctxScale === 4) {
        makeActive(size128Button);
      }
    };
  } else {
    scale(4);
  }
}

function saveCtx() {
  window.localStorage.setItem('data', canvas.toDataURL());
}

document.addEventListener('click', (e) => {
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

function addPixel(e) {
  const startX = Math.floor(e.offsetX / ctxScale) * ctxScale;
  const startY = Math.floor(e.offsetY / ctxScale) * ctxScale;
  ctx.fillStyle = colorSwitcher.value;
  ctx.fillRect(startX, startY, ctxScale, ctxScale);
}

canvas.addEventListener('click', (e) => {
  // imlement pencil
  if (instrument === 2) {
    addPixel(e);
  }
  saveCtx();
});

document.addEventListener('click', (e) => {
  if (e.target === red) {
    lastColor = red.value;
    prevColor.value = colorSwitcher.value;
    colorSwitcher.value = red.value;
  }

  if (e.target === blue) {
    lastColor = blue.value;
    prevColor.value = colorSwitcher.value;
    colorSwitcher.value = blue.value;
  }

  if (e.target === prevColor) {
    [prevColor.value, colorSwitcher.value] = [colorSwitcher.value, prevColor.value];
  }
});

canvas.addEventListener('mousedown', (e) => {
  if (instrument === 2) {
    isDrawing = true;
    addPixel(e);
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
    addPixel(e);
  }
});

canvas.addEventListener('mouseup', () => {
  if (instrument === 2) {
    isDrawing = false;
  }
});

document.addEventListener('keydown', (e) => {
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
  prevColor.value = lastColor;
  lastColor = colorSwitcher.value;
});

// getting image
const key = '234ecb2a20225f9a826c1c7d1f299dad56d2b0c182718bfbcbe53102ab3b481b';
let data = 'https://images.unsplash.com/photo-1569965844464-3d8719e67dee?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMTU2NH0';

function getLinkToImage() {
  const city = input.value;
  let url = ['https://api.unsplash.com/photos/random?=&client_id=', key].join('');

  if (city !== '') {
    url = ['https://api.unsplash.com/photos/random?query=town,', city, '&client_id=', key].join('');
  }

  async function getLink(req) {
    let response = await fetch(req);
    let data = await response.json();
    let link = await data.urls.small;
    return link;
  }

  let link = getLink(url)

  return link;
}

async function addImage(img) {
  let pixelSize = ctxScale;
  let startX = 0;
  let startY = 0;
  let canvasSize = 512;

  if (img.width > img.height) {
    img.height = (img.height / img.width) * canvasSize;
    img.width = canvasSize;
    startY = (canvasSize - img.height) / 2;
  } else if (img.height > img.width) {
    img.width = (img.width / img.height) * canvasSize;
    img.height = canvasSize;
    startX = (canvasSize - img.width) / 2;
  } else {
    img.width = canvasSize / pixelSize;
    img.height = canvasSize / pixelSize;
  }

  let w = img.width / pixelSize;
  let h = img.height / pixelSize;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, startX, startY, w, h)
  let smallImg = new Image();
  smallImg.src = canvas.toDataURL();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  smallImg.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(smallImg, startX, startY, w, h,
                            startX, startY, img.width, img.height);
    saveCtx();
  }

}

const loadButton = document.querySelector('.form__load');
loadButton.addEventListener('click', async () => {
  const img = new Image();
  data = await getLinkToImage();
  window.localStorage.setItem('lastImg', data);

  img.onload = () => {
    addImage(img);
    saveCtx();
  };

  img.crossOrigin = 'anonymous';
  img.src = data;
});

// greyscale
function grey() {
  const [width, height] = [canvas.width, canvas.height];
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
  grey();
});

function makeActive(btn) {
  sizeButtons.forEach(button => button.classList.remove('sheet__size-switcher_active'));
  btn.classList.add('sheet__size-switcher_active');
}

const sizeButtons = document.querySelectorAll('.size-switcher');
const [size128Button, size256Button, size512Button] = sizeButtons;

size128Button.addEventListener('click', async function() {
  function changeRes(t) {
    makeActive(t);
    scale(4);

    const img = new Image();

    img.onload = () => {
      addImage(img);
    };

    img.crossOrigin = 'anonymous';
    img.src = data;
  }
  await changeRes(this);
  saveCtx();
});

size256Button.addEventListener('click', function() {
  makeActive(this);
  scale(2);

  const img = new Image();

  img.onload = async () => {
    await addImage(img);
    saveCtx();
  };

  img.crossOrigin = 'anonymous';
  img.src = data;
});

size512Button.addEventListener('click', function() {
  makeActive(this);
  scale(1);

  const img = new Image();

  img.onload = async () => {
    addImage(img);
  };

  img.crossOrigin = 'anonymous';
  img.src = data;
});

// prevent form from reloading
const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
})
