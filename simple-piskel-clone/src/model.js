class Model {
  constructor() {
    this.frames = [];
    this.framesData = [];
    this.currentFrame = 0; // !!! change with settings

    this.currentTool = 2; // !!! change with settings

    this.ctxScale = 4; // !!! change with settings
    this.penSize = 4; // !!! change with settings

    this.currentColor = '#ff0000'; // !!! change with settings
    this.prevColor = null;
    this.isDrawing = false;

    this.drawData = {
      x1: null,
      y1: null,
      x2: null,
      y2: null,
    };
    this.strokeData = {
      x1: null,
      y1: null,
      x2: null,
      y2: null,
    };
  }

  flipColors() {
    [this.currentColor, this.prevColor] = [this.prevColor, this.currentColor];
  }

  setPrevColor(color) {
    this.prevColor = color;
  }

  setCurrentColor(color) {
    this.currentColor = color;
  }

  setCurrentTool(i) {
    this.currentTool = i;
  }

  setPenSize(size) {
    this.penSize = size;
  }

  setCurrentFrame(i) {
    this.currentFrame = i;
  }

  setScale(scale) {
    this.ctxScale = scale;
  }

  // !!!
  addFrame() {
    this.frames.push(0);
  }
}

export default Model;
