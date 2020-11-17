import caseTransform from "../source/index.js";
import chai from "chai";
let expect = chai.expect;
describe("下划线转其他", () => {
  expect(caseTransform("my_name", "_", "a")).to.be.equal("myName");
});
