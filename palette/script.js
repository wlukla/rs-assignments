const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorSwitcher = document.querySelector('.color__icon_current');

function buildCanvas(size, color = '#D3D3D3') {
  let map = [];
  for (let i = 0; i < size; i++) {
    map.push([]);
    for (let j = 0; j < size; j++) {
      map[i][j] = color;
    }
  }
  return map;
}

map = buildCanvas(4);

drawHex(map, 512 / map.length);

const size4Button = document.getElementById('size4');
const size32Button = document.getElementById('size32');
const size256Button = document.getElementById('size256');
const sizeButtons = document.querySelectorAll('.sheet__size-switcher');

const toolButtons = document.querySelectorAll('.sheet__tool');
const fill = toolButtons[0];
const pick = toolButtons[1];
const pencil = toolButtons[2];

function drawHex(imageArr, pixelSize) {
  for (let i = 0; i < imageArr.length; i++) {
    for (let j = 0; j < imageArr[i].length; j++) {
      ctx.fillStyle = imageArr[i][j];
      ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize)
    }
  }
}

let instrument = null;
let isDrawing = false;
let pixelSize = 512 / 4;
let color = colorSwitcher.value;

document.addEventListener('click', (e) => {
  color = colorSwitcher.value;
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
})

canvas.addEventListener('click', (e) => {
  // imlement fill
  if (instrument === 0) {
    map = buildCanvas(4, color);
    drawHex(map, 512 / map.length);
  }

  // implement color picker
  if (instrument === 1) {
    let x = Math.floor(e.offsetX / pixelSize);
    let y = Math.floor(e.offsetY / pixelSize);
    colorSwitcher.value = map[x][y];
  }
})

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  if (instrument === 2) {
    let x = Math.floor(e.offsetX / pixelSize);
    let y = Math.floor(e.offsetY / pixelSize);
    map[x][y] = color;
    drawHex(map, 512 / map.length);
  }
})

canvas.addEventListener('mouseout', () => {
  isDrawing = false;
})

canvas.addEventListener('mousemove', (e) => {
  if (instrument === 2 && isDrawing) {
    let x = Math.floor(e.offsetX / pixelSize);
    let y = Math.floor(e.offsetY / pixelSize);
    map[x][y] = color;
    drawHex(map, 512 / map.length);
  }
})

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
})
