"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function (obj) {
        return typeof obj;
      }
    : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var CaseTransform = (function () {
  function CaseTransform(val) {
    var targetCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var sourceCase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

    _classCallCheck(this, CaseTransform);

    this.val = "";
    this.valType = "";
    this.targetCase = "";
    this.sourceCase = "";
    this.supportedCase = ["-", "_", "A", "a"];
    this.transformVal = "";

    if (this.checkVal(val)) {
      this.val = val;
      if (this.checkCase(targetCase)) {
        this.targetCase = targetCase;
        if (this.sourceCase !== this.targetCase) {
          if (sourceCase.length > 0) {
            if (this.checkCase(sourceCase)) {
              if (this.sourceCase !== this.targetCase) {
                this.sourceCase = sourceCase;
                this.transformVal = this.transform();
              } else {
                console.error("Error: The source case cannot be the same as the target case!");
              }
            }
          } else {
            this.autoInferSourceCase();
            if (this.sourceCase !== this.targetCase) {
              this.transformVal = this.transform();
            } else {
              console.error("Error: The source case cannot be the same as the target case!");
            }
          }
        } else {
          console.error("Error: target case cannot be the same as source case!");
        }
      }
    }
  }

  _createClass(CaseTransform, [
    {
      key: "transform",
      value: function transform() {
        if (this.valType === "String") {
          return this.transformController(this.val, this.targetCase, this.sourceCase);
        } else if (this.valType === "JSON") {
          return this.transformJSON();
        }
      },
    },
    {
      key: "transformJSON",
      value: function transformJSON() {
        var curVal = this.deepCopy(this.val);
        var _this = this;

        var loopObj = function loopObj(obj) {
          if (Array.isArray(obj)) {
            obj.forEach(function (item) {
              return loopObj(item);
            });
          } else if (Object.prototype.toString.call(obj) === "[object Object]") {
            Object.keys(obj).forEach(function (key) {
              var newKey = _this.transformController(key, _this.targetCase, _this.sourceCase);
              if (newKey !== key) {
                obj[newKey] = obj[key];
                delete obj[key];
              }
              loopObj(obj[newKey]);
            });
          }
        };

        loopObj(curVal);
        return curVal;
      },
    },
    {
      key: "deepCopy",
      value: function deepCopy(obj) {
        var cloneObj = Array.isArray(obj) ? [] : {};
        if (obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (obj[key] && _typeof(obj[key]) === "object") {
                cloneObj[key] = this.deepCopy(obj[key]);
              } else {
                cloneObj[key] = obj[key];
              }
            }
          }
        }
        return cloneObj;
      },
    },
    {
      key: "transformController",
      value: function transformController(val, targetCase, sourceCase) {
        var transformCenter = {
          _: {
            a: {
              regex: /_(\w)/g,
              replacer: function replacer(matched, group) {
                return group.toUpperCase();
              },
            },
            A: {
              regex: /(^(\w))|_(\w)/g,
              replacer: function replacer(matched) {
                return matched.replace("_", "").toUpperCase();
              },
            },
            "-": {
              regex: /_/g,
              replacer: function replacer() {
                return "-";
              },
            },
          },
          A: {
            _: {
              regex: /[A-Z]/g,
              replacer: function replacer(matched, index) {
                if (index === 0) {
                  return matched.toLowerCase();
                } else {
                  return "_" + matched.toLowerCase();
                }
              },
            },
            "-": {
              regex: /[A-Z]/g,
              replacer: function replacer(matched, index) {
                if (index === 0) {
                  return matched.toLowerCase();
                } else {
                  return "-" + matched.toLowerCase();
                }
              },
            },
            a: {
              regex: /[A-Z]/g,
              replacer: function replacer(matched, index) {
                if (index === 0) {
                  return matched.toLowerCase();
                } else {
                  return matched;
                }
              },
            },
          },
          "-": {
            _: {
              regex: /-/g,
              replacer: function replacer() {
                return "_";
              },
            },
            A: {
              regex: /(^\w)|-(\w)/g,
              replacer: function replacer(matched) {
                return matched.replace("-", "").toUpperCase();
              },
            },
            a: {
              regex: /-(\w)/g,
              replacer: function replacer(matched) {
                return matched.replace("-", "").toUpperCase();
              },
            },
          },
          a: {
            _: {
              regex: /[A-Z]/g,
              replacer: function replacer(matched) {
                return "_" + matched.toLowerCase();
              },
            },
            A: {
              regex: /^(\w)/g,
              replacer: function replacer(matched) {
                return matched.toUpperCase();
              },
            },
            "-": {
              regex: /[A-Z]/g,
              replacer: function replacer(matched) {
                return "-" + matched.toLowerCase();
              },
            },
          },
        };

        var transformProcess = transformCenter[sourceCase][targetCase];
        return val.replace(transformProcess.regex, transformProcess.replacer);
      },
    },
    {
      key: "autoInferSourceCase",
      value: function autoInferSourceCase() {
        var sourceCase = "";
        if (this.valType === "String") {
          sourceCase = this.autoInferString();
        } else if (this.valType === "JSON") {
          sourceCase = this.autoInferJSON();
        }
        this.sourceCase = sourceCase;
      },
    },
    {
      key: "autoInferString",
      value: function autoInferString() {
        if (this.val.indexOf("_") !== -1) {
          return "_";
        } else if (this.val.indexOf("-") !== -1) {
          return "-";
        } else if (/^[A-Z]/.test(this.val)) {
          return "A";
        } else {
          return "a";
        }
      },
    },
    {
      key: "getKeyList",
      value: function getKeyList() {
        var keyList = [];
        var curVal = this.deepCopy(this.val);

        var loopObj = function loopObj(obj) {
          if (Array.isArray(obj)) {
            obj.forEach(function (item) {
              return loopObj(item);
            });
          } else if (Object.prototype.toString.call(obj) === "[object Object]") {
            Object.keys(obj).forEach(function (key) {
              keyList.push(key);
              loopObj(obj[key]);
            });
          }
        };

        loopObj(curVal);
        return keyList;
      },
    },
    {
      key: "autoInferJSON",
      value: function autoInferJSON() {
        // 兼容IE，去掉该部分
        // let valStr = JSON.stringify(this.val);
        // let matchKeyRegex = /(?<=")([a-zA-Z0-9_-]+)(?=":)/g;
        // let keyList = valStr.match(matchKeyRegex);

        var keyList = this.getKeyList();
        if (keyList && keyList.length > 0) {
          if (
            keyList.some(function (item) {
              return item.indexOf("_") !== -1;
            })
          ) {
            return "_";
          } else if (
            keyList.some(function (item) {
              return item.indexOf("-") !== -1;
            })
          ) {
            return "-";
          } else if (
            keyList.some(function (item) {
              return /^[A-Z]/.test(item);
            })
          ) {
            return "A";
          } else {
            return "a";
          }
        }
      },
    },
    {
      key: "checkVal",
      value: function checkVal(val) {
        if (this.isString(val)) {
          this.valType = "String";
          return true;
        } else if (this.isJSON(val)) {
          this.valType = "JSON";
          return true;
        } else {
          console.error("Error: For data source, Only support String and JSON!");
          return false;
        }
      },
    },
    {
      key: "checkCase",
      value: function checkCase(caseFlag) {
        if (caseFlag.length == 0) {
          console.error("Error: Please pass the case!");
          return false;
        } else {
          if (this.supportedCase.indexOf(caseFlag) !== -1) {
            return true;
          } else {
            console.error("Error: Please input the correct case! ");
            return false;
          }
        }
      },
    },
    {
      key: "isString",
      value: function isString(val) {
        return typeof val === "string";
      },
    },
    {
      key: "isJSON",
      value: function isJSON(val) {
        try {
          var obj = JSON.parse(JSON.stringify(val));
          if (obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
            return true;
          }
        } catch (e) {
          console.log("e", e);
        }
        return false;
      },
    },
  ]);

  return CaseTransform;
})();

var caseTransform = function caseTransform() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var targetFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var sourceFlag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  return new CaseTransform(val, targetFlag, sourceFlag).transformVal;
};

exports.default = caseTransform;
exports.caseTransform = caseTransform;
