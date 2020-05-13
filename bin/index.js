#!/usr/bin/env node
const { program } = require("commander");
const chalk = require("chalk");
const ora = require("ora");
const download = require("download-git-repo");
const fs = require("fs");

const url = "github:yuanzhiyong123/react-admin-temp";

program
  .version(require("../package").version)
  .option("-i,--init <name>", "project name,项目名称");
program.on("--help", () => {
  console.log("");
  console.log("Example:");
  console.log(chalk.green("$ ai-temp-cli --name <my-project>"));
});
program.parse(process.argv);
const projectName = program.init;
fs.exists(projectName, (exists) => {
  if (exists) {
    console.log(chalk.red("创建失败，当前文件夹已存在！"));
  } else {
    console.log(chalk.white("\n Start generating... \n"));
    // 出现加载图标
    const spinner = ora("Downloading template...");
    spinner.start();
    download(url, projectName, (err) => {
      if (err) {
        spinner.fail();
        console.log(chalk.red(`Generation failed. ${err}`));
        return;
      }
      // 结束加载图标
      spinner.succeed();
      console.log(chalk.green("\n Generation completed!"));
      console.log("\n To get started:");
      console.log(`\n    cd ${projectName} \n`);
      console.log(`\n    npm install \n`);
      console.log(`\n    npm run dev \n`);
    });
  }
});
