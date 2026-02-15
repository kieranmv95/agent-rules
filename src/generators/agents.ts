import chalk from "chalk";
import type { StackConfig } from "../stacks.js";
import { BASE_RULES } from "../stacks.js";
import {
  packagePath,
  projectPath,
  fileExists,
  readFile,
  writeFile,
} from "../file-system.js";
import { promptOverwrite } from "../prompts.js";

const AGENTS_FILE = "AGENTS.md";
const TEMPLATE_PATH = "templates/AGENTS.template.md";

/**
 * Generate an AGENTS.md file in the project root from the template.
 */
export async function generateAgentsFile(stack: StackConfig): Promise<void> {
  const destPath = projectPath(AGENTS_FILE);

  const exists = await fileExists(destPath);
  if (exists) {
    const overwrite = await promptOverwrite(destPath);
    if (!overwrite) {
      console.log(chalk.yellow(`\nSkipped: ${AGENTS_FILE}`));
      return;
    }
  }

  const templatePath = packagePath(TEMPLATE_PATH);
  let content = await readFile(templatePath);

  const allRules = [...BASE_RULES, ...stack.rules];
  const rulesListMd = allRules.map((r) => `- \`.cursor/rules/${r}\``).join("\n");

  content = content
    .replace("{{STACK_NAME}}", stack.name)
    .replace("{{STACK_VALUE}}", stack.value)
    .replace("{{RULES_LIST}}", rulesListMd)
    .replace("{{GENERATED_DATE}}", new Date().toISOString().split("T")[0]);

  await writeFile(destPath, content);
  console.log(chalk.green(`\nGenerated: ${AGENTS_FILE}`));
}
