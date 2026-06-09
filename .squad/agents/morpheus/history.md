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

### 2026-06-09: Explicit Execution Handoff and Generic Modernization Roles

**Deliverables:**
- `.github/prompts/green-field.prompt.md` (Phase 5 Team Formation, Phase 7 Execution)
- `.github/prompts/brown-field.prompt.md` (Phase 7 Team Formation, Phase 8 Execution)
- `.github/prompts/modernization.prompt.md` (Phase 8 Team Formation, Phase 9 Execution, Phase 10 Verification, Phase 11 Handoff)
- `.squad/decisions/inbox/morpheus-execution-handoff.md`

**Learning:**
Team Formation Approach A now designates the shipped Orchestrator agent (`.github/agents/orchestrator.agent.md`) as execution lead after role agents are created. Approach B now hands roster to Squad coordinator, which hires via native flow (themed cast names, charter/history generation, team.md update, routing.md). Execution phases make handoff explicit: Approach A invokes Orchestrator (reads roster+plan/tasks, enforces reviewer gate with strict lockout, maintains execution-log.md); Approach B delegates to Squad coordinator (fan-out, reviewer gates, Scribe logging). Both approaches now generate SDD framework native specs when framework selected at Intake (Spec-Kit spec/plan/tasks; OpenSpec change proposal; Superpowers plan via writing-plans) and run framework implement loop (/speckit.implement; /opsx:apply + /opsx:verify; subagent-driven-development/executing-plans), referencing sdd-frameworks.md. Modernization Phase 8 de-biased: replaced hardcoded ETL roles with generic archetype-driven wording from team-formation.md (Discovery/Knowledge-Architect, Domain/Architecture Lead, Implementation/Component Migrator, Data/Schema Migrator, Integration/API, Test/Parity Engineer, Reviewer/Quality, DevOps/Release), with data migration as one illustrative example among many (web migration, API modernization, framework port). Phase 9/10/11 framed generically (parity metrics, cutover, rollback) for any software modernization scenario.

## 2026-06-09: Orchestration Log + Session Log Consolidation

Scribe created orchestration logs for each agent, session log for execution-handoff-redesign batch, merged decision inbox to decisions.md, updated cross-agent history records. All deliverables staged for git commit.

### 2026-06-09: Phase 1 Intake Hard Gate for Execution Approach & SDD Framework

**Deliverables:**
- `.github/prompts/green-field.prompt.md` (Phase 1, Action 3 + Action 7 + Exit Gate)
- `.github/prompts/brown-field.prompt.md` (Phase 1, Action 3 + Action 7 + Exit Gate)
- `.github/prompts/modernization.prompt.md` (Phase 1, Action 3 + Action 7 + Exit Gate)
- `.squad/decisions/inbox/morpheus-intake-hardgate.md`

**Learning:**
Phase 1 Intake soft clarification language permitted agents to silently assume defaults for **Execution Approach** (Custom Agents vs Squad Team) and **SDD Framework** (None/Spec-Kit/OpenSpec/Superpowers). Added emphatic **⚠️ MANDATORY** gate after the clarification bank: agent MUST present both questions and WAIT for user's explicit answer before proceeding — may recommend scenario default but cannot auto-select. Qualified "Document assumptions" clause (Action 7) to exclude these two (applies only to secondary clarifiers like target stack, constraints, non-functionals, scope). Strengthened each prompt's Exit Gate to require: "Execution Approach and SDD Framework are explicitly chosen by the user (not assumed)." Parallel wording applied to all three scenario prompts, preserving existing numbering/format conventions.

### 2026-06-09: Human Validation Gate Before Execution

**Deliverables:**
- `.github/prompts/green-field.prompt.md` (Phase 7 Execution — new step 4)
- `.github/prompts/brown-field.prompt.md` (Phase 8 Execution — new step 5)
- `.github/prompts/modernization.prompt.md` (Phase 9 Execution — new step 5)
- `.squad/decisions/inbox/morpheus-exec-validation-gate.md`

**Learning:**
Live testing revealed workflows scaffolded planning docs (plan.md, tasks.md, execution-log.md) then immediately handed off to execution lead and started building, with no user review opportunity. Inserted **🚦 Human Validation Gate (MANDATORY)** immediately after scaffolding and BEFORE hand-off-to-execution-lead step in all three Execution phases. Gate instructs agent to STOP, present enumerated list of generated planning docs (intake, discovery/assessment/analysis, capability-map, team, testing-strategy, plan, tasks, plus SDD-framework specs if chosen), ask user to review and approve in person, WAIT for explicit approval, and handle revision loops if user requests changes. Team materialization and implementation code only proceed after user approves. Renumbered subsequent steps cleanly in each prompt. Parallel wording across scenarios (green-field step 4→5, brown-field step 5→6, modernization step 5→6) mirrors existing Phase 1 hard-gate style. Scenario-agnostic; doc list adapted per prompt's artifact numbering conventions.

### 2026-06-09: Orchestration Log + Session Log Consolidation

Scribe created orchestration logs for each agent, session log for execution-handoff-redesign batch, merged decision inbox to decisions.md, staged all for git commit.
