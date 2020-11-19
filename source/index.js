class CaseTransform {
  constructor(val, targetCase = "", sourceCase = "") {
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

  transform() {
    if (this.valType === "String") {
      return this.transformController(this.val, this.targetCase, this.sourceCase);
    } else if (this.valType === "JSON") {
      return this.transformJSON();
    }
  }

  transformJSON() {
    let curVal = this.deepCopy(this.val);
    const _this = this;

    const loopObj = function (obj) {
      if (Array.isArray(obj)) {
        obj.forEach((item) => loopObj(item));
      } else if (typeof obj === "object") {
        Object.keys(obj).forEach((key) => {
          let newKey = _this.transformController(key, _this.targetCase, _this.sourceCase);
          if (newKey !== key) {
            obj[newKey] = obj[key];
            delete obj[key];
            if (typeof obj[newKey] === "object") {
              loopObj(obj[newKey]);
            }
          } else {
            if (typeof obj[key] === "object") {
              loopObj(obj[key]);
            }
          }
        });
      }
    };

    loopObj(curVal);

    // console.log("curVal===", JSON.stringify(curVal));

    return curVal;
  }

  deepCopy(obj) {
    let cloneObj = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key] && typeof obj[key] === "object") {
            cloneObj[key] = this.deepCopy(obj[key]);
          } else {
            cloneObj[key] = obj[key];
          }
        }
      }
    }
    return cloneObj;
  }

  transformController(val, targetCase, sourceCase) {
    const transformCenter = {
      _: {
        a: {
          regex: /_(\w)/g,
          replacer: function (matched, group) {
            return group.toUpperCase();
          },
        },
        A: {
          regex: /(^(\w))|_(\w)/g,
          replacer: function (matched) {
            return matched.replace("_", "").toUpperCase();
          },
        },
        "-": {
          regex: /_/g,
          replacer: function () {
            return "-";
          },
        },
      },
      A: {
        _: {
          regex: /[A-Z]/g,
          replacer: function (matched, index) {
            if (index === 0) {
              return matched.toLowerCase();
            } else {
              return `_${matched.toLowerCase()}`;
            }
          },
        },
        "-": {
          regex: /[A-Z]/g,
          replacer: function (matched, index) {
            if (index === 0) {
              return matched.toLowerCase();
            } else {
              return `-${matched.toLowerCase()}`;
            }
          },
        },
        a: {
          regex: /[A-Z]/g,
          replacer: function (matched, index) {
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
          replacer: function () {
            return "_";
          },
        },
        A: {
          regex: /(^\w)|-(\w)/g,
          replacer: function (matched) {
            return matched.replace("-", "").toUpperCase();
          },
        },
        a: {
          regex: /-(\w)/g,
          replacer: function (matched) {
            return matched.replace("-", "").toUpperCase();
          },
        },
      },
      a: {
        _: {
          regex: /[A-Z]/g,
          replacer: function (matched) {
            return `_${matched.toLowerCase()}`;
          },
        },
        A: {
          regex: /^(\w)/g,
          replacer: function (matched) {
            return matched.toUpperCase();
          },
        },
        "-": {
          regex: /[A-Z]/g,
          replacer: function (matched) {
            return `-${matched.toLowerCase()}`;
          },
        },
      },
    };

    let transformProcess = transformCenter[sourceCase][targetCase];
    return val.replace(transformProcess.regex, transformProcess.replacer);
  }

  autoInferSourceCase() {
    let sourceCase = "";
    if (this.valType === "String") {
      sourceCase = this.autoInferString();
    } else if (this.valType === "JSON") {
      sourceCase = this.autoInferJSON();
    }
    this.sourceCase = sourceCase;
  }

  autoInferString() {
    if (this.val.includes("_")) {
      return "_";
    } else if (this.val.includes("-")) {
      return "-";
    } else if (/^[A-Z]/.test(this.val)) {
      return "A";
    } else {
      return "a";
    }
  }

  autoInferJSON() {
    let valStr = JSON.stringify(this.val);
    let matchKeyRegex = /(?<=")([a-zA-Z0-9_-]+)(?=":)/g;
    let keyList = valStr.match(matchKeyRegex);
    if (keyList && keyList.length > 0) {
      if (keyList.some((item) => item.includes("_"))) {
        return "_";
      } else if (keyList.some((item) => item.includes("-"))) {
        return "-";
      } else if (keyList.some((item) => /^[A-Z]/.test(item))) {
        return "A";
      } else {
        return "a";
      }
    }
  }

  checkVal(val) {
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
  }

  checkCase(caseFlag) {
    if (caseFlag.length == 0) {
      console.error("Error: Please pass the case!");
      return false;
    } else {
      if (this.supportedCase.includes(caseFlag)) {
        return true;
      } else {
        console.error("Error: Please input the correct case! ");
        return false;
      }
    }
  }

  isString(val) {
    return typeof val === "string";
  }

  isJSON(val) {
    try {
      let obj = JSON.parse(JSON.stringify(val));
      if (obj && typeof obj === "object") {
        return true;
      }
    } catch (e) {
      console.log("e", e);
    }
    return false;
  }
}

const caseTransform = function (val = "", targetFlag = "", sourceFlag = "") {
  return new CaseTransform(val, targetFlag, sourceFlag).transformVal;
};

export default caseTransform;
export { caseTransform };
