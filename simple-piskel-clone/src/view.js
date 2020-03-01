class View {
  constructor() {
    this.window = window;

    this.navButton = document.querySelector('.nav');
    this.toolButtons = document.querySelectorAll('.sheet__tool');
    this.penSizes = document.querySelectorAll('.pen-sizes__item');

    this.colorSwitcher = document.querySelector('.color__icon_current');
    this.prevColor = document.querySelector('.color__icon_prev');

    this.sizeButtons = document.querySelectorAll('.sheet__size-switcher');
    this.canvas = document.querySelector('.canvas');
    this.ctx = this.canvas.getContext('2d');

    this.framesContainer = document.querySelector('.frames-container');
    this.addFrameBtn = document.querySelector('.frames-container__button');

    this.previewContainer = document.querySelector('.preview-container');
    this.previewElement = document.querySelector('.preview');
    this.fpsChangerElement = document.querySelector('.fps-changer');
    this.fpsValueElement = document.querySelector('.fps-value');
    this.previewFullscreenButton = document.querySelector('.preview__fullscreen-icon');
  }

  disableSmoothing() {
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
  }

  initSizeButtonsListeners(callback) {
    for (let i = 0; i < this.sizeButtons.length; i += 1) {
      this.sizeButtons[i].addEventListener('click', () => {
        for (let j = 0; j < this.sizeButtons.length; j += 1) {
          this.sizeButtons[j].classList.remove('size-switcher_active');
        }

        this.sizeButtons[i].classList.add('size-switcher_active');
        callback(i);
      });
    }
  }

  initToolsListeners(callback) {
    for (let i = 0; i < this.toolButtons.length; i += 1) {
      this.toolButtons[i].addEventListener('click', () => {
        for (let j = 0; j < this.toolButtons.length; j += 1) {
          this.toolButtons[j].classList.remove('tool_active');
        }
        this.toolButtons[i].classList.add('tool_active');
        callback(i);
      });
    }
  }

  initColorSwitcherListener(callback) {
    this.colorSwitcher.addEventListener('change', callback);
  }

  initPenSizesListeners(callback) {
    for (let i = 0; i < this.penSizes.length; i += 1) {
      this.penSizes[i].addEventListener('click', () => {
        for (let j = 0; j < this.penSizes.length; j += 1) {
          this.penSizes[j].classList.remove('pen-sizes__item_active');
        }
        this.penSizes[i].classList.add('pen-sizes__item_active');
        callback(i);
      });
    }
  }

  initCanvasClickListener(callback) {
    this.canvas.addEventListener('click', callback);
  }

  initCanvasMousedownListener(callback) {
    this.canvas.addEventListener('mousedown', callback);
  }

  initCanvasMousemoveListener(callback) {
    this.canvas.addEventListener('mousemove', callback);
  }

  initCanvasMouseupListener(callback) {
    this.canvas.addEventListener('mouseup', callback);
  }

  initCanvasMosueoutListener(callback) {
    this.canvas.addEventListener('mouseout', callback);
  }

  initAddFrameListener(callback) {
    this.addFrameBtn(callback);
  }

  initPrevColorListener(callback) {
    this.prevColor.addEventListener('click', callback);
  }

  initAddFrameBtnListener(callback) {
    this.addFrameBtn.addEventListener('click', callback);
  }

  initFpsChangerListener(callback) {
    this.fpsChangerElement.addEventListener('input', callback);
  }

  initPreviewFullscreenButtonListener(callback) {
    this.previewFullscreenButton.addEventListener('click', callback);
  }

  initKeyboardListener(callback) {
    this.window.addEventListener('keypress', callback);
  }

  initNavButtonListener(callback) {
    this.navButton.addEventListener('click', callback);
  }
}

export default View;
