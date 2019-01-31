#!/usr/bin/env node

const fs = require("fs");
const { execFileSync } = require("child_process");
const chalk = require("chalk");
const inquirer = require("inquirer");
const inquirerAutocompletePrompt = require("inquirer-autocomplete-prompt");
const fuzzy = require("fuzzy");
const execa = require("execa");

const loadScripts = require("./loadScripts");
const processScripts = require("./processScripts");

try {
  execa.sync("nps", ["-v"]);
} catch (_) {
  console.error(chalk.red("Could not find: nps"));
  process.exit(1);
}

const scripts = loadScripts();
const tasks = processScripts(scripts);

const name = "task";
const separator = chalk.cyan(" --- ");

inquirer.registerPrompt("autocomplete", inquirerAutocompletePrompt);

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
