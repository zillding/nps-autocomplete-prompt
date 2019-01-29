const processScripts = require("./processScripts");

const scripts = {
  lint: "eslint",
  test: {
    script: "jest",
    description: "unit test"
  },
  build: {
    default: "webpack",
    webpack: "webpack",
    rollup: "rollup"
  }
};

test("processScripts", () => {
  expect(processScripts(scripts)).toEqual({
    lint: "eslint",
    test: "unit test",
    build: "webpack",
    "build.webpack": "webpack",
    "build.rollup": "rollup"
  });
});
