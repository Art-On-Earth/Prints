# Agent compatibility

One source lives in `skills/aoe-print`. Generated copies bundle the same instructions and every reference; they do not contain different design rules.

| Installation target | Project directory |
| --- | --- |
| Codex | `.agents/skills/aoe-print` |
| Cursor | `.agents/skills/aoe-print` |
| Gemini CLI | `.agents/skills/aoe-print` |
| Claude Code | `.claude/skills/aoe-print` |

These are the [skills installer agent mappings](https://github.com/vercel-labs/skills/blob/main/src/agents.ts). The three shared targets need one directory, not three redundant copies. Plugin marketplace manifests are outside this release.

## Install

Requires Node.js 22.20+ for the tested skills 1.7.0 installer. From your project directory:

```sh
npx skills@1.7.0 add https://github.com/Art-On-Earth/Prints --skill aoe-print
```

Choose your agent interactively, or add `--agent claude-code`, `--agent codex`, `--agent cursor`, or `--agent gemini-cli`. The installer handles placement; do not copy only SKILL.md and omit the references. Restart or reload your agent if necessary and explicitly ask it to use aoe-print.

## Evidence, 2026-10-05

A local source installation into an isolated temporary project used Node.js 22.20.0 and skills 1.7.0 with `--agent codex cursor gemini-cli claude-code --yes --copy`. The installer found exactly one named skill and reported all four targets installed. Both resulting directories contained all 15 source files, verified byte-for-byte.

This is an installer/filesystem smoke test. We have not launched all four agents to verify discovery, invocation, reference loading during a conversation, or output quality. The smoke test used a local source, not a fresh GitHub clone. No global user installation was changed.

## Maintenance

Edit only `skills/aoe-print`, never generated copies. Keep VERSION and the entrypoint metadata version aligned.

```sh
npm run build:agents
npm test
npm run check:agents
```

The build requires Node.js 20+ and no dependencies. Commit both generated directories with source changes. CI runs tests and rejects missing, stale, or extra generated files; it does not write or commit files automatically. Tests cover complete copying, idempotence, drift repair, broken references, version mismatch, and symlink refusal.
