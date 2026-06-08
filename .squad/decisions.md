# Squad Decisions

## Active Decisions

### 2026-06-08: Repository Restructure — Move Methodology & Report Into Skills

**By:** Trinity (Template Engineer), Oracle (Knowledge Architect), Tank (Integration Dev)

**Decision:** Restructured `.github/` to consolidate Copilot artifacts:
- Progress report capability → `.github/skills/progress-report/` (SKILL.md + template)
- Methodology + references → `.github/skills/meta-agentic-method/` (SKILL.md + references.md)
- Removed `.github/prompts/shared/`, `.github/prompts/templates/`, `.github/prompts/references.md`
- Rewired all prompt file links + copilot-instructions.md to new skill paths
- Condensed README.md: 547 → 149 lines
- Added MIT LICENSE at repo root

**Rationale:** 
- `.github/` now holds only Copilot-native artifacts (agents, skills, instructions, prompts, hooks)
- Skills follow standing decision on artifact placement + authoring guidelines
- Cleaner structure, better discoverability, proper progressive loading
- No link breakage verified

**Verification:** 
- `.github/skills/progress-report/SKILL.md`, `.github/skills/progress-report/progress-report.template.html` exist
- `.github/skills/meta-agentic-method/SKILL.md`, `.github/skills/meta-agentic-method/references.md` exist
- No stale links in prompts or instructions (grep verified)
- New links confirmed operational

**Sub-decisions documented:**
- `trinity-report-skill.md` — Progress report skill conversion details
- `oracle-method-skill.md` — Methodology skill conversion + rationale
- `oracle-readme-condense.md` — README condensation (73% reduction)
- `tank-link-rewire.md` — Link rewiring + verification

### 2026-06-08: Project Standards Enforcement

**By:** Pascal van der Heiden (via Copilot)

**Decision:** All squad agents MUST leverage this project's authoring instruction files and project-conventions skill when creating/editing skills, agents, instructions, prompts, or hooks.

**Rationale:** This is a meta-agentic template repository whose purpose is producing high-quality Copilot artifacts. Agents must self-apply the repo's own standards on every relevant task.

**Instruction Files to Apply:**
- `agent-skills.instructions.md` → `**/skills/**/SKILL.md`
- `agents.instructions.md` → `**/*.agent.md`
- `instructions.instructions.md` → `**/*.instructions.md`
- `prompt.instructions.md` → `**/*.prompt.md`
- `hooks.instructions.md` → `.github/hooks/**, hooks/**`
- `caveman-mode.instructions.md` → `**` (when terse/low-token output requested)

**Implementation:** Standing rule #9 added to routing.md to enforce this in spawn prompts.

### 2026-01-16: Repository-Wide GitHub Copilot Instructions

**By:** Oracle (Knowledge Architect)

**Decision:** Created `.github/copilot-instructions.md` as the canonical repository-wide custom instructions file for GitHub Copilot.

**Impact:** Every Copilot interaction in this repository now has immediate context about repository purpose, structure, and artifact guidelines. Direct pointers to authoritative guidelines for each artifact type. Reinforces standing decision to follow `.github/instructions/*`.

### 2026-01-16: Canonical Artifact Numbering Convention

**By:** Oracle (Knowledge Architect)

**Decision:** Formalized artifact numbering convention in `.github/prompts/shared/meta-agentic-method.md` to resolve ambiguity flagged by Neo's reviewer gate.

**Numbering Rule:** Base scenarios (green-field, brown-field) use `00, 01, 02, 03, 04`. Modernization uses `00, 02, 03, 04, 05, 06` (semantic slot `01` intentionally unused to keep `02-discovery` aligned). No collisions; `03-assessment` only in modernization, `03-capability-map` only in base.

**Verification:** All three prompts internally consistent with convention. No prompt changes required.

### 2026-06-08: Meta-Agentic Methodology Standard

**By:** Oracle (Knowledge Architect)

**Decision:** Adopt Spec-Driven Development (SDD) phase model defined in `.github/prompts/shared/meta-agentic-method.md` as canonical methodology for all meta-agentic workflows.

**Core:** 10-phase pipeline, artifact contract (naming convention, 10 standard files per scenario), team formation algorithm, confidence rubric (6 dimensions, 0-100 score, High/Medium/Low bands).

**Enforcement:** All generated artifacts (agents, skills, instructions) comply with `.github/instructions/*.instructions.md` standards by construction.

### 2026-06-08: MCP Capability Gaps for Oracle → Fabric Migration

**By:** Tank (Integration Dev)

**Findings:** No first-party Oracle Database MCP server or Microsoft Fabric MCP server exists in public registries (searched MCP Registry, 300+ awesome-mcp-servers entries).

**Recommendation:** Use OpenAPI-driven MCP generation via mcp-builder skill. Path: Oracle ORDS OpenAPI → mcp-builder → oracle-ords-mcp; Fabric REST API OpenAPI → mcp-builder → fabric-api-mcp. Record as "built from X" in capability map. Consider contributing generated MCPs back to community.

### 2026-06-08: Progress Report JSON Contract

**By:** Trinity (Template Engineer)

**Decision:** Established deterministic JSON data contract for HTML progress reports emitted by scenario prompts.

**Schema:** 10 fields (scenario, promptType, generatedAt, currentPhase, overallConfidence, confidenceDimensions, phases, team, capabilities, mcpServers, risks). Prompts emit JSON; template visualizes. Protocol: copy template, rewrite JSON + timestamp after each phase, page auto-renders.

**Critical:** `confidenceDimensions` must match Oracle's rubric in method doc (Capability Coverage 25%, MCP Availability 20%, Skill/Instruction Coverage 15%, Data/Domain Knowledge 15%, Spec Completeness 15%, Verification Status 10%).

### 2026-06-08: Repository README and Status Report Screenshot

**By:** Trinity (Template Engineer)

**Decision:** Created `README.md` at repository root and generated `docs/images/status-report.png` screenshot.

**README:** Explains repository purpose, prerequisites, structure, scenario selection, step-by-step walkthrough (Oracle→Fabric ETL worked example), status report explanation with embedded screenshot, extension instructions.

**Screenshot:** Generated via Playwright (1400x1200 viewport, 379KB PNG). Reusable script: `docs/scripts/generate-screenshot.js` (Node.js). Can be re-run if template changes.

### 2026-06-08: Scenario-Specific SDD Prompt Files

**By:** Morpheus (Agent Designer)

**Decision:** Created three orchestration prompts (green-field.prompt.md, brown-field.prompt.md, modernization.prompt.md).

**Green-field:** New systems from scratch, enters SDD at Analysis.  
**Brown-field:** Extensions to existing codebases, enters SDD at Discovery, includes CompatibilityValidator agent.  
**Modernization:** Platform migrations, enters SDD at Assessment, emphasizes data parity & rollback planning.

**Shared:** All follow SDD methodology from method.md, include clarifying questions + 00-intake.md halt, custom agent team formation, MCP discovery→build path, skills/instructions acquisition, confidence scoring (6 dimensions per rubric), HTML report JSON contract.

**Status:** Green-field & brown-field ready; modernization blocked on artifact numbering fix (Neo review).

### 2026-06-08: Neo's Prompt Review Verdict — RE-REVIEW APPROVED

**By:** Neo (Reviewer Gate)

**Review Status:** ✅ **APPROVED**

**Context:** Initial review requested changes on artifact numbering. Oracle resolved by publishing canonical convention in `./shared/meta-agentic-method.md`. Trinity added dual execution approaches (Custom Agents vs Squad Team). Neo re-reviewed per gate protocol.

**Verification Findings:**

1. **Blocking Issue Resolved:** Modernization now uses correct slots (00,02,03,04,05,06) aligned with method doc. No contradictions.
2. **Dual Approach Consistent:** Custom Agents (Approach A) vs Squad Team (Approach B) identical wording across all three prompts.
3. **Core Criteria Pass:** Frontmatter, structure, clarifying questions, team formation, MCP discovery→build, skills/instructions, confidence rubric (6 dimensions), HTML report contract all verified.
4. **No New Issues:** All links valid, no rubric drift, artifact counts match phases, no contradictions introduced.

**Files Approved:**
- `.github/prompts/green-field.prompt.md` ✅
- `.github/prompts/brown-field.prompt.md` ✅
- `.github/prompts/modernization.prompt.md` ✅

**Recommendation:** APPROVE all three prompts for production. Ready for user invocation in VS Code, CLI, tutorials. No further changes required.

### 2026-06-08: Dual Execution Approach for Scenario Prompts

**By:** Trinity (Template Engineer)

**Decision:** Expanded all three scenario prompts (green-field, brown-field, modernization) and README to present two execution approaches as first-class, user-selectable options.

**Approach A — Custom Agents:** Generates standalone `.github/agents/<role>.agent.md` files; best for linear workflows, simple handoffs, direct control.

**Approach B — Squad Team:** Reuses Squad coordinator; roles hired into `.squad/agents/<role>/charter.md`; best for complex orchestration, parallel execution, reviewer gates; no installation needed.

**Design:** Same role roster, skills, instructions, MCP servers regardless of approach; execution approach determines only storage/coordination, not agent behavior.

**Changes:** Updated green-field.prompt.md, brown-field.prompt.md, modernization.prompt.md (added Execution Approach section to Team Formation); expanded README with comparison table and guidance; defaults to Squad for multi-agent scenarios.

**Impact:** Users can now choose execution approach based on workflow complexity; Squad system (pre-installed) is now documented and integrated.

### 2026-06-08: Repository Published — Public Template

**By:** Tank (Integration Dev)

**Status:** Completed

**Outcome:** Meta-agentic template repository initialized, committed (116 files, 23,742 insertions), and published as public template on GitHub.

**Repository:** https://github.com/pascalvanderheiden/meta-agentic-template  
**Commit SHA:** ae27c16  
**Template Status:** Enabled (supports "Use this template")

**Verification:** Gitignore compliance confirmed; sensitive files excluded; no tokens exposed; initial structure preserved; remote origin configured and verified.

**Purpose:** Enables community/teams to clone via template, model spec-driven development via scenario prompts, accelerate MCP discovery/generation, orchestrate teams with Squad system.

### 2026-06-08: Neo Review — Restructure Into Skills APPROVED

**By:** Neo (Reviewer Gate)

**Review Date:** 2026-06-08T14:44:21Z

**Request:** Verify repository restructure consolidating methodology, reports, templates into `.github/skills/` follows artifact standards and contains no regressions.

**Verdict:** ✅ **APPROVED**

**Standards Applied:**
- `.github/instructions/agent-skills.instructions.md`
- `.squad/decisions.md` (artifact placement, numbering convention, methodology standard)

**Key Findings:**

| Criterion | Status |
|-----------|--------|
| Skill frontmatter validity | ✅ PASS |
| Progressive disclosure | ✅ PASS |
| Bundled resources | ✅ PASS |
| Line count limits | ✅ PASS (490, 236 lines) |
| Link integrity | ✅ PASS (60+ verified) |
| No content regression | ✅ PASS |
| Vision fit (.github Copilot-native only) | ✅ PASS |

**Preserved Content:**
- Artifact numbering convention (SKILL.md lines 276-281)
- 6-dimension confidence rubric (lines 408-417, weights sum to 1.0)
- JSON data contract (10 fields, progress-report lines 46-105)
- Dual execution approach (all 3 prompts A/B)
- Team formation algorithm (lines 300-349)

**Recommendation:** Ready for production. No changes required. Restructure achieves goal of Copilot-native `.github/` structure with all content preserved and all links verified.

**Orchestration Log:** `.squad/orchestration-log/2026-06-08T14:44:21Z-neo.md`

### 2026-06-08T22:01:00Z: User Directive — Upstream Template Feedback Loop

**By:** Pascal van der Heiden (via Copilot)

**What:** Build a feedback loop into the template. When a repo created FROM this template runs a scenario (green/brown/modernization) and discovers that the template itself needs a change/optimization/improvement, a Squad member OR the GitHub Copilot agent invokes the bundled `github-issues` skill to file a GitHub issue in the UPSTREAM template repo (`pascalvanderheiden/meta-agentic-template`) so the template can be improved from real user feedback.

**How (design):**
- Transport: GitHub MCP server (remote hosted `https://api.githubcopilot.com/mcp/`, `type: http`; local Docker `ghcr.io/github/github-mcp-server` as fallback)
- Upstream target repo constant: `pascalvanderheiden/meta-agentic-template` (forks override this)
- Standard label: `template-feedback`
- Structured body: scenario, prompt, phase, capability gap, suggested improvement, confidence impact
- Convention lives in the `meta-agentic-method` skill so both custom-agent teams and the Squad team inherit it (dual-execution parity, consistent with existing Approach A / Approach B design and routing rule #9)

**Why:** User request — captured for team memory and template behavior.

### 2026-06-08: GitHub MCP Server Registration in Template

**By:** Tank (Integration Dev)

**Status:** Implemented

**Decision:** Ship GitHub-hosted remote MCP server as primary config in `.copilot/mcp-config.json` (not local Docker or npx).

**Config Details:**
- **Server name:** `github` (exact match for skill tool resolution)
- **Type:** `http`
- **URL:** `https://api.githubcopilot.com/mcp/`
- **Auth:** `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}` (placeholder, not a real token)
- **Fallback:** Local Docker `ghcr.io/github/github-mcp-server` (documented in `.github/skills/meta-agentic-method/references.md`)

**Rationale:**
- Downstream repos get working GitHub integration immediately
- Remote HTTP is fast, portable, requires no local dependencies
- Supports read operations; `gh api` provides write operations (skill implementation detail)
- No secrets hardcoded; users supply PAT via environment variable

**Verification:**
- JSON syntax valid
- Server key `github` confirmed
- File NOT in .gitignore (ships with template)
- Placeholder token prevents accidental secret commits

**Orchestration Log:** `.squad/orchestration-log/2026-06-08T20:06:34Z-tank.md`

### 2026-06-08T22:30:00Z: Upstream Template Feedback Loop Convention

**By:** Oracle (Knowledge Architect)

**Status:** Approved — integrated into methodology, instructions, and all 3 prompts

**What:** Established a structured feedback loop for repos created from this template to report template-level improvements back to the upstream source.

**Why:** Real-world scenario execution surfaces gaps the template should address (missing capabilities, broken references, unclear instructions, friction that lowers confidence scores). Without a feedback mechanism, these learnings are lost. A structured loop enables continuous template improvement from user experience.

**How Implemented:**

1. **Methodology Documentation** (`.github/skills/meta-agentic-method/SKILL.md`):
   - Added § Upstream Template Feedback Loop with full workflow
   - Defined triggering conditions: capability gaps, broken references, unclear prompt steps, confidence-impacting friction
   - Specified who triggers: custom-agent roles, Squad members, GitHub Copilot agent (cross-cutting responsibility)
   - Documented structured issue body template (Scenario, Prompt, Phase, What was missing, Suggested improvement, Confidence impact with rubric dimension + point delta, Repro/context)
   - Mapped template gaps to 6-dimension confidence rubric for quantified prioritization
   - Provided worked example (missing Fabric MCP server in catalog)

2. **Repository Instructions** (`.github/copilot-instructions.md`):
   - Added § Template Feedback Loop subsection for quick reference
   - Documented upstream repo constant (`pascalvanderheiden/meta-agentic-template`) with fork override note
   - Specified transport (GitHub MCP server via `github-issues` skill, `gh api` fallback)

3. **Scenario Prompts** (all 3):
   - **Green-field** (`green-field.prompt.md`): Added Phase 9 (Template Feedback) after Handoff
   - **Brown-field** (`brown-field.prompt.md`): Added Phase 10 (Template Feedback) after Handoff
   - **Modernization** (`modernization.prompt.md`): Added Phase 11 (Template Feedback) after Handoff
   - Each phase instructs agents to review execution for template friction, file via `github-issues` skill with `template-feedback` label if gaps found

**Design Decisions:**
- **Label:** `template-feedback` (required for routing to template maintainers)
- **Upstream Repo Constant:** `pascalvanderheiden/meta-agentic-template` (forks override in their copilot-instructions.md)
- **Transport:** GitHub MCP server (`.copilot/mcp-config.json`, server `github`) with `gh api` fallback per `github-issues` skill
- **Issue Types:** `type=Bug` for broken references/errors, `type=Feature` for capability gaps/enhancements
- **Confidence Impact Required:** Must map gap to one of 6 rubric dimensions with estimated point delta; only significant gaps (>5 points) warrant filing
- **Cross-Cutting Responsibility:** Applies to custom-agent roles (Approach A), Squad members (Approach B), and the GitHub Copilot agent — ensures feedback regardless of execution path
- **Dual-Execution Parity:** Inherited by BOTH Approach A (custom agents) and Approach B (Squad team) — consistent with routing rule #9

**Verification:**
- All 5 files now mention `template-feedback`: method SKILL.md, copilot-instructions.md, green-field.prompt.md, brown-field.prompt.md, modernization.prompt.md
- Referenced paths validated: `github-issues` skill exists at `.github/skills/github-issues/SKILL.md`

**Impact:**
- Template maintainers receive structured, actionable, confidence-quantified feedback from real scenario executions
- Enables data-driven template improvements (prioritize by confidence impact)
- Closes the learning loop: template → derived repo → scenario execution → template improvement

**Orchestration Log:** `.squad/orchestration-log/2026-06-08T20:06:34Z-oracle.md`

### 2026-06-08T22:14:00Z: User Directive — Testing Strategy per Scenario + Playwright MCP + Auth Clarification

**By:** Pascal van der Heiden (via Copilot)

**Directive:**
1. Add Playwright MCP server to `.copilot/mcp-config.json` (`npx @playwright/mcp@latest`). Testing is first-class for the template.
2. Embed scenario-specific testing strategies into methodology + prompts:
   - **Green-field:** TDD + BDD (specs lock BEFORE coding); Frameworks: Playwright, Jest/JUnit
   - **Brown-field:** Safety Net (snapshot + characterization BEFORE altering); Frameworks: Approval Tests, BMAD, Playwright
   - **Modernization:** Backward Compatibility (API contract testing for parity); Frameworks: Pact, Schemathesis
3. Tie testing to confidence rubric (Verification Status dimension)
4. Auth clarification: Filing issues on public repos requires authentication, but NOT mandatory PAT — host OAuth (GitHub MCP / IDE sign-in) provides identity; PAT is fallback. Reading public issues needs no auth.

**Rationale:** User request — testing is a first-class success factor; testing-to-rubric tie improves decision-making clarity; auth docs had been misleading.

**Status:** Implemented by Tank + Oracle; Approved by Neo.

### 2026-06-08T20:24:53Z: Playwright MCP Server Integration + Testing Source Catalog

**By:** Tank (Integration Dev)

**Decision:** Added Playwright MCP server to `.copilot/mcp-config.json` alongside GitHub server. Created comprehensive testing source catalog in `.github/skills/meta-agentic-method/references.md` § 3 "Testing & MCP" with scenario-specific framework mapping.

**Rationale:**
- Playwright MCP enables AI-assisted E2E testing (browser automation, snapshots, accessibility checks)
- Testing frameworks map to scenarios (green-field: Playwright+Jest/JUnit+BDD; brown-field: Approval Tests+BMAD+Playwright; modernization: Pact+Schemathesis)
- Unified catalog enables prompts to discover testing sources during Capability Mapping phase

**Configuration:**
```json
{
  "mcpServers": {
    "github": { ... },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

**Testing Source Catalog (§ 3 in references.md):**
- Playwright MCP: https://github.com/microsoft/playwright-mcp
- E2E/UI: Playwright (https://playwright.dev)
- Unit: Jest (https://jestjs.io), JUnit (https://junit.org)
- BDD: Cucumber/Gherkin (https://cucumber.io)
- Snapshot/Approval: Approval Tests (https://approvaltests.com)
- AI-assisted refactoring: BMAD (https://github.com/bmad-code-org/BMAD-METHOD)
- API contract: Pact (https://pact.io), Schemathesis (https://schemathesis.readthedocs.io)

**Verification:**
- JSON syntax valid
- Both servers (`github`, `playwright`) registered
- All framework URLs present in references.md

**Impact:**
- Prompts can now discover testing MCP + frameworks during capability mapping
- Per-scenario testing frameworks explicitly documented
- GitHub auth confusion eliminated (OAuth primary, PAT fallback)

**Orchestration Log:** `.squad/orchestration-log/2026-06-08T20:24:53Z-tank.md`

### 2026-06-08T20:24:53Z: Testing Strategy Integrated as First-Class Methodology Component

**By:** Oracle (Knowledge Architect)

**Decision:** Integrated scenario-specific testing strategies into SDD methodology, tying to confidence rubric's Verification Status dimension (10%), with explicit phase placement:
- **Green-field Phase 6:** Testing Strategy Definition (TDD+BDD before coding)
- **Brown-field Phase 3:** Safety Net Establishment (snapshot+characterization before altering)
- **Modernization Phase 7:** Parity Testing Strategy Definition (golden datasets + API contract tests)

**Implementation:**
1. `.github/skills/meta-agentic-method/SKILL.md` — Added § Testing Strategy (scenario table, phase mapping, rubric linkage, tool availability, gotchas)
2. `.github/copilot-instructions.md` — Added § Testing Strategy (by Scenario) with concise strategy + Playwright MCP note
3. `.github/prompts/green-field.prompt.md` — Added Phase 6, renumbered 7-10
4. `.github/prompts/brown-field.prompt.md` — Added Phase 3, renumbered 4-11
5. `.github/prompts/modernization.prompt.md` — Added Phase 7, renumbered 8-12

**Auth Clarification Applied:** Corrected documentation in 4 locations to clarify OAuth (primary) vs. PAT (fallback) for public issue creation.

**Consequences:**
- **Positive:** Explicit testing guidance, TDD/safety nets prevent rework, parity prevents data loss, testing gaps lower confidence scores visibly
- **Negative:** Phase count increased (10-12 phases), cognitive load up; **Mitigation:** Each phase focused with clear exit gates

**Verification:**
- All testing keywords confirmed via grep across 5 files
- Framework references align with Tank's source catalog
- Phase numbering consistent (no collisions)
- Rubric linkage explicit (Verification Status 10% impact documented)

**Orchestration Log:** `.squad/orchestration-log/2026-06-08T20:24:53Z-oracle.md`

### 2026-06-08T20:24:53Z: Neo Review — Testing Strategy + Playwright MCP APPROVED

**By:** Neo (Reviewer-Gate)

**Requested:** Verify Testing Strategy integration + Playwright MCP + auth correction

**Verdict:** ✅ **APPROVED FOR PRODUCTION**

**Verification Summary:**

| Check | Status | Evidence |
|-------|--------|----------|
| mcp-config.json valid JSON | ✅ PASS | Python + jq |
| `github` server config correct | ✅ PASS | MCP tool prefix match |
| `playwright` server config canonical | ✅ PASS | `npx @playwright/mcp@latest` |
| Auth accuracy (no PAT-mandatory) | ✅ PASS | 4 locations verified |
| Testing phase placement | ✅ PASS | Green: before coding; Brown: before altering; Modernization: during migration |
| Framework alignment | ✅ PASS | Playwright, Jest/JUnit, Approval Tests, BMAD, Pact |
| Verification Status linkage | ✅ PASS | Explicit in SKILL.md |
| Dual-path parity | ✅ PASS | Both custom-agent + Squad inherit |
| Link integrity | ✅ PASS | 45+ relative links resolve |
| No regression | ✅ PASS | Rubric weights, artifact numbering preserved |

**Recommendation:** APPROVE for merge. Both features correctly implemented with valid configurations, accurate documentation, proper phase integration, cross-path consistency. No changes requested.

**Orchestration Log:** `.squad/orchestration-log/2026-06-08T20:24:53Z-neo.md`

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction

### 2026-06-08: SDD Spec Templates for Meta-Agentic Method

**Date**: 2026-06-08  
**Decider**: Trinity (Template Engineer)  
**Status**: Decided  
**Context**: Requested by Pascal van der Heiden

**Problem**: Meta-agentic-method skill needs structured templates for Spec-Driven Development artifacts that are scenario-fit (green-field, brown-field, modernization), produce consistent fill-in-the-blank outputs, and support dynamic generation from scenario inputs.

**Decision**: Created 13 role-named templates in `.github/skills/meta-agentic-method/templates/` (constitution, 00-intake, discovery, assessment, analysis, capability-map, team, plan, tasks, verification, summary, checklist, README index).

**Dynamic content convention**: `[PLACEHOLDER]` tokens for fixed fill-ins; `<!-- GENERATED: ... -->` markers for scenario-custom sections (team roster rows, capability rows). Each template header documents which parts fixed vs. generated.

**Scenario ordered sets**: Green-field (no discovery/assessment), brown-field (+discovery), modernization (+discovery+assessment) documented in index README; aligned with SKILL.md artifact numbering.

**Rationale**: Structured, repeatable artifact generation per scenario; dynamic team roster + capability map adapt to scenario analysis; all templates reference correct numbering per scenario path.

**Next Steps**: Oracle wires templates into green-field.prompt.md, brown-field.prompt.md, modernization.prompt.md; verify template cross-references resolve.

**References**: `.github/skills/meta-agentic-method/templates/`, SKILL.md § Artifact Numbering Convention, § Confidence Scoring Rubric, § Testing Strategy

---

### 2026-06-08: Spec Template Wiring into Methodology and Prompts

**By**: Oracle (Knowledge Architect)

**Context**: Trinity created 13 SDD spec templates as bundled resources. Wire templates into the methodology and 3 scenario prompts so each phase's output artifact scaffolds FROM its template.

**Decision**: 

1. **SKILL.md** — Added "Spec Templates" section explaining that each phase's Output Artifact is produced by copying matching template, filling placeholders, and generating dynamic rows per scenario. Includes per-scenario template-set table and Dynamic Rules documentation.

2. **Scenario Prompts** — Updated green-field, brown-field, modernization with per-phase instructions: "Scaffold from `../skills/meta-agentic-method/templates/<file>` → `docs/<scenario-<slug>/<output>.md`, fill placeholders, generate dynamic rows". Only included templates each scenario uses.

3. **copilot-instructions.md** — Added concise note: SDD artifacts scaffolded from `.github/skills/meta-agentic-method/templates/` with scenario-specific sets.

**Authoritative Template Sets**:
- Green-field: NO discovery, NO assessment
- Brown-field: +discovery, NO assessment
- Modernization: +discovery, +assessment

**Verification**: All 12 templates fully wired with correct scenario gating. Every common template referenced exactly once per prompt; discovery/assessment gated correctly.

**Status**: Complete. Ready for review.

---

### 2026-06-08: Neo Review — SDD Spec Templates System APPROVED

**By**: Neo (Lead / Reviewer-Gate)

**Requested**: Verify scenario fit, numbering, wiring completeness, dynamic+structured design

**Verdict**: ✅ **APPROVED FOR PRODUCTION**

| Criterion | Status | Notes |
|-----------|--------|-------|
| Scenario fit correctness | ✅ PASS | Green-field: no discovery/assessment; Brown-field: discovery only; Modernization: both. Matches user's explicit rule. |
| Numbering alignment | ✅ PASS | No collisions. `01` slot unused in modernization to keep `02-discovery` aligned. |
| Dynamic-but-structured | ✅ PASS | Fixed headings + `[PLACEHOLDER]` tokens + `<!-- GENERATED: ... -->` markers. Dynamic Rules documented. |
| Spec-kit inspiration | ✅ PASS | Clean fill-in style, gates/checklists present, adapted to SDD phases. |
| Wiring completeness | ✅ PASS | All 12 templates referenced; 10 common in all 3 prompts; relative paths resolve. |
| No regression | ✅ PASS | Dual-path preserved; SKILL.md enhanced; prompts enhanced. |

**Files Reviewed**: 13 templates, SKILL.md, 3 scenario prompts, instructions, copilot-instructions.md

**Recommendation**: APPROVE for merge. No changes required.

---

### 2026-06-08: User Directive — SDD Spec Templates per Scenario (Spec-Kit-Inspired)

**By**: Pascal van der Heiden (via Copilot)

**What**: Add Spec-Driven Development spec templates inspired by github/spec-kit templates (constitution/spec/plan/tasks/checklist). Templates must be scenario-fit (green-field does NOT need discovery; brown-field does; modernization needs discovery + assessment) and DYNAMIC (team + approach custom per scenario input) while still producing STRUCTURED output.

**Design (Decided)**:
- Home: `.github/skills/meta-agentic-method/templates/` (bundled resources of method skill)
- Role-named template files; each documents its per-scenario target output filename
- Per-scenario template sets aligned with Artifact Numbering Convention
- Dynamic + structured: fixed section skeletons + `[PLACEHOLDER]` tokens + `<!-- GENERATED: ... -->` markers
- Team roster rows, capability rows, included phases generated from scenario input; structure stays fixed
- Inherits into BOTH custom-agent and Squad paths via method skill

**Rationale**: User request — captured for team memory and template behavior.


---

### 2026-01-27: references.md Cleanup — Remove Domain-Specific Pollution

**By:** Tank (Integration Dev)

**Date:** 2026-01-27  
**Status:** Implemented  
**Scope:** `.github/skills/meta-agentic-method/references.md`

## Context

`references.md` was polluted with domain-specific entries (Oracle, Azure, Microsoft Fabric) from a sample scenario. This violated its purpose: a clean, concise, GENERIC catalog of sources for discovering agentic artifacts (skills, MCP servers, agents, instructions, libraries) to reuse in ANY project.

## Decision

Rewrote `references.md` from scratch with:

1. **Removed entirely:** All Oracle (Database, ORDS, GoldenGate, Integration), Azure, Microsoft Fabric entries, and any worked examples ("Oracle REST APIs → mcp-builder → Oracle MCP server").

2. **Restructured to 7 sections:**
   - **Skills** — Skills.sh, Awesome Copilot, Anthropic, Microsoft, Google Gemini Cookbook, Vercel, local find-skills
   - **MCP Servers** — GitHub MCP, Official Registry, reference servers, awesome-mcp-servers, GitHub MCP Server (with configs), Playwright MCP
   - **Custom Agents & Instructions** — Awesome Copilot, GitHub Copilot docs, VS Code customization
   - **Libraries & Frameworks** — Testing frameworks (Playwright, Jest, JUnit, Cucumber, Approval Tests, BMAD, Pact, Schemathesis) with concise scenario mapping
   - **Spec-Driven Development** — GitHub Spec-Kit, ADR
   - **Build to Bridge the Gap** (KEY ADDITION) — Rule: if no artifact found, BUILD it with mcp-builder/skill-creator; ties to confidence rubric
   - **How to Keep This Current** — Re-verify links, append generic sources only, keep concise, check periodically

3. **Verified Google reference:** https://github.com/google-gemini/cookbook (confirmed live).

4. **Validated cleanup:** Grepped case-insensitively for `oracle|fabric|azure` — zero matches except meta-commentary in "How to Keep Current".

## Rationale

- **Generic over domain-specific:** references.md guides discovery for ANY project, not just Oracle→Azure migrations.
- **Build to bridge the gap:** When discovery finds nothing, use meta-cognition skills (mcp-builder, skill-creator) to create the artifact. This prevents capability abandonment and ties to confidence rubric scoring.
- **Concise format:** Short entries, consistent structure, minimal prose for easy updates.

## Impact

- **Templates/prompts:** Clearer discovery paths; no misleading domain-specific examples.
- **Confidence rubric:** Explicit "build when missing" rule surfaces in MCP/Skill availability dimension.
- **Maintenance:** Easier to keep current without domain drift.

## Follow-Up

None — implementation complete, verified.

---

# Decision: Optional SDD Framework Selection

**Owner:** Oracle
**Date:** 2026-06-08
**Status:** APPROVED

## Decision

SDD framework is an **optional, orthogonal** scenario choice. Valid choices are **None** (default), **Spec-Kit**, **OpenSpec**, or **Superpowers**. The native 10-phase pipeline runs unchanged when **None** is selected.

## Rationale

Framework choice controls how specs and spec-workflow artifacts are produced and structured. Execution Approach remains a separate choice controlling who runs the work: Custom Agents or Squad Team. This preserves the template's native guided workflow for users who do not want framework lock-in while enabling framework-specific rigor for users who do.

## Implementation (Morpheus)

Wire optional SDD Framework choice into all scenario prompts next to Execution Approach during Intake. Per-scenario recommended defaults:
- `green-field.prompt.md` → OpenSpec
- `brown-field.prompt.md` → None (native pipeline)
- `modernization.prompt.md` → Spec-Kit

Each prompt records framework independently in `00-intake.md`, adds `#### SDD Framework (choose one from Intake)` section, and points Analysis/Capability Mapping to `.github/skills/meta-agentic-method/SKILL.md` § "SDD Framework Selection (Optional)".

## Consequences

- Scenario prompts MUST ask framework choice separately from Execution Approach.
- `None + Custom Agents`, `None + Squad`, `Spec-Kit + Squad`, `OpenSpec + Custom Agents`, and `Superpowers + Squad` are all valid.
- Brown-field still requires Discovery and modernization still requires Assessment regardless of framework.
- Missing or unaligned framework artifacts lower Confidence Rubric scores, especially Spec Completeness and Verification Status.

## Review

✅ APPROVED by Neo (Reviewer-Gate) on 2026-06-08T21:51:41Z
