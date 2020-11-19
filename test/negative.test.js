import chai from "chai";
let expect = chai.expect;

import caseTransform from "../source/index.js";

describe("negative test", function () {
  it("same case from source case to target case", function () {
    expect(caseTransform("my_name", "_").to.be.equal(""));
  });

  it("not supported source case", function () {
    expect(caseTransform("my_name", "000").to.be.equal(""));
  });

  it("not supported target case", function () {
    expect(caseTransform("my_name", "_", "000").to.be.equal(""));
  });

  it("not pass case", function () {
    expect(caseTransform("my_name").to.be.equal(""));
  });

  it("deep nested JSON", function () {
    let sourceObj = [
      [
        [
          {
            username: "admin1",
            my_name: "123123",
            password: "123123",
          },
          {
            username: "admin2",
            my_name: "123123",
            password: "123123",
          },
        ],
        "2 layer",
      ],
      "1 layer",
    ];

    let targetObj = [
      [
        [
          {
            Username: "admin1",
            MyName: "123123",
            Password: "123123",
          },
          {
            Username: "admin2",
            MyName: "123123",
            Password: "123123",
          },
        ],
        "2 layer",
      ],
      "1 layer",
    ];
    expect(caseTransform(sourceObj, "A")).to.deep.equal(targetObj);
  });

  it("try array", function () {
    let sourceArr = [1, 2, 3];
    let targetArr = [1, 2, 3];
    expect(caseTransform(sourceArr, "A")).to.deep.equal(targetArr);
  });
});
