module.exports = {
  scripts: {
    default: "nps test",
    prettier: "prettier --write '*.{js,json,md}'",
    lint: "eslint .",
    test: {
      default: "jest",
      watch: "jest --watch"
    },
    demo: {
      hello: {
        script: "echo hello",
        description: "print hello"
      },
      world: "echo world"
    }
  }
};
