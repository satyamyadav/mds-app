# Using this template with Claude Desktop

Claude Code reads `.mcp.json`, `CLAUDE.md` and `.claude/skills/` automatically. Claude Desktop does not — set it up once as below.

## 1. Add the MDS MCP server

Settings → Developer → Edit Config, then add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "masala-design-system": {
      "command": "npx",
      "args": ["-y", "@innovaccer/mds-mcp"]
    }
  }
}
```

Optional — Figma Dev Mode MCP (enable Dev Mode MCP in the Figma desktop app first):

```json
"Figma Dev Mode MCP": { "url": "http://127.0.0.1:3845/sse" }
```

Fully quit Claude Desktop (Cmd+Q) and reopen. Check it works by asking "list MDS components" — it should call `ds_list_components`.

### Troubleshooting: server fails to start / `npx` not found

Desktop doesn't inherit your shell `PATH` (nvm, Homebrew), so `npx` may not resolve or may pick an old Node.

- Run `which npx` in a terminal and use that absolute path as `"command"` (e.g. `/Users/you/.nvm/versions/node/v22.x/bin/npx`).
- Or install once with `npm install -g @innovaccer/mds-mcp` and use the path from `which mds-mcp` as `"command"` with no `"args"`.

## 2. Create a project

Create a Claude Desktop project, give it access to your cloned folder, and paste this as the project instructions:

```
You are prototyping UI in an Innovaccer MDS React app. Read CLAUDE.md in the project root first and follow its rules exactly.
Before writing UI, read .claude/skills/mds-ui/SKILL.md and .claude/skills/mds-prototype-guide/SKILL.md.
For new apps, pages, features, components or Figma work, follow the matching .claude/skills/<name>/SKILL.md.
Always look up components, props, helpers and tokens with the masala-design-system MCP tools (ds_*) — never from memory.
Ask clarifying questions and confirm a short plan before coding; keep `npx tsc -b --noEmit` passing after every change.
```
