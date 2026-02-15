#!/usr/bin/env node

import chalk from "chalk";
import { promptStack } from "./prompts.js";
import { generateRules } from "./generators/rules.js";
import { generateAgentsFile } from "./generators/agents.js";

async function main(): Promise<void> {
  console.log(chalk.bold.cyan("\n🤖 agent-rules v0.1.0\n"));
  console.log(chalk.dim("Set up AI agent rules for your project.\n"));

  try {
    const stack = await promptStack();

    await generateRules(stack);
    await generateAgentsFile(stack);

    console.log(chalk.bold.green("\n✅ Setup complete!\n"));
    console.log(chalk.dim("Your AI agent rules are ready in .cursor/rules/"));
    console.log(
      chalk.dim("AGENTS.md has been generated in your project root.\n"),
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("User force closed")) {
      console.log(chalk.dim("\nSetup cancelled.\n"));
      process.exit(0);
    }
    console.error(chalk.red("\nError:"), error);
    process.exit(1);
  }
}

main();
