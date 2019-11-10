const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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
let color = '#000000';

document.addEventListener('click', (e) => {
  if (e.path.includes(pencil)) {
    instrument = 2;
  } else if (e.path.includes(fill)) {
    instrument = 0;
  } else if (e.path.includes(pick)) {
    instrument = 1;
  }
})

canvas.addEventListener('click', (e) => {
  // implement pencil
  if (instrument === 2) {
    let x = Math.floor(e.offsetX / pixelSize);
    let y = Math.floor(e.offsetY / pixelSize);
    map[x][y] = color;
    drawHex(map, 512 / map.length);
  }

  // imlement fill
  if (instrument === 0) {
    map = buildCanvas(4, color);
    drawHex(map, 512 / map.length);
  }
})
