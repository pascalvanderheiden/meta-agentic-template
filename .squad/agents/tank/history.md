# Tank — History

## Core Context

- **Project:** A meta-cognitive template framework for building GitHub Copilot agentic capabilities across green-field, brownfield, and code modernization scenarios.
- **Role:** Integration Dev
- **Joined:** 2026-06-08T11:54:03.959Z

## Learnings

### 2026-06-08: MCP Server Landscape for Oracle → Fabric Migration

**Key findings:**
- **No first-party Oracle MCP server** — none found in official registry or community awesome-mcp-servers lists. Recommended path: Oracle REST Data Services (ORDS) OpenAPI → `.github/skills/mcp-builder` skill.
- **No first-party Microsoft Fabric MCP server** — gap in official MCP ecosystem. Recommended path: Microsoft Fabric REST APIs OpenAPI → mcp-builder skill.
- **Azure integrations limited** — community servers exist for Azure Storage/SQL but not comprehensive Fabric coverage.
- **Strong database MCP examples** — Supabase MCP server demonstrates best practices for database integration (tables, config, queries).
- **OpenAPI → MCP pattern is critical** — for domains without first-party servers, mcp-builder skill enables rapid MCP server generation from REST API specs.

**Source hubs verified:**
- **MCP Registry** (registry.modelcontextprotocol.io) — official, but small catalog (~dozens)
- **wong2/awesome-mcp-servers** (300+ servers) — most comprehensive community list
- **modelcontextprotocol/servers** — reference implementations (fetch, filesystem, git, memory, time)
- **Skills.sh ecosystem** — Vercel, Anthropic, Supabase skill sources
- **GitHub awesome-copilot** — agents, instructions, skills, MCP tools hub

### 2026-06-08: Repository Published as Public Template

**Action completed:**
- Initialized git repo locally with `git init -b main` (116 files, 23,742 insertions)
- Created initial commit with full template structure (SHA: ae27c16)
- Published to GitHub as **public repository**: https://github.com/pascalvanderheiden/meta-agentic-template
- Marked repository as **template** (`is_template=true` via GitHub API)
- Verified: visibility=PUBLIC, isTemplate=true, default branch=main

**Artifact exported:**
- Repository URL: https://github.com/pascalvanderheiden/meta-agentic-template
- Status: Public, Template-enabled, ready for `Use this template` cloning

**Technical notes:**
- Sensitive files correctly excluded from git (`.DS_Store`, `node_modules/`, `.squad/config.json`, `.squad/orchestration-log/`, `.squad/decisions/inbox/`, `.squad/sessions/`)
- Commit message includes Co-authored-by trailer: `Copilot <223556219+Copilot@users.noreply.github.com>`
- Remote origin configured and pushed successfully

<!-- Append learnings below -->

### 2026-06-08: GitHub MCP Server Configuration for Upstream Feedback Loop

**Action completed:**
- Replaced EXAMPLE-github placeholder in `.copilot/mcp-config.json` with production GitHub MCP server config
- Server named `github` (exact match for `mcp__github__*` tool resolution in github-issues skill)
- Remote HTTP server: `https://api.githubcopilot.com/mcp/` (GitHub-hosted, canonical config)
- Auth: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}` placeholder (no hardcoded secrets)
- File NOT gitignored → ships in template for downstream repos

**Documentation added:**
- Added § 2 "MCP — GitHub Server (Feedback Loop Transport)" to `.github/skills/meta-agentic-method/references.md`
- Documented remote config (recommended) + local Docker fallback (stdio)
- Clarified MCP server = reads, `gh api` = writes (per github-issues skill pattern)
- PAT scope requirements: classic `repo` or fine-grained Issues = Read/Write

**Technical notes:**
- JSON validated: `python3 -c "import json; json.load(open('.copilot/mcp-config.json'))"` passes
- Server key verified: `github` (not EXAMPLE-github)
- `.copilot/mcp-config.json` ships in template (exit code 1 from git check-ignore confirms NOT ignored)
- Source: https://github.com/github/github-mcp-server

**2025-01-XX: Repo Restructure Link Rewiring**
- Moved shared prompts INTO skills:
  - `.github/prompts/shared/meta-agentic-method.md` → `.github/skills/meta-agentic-method/SKILL.md`
  - `.github/prompts/references.md` → `.github/skills/meta-agentic-method/references.md`
  - `.github/prompts/templates/progress-report.template.html` → `.github/skills/progress-report/progress-report.template.html`
- Updated link references in 3 prompt files (green-field, brown-field, modernization) + copilot-instructions.md
- Replaced both absolute (`.github/prompts/...`) and relative (`./shared/...`, `./templates/...`) paths
- Preserved section anchors (e.g., `§ Analysis phase requirements`) when present
- Verification: `grep -rnE "prompts/(shared|templates|references)|\./(shared|templates|references)"` returns nothing

### 2025-01-XX: Playwright MCP Server Integration + Testing Source Catalog

**MCP config updated:**
- Added Playwright MCP server to `.copilot/mcp-config.json` alongside existing `github` server
- Config: `"playwright": { "command": "npx", "args": ["@playwright/mcp@latest"] }`
- Verified both servers present: `python3 -c "import json; d=json.load(open('.copilot/mcp-config.json')); print(sorted(d['mcpServers']))"` → `['github', 'playwright']`
- Source: https://github.com/microsoft/playwright-mcp (canonical config)

**Testing catalog added:**
- Created § 3 "Testing & MCP" in `.github/skills/meta-agentic-method/references.md`
- Playwright MCP server documented with config snippet
- E2E/UI: Playwright (https://playwright.dev)
- Unit testing: Jest (https://jestjs.io), JUnit (https://junit.org)
- BDD: Cucumber/Gherkin (https://cucumber.io)
- Approval/snapshot testing (brown-field lock-down): Approval Tests (https://approvaltests.com)
- AI-assisted refactoring: BMAD-METHOD (https://github.com/bmad-code-org/BMAD-METHOD)
- API contract testing (modernization parity): Pact (https://pact.io), Schemathesis (https://schemathesis.readthedocs.io)
- Mapped each framework to scenario: green-field (Playwright+Jest/JUnit+BDD), brown-field (Approval Tests+BMAD+Playwright), modernization (Pact+Schemathesis)

**GitHub auth note corrected:**
- Fixed § 2 "MCP — GitHub Server" to clarify: filing issues on public repos does NOT require manual PAT
- Remote GitHub MCP server supports host OAuth (IDE/Copilot sign-in provides identity)
- PAT (classic-`repo` / fine-grained Issues:Write) is FALLBACK when OAuth unavailable
- Public repo reads need no auth

**Renumbered sections:**
- § 3 Testing & MCP (new)
- § 4 MCP — Building Your Own (was § 3)
- § 5 MCP — Data & Cloud Servers (was § 3, renumbered)
- § 6 Skills Ecosystem (was § 4)
- § 7 Copilot Customization (was § 5)
- § 8 Spec-Driven Development (was § 6)
- § 9 Domain Docs — Oracle (was § 7)
- § 10 Domain Docs — Microsoft Fabric (was § 8)
