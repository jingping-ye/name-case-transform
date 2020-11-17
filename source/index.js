class caseTransform {
  constructor(val, sourceNameCase, transformNameCase) {
    this.legalNameCase = {
      _: "toUnderscore",
      A: "toPascal",
      "-": "toHyphen",
      a: "toCamel",
    };
    if (this.checkVal() && this.checkNameCase()) {
      this.val = val;
      this.sourceNameCase = sourceNameCase;
      this.transformNameCase = transformNameCase;
      this.chooseNameCase = this.legalNameCase[nameCase];
      if (typeof this.val === "String") {
        this[this.checkNameCase](this.val);
      } else {
        this.jsonTransform(this.val);
      }
    }
  }

  /**
   * auto check the type of case.
   */
  autoCheckCaseType(){
    if(this.val.includes("_")){
      this.curCaseName = "_";
    }else if(this.val.includes("-")){
      this.curCaseName = "-";
    }else if(/^[A-Z]/.test(this.val)){
      this.curCaseName = "A";
    }else{
      this.curCaseName = "a";
    }
  };

  checkVal() {
    const isString = function () {
      return typeof this.val === "string";
    };

    const isJSON = function () {
      try{
        let obj = JSON.parse(JSON.stringify(this.val));
        if(obj && typeof obj === "object"){
          return true;
        }
      }catch(e){
        console.log("err",e);
      }
      return false;
    };

    if (isString() && isJSON()) {
      return true;
    } else {
      throw Error("Error Data Source: Only support String And JSON!");
    }
  }

  checkNameCase() {
    if (this.legalNameCase[this.nameCase]) {
      return true;
    } else {
      throw Error(
        "Illegal Case Name: Only Support UnderScore(_),Pascal(a),Hyphen(-),Camel(a), Please pass the correct params option!"
      );
    }
  }

  converter(){
    const converterList = {
      underscore:{
        toCamel:{
          regex:/_(\w)/g,
          replacer:function(matched,group){
            return group.toUpperCase();
          }
        },
        toPascal:{
          regex:/(^(\w))|_(\w)/g,
          replacer:function(matched){
            return matched.replace("_", "").toUpperCase();
          }
        },
        toHyphen:{
          regex:/_/g,
          replacer:function(){
            return "-";
          }
        }
      },
      pascal:{
        toUnderscore:{
          regex:/[A-Z]/g,
          replacer:function(matched, index){
          if (index === 0) {
              return matched.toLowerCase();
            } else {
              return `_${matched.toLowerCase()}`;
            }
          }
        },
        toHyphen:{
          regex:/[A-Z]/,
          replacer:function(matched,index){
            if (index === 0) {
              return matched.toLowerCase();
            } else {
              return `-${matched.toLowerCase()}`;
            }
          }
        },
        toCamel:{
          regex:/[A-Z]/g,
          replacer:function(matched, index){
            if (index === 0) {
              return matched.toLowerCase();
            } else {
              return matched;
            }
          }
        }
      },
      hyphen:{
        toUnderscore:{
          regex: /-/g,
          replacer:function(){
             return "_";
          }
        },
        toPascal:{
          regex:/(^\w)|-(\w)/g,
          replacer:function(matched){
            return matched.replace("-", "").toUpperCase();
          }
        },
        toCamel:{
          regex:/-(\w)/g,
          replacer:function(matched){
            return matched.replace("-", "").toUpperCase();
          }
        }
      },
      camel:{
        toUnderscore:{
          regex:/[A-Z]/g,
          replacer:function(matched){
             return `_${matched.toLowerCase()}`;
          }
        },
        toPascal:{
          regex:/^(\w)/g,
          replacer:function(matched){
            return matched.toUpperCase();
          }
        },
        toHyphen:{
          regex:/[A-Z]/g,
          replacer:function(matched){
            return `-${matched.toLowerCase()}`;
          }
        },
      }
    }
  }

  //  转为下划线命名法
  //  my_name => myName
  //  my_name => MyName
  //  my_name => my-name
  toUnderScore(val) {
    //  下划线转小驼峰
    const underScore2Camel = function (val) {
      return val.replace(/_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
      });
    };

    const under
  }

  //  转为Pascal命名法
  toPascal(val) {}

  //  转为连字符命名法
  toHyphen(val) {}

  //  转为小驼峰命名法
  toCamel(val) {}

  //  json转为其他格式
  jsonTransform(val) {}
}

export default caseTransform;