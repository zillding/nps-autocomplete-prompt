module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: "eslint:recommended",
  rules: {
    "no-console": ["error", { allow: ["error"] }]
  }
};
