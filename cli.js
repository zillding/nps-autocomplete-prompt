#!/usr/bin/env node

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

function npsExec(str) {
  execa
    .shell(`nps ${str}`, {
      stdout: process.stdout,
      stderr: process.stderr
    })
    .catch(({ code }) => {
      process.exit(code);
    });
}

if (process.argv.length > 2) {
  return npsExec(process.argv.slice(2).join(" "));
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
    npsExec(result);
  });
