const fs = require("fs");
const chalk = require("chalk");
const yaml = require("js-yaml");

const error = chalk.red;

function loadScripts() {
  const jsPath = `${process.cwd()}/package-scripts.js`;
  const ymlPath = `${process.cwd()}/package-scripts.yml`;

  if (!(fs.existsSync(jsPath) || fs.existsSync(ymlPath))) {
    console.error(
      error(`Could not find package scripts: ${jsPath} or ${ymlPath}`)
    );
    process.exit(1);
  }

  try {
    if (fs.existsSync(jsPath)) {
      const { scripts } = require(jsPath);
      return scripts;
    }
  } catch (_) {
    console.error(error(`Error loading: ${jsPath}`));
    process.exit(1);
  }

  try {
    if (fs.existsSync(ymlPath)) {
      const { scripts } = yaml.safeLoad(fs.readFileSync(ymlPath, "utf8"));
      return scripts;
    }
  } catch (_) {
    console.error(error(`Error loading: ${ymlPath}`));
    process.exit(1);
  }
}

module.exports = loadScripts;
