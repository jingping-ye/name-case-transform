import chai from "chai";
let expect = chai.expect;

import caseTransform from "../source/index.js";

describe("String: auto infer", function () {
  it("underscore to camel", function () {
    expect(caseTransform("my_name", "a")).to.be.equal("myName");
  });

  it("underscore to Pascal", function () {
    expect(caseTransform("my_name", "A")).to.be.equal("MyName");
  });

  it("underscore to hyphen", function () {
    expect(caseTransform("my_name", "-")).to.be.equal("my-name");
  });

  it("Pascal to underscore", function () {
    expect(caseTransform("MyName", "_")).to.be.equal("my_name");
  });

  it("Pascal to hyphen", function () {
    expect(caseTransform("MyName", "-")).to.be.equal("my-name");
  });

  it("Pascal to camel", function () {
    expect(caseTransform("MyName", "a")).to.be.equal("myName");
  });

  it("hyphen to underscore", function () {
    expect(caseTransform("my-name", "_")).to.be.equal("my_name");
  });

  it("hyphen to camel", function () {
    expect(caseTransform("my-name", "a")).to.be.equal("myName");
  });

  it("hyphen to Pascal", function () {
    expect(caseTransform("my-name", "A")).to.be.equal("MyName");
  });

  it("camel to underscore", function () {
    expect(caseTransform("myName", "_")).to.be.equal("my_name");
  });

  it("camel to Pascal", function () {
    expect(caseTransform("myName", "A")).to.be.equal("MyName");
  });

  it("camel to hyphen", function () {
    expect(caseTransform("myName", "-")).to.be.equal("my-name");
  });
});
