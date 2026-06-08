# Oracle — History

## Core Context

- **Project:** A meta-cognitive template framework for building GitHub Copilot agentic capabilities across green-field, brownfield, and code modernization scenarios.
- **Role:** Knowledge Architect
- **Joined:** 2026-06-08T11:54:03.959Z

## Learnings

### 2026-06-08: Meta-Agentic Methodology Defined

**Phase Model:**
- Defined 10-phase SDD pipeline: Intake → Discovery/Assessment → Analysis → Capability Mapping → Capability Acquisition → Team Formation → Execution → Verification → Handoff
- Scenario-specific entry phases: green-field (Analysis), brown-field (Discovery), modernization (Assessment)
- Each phase produces spec artifact with explicit inputs, outputs, exit criteria

**Confidence Rubric:**
- 6-dimension weighted scoring: Capability Coverage (25%), MCP Availability (20%), Skill/Instruction Coverage (15%), Data/Domain Knowledge (15%), Spec Completeness (15%), Verification Status (10%)
- Bands: High (80-100, green), Medium (50-79, amber), Low (0-49, red)
- Worked example: Oracle→Fabric migration scored 82/100 (High)

**File Contract:**
- Methodology doc: `.github/prompts/shared/meta-agentic-method.md`
- Artifact folder: `docs/<scenario>-<slug>/`
- 10 core artifacts + ADRs
- Team Formation algorithm: domain → role → capability assignment → handoff protocol
- Capability Acquisition decision tree: Reuse → Find → Build (MCP/Skill/Instruction/Agent)

## Learnings

### 2026-01-16: Repository Structure and Artifact Guidelines

**Repository Overview**:
- Meta-agentic template: workspace for authoring GitHub Copilot artifacts (agents, skills, instructions, prompts, hooks)
- Orchestrates AI teams through Squad system
- All artifacts follow standardized guidelines for portability (VS Code, Copilot CLI, GitHub.com)

**Key Directories**:
- `.github/instructions/` — Authoring guidelines for each artifact type
- `.github/skills/` — Reusable agent skills (find-skills, mcp-builder, skill-creator)
- `.github/agents/` — Custom agents including Squad coordinator
- `.github/prompts/` — Scenario workflows (green-field, brown-field, modernization)
- `.github/hooks/` — Lifecycle event hooks
- `.squad/` — Squad team management and decisions

**Artifact → Guideline Mapping**:

| Artifact Type | Guideline File | Location Pattern | Key Requirements |
|---------------|----------------|------------------|------------------|
| Custom agents | `agents.instructions.md` | `**/*.agent.md` | YAML frontmatter (description, name, tools, model), clear role/responsibilities |
| Agent skills | `agent-skills.instructions.md` | `**/skills/**/SKILL.md` | YAML frontmatter (name, description with WHAT/WHEN/KEYWORDS), bundled resources |
| Custom instructions | `instructions.instructions.md` | `**/*.instructions.md` | YAML frontmatter (description, applyTo glob), context-aware coding standards |
| Prompt files | `prompt.instructions.md` | `**/*.prompt.md` | YAML frontmatter (description, agent, tools), structured workflow |
| Hooks | `hooks.instructions.md` | `.github/hooks/**` | JSON config + Bash/PowerShell scripts, safety guardrails |

**Standing Decision** (`.squad/decisions.md`):
All squad agents MUST leverage authoring instruction files when creating/editing artifacts. Self-enforced quality control.

**Scenario Prompts**:
- `green-field.prompt.md` → Building new systems from scratch
- `brown-field.prompt.md` → Extending/modifying existing codebases
- `modernization.prompt.md` → Platform migration or legacy modernization
- Shared resources: `meta-agentic-method.md`, `references.md`, templates

**Extension Paths**:
- Skills: Use `skill-creator`, create in `.github/skills/<name>/`
- Agents: Create `<name>.agent.md` in `.github/agents/`
- Instructions: Create `<topic>.instructions.md` in `.github/instructions/`
- Prompts: Create `<name>.prompt.md` in `.github/prompts/`
- Discovery: Use `find-skills` for ecosystem search, `mcp-builder` for OpenAPI→MCP

**Core Conventions**:
- Kebab-case filenames
- YAML frontmatter with single-quoted strings
- Relative paths for bundled resources
- Portability across VS Code/CLI/GitHub.com
- Documentation as first-class output
- Imperative mood instructions
- Context budget awareness (concise descriptions)

### 2026-06-08: Methodology Restructured as Skill

**Migration:**
- Converted `.github/prompts/shared/meta-agentic-method.md` + `references.md` into proper skill
- New location: `.github/skills/meta-agentic-method/SKILL.md` + `references.md`
- Old shared directory removed; `.github/` now holds only Copilot-native artifacts
- Skill follows `agent-skills.instructions.md` spec: frontmatter, progressive disclosure, bundled resources

**Skill Content:**
- 10-phase SDD pipeline (Intake → Handoff)
- Artifact numbering convention (base vs modernization)
- Team-formation algorithm (domain → role → capability → handoff)
- Capability-acquisition decision tree (Reuse → Find → Build)
- 6-dimension confidence rubric + worked example
- References catalog bundled as `references.md` in same folder
