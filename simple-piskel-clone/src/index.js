
// import * as Scale from './canvas/size-switch';
// import * as Color from './canvas/color-switch';
// import * as Tool from './canvas/tools';
// // import * as Frame from './frames/frame';
// import * as Netlify from './netlify';
// import { switchActive } from './utils';

// const loginBtn = document.querySelector('.menu__login');

// let lastColor = Color.colorSwitcher.value;

// let drawData = {
//   x1: null,
//   y1: null,
//   x2: null,
//   y2: null,
// };

// const strokeData = {
//   x1: null,
//   y1: null,
//   x2: null,
//   y2: null,
// };

// function setFrameImage(i) {
//   const img = canvas.toDataURL('image/png');
//   const frame = document.querySelectorAll('.frame')[i];
//   frame.style.backgroundImage = `url('${img}')`;
//   return img;
// }

// function switchToFrame(data) {
//   const img = new Image();
//   ctx.clearRect(0, 0, 512, 512);

//   img.onload = () => {
//     ctx.drawImage(img, 0, 0);
//   };
//   img.src = data;
// }

// function addFrame() {
//   const newFrame = document.createElement('div');
//   newFrame.classList.add('frame');
//   framesContainer.appendChild(newFrame);
//   const frameElements = document.querySelectorAll('.frame');
//   newFrame.addEventListener('click', () => {
//     let dataURL = frameElements[frameElements.length - 1].style.backgroundImage;
//     dataURL = dataURL.replace(/^url\("/, '');
//     dataURL = dataURL.replace(/"\)$/g, '');
//     switchToFrame(dataURL);
//   });
//   setFrameImage(frameElements.length - 1);
// }

// window.onload = () => {
//   instrument = 2;
//   switchActive(Tool.toolButtons, Tool.toolButtons[instrument]);

//   if (localStorage.getItem('data') !== null) {
//     Color.colorSwitcher.value = window.localStorage.getItem('color');

//     const oldImg = new Image();
//     oldImg.src = localStorage.getItem('data');
//     oldImg.onload = async () => {
//       ctxScale = +localStorage.getItem('scale');
//       ctx.drawImage(oldImg, 0, 0);
//       frameImages.push(setFrameImage(0));
//     };

//     if (ctxScale === 4) {
//       switchActive(Scale.sizeButtons, Scale.size128Button);
//     } else if (ctxScale === 8) {
//       switchActive(Scale.sizeButtons, Scale.size64Button);
//     } else if (ctxScale === 16) {
//       switchActive(Scale.sizeButtons, Scale.size32Button);
//     }
//   } else {
//     Scale.changeScale(4);
//     ctxScale = 4;
//   }
// };

// canvas.addEventListener('click', (e) => {
//   if (instrument === 0) {
//     Tool.fillArea(e.offsetX, e.offsetY, Color.colorSwitcher.value);
//   } else if (instrument === 5) {
//     Tool.fillPixelsSame(Color.colorSwitcher.value);
//   }

//   saveCtx();
// });

// canvas.addEventListener('mouseout', () => {

//   saveCtx();
// });

// document.addEventListener('keydown', (e) => {
//   // change instrument with keys
//   if (e.code === 'KeyB') {
//     instrument = 0;
//     Tool.toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
//     Tool.fill.classList.add('sheet__tool_selected');
//   } else if (e.code === 'KeyP') {
//     instrument = 2;
//     Tool.toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
//     Tool.pencil.classList.add('sheet__tool_selected');
//   } else if (e.code === 'KeyC') {
//     instrument = 1;
//     Tool.toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));
//     Tool.pick.classList.add('sheet__tool_selected');
//   }
// });

// addFrameBtn.addEventListener('click', () => {
//   const index = frameImages.length;
//   addFrame();
//   frameImages.push(setFrameImage(index));
//   console.log(frameImages);
// });

// // github authorization
// loginBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   const authenticator = new Netlify.Default({});
//   authenticator.authenticate({ provider: 'github', scope: 'user' }, (err, d) => {
//     if (err) {
//       alert(['Error Authenticating with GitHub: ', err].join(''));
//     } else {
//       alert(['Authenticated with GitHub. Access Token: ', d.token].join(''));
//     }
//   });
// });

import './style.scss';
import 'normalize.css';

import Model from './model';
import View from './view';
import Controller from './controller';

const app = new Controller(new Model(), new View());
