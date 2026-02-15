import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Resolve a path relative to the package root (one level up from dist/).
 */
export function packageRoot(): string {
  return path.resolve(__dirname, "..");
}

/**
 * Resolve a path relative to the current working directory.
 */
export function projectPath(...segments: string[]): string {
  return path.resolve(process.cwd(), ...segments);
}

/**
 * Resolve a path relative to the package's bundled files.
 */
export function packagePath(...segments: string[]): string {
  return path.resolve(packageRoot(), ...segments);
}

/**
 * Ensure a directory exists, creating it recursively if needed.
 */
export async function ensureDir(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath);
}

/**
 * Check if a file exists.
 */
export async function fileExists(filePath: string): Promise<boolean> {
  return fs.pathExists(filePath);
}

/**
 * Copy a file from source to destination.
 */
export async function copyFile(src: string, dest: string): Promise<void> {
  await fs.copy(src, dest);
}

/**
 * Write content to a file.
 */
export async function writeFile(
  filePath: string,
  content: string
): Promise<void> {
  await fs.writeFile(filePath, content, "utf-8");
}

/**
 * Read content from a file.
 */
export async function readFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, "utf-8");
}
