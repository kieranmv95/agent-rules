export interface StackConfig {
  name: string;
  value: string;
  description: string;
  rules: string[];
}

export const STACKS: StackConfig[] = [
  {
    name: "Base Rules",
    value: "base",
    description: "Base rules for all typescript basedprojects",
    rules: [],
  },
  {
    name: "Expo (React Native)",
    value: "expo",
    description: "React Native with Expo framework",
    rules: ["expo-router.mdc"],
  },
];

export const BASE_RULES = [
  "commits.mdc",
  "core.mdc",
  "linting-formatting.mdc",
  "state-async.mdc",
  "typescript.mdc",
];

export function getStackByValue(value: string): StackConfig | undefined {
  return STACKS.find((s) => s.value === value);
}
