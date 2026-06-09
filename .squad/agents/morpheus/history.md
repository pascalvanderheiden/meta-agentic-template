# Morpheus — History

## Core Context

- **Project:** A meta-cognitive template framework for building GitHub Copilot agentic capabilities across green-field, brownfield, and code modernization scenarios.
- **Role:** Agent Designer
- **Joined:** 2026-06-08T11:54:03.957Z

## Learnings

### 2026-01-XX: Scenario-Specific SDD Prompts

**Deliverables:**
- `.github/prompts/green-field.prompt.md`
- `.github/prompts/brown-field.prompt.md`
- `.github/prompts/modernization.prompt.md`

**Prompt Skeleton:**
1. Frontmatter: description, name, agent, tools (least-privilege), argument-hint
2. Mission (1-2 sentences)
3. Scope & Preconditions (WHEN, preconditions, out-of-scope)
4. Inputs (${input:scenarioDetail:...}, optional context, fallback)
5. Workflow (SDD phases from meta-agentic-method.md)
6. Progressive Report Updates (after EACH phase)
7. Output Expectations (deliverables, artifact count, success indicators)
8. Quality Assurance / Validation (checklist)
9. Example Invocation (worked scenario)

**Scenario Differences:**
- Green-field: Entry at Analysis, 8 phases, focus on requirements + stack selection
- Brown-field: Entry at Discovery, 9 phases, focus on backward compat + baseline preservation
- Modernization: Entry at Assessment, 10 phases, focus on data parity + source/target MCP servers (build from OpenAPI when missing)

**MCP Gap Handling:**
Explicitly encoded: Oracle/Fabric lack first-party MCP servers → locate OpenAPI spec → invoke mcp-builder → generate MCP server → record as "built from <source>"

**Shared Structure:**
- All reference `./shared/meta-agentic-method.md` for SDD phases, team formation, capability acquisition, confidence rubric
- All generate HTML progress report with JSON contract (scenario, promptType, currentPhase, confidenceDimensions, team, capabilities, mcpServers)
- All follow repo authoring instructions for agents/skills/instructions (per standing decision)
- All use 6-dimension confidence rubric: Capability Coverage 25%, MCP Availability 20%, Skill/Instruction Coverage 15%, Data/Domain Knowledge 15%, Spec Completeness 15%, Verification Status 10%

<!-- Append learnings below -->

### 2026-06-08: Optional SDD Framework Choice in Scenario Prompts

Prompts now offer an optional, orthogonal SDD-framework choice during Intake. Per-scenario recommended defaults are green-field = OpenSpec, brown-field = None/native, and modernization = Spec-Kit. All three prompts wire the choice to `.github/skills/meta-agentic-method/SKILL.md` § "SDD Framework Selection (Optional)" while keeping Execution Approach independent.

### 2026-06-09: Repo-Wiki and Topology Wiring in Scenario Prompts

**Deliverables:**
- `.github/prompts/brown-field.prompt.md`
- `.github/prompts/modernization.prompt.md`
- `.github/prompts/green-field.prompt.md`
- `.squad/decisions/inbox/morpheus-repo-wiki-topology-prompts.md`

**Learning:**
Existing-codebase prompts must route source understanding through the repo-wiki. Brown-field works in-repo after APM install, while modernization uses a side-car control repo with read-only `legacy/` plus wiki as default context. Green-field remains a template fork and skips repo-wiki/APM-into-existing-repo steps.

### 2026-06-09: Repo-Wiki Skill Pointer in Scenario Prompts

**Deliverables:**
- `.github/prompts/brown-field.prompt.md`
- `.github/prompts/modernization.prompt.md`
- `.squad/decisions/inbox/morpheus-repo-wiki-skill-pointer.md`

**Learning:**
Brown-field Discovery and modernization Discovery/Assessment now point to bundled `../skills/repo-wiki/SKILL.md` as the authoritative Ingest → Query → Lint workflow and `index.md`/`log.md` convention source, while preserving existing meta-agentic-method wiki template artifact references. Green-field remains unchanged because repo-wiki applies only to existing-source scenarios.

## Learnings

### 2026-06-09: Generic Parity Testing, Discovery→Analysis Handoff, and Stack-Agnostic Discovery Tooling

**Deliverables:**
- `.github/prompts/modernization.prompt.md` (Items #1b, #5, #6)
- `.github/prompts/brown-field.prompt.md` (Item #5 only)
- `.squad/decisions/inbox/morpheus-prompt-generic-edits.md`

**Learning:**
Phase 7 (Parity Testing Strategy) now frames behavioral/E2E test suite reuse as the cross-stack parity oracle for ANY modernization (UI reskin, DB/ETL migration, service rewrite), not just data-output matching. Phase 4 (Analysis) explicitly consumes repo-wiki produced in Discovery via direct read + citation step. Phase 2 Action 4 tool list de-biased from data/ETL to cover any software-development modernization: grep/glob for source inventory, bash for stack-appropriate metadata (manifests, configs, API specs, and when relevant, database schemas), web_fetch for vendor docs.
