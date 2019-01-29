#!/usr/bin/env node

const fs = require("fs");
const { execFileSync } = require("child_process");
const chalk = require("chalk");
const inquirer = require("inquirer");
const inquirerAutocompletePrompt = require("inquirer-autocomplete-prompt");
const fuzzy = require("fuzzy");
const execa = require("execa");

const processScripts = require("./processScripts");

const error = chalk.red;

try {
  execa.sync("nps", ["-v"]);
} catch (_) {
  console.error(error("Could not find: nps"));
  process.exit(1);
}

const packageScriptsPath = `${process.cwd()}/package-scripts.js`;

if (!fs.existsSync(packageScriptsPath)) {
  console.error(error(`Could not find: ${packageScriptsPath}`));
  process.exit(1);
}

const { scripts } = require(packageScriptsPath);

const name = "task";
const separator = chalk.cyan(" --- ");

inquirer.registerPrompt("autocomplete", inquirerAutocompletePrompt);

const tasks = processScripts(scripts);

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
    execa.shell(`nps ${result}`, {
      stdout: process.stdout,
      stderr: process.stderr
    });
  });
