#!/usr/bin/env node

const { exec } = require("child_process");
const fs = require("fs");
const flat = require("flat");
const chalk = require("chalk");
const inquirer = require("inquirer");
const inquirerAutocompletePrompt = require("inquirer-autocomplete-prompt");
const fuzzy = require("fuzzy");
const trimNewLines = require("trim-newlines");

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
    exec(`npm start ${result}`, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        return;
      }
      if (stdout) {
        console.log(trimNewLines(stdout));
      }
      if (stderr) {
        console.log(trimNewLines(stderr));
      }
    });
  });
