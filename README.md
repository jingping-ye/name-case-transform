# 风格转换工具

> name case transform tool

文档：中文 | [English](./README-en.md)

- 支持 Pascal、小驼峰、连字符、下划线命名风格互转。

- 支持字符串和 JSON(key)。

## API

```js
caseTransform((dataSource: [String | Object]), (targetCase: String), [(sourceCase: String)]);
```

- dataSource: 想要转换的数据。
- targetCase: 目标命名风格。

  - `-`: 连字符命名风格，比如：`my-name`.
  - `_`: 下划线命名风格, 比如: `my_name`.
  - `A`: Pascal 命名风格, eg: `MyName`.
  - `a`: 小驼峰命名风格, eg: `myName`.

- 数据源命名风格: 非必须。（程序会自动推断源数据风格，但是判断可能不及预期(多种风格混合)。这个时候，可以指定数据源命名风格。）
  - `-`: 连字符命名风格，比如：`my-name`.
  - `_`: 下划线命名风格, 比如: `my_name`.
  - `A`: Pascal 命名风格, eg: `MyName`.
  - `a`: 小驼峰命名风格, eg: `myName`.

## 用法

### 引入

```js
import caseTransform from "name-case-transform";
```

### 转换

字符串:

```js
let res = caseTransform("my_name", "A"); // MyName;

// 指定源数据命名风格
let res = caseTransform("my_name", "A", "_"); // MyName;
```

JSON:

```js
let data = {
  res_code: 4000,
  res_list: [
    {
      my_name: "admin1",
      password: "12323",
    },
    {
      my_name: "admin2",
      password: "123123",
    },
  ],
};

let res = caseTransform(data, "a");

// 指定源数据命名风格
let res = caseTransform(data, "a", "_");
```

结果:

```js
{
  resCode:4000,
  resList:[
    {
      myName:"admin1",
      password:"12323"
    },
    {
      myName:"admin2",
      password:"123123"
    }
  ]
}
```

## Q-A

1. 如果几种风格混合在一起，如何自动推断类型?(按照下面先后顺序采用)

- 字符串或者 JSON(key)值，包含`_`, 推断为下划线风格("\_")。
- 字符串或者 JSON(key)值，包含`-`, 推断为连字符风格("-")。
- 字符串或者 JSON(key)值，第一个字母为大写，推断为 Pascal 风格。
- 其他情况，推断为小驼峰风格。
