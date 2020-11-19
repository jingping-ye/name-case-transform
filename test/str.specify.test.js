import chai from "chai";
let expect = chai.expect;

import caseTransform from "../source/index.js";

describe("String: specified infer", function () {
  it("underscore to camel", function () {
    expect(caseTransform("my_name", "a", "_")).to.be.equal("myName");
  });

  it("underscore to Pascal", function () {
    expect(caseTransform("my_name", "A", "_")).to.be.equal("MyName");
  });

  it("underscore to hyphen", function () {
    expect(caseTransform("my_name", "-", "_")).to.be.equal("my-name");
  });

  it("Pascal to underscore", function () {
    expect(caseTransform("MyName", "_", "A")).to.be.equal("my_name");
  });

  it("Pascal to hyphen", function () {
    expect(caseTransform("MyName", "-", "A")).to.be.equal("my-name");
  });

  it("Pascal to camel", function () {
    expect(caseTransform("MyName", "a", "A")).to.be.equal("myName");
  });

  it("hyphen to underscore", function () {
    expect(caseTransform("my-name", "_", "-")).to.be.equal("my_name");
  });

  it("hyphen to camel", function () {
    expect(caseTransform("my-name", "a", "-")).to.be.equal("myName");
  });

  it("hyphen to Pascal", function () {
    expect(caseTransform("my-name", "A", "-")).to.be.equal("MyName");
  });

  it("camel to underscore", function () {
    expect(caseTransform("myName", "_", "a")).to.be.equal("my_name");
  });

  it("camel to Pascal", function () {
    expect(caseTransform("myName", "A", "a")).to.be.equal("MyName");
  });

  it("camel to hyphen", function () {
    expect(caseTransform("myName", "-", "a")).to.be.equal("my-name");
  });
});
