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
