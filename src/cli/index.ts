#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { hasOpenAIKey } from "../config/env.js";
import { projectMetadata } from "../schemas/project.js";

const program = new Command();

program
  .name("sf")
  .description("SignalForge War Room CLI")
  .version(projectMetadata.version);

program
  .command("health")
  .description("Check the local SignalForge project setup.")
  .action(() => {
    console.log(chalk.bold("SignalForge War Room"));
    console.log(chalk.gray("CLI-first multi-agent business intelligence system"));
    console.log("");

    console.log(`${chalk.cyan("Version:")} ${projectMetadata.version}`);
    console.log(`${chalk.cyan("Mode:")} ${projectMetadata.mode}`);
    console.log(`${chalk.cyan("Data policy:")} ${projectMetadata.dataPolicy}`);
    console.log(
      `${chalk.cyan("Private data policy:")} ${projectMetadata.privateDataPolicy}`
    );
    console.log(
      `${chalk.cyan("OpenAI key detected:")} ${
        hasOpenAIKey() ? chalk.green("yes") : chalk.yellow("no")
      }`
    );

    console.log("");
    console.log(chalk.green("Health check passed."));
  });

program.parse();
