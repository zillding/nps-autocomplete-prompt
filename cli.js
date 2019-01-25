#!/usr/bin/env node

const fs = require("fs");
const { execFileSync } = require("child_process");
const flat = require("flat");
const chalk = require("chalk");
const inquirer = require("inquirer");
const inquirerAutocompletePrompt = require("inquirer-autocomplete-prompt");
const fuzzy = require("fuzzy");
const npmRunPath = require("npm-run-path");
const spawn = require("cross-spawn");

try {
  execFileSync("nps", ["-v"], { env: npmRunPath.env() });
} catch (error) {
  console.error(`Could not find: nps`);
  process.exit(1);
}

const packageScriptsPath = `${process.cwd()}/package-scripts.js`;

if (!fs.existsSync(packageScriptsPath)) {
  console.error(`Could not find: ${packageScriptsPath}`);
  process.exit(1);
}

const { scripts } = require(packageScriptsPath);

const name = "task";
const separator = chalk.bold(" --- ");

inquirer.registerPrompt("autocomplete", inquirerAutocompletePrompt);

const tasks = flat(scripts);

function searchTask(_, input) {
  const fuzzyResult = fuzzy.filter(input || "", Object.keys(tasks));
  const result = fuzzyResult.map(el => el.original);
  return Promise.resolve(
    result.map(key => `${key}${separator}${chalk.dim(tasks[key])}`)
  );
}

inquirer
  .prompt([
    {
      type: "autocomplete",
      name,
      message: "Select an nps task",
      source: searchTask
    }
  ])
  .then(answers => {
    const result = answers[name].split(separator)[0];
    spawn("nps", [result], { stdio: "inherit", env: npmRunPath.env() });
  });
