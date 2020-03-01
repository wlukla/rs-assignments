class Model {
  constructor() {
    this.framesData = [];
    this.framesDataURL = [];
    this.emptyData = null;
    this.emptyDataURL = null;
    this.currentFrame = 0; // !!! change with settings

    this.currentTool = 2; // !!! change with settings

    this.ctxScale = 4; // !!! change with settings
    this.penSize = 4; // !!! change with settings

    this.currentColor = '#000000';
    this.prevColor = '#ffffff';
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

    this.previewIndex = 0;
    this.fps = null;
    this.fpsInterval = null;
    this.startTime = null;
    this.now = null;
    this.elapsed = null;

    this.keys = {
      fillBucket: 'f',
      chooseColor: 'c',
      pencil: 'p',
      eraser: 'e',
      stroke: 's',
      fillSame: 'g',
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
    const oldScale = this.ctxScale;
    this.ctxScale = scale;
    this.setPenSize(this.penSize * (scale / oldScale));
  }

  addFrame(data) {
    this.framesData.push(data);
  }

  addFrameDataURL(data) {
    this.framesDataURL.push(data);
  }

  deleteFrame(index) {
    this.framesData.splice(index, 1);
    this.framesDataURL.splice(index, 1);

    if (index === this.currentFrame) {
      this.currentFrame = index - 1;
    }
  }

  duplicateFrame(index) {
    const duplicatingFrameData = this.framesData[index];
    const duplicatingFrameDataURL = this.framesDataURL[index];

    this.framesData.splice(index, 0, duplicatingFrameData);
    this.framesDataURL.splice(index, 0, duplicatingFrameDataURL);
  }
}

export default Model;
