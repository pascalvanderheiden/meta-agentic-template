# GitHub Copilot Custom Instructions

This repository is a **meta-agentic template** — a structured workspace for authoring high-quality GitHub Copilot artifacts (custom agents, skills, instructions, prompts, hooks) and orchestrating AI teams through the Squad system. Every artifact produced here follows standardized guidelines to ensure portability across VS Code, Copilot CLI, and GitHub Copilot coding agent.

## Repository Structure

| Path | Purpose |
|------|---------|
| `.github/instructions/` | Authoring guidelines for each artifact type (agents, skills, instructions, prompts, hooks) |
| `.github/skills/` | Reusable agent skills (find-skills, mcp-builder, skill-creator) |
| `.github/agents/` | Custom agents, including Squad coordinator |
| `.github/prompts/` | Scenario-based workflows (green-field, brown-field, modernization) |
| `.github/hooks/` | Lifecycle event hooks with safety guardrails |
| `.squad/` | Squad team management (team.md, routing.md, decisions.md, agent folders) |

## Core Convention: Follow Matching Guidelines

**MANDATORY**: When creating or editing any artifact, FOLLOW the corresponding guideline file in `.github/instructions/`.

| Artifact Type | Apply Guideline | Glob Pattern |
|---------------|-----------------|--------------|
| Agent files | `agents.instructions.md` | `**/*.agent.md` |
| Agent skills | `agent-skills.instructions.md` | `**/skills/**/SKILL.md` |
| Custom instructions | `instructions.instructions.md` | `**/*.instructions.md` |
| Prompt files | `prompt.instructions.md` | `**/*.prompt.md` |
| Hooks | `hooks.instructions.md` | `.github/hooks/**, hooks/**` |
| Terse output mode | `caveman-mode.instructions.md` | `**` (when requested) |

**Standing decision** (`.squad/decisions.md`, 2026-06-08): All squad agents MUST leverage this project's authoring instruction files when creating/editing artifacts. This is self-enforced quality control.

## File-Type Cheat Sheet

### Custom Agents (`*.agent.md`)

- **Naming**: `kebab-case.agent.md` (e.g., `test-specialist.agent.md`)
- **Location**: `.github/agents/` (repository) or `agents/` (org/enterprise)
- **Guideline**: `.github/instructions/agents.instructions.md`
- **Key elements**: YAML frontmatter (`description`, `name`, `tools`, `model`), prompt defining role/responsibilities/constraints
- **Usage**: Specialized agents for focused tasks (testing, security review, implementation)

### Agent Skills (`**/skills/**/SKILL.md`)

- **Naming**: Skill folder name in `kebab-case`, contains `SKILL.md`
- **Location**: `.github/skills/<skill-name>/SKILL.md` (project) or `~/.github/skills/<skill-name>/` (personal)
- **Guideline**: `.github/instructions/agent-skills.instructions.md`
- **Key elements**: YAML frontmatter (`name`, `description` with WHAT/WHEN/KEYWORDS), body (when to use, prerequisites, workflows, gotchas, troubleshooting)
- **Bundled resources**: `scripts/`, `references/`, `assets/`, `templates/`
- **Existing skills**: `find-skills`, `mcp-builder`, `skill-creator`

### Custom Instructions (`*.instructions.md`)

- **Naming**: `kebab-case.instructions.md` (e.g., `react-best-practices.instructions.md`)
- **Location**: `.github/instructions/`
- **Guideline**: `.github/instructions/instructions.instructions.md`
- **Key elements**: YAML frontmatter (`description`, `applyTo` glob pattern), structured sections (general instructions, best practices, code standards, patterns)
- **Purpose**: Context-aware coding standards and conventions for specific file types

### Prompt Files (`*.prompt.md`)

- **Naming**: `kebab-case.prompt.md` (e.g., `generate-readme.prompt.md`)
- **Location**: `.github/prompts/`
- **Guideline**: `.github/instructions/prompt.instructions.md`
- **Key elements**: YAML frontmatter (`description`, `name`, `agent`, `tools`, `argument-hint`), structured body (Mission, Scope & Preconditions, Inputs, Workflow, Output Expectations)
- **Scenario prompts**: `green-field.prompt.md`, `brown-field.prompt.md`, `modernization.prompt.md`

### Hooks (`*.json` + scripts)

- **Naming**: `kebab-case.json` + matching scripts in `scripts/`
- **Location**: `.github/hooks/`
- **Guideline**: `.github/instructions/hooks.instructions.md`
- **Key elements**: JSON config (`preToolUse`, `postToolUse` events), Bash/PowerShell scripts, matchers for tool filtering
- **Purpose**: Lifecycle event hooks for safety guardrails and automation

## The Squad System

`.github/agents/squad.agent.md` defines a coordinator agent that orchestrates specialized AI teams. Key concepts:

- **Team formation**: Squad proposes a team of named agents (cast from universes) based on project description
- **Agent storage**: Individual agents live in `.squad/agents/<agent-name>/` with `history.md`, `charter.md`, `context.md`
- **Decisions**: All architectural decisions recorded in `.squad/decisions.md` (append-only, union merge strategy)
- **Routing**: `.squad/routing.md` defines which agents handle which types of tasks
- **Ceremonies**: `.squad/ceremonies.md` tracks standups, retros, planning sessions

**Respect squad conventions**: Follow existing decisions, use the prescribed agent spawn patterns, maintain agent history files.

## Scenario Prompts

Three comprehensive workflows in `.github/prompts/` orchestrate complete development lifecycles:

| Prompt | Use When | Key Phases |
|--------|----------|------------|
| `green-field.prompt.md` | Building NEW systems from scratch | Requirements → Team formation → Capability acquisition → Iterative execution |
| `brown-field.prompt.md` | EXTENDING/MODIFYING existing codebases | Discovery → Analysis → Team formation → Capability acquisition → Safe changes |
| `modernization.prompt.md` | MIGRATING platforms or MODERNIZING legacy systems | Legacy assessment → Target mapping → Team formation → Risk mitigation → Migration execution |

**Shared resources**:
- `.github/skills/meta-agentic-method/SKILL.md` — Phase model and methodology
- `.github/skills/meta-agentic-method/references.md` — Authoritative sources for MCP servers, skills, and Copilot customizations
- `.github/skills/meta-agentic-method/templates/` — SDD artifact templates scaffolded per scenario (green-field, brown-field, modernization)
- `.github/skills/progress-report/` — Progress report templates and scaffolds

**Artifact Scaffolding:** SDD artifacts (intake, analysis, discovery, assessment, capability-map, team, verification, summary, checklist) are scaffolded from templates in `.github/skills/meta-agentic-method/templates/`. Each scenario uses a specific template set: green-field skips discovery/assessment, brown-field adds discovery, modernization adds both discovery and assessment. Templates provide fixed structure with dynamic placeholders for scenario-specific content (team roster rows, capability rows, included phases).

### Testing Strategy (by Scenario)

Testing is **first-class** and **scenario-specific** in the methodology:

- **Green-field:** Use **TDD + BDD** to lock specs BEFORE coding. Write executable BDD scenarios (Gherkin) and failing tests, THEN implement to green. Frameworks: Playwright (E2E/UI), Jest/JUnit (unit).
- **Brown-field:** Establish a **SAFETY NET** BEFORE altering existing code. Capture current state with snapshot tests (Approval Tests), characterize behavior with unit tests, map dependencies (BMAD), capture Playwright UI baselines. Only modify code once the safety net is green.
- **Modernization:** Focus on **BACKWARD COMPATIBILITY** via API contract testing. Modernized modules must output the EXACT same data as legacy on identical inputs (parity tests with golden datasets).

**Tool Availability:** Playwright MCP server available for browser/UI automation. See `.github/skills/meta-agentic-method/SKILL.md` § Testing Strategy for phase-specific integration guidance and link to Verification Status confidence dimension.

## How to Extend

### Adding a New Skill

1. Use `.github/skills/skill-creator` skill for interactive creation
2. Create folder: `.github/skills/<skill-name>/`
3. Write `SKILL.md` following `agent-skills.instructions.md`
4. Add bundled resources: `scripts/`, `references/`, `assets/`, `templates/` (as needed)
5. Test with representative prompts in VS Code or Copilot CLI

### Adding a New Agent

1. Create `<name>.agent.md` in `.github/agents/`
2. Follow `agents.instructions.md` for frontmatter and prompt structure
3. Define clear role, responsibilities, tool access, and constraints
4. Test agent invocation and verify tool permissions

### Adding a New Instruction File

1. Create `<topic>.instructions.md` in `.github/instructions/`
2. Follow `instructions.instructions.md` structure
3. Define `applyTo` glob pattern for target files
4. Include concrete examples, patterns, and anti-patterns
5. Keep focused on information Copilot wouldn't know from training data

### Adding a New Prompt

1. Create `<name>.prompt.md` in `.github/prompts/`
2. Follow `prompt.instructions.md` structure
3. Define minimal required tools and clear input/output expectations
4. Test execution with `Chat: Run Prompt` in VS Code

### Discovering Existing Capabilities

- **Skills**: Use `.github/skills/find-skills` to search the skills ecosystem (`npx skills find <query>`)
- **MCP servers**: Check `.github/skills/meta-agentic-method/references.md` for registries and marketplaces
- **Build MCP servers**: Use `.github/skills/mcp-builder` to generate MCP servers from OpenAPI specs

## Template Feedback Loop

Repos created FROM this template can report template-level improvements back to the upstream source. When any agent discovers a capability gap, broken reference, unclear prompt step, or friction that lowered the confidence score **in the template itself**, file a GitHub issue to the upstream repo.

**Upstream repository:** `pascalvanderheiden/meta-agentic-template`  
⚠️ **Forks:** Override this in your `.github/copilot-instructions.md` if using a custom template origin.

**How to file:**
1. Invoke the `github-issues` skill (`.github/skills/github-issues/SKILL.md`)
2. Use label `template-feedback` (required)
3. Use structured issue body from `.github/skills/meta-agentic-method/SKILL.md` § Upstream Template Feedback Loop:
   - **Scenario** (green/brown/modernization)
   - **Prompt** file active
   - **Phase** where gap surfaced
   - **What was missing / friction**
   - **Suggested improvement**
   - **Confidence impact** (rubric dimension + estimated point delta)
   - **Repro / context** (links to artifacts)

**Transport:** Filing issues on a **public** repository requires authentication (no anonymous issue creation), but does NOT require a hand-made PAT — host OAuth (GitHub MCP server / IDE sign-in) provides the necessary identity; a PAT is only a fallback. Reading public issues requires no authentication. Uses GitHub MCP server (`.copilot/mcp-config.json`, server `github`) or `gh api` fallback.

**Who triggers:** Any custom-agent role, Squad member, or the GitHub Copilot agent orchestrating a scenario. This is a cross-cutting responsibility for all team members.

See `.github/skills/meta-agentic-method/SKILL.md` § Upstream Template Feedback Loop for complete workflow and examples.

---

## General Working Conventions

### File Naming

- Use `kebab-case` for all filenames (lowercase, hyphens for spaces)
- Extensions: `.agent.md`, `.instructions.md`, `.prompt.md`, `.json` (hooks config)
- Skill folders: `kebab-case` directory containing `SKILL.md`

### Format Standards

- **Markdown** for all documentation and instruction files
- **YAML frontmatter** required for agents, skills, instructions, prompts
- **Single quotes** for YAML string values
- **Relative paths** for referencing bundled resources within skills

### Portability

- Artifacts MUST work across VS Code, Copilot CLI, and GitHub Copilot coding agent
- Test in multiple environments before publishing
- Use cross-platform scripts (Python, Node.js, PowerShell Core) when possible

### Documentation First

- Documentation is a first-class output, not an afterthought
- Prefer linking to existing docs over duplicating content
- Keep instructions concise and scannable — use tables, bullets, code blocks
- Update docs when dependencies, tools, or conventions change

### Version Control

- Use `.gitattributes` with `merge=union` for append-only files (`.squad/decisions.md`, `.squad/agents/*/history.md`, `.squad/log/**`)
- Commit artifacts alongside the code they support
- Keep instruction files synced with actual patterns in the codebase

## Do / Don't

### DO

- Follow the matching instruction guideline from `.github/instructions/` for your artifact type
- Respect squad decisions in `.squad/decisions.md`
- Use imperative mood in instructions ("Use", "Implement", "Avoid")
- Include concrete examples and code snippets
- Keep descriptions keyword-dense for discoverability
- Test artifacts in representative scenarios before publishing
- Split large skills (>200 lines) into `references/` subdirectories
- Document gotchas and non-obvious behavior
- Use progressive disclosure (load only what's needed)

### DON'T

- Duplicate guidance already in an instruction file (link instead)
- Bypass squad decisions without updating `.squad/decisions.md`
- Include information Copilot already knows from training data
- Use vague or ambiguous language in descriptions
- Hardcode credentials, secrets, or PII in any artifact
- Create overly rigid step-by-step instructions for open-ended tasks
- Exceed character/line limits (instructions: varies, skills: 500 lines max)
- Use ambiguous terms like "should", "might", "possibly"
- Publish without testing in target environments

## Quality Standards

### For All Artifacts

- Clear, specific, actionable guidance
- Focused scope (one artifact, one purpose)
- Complete frontmatter with accurate metadata
- No contradictory or outdated information
- Tested with representative use cases
- Self-contained where possible, linked where appropriate

### For Skills Specifically

- Description triggers automatic loading when relevant
- Gotchas prevent common mistakes proactively
- Bundled scripts are cross-platform and include `--help`
- Resources use relative paths
- Context budget respected (concise descriptions)

### For Agents Specifically

- Tools restricted to minimum necessary (principle of least privilege)
- Role and constraints clearly defined
- Sub-agent orchestration uses explicit prompts with minimal context
- Variables clearly documented and validated

### For Instructions Specifically

- `applyTo` glob pattern accurately targets intended files
- Examples demonstrate recommended and anti-patterns
- Altitude is right-sized (not over-specified, not under-specified)
- Content organized in scannable sections

### For Prompts Specifically

- Minimal tool set for the task
- Clear input validation and failure handling
- Output format and location explicitly defined
- Workflow steps cover preparation, execution, post-processing

---

**Version**: Follow the instructions in this file for all GitHub Copilot interactions within this repository. These conventions ensure consistent, high-quality artifacts that work reliably across environments.
