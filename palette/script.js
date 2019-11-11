const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorSwitcher = document.querySelector('.color__icon_current');
const prevColor = document.querySelector('.color__icon_prev');
const red = document.querySelector('.color__icon_red');
const blue = document.querySelector('.color__icon_blue');
let lastColor = colorSwitcher.value;


function buildCanvas(size, color = '#D3D3D3') {
  const map = [];
  for (let i = 0; i < size; i += 1) {
    map.push([]);
    for (let j = 0; j < size; j += 1) {
      map[i][j] = color;
    }
  }
  return map;
}

let map = [];
map = buildCanvas(4);
if (window.localStorage.getItem('map') === null) {
  map = buildCanvas(4);
} else {
  map = window.localStorage.getItem('map').split(',');
  map = _.chunk(map, 4);
}

function drawHex(imageArr, pixelSize) {
  for (let i = 0; i < imageArr.length; i += 1) {
    for (let j = 0; j < imageArr[i].length; j += 1) {
      ctx.fillStyle = imageArr[i][j];
      ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
    }
  }
}

drawHex(map, 512 / map.length);

const toolButtons = document.querySelectorAll('.sheet__tool');
const fill = toolButtons[0];
const pick = toolButtons[1];
const pencil = toolButtons[2];

let instrument = null;
let isDrawing = false;
const pixelSize = 512 / 4;

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

canvas.addEventListener('click', (e) => {
  // imlement fill
  if (instrument === 0) {
    map = buildCanvas(4, colorSwitcher.value);
    drawHex(map, 512 / map.length);
  }

  // implement color picker
  if (instrument === 1) {
    const x = Math.floor(e.offsetX / pixelSize);
    const y = Math.floor(e.offsetY / pixelSize);
    colorSwitcher.value = map[x][y];
    prevColor.value = lastColor;
    lastColor = colorSwitcher.value;
  }

  window.localStorage.setItem('map', map);
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
});

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  if (instrument === 2) {
    const x = Math.floor(e.offsetX / pixelSize);
    const y = Math.floor(e.offsetY / pixelSize);
    map[x][y] = colorSwitcher.value;
    drawHex(map, 512 / map.length);
  }
});

canvas.addEventListener('mouseout', () => {
  isDrawing = false;
});

canvas.addEventListener('mousemove', (e) => {
  if (instrument === 2 && isDrawing) {
    const x = Math.floor(e.offsetX / pixelSize);
    const y = Math.floor(e.offsetY / pixelSize);
    map[x][y] = colorSwitcher.value;
    drawHex(map, 512 / map.length);
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
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

// function defineArea(map, color) {
//   let area = [];
//   for (let i = 0; i < map.length; i++) {
//     for (let j = 0; j < map[i].length; j++) {
//       if (map[i][j] == color) {
//         area.push([i, j]);
//       }
//     }
//   }
//   console.log(area);
// }

// defineArea(map, '#f74141');
