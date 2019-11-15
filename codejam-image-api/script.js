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

const pixelSize = 512 / 4;
let ctxScale = 1;

function scale(i) {
  ctxScale *= i;
  ctx.scale(i, i);
}

scale(4);

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
  // imlement fill
  if (instrument === 2) {
    addPixel(e);
  }

  // implement color picker
  if (instrument === 1) {
    const x = Math.floor(e.offsetX / pixelSize);
    const y = Math.floor(e.offsetY / pixelSize);
    prevColor.value = lastColor;
    lastColor = colorSwitcher.value;
  }
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
let key = '234ecb2a20225f9a826c1c7d1f299dad56d2b0c182718bfbcbe53102ab3b481b';
let data = getLinkToImage();
function getLinkToImage() {
  const url = 'https://api.unsplash.com/photos/random?query=town,Minsk&client_id=' + key;
  fetch(url)
    .then(res => res.json())
    .then(d => data = d.urls.small)
}

let loadButton = document.querySelector('.form__load');
loadButton.addEventListener('click', () => {
  let img = new Image();
  getLinkToImage();

  img.onload = function() {
    if (img.width > 128) {
      img.height = img.height / img.width * 128;
      img.width = 128;
      let startY = (128 - img.height) / 2;
      ctx.drawImage(img, 0, startY, img.width, img.height);
    } else if (img.height > 128) {
      img.width = img.widht / img.height * 128;
      img.height = 128;
      let startX = (128 - img.width) / 2;
      ctx.drawImage(img, startX, 0, img.width, img.height);
    } else if (img.width < 128 && img.height < 128) {
      let startX = (128 - img.width) / 2;
      let startY = (128 - img.height) / 2;
      ctx.drawImage(img, startX, startY, img.width, img.height);
    }
    // add if both bigger and not square
    // add if square
  }
  img.src = data;
});


// pencil
// storing
// image pixeling
