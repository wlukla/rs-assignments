import * as Tool from './canvas/tools';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.handleChangeTool = (i) => {
      this.model.setCurrentTool(i);
    };

    this.handleChangeCanvasScale = (scale) => {
      if (scale === 0) {
        this.model.setScale(4);
      } else if (scale === 1) {
        this.model.setScale(8);
      } else if (scale === 2) {
        this.model.setScale(16);
      }
    };

    this.handleColorSwitcherListener = () => {
      this.view.prevColor.value = this.model.currentColor;
      this.model.setPrevColor(this.model.currentColor);
      this.model.setCurrentColor(this.view.colorSwitcher.value);
    };

    this.handlePenSizesListeners = (i) => {
      this.model.setPenSize(this.model.ctxScale * (i + 1));
    };

    this.handleCanvasClickListener = (e) => {
      const { ctx, canvas } = this.view;
      const { currentColor } = this.model;
      if (this.model.currentTool === 0) {
        Tool.fillArea(e, currentColor, canvas, ctx);
      } else if (this.model.currentTool === 5) {
        Tool.fillSame(currentColor, ctx, canvas);
      }
    };

    this.handleMousedownListener = (e) => {
      const {
        currentTool, ctxScale, penSize, currentColor,
      } = this.model;

      const { ctx, canvas } = this.view;

      this.model.isDrawing = true;

      if (currentTool === 2) {
        this.model.drawData.x1 = e.offsetX;
        this.model.drawData.y1 = e.offsetY;
        Tool.drawPixel(e, ctxScale, penSize, currentColor, ctx);
      } else if (currentTool === 3) {
        Tool.erasePixel(e, ctxScale, penSize, ctx);
      } else if (currentTool === 4) {
        this.model.strokeData.x1 = e.offsetX;
        this.model.strokeData.y1 = e.offsetY;
        Tool.drawPixel(e, ctxScale, penSize, currentColor, ctx);
      }

      this.model.framesData[
        this.model.currentFrame
      ] = ctx.getImageData(0, 0, canvas.width, canvas.height); // !!! add function
    };

    this.handleCanvasMousemoveListener = (e) => {
      const { ctx, canvas } = this.view;
      const {
        penSize, drawData, isDrawing, currentColor, currentTool, strokeData,
      } = this.model;
      const { ctxScale } = this.model;

      if (currentTool === 2 && this.model.isDrawing) {
        this.model.drawData.x2 = e.offsetX;
        this.model.drawData.y2 = e.offsetY;
        this.model.drawData = Tool.draw(drawData, currentColor, ctxScale, penSize, ctx);
      } else if (currentTool === 3 && isDrawing) {
        Tool.erasePixel(e, ctxScale, penSize, ctx);
      } else if (currentTool === 4 && isDrawing) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.model.strokeData.x2 = e.offsetX;
        this.model.strokeData.y2 = e.offsetY;
        ctx.putImageData(this.model.framesData[0], 0, 0);
        Tool.drawLine(strokeData, ctxScale, penSize, currentColor, ctx);
      }
    };

    this.handleCanvasMouseupListener = () => {
      const tool = this.model.currentTool;
      if (tool === 2
        || tool === 3
        || tool === 4) {
        this.model.isDrawing = false;
      }
    };

    this.handleCanvasMouseoutListener = () => {
      this.model.isDrawing = false;
    };

    this.handlePrevColorListener = (e) => {
      e.preventDefault();
      this.model.flipColors();
      this.view.colorSwitcher.value = this.model.currentColor;
      this.view.prevColor.value = this.model.prevColor;
    };

    this.view.initToolsListeners(this.handleChangeTool);
    this.view.initSizeButtonsListeners(this.handleChangeCanvasScale);
    this.view.initColorSwitcherListener(this.handleColorSwitcherListener);
    this.view.initPenSizesListeners(this.handlePenSizesListeners);
    this.view.initCanvasClickListener(this.handleCanvasClickListener);
    this.view.initCanvasMouseupListener(this.handleCanvasMouseupListener);
    this.view.initCanvasMousemoveListener(this.handleCanvasMousemoveListener);
    this.view.initCanvasMousedownListener(this.handleMousedownListener);
    this.view.initCanvasMosueoutListener(this.handleCanvasMouseoutListener);
    this.view.initPrevColorListener(this.handlePrevColorListener);
  }
}

export default Controller;
