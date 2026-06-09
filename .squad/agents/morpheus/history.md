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

## 2025-01-16T21:30:00Z — Wired scenario prompts + Squad to shared execution contract

**Task:** Update 3 scenario prompts and Squad coordinator to reference the shared execution method contract created by Oracle.

**Actions taken:**
- Updated Execution phases in `green-field.prompt.md` (Phase 7), `brown-field.prompt.md` (Phase 8), `modernization.prompt.md` (Phase 9):
  - Rewrote handoff step to point BOTH approaches (Orchestrator + Squad) to `execution-method.md`
  - Collapsed SDD-framework bullet into concise pointer to `execution-method.md` + `sdd-frameworks.md`
  - Added explicit mention of test-driven every slice, rubber-duck contra-model review, realtime HTML updates
  - Verified Execution-phase list numbering sequential (no gaps/duplicates)
- Updated Handoff phase HTML report step in all 3 prompts:
  - Noted report updated in realtime during execution
  - Added `testExecution` + `reviews` blocks to JSON example
  - Pointed to `progress-report/SKILL.md` for full schema
- Added "Scenario Execution Lead (Meta-Template)" section to `squad.agent.md` (placed before "Source of Truth Hierarchy"):
  - ~12 lines, link-based
  - Points to `execution-method.md` and `sdd-frameworks.md`
  - States None→Plan Mode (enrich in place) vs framework→strict loop (docs as source of truth)
  - Test-driven, rubber-duck contra-model (auto-opposite, additional beat, strict lockout), realtime HTML updates
  - Kept concise per instructions (no algorithm duplication)

**Decisions made:**
- Keep all wording consistent with execution-method.md terminology ("analyze docs", "branch on SDD framework", "None=Plan Mode enrich plan/tasks in place", "framework=strict native loop", "rubber-duck contra-model review", "realtime HTML progress report updates")
- Fixed list numbering after edits (green 5→6, brown 6→7, modernization 6→7→8)
- Squad section placed logically after Team Mode content, before internal governance sections

**Result:** All 3 prompts + Squad now consistently reference the shared execution contract. DRY maintained — details in `execution-method.md`, prompts/squad point to it.


---

**2026-06-09: Execution-Model Upgrade — Prompts Wired** — Wired all 3 scenario prompts + squad.agent.md to shared execution-method.md contract. See `.squad/orchestration-log/2026-06-09T19:13:41Z-morpheus.md`.

### 2026-06-09: Terminal Human Validation Gate — Hard Stop Before Execution

**Deliverables:**
- `.github/prompts/green-field.prompt.md` (Phase 7 step 4)
- `.github/prompts/brown-field.prompt.md` (Phase 8 step 5)
- `.github/prompts/modernization.prompt.md` (Phase 9 step 5)
- `.github/skills/meta-agentic-method/references/execution-method.md` (Entry/Invocation note)
- `.squad/decisions/inbox/morpheus-terminal-gate.md`

**Problem:**
Live testing revealed 🚦 Human Validation Gate said "WAIT for approval... Proceed to the next step ONLY once the user approves" but agents asked then immediately continued into handoff/execution within the same run. User requires a HARD TERMINAL STOP: planning run must END at gate and return control. Execution is ALWAYS a separate, user-initiated invocation where USER selects custom execution agent (`@orchestrator` or Squad) — assistant cannot select agent (human action in client).

**Changes Made:**
1. **Rewrote validation gate in all 3 prompts to be TERMINAL:**
   - Replaced "WAIT then continue" wording with explicit HARD STOP: "This is the end of the planning run. END YOUR TURN HERE. Do NOT invoke execution lead, do NOT select/materialize execution agent, do NOT perform any subsequent step/phase in this run."
   - Added explicit **"▶ Next action (yours)"** block telling user to start execution in SEPARATE new request by selecting execution agent themselves (`@orchestrator execute the plan` or Squad coordinator)
   - Made explicit: agent selection is human action, assistant cannot select custom agent on user's behalf
   - Preserved scenario-appropriate doc review lists
   - Revision loop still works (user re-runs planning to revise docs → gate re-presented)

2. **Inserted EXECUTION BOUNDARY divider after gate in all 3 prompts:**
   - `--- ⛔ EXECUTION BOUNDARY — everything below runs ONLY in separate, user-initiated execution invocation (after user selects execution agent). Planning run does NOT cross this line. ---`
   - Placed immediately after validation gate, before handoff step

3. **Reworded handoff step:**
   - Changed from "Hand off to execution lead:" to "Hand off to execution lead (execution invocation only):"
   - Made clear these steps performed by separately-invoked execution lead following `execution-method.md`

4. **Updated `execution-method.md`:**
   - Added "Entry / Invocation" note near top: contract executed in separate, user-initiated invocation that begins AFTER user reviews planning docs at gate and selects execution lead agent
   - Agent selection is human action; execution lead does not self-start from planning run
   - Planning prompt run ends at gate; execution is always distinct, subsequent invocation
   - Execution lead carries scenario through remaining phases using generated docs + contract

5. **Verified numbering:**
   - Kept ordered-list numbering strictly sequential in all 3 prompts after edits
   - Green-field: 1-6, Brown-field: 1-7, Modernization: 1-8

**Learning:**
There must ALWAYS be a break before execution. Planning = one run (ends at gate). Execution = separate run (starts when user selects agent). Gate is TERMINAL, not a wait-then-continue checkpoint. "▶ Next action (yours)" guidance shifts agency to user for agent selection — assistant presents gate then ends turn, does not assume approval or auto-select execution agent.

**Verification:** Planning prompt runs now cannot cross execution boundary. User must explicitly initiate execution in new request with agent selection.

### 2026-06-09: Terminal Human Validation Gate — Hard Stop Before Execution

**Deliverables:**
- `.github/prompts/green-field.prompt.md` (Phase 7 Execution, gate step 4)
- `.github/prompts/brown-field.prompt.md` (Phase 8 Execution, gate step 5)
- `.github/prompts/modernization.prompt.md` (Phase 9 Execution, gate step 5)
- `.github/skills/meta-agentic-method/references/execution-method.md` (Entry/Invocation note)

**Problem**: Live testing revealed gate said "WAIT for approval... Proceed" but agents asked then immediately continued into handoff/execution within same run. User requires HARD TERMINAL STOP: planning run must END at gate, return control. Execution ALWAYS separate, user-initiated where USER selects custom execution agent (not assistant-selected — human action in client).

**Solution**: (1) Made gate TERMINAL in all 3 prompts — explicit HARD STOP wording, "▶ Next action (yours)" directing user to start SEPARATE request, select agent themselves. (2) Inserted EXECUTION BOUNDARY divider after gate. (3) Reworded handoff step to "(execution invocation only)". (4) Updated execution-method.md Entry/Invocation note.

**Learnings**: Terminal gate prevents runaway automation. Planning = one run (ends at gate). Execution = separate run (starts when user selects agent). Agent selection is human action, not assistant-programmable. See `.squad/orchestration-log/2026-06-09T21:03:37Z-morpheus.md`.
