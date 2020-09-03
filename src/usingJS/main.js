require("colors");
const sh = require("shelljs");
const inquirer = require("inquirer");
const fse = require("fs-extra");
const set = require("lodash.set");
const ora = require("ora");

sh.config.silent = true;

const mainQuestions = async () => {
  const configs = [];
  const questions = [];
  const aswers = await inquirer.prompt(questions);
  configs.push(aswers);
  return configs;
};

const createReactAppJS = (appName, appType, appLanguage, appManager) => {
  console.log("\n");
  const spinner = ora(
    `✨ Generating a ${appType.underline.brightGreen} in a directory called ${appName.bold} 
    \n\n> Using: ${appLanguage.cyan} as a programming language.\n${appManager}`
  ).start();
  spinner.spinner = "dots";
  spinner.color = "cyan";
  if (appType === "create-react-app (Default)") {
    return new Promise((resolve, reject) => {
      sh.exec(`npx create-react-app ${appName}`, () => {
        const redirect = sh.cd(appName);
        if (redirect.code !== 0) {
          console.log(`❌ Error while searching for ${appName}`.red);
          reject();
        }
        if (resolve()) {
          spinner.succeed();
        } else {
          spinner.fail();
        }
      });
    });
  } else if (appType === "create-react-app (Using webpack⚡)") {
    // Using the CRA template for now
    // @TODO: Using javascript webpack template for use on _mocks_
    return new Promise((resolve, reject) => {
      sh.exec(`npx create-react-app ${appName}`, () => {
        const redirect = sh.cd(appName);
        if (redirect.code !== 0) {
          console.log(`❌ Error while searching for ${appName}`.red);
          reject();
        }
        if (resolve()) {
          spinner.succeed();
        } else {
          spinner.fail();
        }
      });
    });
  }
};

exports.execute = async (
  appName,
  appDirectory,
  appType,
  appLanguage,
  appManager
) => {
  const preferedConfig = await mainQuestions();
  await createReactAppJS(appName, appType, appLanguage, appManager);

  console.log(`✅ Created ${appType} on ${appName}`);
  return true;
};

process.on("SIGINT", function () {
  console.log("\nCancelled the app generation (CTRL+C was pressed)".inverse);
  process.exit(1);
});