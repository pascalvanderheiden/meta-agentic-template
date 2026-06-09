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

### 2026-06-08: Upstream Template Feedback Loop Integrated

**Convention Established:**
- Repos created FROM this template can report template-level improvements back to upstream
- Any agent (custom-agent role, Squad member, or GitHub Copilot agent) files structured feedback when detecting template gaps

**Upstream Repo Constant:**
- Target: `pascalvanderheiden/meta-agentic-template`
- Forks override this in their `.github/copilot-instructions.md`

**Label & Transport:**
- Required label: `template-feedback`
- Transport: GitHub MCP server (`github` in `.copilot/mcp-config.json`) or `gh api` fallback
- Invokes bundled `github-issues` skill (`.github/skills/github-issues/SKILL.md`)

**Structured Issue Body:**
- Scenario (green/brown/modernization)
- Prompt file active
- Phase where gap surfaced
- What was missing / friction description
- Suggested improvement (actionable)
- Confidence impact: rubric dimension + estimated point delta (0-100 scale)
- Repro / context (artifact links, logs)

**Integration Points:**
- Added to `.github/skills/meta-agentic-method/SKILL.md` § Upstream Template Feedback Loop (full workflow + example)
- Added to `.github/copilot-instructions.md` § Template Feedback Loop (concise protocol)
- Added Phase 9 to `green-field.prompt.md` (after Handoff)
- Added Phase 10 to `brown-field.prompt.md` (after Handoff)
- Added Phase 11 to `modernization.prompt.md` (after Handoff)

**Confidence Impact Mapping:**
- Maps template gaps to 6-dimension rubric (Capability Coverage, MCP Availability, Skill/Instruction Coverage, Data/Domain Knowledge, Spec Completeness, Verification Status)
- Only significant gaps (>5 point impact) warrant filing
- Helps template maintainers prioritize improvements by quantified confidence delta

### 2026-06-08: Testing as First-Class Methodology Component

**Context:** Directive to integrate testing strategy into the meta-agentic methodology with scenario-specific approaches tied to confidence scoring.

**Learning:** Testing is NOT a final phase — it's woven into the SDD pipeline at scenario-specific entry points:
- **Green-field (TDD+BDD):** Tests authored BEFORE implementation (Phase 6: Testing Strategy Definition). BDD scenarios + failing unit tests lock specs, THEN code implements to green. Frameworks: Playwright (E2E/UI), Jest/JUnit (unit), Gherkin/Cucumber (BDD).
- **Brown-field (Safety Net):** Snapshot + characterization tests authored BEFORE altering code (Phase 3: Safety Net Establishment). Approval Tests lock current outputs, characterization tests document existing behavior, BMAD maps dependencies, Playwright captures UI baselines. Only modify code once safety net is green.
- **Modernization (Parity):** API contract + parity testing ensures modernized modules output EXACT same data as legacy (Phase 7: Parity Testing Strategy Definition). Golden datasets capture legacy outputs, contract tests compare legacy vs. modernized responses on identical inputs. Legacy system must remain operational during migration for comparison.

**Impact on Confidence Rubric:**
- **Verification Status (10%):** Direct link — 0 (no tests), 50 (manual), 100 (automated tests green + requirements traced).
- **Capability Coverage (25%):** Penalized if testing framework capabilities (Playwright MCP, Approval Tests, contract testing tools) missing.
- **Spec Completeness (15%):** Penalized if test specifications (BDD scenarios, characterization suites, parity datasets) incomplete.

**Auth Clarification Applied:** Filing issues on PUBLIC repos requires authentication (no anonymous issue creation), but does NOT require hand-made PATs — host OAuth (GitHub MCP / IDE sign-in) provides identity; PAT is fallback. Reading public issues requires no auth.

**Artifacts Updated:**
1. `.github/skills/meta-agentic-method/SKILL.md` — Added § Testing Strategy (65 lines: scenario table, phase integration, rubric link, tool availability, gotchas) + auth correction in § Upstream Template Feedback Loop
2. `.github/copilot-instructions.md` — Added § Testing Strategy (by Scenario) subsection (9 lines) + auth correction in § Template Feedback Loop
3. `.github/prompts/green-field.prompt.md` — Added Phase 6: Testing Strategy Definition (TDD+BDD before implementation), renumbered Execution→Verification→Handoff→Template Feedback to Phases 7-10
4. `.github/prompts/brown-field.prompt.md` — Added Phase 3: Safety Net Establishment (snapshot+characterization+BMAD BEFORE altering), renumbered Analysis→Capability Mapping→...→Template Feedback to Phases 4-11
5. `.github/prompts/modernization.prompt.md` — Added Phase 7: Parity Testing Strategy Definition (contract+parity tests with golden datasets), renumbered Team Formation→...→Template Feedback to Phases 8-12

**Verification:** Grep confirmed "Testing Strategy" in SKILL.md, copilot-instructions.md; "Testing Strategy Definition" in green-field.prompt.md; "Safety Net Establishment" in brown-field.prompt.md; "Parity Testing Strategy Definition" in modernization.prompt.md.

**Key Insight:** Testing drives spec-locking (green-field), regression prevention (brown-field), and migration validation (modernization). Weak testing lowers Verification Status AND cascades into Capability Coverage + Spec Completeness degradation — a 10% direct hit can trigger 20-30 point confidence drops via secondary rubric impacts.

### 2026-06-08: Spec Template Wiring (Complete)

**Context:** Trinity creating SDD spec templates (spec-kit-inspired) as bundled resources at `.github/skills/meta-agentic-method/templates/`. Templates provide fixed structure with dynamic content (team/capability rows, included phases) via `[PLACEHOLDER]` and `<!-- GENERATED -->` markers.

**Work Delivered:**
1. **SKILL.md** — Added "Spec Templates" section: explains artifact scaffolding from templates/, per-scenario template-set table, dynamic rules, explicit skip behavior (green-field skips discovery/assessment, brown-field adds discovery, modernization adds both), artifact numbering integration, links to templates/README.md.
2. **Scenario Prompts (Complete)** — Updated green-field, brown-field, modernization with one-line "Scaffold from..." instructions for all 12 templates at their correct phases. All common templates (00-intake, constitution, analysis, capability-map, team, plan, tasks, verification, summary, checklist) applied to all 3 prompts; scenario-specific templates (discovery, assessment) gated correctly.
3. **copilot-instructions.md** — Added concise note under "Shared resources" about SDD artifact scaffolding from templates/ with scenario-specific sets.

**Authoritative Template Sets (12 templates):**
- Green-field: constitution(opt), 00-intake, analysis→01, capability-map→03, team→04, plan, tasks, verification, summary, checklist (NO discovery, NO assessment)
- Brown-field: constitution(opt), 00-intake, discovery→02, analysis→01, capability-map→03, team→04, plan, tasks, verification, summary, checklist (discovery yes; assessment no)
- Modernization: constitution(opt), 00-intake, discovery→02, assessment→03, analysis→04, capability-map→05, team→06, plan, tasks, verification, summary, checklist (discovery + assessment)

**Verification (All Templates Wired):**
Common templates (all ≥1 in ALL three prompts): 00-intake(1,1,1), analysis(1,1,1), capability-map(1,1,1), team(1,1,1), constitution(1,1,1), plan(1,1,1), tasks(1,1,1), verification(1,1,1), summary(1,1,1), checklist(1,1,1) ✓

Scenario-specific (gated): discovery green(0)/brown(1)/modern(2) ✓; assessment green(0)/brown(0)/modern(1) ✓

**Status:** Complete. All 12 templates fully wired into all 3 prompts with correct scenario gating. Trinity's template creation can proceed in parallel; prompts ready to consume them.

### 2026-06-08: Optional SDD Framework Selection Added

**Verified framework URLs:**
- GitHub Spec-Kit: https://github.com/github/spec-kit and https://github.github.io/spec-kit/
- OpenSpec: https://github.com/Fission-AI/OpenSpec
- Superpowers: https://github.com/obra/superpowers

**Framework Analysis Summary:**
- **Spec-Kit:** Most prescriptive. Uses constitution → specify → clarify/checklist → plan → tasks → analyze → implement. It supersedes native Analysis/Execution structure where selected, while native Discovery, Assessment, Capability Mapping, Team Formation, Verification, and Handoff remain as scenario envelope and governance.
- **OpenSpec:** Lightweight, iterative, brownfield-first. Uses `openspec/specs/` for current behavior and `openspec/changes/<change>/` for proposals, delta specs, design, tasks, verify/sync/archive. It maps best to brown-field and modernization increments, augmenting Discovery/Assessment and replacing Execution structure with change-folder apply/archive flow.
- **Superpowers:** Composable process-skill methodology rather than a spec repository format. Uses brainstorming → writing-plans → TDD → subagent-driven or inline execution → review → branch finishing. It augments Intake/Analysis and strongly modifies Execution/Verification discipline.

**Methodology Update:** Added `.github/skills/meta-agentic-method/SKILL.md` section `## SDD Framework Selection (Optional)` immediately after the native 10-phase phase model and before `## Spec/Document Artifacts`. The section defines None as default, keeps SDD Framework orthogonal to Custom Agents vs Squad Team, maps each framework to the 10-phase pipeline, and provides per-scenario best-practice guidance for green-field, brown-field, and modernization.


### 2026-06-08: SDD Framework Recommended Defaults Refined

Added non-mandatory per-scenario framework advice: green-field defaults to OpenSpec, brown-field defaults to native None, and modernization defaults to Spec-Kit while preserving user freedom to choose any framework.

### 2026-06-09: Existing-Codebase Context Topology

**Decision Captured:** Existing-codebase scenarios use APM distribution plus repo-wiki ingestion so agents reason over token-bounded, indexed source context instead of raw code dumps.

**Repo-Wiki Loop:** Pack with a token-bounded source snapshotter, summarize into `templates/discovery-wiki.template.md`, index with `templates/wiki-index.template.json`, then reference raw files only on demand. Wiki drift lowers Data/Domain Knowledge, Spec Completeness, and Verification Status.

**Topology:** Green-field remains a template fork. Brown-field installs artifacts in-repo via APM and stores docs/specs/wiki beside the source. Modernization uses a side-car control repo with read-only legacy git submodule at `legacy/` plus generated repo-wiki as primary context.

**Files Updated:** `.github/skills/meta-agentic-method/SKILL.md`, `.github/copilot-instructions.md`, `.squad/decisions/inbox/oracle-existing-codebase-topology.md`.

### 2026-06-09: Meta-Agentic Method Skill Progressive Disclosure Refactor

**Context:** `meta-agentic-method/SKILL.md` had grown to 913 lines, exceeding skill progressive-disclosure guidance while being heavily referenced by section heading from prompts, templates, and instructions.

**New Layout:**
- `SKILL.md` is now a 203-line navigable spine with all existing `##` headings preserved.
- Detailed methodology content moved into `.github/skills/meta-agentic-method/references/` with `README.md` as folder index.
- Each heavy section keeps a concise summary plus `**Full detail:**` pointer.

**Sections Moved:**
- Phase Pipeline → `references/phase-pipeline.md`
- Source Context Ingestion + Repository Topology → `references/source-context-and-topology.md`
- SDD Framework Selection → `references/sdd-frameworks.md`
- Team Formation Algorithm → `references/team-formation.md`
- Capability Acquisition Decision Tree → `references/capability-acquisition.md`
- Confidence Scoring Rubric → `references/confidence-rubric.md`
- Testing Strategy → `references/testing-strategy.md`
- Upstream Template Feedback Loop → `references/feedback-loop.md`

**Verification:** `wc -l` confirms `SKILL.md` is 203 lines; unique `##` headings preserved; all `references/<file>.md` links resolve.

### 2026-06-09: Repo-Wiki Skill for Codebase Discovery

**Context:** Created a bundled `repo-wiki` skill implementing Andrej Karpathy's LLM-maintained wiki pattern for existing codebases during brown-field Discovery and modernization Discovery/Assessment.

### 2026-06-09: Angular→React Methodology Validation (Dry-Run)

**Validation Scope:** Assessed modernization prompt/templates against hypothetical Angular→ReactJS frontend migration (pascalvanderheiden/angular-realworld-example-app).

**Key Gaps Identified:** (1) Topology friction: side-car control repo + legacy submodule assumes target ≠ source location, but nested submodules (legacy contains backend submodule) require guidance. (2) Assessment/capability-map templates are ETL/data-biased; no sections for component-mapping tables, route parity, or state-management strategy for UI framework migrations. (3) Worked example is Oracle→Fabric ETL—no frontend migration example creates comprehension gap. (4) Spec-Kit default may over-prescribe for UI refactors; native or OpenSpec may fit better. (5) MCP Availability dimension (20%) is awkward for pure UI migrations with no backend MCP needs.

**Karpathy Mapping:**
- Raw sources = immutable source repository evidence, read on demand.
- Wiki = LLM-owned markdown under `docs/<scenario>-<slug>/wiki/`.
- Schema = `.github/skills/repo-wiki/SKILL.md` with conventions and workflows.

**Skill Contract:**
- `index.md` is the first-read content catalog and moderate-scale replacement for embedding-RAG.
- `log.md` is append-only with parseable `## [YYYY-MM-DD] ingest|query|lint | <title>` entries.
- Core workflows are Ingest, Query, and Lint, with token-mindfulness and file:line source citations.
- Drift lowers Data/Domain Knowledge, Spec Completeness, and Verification Status.

**Delegation:**
- `.github/skills/meta-agentic-method/SKILL.md` now delegates repo-wiki details to `../repo-wiki/SKILL.md`.
- `references/source-context-and-topology.md` now keeps scenario timing/topology only and points to repo-wiki as source of truth.
- Decision captured in `.squad/decisions/inbox/oracle-repo-wiki-skill.md`.

### 2026-06-09: Repo-Wiki Knowledge-Base Prep Validation (Source-Code Focus)

- **Validated:** SKILL.md Ingest workflow, index.md/log.md conventions, module-page.template.md, discovery-wiki.template.md, wiki-index.template.json, and modernization.prompt.md Phase 2/4.
- **Key Gaps:** (1) Packer guidance lacks frontend-specific exclusion rules (node_modules, .angular, dist, test fixtures, submodules). (2) Scoping model says "module/package/service/component" but gives no examples for frontend constructs (directives, pipes, guards, interceptors—these map awkwardly to modules/). (3) Template fields like "Public API / Entry Points" have `[Function/Class/Route/Event/CLI/Component]` but miss @Input/@Output, selectors, NG services, observable streams. (4) Phase 2 Action 4 references "bash to query databases (schema dumps)"—a data/ETL bias that doesn't apply to source-code-only Discovery. (5) Confidence drift table is generic but "Data/Domain Knowledge" and "Spec Completeness" dimensions still apply meaningfully.
- **Verdict:** Repo-wiki prep works for source-code Discovery with caveats: agents will infer frontend mappings, but missing concrete examples and packer exclusions increase friction and potential inconsistency.

## Learnings

### 2026-06-09: Repo-Wiki Generic Edits — Scope Vocabulary, Packer Exclusions, Submodule Handling

- **Implemented Tier-1 items:** (3) Replaced vague packer exclusion text in `.github/skills/repo-wiki/SKILL.md` Ingest step 2 with ecosystem-agnostic examples (dist/, build/, target/, .next/, .angular/, out/, node_modules/, vendor/, .venv/, __pycache__, *.egg-info, .cache/, coverage/, lock files, nested git submodules, large fixtures/snapshots, secrets, binaries). (4a) Broadened Ingest step 1 scope vocabulary to include UI/client/frontend constructs: component tree, presentation layer, client-state boundary, cross-cutting middleware (interceptors, guards, filters, pipes, decorators), upstream/consumed API surface. (4b) Added UI/client note to module-page.template.md Public API section: for UI modules, includes component selectors/identifiers, public inputs/outputs (props), injectable/shared services, and upstream APIs consumed.
- **Added topology note:** Folded git submodule exclusion guidance into `references/source-context-and-topology.md` modernization topology rules: if legacy source itself contains git submodules, exclude nested submodules from repo-wiki packing (they are dependencies, not the migration subject). Maintains side-car read-only stance; no in-repo branching for modernization.

### 2026-01-17: Tier-2 Item #10 — Concept-Page Template + Wiki-Index Entrypoint Enum

- **Created:** `.github/skills/repo-wiki/templates/concept-page.template.md` for `concepts/` pages, parallel to module-page. Includes frontmatter tokens, Category (domain term/API/schema/event/job/data-flow/invariant/contract), Related Modules, Evidence (file:line), Notes/Open Questions, Last reviewed.
- **Extended:** `.github/skills/meta-agentic-method/templates/wiki-index.template.json` entrypoints/type enum: added `Route` and `DeepLink` to existing CLI/API/UI/Worker/Event, for client/web coverage.

## Learnings

### 2026-01-16: Orchestrator Agent Creation for Custom Agents Execution Approach

**Context**: Created execution lead agent for Custom Agents approach to achieve parity with Squad coordinator.

**Key Learnings**:
- **Orchestrator pattern mirrors Squad coordinator**: Both drive execution via subagent invocation, but orchestrator reads team roster from `docs/<scenario>-<slug>/06-team.md` (or `04-team.md`) and invokes explicitly-defined role agents (`.github/agents/<role>.agent.md`), while Squad spawns agents from universes and manages via `.squad/agents/<agent-name>/`.
- **Reviewer lockout is portable**: The strict rejection protocol (original author may NOT revise rejected artifacts; a different agent must) applies to both Squad and Custom Agents workflows. This ensures independent revision and prevents self-justification loops.
- **SDD framework implement loops require explicit orchestration**: When an SDD framework (Spec-Kit, OpenSpec, Superpowers) is chosen, the execution lead must generate framework-native specs (in addition to `docs/` specs) and run the framework's implement loop (e.g., `/speckit.implement`, `/opsx:apply` + `/opsx:verify`, `subagent-driven-development`). This is the execution-native projection; `docs/` specs remain the single source of truth.
- **Generic agents read scenario artifacts at runtime**: The orchestrator is scenario-agnostic — it extracts scenario/slug from input, reads team roster and plan at runtime, and drives the handoff DAG dynamically. No domain specifics embedded.
- **Execution log is append-only traceability**: Every agent run logged with timestamps, artifacts, reviewer verdicts, and summaries. Enables auditing and debugging across multi-agent workflows.

**Implications**:
- The Custom Agents approach now has a dedicated execution lead, completing the dual-path design (Custom Agents + Squad).
- Scenario prompts can now offer both execution approaches with clear orchestration semantics for each.
- The orchestrator pattern is documented in `agents.instructions.md` as a reusable architectural pattern for multi-agent workflows.

## 2026-06-09: Orchestration Log + Session Log Consolidation

Scribe created orchestration logs for each agent, session log for execution-handoff-redesign batch, merged decision inbox to decisions.md, updated cross-agent history records. All deliverables staged for git commit.

## 2026-01-16: Execution Method Contract + Orchestrator Upgrade

**Context:** User upgraded execution model after human validation gate. Both Orchestrator (Custom Agents) and Squad must follow ONE shared, test-driven, contra-reviewed execution method.

**Tasks Completed:**
1. Created `.github/skills/meta-agentic-method/references/execution-method.md` — shared execution contract consumed by BOTH approaches:
   - Step 0: Analyze all generated docs (intake, analysis, discovery, assessment, capability-map, team, testing-strategy, plan, tasks, ADRs)
   - Step 1: Branch on SDD Framework (None → Plan Mode enrich plan.md/tasks.md in place, fallback writing-plans; Spec-Kit/OpenSpec/Superpowers → strict native loop)
   - Step 2: Per-slice loop — implement → mandatory tests (write+run) → rubber-duck contra-model review (auto-opposite pairing) → feed Reviewer gate (strict lockout) → record test + review results → update HTML report (progress + testExecution + reviews) → append execution-log.md
   - Step 3: Completion — map exit criteria, compute confidence (Verification reflects test pass rate + contra-model review ran), final report update
   - Includes model-pairing table (Claude ↔ GPT opposite for rubber-duck)
   - Scenario-agnostic, approach-agnostic, framework-agnostic

2. Updated `.github/agents/orchestrator.agent.md` (v1.0.0 → v2.0.0):
   - Wired to execution-method.md as governing contract
   - Added § 3: Analyze artifacts + Plan Mode enrich plan.md/tasks.md IN PLACE (None path), writing-plans fallback
   - Added § 5: Mandatory testing per slice (TDD/BDD/safety-net/parity per testing-strategy.md)
   - Added § 6: Rubber-duck contra-model review per slice (automatic opposite model pairing, findings feed Reviewer)
   - Added § 9: Realtime HTML report updates (testExecution + reviews arrays from Trinity)
   - Renumbered sections to maintain logical flow
   - Updated workflow steps to reference execution-method.md phases

3. Updated `.github/skills/meta-agentic-method/SKILL.md`:
   - Added Verification Status scoring note: reflects (a) test pass rate and (b) whether rubber-duck contra-model review ran per slice
   - Links to execution-method.md § Step 3.2 for full scoring guidance

**Design Decisions Encoded:**
- Two execution paths based on SDD Framework (None vs Spec-Kit/OpenSpec/Superpowers)
- Plan Mode enriches existing plan.md/tasks.md IN PLACE (not separate file)
- Testing mandatory every slice (no artifact "done" until tests written AND run)
- Rubber-duck contra-model review is ADDITIONAL beat that FEEDS existing reviewer gate (not replacement)
- Strict lockout on rejection (original author may NOT fix; different agent revises)
- Realtime HTML report updates with testExecution + reviews JSON keys (Trinity's work)
- docs/ specs lead, framework specs derived (both kept)
- Linked to sdd-frameworks.md rather than duplicating framework steps

**Files Created:**
- `.github/skills/meta-agentic-method/references/execution-method.md`

**Files Modified:**
- `.github/agents/orchestrator.agent.md` (v2.0.0)
- `.github/skills/meta-agentic-method/SKILL.md`

**Cross-References:**
- Links to sdd-frameworks.md for per-framework command detail
- Links to testing-strategy.md for TDD/BDD/safety-net/parity
- Links to confidence-rubric.md for Verification dimension scoring
- Report JSON keys: testExecution, reviews (Trinity added)

**Learnings:**
- Execution method must be DRY — single source, two consumers (Orchestrator + Squad)
- Contra-model review is process beat (rubber-duck agent type), not permanent team member
- Plan Mode enrichment is in-place edit (preserves file continuity), not separate artifact
- Verification dimension now dual-factor: test pass rate + review execution (both mandatory for 100 score)

---

**2026-06-09: Execution-Model Upgrade Completed** — Created `.github/skills/meta-agentic-method/references/execution-method.md` (shared contract); upgraded Orchestrator to v2.0.0. See `.squad/orchestration-log/2026-06-09T19:13:41Z-oracle.md` and `.squad/log/2026-06-09T19:13:41Z-execution-model-upgrade.md`.
