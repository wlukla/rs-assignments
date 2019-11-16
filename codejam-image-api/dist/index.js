/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"* {\\n  margin: 0;\\n  padding: 0; }\\n\\n.header {\\n  position: relative;\\n  display: flex;\\n  justify-content: flex-start;\\n  width: 100%;\\n  height: 48px;\\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12); }\\n  .header__heading {\\n    margin-top: 8px;\\n    margin-left: 24px;\\n    font-family: \\\"Roboto Medium\\\";\\n    font-style: normal;\\n    font-weight: 500;\\n    font-size: 20px;\\n    line-height: 23px;\\n    color: rgba(0, 0, 0, 0.87); }\\n\\n.nav {\\n  width: 40px;\\n  height: 40px;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  cursor: pointer; }\\n\\n.menu {\\n  display: flex;\\n  width: 44px;\\n  height: 40px;\\n  justify-content: center;\\n  align-items: center;\\n  position: absolute;\\n  right: 0;\\n  top: 0;\\n  cursor: pointer; }\\n\\n.sheets-container {\\n  margin-top: 80px;\\n  margin-left: 30px;\\n  height: 70vh;\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: space-between; }\\n\\n.sheet {\\n  width: 228px;\\n  height: 246px;\\n  background: #FFFFFF;\\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12); }\\n  .sheet__list {\\n    list-style: none; }\\n  .sheet__size-switcher_active {\\n    background-color: lightgrey; }\\n  .sheet__tool_disabled {\\n    opacity: 0.2;\\n    cursor: default; }\\n  .sheet__tool_selected {\\n    background-color: lightgrey; }\\n\\n.color,\\n.tool,\\n.size-switcher {\\n  padding-left: 16px;\\n  margin-bottom: 8px;\\n  width: 100%;\\n  height: 48px;\\n  display: flex;\\n  align-items: center;\\n  box-sizing: border-box;\\n  cursor: pointer; }\\n\\n.tool__icon,\\n.size-switcher__icon {\\n  margin-right: 36px; }\\n\\n.tool__name,\\n.size-switcher__name {\\n  font-family: \\\"Roboto\\\";\\n  font-style: normal;\\n  font-weight: normal;\\n  font-size: 16px;\\n  line-height: 24px;\\n  color: rgba(0, 0, 0, 0.541327); }\\n\\n.color__icon {\\n  margin-right: 12px;\\n  border-radius: 50%;\\n  border: none;\\n  outline: none; }\\n  .color__icon::-webkit-color-swatch-wrapper {\\n    box-sizing: border-box;\\n    width: 22px;\\n    height: 20px;\\n    padding: 0;\\n    border-radius: 50%;\\n    border: none; }\\n  .color__icon::-webkit-color-swatch {\\n    width: 100%;\\n    height: 100%;\\n    border-radius: 50%;\\n    border: 1px solid #000000; }\\n\\n.color__text {\\n  font-family: \\\"Roboto\\\";\\n  font-style: normal;\\n  font-weight: normal;\\n  font-size: 16px;\\n  line-height: 24px;\\n  color: rgba(0, 0, 0, 0.541327); }\\n\\n.divider {\\n  margin-bottom: 8px;\\n  height: 1px;\\n  width: 100%;\\n  background: rgba(0, 0, 0, 0.12); }\\n\\n.main {\\n  display: flex;\\n  justify-content: space-between; }\\n\\n.canvas-container {\\n  width: fit-content;\\n  height: 100%;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  flex-direction: column; }\\n\\n.canvas {\\n  width: 512px;\\n  height: 512px;\\n  background-color: lightgrey; }\\n\\n.size-switchers-container {\\n  padding-top: 80px;\\n  padding-right: 100px; }\\n\\n.form {\\n  width: 100%;\\n  display: flex;\\n  justify-content: flex-start;\\n  margin-top: 74px;\\n  margin-bottom: 6px; }\\n  .form__bw {\\n    margin-left: auto; }\\n  .form__load, .form__bw {\\n    height: 26px;\\n    width: 70px;\\n    background-color: greenyellow;\\n    border-radius: 4px; }\\n  .form__load {\\n    margin-right: 10px; }\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/style.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \"{\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      // eslint-disable-next-line prefer-destructuring\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = modules[_i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = \"(\".concat(item[2], \") and (\").concat(mediaQuery, \")\");\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot).concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar stylesInDom = {};\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nfunction listToStyles(list, options) {\n  var styles = [];\n  var newStyles = {};\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var css = item[1];\n    var media = item[2];\n    var sourceMap = item[3];\n    var part = {\n      css: css,\n      media: media,\n      sourceMap: sourceMap\n    };\n\n    if (!newStyles[id]) {\n      styles.push(newStyles[id] = {\n        id: id,\n        parts: [part]\n      });\n    } else {\n      newStyles[id].parts.push(part);\n    }\n  }\n\n  return styles;\n}\n\nfunction addStylesToDom(styles, options) {\n  for (var i = 0; i < styles.length; i++) {\n    var item = styles[i];\n    var domStyle = stylesInDom[item.id];\n    var j = 0;\n\n    if (domStyle) {\n      domStyle.refs++;\n\n      for (; j < domStyle.parts.length; j++) {\n        domStyle.parts[j](item.parts[j]);\n      }\n\n      for (; j < item.parts.length; j++) {\n        domStyle.parts.push(addStyle(item.parts[j], options));\n      }\n    } else {\n      var parts = [];\n\n      for (; j < item.parts.length; j++) {\n        parts.push(addStyle(item.parts[j], options));\n      }\n\n      stylesInDom[item.id] = {\n        id: item.id,\n        refs: 1,\n        parts: parts\n      };\n    }\n  }\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n\n  if (typeof options.attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      options.attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(options.attributes).forEach(function (key) {\n    style.setAttribute(key, options.attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  var styles = listToStyles(list, options);\n  addStylesToDom(styles, options);\n  return function update(newList) {\n    var mayRemove = [];\n\n    for (var i = 0; i < styles.length; i++) {\n      var item = styles[i];\n      var domStyle = stylesInDom[item.id];\n\n      if (domStyle) {\n        domStyle.refs--;\n        mayRemove.push(domStyle);\n      }\n    }\n\n    if (newList) {\n      var newStyles = listToStyles(newList, options);\n      addStylesToDom(newStyles, options);\n    }\n\n    for (var _i = 0; _i < mayRemove.length; _i++) {\n      var _domStyle = mayRemove[_i];\n\n      if (_domStyle.refs === 0) {\n        for (var j = 0; j < _domStyle.parts.length; j++) {\n          _domStyle.parts[j]();\n        }\n\n        delete stylesInDom[_domStyle.id];\n      }\n    }\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\nconst colorSwitcher = document.querySelector('.color__icon_current');\nconst prevColor = document.querySelector('.color__icon_prev');\nconst red = document.querySelector('.color__icon_red');\nconst blue = document.querySelector('.color__icon_blue');\nlet lastColor = colorSwitcher.value;\n\nconst toolButtons = document.querySelectorAll('.sheet__tool');\nconst fill = toolButtons[0];\nconst pick = toolButtons[1];\nconst pencil = toolButtons[2];\nlet instrument = null;\nlet isDrawing = false;\nlet input = document.querySelector('.form__text-input');\n\nconst pixelSize = 512 / 4;\nlet ctxScale = 1;\n\nfunction scale(i) {\n  ctxScale *= i;\n  ctx.scale(i, i);\n  window.localStorage.setItem('scale', ctxScale);\n}\n\nif (localStorage.getItem('data') !== null) {\n  var img = new Image;\n  img.src = localStorage.getItem('data');\n  img.onload = function () {\n    ctx.drawImage(img, 0, 0);\n    scale(localStorage.getItem('scale'));\n  }\n};\n\n\n\nfunction saveCtx() {\n  window.localStorage.setItem('data', canvas.toDataURL());\n}\n\ndocument.addEventListener('click', (e) => {\n  if (e.path.includes(pencil)) {\n    instrument = 2;\n    toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));\n    pencil.classList.add('sheet__tool_selected');\n  } else if (e.path.includes(fill)) {\n    instrument = 0;\n    toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));\n    fill.classList.add('sheet__tool_selected');\n  } else if (e.path.includes(pick)) {\n    instrument = 1;\n    toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));\n    pick.classList.add('sheet__tool_selected');\n  }\n});\n\nfunction addPixel(e) {\n  const startX = Math.floor(e.offsetX / ctxScale);\n  const startY = Math.floor(e.offsetY / ctxScale);\n  ctx.fillStyle = colorSwitcher.value;\n  ctx.fillRect(startX, startY, 1, 1);\n}\n\ncanvas.addEventListener('click', (e) => {\n  // imlement pencil\n  if (instrument === 2) {\n    addPixel(e);\n  }\n\n  // implement color picker\n  if (instrument === 1) {\n    const x = Math.floor(e.offsetX / pixelSize);\n    const y = Math.floor(e.offsetY / pixelSize);\n    prevColor.value = lastColor;\n    lastColor = colorSwitcher.value;\n  }\n  saveCtx();\n});\n\ndocument.addEventListener('click', (e) => {\n  if (e.target === red) {\n    lastColor = red.value;\n    prevColor.value = colorSwitcher.value;\n    colorSwitcher.value = red.value;\n  }\n\n  if (e.target === blue) {\n    lastColor = blue.value;\n    prevColor.value = colorSwitcher.value;\n    colorSwitcher.value = blue.value;\n  }\n\n  if (e.target === prevColor) {\n    [prevColor.value, colorSwitcher.value] = [colorSwitcher.value, prevColor.value];\n  }\n});\n\ncanvas.addEventListener('mousedown', (e) => {\n  if (instrument === 2) {\n    isDrawing = true;\n    addPixel(e);\n  }\n});\n\ncanvas.addEventListener('mouseout', () => {\n  if (instrument === 2) {\n    isDrawing = false;\n  }\n  saveCtx();\n});\n\ncanvas.addEventListener('mousemove', (e) => {\n  if (instrument === 2 && isDrawing) {\n    addPixel(e);\n  }\n});\n\ncanvas.addEventListener('mouseup', () => {\n  if (instrument === 2) {\n    isDrawing = false;\n  }\n});\n\ndocument.addEventListener('keydown', (e) => {\n  if (e.code === 'KeyB') {\n    instrument = 0;\n    toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));\n    fill.classList.add('sheet__tool_selected');\n  } else if (e.code === 'KeyP') {\n    instrument = 2;\n    toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));\n    pencil.classList.add('sheet__tool_selected');\n  } else if (e.code === 'KeyC') {\n    instrument = 1;\n    toolButtons.forEach((el) => el.classList.remove('sheet__tool_selected'));\n    pick.classList.add('sheet__tool_selected');\n  }\n});\n\ncolorSwitcher.addEventListener('change', () => {\n  prevColor.value = lastColor;\n  lastColor = colorSwitcher.value;\n});\n\n// getting image\nlet key = '234ecb2a20225f9a826c1c7d1f299dad56d2b0c182718bfbcbe53102ab3b481b';\nlet data = 'https://images.unsplash.com/photo-1569965844464-3d8719e67dee?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMTU2NH0';\nfunction getLinkToImage() {\n  const city = input.value;\n  const url = 'https://api.unsplash.com/photos/random?=&client_id=' + key;\n  if (city !== '') {\n    const url = 'https://api.unsplash.com/photos/random?query=town,' + city + '&client_id=' + key;\n  }\n\n\n  fetch(url)\n    .then(res => res.json())\n    .then(d => data = d.urls.small)\n}\n\nlet loadButton = document.querySelector('.form__load');\nloadButton.addEventListener('click', () => {\n  let img = new Image;\n  // getLinkToImage();\n\n  img.onload = function() {\n    if (img.width > 128) {\n      img.height = img.height / img.width * 128;\n      img.width = 128;\n      let startY = (128 - img.height) / 2;\n      ctx.drawImage(img, 0, startY, img.width, img.height);\n    } else if (img.height > 128) {\n      img.width = img.widht / img.height * 128;\n      img.height = 128;\n      let startX = (128 - img.width) / 2;\n      ctx.drawImage(img, startX, 0, img.width, img.height);\n    } else if (img.width < 128 && img.height < 128) {\n      let startX = (128 - img.width) / 2;\n      let startY = (128 - img.height) / 2;\n      ctx.drawImage(img, startX, startY, img.width, img.height);\n    }\n    // add if both bigger and not square\n    // add if square\n    saveCtx();\n  }\n  img.crossOrigin = 'anonymous';\n  img.src = data;\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./src/style.scss?");

/***/ })

/******/ });