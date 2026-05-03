#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { hasOpenAIKey } from "../config/env.js";
import { loadAllMockData } from "../db/mock-data.js";
import { projectMetadata } from "../schemas/project.js";
import {
  getAccountIntelligenceSnapshot,
  getCompetitorWatchSnapshot,
  getWarRoomSignalDigest
} from "../tools/index.js";

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

program
  .command("data:check")
  .description("Validate all synthetic mock datasets.")
  .action(async () => {
    const data = await loadAllMockData();

    console.log(chalk.bold("SignalForge synthetic data check"));
    console.log("");

    console.log(`${chalk.cyan("Accounts:")} ${data.accounts.length}`);
    console.log(`${chalk.cyan("Competitors:")} ${data.competitors.length}`);
    console.log(`${chalk.cyan("Market signals:")} ${data.marketSignals.length}`);
    console.log(`${chalk.cyan("Support tickets:")} ${data.supportTickets.length}`);
    console.log(`${chalk.cyan("Product metrics:")} ${data.productMetrics.length}`);

    console.log("");
    console.log(chalk.green("All mock datasets passed schema validation."));
  });

program
  .command("tools:demo")
  .description("Run deterministic intelligence tools against synthetic data.")
  .option("-a, --account <accountId>", "Account id", "acct_novafox")
  .option("-c, --competitor <competitorId>", "Competitor id", "comp_datapulse")
  .action(async (options: { account: string; competitor: string }) => {
    const [accountSnapshot, competitorSnapshot, signalDigest] =
      await Promise.all([
        getAccountIntelligenceSnapshot(options.account),
        getCompetitorWatchSnapshot(options.competitor),
        getWarRoomSignalDigest()
      ]);

    console.log(chalk.bold("SignalForge tools demo"));
    console.log("");

    console.log(chalk.cyan("Account snapshot"));
    console.log(`Name: ${accountSnapshot.account.name}`);
    console.log(`Stage: ${accountSnapshot.account.stage}`);
    console.log(`Fit score: ${accountSnapshot.account.fitScore}`);
    console.log(`Risk level: ${accountSnapshot.riskSummary.riskLevel}`);
    console.log(`Linked signals: ${accountSnapshot.linkedSignals.length}`);
    console.log(`Support tickets: ${accountSnapshot.supportTickets.length}`);
    console.log("");

    console.log(chalk.cyan("Competitor snapshot"));
    console.log(`Name: ${competitorSnapshot.competitor.name}`);
    console.log(`Category: ${competitorSnapshot.competitor.category}`);
    console.log(`Watched signals: ${competitorSnapshot.watchedSignals.length}`);
    console.log(
      `Sales objections: ${competitorSnapshot.likelySalesObjections.length}`
    );
    console.log("");

    console.log(chalk.cyan("War room digest"));
    console.log(`High-impact signals: ${signalDigest.highImpactSignals.length}`);
    console.log(`Risky accounts: ${signalDigest.riskyAccounts.length}`);
    console.log(`Product risks: ${signalDigest.productRisks.length}`);
    console.log(`Support hotspots: ${signalDigest.supportHotspots.length}`);
    console.log("");

    console.log(chalk.green("Tools demo completed."));
  });

program.parse();
