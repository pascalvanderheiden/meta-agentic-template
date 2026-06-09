# Meta-Agentic Template for GitHub Copilot

A framework for orchestrating AI-powered development teams using Spec-Driven Development (SDD). Forms custom agent teams, discovers/builds capabilities (skills, MCP servers), and delivers verified solutions with real-time confidence scoring.

## Prerequisites

- **VS Code** with GitHub Copilot OR **Copilot CLI**
- **GitHub Copilot subscription**
- **Node.js v18+** (for MCP server generation)
- **Git**
- **Optional**: `gh` CLI for Squad workflows
- **Optional**: an SDD framework (Spec-Kit / OpenSpec / Superpowers) — only if you choose that path (see [Optional: SDD Frameworks](#optional-sdd-frameworks))

## Three Scenarios

| Scenario | Prompt | Use When | Example |
|----------|--------|----------|---------|
| **Green-Field** | `.github/prompts/green-field.prompt.md` | Build NEW system from scratch | Customer portal with Next.js + PostgreSQL |
| **Brown-Field** | `.github/prompts/brown-field.prompt.md` | Extend/modify EXISTING codebase | Add OAuth to legacy Express.js API |
| **Modernization** | `.github/prompts/modernization.prompt.md` | Migrate platforms or modernize legacy | Oracle ETL pipeline → Microsoft Fabric |

**Invoke:**
```bash
# VS Code
@workspace /green-field [description]
@workspace /brown-field [description]
@workspace /modernization [description]

# Copilot CLI
gh copilot prompt green-field "[description]"
```

## Two Execution Approaches

Both approaches use **identical** agent roles, skills, and MCP servers. Only orchestration differs.

| Aspect | **A. Custom Agents** | **B. Squad Team (Default)** |
|--------|---------------------|--------------------------|
| **Setup** | Generate `.agent.md` files in `.github/agents/` | Use pre-installed Squad coordinator |
| **Orchestration** | Manual agent invocation | Squad spawns agents, enforces handoffs |
| **Parallelism** | Manual | Built-in parallel fan-out |
| **Best For** | Linear workflows, 2-3 agents | Complex coordination, 4+ agents |

**Example (Custom Agents):**
```
@APIBuilder Create REST endpoints
@DatabaseArchitect Design schema
```

**Example (Squad Team):**
```
@squad Build user authentication system
# Squad spawns APIBuilder → DatabaseArchitect → Validator in sequence
```

Squad is **pre-installed** (`.github/agents/squad.agent.md`) and recommended for multi-agent scenarios.

## Optional: SDD Frameworks

Each scenario can optionally run on a spec-driven-development framework. This is **orthogonal** to the execution approach above (you can combine any framework with Custom Agents *or* Squad). The default is **None** — the native pipeline, which needs no extra install.

**If (and only if) you choose a framework, install it first:**

| Framework | Install | Recommended default for |
|-----------|---------|-------------------------|
| **None** (native) | Nothing — runs out of the box | Brown-field |
| **OpenSpec** | `npm install -g @fission-ai/openspec@latest && openspec init` | Green-field |
| **GitHub Spec-Kit** | `uvx --from git+https://github.com/github/spec-kit.git specify init . --integration copilot` (needs [uv](https://docs.astral.sh/uv/)/Python) | Modernization |
| **Superpowers** | Install the Superpowers skills plugin — see [github.com/obra/superpowers](https://github.com/obra/superpowers) | Any (quality/TDD overlay) |

Defaults are **recommendations, not mandates** — the scenario prompt asks during Intake and you can pick any option (or None). Details: `.github/skills/meta-agentic-method/SKILL.md` § *SDD Framework Selection (Optional)*.

## Use on an Existing Codebase (APM)

Green-field: fork/use this template. Brown-field or modernization: install the agentic artifacts into your existing repo; no fork required.

```bash
apm install \
  pascalvanderheiden/meta-agentic-template/.github/prompts/green-field.prompt.md \
  pascalvanderheiden/meta-agentic-template/.github/prompts/brown-field.prompt.md \
  pascalvanderheiden/meta-agentic-template/.github/prompts/modernization.prompt.md \
  pascalvanderheiden/meta-agentic-template/.github/skills/meta-agentic-method \
  pascalvanderheiden/meta-agentic-template/.github/skills/progress-report \
  pascalvanderheiden/meta-agentic-template/.github/skills/github-issues \
  pascalvanderheiden/meta-agentic-template/.github/instructions \
  pascalvanderheiden/meta-agentic-template/.github/agents/squad.agent.md
apm install --mcp io.github.github/github-mcp-server --transport http
apm install --mcp microsoft/playwright-mcp
```

Pulls: 3 scenario prompts, method/report/feedback skills, authoring instructions, Squad agent, and GitHub + Playwright MCP servers. If APM cannot auto-detect Copilot, append `--target copilot`. The upstream feedback loop still works: `github-issues` + GitHub MCP travel with the install, issues file to this template repo, and `apm.lock.yaml` pins what you ran. See `.github/skills/meta-agentic-method/SKILL.md` § *Repository Topology by Scenario* for where work happens.

## How It Works

The workflow executes a **10-phase SDD pipeline** (methodology: `.github/skills/meta-agentic-method/SKILL.md`):

1. **Intake** → Clarify scenario, answer questions
2. **Discovery** (brown-field) → Inventory existing system
3. **Assessment** (modernization) → Legacy-to-target gap analysis
4. **Analysis** → Decompose into functional domains
5. **Capability Mapping** → Find skills, MCP servers, instructions (sources: `.github/skills/meta-agentic-method/references.md`)
6. **Capability Acquisition** → Reuse or build missing capabilities
7. **Team Formation** → Assign capabilities to agent roles
8. **Execution** → Agents produce specs + code
9. **Verification** → Validate deliverables, calculate confidence score
10. **Handoff** → Generate README + real-time HTML report

**Confidence Score** (0-100):
- Weighted across 6 dimensions: Capability Coverage (25%), MCP Availability (20%), Skill Coverage (15%), Domain Knowledge (15%), Spec Completeness (15%), Verification (10%)
- **Green (80-100)**: Ready for production
- **Amber (50-79)**: Viable with gaps
- **Red (0-49)**: Blockers present

**Progress Report** (`docs/<scenario>/progress-report.html`):
- Real-time updates after each phase
- Self-contained, no network required
- Generated from `.github/skills/progress-report/SKILL.md`

## Status Report

The real-time HTML report provides visibility into workflow execution:

![Status Report](docs/images/status-report.png)

**Key Elements:**
- **Overall Confidence Gauge** (0-100) with color bands (green/amber/red)
- **6 Dimension Breakdown**: Capability Coverage, MCP Availability, Skill Coverage, Domain Knowledge, Spec Completeness, Verification Status
- **Phase Timeline**: Pending → In Progress → Done → Blocked
- **Team Roster**: Agents with assigned skills, instructions, MCP servers
- **Capability Acquisition**: Found/Built/Reused/Missing status
- **Risks & Gaps**: Critical/High/Medium/Low severity

Report updates after each phase. Open `docs/<scenario>/progress-report.html` in browser (self-contained, no network required).

## Repository Structure

| Path | Purpose |
|------|---------|
| `.github/prompts/` | Scenario workflows (green-field.prompt.md, brown-field.prompt.md, modernization.prompt.md) |
| `.github/skills/` | Reusable skills: `meta-agentic-method` (methodology + references), `progress-report`, `find-skills`, `mcp-builder`, `skill-creator` |
| `.github/instructions/` | Authoring guidelines: `agents.instructions.md`, `agent-skills.instructions.md`, `instructions.instructions.md`, `prompt.instructions.md`, `hooks.instructions.md` |
| `.github/agents/` | Custom agents including Squad coordinator (`squad.agent.md`) |
| `.squad/` | Squad team management (team.md, routing.md, decisions.md, agent folders) |

## Extending the Template

**Add Skill:**
```
@workspace Use skill-creator to create skill for [purpose]
```

**Add Agent:**
Create `<name>.agent.md` in `.github/agents/` following `agents.instructions.md`

**Add Instruction:**
Create `<topic>.instructions.md` in `.github/instructions/` following `instructions.instructions.md`

**Find Ecosystem Capabilities:**
```bash
@workspace Use find-skills to search for [capability]
npx skills find <query>
```

**Build MCP Server:**
```
@workspace Use mcp-builder to generate MCP server from [OpenAPI URL]
```

Check `.github/skills/meta-agentic-method/references.md` for MCP/skill registries.

## Conventions

- **File naming**: `kebab-case` (`.agent.md`, `.instructions.md`, `.prompt.md`)
- **Format**: Markdown with YAML frontmatter (single-quoted strings)
- **Portability**: Works across VS Code, Copilot CLI, GitHub.com
- **Quality**: Follow matching `.github/instructions/` guideline for artifact type

See `.squad/decisions.md` for standing decisions.

---

**License**: MIT  
**Author**: Pascal van der Heiden

For questions or contributions, open an issue or submit a pull request.
