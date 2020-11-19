# name-case-transform

> name case transform tool

Document: [中文](./README.md) | English

- support transform between Pascal, small camel, hyphen, underline case.

- support string and JSON type.

## API

```js
caseTransform((dataSource: [String | Object]), (targetCase: String), [(sourceCase: String)]);
```

- dataSource: the value you want to transform.
- targetCase: the case you want to transform.

  - `-`: hyphen case, eg:`my-name`.
  - `_`: underscore case, eg: `my_name`.
  - `A`: Pascal case, eg: `MyName`.
  - `a`: little camel, eg: `myName`.

- sourceCase: the case your dataSource is.Not necessary(the program will auto infer the source case. But you can specified this when the auto infer is not work well as expected .).
  - `-`: hyphen case, eg:`my-name`.
  - `_`: underscore case, eg: `my_name`.
  - `A`: Pascal case, eg: `MyName`.
  - `a`: little camel, eg: `myName`.

## Usage

### import

```js
import caseTransform from "name-case-transform";
```

### transform

String:

```js
let res = caseTransform("my_name", "A"); // MyName;

// specified the source case
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

// specify the source case
let res = caseTransform(data, "a", "_");
```

Result:

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
