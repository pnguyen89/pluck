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
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/index.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/index.jsx":
/*!******************************!*\
  !*** ./client/src/index.jsx ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/client/src/index.jsx: Unexpected token, expected \\\"jsxTagEnd\\\" (146:14)\\n\\n\\u001b[0m \\u001b[90m 144 | \\u001b[39m              \\u001b[33m<\\u001b[39m\\u001b[33mRoute\\u001b[39m path\\u001b[33m=\\u001b[39m\\u001b[32m\\\"viewPlantProfile\\\"\\u001b[39m render\\u001b[33m=\\u001b[39m{() \\u001b[33m=>\\u001b[39m \\u001b[33m<\\u001b[39m\\u001b[33mViewPlantProfile\\u001b[39m userId\\u001b[33m=\\u001b[39m{\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mstate\\u001b[33m.\\u001b[39muserId} \\u001b[35m/>} /\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 145 | \\u001b[39m              \\u001b[33m<\\u001b[39m\\u001b[33mRoute\\u001b[39m path\\u001b[33m=\\u001b[39m\\u001b[32m\\\"/submitPlant\\\"\\u001b[39m render\\u001b[33m=\\u001b[39m{() \\u001b[33m=>\\u001b[39m \\u001b[33m<\\u001b[39m\\u001b[33mCreatePlantProfile\\u001b[39m userId\\u001b[33m=\\u001b[39m{\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mstate\\u001b[33m.\\u001b[39muserId} username\\u001b[33m=\\u001b[39m{\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mstate\\u001b[33m.\\u001b[39musername} \\u001b[35m/>} /\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 146 | \\u001b[39m              \\u001b[33m<\\u001b[39m\\u001b[33mRoute\\u001b[39m path\\u001b[33m=\\u001b[39m\\u001b[32m\\\"/myProfile\\\"\\u001b[39m render\\u001b[33m=\\u001b[39m{() \\u001b[33m=>\\u001b[39m \\u001b[33m<\\u001b[39m\\u001b[33mMyProfile\\u001b[39m zipcode\\u001b[33m=\\u001b[39m{\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mstate\\u001b[33m.\\u001b[39mzipcode} plants\\u001b[33m=\\u001b[39m{\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mstate\\u001b[33m.\\u001b[39muserPlants} username\\u001b[33m=\\u001b[39m{\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mstate\\u001b[33m.\\u001b[39musername} id\\u001b[33m=\\u001b[39m{\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mstate\\u001b[33m.\\u001b[39muserId} handleChange\\u001b[33m=\\u001b[39m{\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mhandleChange} \\u001b[35m/>} /\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m     | \\u001b[39m              \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 147 | \\u001b[39m              \\u001b[33m<\\u001b[39m\\u001b[33mRoute\\u001b[39m path\\u001b[33m=\\u001b[39m\\u001b[32m\\\"/plantLocation\\\"\\u001b[39m component\\u001b[33m=\\u001b[39m{\\u001b[33mMapViewContainer\\u001b[39m} \\u001b[33m/\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 148 | \\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 149 | \\u001b[39m              \\u001b[33m<\\u001b[39m\\u001b[33mRoute\\u001b[39m component\\u001b[33m=\\u001b[39m{\\u001b[33mError\\u001b[39m} \\u001b[33m/\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n    at Object.raise (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:3831:17)\\n    at Object.unexpected (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:5143:16)\\n    at Object.expect (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:5135:28)\\n    at Object.jsxParseOpeningElementAfterName (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:3451:10)\\n    at Object.jsxParseOpeningElementAt (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:3439:17)\\n    at Object.jsxParseElementAt (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:3471:33)\\n    at Object.jsxParseElementAt (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:3487:32)\\n    at Object.jsxParseElementAt (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:3487:32)\\n    at Object.jsxParseElementAt (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:3487:32)\\n    at Object.jsxParseElementAt (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:3487:32)\\n    at Object.jsxParseElement (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:3540:17)\\n    at Object.parseExprAtom (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:3547:19)\\n    at Object.parseExprSubscripts (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:5862:23)\\n    at Object.parseMaybeUnary (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:5842:21)\\n    at Object.parseExprOps (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:5729:23)\\n    at Object.parseMaybeConditional (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:5702:23)\\n    at Object.parseMaybeAssign (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:5647:21)\\n    at Object.parseParenAndDistinguishExpression (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:6435:28)\\n    at Object.parseExprAtom (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:6215:21)\\n    at Object.parseExprAtom (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:3552:20)\\n    at Object.parseExprSubscripts (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:5862:23)\\n    at Object.parseMaybeUnary (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:5842:21)\\n    at Object.parseExprOps (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:5729:23)\\n    at Object.parseMaybeConditional (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:5702:23)\\n    at Object.parseMaybeAssign (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:5647:21)\\n    at Object.parseExpression (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:5595:23)\\n    at Object.parseReturnStatement (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:7617:28)\\n    at Object.parseStatementContent (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:7295:21)\\n    at Object.parseStatement (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:7243:17)\\n    at Object.parseBlockOrModuleBlockBody (/mnt/c/Users/Julien de la Mettrie/Documents/dev/imm_junior/pluck/node_modules/@babel/parser/lib/index.js:7810:25)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jbGllbnQvc3JjL2luZGV4LmpzeC5qcyIsInNvdXJjZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./client/src/index.jsx\n");

/***/ })

/******/ });