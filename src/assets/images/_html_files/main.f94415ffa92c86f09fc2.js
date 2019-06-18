/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors-main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config.ts":
/*!*******************!*\
  !*** ./config.ts ***!
  \*******************/
/*! exports provided: API_URL, HEADERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_URL", function() { return API_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADERS", function() { return HEADERS; });
var API_URL = 'http://localhost:8080/';
var HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/Footer.less":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/less-loader/dist/cjs.js!./src/styles/Footer.less ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".footer {\n  height: 3rem;\n  width: 100%;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  background-color: #8c52c7;\n  color: #ffffff;\n}\n.footer--content {\n  font-size: 1.24rem;\n  padding: 0rem 3.7rem;\n  font-weight: normal;\n}\n.footer--content--link {\n  color: #ffffff;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/Header.less":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/less-loader/dist/cjs.js!./src/styles/Header.less ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".header {\n  height: 5rem;\n  margin-top: 1.4rem;\n  margin-bottom: 1.4rem;\n  display: flex;\n  justify-content: space-between;\n  font-size: 1.24rem;\n}\n.header--rk_logo {\n  height: 2.5rem;\n  vertical-align: middle;\n  cursor: pointer;\n  text-decoration: none;\n}\n.header--logo {\n  font-weight: bold;\n  white-space: nowrap;\n  color: #000000;\n  cursor: pointer;\n}\n.header--serviceStatusMessage {\n  color: #8c52c7;\n}\n.header--link {\n  text-decoration: none;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/LandingPage.less":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/less-loader/dist/cjs.js!./src/styles/LandingPage.less ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".content {\n  width: 100%;\n  max-width: 1366px;\n  margin: 0 auto;\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n}\n.content > * {\n  flex-shrink: 0;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/QAForm.less":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/less-loader/dist/cjs.js!./src/styles/QAForm.less ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".base {\n  font-family: 'GT America', Arial, sans-serif;\n  margin-left: 2.2rem;\n  margin-right: 2.2rem;\n  font-size: 1.1rem;\n  line-height: 1.7;\n}\n@media (min-width: 768px) {\n  .base {\n    font-size: 20px;\n  }\n}\n/*Form*/\n.textarea,\n.email {\n  resize: none;\n  width: 95%;\n  padding: 1rem;\n  border: solid 1px #d1d1d1;\n  border-radius: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  font-size: 1rem;\n}\n.textarea.error,\n.email.error {\n  border-color: red;\n}\n.textarea {\n  height: 8rem;\n}\n/*Dropdown*/\n.Dropdown-root {\n  position: relative;\n  font-size: 1.2rem;\n  padding-bottom: 1rem;\n}\n.Dropdown-control {\n  position: relative;\n  overflow: hidden;\n  background-color: white;\n  border: 1px solid #d1d1d1;\n  box-sizing: border-box;\n  color: #000000;\n  cursor: default;\n  outline: none;\n  padding: 8px 52px 8px 10px;\n  transition: all 200ms ease;\n}\n.Dropdown-control:hover {\n  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);\n}\n.Dropdown-arrow {\n  border-color: #5f9f66 transparent transparent;\n  border-style: solid;\n  border-width: 5px 5px 0;\n  content: '';\n  display: block;\n  height: 0;\n  margin-top: -ceil(2.5);\n  position: absolute;\n  right: 10px;\n  top: 45%;\n  width: 0;\n}\n.is-open .Dropdown-arrow {\n  border-color: transparent transparent #5f9f66;\n  border-width: 0 5px 5px;\n}\n.Dropdown-menu {\n  background-color: white;\n  border: 1px solid #dfdad5;\n  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);\n  box-sizing: border-box;\n  margin-top: -1px;\n  max-height: 200px;\n  overflow-y: auto;\n  position: absolute;\n  top: 100%;\n  width: 100%;\n  z-index: 1000;\n  -webkit-overflow-scrolling: touch;\n}\n.Dropdown-menu .Dropdown-group > .Dropdown-title {\n  padding: 8px 10px;\n  color: #333333;\n  font-weight: bold;\n  text-transform: capitalize;\n}\n.Dropdown-option {\n  box-sizing: border-box;\n  color: #666666;\n  cursor: pointer;\n  display: block;\n  padding: 8px 10px;\n}\n.Dropdown-option:last-child {\n  border-bottom-right-radius: 2px;\n  border-bottom-left-radius: 2px;\n}\n.Dropdown-option:hover {\n  background-color: #5f9f66;\n  color: #333;\n}\n.Dropdown-option.is-selected {\n  background-color: #82c289;\n  color: #666666;\n}\n.Dropdown-noresults {\n  box-sizing: border-box;\n  color: #666666;\n  cursor: default;\n  display: block;\n  padding: 8px 10px;\n}\n/*Buttons*/\ninput[type='submit'] {\n  height: 4rem;\n  width: 8rem;\n  border: none;\n  background-color: #82c289;\n  margin-top: 0.5rem;\n  color: white;\n  font-size: 20px;\n  text-align: center;\n}\n.container {\n  margin-bottom: 20px;\n  background-color: rgba(0, 0, 0, 0.05);\n}\n@media (min-width: 768px) {\n  .container {\n    margin-right: 60px;\n    margin-left: 60px;\n    margin-bottom: 60px;\n  }\n}\n@media (min-width: 1366px) {\n  .container {\n    display: flex;\n  }\n  .container > * {\n    width: 50%;\n  }\n  .container > *:not(:last-child) {\n    margin-right: 30px;\n  }\n}\n.form {\n  display: flex;\n  flex-direction: column;\n}\n.form--label {\n  display: block;\n  max-width: initial;\n  font-weight: bold;\n  font-size: 1.3rem;\n  padding-bottom: 0.5rem;\n}\n.form--input-container {\n  width: 95%;\n}\n@media (min-width: 768px) {\n  .form--input-container {\n    padding: 1.5rem 3rem 2rem;\n  }\n}\n.form--selector {\n  position: relative;\n  display: block;\n  width: 100%;\n  margin: 0 auto;\n  font-size: 1.5rem;\n  color: #60666d;\n}\n@media (min-width: 768px) {\n  .form--selector {\n    width: 70%;\n  }\n}\n@media (min-width: 992px) {\n  .form--selector {\n    width: 50%;\n  }\n}\n@media (min-width: 1200px) {\n  .form--selector {\n    width: 30%;\n  }\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/QAList.less":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/less-loader/dist/cjs.js!./src/styles/QAList.less ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".accordion {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 2px;\n}\n.accordion__item + .accordion__item {\n  border-top: 1px solid var(--primary-color);\n}\n.accordion__button {\n  background-color: var(--primary-color--very-light);\n  color: #444;\n  cursor: pointer;\n  padding: 18px;\n  width: 100%;\n  text-align: left;\n  border: none;\n  outline: 0;\n}\n.accordion__button:hover {\n  background-color: var(--primary-color--light);\n}\n.accordion__button:before {\n  display: inline-block;\n  content: '';\n  height: 10px;\n  width: 10px;\n  margin-right: 12px;\n  border-bottom: 2px solid currentColor;\n  border-right: 2px solid currentColor;\n  transform: rotate(-45deg);\n}\n.accordion__button[aria-expanded='true']::before,\n.accordion__button[aria-selected='true']::before {\n  transform: rotate(45deg);\n}\n.accordion__panel {\n  padding: 20px;\n  white-space: pre-wrap;\n  -webkit-animation: fadein 0.35s ease-in;\n          animation: fadein 0.35s ease-in;\n}\np {\n  font-size: 0.8rem;\n  border-bottom: 0;\n  margin-bottom: 0;\n}\n/* -------------------------------------------------- */\n/* ---------------- Animation part ------------------ */\n/* -------------------------------------------------- */\n@-webkit-keyframes fadein {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fadein {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/QuestionPage.less":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/less-loader/dist/cjs.js!./src/styles/QuestionPage.less ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".content {\n  width: 100%;\n  max-width: 1366px;\n  margin: 0 auto;\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n}\n@media (min-width: 1366px) {\n  .showAnswer {\n    margin-right: 120px;\n    margin-left: 120px;\n  }\n}\n.showAnswer p {\n  font-size: 1.2rem;\n  border-bottom: 0;\n  margin-bottom: 0;\n  line-height: 1.5;\n  display: block;\n  -webkit-margin-before: 1em;\n          margin-block-start: 1em;\n  -webkit-margin-after: 1em;\n          margin-block-end: 1em;\n  -webkit-margin-start: 0px;\n          margin-inline-start: 0px;\n  -webkit-margin-end: 0px;\n          margin-inline-end: 0px;\n}\n.showAnswer--info {\n  font-weight: bold;\n  margin: 20px 0 10px;\n  margin-right: 120px;\n}\n.answer {\n  color: #333;\n  border-top: solid 1px #8b51c6;\n  position: relative;\n  margin-bottom: 30px;\n  max-width: 720px;\n}\n.answer--content {\n  font-size: 1.24rem;\n  padding: 0rem 3.7rem;\n  font-weight: normal;\n}\n.question {\n  color: #333;\n  border-top: solid 1px #82c289;\n  position: relative;\n  margin-bottom: 50px;\n  max-width: 720px;\n  line-height: 1.2;\n}\n@media (min-width: 768px) {\n  .question {\n    margin-bottom: 70px;\n  }\n}\n.serviceDescription {\n  color: #333;\n  font-size: 20px;\n  padding: 30px 0px;\n  margin-bottom: 30px;\n}\n@media (min-width: 768px) {\n  .serviceDescription {\n    font-size: 40px;\n    padding: 40px 0px;\n  }\n}\n.serviceDescription--link {\n  color: #82c289;\n  text-decoration: underline;\n  background-color: transparent;\n}\n.serviceDescription--svg {\n  width: 100%;\n  margin: 10px auto 20px;\n  display: block;\n  max-width: 335px;\n  border: 0;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/SectionHero.less":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/less-loader/dist/cjs.js!./src/styles/SectionHero.less ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".hero {\n  color: #333;\n  border-bottom: solid 1px #000000;\n}\n.hero--description {\n  font-size: 2.5rem;\n}\n.hero--description--colored {\n  color: #8c52c7;\n}\n.hero--tips {\n  color: #8c52c7;\n  background-color: rgba(139, 81, 198, 0.1);\n  font-size: 0.9em;\n  padding: 0.8em;\n  margin-top: 0.67em;\n  margin-bottom: 0.67em;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/SectionQuestions.less":
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/less-loader/dist/cjs.js!./src/styles/SectionQuestions.less ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".container {\n  border: solid 1px #000000;\n  padding: 2rem;\n  margin: 2.8rem 1rem;\n}\n.container--header {\n  font-size: 2.5rem;\n  color: #333;\n}\n.container--text {\n  margin: 0 0 10px;\n  font-size: 1.4rem;\n  color: #333;\n}\n.container--text--colored {\n  color: #82c289;\n  line-height: 1.5;\n}\n.container--form--input {\n  width: 100%;\n  padding: 0.5rem;\n  border: solid 1px #d1d1d1;\n  border-radius: 0;\n  -webkit-appearance: none;\n  font-size: 15px;\n  height: 1.5vh;\n}\n.container--form--header {\n  font-size: 1.25rem;\n  margin-bottom: 0.6rem;\n  font-weight: bold;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/base.less":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/less-loader/dist/cjs.js!./src/styles/base.less ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".base {\n  font-family: 'GT America', Arial, sans-serif;\n  margin-left: 2.2rem;\n  margin-right: 2.2rem;\n  font-size: 1.1rem;\n  line-height: 1.7;\n}\n@media (min-width: 768px) {\n  .base {\n    font-size: 20px;\n  }\n}\n/*Form*/\n.textarea,\n.email {\n  resize: none;\n  width: 95%;\n  padding: 1rem;\n  border: solid 1px #d1d1d1;\n  border-radius: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  font-size: 1rem;\n}\n.textarea.error,\n.email.error {\n  border-color: red;\n}\n.textarea {\n  height: 8rem;\n}\n/*Dropdown*/\n.Dropdown-root {\n  position: relative;\n  font-size: 1.2rem;\n  padding-bottom: 1rem;\n}\n.Dropdown-control {\n  position: relative;\n  overflow: hidden;\n  background-color: white;\n  border: 1px solid #d1d1d1;\n  box-sizing: border-box;\n  color: #000000;\n  cursor: default;\n  outline: none;\n  padding: 8px 52px 8px 10px;\n  transition: all 200ms ease;\n}\n.Dropdown-control:hover {\n  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);\n}\n.Dropdown-arrow {\n  border-color: #5f9f66 transparent transparent;\n  border-style: solid;\n  border-width: 5px 5px 0;\n  content: '';\n  display: block;\n  height: 0;\n  margin-top: -ceil(2.5);\n  position: absolute;\n  right: 10px;\n  top: 45%;\n  width: 0;\n}\n.is-open .Dropdown-arrow {\n  border-color: transparent transparent #5f9f66;\n  border-width: 0 5px 5px;\n}\n.Dropdown-menu {\n  background-color: white;\n  border: 1px solid #dfdad5;\n  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);\n  box-sizing: border-box;\n  margin-top: -1px;\n  max-height: 200px;\n  overflow-y: auto;\n  position: absolute;\n  top: 100%;\n  width: 100%;\n  z-index: 1000;\n  -webkit-overflow-scrolling: touch;\n}\n.Dropdown-menu .Dropdown-group > .Dropdown-title {\n  padding: 8px 10px;\n  color: #333333;\n  font-weight: bold;\n  text-transform: capitalize;\n}\n.Dropdown-option {\n  box-sizing: border-box;\n  color: #666666;\n  cursor: pointer;\n  display: block;\n  padding: 8px 10px;\n}\n.Dropdown-option:last-child {\n  border-bottom-right-radius: 2px;\n  border-bottom-left-radius: 2px;\n}\n.Dropdown-option:hover {\n  background-color: #5f9f66;\n  color: #333;\n}\n.Dropdown-option.is-selected {\n  background-color: #82c289;\n  color: #666666;\n}\n.Dropdown-noresults {\n  box-sizing: border-box;\n  color: #666666;\n  cursor: default;\n  display: block;\n  padding: 8px 10px;\n}\n/*Buttons*/\ninput[type='submit'] {\n  height: 4rem;\n  width: 8rem;\n  border: none;\n  background-color: #82c289;\n  margin-top: 0.5rem;\n  color: white;\n  font-size: 20px;\n  text-align: center;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _styles_base_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/base.less */ "./src/styles/base.less");
/* harmony import */ var _styles_base_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_base_less__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _views_LandingPage_LandingPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/LandingPage/LandingPage */ "./src/views/LandingPage/LandingPage.tsx");
/* harmony import */ var _ui_components_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui/components/Header */ "./src/ui/components/Header.tsx");
/* harmony import */ var _ui_components_Footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui/components/Footer */ "./src/ui/components/Footer.tsx");
/* harmony import */ var _views_QA_QA__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/QA/QA */ "./src/views/QA/QA.tsx");
/* harmony import */ var _ui_components_QAForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ui/components/QAForm */ "./src/ui/components/QAForm.tsx");
/* harmony import */ var _views_QuestionPage_QuestionPage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./views/QuestionPage/QuestionPage */ "./src/views/QuestionPage/QuestionPage.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


// Styles

// Pages

// Global components





var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //Constructing state
        _this.state = {
            time: new Date(),
            isOpen: false,
        };
        return _this;
    }
    App.prototype.tick = function () {
        //Setting the date
        this.setState({
            time: new Date(),
        });
    };
    App.prototype.componentDidMount = function () {
        var _this = this;
        //Setting the date every 10th second.
        setInterval(function () { return _this.tick(); }, 10 * 1000);
    };
    App.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "base" },
                Object(_ui_components_Header__WEBPACK_IMPORTED_MODULE_4__["default"])(this.state),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["BrowserRouter"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/questions", exact: true, component: _views_QA_QA__WEBPACK_IMPORTED_MODULE_6__["default"] }),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/questions/new", exact: true, component: _ui_components_QAForm__WEBPACK_IMPORTED_MODULE_7__["default"] }),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/questions/:id", render: function (_a) {
                                var match = _a.match;
                                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_views_QuestionPage_QuestionPage__WEBPACK_IMPORTED_MODULE_8__["default"], { id: match.params.id });
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/", exact: true, component: _views_LandingPage_LandingPage__WEBPACK_IMPORTED_MODULE_3__["default"] }),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], { to: "/" })))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ui_components_Footer__WEBPACK_IMPORTED_MODULE_5__["default"], null)));
    };
    return App;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (App);


/***/ }),

/***/ "./src/assets/images/figure_4.svg":
/*!****************************************!*\
  !*** ./src/assets/images/figure_4.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "66ed571bb52c540788ae30c20667b2a2.svg";

/***/ }),

/***/ "./src/assets/images/rk_logo.png":
/*!***************************************!*\
  !*** ./src/assets/images/rk_logo.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cdbb4116ed2e45e2f4efd73da6166d9c.png";

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/App.tsx");



react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_2__["default"], null), document.getElementById('root'));


/***/ }),

/***/ "./src/services/api-service.ts":
/*!*************************************!*\
  !*** ./src/services/api-service.ts ***!
  \*************************************/
/*! exports provided: get, post, getQuestion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post", function() { return post; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQuestion", function() { return getQuestion; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config */ "./config.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var api = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
    baseURL: _config__WEBPACK_IMPORTED_MODULE_1__["API_URL"],
    headers: _config__WEBPACK_IMPORTED_MODULE_1__["HEADERS"],
});
function get(url) {
    return api
        .get("" + url)
        .then(function (res) { return res; })
        .catch(function (error) { return error; });
}
function post(url, body) {
    return api
        .post("" + url, body)
        .then(function (res) { return res; })
        .catch(function (error) { return error; });
}
function getQuestion(url) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api.get("" + url)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, error_1];
                case 3: return [2 /*return*/];
            }
        });
    });
}


/***/ }),

/***/ "./src/services/date-service.ts":
/*!**************************************!*\
  !*** ./src/services/date-service.ts ***!
  \**************************************/
/*! exports provided: NorwegianDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NorwegianDate", function() { return NorwegianDate; });
function NorwegianDate(date) {
    var tmpDate = new Date(date);
    return (tmpDate.getDate().toString() +
        '.' +
        (tmpDate.getMonth() + 1).toString() +
        '.' +
        tmpDate.getFullYear().toString());
}


/***/ }),

/***/ "./src/services/header-service.ts":
/*!****************************************!*\
  !*** ./src/services/header-service.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getHeader; });
function getHeader(appName) {
    return "" + appName;
}


/***/ }),

/***/ "./src/styles/Footer.less":
/*!********************************!*\
  !*** ./src/styles/Footer.less ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./Footer.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/Footer.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/styles/Header.less":
/*!********************************!*\
  !*** ./src/styles/Header.less ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./Header.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/Header.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/styles/LandingPage.less":
/*!*************************************!*\
  !*** ./src/styles/LandingPage.less ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./LandingPage.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/LandingPage.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/styles/QAForm.less":
/*!********************************!*\
  !*** ./src/styles/QAForm.less ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./QAForm.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/QAForm.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/styles/QAList.less":
/*!********************************!*\
  !*** ./src/styles/QAList.less ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./QAList.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/QAList.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/styles/QuestionPage.less":
/*!**************************************!*\
  !*** ./src/styles/QuestionPage.less ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./QuestionPage.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/QuestionPage.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/styles/SectionHero.less":
/*!*************************************!*\
  !*** ./src/styles/SectionHero.less ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./SectionHero.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/SectionHero.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/styles/SectionQuestions.less":
/*!******************************************!*\
  !*** ./src/styles/SectionQuestions.less ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./SectionQuestions.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/SectionQuestions.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/styles/base.less":
/*!******************************!*\
  !*** ./src/styles/base.less ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./base.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/styles/base.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/ui/components/Footer.tsx":
/*!**************************************!*\
  !*** ./src/ui/components/Footer.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_Footer_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/Footer.less */ "./src/styles/Footer.less");
/* harmony import */ var _styles_Footer_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_Footer_less__WEBPACK_IMPORTED_MODULE_1__);


var Footer = function () { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "footer" },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", { className: "footer--content", id: "footer--content" },
        "F\u00F8lg oss p\u00E5",
        ' ',
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { className: "footer--content--link", href: "https://www.facebook.com/digitalleksehjelp/" }, "Facebook")))); };
/* harmony default export */ __webpack_exports__["default"] = (Footer);


/***/ }),

/***/ "./src/ui/components/Header.tsx":
/*!**************************************!*\
  !*** ./src/ui/components/Header.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Header; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_Header_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/Header.less */ "./src/styles/Header.less");
/* harmony import */ var _styles_Header_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_Header_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_header_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/header-service */ "./src/services/header-service.ts");



function Header(props) {
    var isOpen = props.isOpen, time = props.time;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "header" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { className: "header--link", href: "/" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "header--logo", id: "header--logo" }, Object(_services_header_service__WEBPACK_IMPORTED_MODULE_2__["default"])('Digital Leksehjelp')),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "header--serviceStatusMessage" },
                !isOpen && time.getDay() >= 5 && ' åpner mandag kl. 17:00',
                !isOpen && time.getDay() < 5 && ' åpner kl. 17:00',
                isOpen && ' åpen')),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", { className: "header--rk_logo", src: __webpack_require__(/*! ../../assets/images/rk_logo.png */ "./src/assets/images/rk_logo.png") }))));
}


/***/ }),

/***/ "./src/ui/components/QAForm.tsx":
/*!**************************************!*\
  !*** ./src/ui/components/QAForm.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_QAForm_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/QAForm.less */ "./src/styles/QAForm.less");
/* harmony import */ var _styles_QAForm_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_QAForm_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/api-service */ "./src/services/api-service.ts");
/* harmony import */ var react_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dropdown */ "./node_modules/react-dropdown/dist/index.js");
/* harmony import */ var react_dropdown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dropdown__WEBPACK_IMPORTED_MODULE_3__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var QAForm = /** @class */ (function (_super) {
    __extends(QAForm, _super);
    function QAForm(state) {
        var _this = _super.call(this, state) || this;
        _this.handleChange = function (event, type) {
            var formControls = _this.state.formControls;
            var label, value;
            if (type === 'email' || type === 'question') {
                value = event.target.value;
                formControls[type] = { value: value };
            }
            else {
                label = event.label;
                value = event.value;
                formControls[type] = {
                    label: label,
                    value: value,
                };
            }
            _this.setState({ formControls: formControls });
        };
        _this.state = {
            courses: [],
            grades: [],
            formControls: {
                email: {
                    value: '',
                    label: '',
                },
                course: {
                    value: '',
                    label: '',
                },
                theme: {
                    value: '',
                    label: '',
                },
                question: {
                    value: '',
                    label: '',
                },
                grade: {
                    value: '',
                    label: '',
                },
            },
        };
        return _this;
    }
    QAForm.prototype.componentDidMount = function () {
        var _this = this;
        Object(_services_api_service__WEBPACK_IMPORTED_MODULE_2__["get"])('courses')
            .then(function (res) {
            _this.setState({
                courses: res.data,
            });
        })
            .catch(function (e) { return console.error(e.getMessage); });
        Object(_services_api_service__WEBPACK_IMPORTED_MODULE_2__["get"])('grades')
            .then(function (res) {
            _this.setState({
                grades: res.data,
            });
        })
            .catch(function (e) { return console.error(e.getMessage); });
    };
    QAForm.prototype.handleSubmit = function () {
        var formControls = this.state.formControls;
        var body = {
            email: formControls.email.value,
            grade: Number(formControls.email.value),
            course: Number(formControls.email.value),
            theme: Number(formControls.email.value),
            question: formControls.email.value,
        };
        Object(_services_api_service__WEBPACK_IMPORTED_MODULE_2__["post"])('courses', body)
            .then(function (res) { return console.log(res.data); })
            .catch(function (e) { return console.error(e.getMessage); });
    };
    QAForm.prototype.getCourseOptions = function () {
        return this.state.courses.map(function (course) {
            return {
                value: course.id.toString(),
                label: course.name,
            };
        });
    };
    QAForm.prototype.getThemeOptions = function () {
        var _this = this;
        var chosenCourse = this.state.courses.filter(function (course) { return course.name === _this.state.formControls.course.label; })[0]; // Will always only be one entry in array
        if (chosenCourse) {
            return chosenCourse.themes.map(function (theme) {
                return {
                    value: theme.id.toString(),
                    label: theme.name,
                };
            });
        }
        else
            return [];
    };
    QAForm.prototype.getGradeOptions = function () {
        return this.state.grades.map(function (grade) {
            return {
                value: grade.id.toString(),
                label: grade.name,
            };
        });
    };
    QAForm.prototype.render = function () {
        var _this = this;
        var formControls = this.state.formControls;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'container' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", { className: 'form' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "form--input-container" },
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", { className: 'form--label' }, "Tema:"),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_dropdown__WEBPACK_IMPORTED_MODULE_3___default.a, { placeholder: 'Velg fag', options: this.getCourseOptions(), value: formControls.course.value && formControls.course, onChange: function (event) { return _this.handleChange(event, 'course'); } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_dropdown__WEBPACK_IMPORTED_MODULE_3___default.a, { disabled: !formControls.course.value, placeholder: 'Velg undertema', options: this.getThemeOptions(), value: formControls.theme.value && formControls.theme, onChange: function (event) { return _this.handleChange(event, 'theme'); } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", { className: 'form--label' }, "Klassetrinn:"),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_dropdown__WEBPACK_IMPORTED_MODULE_3___default.a, { placeholder: 'Velg klassetrinn', options: this.getGradeOptions(), value: formControls.grade.value && formControls.grade, onChange: function (event) { return _this.handleChange(event, 'grade'); } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", { className: "form--label" }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", { placeholder: 'Beskriv med egne ord hva du lurer på, og forklar gjerne hva det er du har kommet fram til på egenhånd.', className: 'textarea', value: formControls.question.value, onChange: function (event) { return _this.handleChange(event, 'question'); } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", { className: 'form--label' }, "E-post:"),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", { className: 'email', value: formControls.email.value, onChange: function (event) { return _this.handleChange(event, 'email'); }, type: "email", name: 'email' })),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", { onSubmit: function () { return _this.handleSubmit(); }, type: "submit", value: 'Send' }))));
    };
    return QAForm;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (QAForm);


/***/ }),

/***/ "./src/ui/components/QAList.tsx":
/*!**************************************!*\
  !*** ./src/ui/components/QAList.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QAList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_QAList_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/QAList.less */ "./src/styles/QAList.less");
/* harmony import */ var _styles_QAList_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_QAList_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_accessible_accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-accessible-accordion */ "./node_modules/react-accessible-accordion/dist/umd/index.js");
/* harmony import */ var react_accessible_accordion__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_accessible_accordion__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_date_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/date-service */ "./src/services/date-service.ts");




function QAList(questions) {
    if (questions && questions.length > 0) {
        /*This array can be null (before we fetch it)*/
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_accessible_accordion__WEBPACK_IMPORTED_MODULE_2__["Accordion"], { allowZeroExpanded: true }, questions.map(function (question) {
            return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_accessible_accordion__WEBPACK_IMPORTED_MODULE_2__["AccordionItem"], { key: "question-" + question.id },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_accessible_accordion__WEBPACK_IMPORTED_MODULE_2__["AccordionItemHeading"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_accessible_accordion__WEBPACK_IMPORTED_MODULE_2__["AccordionItemButton"], null,
                        question.title,
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null,
                            question.course,
                            ", ",
                            question.grade,
                            ",",
                            ' ',
                            Object(_services_date_service__WEBPACK_IMPORTED_MODULE_3__["NorwegianDate"])(question.date)))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_accessible_accordion__WEBPACK_IMPORTED_MODULE_2__["AccordionItemPanel"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, question.question),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, question.answer))));
        })));
    }
    else {
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            "Fant du ikke det du lette etter? ",
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { href: "#" }, "Still et sp\u00F8rsm\u00E5l")));
    }
}


/***/ }),

/***/ "./src/views/LandingPage/LandingPage.tsx":
/*!***********************************************!*\
  !*** ./src/views/LandingPage/LandingPage.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Sections_SectionQuestions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sections/SectionQuestions */ "./src/views/LandingPage/Sections/SectionQuestions.tsx");
/* harmony import */ var _Sections_SectionHero__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Sections/SectionHero */ "./src/views/LandingPage/Sections/SectionHero.tsx");
/* harmony import */ var _styles_LandingPage_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/LandingPage.less */ "./src/styles/LandingPage.less");
/* harmony import */ var _styles_LandingPage_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_LandingPage_less__WEBPACK_IMPORTED_MODULE_3__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Sections for this page




var LandingPage = /** @class */ (function (_super) {
    __extends(LandingPage, _super);
    function LandingPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LandingPage.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "content" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Sections_SectionHero__WEBPACK_IMPORTED_MODULE_2__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Sections_SectionQuestions__WEBPACK_IMPORTED_MODULE_1__["default"], null)));
    };
    return LandingPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (LandingPage);


/***/ }),

/***/ "./src/views/LandingPage/Sections/SectionHero.tsx":
/*!********************************************************!*\
  !*** ./src/views/LandingPage/Sections/SectionHero.tsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_SectionHero_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../styles/SectionHero.less */ "./src/styles/SectionHero.less");
/* harmony import */ var _styles_SectionHero_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_SectionHero_less__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var SectionQuestions = /** @class */ (function (_super) {
    __extends(SectionQuestions, _super);
    function SectionQuestions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SectionQuestions.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "hero" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "hero--description" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "hero--description--colored" }, "Gratis, trygt "),
                " og",
                ' ',
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "hero--description--colored" }, "anonymt"),
                " for deg p\u00E5 ungdomsskolen og videreg\u00E5ende."),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "hero--tips", id: "hero--tips" }, "Hvis det tar lang tid \u00E5 f\u00E5 videohjelp anbefaler vi \u00E5 pr\u00F8ve vanlig chat i stedet. Det g\u00E5r ofte raskere!")));
    };
    return SectionQuestions;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (SectionQuestions);


/***/ }),

/***/ "./src/views/LandingPage/Sections/SectionQuestions.tsx":
/*!*************************************************************!*\
  !*** ./src/views/LandingPage/Sections/SectionQuestions.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_SectionQuestions_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../styles/SectionQuestions.less */ "./src/styles/SectionQuestions.less");
/* harmony import */ var _styles_SectionQuestions_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_SectionQuestions_less__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var SectionQuestions = /** @class */ (function (_super) {
    __extends(SectionQuestions, _super);
    function SectionQuestions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SectionQuestions.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "container" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "container--header" }, "Sp\u00F8rsm\u00E5l og svar"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", { className: "container--text", id: "container--text" },
                "Her kan du lete etter svar blant allerede stilte sp\u00F8rsm\u00E5l, eller",
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { href: "http://www.digitalleksehjelp.no/sporsmal", className: "container--text--colored" },
                    ' ',
                    "stille et nytt sp\u00F8rsm\u00E5l"),
                ' ',
                "hvis du ikke finner det du lurer p\u00E5!"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", { className: "container--form" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "container--form--header" }, "S\u00F8k etter sp\u00F8rsm\u00E5l"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", { className: "container--form--input" }))));
    };
    return SectionQuestions;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (SectionQuestions);


/***/ }),

/***/ "./src/views/QA/QA.tsx":
/*!*****************************!*\
  !*** ./src/views/QA/QA.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/api-service */ "./src/services/api-service.ts");
/* harmony import */ var _ui_components_QAList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ui/components/QAList */ "./src/ui/components/QAList.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var QA = /** @class */ (function (_super) {
    __extends(QA, _super);
    function QA(state) {
        var _this = _super.call(this, state) || this;
        _this.state = {
            questions: [],
        };
        return _this;
    }
    QA.prototype.componentDidMount = function () {
        var _this = this;
        Object(_services_api_service__WEBPACK_IMPORTED_MODULE_1__["get"])('questions')
            .then(function (res) {
            console.log(res);
            _this.setState({
                questions: res.data,
            });
        })
            .then(function () { return console.log(_this.state.questions); });
    };
    QA.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, Object(_ui_components_QAList__WEBPACK_IMPORTED_MODULE_2__["default"])(this.state.questions));
    };
    return QA;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (QA);


/***/ }),

/***/ "./src/views/QuestionPage/QuestionPage.tsx":
/*!*************************************************!*\
  !*** ./src/views/QuestionPage/QuestionPage.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/QuestionPage.less */ "./src/styles/QuestionPage.less");
/* harmony import */ var _styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api-service */ "./src/services/api-service.ts");
/* harmony import */ var _Sections_SectionQuestion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Sections/SectionQuestion */ "./src/views/QuestionPage/Sections/SectionQuestion.tsx");
/* harmony import */ var _Sections_SectionAnswer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Sections/SectionAnswer */ "./src/views/QuestionPage/Sections/SectionAnswer.tsx");
/* harmony import */ var _Sections_SectionMetadata__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Sections/SectionMetadata */ "./src/views/QuestionPage/Sections/SectionMetadata.tsx");
/* harmony import */ var _Sections_SectionServiceDescription__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Sections/SectionServiceDescription */ "./src/views/QuestionPage/Sections/SectionServiceDescription.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


// Styles

// Services

// Sections




var Question = /** @class */ (function (_super) {
    __extends(Question, _super);
    function Question(props, state) {
        var _this = _super.call(this, props, state) || this;
        _this.state = state;
        return _this;
    }
    Question.prototype.componentDidMount = function () {
        var _this = this;
        Object(_services_api_service__WEBPACK_IMPORTED_MODULE_3__["getQuestion"])("questions/" + this.props.id).then(function (res) {
            res.data
                ? _this.setState({
                    question: res.data,
                })
                : _this.setState({ error: res });
        });
    };
    Question.prototype.render = function () {
        var _a = this.state, question = _a.question, error = _a.error;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "content" },
            question && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "showAnswer" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Sections_SectionMetadata__WEBPACK_IMPORTED_MODULE_6__["default"], { date: question.date, course: question.course }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Sections_SectionQuestion__WEBPACK_IMPORTED_MODULE_4__["default"], { question: question.question, grade: question.grade }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Sections_SectionAnswer__WEBPACK_IMPORTED_MODULE_5__["default"], { answer: question.answer }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Sections_SectionServiceDescription__WEBPACK_IMPORTED_MODULE_7__["default"], null))),
            error && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], { to: "/questions" })));
    };
    return Question;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Question);


/***/ }),

/***/ "./src/views/QuestionPage/Sections/SectionAnswer.tsx":
/*!***********************************************************!*\
  !*** ./src/views/QuestionPage/Sections/SectionAnswer.tsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SectionAnswer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../styles/QuestionPage.less */ "./src/styles/QuestionPage.less");
/* harmony import */ var _styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_1__);


function SectionAnswer(props) {
    var answer = props.answer;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "answer" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", { className: "showAnswer--info" }, 'Svaret er skrevet av en frivillig hos Digital Leksehjelp.'),
        answer));
}


/***/ }),

/***/ "./src/views/QuestionPage/Sections/SectionMetadata.tsx":
/*!*************************************************************!*\
  !*** ./src/views/QuestionPage/Sections/SectionMetadata.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SectionMetadata; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../styles/QuestionPage.less */ "./src/styles/QuestionPage.less");
/* harmony import */ var _styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_1__);


function SectionMetadata(props) {
    var course = props.course, date = props.date;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "metadata" }, course + ', ' + date);
}


/***/ }),

/***/ "./src/views/QuestionPage/Sections/SectionQuestion.tsx":
/*!*************************************************************!*\
  !*** ./src/views/QuestionPage/Sections/SectionQuestion.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SectionQuestion; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../styles/QuestionPage.less */ "./src/styles/QuestionPage.less");
/* harmony import */ var _styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_1__);


function SectionQuestion(props) {
    var question = props.question, grade = props.grade;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "question" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", { className: "showAnswer--info" },
            ' ',
            'Spørmsålet er stilt av en elev i ' + grade + '.'),
        question));
}


/***/ }),

/***/ "./src/views/QuestionPage/Sections/SectionServiceDescription.tsx":
/*!***********************************************************************!*\
  !*** ./src/views/QuestionPage/Sections/SectionServiceDescription.tsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SectionServiceDescription; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../styles/QuestionPage.less */ "./src/styles/QuestionPage.less");
/* harmony import */ var _styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_QuestionPage_less__WEBPACK_IMPORTED_MODULE_1__);


function SectionServiceDescription(_a) {
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "serviceDescription" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            "P\u00E5 Digital Leksehjelp kan du",
            ' ',
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { href: "/questions", className: "serviceDescription--link" }, "stille sp\u00F8rsm\u00E5l"),
            ' ',
            "eller f\u00E5",
            ' ',
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { href: "/", className: "serviceDescription--link" }, "direkte hjelp"),
            ' ',
            "fra en frivillig med leksene."),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", { className: "serviceDescription--svg", src: __webpack_require__(/*! ../../../assets/images/figure_4.svg */ "./src/assets/images/figure_4.svg") })));
}


/***/ }),

/***/ 0:
/*!*******************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost:3000 ./src/index.tsx ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/gustav/Documents/capra/projects/temp/redcross-digital-leksehjelp-frontend-student/node_modules/webpack-dev-server/client/index.js?http://localhost:3000 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:3000");
module.exports = __webpack_require__(/*! ./src/index.tsx */"./src/index.tsx");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnLnRzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvRm9vdGVyLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9IZWFkZXIubGVzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL0xhbmRpbmdQYWdlLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9RQUZvcm0ubGVzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL1FBTGlzdC5sZXNzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvUXVlc3Rpb25QYWdlLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9TZWN0aW9uSGVyby5sZXNzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvU2VjdGlvblF1ZXN0aW9ucy5sZXNzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYmFzZS5sZXNzIiwid2VicGFjazovLy8od2VicGFjaykvaG90IHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9sb2ckIiwid2VicGFjazovLy8uL3NyYy9BcHAudHN4Iiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ZpZ3VyZV80LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9ya19sb2dvLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHN4Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9hcGktc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvZGF0ZS1zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9oZWFkZXItc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL0Zvb3Rlci5sZXNzPzdjOTciLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9IZWFkZXIubGVzcz85OTNmIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvTGFuZGluZ1BhZ2UubGVzcz9jMzA4Iiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvUUFGb3JtLmxlc3M/MGE0MiIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL1FBTGlzdC5sZXNzPzNlM2UiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9RdWVzdGlvblBhZ2UubGVzcz83YjBkIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvU2VjdGlvbkhlcm8ubGVzcz83MTFmIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvU2VjdGlvblF1ZXN0aW9ucy5sZXNzP2Q5NjciLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9iYXNlLmxlc3M/MGQ3NSIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9Gb290ZXIudHN4Iiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL0hlYWRlci50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvUUFGb3JtLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9RQUxpc3QudHN4Iiwid2VicGFjazovLy8uL3NyYy92aWV3cy9MYW5kaW5nUGFnZS9MYW5kaW5nUGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL0xhbmRpbmdQYWdlL1NlY3Rpb25zL1NlY3Rpb25IZXJvLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvTGFuZGluZ1BhZ2UvU2VjdGlvbnMvU2VjdGlvblF1ZXN0aW9ucy50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1FBL1FBLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvUXVlc3Rpb25QYWdlL1F1ZXN0aW9uUGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1F1ZXN0aW9uUGFnZS9TZWN0aW9ucy9TZWN0aW9uQW5zd2VyLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvUXVlc3Rpb25QYWdlL1NlY3Rpb25zL1NlY3Rpb25NZXRhZGF0YS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1F1ZXN0aW9uUGFnZS9TZWN0aW9ucy9TZWN0aW9uUXVlc3Rpb24udHN4Iiwid2VicGFjazovLy8uL3NyYy92aWV3cy9RdWVzdGlvblBhZ2UvU2VjdGlvbnMvU2VjdGlvblNlcnZpY2VEZXNjcmlwdGlvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNE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QyxvQkFBb0I7UUFDakM7O1lBQytCLEdBQUc7WUFDaEMsa0VBQUcsSUFBSSxFQUFDLFlBQVksRUFBQyxTQUFTLEVBQUMsMEJBQTBCLGdDQUVyRDtZQUFDLEdBQUc7O1lBQ0MsR0FBRztZQUNaLGtFQUFHLElBQUksRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLDBCQUEwQixvQkFFNUM7WUFBQyxHQUFHOzRDQUVKO1FBQ04sb0VBQ0UsU0FBUyxFQUFDLHlCQUF5QixFQUNuQyxHQUFHLEVBQUUsbUJBQU8sQ0FBQyw2RUFBcUMsQ0FBQyxHQUNuRCxDQUNFLENBQ1AsQ0FBQztBQUNKLENBQUMiLCJmaWxlIjoibWFpbi5mOTQ0MTVmZmE5MmM4NmYwOWZjMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJtYWluXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9ycy1tYWluXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiZXhwb3J0IGNvbnN0IEFQSV9VUkwgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDgwLyc7XG5leHBvcnQgY29uc3QgSEVBREVSUyA9IHtcbiAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG59O1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuZm9vdGVyIHtcXG4gIGhlaWdodDogM3JlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4YzUyYzc7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG59XFxuLmZvb3Rlci0tY29udGVudCB7XFxuICBmb250LXNpemU6IDEuMjRyZW07XFxuICBwYWRkaW5nOiAwcmVtIDMuN3JlbTtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxufVxcbi5mb290ZXItLWNvbnRlbnQtLWxpbmsge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxufVxcblwiLCBcIlwiXSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmhlYWRlciB7XFxuICBoZWlnaHQ6IDVyZW07XFxuICBtYXJnaW4tdG9wOiAxLjRyZW07XFxuICBtYXJnaW4tYm90dG9tOiAxLjRyZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgZm9udC1zaXplOiAxLjI0cmVtO1xcbn1cXG4uaGVhZGVyLS1ya19sb2dvIHtcXG4gIGhlaWdodDogMi41cmVtO1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuLmhlYWRlci0tbG9nbyB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICBjb2xvcjogIzAwMDAwMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmhlYWRlci0tc2VydmljZVN0YXR1c01lc3NhZ2Uge1xcbiAgY29sb3I6ICM4YzUyYzc7XFxufVxcbi5oZWFkZXItLWxpbmsge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jb250ZW50IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWF4LXdpZHRoOiAxMzY2cHg7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4uY29udGVudCA+ICoge1xcbiAgZmxleC1zaHJpbms6IDA7XFxufVxcblwiLCBcIlwiXSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmJhc2Uge1xcbiAgZm9udC1mYW1pbHk6ICdHVCBBbWVyaWNhJywgQXJpYWwsIHNhbnMtc2VyaWY7XFxuICBtYXJnaW4tbGVmdDogMi4ycmVtO1xcbiAgbWFyZ2luLXJpZ2h0OiAyLjJyZW07XFxuICBmb250LXNpemU6IDEuMXJlbTtcXG4gIGxpbmUtaGVpZ2h0OiAxLjc7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLmJhc2Uge1xcbiAgICBmb250LXNpemU6IDIwcHg7XFxuICB9XFxufVxcbi8qRm9ybSovXFxuLnRleHRhcmVhLFxcbi5lbWFpbCB7XFxuICByZXNpemU6IG5vbmU7XFxuICB3aWR0aDogOTUlO1xcbiAgcGFkZGluZzogMXJlbTtcXG4gIGJvcmRlcjogc29saWQgMXB4ICNkMWQxZDE7XFxuICBib3JkZXItcmFkaXVzOiAwO1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbn1cXG4udGV4dGFyZWEuZXJyb3IsXFxuLmVtYWlsLmVycm9yIHtcXG4gIGJvcmRlci1jb2xvcjogcmVkO1xcbn1cXG4udGV4dGFyZWEge1xcbiAgaGVpZ2h0OiA4cmVtO1xcbn1cXG4vKkRyb3Bkb3duKi9cXG4uRHJvcGRvd24tcm9vdCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIHBhZGRpbmctYm90dG9tOiAxcmVtO1xcbn1cXG4uRHJvcGRvd24tY29udHJvbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZDFkMWQxO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIHBhZGRpbmc6IDhweCA1MnB4IDhweCAxMHB4O1xcbiAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2U7XFxufVxcbi5Ecm9wZG93bi1jb250cm9sOmhvdmVyIHtcXG4gIGJveC1zaGFkb3c6IDAgMXB4IDAgcmdiYSgwLCAwLCAwLCAwLjA2KTtcXG59XFxuLkRyb3Bkb3duLWFycm93IHtcXG4gIGJvcmRlci1jb2xvcjogIzVmOWY2NiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBib3JkZXItd2lkdGg6IDVweCA1cHggMDtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBoZWlnaHQ6IDA7XFxuICBtYXJnaW4tdG9wOiAtY2VpbCgyLjUpO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDEwcHg7XFxuICB0b3A6IDQ1JTtcXG4gIHdpZHRoOiAwO1xcbn1cXG4uaXMtb3BlbiAuRHJvcGRvd24tYXJyb3cge1xcbiAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjNWY5ZjY2O1xcbiAgYm9yZGVyLXdpZHRoOiAwIDVweCA1cHg7XFxufVxcbi5Ecm9wZG93bi1tZW51IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RmZGFkNTtcXG4gIGJveC1zaGFkb3c6IDAgMXB4IDAgcmdiYSgwLCAwLCAwLCAwLjA2KTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBtYXJnaW4tdG9wOiAtMXB4O1xcbiAgbWF4LWhlaWdodDogMjAwcHg7XFxuICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB6LWluZGV4OiAxMDAwO1xcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xcbn1cXG4uRHJvcGRvd24tbWVudSAuRHJvcGRvd24tZ3JvdXAgPiAuRHJvcGRvd24tdGl0bGUge1xcbiAgcGFkZGluZzogOHB4IDEwcHg7XFxuICBjb2xvcjogIzMzMzMzMztcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxufVxcbi5Ecm9wZG93bi1vcHRpb24ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGNvbG9yOiAjNjY2NjY2O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nOiA4cHggMTBweDtcXG59XFxuLkRyb3Bkb3duLW9wdGlvbjpsYXN0LWNoaWxkIHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAycHg7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAycHg7XFxufVxcbi5Ecm9wZG93bi1vcHRpb246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmOWY2NjtcXG4gIGNvbG9yOiAjMzMzO1xcbn1cXG4uRHJvcGRvd24tb3B0aW9uLmlzLXNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4MmMyODk7XFxuICBjb2xvcjogIzY2NjY2NjtcXG59XFxuLkRyb3Bkb3duLW5vcmVzdWx0cyB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgY29sb3I6ICM2NjY2NjY7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmc6IDhweCAxMHB4O1xcbn1cXG4vKkJ1dHRvbnMqL1xcbmlucHV0W3R5cGU9J3N1Ym1pdCddIHtcXG4gIGhlaWdodDogNHJlbTtcXG4gIHdpZHRoOiA4cmVtO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzgyYzI4OTtcXG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLmNvbnRhaW5lciB7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjA1KTtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAuY29udGFpbmVyIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiA2MHB4O1xcbiAgICBtYXJnaW4tbGVmdDogNjBweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogNjBweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDEzNjZweCkge1xcbiAgLmNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICB9XFxuICAuY29udGFpbmVyID4gKiB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICB9XFxuICAuY29udGFpbmVyID4gKjpub3QoOmxhc3QtY2hpbGQpIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xcbiAgfVxcbn1cXG4uZm9ybSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLmZvcm0tLWxhYmVsIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWF4LXdpZHRoOiBpbml0aWFsO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBmb250LXNpemU6IDEuM3JlbTtcXG4gIHBhZGRpbmctYm90dG9tOiAwLjVyZW07XFxufVxcbi5mb3JtLS1pbnB1dC1jb250YWluZXIge1xcbiAgd2lkdGg6IDk1JTtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAuZm9ybS0taW5wdXQtY29udGFpbmVyIHtcXG4gICAgcGFkZGluZzogMS41cmVtIDNyZW0gMnJlbTtcXG4gIH1cXG59XFxuLmZvcm0tLXNlbGVjdG9yIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgY29sb3I6ICM2MDY2NmQ7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLmZvcm0tLXNlbGVjdG9yIHtcXG4gICAgd2lkdGg6IDcwJTtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XFxuICAuZm9ybS0tc2VsZWN0b3Ige1xcbiAgICB3aWR0aDogNTAlO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KSB7XFxuICAuZm9ybS0tc2VsZWN0b3Ige1xcbiAgICB3aWR0aDogMzAlO1xcbiAgfVxcbn1cXG5cIiwgXCJcIl0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5hY2NvcmRpb24ge1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cXG4uYWNjb3JkaW9uX19pdGVtICsgLmFjY29yZGlvbl9faXRlbSB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvcik7XFxufVxcbi5hY2NvcmRpb25fX2J1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLS12ZXJ5LWxpZ2h0KTtcXG4gIGNvbG9yOiAjNDQ0O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgcGFkZGluZzogMThweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIG91dGxpbmU6IDA7XFxufVxcbi5hY2NvcmRpb25fX2J1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLS1saWdodCk7XFxufVxcbi5hY2NvcmRpb25fX2J1dHRvbjpiZWZvcmUge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgY29udGVudDogJyc7XFxuICBoZWlnaHQ6IDEwcHg7XFxuICB3aWR0aDogMTBweDtcXG4gIG1hcmdpbi1yaWdodDogMTJweDtcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBjdXJyZW50Q29sb3I7XFxuICBib3JkZXItcmlnaHQ6IDJweCBzb2xpZCBjdXJyZW50Q29sb3I7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xcbn1cXG4uYWNjb3JkaW9uX19idXR0b25bYXJpYS1leHBhbmRlZD0ndHJ1ZSddOjpiZWZvcmUsXFxuLmFjY29yZGlvbl9fYnV0dG9uW2FyaWEtc2VsZWN0ZWQ9J3RydWUnXTo6YmVmb3JlIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG59XFxuLmFjY29yZGlvbl9fcGFuZWwge1xcbiAgcGFkZGluZzogMjBweDtcXG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBmYWRlaW4gMC4zNXMgZWFzZS1pbjtcXG4gICAgICAgICAgYW5pbWF0aW9uOiBmYWRlaW4gMC4zNXMgZWFzZS1pbjtcXG59XFxucCB7XFxuICBmb250LXNpemU6IDAuOHJlbTtcXG4gIGJvcmRlci1ib3R0b206IDA7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbn1cXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi8qIC0tLS0tLS0tLS0tLS0tLS0gQW5pbWF0aW9uIHBhcnQgLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG5ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZWluIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbn1cXG5Aa2V5ZnJhbWVzIGZhZGVpbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuXCIsIFwiXCJdKTtcblxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuY29udGVudCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1heC13aWR0aDogMTM2NnB4O1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBmbGV4LWdyb3c6IDE7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDEzNjZweCkge1xcbiAgLnNob3dBbnN3ZXIge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEyMHB4O1xcbiAgICBtYXJnaW4tbGVmdDogMTIwcHg7XFxuICB9XFxufVxcbi5zaG93QW5zd2VyIHAge1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBib3JkZXItYm90dG9tOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIC13ZWJraXQtbWFyZ2luLWJlZm9yZTogMWVtO1xcbiAgICAgICAgICBtYXJnaW4tYmxvY2stc3RhcnQ6IDFlbTtcXG4gIC13ZWJraXQtbWFyZ2luLWFmdGVyOiAxZW07XFxuICAgICAgICAgIG1hcmdpbi1ibG9jay1lbmQ6IDFlbTtcXG4gIC13ZWJraXQtbWFyZ2luLXN0YXJ0OiAwcHg7XFxuICAgICAgICAgIG1hcmdpbi1pbmxpbmUtc3RhcnQ6IDBweDtcXG4gIC13ZWJraXQtbWFyZ2luLWVuZDogMHB4O1xcbiAgICAgICAgICBtYXJnaW4taW5saW5lLWVuZDogMHB4O1xcbn1cXG4uc2hvd0Fuc3dlci0taW5mbyB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIG1hcmdpbjogMjBweCAwIDEwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IDEyMHB4O1xcbn1cXG4uYW5zd2VyIHtcXG4gIGNvbG9yOiAjMzMzO1xcbiAgYm9yZGVyLXRvcDogc29saWQgMXB4ICM4YjUxYzY7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcbiAgbWF4LXdpZHRoOiA3MjBweDtcXG59XFxuLmFuc3dlci0tY29udGVudCB7XFxuICBmb250LXNpemU6IDEuMjRyZW07XFxuICBwYWRkaW5nOiAwcmVtIDMuN3JlbTtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxufVxcbi5xdWVzdGlvbiB7XFxuICBjb2xvcjogIzMzMztcXG4gIGJvcmRlci10b3A6IHNvbGlkIDFweCAjODJjMjg5O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcXG4gIG1heC13aWR0aDogNzIwcHg7XFxuICBsaW5lLWhlaWdodDogMS4yO1xcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gIC5xdWVzdGlvbiB7XFxuICAgIG1hcmdpbi1ib3R0b206IDcwcHg7XFxuICB9XFxufVxcbi5zZXJ2aWNlRGVzY3JpcHRpb24ge1xcbiAgY29sb3I6ICMzMzM7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBwYWRkaW5nOiAzMHB4IDBweDtcXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLnNlcnZpY2VEZXNjcmlwdGlvbiB7XFxuICAgIGZvbnQtc2l6ZTogNDBweDtcXG4gICAgcGFkZGluZzogNDBweCAwcHg7XFxuICB9XFxufVxcbi5zZXJ2aWNlRGVzY3JpcHRpb24tLWxpbmsge1xcbiAgY29sb3I6ICM4MmMyODk7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4uc2VydmljZURlc2NyaXB0aW9uLS1zdmcge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW46IDEwcHggYXV0byAyMHB4O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXgtd2lkdGg6IDMzNXB4O1xcbiAgYm9yZGVyOiAwO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5oZXJvIHtcXG4gIGNvbG9yOiAjMzMzO1xcbiAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4ICMwMDAwMDA7XFxufVxcbi5oZXJvLS1kZXNjcmlwdGlvbiB7XFxuICBmb250LXNpemU6IDIuNXJlbTtcXG59XFxuLmhlcm8tLWRlc2NyaXB0aW9uLS1jb2xvcmVkIHtcXG4gIGNvbG9yOiAjOGM1MmM3O1xcbn1cXG4uaGVyby0tdGlwcyB7XFxuICBjb2xvcjogIzhjNTJjNztcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTM5LCA4MSwgMTk4LCAwLjEpO1xcbiAgZm9udC1zaXplOiAwLjllbTtcXG4gIHBhZGRpbmc6IDAuOGVtO1xcbiAgbWFyZ2luLXRvcDogMC42N2VtO1xcbiAgbWFyZ2luLWJvdHRvbTogMC42N2VtO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jb250YWluZXIge1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzAwMDAwMDtcXG4gIHBhZGRpbmc6IDJyZW07XFxuICBtYXJnaW46IDIuOHJlbSAxcmVtO1xcbn1cXG4uY29udGFpbmVyLS1oZWFkZXIge1xcbiAgZm9udC1zaXplOiAyLjVyZW07XFxuICBjb2xvcjogIzMzMztcXG59XFxuLmNvbnRhaW5lci0tdGV4dCB7XFxuICBtYXJnaW46IDAgMCAxMHB4O1xcbiAgZm9udC1zaXplOiAxLjRyZW07XFxuICBjb2xvcjogIzMzMztcXG59XFxuLmNvbnRhaW5lci0tdGV4dC0tY29sb3JlZCB7XFxuICBjb2xvcjogIzgyYzI4OTtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxufVxcbi5jb250YWluZXItLWZvcm0tLWlucHV0IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggI2QxZDFkMTtcXG4gIGJvcmRlci1yYWRpdXM6IDA7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICBmb250LXNpemU6IDE1cHg7XFxuICBoZWlnaHQ6IDEuNXZoO1xcbn1cXG4uY29udGFpbmVyLS1mb3JtLS1oZWFkZXIge1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMC42cmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblwiLCBcIlwiXSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmJhc2Uge1xcbiAgZm9udC1mYW1pbHk6ICdHVCBBbWVyaWNhJywgQXJpYWwsIHNhbnMtc2VyaWY7XFxuICBtYXJnaW4tbGVmdDogMi4ycmVtO1xcbiAgbWFyZ2luLXJpZ2h0OiAyLjJyZW07XFxuICBmb250LXNpemU6IDEuMXJlbTtcXG4gIGxpbmUtaGVpZ2h0OiAxLjc7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLmJhc2Uge1xcbiAgICBmb250LXNpemU6IDIwcHg7XFxuICB9XFxufVxcbi8qRm9ybSovXFxuLnRleHRhcmVhLFxcbi5lbWFpbCB7XFxuICByZXNpemU6IG5vbmU7XFxuICB3aWR0aDogOTUlO1xcbiAgcGFkZGluZzogMXJlbTtcXG4gIGJvcmRlcjogc29saWQgMXB4ICNkMWQxZDE7XFxuICBib3JkZXItcmFkaXVzOiAwO1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbn1cXG4udGV4dGFyZWEuZXJyb3IsXFxuLmVtYWlsLmVycm9yIHtcXG4gIGJvcmRlci1jb2xvcjogcmVkO1xcbn1cXG4udGV4dGFyZWEge1xcbiAgaGVpZ2h0OiA4cmVtO1xcbn1cXG4vKkRyb3Bkb3duKi9cXG4uRHJvcGRvd24tcm9vdCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIHBhZGRpbmctYm90dG9tOiAxcmVtO1xcbn1cXG4uRHJvcGRvd24tY29udHJvbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZDFkMWQxO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIHBhZGRpbmc6IDhweCA1MnB4IDhweCAxMHB4O1xcbiAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2U7XFxufVxcbi5Ecm9wZG93bi1jb250cm9sOmhvdmVyIHtcXG4gIGJveC1zaGFkb3c6IDAgMXB4IDAgcmdiYSgwLCAwLCAwLCAwLjA2KTtcXG59XFxuLkRyb3Bkb3duLWFycm93IHtcXG4gIGJvcmRlci1jb2xvcjogIzVmOWY2NiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBib3JkZXItd2lkdGg6IDVweCA1cHggMDtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBoZWlnaHQ6IDA7XFxuICBtYXJnaW4tdG9wOiAtY2VpbCgyLjUpO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDEwcHg7XFxuICB0b3A6IDQ1JTtcXG4gIHdpZHRoOiAwO1xcbn1cXG4uaXMtb3BlbiAuRHJvcGRvd24tYXJyb3cge1xcbiAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjNWY5ZjY2O1xcbiAgYm9yZGVyLXdpZHRoOiAwIDVweCA1cHg7XFxufVxcbi5Ecm9wZG93bi1tZW51IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RmZGFkNTtcXG4gIGJveC1zaGFkb3c6IDAgMXB4IDAgcmdiYSgwLCAwLCAwLCAwLjA2KTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBtYXJnaW4tdG9wOiAtMXB4O1xcbiAgbWF4LWhlaWdodDogMjAwcHg7XFxuICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB6LWluZGV4OiAxMDAwO1xcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xcbn1cXG4uRHJvcGRvd24tbWVudSAuRHJvcGRvd24tZ3JvdXAgPiAuRHJvcGRvd24tdGl0bGUge1xcbiAgcGFkZGluZzogOHB4IDEwcHg7XFxuICBjb2xvcjogIzMzMzMzMztcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxufVxcbi5Ecm9wZG93bi1vcHRpb24ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGNvbG9yOiAjNjY2NjY2O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nOiA4cHggMTBweDtcXG59XFxuLkRyb3Bkb3duLW9wdGlvbjpsYXN0LWNoaWxkIHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAycHg7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAycHg7XFxufVxcbi5Ecm9wZG93bi1vcHRpb246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmOWY2NjtcXG4gIGNvbG9yOiAjMzMzO1xcbn1cXG4uRHJvcGRvd24tb3B0aW9uLmlzLXNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4MmMyODk7XFxuICBjb2xvcjogIzY2NjY2NjtcXG59XFxuLkRyb3Bkb3duLW5vcmVzdWx0cyB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgY29sb3I6ICM2NjY2NjY7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmc6IDhweCAxMHB4O1xcbn1cXG4vKkJ1dHRvbnMqL1xcbmlucHV0W3R5cGU9J3N1Ym1pdCddIHtcXG4gIGhlaWdodDogNHJlbTtcXG4gIHdpZHRoOiA4cmVtO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzgyYzI4OTtcXG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXCIsIFwiXCJdKTtcblxuIiwidmFyIG1hcCA9IHtcblx0XCIuL2xvZ1wiOiBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdCBzeW5jIF5cXFxcLlxcXFwvbG9nJFwiOyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBCcm93c2VyUm91dGVyIGFzIFJvdXRlcixcbiAgUm91dGUsXG4gIFJlZGlyZWN0LFxuICBTd2l0Y2gsXG59IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG4vLyBTdHlsZXNcbmltcG9ydCAnLi9zdHlsZXMvYmFzZS5sZXNzJztcblxuLy8gUGFnZXNcbmltcG9ydCBMYW5kaW5nUGFnZSBmcm9tICcuL3ZpZXdzL0xhbmRpbmdQYWdlL0xhbmRpbmdQYWdlJztcblxuLy8gR2xvYmFsIGNvbXBvbmVudHNcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi91aS9jb21wb25lbnRzL0hlYWRlcic7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vdWkvY29tcG9uZW50cy9Gb290ZXInO1xuaW1wb3J0IFFBIGZyb20gJy4vdmlld3MvUUEvUUEnO1xuaW1wb3J0IFFBRm9ybSBmcm9tICcuL3VpL2NvbXBvbmVudHMvUUFGb3JtJztcbmltcG9ydCBRdWVzdGlvbiBmcm9tICcuL3ZpZXdzL1F1ZXN0aW9uUGFnZS9RdWVzdGlvblBhZ2UnO1xuXG5pbnRlcmZhY2UgSVN0YXRlIHtcbiAgdGltZTogRGF0ZTtcbiAgaXNPcGVuOiBib29sZWFuO1xufVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQ8e30sIElTdGF0ZT4ge1xuICAvL0NvbnN0cnVjdGluZyBzdGF0ZVxuICBwdWJsaWMgcmVhZG9ubHkgc3RhdGU6IFJlYWRvbmx5PElTdGF0ZT4gPSB7XG4gICAgdGltZTogbmV3IERhdGUoKSxcbiAgICBpc09wZW46IGZhbHNlLFxuICB9O1xuXG4gIHByaXZhdGUgdGljaygpIHtcbiAgICAvL1NldHRpbmcgdGhlIGRhdGVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRpbWU6IG5ldyBEYXRlKCksXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy9TZXR0aW5nIHRoZSBkYXRlIGV2ZXJ5IDEwdGggc2Vjb25kLlxuICAgIHNldEludGVydmFsKCgpID0+IHRoaXMudGljaygpLCAxMCAqIDEwMDApO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYXNlXCI+XG4gICAgICAgICAge0hlYWRlcih0aGlzLnN0YXRlKX1cbiAgICAgICAgICB7Lyo8SGVhZGVyIGlzT3Blbj17ZmFsc2V9IGRheT17dGltZS5nZXREYXkoKX0gLz4qL31cbiAgICAgICAgICA8Um91dGVyPlxuICAgICAgICAgICAgPFN3aXRjaD5cbiAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvcXVlc3Rpb25zXCIgZXhhY3QgY29tcG9uZW50PXtRQX0gLz5cbiAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvcXVlc3Rpb25zL25ld1wiIGV4YWN0IGNvbXBvbmVudD17UUFGb3JtfSAvPlxuICAgICAgICAgICAgICA8Um91dGVcbiAgICAgICAgICAgICAgICBwYXRoPVwiL3F1ZXN0aW9ucy86aWRcIlxuICAgICAgICAgICAgICAgIHJlbmRlcj17KHsgbWF0Y2ggfSkgPT4gPFF1ZXN0aW9uIGlkPXttYXRjaC5wYXJhbXMuaWR9IC8+fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9cIiBleGFjdCBjb21wb25lbnQ9e0xhbmRpbmdQYWdlfSAvPlxuICAgICAgICAgICAgICA8UmVkaXJlY3QgdG89XCIvXCIgLz5cbiAgICAgICAgICAgIDwvU3dpdGNoPlxuICAgICAgICAgIDwvUm91dGVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZvb3RlciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI2NmVkNTcxYmI1MmM1NDA3ODhhZTMwYzIwNjY3YjJhMi5zdmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJjZGJiNDExNmVkMmU0NWUyZjRlZmQ3M2RhNjE2NmQ5Yy5wbmdcIjsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgQVBJX1VSTCwgSEVBREVSUyB9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5cbmNvbnN0IGFwaSA9IGF4aW9zLmNyZWF0ZSh7XG4gIGJhc2VVUkw6IEFQSV9VUkwsXG4gIGhlYWRlcnM6IEhFQURFUlMsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldCh1cmw6IHN0cmluZykge1xuICByZXR1cm4gYXBpXG4gICAgLmdldChgJHt1cmx9YClcbiAgICAudGhlbihyZXMgPT4gcmVzKVxuICAgIC5jYXRjaChlcnJvciA9PiBlcnJvcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3N0KHVybDogc3RyaW5nLCBib2R5KSB7XG4gIHJldHVybiBhcGlcbiAgICAucG9zdChgJHt1cmx9YCwgYm9keSlcbiAgICAudGhlbihyZXMgPT4gcmVzKVxuICAgIC5jYXRjaChlcnJvciA9PiBlcnJvcik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRRdWVzdGlvbih1cmw6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCBhcGkuZ2V0KGAke3VybH1gKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZXJyb3I7XG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBOb3J3ZWdpYW5EYXRlKGRhdGUpOiBzdHJpbmcge1xuICBjb25zdCB0bXBEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gIHJldHVybiAoXG4gICAgdG1wRGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKSArXG4gICAgJy4nICtcbiAgICAodG1wRGF0ZS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKSArXG4gICAgJy4nICtcbiAgICB0bXBEYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKVxuICApO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0SGVhZGVyKGFwcE5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgJHthcHBOYW1lfWA7XG59XG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9Gb290ZXIubGVzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9Gb290ZXIubGVzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vRm9vdGVyLmxlc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9IZWFkZXIubGVzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9IZWFkZXIubGVzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vSGVhZGVyLmxlc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9MYW5kaW5nUGFnZS5sZXNzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL0xhbmRpbmdQYWdlLmxlc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL0xhbmRpbmdQYWdlLmxlc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9RQUZvcm0ubGVzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9RQUZvcm0ubGVzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vUUFGb3JtLmxlc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9RQUxpc3QubGVzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9RQUxpc3QubGVzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vUUFMaXN0Lmxlc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9RdWVzdGlvblBhZ2UubGVzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9RdWVzdGlvblBhZ2UubGVzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vUXVlc3Rpb25QYWdlLmxlc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9TZWN0aW9uSGVyby5sZXNzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL1NlY3Rpb25IZXJvLmxlc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL1NlY3Rpb25IZXJvLmxlc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9TZWN0aW9uUXVlc3Rpb25zLmxlc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vU2VjdGlvblF1ZXN0aW9ucy5sZXNzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9TZWN0aW9uUXVlc3Rpb25zLmxlc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9iYXNlLmxlc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYmFzZS5sZXNzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9iYXNlLmxlc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QsIHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4uLy4uL3N0eWxlcy9Gb290ZXIubGVzcyc7XG5cbmNvbnN0IEZvb3RlcjogRnVuY3Rpb25Db21wb25lbnQgPSAoKSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgPGgxIGNsYXNzTmFtZT1cImZvb3Rlci0tY29udGVudFwiIGlkPVwiZm9vdGVyLS1jb250ZW50XCI+XG4gICAgICBGw7hsZyBvc3MgcMOleycgJ31cbiAgICAgIDxhXG4gICAgICAgIGNsYXNzTmFtZT1cImZvb3Rlci0tY29udGVudC0tbGlua1wiXG4gICAgICAgIGhyZWY9XCJodHRwczovL3d3dy5mYWNlYm9vay5jb20vZGlnaXRhbGxla3NlaGplbHAvXCJcbiAgICAgID5cbiAgICAgICAgRmFjZWJvb2tcbiAgICAgIDwvYT5cbiAgICA8L2gxPlxuICA8L2Rpdj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IEZvb3RlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4uLy4uL3N0eWxlcy9IZWFkZXIubGVzcyc7XG5pbXBvcnQgZ2V0QXBwbGljYXRpb25UaXRsZSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9oZWFkZXItc2VydmljZSc7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICBpc09wZW46IGJvb2xlYW47XG4gIHRpbWU6IERhdGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhlYWRlcihwcm9wczogSVByb3BzKSB7XG4gIGNvbnN0IHsgaXNPcGVuLCB0aW1lIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclwiPlxuICAgICAgPGEgY2xhc3NOYW1lPVwiaGVhZGVyLS1saW5rXCIgaHJlZj1cIi9cIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGVhZGVyLS1sb2dvXCIgaWQ9XCJoZWFkZXItLWxvZ29cIj5cbiAgICAgICAgICB7Z2V0QXBwbGljYXRpb25UaXRsZSgnRGlnaXRhbCBMZWtzZWhqZWxwJyl9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGVhZGVyLS1zZXJ2aWNlU3RhdHVzTWVzc2FnZVwiPlxuICAgICAgICAgIHshaXNPcGVuICYmIHRpbWUuZ2V0RGF5KCkgPj0gNSAmJiAnIMOlcG5lciBtYW5kYWcga2wuIDE3OjAwJ31cbiAgICAgICAgICB7IWlzT3BlbiAmJiB0aW1lLmdldERheSgpIDwgNSAmJiAnIMOlcG5lciBrbC4gMTc6MDAnfVxuICAgICAgICAgIHtpc09wZW4gJiYgJyDDpXBlbid9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYT5cbiAgICAgIDxzcGFuPlxuICAgICAgICA8aW1nXG4gICAgICAgICAgY2xhc3NOYW1lPVwiaGVhZGVyLS1ya19sb2dvXCJcbiAgICAgICAgICBzcmM9e3JlcXVpcmUoJy4uLy4uL2Fzc2V0cy9pbWFnZXMvcmtfbG9nby5wbmcnKX1cbiAgICAgICAgLz5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSVF1ZXN0aW9uIGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVF1ZXN0aW9uJztcbmltcG9ydCBJQ291cnNlIGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSUNvdXJzZSc7XG5pbXBvcnQgJy4uLy4uL3N0eWxlcy9RQUZvcm0ubGVzcyc7XG5pbXBvcnQgeyBnZXQsIHBvc3QgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGktc2VydmljZSc7XG5pbXBvcnQgRHJvcGRvd24sIHsgT3B0aW9uIH0gZnJvbSAncmVhY3QtZHJvcGRvd24nO1xuXG5pbnRlcmZhY2UgSVN0YXRlIHtcbiAgY291cnNlczogSUNvdXJzZVtdO1xuICBncmFkZXM6IElHcmFkZVtdO1xuICBmb3JtQ29udHJvbHM6IHtcbiAgICBlbWFpbDogT3B0aW9uO1xuICAgIGNvdXJzZTogT3B0aW9uO1xuICAgIHRoZW1lOiBPcHRpb247XG4gICAgcXVlc3Rpb246IE9wdGlvbjtcbiAgICBncmFkZTogT3B0aW9uO1xuICB9O1xufVxuXG5pbnRlcmZhY2UgSUdyYWRlIHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRQUZvcm0gZXh0ZW5kcyBDb21wb25lbnQ8e30sIElTdGF0ZT4ge1xuICBwdWJsaWMgY29uc3RydWN0b3Ioc3RhdGU6IElTdGF0ZSkge1xuICAgIHN1cGVyKHN0YXRlKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY291cnNlczogW10gYXMgSUNvdXJzZVtdLFxuICAgICAgZ3JhZGVzOiBbXSBhcyBJR3JhZGVbXSxcbiAgICAgIGZvcm1Db250cm9sczoge1xuICAgICAgICBlbWFpbDoge1xuICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgIH0sXG4gICAgICAgIGNvdXJzZToge1xuICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgIH0sXG4gICAgICAgIHRoZW1lOiB7XG4gICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgcXVlc3Rpb246IHtcbiAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICB9LFxuICAgICAgICBncmFkZToge1xuICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgY29tcG9uZW50RGlkTW91bnQoKTogdm9pZCB7XG4gICAgZ2V0KCdjb3Vyc2VzJylcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGNvdXJzZXM6IHJlcy5kYXRhLFxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKGUuZ2V0TWVzc2FnZSkpO1xuXG4gICAgZ2V0KCdncmFkZXMnKVxuICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgZ3JhZGVzOiByZXMuZGF0YSxcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGUgPT4gY29uc29sZS5lcnJvcihlLmdldE1lc3NhZ2UpKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlU3VibWl0KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZm9ybUNvbnRyb2xzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGJvZHk6IElRdWVzdGlvbiA9IHtcbiAgICAgIGVtYWlsOiBmb3JtQ29udHJvbHMuZW1haWwudmFsdWUsXG4gICAgICBncmFkZTogTnVtYmVyKGZvcm1Db250cm9scy5lbWFpbC52YWx1ZSksXG4gICAgICBjb3Vyc2U6IE51bWJlcihmb3JtQ29udHJvbHMuZW1haWwudmFsdWUpLFxuICAgICAgdGhlbWU6IE51bWJlcihmb3JtQ29udHJvbHMuZW1haWwudmFsdWUpLFxuICAgICAgcXVlc3Rpb246IGZvcm1Db250cm9scy5lbWFpbC52YWx1ZSxcbiAgICB9O1xuICAgIHBvc3QoJ2NvdXJzZXMnLCBib2R5KVxuICAgICAgLnRoZW4ocmVzID0+IGNvbnNvbGUubG9nKHJlcy5kYXRhKSlcbiAgICAgIC5jYXRjaChlID0+IGNvbnNvbGUuZXJyb3IoZS5nZXRNZXNzYWdlKSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUNoYW5nZSA9IChldmVudCwgdHlwZSkgPT4ge1xuICAgIGNvbnN0IHsgZm9ybUNvbnRyb2xzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGxldCBsYWJlbCwgdmFsdWU7XG4gICAgaWYgKHR5cGUgPT09ICdlbWFpbCcgfHwgdHlwZSA9PT0gJ3F1ZXN0aW9uJykge1xuICAgICAgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICBmb3JtQ29udHJvbHNbdHlwZV0gPSB7IHZhbHVlIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhYmVsID0gZXZlbnQubGFiZWw7XG4gICAgICB2YWx1ZSA9IGV2ZW50LnZhbHVlO1xuICAgICAgZm9ybUNvbnRyb2xzW3R5cGVdID0ge1xuICAgICAgICBsYWJlbCxcbiAgICAgICAgdmFsdWUsXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgZm9ybUNvbnRyb2xzIH0pO1xuICB9O1xuXG4gIHByaXZhdGUgZ2V0Q291cnNlT3B0aW9ucygpOiBPcHRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuY291cnNlcy5tYXAoY291cnNlID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBjb3Vyc2UuaWQudG9TdHJpbmcoKSxcbiAgICAgICAgbGFiZWw6IGNvdXJzZS5uYW1lLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGhlbWVPcHRpb25zKCk6IE9wdGlvbltdIHtcbiAgICBjb25zdCBjaG9zZW5Db3Vyc2UgPSB0aGlzLnN0YXRlLmNvdXJzZXMuZmlsdGVyKFxuICAgICAgY291cnNlID0+IGNvdXJzZS5uYW1lID09PSB0aGlzLnN0YXRlLmZvcm1Db250cm9scy5jb3Vyc2UubGFiZWwsXG4gICAgKVswXTsgLy8gV2lsbCBhbHdheXMgb25seSBiZSBvbmUgZW50cnkgaW4gYXJyYXlcbiAgICBpZiAoY2hvc2VuQ291cnNlKSB7XG4gICAgICByZXR1cm4gY2hvc2VuQ291cnNlLnRoZW1lcy5tYXAodGhlbWUgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiB0aGVtZS5pZC50b1N0cmluZygpLFxuICAgICAgICAgIGxhYmVsOiB0aGVtZS5uYW1lLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHJldHVybiBbXTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0R3JhZGVPcHRpb25zKCk6IE9wdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5ncmFkZXMubWFwKGdyYWRlID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBncmFkZS5pZC50b1N0cmluZygpLFxuICAgICAgICBsYWJlbDogZ3JhZGUubmFtZSxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgY29uc3QgeyBmb3JtQ29udHJvbHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsnY29udGFpbmVyJ30+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT17J2Zvcm0nfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tLWlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgeycgJ31cbiAgICAgICAgICAgIHsvKmlucHV0IGNvbnRhaW5lciBzdGFydCovfVxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT17J2Zvcm0tLWxhYmVsJ30+VGVtYTo8L2xhYmVsPlxuICAgICAgICAgICAgPERyb3Bkb3duXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXsnVmVsZyBmYWcnfVxuICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLmdldENvdXJzZU9wdGlvbnMoKX1cbiAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1Db250cm9scy5jb3Vyc2UudmFsdWUgJiYgZm9ybUNvbnRyb2xzLmNvdXJzZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2V2ZW50ID0+IHRoaXMuaGFuZGxlQ2hhbmdlKGV2ZW50LCAnY291cnNlJyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPERyb3Bkb3duXG4gICAgICAgICAgICAgIGRpc2FibGVkPXshZm9ybUNvbnRyb2xzLmNvdXJzZS52YWx1ZX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eydWZWxnIHVuZGVydGVtYSd9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMuZ2V0VGhlbWVPcHRpb25zKCl9XG4gICAgICAgICAgICAgIHZhbHVlPXtmb3JtQ29udHJvbHMudGhlbWUudmFsdWUgJiYgZm9ybUNvbnRyb2xzLnRoZW1lfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17ZXZlbnQgPT4gdGhpcy5oYW5kbGVDaGFuZ2UoZXZlbnQsICd0aGVtZScpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9eydmb3JtLS1sYWJlbCd9PktsYXNzZXRyaW5uOjwvbGFiZWw+XG4gICAgICAgICAgICA8RHJvcGRvd25cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eydWZWxnIGtsYXNzZXRyaW5uJ31cbiAgICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5nZXRHcmFkZU9wdGlvbnMoKX1cbiAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1Db250cm9scy5ncmFkZS52YWx1ZSAmJiBmb3JtQ29udHJvbHMuZ3JhZGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtldmVudCA9PiB0aGlzLmhhbmRsZUNoYW5nZShldmVudCwgJ2dyYWRlJyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tLWxhYmVsXCI+PC9sYWJlbD5cbiAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17XG4gICAgICAgICAgICAgICAgJ0Jlc2tyaXYgbWVkIGVnbmUgb3JkIGh2YSBkdSBsdXJlciBww6UsIG9nIGZvcmtsYXIgZ2plcm5lIGh2YSBkZXQgZXIgZHUgaGFyIGtvbW1ldCBmcmFtIHRpbCBww6UgZWdlbmjDpW5kLidcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9eyd0ZXh0YXJlYSd9XG4gICAgICAgICAgICAgIHZhbHVlPXtmb3JtQ29udHJvbHMucXVlc3Rpb24udmFsdWV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtldmVudCA9PiB0aGlzLmhhbmRsZUNoYW5nZShldmVudCwgJ3F1ZXN0aW9uJyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT17J2Zvcm0tLWxhYmVsJ30+RS1wb3N0OjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZW1haWwnfVxuICAgICAgICAgICAgICB2YWx1ZT17Zm9ybUNvbnRyb2xzLmVtYWlsLnZhbHVlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17ZXZlbnQgPT4gdGhpcy5oYW5kbGVDaGFuZ2UoZXZlbnQsICdlbWFpbCcpfVxuICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICBuYW1lPXsnZW1haWwnfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7LypJbnB1dCBjb250YWluZXIgZW5kKi99XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBvblN1Ym1pdD17KCkgPT4gdGhpcy5oYW5kbGVTdWJtaXQoKX1cbiAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgdmFsdWU9eydTZW5kJ31cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICcuLi8uLi9zdHlsZXMvUUFMaXN0Lmxlc3MnO1xuaW1wb3J0IHtcbiAgQWNjb3JkaW9uLFxuICBBY2NvcmRpb25JdGVtLFxuICBBY2NvcmRpb25JdGVtSGVhZGluZyxcbiAgQWNjb3JkaW9uSXRlbVBhbmVsLFxuICBBY2NvcmRpb25JdGVtQnV0dG9uLFxufSBmcm9tICdyZWFjdC1hY2Nlc3NpYmxlLWFjY29yZGlvbic7XG5pbXBvcnQgSVF1ZXN0aW9uIGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVF1ZXN0aW9uJztcbmltcG9ydCB7IE5vcndlZ2lhbkRhdGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRlLXNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBRQUxpc3QocXVlc3Rpb25zOiBJUXVlc3Rpb25bXSkge1xuICBpZiAocXVlc3Rpb25zICYmIHF1ZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgLypUaGlzIGFycmF5IGNhbiBiZSBudWxsIChiZWZvcmUgd2UgZmV0Y2ggaXQpKi9cbiAgICByZXR1cm4gKFxuICAgICAgPEFjY29yZGlvbiBhbGxvd1plcm9FeHBhbmRlZD17dHJ1ZX0+XG4gICAgICAgIHtxdWVzdGlvbnMubWFwKHF1ZXN0aW9uID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEFjY29yZGlvbkl0ZW0ga2V5PXtgcXVlc3Rpb24tJHtxdWVzdGlvbi5pZH1gfT5cbiAgICAgICAgICAgICAgPEFjY29yZGlvbkl0ZW1IZWFkaW5nPlxuICAgICAgICAgICAgICAgIDxBY2NvcmRpb25JdGVtQnV0dG9uPlxuICAgICAgICAgICAgICAgICAge3F1ZXN0aW9uLnRpdGxlfSB7LypxdWVzdGlvbiB0aXRsZSovfVxuICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIHtxdWVzdGlvbi5jb3Vyc2V9LCB7cXVlc3Rpb24uZ3JhZGV9LHsnICd9XG4gICAgICAgICAgICAgICAgICAgIHtOb3J3ZWdpYW5EYXRlKHF1ZXN0aW9uLmRhdGUpfVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvQWNjb3JkaW9uSXRlbUJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9BY2NvcmRpb25JdGVtSGVhZGluZz5cbiAgICAgICAgICAgICAgPEFjY29yZGlvbkl0ZW1QYW5lbD5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgIHsvKlF1ZXN0aW9uIGNvbnRlbnQqL31cbiAgICAgICAgICAgICAgICAgIHtxdWVzdGlvbi5xdWVzdGlvbn1cbiAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICA8aHIgLz5cblxuICAgICAgICAgICAgICAgIDxwPntxdWVzdGlvbi5hbnN3ZXJ9PC9wPlxuICAgICAgICAgICAgICA8L0FjY29yZGlvbkl0ZW1QYW5lbD5cbiAgICAgICAgICAgIDwvQWNjb3JkaW9uSXRlbT5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvQWNjb3JkaW9uPlxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIEZhbnQgZHUgaWtrZSBkZXQgZHUgbGV0dGUgZXR0ZXI/IDxhIGhyZWY9XCIjXCI+U3RpbGwgZXQgc3DDuHJzbcOlbDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsIi8vIFNlY3Rpb25zIGZvciB0aGlzIHBhZ2VcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VjdGlvblF1ZXN0aW9ucyBmcm9tICcuL1NlY3Rpb25zL1NlY3Rpb25RdWVzdGlvbnMnO1xuaW1wb3J0IFNlY3Rpb25IZXJvIGZyb20gJy4vU2VjdGlvbnMvU2VjdGlvbkhlcm8nO1xuaW1wb3J0ICcuLi8uLi9zdHlsZXMvTGFuZGluZ1BhZ2UubGVzcyc7XG5cbmNsYXNzIExhbmRpbmdQYWdlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgIDxTZWN0aW9uSGVybyAvPlxuICAgICAgICA8U2VjdGlvblF1ZXN0aW9ucyAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMYW5kaW5nUGFnZTtcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4uLy4uLy4uL3N0eWxlcy9TZWN0aW9uSGVyby5sZXNzJztcblxuY2xhc3MgU2VjdGlvblF1ZXN0aW9ucyBleHRlbmRzIENvbXBvbmVudCB7XG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVyb1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlcm8tLWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGVyby0tZGVzY3JpcHRpb24tLWNvbG9yZWRcIj5HcmF0aXMsIHRyeWd0IDwvc3Bhbj4gb2d7JyAnfVxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhlcm8tLWRlc2NyaXB0aW9uLS1jb2xvcmVkXCI+YW5vbnltdDwvc3Bhbj4gZm9yIGRlZyBww6VcbiAgICAgICAgICB1bmdkb21zc2tvbGVuIG9nIHZpZGVyZWfDpWVuZGUuXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlcm8tLXRpcHNcIiBpZD1cImhlcm8tLXRpcHNcIj5cbiAgICAgICAgICBIdmlzIGRldCB0YXIgbGFuZyB0aWQgw6UgZsOlIHZpZGVvaGplbHAgYW5iZWZhbGVyIHZpIMOlIHByw7h2ZSB2YW5saWcgY2hhdFxuICAgICAgICAgIGkgc3RlZGV0LiBEZXQgZ8OlciBvZnRlIHJhc2tlcmUhXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uUXVlc3Rpb25zO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi4vLi4vLi4vc3R5bGVzL1NlY3Rpb25RdWVzdGlvbnMubGVzcyc7XG5cbmNsYXNzIFNlY3Rpb25RdWVzdGlvbnMgZXh0ZW5kcyBDb21wb25lbnQge1xuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci0taGVhZGVyXCI+U3DDuHJzbcOlbCBvZyBzdmFyPC9kaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImNvbnRhaW5lci0tdGV4dFwiIGlkPVwiY29udGFpbmVyLS10ZXh0XCI+XG4gICAgICAgICAgSGVyIGthbiBkdSBsZXRlIGV0dGVyIHN2YXIgYmxhbnQgYWxsZXJlZGUgc3RpbHRlIHNww7hyc23DpWwsIGVsbGVyXG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGhyZWY9XCJodHRwOi8vd3d3LmRpZ2l0YWxsZWtzZWhqZWxwLm5vL3Nwb3JzbWFsXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImNvbnRhaW5lci0tdGV4dC0tY29sb3JlZFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgeycgJ31cbiAgICAgICAgICAgIHN0aWxsZSBldCBueXR0IHNww7hyc23DpWxcbiAgICAgICAgICA8L2E+eycgJ31cbiAgICAgICAgICBodmlzIGR1IGlra2UgZmlubmVyIGRldCBkdSBsdXJlciBww6UhXG4gICAgICAgIDwvcD5cbiAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiY29udGFpbmVyLS1mb3JtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItLWZvcm0tLWhlYWRlclwiPlPDuGsgZXR0ZXIgc3DDuHJzbcOlbDwvZGl2PlxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImNvbnRhaW5lci0tZm9ybS0taW5wdXRcIj48L2Zvcm0+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvblF1ZXN0aW9ucztcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpLXNlcnZpY2UnO1xuaW1wb3J0IFFBTGlzdCBmcm9tICcuLi8uLi91aS9jb21wb25lbnRzL1FBTGlzdCc7XG5pbXBvcnQgSVF1ZXN0aW9uIGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVF1ZXN0aW9uJztcblxuaW50ZXJmYWNlIElTdGF0ZSB7XG4gIHF1ZXN0aW9uczogSVF1ZXN0aW9uW107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFFBIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCBJU3RhdGU+IHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKHN0YXRlOiBJU3RhdGUpIHtcbiAgICBzdXBlcihzdGF0ZSk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHF1ZXN0aW9uczogW10gYXMgSVF1ZXN0aW9uW10sXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBjb21wb25lbnREaWRNb3VudCgpOiB2b2lkIHtcbiAgICBnZXQoJ3F1ZXN0aW9ucycpXG4gICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBxdWVzdGlvbnM6IHJlcy5kYXRhLFxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLnF1ZXN0aW9ucykpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpOiBSZWFjdC5SZWFjdE5vZGUge1xuICAgIHJldHVybiA8ZGl2PntRQUxpc3QodGhpcy5zdGF0ZS5xdWVzdGlvbnMpfTwvZGl2PjtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJlZGlyZWN0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsZXMvUXVlc3Rpb25QYWdlLmxlc3MnO1xuXG4vLyBTZXJ2aWNlc1xuaW1wb3J0IHsgZ2V0UXVlc3Rpb24gfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGktc2VydmljZSc7XG5cbi8vIEludGVyZmFjZXNcbmltcG9ydCBJUXVlc3Rpb24gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUXVlc3Rpb24nO1xuXG4vLyBTZWN0aW9uc1xuaW1wb3J0IFNlY3Rpb25RdWVzdGlvbiBmcm9tICcuL1NlY3Rpb25zL1NlY3Rpb25RdWVzdGlvbic7XG5pbXBvcnQgU2VjdGlvbkFuc3dlciBmcm9tICcuL1NlY3Rpb25zL1NlY3Rpb25BbnN3ZXInO1xuaW1wb3J0IFNlY3Rpb25NZXRhZGF0YSBmcm9tICcuL1NlY3Rpb25zL1NlY3Rpb25NZXRhZGF0YSc7XG5pbXBvcnQgU2VjdGlvblNlcnZpY2VEZXNjcmlwdGlvbiBmcm9tICcuL1NlY3Rpb25zL1NlY3Rpb25TZXJ2aWNlRGVzY3JpcHRpb24nO1xuXG5pbnRlcmZhY2UgSVN0YXRlIHtcbiAgcXVlc3Rpb246IElRdWVzdGlvbjtcbiAgZXJyb3I6IGJvb2xlYW47XG4gIGZldGNoaW5nOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgSVByb3BzIHtcbiAgaWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVlc3Rpb24gZXh0ZW5kcyBDb21wb25lbnQ8SVByb3BzLCBJU3RhdGU+IHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByb3BzOiBJUHJvcHMsIHN0YXRlOiBJU3RhdGUpIHtcbiAgICBzdXBlcihwcm9wcywgc3RhdGUpO1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgfVxuXG4gIHB1YmxpYyBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBnZXRRdWVzdGlvbihgcXVlc3Rpb25zLyR7dGhpcy5wcm9wcy5pZH1gKS50aGVuKHJlcyA9PiB7XG4gICAgICByZXMuZGF0YVxuICAgICAgICA/IHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVlc3Rpb246IHJlcy5kYXRhLFxuICAgICAgICAgIH0pXG4gICAgICAgIDogdGhpcy5zZXRTdGF0ZSh7IGVycm9yOiByZXMgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIGxldCB7IHF1ZXN0aW9uLCBlcnJvciB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgIHtxdWVzdGlvbiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaG93QW5zd2VyXCI+XG4gICAgICAgICAgICA8U2VjdGlvbk1ldGFkYXRhIGRhdGU9e3F1ZXN0aW9uLmRhdGV9IGNvdXJzZT17cXVlc3Rpb24uY291cnNlfSAvPlxuICAgICAgICAgICAgPFNlY3Rpb25RdWVzdGlvblxuICAgICAgICAgICAgICBxdWVzdGlvbj17cXVlc3Rpb24ucXVlc3Rpb259XG4gICAgICAgICAgICAgIGdyYWRlPXtxdWVzdGlvbi5ncmFkZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8U2VjdGlvbkFuc3dlciBhbnN3ZXI9e3F1ZXN0aW9uLmFuc3dlcn0gLz5cbiAgICAgICAgICAgIDxTZWN0aW9uU2VydmljZURlc2NyaXB0aW9uIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIHtlcnJvciAmJiA8UmVkaXJlY3QgdG89XCIvcXVlc3Rpb25zXCIgLz59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICcuLi8uLi8uLi9zdHlsZXMvUXVlc3Rpb25QYWdlLmxlc3MnO1xuXG5pbnRlcmZhY2UgSVByb3BzIHtcbiAgYW5zd2VyPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTZWN0aW9uQW5zd2VyKHByb3BzOiBJUHJvcHMpIHtcbiAgY29uc3QgeyBhbnN3ZXIgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5zd2VyXCI+XG4gICAgICA8cCBjbGFzc05hbWU9XCJzaG93QW5zd2VyLS1pbmZvXCI+XG4gICAgICAgIHsnU3ZhcmV0IGVyIHNrcmV2ZXQgYXYgZW4gZnJpdmlsbGlnIGhvcyBEaWdpdGFsIExla3NlaGplbHAuJ31cbiAgICAgIDwvcD5cbiAgICAgIHthbnN3ZXJ9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICcuLi8uLi8uLi9zdHlsZXMvUXVlc3Rpb25QYWdlLmxlc3MnO1xuXG5pbnRlcmZhY2UgSVByb3BzIHtcbiAgY291cnNlOiBhbnk7XG4gIGRhdGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNlY3Rpb25NZXRhZGF0YShwcm9wczogSVByb3BzKSB7XG4gIGNvbnN0IHsgY291cnNlLCBkYXRlIH0gPSBwcm9wcztcbiAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibWV0YWRhdGFcIj57Y291cnNlICsgJywgJyArIGRhdGV9PC9kaXY+O1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi4vLi4vLi4vc3R5bGVzL1F1ZXN0aW9uUGFnZS5sZXNzJztcblxuaW50ZXJmYWNlIElQcm9wcyB7XG4gIGdyYWRlOiBudW1iZXI7XG4gIHF1ZXN0aW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNlY3Rpb25RdWVzdGlvbihwcm9wczogSVByb3BzKSB7XG4gIGNvbnN0IHsgcXVlc3Rpb24sIGdyYWRlIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uXCI+XG4gICAgICA8cCBjbGFzc05hbWU9XCJzaG93QW5zd2VyLS1pbmZvXCI+XG4gICAgICAgIHsnICd9XG4gICAgICAgIHsnU3DDuHJtc8OlbGV0IGVyIHN0aWx0IGF2IGVuIGVsZXYgaSAnICsgZ3JhZGUgKyAnLid9XG4gICAgICA8L3A+XG4gICAgICB7cXVlc3Rpb259XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICcuLi8uLi8uLi9zdHlsZXMvUXVlc3Rpb25QYWdlLmxlc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTZWN0aW9uU2VydmljZURlc2NyaXB0aW9uKHt9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzZXJ2aWNlRGVzY3JpcHRpb25cIj5cbiAgICAgIDxkaXY+XG4gICAgICAgIFDDpSBEaWdpdGFsIExla3NlaGplbHAga2FuIGR1eycgJ31cbiAgICAgICAgPGEgaHJlZj1cIi9xdWVzdGlvbnNcIiBjbGFzc05hbWU9XCJzZXJ2aWNlRGVzY3JpcHRpb24tLWxpbmtcIj5cbiAgICAgICAgICBzdGlsbGUgc3DDuHJzbcOlbFxuICAgICAgICA8L2E+eycgJ31cbiAgICAgICAgZWxsZXIgZsOleycgJ31cbiAgICAgICAgPGEgaHJlZj1cIi9cIiBjbGFzc05hbWU9XCJzZXJ2aWNlRGVzY3JpcHRpb24tLWxpbmtcIj5cbiAgICAgICAgICBkaXJla3RlIGhqZWxwXG4gICAgICAgIDwvYT57JyAnfVxuICAgICAgICBmcmEgZW4gZnJpdmlsbGlnIG1lZCBsZWtzZW5lLlxuICAgICAgPC9kaXY+XG4gICAgICA8aW1nXG4gICAgICAgIGNsYXNzTmFtZT1cInNlcnZpY2VEZXNjcmlwdGlvbi0tc3ZnXCJcbiAgICAgICAgc3JjPXtyZXF1aXJlKCcuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2ZpZ3VyZV80LnN2ZycpfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=