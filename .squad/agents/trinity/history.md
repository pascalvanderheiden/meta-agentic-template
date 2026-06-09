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
