import path from "node:path";
import chalk from "chalk";
import type { StackConfig } from "../stacks.js";
import { BASE_RULES } from "../stacks.js";
import {
  packagePath,
  projectPath,
  ensureDir,
  fileExists,
  copyFile,
} from "../file-system.js";
import { promptOverwrite } from "../prompts.js";

const RULES_DEST = ".cursor/rules";

/**
 * Copy a single rule file into the project's .cursor/rules/ directory.
 * Prompts before overwriting existing files.
 */
async function copyRule(
  srcDir: string,
  fileName: string,
  destDir: string
): Promise<void> {
  const src = path.join(srcDir, fileName);
  const dest = path.join(destDir, fileName);

  const exists = await fileExists(dest);
  if (exists) {
    const overwrite = await promptOverwrite(dest);
    if (!overwrite) {
      console.log(chalk.yellow(`  Skipped: ${fileName}`));
      return;
    }
  }

  await copyFile(src, dest);
  console.log(chalk.green(`  Copied: ${fileName}`));
}

/**
 * Copy all base rules and stack-specific rules into the project.
 */
export async function generateRules(stack: StackConfig): Promise<void> {
  const destDir = projectPath(RULES_DEST);
  await ensureDir(destDir);

  console.log(chalk.blue("\nCopying base rules..."));
  const baseDir = packagePath("rules", "base");
  for (const rule of BASE_RULES) {
    await copyRule(baseDir, rule, destDir);
  }

  console.log(chalk.blue(`\nCopying ${stack.name} rules...`));
  const stackDir = packagePath("rules", "stacks", stack.value);
  for (const rule of stack.rules) {
    await copyRule(stackDir, rule, destDir);
  }
}
