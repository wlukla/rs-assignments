const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const toolButtons = document.querySelectorAll('.sheet__tool');
const [fill, pick, pencil, eraser, stroke, fillSame] = toolButtons;

const penSizesContainer = document.querySelector('.pen-sizes');
const penSizesElements = document.querySelectorAll('.pen-sizes__item');

function drawPixel(e, ctxScale, penSize, color) {
  const startX = Math.floor(e.offsetX / ctxScale) * ctxScale;
  const startY = Math.floor(e.offsetY / ctxScale) * ctxScale;
  ctx.fillStyle = color;
  ctx.fillRect(startX, startY, penSize, penSize);
}

function erasePixel(e, ctxScale, penSize) {
  const x = Math.floor(e.offsetX / ctxScale) * ctxScale;
  const y = Math.floor(e.offsetY / ctxScale) * ctxScale;
  ctx.clearRect(x, y, penSize, penSize);
}

function fillArea(startX, startY, color) {
  const colorLayer = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixelStack = [[startX, startY]];
  const initialPos = (startY * 4) * canvas.width + startX * 4;
  const startR = colorLayer.data[initialPos];
  const startG = colorLayer.data[initialPos + 1];
  const startB = colorLayer.data[initialPos + 2];

  const fillColorR = parseInt(color.slice(1, 3), 16);
  const fillColorG = parseInt(color.slice(3, 5), 16);
  const fillColorB = parseInt(color.slice(5, 7), 16);

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

function fillPixelsSame(color) {
  const colorLayer = ctx.getImageData(0, 0, canvas.height, canvas.width);

  const fillColorR = parseInt(color.slice(1, 3), 16);
  const fillColorG = parseInt(color.slice(3, 5), 16);
  const fillColorB = parseInt(color.slice(5, 7), 16);

  for (let i = 3; i < colorLayer.data.length; i += 4) {
    if (colorLayer.data[i] === 255) {
      colorLayer.data[i - 3] = fillColorR;
      colorLayer.data[i - 2] = fillColorG;
      colorLayer.data[i - 1] = fillColorB;
    }
  }

  ctx.putImageData(colorLayer, 0, 0);
}

function changePenSize(e, ctxScale, oldSize) {
  let newPenSize = oldSize;
  if ([...penSizesElements].indexOf(e.target) !== -1) {
    const current = e.target;
    newPenSize = ([...penSizesElements].indexOf(current) + 1) * ctxScale;
  }
  return newPenSize;
}

function draw(data, color, ctxScale, penSize) {
  const dx = Math.abs(data.x2 - data.x1);
  const dy = Math.abs(data.y2 - data.y1);
  const sx = (data.x1 < data.x2) ? 1 : -1;
  const sy = (data.y1 < data.y2) ? 1 : -1;
  let err = dx - dy;
  const dataNew = data;

  while ((data.x1 !== data.x2) && (data.y1 !== data.y2)) {
    const startX = Math.floor(data.x1 / ctxScale) * ctxScale;
    const startY = Math.floor(data.y1 / ctxScale) * ctxScale;
    ctx.fillStyle = color;
    ctx.fillRect(startX, startY, penSize, penSize);

    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      dataNew.x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      dataNew.y1 += sy;
    }
  }

  return dataNew;
}

function drawLine(lineData, ctxScale, penSize, color) {
  let {
    x1, y1, x2, y2,
  } = lineData;

  x1 = Math.floor(x1 / ctxScale) * ctxScale;
  y1 = Math.floor(y1 / ctxScale) * ctxScale;
  x2 = Math.floor(x2 / ctxScale) * ctxScale;
  y2 = Math.floor(y2 / ctxScale) * ctxScale;

  let x = 0;
  let y = 0;
  let xe = 0;
  let ye = 0;

  // Calculate line deltas
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Create a positive copy of deltas (makes iterating easier)
  const dx1 = Math.abs(dx);
  const dy1 = Math.abs(dy);

  // Calculate error intervals for both axis
  let px = 2 * dy1 - dx1;
  let py = 2 * dx1 - dy1;

  // The line is X-axis dominant
  if (dy1 <= dx1) {
    // Line is drawn left to right
    if (dx >= 0) {
      x = x1;
      y = y1;
      xe = x2;
    } else { // Line is drawn right to left (swap ends)
      x = x2;
      y = y2;
      xe = x1;
    }

    ctx.fillStyle = color;
    ctx.fillRect(x, y, penSize, penSize);

    // Rasterize the line
    for (let i = 0; x < xe; i += 1) {
      x += ctxScale;

      // Deal with octants...
      if (px < 0) {
        px += 2 * dy1;
      } else {
        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
          y += ctxScale;
        } else {
          y -= ctxScale;
        }
        px += 2 * (dy1 - dx1);
      }

      // Draw pixel from line span at currently rasterized position
      ctx.fillStyle = color;
      ctx.fillRect(x, y, penSize, penSize);
    }
  } else { // The line is Y-axis dominant
    // Line is drawn bottom to top
    if (dy >= 0) {
      x = x1;
      y = y1;
      ye = y2;
    } else { // Line is drawn top to bottom
      x = x2;
      y = y2;
      ye = y1;
    }

    ctx.fillStyle = color;
    ctx.fillRect(x, y, penSize, penSize); // Draw first pixel

    // Rasterize the line
    for (let i = 0; y < ye; i += 1) {
      y += ctxScale;

      // Deal with octants...
      if (py <= 0) {
        py += 2 * dx1;
      } else {
        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
          x += ctxScale;
        } else {
          x -= ctxScale;
        }
        py += 2 * (dx1 - dy1);
      }

      // Draw pixel from line span at currently rasterized position
      ctx.fillStyle = color;
      ctx.fillRect(x, y, penSize, penSize);
    }
  }
}

export {
  toolButtons, fill, pick, pencil, eraser, stroke, fillSame, drawPixel, erasePixel,
  fillArea, fillPixelsSame, changePenSize, penSizesContainer, draw, drawLine,
};
