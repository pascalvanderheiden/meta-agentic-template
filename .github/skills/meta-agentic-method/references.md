# Authoritative Source References

Clean, concise catalog of generic sources for discovering agentic artifacts (skills, MCP servers, custom agents, instructions, libraries) to reuse in ANY project. When discovery finds no suitable artifact, BUILD it with the meta-cognition skills in this repo.

---

## 1. Skills

**Skills.sh** — open agent-skills ecosystem; CLI `npx skills find <q>` / `npx skills add <owner/repo>` — https://skills.sh (verified: yes)

**GitHub Awesome Copilot** — agents, instructions, prompts, skills, collections — https://github.com/github/awesome-copilot (verified: yes)  
**Awesome Copilot site** — https://awesome-copilot.github.com (verified: yes)  
**llms.txt** (machine-readable) — https://awesome-copilot.github.com/llms.txt (verified: yes)

**Anthropic Skills** — https://github.com/anthropics/skills (verified: unverified)

**Microsoft Skills** — https://github.com/microsoft/skills (verified: unverified)

**Google Gemini Cookbook** — agents, skills, Gemini CLI extensions — https://github.com/google-gemini/cookbook (verified: yes)

**Vercel agent-skills** — https://github.com/vercel-labs/agent-skills (verified: yes)

**Local:** `.github/skills/find-skills` — search the ecosystem from within this repo

---

## 2. MCP Servers

**GitHub MCP Registry** — https://github.com/mcp (verified: yes)

**Official MCP Registry** — https://registry.modelcontextprotocol.io/ (verified: yes)

**MCP reference servers** — https://github.com/modelcontextprotocol/servers (verified: yes)

**Community list** — https://github.com/wong2/awesome-mcp-servers (verified: yes)

**GitHub MCP Server** (feedback-loop transport) — https://github.com/github/github-mcp-server (verified: yes)

**Config (Remote):**
```json
{
  "github": {
    "type": "http",
    "url": "https://api.githubcopilot.com/mcp/",
    "headers": {
      "Authorization": "Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}"
    }
  }
}
```

**Config (Docker fallback):**
```json
{
  "github": {
    "command": "docker",
    "args": ["run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN", "ghcr.io/github/github-mcp-server"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PERSONAL_ACCESS_TOKEN}"
    }
  }
}
```

**Auth note:** Public reads need no auth. Filing issues needs auth via host OAuth (IDE sign-in provides identity); PAT is only a fallback.

**Playwright MCP** (browser/UI testing) — https://github.com/microsoft/playwright-mcp (verified: yes)

**Config:**
```json
{
  "playwright": {
    "command": "npx",
    "args": ["@playwright/mcp@latest"]
  }
}
```

---

## 3. Custom Agents & Instructions

**GitHub Awesome Copilot** — agents + instructions library — https://github.com/github/awesome-copilot (verified: yes)

**GitHub Copilot docs** — https://docs.github.com/copilot (verified: unverified)

**VS Code Copilot customization** — https://code.visualstudio.com/docs/copilot/copilot-customization (verified: unverified)

---

## 4. Libraries & Frameworks

**Playwright** https://playwright.dev (verified: yes) | **Jest** https://jestjs.io (verified: yes) | **JUnit** https://junit.org (verified: yes) | **Cucumber/BDD** https://cucumber.io (verified: yes) | **Approval Tests** https://approvaltests.com (verified: yes) | **BMAD-METHOD** https://github.com/bmad-code-org/BMAD-METHOD (verified: yes) | **Pact** https://pact.io (verified: yes) | **Schemathesis** https://schemathesis.readthedocs.io (verified: yes)

**Scenario mapping:** green-field → Playwright+Jest/JUnit+Cucumber; brown-field → Approval Tests+BMAD+Playwright; modernization → Pact+Schemathesis (contract/parity).

---

## 5. Spec-Driven Development

**GitHub Spec-Kit** — https://github.com/github/spec-kit (verified: yes), docs https://github.github.io/spec-kit/ (verified: yes)

**OpenSpec** — https://github.com/Fission-AI/OpenSpec (verified: unverified) — spec-driven workflow that aligns humans and agents on specs/change proposals before coding.

**Superpowers** — https://github.com/obra/superpowers (verified: unverified) — composable agent skills (brainstorming, writing-plans, TDD) for a spec-first, plan-driven workflow.

**Architecture Decision Records** — https://adr.github.io/ (verified: unverified)

---

## 6. Build to Bridge the Gap

**Rule:** If discovery finds no suitable skill / MCP server / agent / instruction, BUILD it with this repo's meta-cognition skills rather than abandoning the capability.

**`.github/skills/mcp-builder`** — generate a new MCP server (e.g., from OpenAPI spec or API surface) when no existing server covers the capability.

**`.github/skills/skill-creator`** — author a new skill when none exists.

**New custom agents / instructions** — follow `.github/instructions/agents.instructions.md` and `.github/instructions/instructions.instructions.md`.

**MCP build references:**  
- https://modelcontextprotocol.io (verified: unverified)  
- TS SDK https://github.com/modelcontextprotocol/typescript-sdk (verified: unverified)  
- Python SDK https://github.com/modelcontextprotocol/python-sdk (verified: unverified)

**Note:** This ties to the confidence rubric — a gap filled by building scores lower on MCP/Skill availability until verified.

---

## 7. How to Keep This Current

- **Re-verify `unverified` links:** Use `web_fetch` during runs to validate and update status.
- **Append newly-discovered GENERIC sources only:** Never project- or domain-specific ones (no vendor/product docs).
- **Keep it concise:** Short entries, consistent format, minimal prose.
- **Check periodically:** awesome-copilot, awesome-mcp-servers, skills.sh for new additions.
