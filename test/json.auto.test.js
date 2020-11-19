import chai from "chai";
let expect = chai.expect;

import caseTransform from "../source/index.js";

describe("JSON: auto infer", function () {
  it("underscore to camel", function () {
    let sourceObj = {
      err_code: 4000,
      data_list: [
        {
          my_name: "admin1",
          password: "123123",
        },
        {
          my_name: "admin2",
          password: "123123",
        },
      ],
    };

    let targetObj = {
      errCode: 4000,
      dataList: [
        { password: "123123", myName: "admin1" },
        { password: "123123", myName: "admin2" },
      ],
    };
    let res = caseTransform(sourceObj, "a");
    expect(res).to.deep.equal(targetObj);
  });

  it("underscore to Pascal", function () {
    let sourceObj = {
      err_code: 4000,
      data_list: [
        {
          my_name: "admin1",
          password: "123123",
        },
        {
          my_name: "admin2",
          password: "123123",
        },
      ],
    };

    let targetObj = {
      ErrCode: 4000,
      DataList: [
        { Password: "123123", MyName: "admin1" },
        { Password: "123123", MyName: "admin2" },
      ],
    };
    let res = caseTransform(sourceObj, "A");
    expect(res).to.deep.equal(targetObj);
  });

  it("underscore to hyphen", function () {
    let sourceObj = {
      err_code: 4000,
      data_list: [
        {
          my_name: "admin1",
          password: "123123",
        },
        {
          my_name: "admin2",
          password: "123123",
        },
      ],
    };

    let targetObj = {
      "err-code": 4000,
      "data-list": [
        {
          "my-name": "admin1",
          password: "123123",
        },
        {
          "my-name": "admin2",
          password: "123123",
        },
      ],
    };
    let res = caseTransform(sourceObj, "-");
    expect(res).to.deep.equal(targetObj);
  });

  it("Pascal to underscore", function () {
    let sourceObj = {
      ErrCode: 4000,
      DataList: [
        {
          MyName: "admin1",
          Password: "123123",
        },
        {
          MyName: "admin2",
          Password: "123123",
        },
      ],
    };

    let targetObj = {
      err_code: 4000,
      data_list: [
        {
          my_name: "admin1",
          password: "123123",
        },
        {
          my_name: "admin2",
          password: "123123",
        },
      ],
    };
    let res = caseTransform(sourceObj, "_");
    expect(res).to.deep.equal(targetObj);
  });

  it("Pascal to hyphen", function () {
    let sourceObj = {
      ErrCode: 4000,
      DataList: [
        {
          MyName: "admin1",
          Password: "123123",
        },
        {
          MyName: "admin2",
          Password: "123123",
        },
      ],
    };

    let targetObj = {
      "err-code": 4000,
      "data-list": [
        {
          "my-name": "admin1",
          password: "123123",
        },
        {
          "my-name": "admin2",
          password: "123123",
        },
      ],
    };
    let res = caseTransform(sourceObj, "-");
    expect(res).to.deep.equal(targetObj);
  });

  it("Pascal to camel", function () {
    let sourceObj = {
      ErrCode: 4000,
      DataList: [
        {
          MyName: "admin1",
          Password: "123123",
        },
        {
          MyName: "admin2",
          Password: "123123",
        },
      ],
    };

    let targetObj = {
      errCode: 4000,
      dataList: [
        {
          myName: "admin1",
          password: "123123",
        },
        {
          myName: "admin2",
          password: "123123",
        },
      ],
    };
    let res = caseTransform(sourceObj, "a");
    expect(res).to.deep.equal(targetObj);
  });

  it("hyphen to underscore", function () {
    let sourceObj = {
      "err-code": 4000,
      "data-list": [
        {
          "my-name": "admin1",
          password: "123123",
        },
        {
          "my-name": "admin2",
          password: "123123",
        },
      ],
    };

    let targetObj = {
      err_code: 4000,
      data_list: [
        {
          my_name: "admin1",
          password: "123123",
        },
        {
          my_name: "admin2",
          password: "123123",
        },
      ],
    };
    let res = caseTransform(sourceObj, "_");
    expect(res).to.deep.equal(targetObj);
  });

  it("hyphen to camel", function () {
    let sourceObj = {
      "err-code": 4000,
      "data-list": [
        {
          "my-name": "admin1",
          password: "123123",
        },
        {
          "my-name": "admin2",
          password: "123123",
        },
      ],
    };

    let targetObj = {
      errCode: 4000,
      dataList: [
        { password: "123123", myName: "admin1" },
        { password: "123123", myName: "admin2" },
      ],
    };
    let res = caseTransform(sourceObj, "a");
    expect(res).to.deep.equal(targetObj);
  });

  it("hyphen to Pascal", function () {
    let sourceObj = {
      "err-code": 4000,
      "data-list": [
        {
          "my-name": "admin1",
          password: "123123",
        },
        {
          "my-name": "admin2",
          password: "123123",
        },
      ],
    };

    let targetObj = {
      ErrCode: 4000,
      DataList: [
        { Password: "123123", MyName: "admin1" },
        { Password: "123123", MyName: "admin2" },
      ],
    };
    let res = caseTransform(sourceObj, "A");
    expect(res).to.deep.equal(targetObj);
  });

  it("camel to underscore", function () {
    let sourceObj = {
      errCode: 4000,
      dataList: [
        { password: "123123", myName: "admin1" },
        { password: "123123", myName: "admin2" },
      ],
    };

    let targetObj = {
      err_code: 4000,
      data_list: [
        {
          my_name: "admin1",
          password: "123123",
        },
        {
          my_name: "admin2",
          password: "123123",
        },
      ],
    };
    let res = caseTransform(sourceObj, "_");
    expect(res).to.deep.equal(targetObj);
  });

  it("camel to Pascal", function () {
    let sourceObj = {
      errCode: 4000,
      dataList: [
        { password: "123123", myName: "admin1" },
        { password: "123123", myName: "admin2" },
      ],
    };

    let targetObj = {
      ErrCode: 4000,
      DataList: [
        { Password: "123123", MyName: "admin1" },
        { Password: "123123", MyName: "admin2" },
      ],
    };
    let res = caseTransform(sourceObj, "A");
    expect(res).to.deep.equal(targetObj);
  });

  it("camel to hyphen", function () {
    let sourceObj = {
      errCode: 4000,
      dataList: [
        { password: "123123", myName: "admin1" },
        { password: "123123", myName: "admin2" },
      ],
    };

    let targetObj = {
      "err-code": 4000,
      "data-list": [
        {
          "my-name": "admin1",
          password: "123123",
        },
        {
          "my-name": "admin2",
          password: "123123",
        },
      ],
    };
    let res = caseTransform(sourceObj, "-");
    expect(res).to.deep.equal(targetObj);
  });
});
