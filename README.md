# agent-setup

CLI tool to set up AI agent rules and configuration for your project.

## Install

```bash
npm install -g agent-setup
```

## Usage

Navigate to your project root and run:

```bash
agent-setup
```

You'll be prompted to select a stack:

- **Expo** (React Native)
- **Next.js**
- **Node API**

The tool will:

1. Copy base rule files into `.cursor/rules/`
2. Copy stack-specific rule files into `.cursor/rules/`
3. Generate an `AGENTS.md` file in the project root

## Idempotent

If rule files or `AGENTS.md` already exist, you'll be prompted before overwriting.

## Development

```bash
npm install
npm run build
node dist/cli.js
```

## License

MIT
