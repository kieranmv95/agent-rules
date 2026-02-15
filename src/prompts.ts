import { select, confirm } from "@inquirer/prompts";
import { STACKS, type StackConfig } from "./stacks.js";

export async function promptStack(): Promise<StackConfig> {
  const value = await select({
    message: "Select your project stack:",
    choices: STACKS.map((stack) => ({
      name: stack.name,
      value: stack.value,
      description: stack.description,
    })),
  });

  const stack = STACKS.find((s) => s.value === value);
  if (!stack) {
    throw new Error(`Unknown stack: ${value}`);
  }

  return stack;
}

export async function promptOverwrite(filePath: string): Promise<boolean> {
  return confirm({
    message: `File "${filePath}" already exists. Overwrite?`,
    default: false,
  });
}
