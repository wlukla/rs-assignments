import './style.scss';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
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
  ctxScale *= i;
  ctx.scale(i, i);
  window.localStorage.setItem('scale', ctxScale);
}

if (localStorage.getItem('data') !== null) {
  const oldImg = new Image();
  oldImg.src = localStorage.getItem('data');
  oldImg.onload = () => {
    ctx.drawImage(oldImg, 0, 0);
    scale(localStorage.getItem('scale'));
  };
} else {
  scale(4);
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
  const startX = Math.floor(e.offsetX / ctxScale);
  const startY = Math.floor(e.offsetY / ctxScale);
  ctx.fillStyle = colorSwitcher.value;
  ctx.fillRect(startX, startY, 1, 1);
}

canvas.addEventListener('click', (e) => {
  // imlement pencil
  if (instrument === 2) {
    addPixel(e);
  }

  // implement color picker
  if (instrument === 1) {
    // const x = Math.floor(e.offsetX / pixelSize);
    // const y = Math.floor(e.offsetY / pixelSize);
    prevColor.value = lastColor;
    lastColor = colorSwitcher.value;
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

const loadButton = document.querySelector('.form__load');
loadButton.addEventListener('click', async () => {
  const img = new Image();
  let link = await getLinkToImage();

  img.onload = () => {
    if (img.width > 128) {
      img.height = (img.height / img.width) * 128;
      img.width = 128;
      const startY = (128 - img.height) / 2;
      ctx.drawImage(img, 0, startY, img.width, img.height);
    } else if (img.height > 128) {
      img.width = (img.widht / img.height) * 128;
      img.height = 128;
      const startX = (128 - img.width) / 2;
      ctx.drawImage(img, startX, 0, img.width, ctxScale);
    } else if (img.width < 128 && img.height < 128) {
      const startX = (128 - img.width) / 2;
      const startY = (128 - img.height) / 2;
      ctx.drawImage(img, startX, startY, img.width, img.height);
    }
    saveCtx();
  };
  img.crossOrigin = 'anonymous';
  img.src = link;
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
