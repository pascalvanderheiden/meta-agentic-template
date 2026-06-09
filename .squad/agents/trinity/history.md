# Trinity — History

## Core Context

- **Project:** A meta-cognitive template framework for building GitHub Copilot agentic capabilities across green-field, brownfield, and code modernization scenarios.
- **Role:** Template Engineer
- **Joined:** 2026-06-08T11:54:03.958Z

## Learnings

### 2026-06-09: Tier-2 UI Migration Tables & Test Results Field

Added optional UI migration mapping tables (component, route, state/service, middleware) to `assessment.template.md` for client-layer modernizations. Added `testResults` field to progress-report JSON contract for TDD pass rate, safety net coverage, and parity tracking across scenarios. Both additions generic and additive (no schema breaks).

### Screenshot Generation (2024-06-08)
Successfully generated status report screenshot using:
- **Tool**: Playwright for Node.js
- **Command**: `npx playwright install chromium` followed by custom Node script
- **Script Location**: `docs/scripts/generate-screenshot.js`
- **Output**: `docs/images/status-report.png` (379KB full-page screenshot)
- **Method**: Load HTML template via `file://` URL, wait 2 seconds for JS rendering, capture full page at 1400x1200 viewport

### README Structure (2024-06-08)
Created comprehensive README.md with:
- **Table of Contents**: 8 main sections with anchor links
- **Scenario Comparison Table**: Green-field vs brown-field vs modernization
- **Step-by-Step Walkthrough**: Oracle→Fabric ETL as worked example
- **Screenshot Integration**: Embedded status report with detailed explanation below
- **Confidence Scoring Breakdown**: 6 dimensions + weights + formula + color bands explained
- **Status Report Element Guide**: Header, gauge, dimensions, timeline, team, capabilities, MCP servers, risks
- **Extension Guide**: Adding skills/agents/instructions with tool references
- **Conventions**: Kebab-case, YAML frontmatter, portability standards
- **Links**: Internal relative paths to `.github/` files, external to official docs

**Key Decision**: Embedded screenshot first, explanation table immediately below (not vice versa) for visual-first comprehension.

### Dual Execution Approach (2024-06-08)
Expanded all three scenario prompts (green-field, brown-field, modernization) to offer TWO execution approaches:

**Approach A — Custom Agents:**
- Generate standalone `.github/agents/<role>.agent.md` files (one per role)
- User invokes agents individually or via `task` tool
- Best for linear workflows, simple handoffs

**Approach B — Squad Team:**
- Reuse existing Squad coordinator (`.github/agents/squad.agent.md`)
- Hire roles into `.squad/agents/<role>/charter.md` + update `.squad/team.md`
- Squad orchestrates handoffs, parallel execution, reviewer gates
- Pre-installed (no setup needed)
- Best for complex orchestration, parallel tasks

**Key Design:** Role roster defined ONCE during Team Formation. Both approaches use same roles, skills, instructions, MCP servers. Choice determines only storage/coordination mechanism.

**Changes:**
- Added "Execution approach" question to Intake phase (all 3 prompts)
- Expanded Team Formation phase with dual-approach section (all 3 prompts)
- Added "## Two Ways to Run" section to README with comparison table
- Updated step-by-step example to include approach choice
- Kept prompts consistent in wording and structure

**Rationale:** Squad system already exists in repo but was undocumented in prompts. Users needed choice between direct control (Custom Agents) and orchestrated coordination (Squad) based on workflow complexity.

### 2024-01-15: Progress Report Data Contract

Built self-contained HTML progress report template for multi-phase meta-agentic workflows. Core pattern: **data island updates**.

**JSON Data Contract**:
- Top level: `scenario`, `promptType`, `generatedAt`, `currentPhase`
- Confidence: `overallConfidence.score` (0–100), `confidenceDimensions[]` with `name`, `score`, `weight`
- Phases: `phases[]` with `name`, `status` (pending/in-progress/done/blocked), `artifact` path
- Team: `team[]` agents with `name`, `role`, `skills[]`, `instructions[]`, `mcpServers[]`
- Capabilities: `capabilities[]` with `capability`, `status` (found/built/reused/missing), `evidence`
- MCP: `mcpServers[]` with `name`, `source`, `connectionStatus`
- Risks: `risks[]` with `severity`, `description`

**Data Island Update Pattern**:
1. Embed JSON in `<script id="report-data" type="application/json">{...}</script>`
2. Page JS reads JSON on load and renders all sections
3. To update: rewrite JSON block + timestamp, save file
4. No HTML/CSS/JS changes needed — deterministic rerenders

**Key design**: Single self-contained HTML (inline CSS/JS, no CDN), offline-functional, professional GitHub styling. Confidence dimensions sourced from Oracle's rubric in `../shared/meta-agentic-method.md`.

Location: `.github/prompts/templates/progress-report.template.html` + README.md

### 2024-06-08: Progress Report Skill Migration

Restructured progress-report capability from loose files in `.github/prompts/templates/` into proper Agent Skill at `.github/skills/progress-report/`.

**New structure**:
- `SKILL.md` — Full specification following `agent-skills.instructions.md` (frontmatter with `name` + `description`, when to use, update protocol, JSON contract, examples, gotchas, references)
- `progress-report.template.html` — Bundled template (moved with `git mv` to preserve history)

**JSON contract home**: Now documented in `SKILL.md` with full schema, field descriptions, minimal/full examples, and strict validation rules (ISO 8601 timestamps, dimension weights sum to 1.0, status enums).

**Key improvements**:
- Progressive disclosure: SKILL.md loads only when relevant to user's request
- Portable across VS Code, Copilot CLI, GitHub Copilot coding agent
- References Oracle's confidence rubric at `../meta-agentic-method/SKILL.md` (created by Oracle in parallel)
- Removed old `.github/prompts/templates/` directory (empty after migration)

## Learnings

**2025-01-XX — SDD Spec Templates**

Created 13 structured templates for Spec-Driven Development methodology artifacts in `.github/skills/meta-agentic-method/templates/`:

- **Location**: `.github/skills/meta-agentic-method/templates/` (bundled resources of method skill)
- **Scenario ordered sets**:
  - Green-field: constitution(opt), 00-intake, 01-analysis, 03-capability-map, 04-team, plan, tasks, verification, summary, checklist
  - Brown-field: +02-discovery (after intake, before analysis)
  - Modernization: +02-discovery, 03-assessment (analysis → 04, capability-map → 05, team → 06)
- **Dynamic marker convention**:
  - `[PLACEHOLDER]` tokens for fill-in values
  - `<!-- GENERATED: ... -->` markers for scenario-generated sections (team roster rows, capability rows, domain sections)
  - Each template header specifies which parts fixed vs. generated
- **Cross-referencing**: All templates link sibling artifacts by output filename
- **Numbering**: Aligned with SKILL.md artifact numbering convention (no collision, discovery stays 02 across brown/modernization)

Templates mirror spec-kit's clean fill-in style (headings, placeholders, gate/checklist sections) but adapted to our SDD phases, artifact numbering, and 6-dimension confidence rubric.

**2026-06-09 — Repo-Wiki Templates**

Created two repo-wiki templates for brown-field Discovery and modernization Assessment/Discovery:

- `.github/skills/meta-agentic-method/templates/discovery-wiki.template.md` — token-mindful distilled source-of-truth wiki for existing source codebases.
- `.github/skills/meta-agentic-method/templates/wiki-index.template.json` — machine-readable retrieval index for modules, dependencies, entrypoints, integrations, flows, and risk hotspots.


### 2026-06-09: Repo-Wiki Page Templates

Created bundled templates for the new `repo-wiki` skill under `.github/skills/repo-wiki/templates/`:

- `index.md.template` — content catalog for overview, modules/components, concepts, risks, and sources.
- `log.md.template` — append-only chronological log with parseable `## [date] action | title` headings.
- `module-page.template.md` — token-mindful module/component page with source links, APIs, dependencies, flows, risks, cross-references, and source list.
- `README.md` — local index for the three templates.

Pattern matched existing meta-agentic templates: top HTML-comment usage notes, `[PLACEHOLDER]` tokens, and `<!-- GENERATED: ... -->` dynamic markers.

### 2026-06-09: Angular→React Modernization Testing Gap Analysis

Pre-flight validation for frontend framework migration revealed **UI/behavioral parity gap** in template. Testing strategy is data/API-centric — no guidance for reusing existing Playwright E2E suites as cross-framework parity oracle (highest-value insight). Progress report lacks `testResults` field for parity score visualization. Unit tests aren't acknowledged as non-portable (must re-author) while E2E is the durable parity harness.

### 2026-06-XX: Parity Oracle Guidance (Item #1a)

Added generic "reuse existing test suite as parity oracle" guidance to `testing-strategy.md` Modernization section. Covers: behavioral/E2E suite reuse across stacks, durable (E2E/contract) vs throwaway (unit) split, baseline-first principle. Applies to ANY modernization (UI, DB, ETL, services), not scenario-specific.

### 2026-06-09: Execution Lead Documentation + README Rewrite

**Task:** Document the explicit execution-lead contract in `team.template.md` and rewrite README for clarity.

**Changes:**
1. **`team.template.md`** — Added `## Execution Lead` section after `## Reviewer Assignment`:
   - Documents Approach A (Custom Agents) lead: `.github/agents/orchestrator.agent.md` (generic Orchestrator)
   - Documents Approach B (Squad) lead: `.github/agents/squad.agent.md` (Squad coordinator)
   - Lists lead responsibilities: invoke in handoff order, enforce strict reviewer gate (original author cannot revise own rejected work), run SDD framework implement loop if chosen, maintain execution-log.md, report completion
   - Defines lead-specific contracts: what each lead reads, how it invokes agents, reviewer-rejection enforcement
   - Links SDD framework integration to `references/sdd-frameworks.md`
   - Preserves template placeholder/comment style (`[PLACEHOLDER]`, `<!-- GENERATED: ... -->`)

2. **`README.md`** — Rewrote usage instructions for clarity and conciseness:
   - Added `## Quick Start Guide` with numbered steps: choose scenario → run prompt → answer Intake → team formation/execution → review report
   - Added `## Example Prompts` section with concrete green-field, brown-field, and modernization examples (generic/illustrative, not domain-locked)
   - Restructured `## How It Works` to emphasize the execution lead's role (Phase 8) and clarify execution-lead responsibilities
   - Simplified execution approach table, removed redundant examples
   - Verified all factual claims: green-field → OpenSpec default, brown-field → None default, modernization → Spec-Kit default (confirmed in grep results)
   - Preserved existing content: badges, optional-install section, repo structure, extending guide, conventions

**Key Decision:** Placed `## Execution Lead` after `## Reviewer Assignment` in template because the reviewer is assigned BEFORE execution begins, and the lead enforces the reviewer gate DURING execution — logical sequence.

**Verification:**
- Example prompts cover all three scenarios with realistic, scenario-agnostic use cases
- SDD framework defaults match those in `.github/skills/meta-agentic-method/SKILL.md` and prompts
- README structure is scannable: Quick Start → Examples → Execution Approaches → How It Works → Optional Frameworks
- No file paths or agent names hardcoded in examples (generic roles only)

## 2026-06-09: Orchestration Log + Session Log Consolidation

Scribe created orchestration logs for each agent, session log for execution-handoff-redesign batch, merged decision inbox to decisions.md, updated cross-agent history records. All deliverables staged for git commit.

### 2026-06-09: Human Checkpoint in README Step 4

**Task:** Update README Step 4 to reflect mandatory human checkpoint after planning-doc generation and before execution starts.

**Changes:**
- Renamed "### Step 4 — Execute by Team" to "### Step 4 — Review & Execute"
- Added lead-in paragraph: workflow generates planning artifacts (intake, analysis/discovery, capability map, team, plan, tasks) and PAUSES for human review before execution lead is invoked
- Reframed `@orchestrator execute the plan` / `@squad execute the plan` as explicit approval signal AFTER reviewing docs
- Updated Mermaid S4 box text: "Step 4: Review & Execute<br/>Review planning docs, then<br/>approve to start execution"
- Clarified execution lead drives remaining phases (Execution → Verification → Handoff), not full 10-phase workflow (Intake → Team Formation already completed at pause point)

**Rationale:** Prompts being updated in parallel to pause after team formation. README prose must match: reviewing the generated docs and issuing the execute command IS the approval.

**Key Learning:** Small edit, high clarity gain. Pause point explicit, approval mechanism explicit, no contradiction with prompts.

## 2026-06-09: CLI Skills + README Fix

**Task:** Create 3 CLI wrapper skills for Copilot CLI parity, rewrite README into 3-step structure, fix APM install list.

**Files Created:**
- `.github/skills/green-field/SKILL.md` — Thin wrapper delegating to `.github/prompts/green-field.prompt.md`
- `.github/skills/brown-field/SKILL.md` — Thin wrapper delegating to `.github/prompts/brown-field.prompt.md`
- `.github/skills/modernization/SKILL.md` — Thin wrapper delegating to `.github/prompts/modernization.prompt.md`

**Pattern:** Each skill has YAML frontmatter (`name`, `description` adapted from prompt), body delegates to authoritative `.prompt.md` file (single source of truth), notes VS Code users can invoke via `/<scenario>` slash command. Descriptions distinguish: green-field = build new, brown-field = extend existing in-repo, modernization = migrate/modernize legacy side-by-side.

**README Restructure:**
- Removed FALSE claim `gh copilot prompt <scenario>` (command doesn't exist)
- Condensed into 3 generic steps:
  1. Get template (fork/clone for green; APM install for brown/mod)
  2. Run scenario (VS Code `/<scenario>` OR Copilot CLI ask naturally → triggers skill)
  3. Execute by team (Orchestrator for Custom Agents, Squad for Squad approach)
- Merged redundant "Run the Scenario Prompt" + "Example Prompts" into one concise block
- DELETED "## Extending the Template" section (lines ~191-215)
- UPDATED "## Repository Structure" table: `.github/agents/` now lists `squad.agent.md` + `orchestrator.agent.md`; `.github/skills/` now lists 3 new scenario skills

**APM Section Fixes:**
1. Added `orchestrator.agent.md` (Custom Agents execution lead)
2. Added 3 new scenario skills (`green-field`, `brown-field`, `modernization`) for CLI invocation
3. Added `find-skills` and `mcp-builder` (referenced by capability-acquisition phase in prompts)
4. Verified all 17 install paths exist via `ls -1` (all resolved)
5. Updated explanatory sentence: now mentions 3 scenario skills + find/mcp-builder

**Key Learnings:**
- Wrapper skills are GENERIC scenario entry-points (allowed per decisions.md meta-template principle)
- Skills trigger via description keywords → user asks naturally, Copilot CLI loads skill, skill reads prompt
- VS Code and CLI now share single source of truth (`.prompt.md`)
- APM install pulls scenario skills so CLI users get invocation parity without VS Code prompt files

### 2026-06-09: Human Checkpoint in README Step 4

**Task:** Update README Step 4 to reflect mandatory human checkpoint after planning-doc generation and before execution starts.

**Changes:**
- Renamed "### Step 4 — Execute by Team" to "### Step 4 — Review & Execute"
- Added lead-in paragraph: workflow generates planning artifacts (intake, analysis/discovery, capability map, team, plan, tasks) and PAUSES for human review before execution lead is invoked
- Reframed `@orchestrator execute the plan` / `@squad execute the plan` as explicit approval signal AFTER reviewing docs
- Updated Mermaid S4 box text: "Step 4: Review & Execute<br/>Review planning docs, then<br/>approve to start execution"
- Clarified execution lead drives remaining phases (Execution → Verification → Handoff), not full 10-phase workflow (Intake → Team Formation already completed at pause point)

**Rationale:** Prompts being updated in parallel to pause after team formation. README prose must match: reviewing the generated docs and issuing the execute command IS the approval.

**Key Learning:** Small edit, high clarity gain. Pause point explicit, approval mechanism explicit, no contradiction with prompts.
