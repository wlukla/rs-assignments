const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const size4Button = document.getElementById('size4');
const size32Button = document.getElementById('size32');
const size256Button = document.getElementById('size256');
const sizeButtons = document.querySelectorAll('.sheet__size-switcher');

function drawByPixel(pixelSize, imageArr) {
  for (let i = 0; i < imageArr.length; i++) {
    for (let j = 0; j < imageArr[i].length; j++) {
      if (imageArr[i][j] instanceof Array) {
        ctx.fillStyle = 'rgb(' + imageArr[i][j].toString() + ')';
      } else {
        ctx.fillStyle = '#' + imageArr[i][j];
      }
      ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize)
    }
  }
}

function drawImage() {
  ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                     0, 0, canvas.width, canvas.height); // destination rectangle
}

function makeActive(btn) {
  sizeButtons.forEach(button => button.classList.remove('sheet__size-switcher_active'));
  btn.classList.add('sheet__size-switcher_active');
}

size4Button.addEventListener('click', function() {
  const pixelSize = 512 / 4;
  drawByPixel(pixelSize, arr4x4);
  makeActive(this);
});

size32Button.addEventListener('click', function() {
  const pixelSize = 512 / 32;
  drawByPixel(pixelSize, arr32x32);
  makeActive(this);
});

size256Button.addEventListener('click', function() {
  const pixelSize = 512 / 256;
  drawImage(pixelSize, img);
  makeActive(this);
});
