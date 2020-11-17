// 下划线：myName => my_name
// 帕斯卡 myName => MyName
// 连字符 myName => my-name

let str = "myName";
let toUnderscore = str.replace(/[A-Z]/g, function (matched) {
  return `_${matched.toLowerCase()}`;
});

let toPascal = str.replace(/^(\w)/g, function (matched) {
  return matched.toUpperCase();
});

let toHyphen = str.replace(/[A-Z]/g, function (matched) {
  return `-${matched.toLowerCase()}`;
});
console.log("result===", toHyphen);
