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
      } else if (this.model.currentTool === 1) {
        this.model.prevColor = this.model.currentColor;
        this.model.currentColor = Tool.pickColor(e, ctx);

        this.view.colorSwitcher.value = this.model.currentColor;
        this.view.prevColor.value = this.model.prevColor;
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
        penSize, drawData, isDrawing, currentColor, currentTool, strokeData, currentFrame,
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
        ctx.putImageData(this.model.framesData[currentFrame], 0, 0);
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
      this.updateFrame();
      this.showFrames();
    };

    this.handleCanvasMouseoutListener = () => {
      this.model.isDrawing = false;
      this.updateFrame();
      this.showFrames();
    };

    this.handlePrevColorListener = (e) => {
      e.preventDefault();
      this.model.flipColors();
      this.view.colorSwitcher.value = this.model.currentColor;
      this.view.prevColor.value = this.model.prevColor;
    };

    this.handleAddFrameBtnListener = () => {
      this.model.addFrame(this.model.emptyData);
      this.model.addFrameDataURL(this.model.emptyDataURL);
      this.showFrames();
    };

    this.handleFpsChangerListener = () => {
      const { fpsChangerElement } = this.view;
      this.model.fps = fpsChangerElement.value;
      this.view.fpsValueElement.innerHTML = fpsChangerElement.value;
      this.startPreview(this.model.fps);
    };

    this.handleFullscreenButtonListener = () => {
      Tool.fullScreen(this.view.previewContainer);
      this.view.previewElement.classList.add('preview_fullscreen');
      this.view.previewFullscreenButton.style.display = 'none';
    };

    this.handleKeyboardListener = (e) => {
      const { keys } = this.model;
      if (e.key === keys.fillBucket) {
        this.model.currentTool = 0;
      } else if (e.key === keys.chooseColor) {
        this.model.currentTool = 1;
      } else if (e.key === keys.pencil) {
        this.model.currentTool = 2;
      } else if (e.key === keys.eraser) {
        this.model.currentTool = 3;
      } else if (e.key === keys.stroke) {
        this.model.currentTool = 4;
      } else if (e.key === keys.fillSame) {
        this.model.currentTool = 5;
      }
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
    this.view.initAddFrameBtnListener(this.handleAddFrameBtnListener);
    this.view.initFpsChangerListener(this.handleFpsChangerListener);
    this.view.initPreviewFullscreenButtonListener(this.handleFullscreenButtonListener);
    this.view.initKeyboardListener(this.handleKeyboardListener);
    this.initOnloadListener();

    this.animate = () => {
      window.requestAnimationFrame(this.animate);

      this.model.now = Date.now();
      this.model.elapsed = this.model.now - this.model.then;

      const { elapsed, fpsInterval, now } = this.model;

      if (elapsed > fpsInterval) {
        this.model.then = now - (elapsed % fpsInterval);

        const { framesDataURL, previewIndex } = this.model;
        this.view.previewElement.style.backgroundImage = `url(${framesDataURL[previewIndex]})`;
        this.model.previewIndex += 1;
        if (this.model.previewIndex === framesDataURL.length) {
          this.model.previewIndex = 0;
        }
      }
    };
  }

  startPreview(fps) {
    this.model.fpsInterval = 1000 / fps;
    this.model.then = Date.now();
    this.model.startTime = this.model.then;
    this.animate();
  }

  showFrames() {
    const { framesDataURL } = this.model;
    this.view.framesContainer.innerHTML = '';
    for (let i = 0; i < framesDataURL.length; i += 1) {
      const frameLayout = `
      <?xml version="1.0" ?><svg class="frame__delete-button" width="20" height="20"  id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M89.4,100l26.2,347.9c2.5,32.5,29.6,58.1,60.7,58.1h159.3c31.1,0,58.2-25.6,60.7-58.1L422.6,100H89.4z M190.1,460.8   c0.3,7.1-5.1,12.7-12,12.7s-12.7-5.7-13.1-12.7l-14.6-296.6c-0.5-9.6,5.7-17.4,13.8-17.4s14.9,7.8,15.3,17.4L190.1,460.8z    M268.5,460.8c0,7.1-5.7,12.7-12.5,12.7s-12.5-5.7-12.5-12.7l-2-296.6c-0.1-9.6,6.4-17.4,14.5-17.4c8.1,0,14.6,7.8,14.5,17.4   L268.5,460.8z M346.9,460.8c-0.3,7.1-6.2,12.7-13.1,12.7s-12.2-5.7-12-12.7l10.6-296.6c0.3-9.6,7.2-17.4,15.3-17.4   c8.1,0,14.3,7.8,13.8,17.4L346.9,460.8z"/><path d="M445.3,82.8H66.7v0c-1.8-21.1,10.7-38.4,27.9-38.4h322.9C434.6,44.4,447.1,61.8,445.3,82.8L445.3,82.8z" id="XMLID_2_"/><path d="M324.3,58.6H187.7l-0.2-7.8C186.7,26.3,202.1,6,221.9,6h68.3c19.7,0,35.1,20.3,34.4,44.7L324.3,58.6z" id="XMLID_1_"/></g></svg>
      <?xml version="1.0" ?><svg class="frame__duplicate-button" height="20px" version="1.1" viewBox="0 0 21 22" width="20px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Core" transform="translate(-86.000000, -127.000000)"><g id="content-copy" transform="translate(86.500000, 127.000000)"><path d="M14,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 L2,16 L2,2 L14,2 L14,0 L14,0 Z M17,4 L6,4 C4.9,4 4,4.9 4,6 L4,20 C4,21.1 4.9,22 6,22 L17,22 C18.1,22 19,21.1 19,20 L19,6 C19,4.9 18.1,4 17,4 L17,4 Z M17,20 L6,20 L6,6 L17,6 L17,20 L17,20 Z" id="Shape"/></g></g></g></svg>
      `;

      const frameElement = document.createElement('div');

      frameElement.innerHTML = frameLayout;
      frameElement.classList.add('frame');
      frameElement.style.backgroundImage = `url("${framesDataURL[i]}")`;

      this.view.framesContainer.appendChild(frameElement);

      frameElement.addEventListener('click', (e) => {
        if (e.target === frameElement) {
          this.view.ctx.putImageData(this.model.framesData[i], 0, 0);
          this.model.currentFrame = i;
        }
      });
    }

    const deleteFrameButtons = document.querySelectorAll('.frame__delete-button');
    for (let j = 0; j < deleteFrameButtons.length; j += 1) {
      const btn = deleteFrameButtons[j];
      btn.addEventListener('click', () => {
        if (this.model.framesData.length > 1) {
          this.model.deleteFrame(j);
          this.showFrames();
        }
      });
    }

    const duplicateFrameButtons = document.querySelectorAll('.frame__duplicate-button');
    for (let j = 0; j < duplicateFrameButtons.length; j += 1) {
      const btn = duplicateFrameButtons[j];
      btn.addEventListener('click', () => {
        this.model.duplicateFrame(j);
        this.showFrames();
      });
    }
  }

  updateFrame() {
    const { ctx, canvas } = this.view;
    const frameIndex = this.model.currentFrame;
    this.model.framesData[frameIndex] = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const canvasData = canvas.toDataURL();
    this.model.framesDataURL[frameIndex] = canvasData;
  }

  initOnloadListener() {
    window.addEventListener('load', () => {
      const { canvas } = this.view;
      this.view.colorSwitcher.value = this.model.currentColor;
      this.view.prevColor.value = this.model.prevColor;

      this.model.addFrame(this.view.ctx.getImageData(0, 0, canvas.height, canvas.width));
      [this.model.emptyData] = this.model.framesData;
      this.model.addFrameDataURL(this.view.canvas.toDataURL());
      [this.model.emptyDataURL] = this.model.framesDataURL;
      this.showFrames();

      this.startPreview(1);

      document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
          this.view.previewElement.classList.remove('preview_fullscreen');
          this.view.previewFullscreenButton.style.display = 'block';
        }
      });
      document.addEventListener('webkitfullscreenchange', () => {
        if (!document.webkitFullscreenElement) {
          this.view.previewElement.classList.remove('preview_fullscreen');
          this.view.previewFullscreenButton.style.display = 'block';
        }
      });
      document.addEventListener('mozfullscreenchange', () => {
        if (!document.mozFullscreenElement) {
          this.view.previewElement.classList.remove('preview_fullscreen');
          this.view.previewFullscreenButton.style.display = 'block';
        }
      });
      document.addEventListener('MSFullscreenChange', () => {
        if (!document.msFullscreenElement) {
          this.view.previewElement.classList.remove('preview_fullscreen');
          this.view.previewFullscreenButton.style.display = 'block';
        }
      });
    });
  }
}

export default Controller;
