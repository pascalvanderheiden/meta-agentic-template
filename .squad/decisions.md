# Squad Decisions

## Active Decisions

### 2026-06-09: Refactor Meta-Agentic Method Skill with Progressive Disclosure via References/

**By:** Oracle (Knowledge Architect), Neo (Quality Reviewer)  
**Requested by:** Pascal van der Heiden

**Context:**
`.github/skills/meta-agentic-method/SKILL.md` had grown to 913 lines, above the skill-authoring guideline target for progressive disclosure. The file is heavily cross-referenced by prompts, templates, and instructions using `SKILL.md § <Heading>` references, so section headings had to remain stable.

**Decision:**
Refactor `SKILL.md` into a lean navigable spine and move detailed methodology content into `.github/skills/meta-agentic-method/references/`.

The following detail files now hold the expanded content:
- `references/phase-pipeline.md` — 10-phase SDD pipeline detailed workflow
- `references/source-context-and-topology.md` — Codebase topology and context strategies
- `references/sdd-frameworks.md` — SDD framework options (Spec-Kit, OpenSpec, Superpowers)
- `references/team-formation.md` — Team assembly algorithm and role mapping
- `references/capability-acquisition.md` — Capability gap analysis & acquisition decision tree
- `references/confidence-rubric.md` — 6-dimension confidence scoring
- `references/testing-strategy.md` — Testing by scenario (green-field TDD/BDD, brown-field safety net, modernization parity)
- `references/feedback-loop.md` — Upstream template feedback loop workflow
- `references/README.md` — Index + navigation guide for references/

**Rationale:**
- Progressive disclosure: agents load a concise spine first, then pull detailed phase/framework/rubric/testing/feedback content only when needed.
- Improves context efficiency without breaking section-based cross-references from other artifacts.
- Preserves every `##` heading for existing SKILL.md cross-reference compatibility.

**Constraints Preserved:**
- Every existing `##` heading remains present in `SKILL.md` for cross-reference compatibility.
- Existing prompts, templates, and instructions were not edited.
- Detailed content was moved faithfully into reference files and summarized in place.
- Each shortened heavy section includes a `**Full detail:**` pointer to the matching reference file.

**Verification:**
- `SKILL.md` line count reduced from 913 to 203.
- Unique `##` heading set preserved: 19 old / 19 new, no missing headings.
- All `references/<file>.md` links in `SKILL.md` resolve to created files.
- Neo reviewed → APPROVED (content-faithful, no facts lost).

**Consequences:**
The meta-agentic method skill now follows progressive disclosure: agents load a concise spine first, then pull detailed phase/framework/rubric/testing/feedback content only when needed. This improves context efficiency without breaking section-based references from other artifacts.

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

---

### 2026-06-09: APM Distribution for Existing Repositories

**By:** Tank (Integration Dev)  
**Date:** 2026-06-09T07:13:52Z  
**Status:** ✅ COMPLETED

Add root `apm.yml` and README section so template can be installed additively into existing repositories through APM.

**APM Manifest declares:**
- `name: meta-agentic-template`, `version: 0.1.0`
- External APM dependency: `github/awesome-copilot/skills/github-issues`
- MCP dependencies: `io.github.github/github-mcp-server` (http), `microsoft/playwright-mcp`

**README § "Use on an Existing Codebase (APM)":**
- Install procedure: `apm install pascalvanderheiden/meta-agentic-template`
- Consumer bundle: prompts, skills, instructions, agents, MCP servers
- Additive/non-destructive approach

**Verification:** APM manifest valid; dependency forms verified; no link breakage.

**Orchestration Log:** `.squad/orchestration-log/2026-06-09T07:13:52Z-tank.md`

---

### 2026-06-09: Existing-Codebase Topology and Source Context Ingestion

**By:** Oracle (Knowledge Architect)  
**Date:** 2026-06-09T07:13:52Z  
**Status:** ✅ COMPLETED

Formalized existing-codebase repository topologies and source context ingestion methodology.

**Topology Decisions:**
- **Green-field:** Template fork (no APM, no repo-wiki)
- **Brown-field:** In-repo work; install artifacts via APM; generates token-bounded repo-wiki under `docs/<scenario>/wiki/`
- **Modernization:** Side-car control repo with read-only legacy submodule at `legacy/`; generates legacy + target wikis

**Source Context Ingestion (Repo-Wiki) Pattern:**
1. **Pack:** Token-bounded repomix/gitingest/code2prompt
2. **Summarize:** Generate `docs/<scenario>-<slug>/wiki/` via template
3. **Index:** `wiki-index.template.json` for machine-readable retrieval
4. **Reference on demand:** Wiki as default context; raw files only for precise checks

**Rationale:** Raw dumps are token-heavy, not indexable. Wiki gives agents compact architecture, module, dependency, flow, and risk context while preserving raw access.

**Confidence Impact:** Missing/incomplete/stale wiki lowers **Data/Domain Knowledge**, **Spec Completeness**, **Verification Status**.

**Methodology Updates:**
- `.github/skills/meta-agentic-method/SKILL.md` § "Source Context Ingestion (Repo-Wiki)"
- `.github/skills/meta-agentic-method/SKILL.md` § "Repository Topology by Scenario"

**Verification:** All section links valid; topology clearly differentiated; feedback loop preserved.

**Orchestration Log:** `.squad/orchestration-log/2026-06-09T07:13:52Z-oracle.md`

---

### 2026-06-09: Repo-Wiki Templates

**By:** Trinity (Template Engineer)  
**Date:** 2026-06-09T07:13:52Z  
**Status:** ✅ COMPLETED

Add two bundled repo-wiki templates under `.github/skills/meta-agentic-method/templates/`.

**`discovery-wiki.template.md`:**
- Distilled, token-mindful markdown wiki
- Sections: Architecture, Modules, Dependencies, Entrypoints, Flows, Integrations, Risks, Glossary
- Link-based (no raw code dumps)
- Output: `docs/<scenario>-<slug>/wiki/discovery-wiki.md`

**`wiki-index.template.json`:**
- Machine-readable retrieval index
- Metadata: modules, dependencies, entrypoints, integrations, flows, hotspots
- Supports targeted retrieval without loading full wiki
- Complements markdown with structural queries

**Templates Updated:**
- `.github/skills/meta-agentic-method/templates/README.md` with both templates and descriptions

**Verification:** Valid markdown + JSON; output paths consistent; named templates match Oracle topology references.

**Orchestration Log:** `.squad/orchestration-log/2026-06-09T07:13:52Z-trinity.md`

---

### 2026-06-09: Scenario Prompt Wiring to Repo-Wiki and Topology

**By:** Morpheus (Agent Designer)  
**Date:** 2026-06-09T07:13:52Z  
**Status:** ✅ COMPLETED

Wire scenario prompts to existing-codebase repo-wiki and topology without duplicating methodology.

**Brown-field (`brown-field.prompt.md`):**
- Intake note: "APM install into existing codebase"
- Discovery phase: "Generate repo-wiki under `docs/<scenario>-<slug>/wiki/` (Pack → Summarize → Index)"
- Wiki as default downstream context
- In-repo topology maintained

**Modernization (`modernization.prompt.md`):**
- Intake note: "Side-car control repo + read-only legacy submodule at `legacy/`"
- Assessment phase: "Generate/refresh legacy repo-wiki + target repo-wiki"
- Target ≠ source boundary emphasized
- Dual-repo topology maintained

**Green-field (`green-field.prompt.md`):**
- Explicitly excluded repo-wiki ingestion (template fork)
- Explicitly excluded APM-into-existing (no existing codebase)
- Template fork topology maintained

**Verification:**
- Topology explicit at intake
- Discovery/Assessment wired to wiki generation
- Cross-references valid (Tank APM, Oracle topology, Trinity templates)
- No regression to existing phase structure

**Orchestration Log:** `.squad/orchestration-log/2026-06-09T07:13:52Z-morpheus.md`

---

### 2026-06-09: Neo Review — Existing-Codebase Feature APPROVED

**By:** Neo (Reviewer-Gate)  
**Date:** 2026-06-09T07:13:52Z  
**Status:** ✅ APPROVED FOR PRODUCTION

**Verdict:** All four agents delivered complete, well-integrated contributions on existing-codebase support feature.

**Verification Summary:**

| Component | Criterion | Status | Evidence |
|-----------|-----------|--------|----------|
| **APM** | Manifest valid | ✅ PASS | YAML + dependencies verified |
| **APM** | Link integrity | ✅ PASS | All paths resolve |
| **Topology** | Three paths distinct | ✅ PASS | Green/Brown/Modernization clearly differentiated |
| **Topology** | Feedback preserved | ✅ PASS | Upstream loop unchanged; carried via APM |
| **Templates** | Markdown valid | ✅ PASS | `discovery-wiki.template.md` structure sound |
| **Templates** | JSON valid | ✅ PASS | `wiki-index.template.json` schema correct |
| **Prompts** | Wiring complete | ✅ PASS | Brown Discovery, Modernization Assessment both wired |
| **Prompts** | Regression check | ✅ PASS | Existing phases, numbering, team formation preserved |

**Key Strengths:**
1. Topology clarity: Green/brown/modernization paths unambiguous
2. Token efficiency: Indexed wiki prevents raw-dump bloat
3. Additive install: APM non-destructive for existing codebases
4. Template consistency: Fixed templates ensure repeatable quality
5. Prompt integration: Morpheus wiring tight and well-scoped

**Recommendation:** APPROVE for merge. No changes requested. Ready for production.

**Orchestration Log:** `.squad/orchestration-log/2026-06-09T07:13:52Z-neo.md`

---

### 2026-06-09: Oracle — Repo-Wiki Skill Implements Karpathy LLM-Wiki for Codebases

**By:** Oracle (Knowledge Architect)  
**Date:** 2026-06-09  
**Status:** ✅ APPROVED

**Context:**
Brown-field and modernization workflows need token-efficient source understanding during Discovery and Assessment. Raw source dumps are costly and do not accumulate durable understanding. Karpathy's LLM-maintained wiki pattern provides a persistent compiled layer between raw sources and agent reasoning.

**Decision:**
Create `.github/skills/repo-wiki/SKILL.md` as the authoritative schema for codebase repo-wikis implementing:
- Three layers: immutable raw sources, LLM-owned wiki, and schema-as-skill
- `docs/<scenario>-<slug>/wiki/` as the wiki root
- First-class `index.md` content catalog
- Append-only `log.md` with `## [YYYY-MM-DD] ingest|query|lint | <title>` prefix
- `wiki-index.json` generated from template
- Ingest, query, and lint workflows
- Token-mindfulness rules for linking instead of inlining source
- Confidence/drift ties to Data/Domain Knowledge, Spec Completeness, and Verification Status

**Delegation:**
`.github/skills/meta-agentic-method/SKILL.md` and `references/source-context-and-topology.md` now delegate repo-wiki workflow details to `../repo-wiki/SKILL.md`. The method skill keeps only the short summary and scenario topology guidance.

**Consequences:**
Repo-wiki becomes the source of truth for existing-codebase source ingestion. Future method updates must link to this skill rather than duplicating the ingest/query/lint workflow.

**Orchestration Log:** `.squad/orchestration-log/2026-06-09T10:35:00Z-oracle.md`

---

### 2026-06-09: Trinity — Repo-Wiki Page Templates

**By:** Trinity (Template Engineer)  
**Date:** 2026-06-09  
**Status:** ✅ APPROVED

**Context:**
The new bundled `repo-wiki` skill needs template resources for Karpathy-style LLM-maintained codebase wikis. Oracle is authoring the skill entrypoint separately, so this decision only covers bundled templates under `.github/skills/repo-wiki/templates/`.

**Decision:**
Create three fixed template files plus a local template README:
- `index.md.template` — Content catalog for wiki navigation and answer-first retrieval
- `log.md.template` — Append-only chronological activity log with parseable `## [date] action | title` headings
- `module-page.template.md` — Token-mindful module/component page linking to source and related wiki pages
- `README.md` — Short index of bundled templates

**Rationale:**
Templates follow the repository's established placeholder style: top HTML-comment usage notes, `[PLACEHOLDER]` tokens, and `<!-- GENERATED: ... -->` markers. They keep generated wiki content concise and source-linked, avoiding raw code dumps while still preserving evidence with `file:line` citations.

**Constraints:**
- Only files under `.github/skills/repo-wiki/templates/` created for the skill templates
- Existing SKILL.md, prompt, reference, root README, APM, and meta-agentic-method template files not edited

**Consequences:**
Oracle's `repo-wiki` skill can reference stable template filenames. Future wiki generation instantiates index, log, and module pages consistently across brown-field and modernization workflows.

**Orchestration Log:** `.squad/orchestration-log/2026-06-09T10:37:00Z-trinity.md`

---

### 2026-06-09: Tank — Repo Wiki Discoverability and APM Packaging

**By:** Tank (Integration Dev)  
**Date:** 2026-06-09  
**Status:** ✅ APPROVED

**Context:**
The template is adding a bundled `.github/skills/repo-wiki/` skill implementing Karpathy's LLM-maintained-wiki pattern for existing-codebase discovery and assessment. Tank's scope was discoverability and packaging only, not authoring the skill.

**Decision:**
Expose `repo-wiki` as a preferred built-in capability in packaging and discovery surfaces:
- Add Karpathy's LLM knowledge base / wiki pattern to `.github/skills/meta-agentic-method/references.md` as the verified basis for the bundled skill
- Add optional complementary references: `codebase-documenter` for human-readable onboarding docs and `qmd` for local markdown search at scale
- List `repo-wiki` in `apm.yml` comments as a bundled local primitive with no external dependency
- Add `.github/skills/repo-wiki` to the README APM install command for existing codebases

**Rationale:**
Existing-codebase workflows need a clear, preferred path for token-efficient context indexing. The repo-wiki skill is built into this template, so consumers should install it by path from this repo rather than adding a bogus external APM dependency.

**Verification:**
- References preserve the clean catalog style and mark verification status explicitly
- `apm.yml` declares no new external dependency for `repo-wiki`
- README APM command now includes the local `repo-wiki` skill path

**Orchestration Log:** `.squad/orchestration-log/2026-06-09T10:39:00Z-tank.md`

---

### 2026-06-09: Morpheus — Scenario Prompts Point to Bundled Repo-Wiki Skill

**By:** Morpheus (Agent Designer)  
**Date:** 2026-06-09  
**Status:** ✅ APPROVED

**Context:**
Brown-field and modernization prompts already generate repo-wiki artifacts during existing-source Discovery/Assessment. A bundled `repo-wiki` skill is the authoritative schema and workflow for repo-wiki generation.

**Decision:**
Add concise pointers in existing repo-wiki generation steps to follow `../skills/repo-wiki/SKILL.md` for the full Ingest → Query → Lint workflow and `index.md`/`log.md` wiki conventions.

**Prompt Updates:**
- `.github/prompts/brown-field.prompt.md`: Discovery wiki generation step now points to the bundled `repo-wiki` skill
- `.github/prompts/modernization.prompt.md`: Discovery wiki generation and Assessment wiki refresh steps now point to the bundled `repo-wiki` skill
- `.github/prompts/green-field.prompt.md`: unchanged; no existing source repo-wiki workflow

**Notes:**
Existing `discovery-wiki.template.md` and `wiki-index.template.json` references remain intact as produced artifacts. The relative path `../skills/repo-wiki/SKILL.md` resolves from `.github/prompts/` to `.github/skills/repo-wiki/SKILL.md`.

**Orchestration Log:** `.squad/orchestration-log/2026-06-09T10:41:00Z-morpheus.md`

---

### 2026-06-09: Neo — Repo-Wiki Skill Review APPROVED

**By:** Neo (Reviewer-Gate)  
**Date:** 2026-06-09  
**Status:** ✅ APPROVED FOR PRODUCTION

**Scope Reviewed:**
- `.github/skills/repo-wiki/SKILL.md`
- `.github/skills/repo-wiki/templates/{index.md.template, log.md.template, module-page.template.md, README.md}`
- `.github/skills/meta-agentic-method/SKILL.md` § Source Context Ingestion
- `.github/skills/meta-agentic-method/references/source-context-and-topology.md`
- `.github/skills/meta-agentic-method/references.md` (Karpathy/qmd/codebase-documenter entries)
- `.github/prompts/brown-field.prompt.md` (Discovery wiki step)
- `.github/prompts/modernization.prompt.md` (Discovery/Assessment wiki steps)
- `.github/instructions/agent-skills.instructions.md` (authoring standard)

**Contributors:** Oracle (SKILL.md + method delegation), Trinity (templates), Tank (references.md/apm.yml/README), Morpheus (prompt integration)

**Verdict:** ✅ APPROVED

**Findings Summary:**

| Criterion | Status | Notes |
|-----------|--------|-------|
| Karpathy-pattern fidelity | ✅ PASS | 3 layers, index.md first-read, log.md append-only w/ date prefix, ingest/query/lint workflows, wiki compounds |
| Skill conventions | ✅ PASS | Valid frontmatter, 177 lines, templates bundled, follows agent-skills.instructions.md |
| Delegation correctness | ✅ PASS | Method skill delegates workflow to repo-wiki, keeps only topology; no duplication |
| Cross-refs resolve | ✅ PASS | All relative links verified from each file's location |
| Additive & non-breaking | ✅ PASS | Green-field untouched, brown-field/modernization prompts integrate cleanly |

**Notes (non-blocking):**
- Consider adding `LICENSE.txt` to `.github/skills/repo-wiki/` (Apache 2.0 typical). Repository has root MIT license.
- `codebase-documenter` skill in references.md noted as complementary for human-readable onboarding docs.

**Blocking Issues:** None.

**Orchestration Log:** `.squad/orchestration-log/2026-06-09T10:43:00Z-neo.md`

### 2026-06-09: morpheus prompt generic edits

# Generic Parity Testing, Discovery→Analysis Handoff, Stack-Agnostic Discovery Tooling

**Date:** 2026-06-09  
**Agent:** Morpheus  
**Requested by:** Pascal van der Heiden

## Context

Validation probe was Angular→React, but ALL edits must be GENERIC / scenario-agnostic — never scenario-fixed. Three Tier-1 edits to prompt files to improve generic parity testing guidance, explicit wiki handoff, and de-bias discovery tooling.

## Decision

### Edit #1b: Phase 7 Parity Testing Strategy (modernization.prompt.md)

Added generic guidance in Phase 7 (Parity Testing Strategy Definition):

- **Parity Scope:** Parity is not limited to data-output matching
- When legacy system ships automated behavioral/E2E/acceptance test suite (Playwright, Cypress, Selenium, contract suites), REUSE as cross-stack parity oracle
- Run SAME test suite against legacy baseline and modernized target; pass/fail delta = quantifiable parity
- Behavioral/E2E tests assert observable behavior and are largely stack-agnostic
- End-to-end/contract tests are durable parity net; stack-specific unit tests usually don't port 1:1, are re-authored
- Framed for ANY modernization: UI reskin, DB/ETL migration, service rewrite (NOT only frontends)
- Added existing test suite reuse plan to Parity Test Plan deliverable

**Mirrors:** Wording added to `references/testing-strategy.md` by Trinity.

### Edit #5: Discovery→Analysis Handoff (modernization.prompt.md + brown-field.prompt.md)

Added explicit wiki-consuming action in Phase 4 (Analysis) for both prompts:

- **Action 3 (new):** "Read `docs/<scenario>-<slug>/wiki/index.md` (produced in Discovery); derive functional domains from module responsibilities; map capability requirements to wiki evidence (cite page/source paths); flag wiki gaps for follow-up ingest."
- Makes Discovery→Analysis handoff explicit via repo-wiki artifact
- Renumbered subsequent actions (scaffold analysis → becomes action 4)

### Edit #6: De-bias Discovery Tooling (modernization.prompt.md Phase 2 Action 4)

Generalized tool list in Phase 2 Action 4 from data/ETL-biased to any software-development modernization:

**Before:**
```markdown
4. Use tools:
   - `web_fetch` to retrieve vendor documentation (Oracle docs, Fabric docs)
   - `grep`/`glob` if codebase accessible
   - `bash` to query databases (schema dumps, row counts)
```

**After:**
```markdown
4. Use tools:
   - `grep`/`glob` to inventory source files and dependencies
   - `bash` to gather stack-appropriate system metadata: dependency/build manifests, configs, API/IDL specs, and (when relevant) database schemas or row counts
   - `web_fetch` to retrieve vendor/platform documentation
```

**Rationale:** Database migration IS software development — do NOT frame as "source-code vs database". Tool list now covers ANY software modernization scenario.

## Constraints

- **GENERIC ONLY:** No Angular/React/Oracle/Fabric-specific lock-in
- Existing Worked Example section left as-is (not edited)
- Additive changes; no removal of existing behavior

## Artifacts

- `.github/prompts/modernization.prompt.md` (Items #1b, #5, #6)
- `.github/prompts/brown-field.prompt.md` (Item #5 only)
- `.squad/agents/morpheus/history.md` (2-line learning appended)
- `.squad/decisions/inbox/morpheus-prompt-generic-edits.md` (this file)

## Impact

- Phase 7 now frames behavioral test suite reuse as the parity oracle for ANY modernization
- Phase 4 explicitly consumes repo-wiki from Discovery with cite-to-wiki-evidence requirement
- Phase 2 tool list covers full software-development spectrum (not just data/ETL)
- All three edits remain scenario-agnostic and portable


### 2026-06-09: neo tier12 review

# Neo Review: Tier-1 + Tier-2 Generic Improvements

**Reviewer:** Neo (Lead/Architect)  
**Date:** 2026-01-17  
**Status:** ✅ **APPROVED**

## Scope

10 scenario-agnostic improvements validated via Angular→React probe but containing NO scenario-fixed content.

## Files Reviewed

| # | File | Change Summary |
|---|------|----------------|
| 1 | `testing-strategy.md` | Parity oracle reuse + durable/throwaway split |
| 2 | `modernization.prompt.md` (Phases 2, 4, 7) | Discovery→Analysis handoff, de-biased tool list, parity testing |
| 3 | `brown-field.prompt.md` (Phase 4) | Wiki/index.md citation in Analysis |
| 4 | `capability-acquisition.md` | BUILD path [C] + GUARDRAIL (bespoke stays local) |
| 5 | `repo-wiki/SKILL.md` | Ecosystem-agnostic packer exclusions, UI/client scope vocab |
| 6 | `module-page.template.md` | UI/client Public API note |
| 7 | `source-context-and-topology.md` | Nested submodule exclusion, side-car read-only stance |
| 8 | `assessment.template.md` | Optional UI migration tables (gated markers) |
| 9 | `team-formation.md` | Generic role archetypes + execution-approach-agnostic note |
| 10 | `progress-report/SKILL.md` | Optional testResults field |
| 11 | `concept-page.template.md` (new) | Concepts/ page template with Category field |
| 12 | `wiki-index.template.json` | Route/DeepLink entrypoint enum extension |

## Review Criteria

### 1. Scenario-Agnostic ✅ PASS

- **No Angular/React/Oracle/Fabric mandates found.**
- Examples are clearly illustrative:
  - `testing-strategy.md` line 47: "Angular component tests, Oracle PL/SQL unit tests" listed as throwaway examples — not mandates
  - `assessment.template.md` lines 83-112: UI migration tables wrapped in `<!-- UI_MIGRATION ... -->` markers — optional, generic across frameworks
- Packer exclusions in `repo-wiki/SKILL.md` are ecosystem-agnostic (node_modules, .angular, .next, .venv, target, etc.)

### 2. Additive & Non-Breaking ✅ PASS

- No required sections/fields removed
- `testResults` is optional (null allowed for parityPercent)
- UI migration tables gated — delete when not applicable
- Cross-references resolve:
  - `wiki-index.template.json` entrypoints enum includes Route, DeepLink
  - `concept-page.template.md` cross-refs modules/ and concepts/
- JSON well-formed (validated wiki-index.template.json structure)

### 3. Honors Stored Decisions ✅ PASS

**Decision 1: Meta-template stays scenario-agnostic / no scenario-fixed skills**
- `capability-acquisition.md` lines 60-66: GUARDRAIL enforces bespoke artifacts stay in scenario repo
- Quote: "Bespoke, scenario-specific skills/MCPs/instructions/agents STAY in the scenario repository. They are NOT added to this meta-template"

**Decision 2: Topology = brown-field in-repo, modernization side-car read-only (no branching)**
- `source-context-and-topology.md` lines 26-27: Topology table shows brown-field = in-repo, modernization = side-car
- Line 34: "Pin modernization legacy source with a git submodule at `legacy/` ... Treat the submodule as read-only"
- No in-repo branching introduced for modernization

### 4. #8 Fits BOTH Execution Approaches ✅ PASS

`team-formation.md` lines 26-29 explicitly state:
> "The above archetypes are **execution-approach-agnostic**:
> - **Custom Agents approach**: Each archetype becomes a dedicated agent file (`.github/agents/<role-name>.agent.md`)
> - **Squad approach**: Each archetype maps to a Squad member/cast role on the team
> - Either way, the domain→role mapping is the same; only instantiation differs"

### 5. Consistency ✅ PASS

- **testing-strategy.md** (lines 40-43) and **modernization.prompt.md Phase 7** (lines 255-260) agree:
  - Both: "reuse it as the parity oracle"
  - Both: "Run the SAME suite against both legacy baseline and modernized target"
  - Both: "Behavioral/E2E tests assert observable behavior and are largely stack-agnostic"
  - Both: Durable (E2E/contract) vs throwaway (unit) test split

- No contradictions found between Trinity's testing-strategy.md wording and Morpheus's Phase 7 wording.

### 6. Quality ✅ PASS

- Concise, retrieval-friendly prose
- No placeholder cruft (all [PLACEHOLDER] tokens are template markers, not incomplete content)
- Valid markdown structure
- Valid JSON (wiki-index.template.json)

## Stored Decisions Verified

1. **2026-01-27 Tank/Oracle:** capability-acquisition BUILD path GUARDRAIL — bespoke artifacts stay local, only generic improvements flow upstream via template-feedback.
2. **2026-06-09 Oracle:** Topology rules — brown-field = in-repo, modernization = side-car read-only with `legacy/` submodule.

## Notes (Non-Blocking)

- **MCP Availability dimension (20%)** remains semantically awkward for pure UI migrations with no backend MCP needs. Consider future rubric refinement for UI-only scenarios.
- **LICENSE.txt** still missing from `repo-wiki/` skill folder (Apache 2.0 recommended per skill guidelines).

## Verdict

**✅ APPROVED FOR PRODUCTION**

All 10 improvements are scenario-agnostic, additive, consistent, and honor stored decisions. No blocking issues. Ready for merge.

---

**Cross-references:**
- History: `.squad/agents/neo/history.md` (2026-01-17 entry)
- Stored decisions: `.squad/decisions.md` (2026-01-27 references.md cleanup, 2026-06-09 topology)


### 2026-06-09: oracle concept template

# Decision: Repo-Wiki Concept-Page Template and Entrypoint Enum Extension

**Date:** 2026-01-17  
**Agent:** Oracle (Knowledge-Architect)  
**Status:** Implemented  
**Scope:** Generic repo-wiki capability improvements

## Context

Tier-2 item #10 addresses two small gaps in repo-wiki templates and one cross-reference:

1. **Missing concept-page template:** Repo-wiki has templates for module pages, index, and log, but no starter for `concepts/` pages (domain terms, APIs, schemas, events, jobs, data flows, invariants, contracts).
2. **Backend-centric entrypoint enum:** `wiki-index.template.json` entrypoints/type enum (`CLI/API/UI/Worker/Event`) lacks client/web-specific entry points like `Route` and `DeepLink`.
3. **SKILL.md reference gap:** The template list in `repo-wiki/SKILL.md` mentions module-page but not concept-page.

## Decision

### 1. Created `concept-page.template.md`

**Path:** `.github/skills/repo-wiki/templates/concept-page.template.md`

**Structure:**
- Frontmatter: `[CONCEPT_NAME]`, `[CONCEPT_SLUG]`, `[UPDATED_AT]`, `[CATEGORY]`, `[EVIDENCE_FILES]`
- **Definition:** Clear, concise explanation of the concept/term
- **Category:** One of: domain term / API / schema / event / job / data-flow / invariant / contract
- **Related Modules:** Wiki links to modules implementing/consuming this concept
- **Evidence:** Source `file:line` links demonstrating/defining the concept
- **Notes / Open Questions:** Ambiguities, assumptions, migration concerns
- **Cross-References:** Links to related concept/risk/overview pages
- **Last Updated / Sources:** Evidence inventory

**Conventions match existing templates:**
- Token-mindful comments
- Link, don't inline code
- Cite `file:line` for claims
- Evidence-first style
- Parallel structure to module-page.template.md

### 2. Extended Wiki-Index Entrypoint Enum

**File:** `.github/skills/meta-agentic-method/templates/wiki-index.template.json`

**Change:**
```diff
- "type": "[CLI/API/UI/Worker/Event]",
+ "type": "[CLI/API/UI/Worker/Event/Route/DeepLink]",
```

**Rationale:**
- `Route`: Client-side/web routes (e.g., React Router paths, Next.js pages, Angular routes)
- `DeepLink`: Mobile/app deep links and universal links

Maintains backward compatibility (existing values unchanged), extends generically for client/web/mobile entry points.

### 3. Added SKILL.md Reference

**File:** `.github/skills/repo-wiki/SKILL.md`

**Change:** Added bullet to template list (Wiki Directory Layout § "Use these templates when available"):
```markdown
- `templates/concept-page.template.md` — starter for `concepts/` pages.
```

Positioned parallel to module-page reference for discoverability.

## Impact

- **Completeness:** Concept pages now have a consistent starter template, reducing friction for agents creating domain glossaries, API references, schema docs, event catalogs, and invariant/contract pages.
- **Coverage:** Entrypoint enum now covers client/web/mobile entry points alongside backend (CLI/API/Worker/Event) and UI.
- **Discoverability:** SKILL.md template list is complete; agents know all available starters.

## Implementation

All changes additive, generic, and consistent with existing style:
- Concept-page template matches module-page frontmatter/heading/section conventions
- Entrypoint enum extended without breaking JSON validity
- SKILL.md edit is one line, parallel to existing structure

## Files Modified

1. **Created:** `.github/skills/repo-wiki/templates/concept-page.template.md`
2. **Edited:** `.github/skills/meta-agentic-method/templates/wiki-index.template.json` (line 39)
3. **Edited:** `.github/skills/repo-wiki/SKILL.md` (line 49)
4. **Appended:** `.squad/agents/oracle/history.md` (Learnings § 2026-01-17)
5. **Created:** `.squad/decisions/inbox/oracle-concept-template.md` (this file)

## Related

- `.squad/decisions.md` § Tier-2 improvements (item #10)
- `.github/skills/repo-wiki/SKILL.md` § Wiki Directory Layout
- `.github/skills/repo-wiki/templates/module-page.template.md` (parallel structure)
- `.github/skills/meta-agentic-method/templates/wiki-index.template.json` (entrypoint schema)


### 2026-06-09: oracle repo wiki generic edits

# Decision: Repo-Wiki Generic Edits — Scope Vocabulary, Packer Exclusions, Submodule Handling

**Date:** 2026-06-09  
**By:** Oracle (Knowledge-Architect)  
**Requested by:** Pascal van der Heiden

## Context

Validation probe was Angular→React modernization, but ALL edits must be GENERIC and scenario-agnostic. Oracle validated the repo-wiki knowledge-base prep and identified three Tier-1 gaps that needed additive fixes to generalize repo-wiki across backend AND frontend codebases.

## Decision

Implemented three additive edits to `.github/skills/repo-wiki/` and `.github/skills/meta-agentic-method/references/source-context-and-topology.md`:

### Item #3 — Packer Exclusion Guidance (repo-wiki Ingest)

**FILE:** `.github/skills/repo-wiki/SKILL.md`, Workflow: Ingest, step 2 ("Pack token-bounded source").

**Change:** Replaced vague "Exclude generated files, vendored dependencies, build outputs, secrets, and irrelevant binaries." with concise ecosystem-agnostic examples:

- Generated/build outputs: `dist/`, `build/`, `target/`, `.next/`, `.angular/`, `out/`
- Dependencies/vendor: `node_modules/`, `vendor/`, `.venv/`, `__pycache__/`, `*.egg-info/`
- Caches/coverage: `.cache/`, `coverage/`
- Lock files
- **Nested git submodules**
- Large fixtures/snapshots
- Secrets and binaries

Framed as "examples, adapt per stack" — not a fixed list.

### Item #4 — Scoping Vocabulary + Module-Page Public API Field

**FILE 1:** `.github/skills/repo-wiki/SKILL.md`, Workflow: Ingest step 1 ("Select scope").

**Change:** Broadened scope vocabulary to include client/UI and cross-cutting primitives that generalize across backends AND frontends:

- **Added:** component tree, presentation layer, client-state boundary, cross-cutting middleware (interceptors, guards, filters, pipes, decorators), upstream/consumed API surface.
- **Kept:** existing terms (module, package, service, bounded context, runtime boundary, schema area, API surface, risk hotspot).

**FILE 2:** `.github/skills/repo-wiki/templates/module-page.template.md`.

**Change:** Wherever it lists the "Public API / Entry Points" surface, added a generic note that for UI/client modules this includes:

- Component selectors/identifiers
- Public inputs/outputs (props)
- Injectable/shared services
- Upstream APIs consumed

Note is generic and applies to Angular/React/Vue/Svelte/mobile/etc.

### Topology Submodule Note (folded from dropped branching item)

**FILE:** `.github/skills/meta-agentic-method/references/source-context-and-topology.md`.

**Change:** Added ONE generic line in the Modernization side-car topology guidance: if the legacy source itself contains git submodules, mount the legacy repo read-only as before and EXCLUDE nested submodules from repo-wiki packing (they are dependencies, not the migration subject).

**Rationale:** Does NOT introduce any in-repo branching for modernization — modernization stays side-car with read-only legacy (this is a stored team decision); brown-field remains in-repo.

## Rationale

All three edits address friction in generalizing repo-wiki from backend-only to backend + frontend codebases:

1. **Packer exclusions** were vague; agents would guess and inconsistently exclude modern frontend artifacts like `.angular/` or `.next/`.
2. **Scoping vocabulary** biased toward backend (module/package/service); UI/client constructs (component trees, presentation layers, client-state boundaries, middleware/interceptors) had no explicit terminology.
3. **Module-page Public API field** listed `[Function/Class/Route/Event/CLI/Component]` but missed component-specific details: selectors, props, injectable services, consumed APIs.
4. **Git submodules** are common in legacy monorepo modernizations; repo-wiki packer should exclude nested submodules (they are dependencies, not the migration subject).

## Files Changed

- `.github/skills/repo-wiki/SKILL.md` — Ingest steps 1 + 2
- `.github/skills/repo-wiki/templates/module-page.template.md` — Public API section
- `.github/skills/meta-agentic-method/references/source-context-and-topology.md` — Modernization topology

## Verification

- All edits are additive (no removals).
- All edits are generic and scenario-agnostic (no Angular-specific or React-specific content).
- Consistent with existing repo-wiki style and conventions.
- `.squad/agents/oracle/history.md` updated with 2-line learning note.

## Consequences

Repo-wiki skill now generalizes across backend and frontend codebases without requiring agents to infer missing vocabulary or exclusion patterns. UI/client modules, presentation layers, and cross-cutting middleware are first-class scoping constructs. Packer exclusions are concrete and ecosystem-agnostic.


### 2026-06-09: tank build path runtime skill

# Decision: Capability-Acquisition BUILD Path — Runtime Bespoke Skill Creation

**Date**: 2026-01-27  
**Agent**: Tank (Integration-Developer)  
**Requested by**: Pascal van der Heiden  
**Status**: Implemented

## Context

Validation probe (Angular→React migration) surfaced that no reusable skill/MCP exists for cross-framework frontend transformations. User constraint: the meta-template must stay **scenario-agnostic** — never ship scenario-fixed skills (e.g., `angular-react-migration`). Instead, the *process* must create **bespoke, per-run skills** at execution time.

## Decision

**Generalized capability-acquisition BUILD path (C)** in `.github/skills/meta-agentic-method/references/capability-acquisition.md`:

1. **Runtime Creation**: When no reusable repo artifact (A) or external MCP/skill (B) exists, the team BUILDS the missing capability **AT RUNTIME** in the scenario's working repository — NOT in this meta-template.
2. **Options**: Generate MCP server (via `mcp-builder` from OpenAPI spec), author bespoke scenario-specific skill (via `skill-creator`), add instruction file, or define custom-agent role.
3. **LLM-Native Work**: Much transformation/translation work (e.g., Angular→React, Oracle→Fabric data mappings) is inherently LLM-native and requires NO tool/MCP. A bespoke skill capturing project-specific patterns/gotchas is often the right artifact.
4. **Compounding Knowledge**: Bespoke skills are created once, then refined across the run as agents learn (new gotchas, proven patterns captured back into the skill).
5. **GUARDRAIL**: Bespoke, scenario-specific skills/MCPs/instructions/agents STAY in the scenario repository. They are NOT added to this meta-template. Only **generic, reusable improvements** (broken reference fixes, new MCP discovery sources, prompt friction fixes) may be proposed upstream via `github-issues` with label `template-feedback`.

## Rationale

- **Scenario-Agnostic**: Template ships generic *process* (capability-acquisition decision tree) but NO domain-specific skills (Angular, React, Oracle, Fabric).
- **Flexibility**: Every scenario builds exactly the capabilities it needs, at the time it needs them, in the working repo.
- **Knowledge Capture**: Bespoke skills compound — agents refine them mid-run, making later phases faster/higher-confidence.
- **Clean Separation**: Template provides discovery/authoring tools (`find-skills`, `mcp-builder`, `skill-creator`); scenarios provide domain expertise.

## Implementation

**Edited**: `.github/skills/meta-agentic-method/references/capability-acquisition.md`  
**Changes**:
- Renamed path C header to `[C] BUILD NEW ARTIFACT AT RUNTIME`
- Added "General Principle" and "LLM-Native Work" guidance paragraphs
- Updated all C1/C2/C3/C4 sub-paths to clarify "Artifact Location: Scenario repository (not meta-template)"
- Added C2 refinement note: "Update skill with learnings throughout run"
- Added GUARDRAIL section distinguishing bespoke (scenario-local) vs. generic (template-feedback) artifacts

**Also Updated**:
- `.squad/agents/tank/history.md` § Learnings (2-line note)
- `.squad/decisions/inbox/tank-build-path-runtime-skill.md` (this file)

## Verification

- [ ] Capability-acquisition.md retains paths A/B/C structure
- [ ] No scenario-specific skills added to meta-template (e.g., no `angular-react-migration`)
- [ ] GUARDRAIL clearly separates bespoke (local) vs. generic (upstream feedback) artifacts
- [ ] LLM-native work explicitly called out as often needing bespoke skill, not MCP

## Impact

- **Tier-1 Item #2**: ✅ Completed
- **Template Flexibility**: Scenarios can now build custom skills/MCPs at runtime without polluting meta-template
- **Angular→React Probe**: Validated pattern — bespoke skill with Angular patterns → React patterns mappings
- **Feedback Loop**: Generic improvements flow upstream via template-feedback; scenario-specific stay local


### 2026-06-09: tank role archetypes

# Decision: De-bias Team-Formation Role Archetypes

**By:** Tank (Integration-Developer)  
**Date:** 2026-01-27  
**Requested by:** Pascal van der Heiden

## Context

The team-formation algorithm in `.github/skills/meta-agentic-method/references/team-formation.md` previously provided only data/ETL-biased role heuristics (Extractor, Transformer, Provisioner, Validator, Monitor, Documenter). This created a bias toward data migration scenarios, despite the template supporting green-field, brown-field, and modernization scenarios across all software development domains.

## Decision

**Added generic role archetypes** to step 2 "Candidate Agent Role Assignment" that span software development broadly:

- **Discovery/Knowledge-Architect** — Analyze existing systems, document architecture, extract domain knowledge
- **Domain/Architecture Lead** — Design system structure, define module boundaries, establish patterns
- **Implementation/Component Migrator** — Build/migrate application logic, business rules, core functionality
- **Data/Schema Migrator** — Handle data models, schema transformations, data migration pipelines
- **Integration/API** — Connect systems, implement APIs, orchestrate service communication
- **UI/Presentation** — Build user interfaces, implement accessibility, handle client-side rendering
- **Test/Parity Engineer** — Ensure correctness, backward compatibility, establish safety nets
- **Reviewer/Quality** — Verify outputs, enforce standards, validate completeness
- **DevOps/Release** — Provision infrastructure, configure CI/CD, manage deployments
- **Accessibility/Compliance** — Ensure WCAG/regulatory compliance, validate audit requirements

These archetypes are **illustrative examples** the team picks from based on Analysis/Assessment domains, not a fixed mandatory list. Actual roles derive dynamically from the scenario.

**Added execution-approach-agnostic note** clarifying that these archetypes work identically under both execution approaches (this was a stored team decision from prompts):

- **Custom Agents approach**: Each archetype becomes a dedicated agent file (`.github/agents/<role-name>.agent.md`)
- **Squad approach**: Each archetype maps to a Squad member/cast role on the team
- The domain→role mapping is the same; only the instantiation differs

**Preserved legacy ETL heuristics** for backward compatibility, but moved them below the generic archetypes and labeled them as legacy.

## Rationale

1. **Eliminates bias**: The methodology now supports all software development scenarios (web apps, APIs, mobile, infrastructure, frontend migrations, backend modernizations) with equal coverage
2. **Aligns with execution approaches**: The prompts offer "Execution Approach: Custom Agents vs Squad" — the archetypes now explicitly support both paths
3. **Maintains backward compatibility**: Legacy ETL heuristics remain available for data migration scenarios
4. **Keeps scenario-agnostic**: No fixed roles; teams derive roles from domain analysis dynamically
5. **Follows additive constraint**: No content removed; only generic guidance added

## Implementation

**File modified:**
- `.github/skills/meta-agentic-method/references/team-formation.md` — step 2 "Candidate Agent Role Assignment"

**Changes:**
- Added 10 generic role archetypes with descriptions
- Added execution-approach-agnostic note (Custom Agents vs Squad)
- Relabeled legacy ETL heuristics as backward-compatible examples
- Preserved merge/split rules (>70% overlap merge, >5 responsibilities split)

## Verification

- [ ] Generic archetypes cover software development broadly (not data/ETL-only)
- [ ] Execution-approach note clarifies Custom Agents vs Squad instantiation
- [ ] Legacy ETL heuristics preserved for backward compatibility
- [ ] No scenario-fixed content (roles derive dynamically from domains)
- [ ] Consistent with existing file style and algorithm structure

## Consequences

- Team formation now produces roles aligned with ANY software development scenario
- Prompts can reference these archetypes when scaffolding team rosters
- No breaking changes to existing workflows (additive only)
- Template bias toward data migration removed


### 2026-06-09: trinity tier2 ui report

# Trinity Tier-2: UI Migration Tables + Test Results Field

**Date:** 2026-06-09  
**Agent:** Trinity (Template Engineer)  
**Requested by:** Pascal van der Heiden

## Context

Generic, scenario-agnostic template improvements for UI/client migrations and test/parity visibility.

## Changes

### Item #7: Optional UI Migration Mapping Tables

**File:** `.github/skills/meta-agentic-method/templates/assessment.template.md`

Added optional section gated by `<!-- UI_MIGRATION: ... -->` HTML comment markers for client-layer modernizations. Includes four generic tables:

1. **Component Mapping**: Legacy → Target component parity
2. **Route Parity**: Legacy → Target route + guard/redirect mappings
3. **State / Service Strategy**: Observable/store/service → hook/store/context/query mappings
4. **Cross-cutting Middleware Mapping**: Interceptor/guard/filter/pipe → target equivalents

**Generic across frameworks**: Angular, React, Vue, Svelte, mobile. Use when applicable; delete otherwise.

### Item #9: Test Results Field

**File:** `.github/skills/progress-report/SKILL.md`

Added `testResults` field to JSON data contract:

```json
"testResults": {
  "total": 0,
  "passed": 0,
  "failed": 0,
  "parityPercent": null
}
```

**Applies to all scenarios:**
- Green-field: TDD pass rate
- Brown-field: Safety net coverage
- Modernization: Backward compatibility parity percentage

**Rendering:** Badge or progress bar near confidence gauge. Field documented in schema, field descriptions section, and minimal example JSON.

## Rationale

Both additions support testing-first methodology guidance from Tier-1. UI tables enable client-layer gap analysis without framework lock-in. Test results field surfaces verification status (6th confidence dimension) in progress dashboard.

## Verification

- [x] Assessment template: UI tables gated, generic, additive
- [x] Progress report: testResults in schema, field descriptions, minimal example
- [x] No schema breaks (field optional, defaults safe)
- [x] Generic across scenarios and tech stacks
- [x] History + decision files updated

## Consequences

Template now supports UI/client modernization gap analysis and real-time test/parity tracking across all three scenarios. No breaking changes to existing consumers.


# Decision: Explicit Execution Handoff and Generic Modernization Roles

**Date:** 2026-06-09  
**Author:** Morpheus  
**Status:** Proposed

## Context

Three scenario prompts (green-field, brown-field, modernization) share Team Formation and Execution phase structure. Team Formation offers Approach A (Custom Agents) and Approach B (Squad Team). Previously:

1. **Approach A** created role agent files but left execution coordination implicit (agents "invoked individually" or via documented handoff protocol).
2. **Approach B** hand-wrote charter.md/history.md for Squad members, duplicating Squad's native hiring logic.
3. **Execution phases** described agent invocation in abstract terms without explicit handoff to a concrete execution lead.
4. **Modernization Phase 8** hardcoded ETL-specific roles (Extractor, Transformer, Provisioner) as the canonical team pattern, biasing the prompt toward data migration and obscuring applicability to web/API/framework modernization scenarios.
5. **SDD framework integration** was mentioned but not explicitly tied to execution lead responsibility for generating framework-native specs and running implement loops.

This created ambiguity about who orchestrates execution and reinforced perception that modernization = data migration.

## Decision

### 1. Team Formation Approach A (Custom Agents) — all 3 prompts

After creating role agent files, **designate the shipped Orchestrator agent** (`.github/agents/orchestrator.agent.md`) as execution lead. It reads roster + handoff DAG from `docs/<scenario>-<slug>/04-team.md` (green-field), `docs/<scenario>-<slug>/04-team.md` (brown-field), or `docs/<scenario>-<slug>/06-team.md` (modernization). It drives Execution by invoking role agents as subagents.

### 2. Team Formation Approach B (Squad Team) — all 3 prompts

**Hand the role roster to Squad coordinator** (`.github/agents/squad.agent.md`), which hires members via its **native flow**:

- Squad creates themed cast names (per `.squad/casting/registry.json`)
- Squad generates `charter.md` and seeded `history.md` for each member
- Squad updates `.squad/team.md` `## Members` table
- Squad updates `.squad/routing.md` with task-to-agent routing

Do not duplicate charter/history creation steps in the prompt — Squad owns this logic.

### 3. Execution Phase Handoff — all 3 prompts

Make handoff **explicit**:

- **Approach A:** Invoke the **Orchestrator** (`.github/agents/orchestrator.agent.md`). It reads roster + plan/tasks, invokes role agents as subagents in handoff/parallel order, enforces reviewer gate (strict lockout — author can't fix own rejected work), maintains `execution-log.md`, reports when done.
- **Approach B:** The **Squad coordinator** (`.github/agents/squad.agent.md`) drives execution — fan-out to members, reviewer gates, Scribe logging — per its charter.

### 4. SDD Framework Integration — all 3 prompts

When an SDD framework was selected at Intake, the execution lead must:

a) **Generate the framework's native specs** in addition to `docs/<scenario>-<slug>/` specs already created:
   - Spec-Kit: `spec.md`, `plan.md`, `tasks.md`
   - OpenSpec: change proposal under `openspec/changes/<id>/`
   - Superpowers: plan via `writing-plans`

   Keep framework specs derived from / consistent with `docs/` specs.

b) **Explicitly run that framework's implement loop**:
   - Spec-Kit: `/speckit.implement`
   - OpenSpec: `/opsx:apply` + `/opsx:verify`
   - Superpowers: `subagent-driven-development` or `executing-plans`

Reference `.github/skills/meta-agentic-method/references/sdd-frameworks.md` for per-framework detail rather than restating it.

### 5. Generic Modernization Roles (modernization.prompt.md Phase 8 only)

Replace hardcoded ETL roster with **generic, archetype-driven wording** pointing to `.github/skills/meta-agentic-method/references/team-formation.md` role archetypes:

- Discovery/Knowledge-Architect
- Domain/Architecture Lead
- Implementation/Component Migrator
- Data/Schema Migrator
- Integration/API
- UI/Presentation
- Test/Parity Engineer
- Reviewer/Quality
- DevOps/Release
- Accessibility/Compliance

Provide **scenario-specific examples**:

- **Data migration** (one example): Extractor, Transformer, Provisioner, Validator, Orchestrator, SafetyNet
- **Web migration:** LegacyAnalyzer, ComponentMigrator, RoutingAdapter, UIRefactorer, ContractValidator, DeploymentEngineer
- **API modernization:** APIDiscoverer, EndpointMapper, AuthenticationMigrator, ResponseTransformer, CompatibilityTester, TrafficCutoverManager
- **Framework port:** DependencyAnalyzer, CoreMigrator, PluginAdapter, TestingHarness, RegressionValidator, RolloutCoordinator

Keep valuable concepts (cutover, rollback, parity validation) but frame them **generically** as software-development-agnostic patterns. Mark concrete data-migration wording as **one illustrative example** among many.

### 6. Generic Parity Validation (modernization.prompt.md Phase 10)

Expand parity report to cover **scenario-dependent validation**:

- Data migration: row counts, schema validation, data sampling
- API modernization: contract parity, endpoint mapping, auth flow equivalence
- UI migration: visual regression, interaction parity, rendering consistency
- Framework port: test suite parity, API surface equivalence, behavior consistency

Exit gate: parity validated per scenario requirements (≥99.9% for data migrations, 100% for API contracts, acceptable visual delta for UI, full test suite pass for framework ports).

### 7. Generic Migration Summary (modernization.prompt.md Phase 11)

Handoff README migration summary must be scenario-dependent:

- **Volume/scope metrics:** data volume for data migrations, endpoint count for API modernization, component count for UI ports, module count for framework migrations
- **Performance metrics:** query latency, API response times, rendering speed, test suite runtime
- **Next steps examples:** "Decommission legacy instance", "Update client SDKs", "Train team on new framework", "Monitor target performance for 30 days"
- **Known gaps examples:** "Real-time sync not implemented; batch runs hourly", "Legacy admin UI not ported; use new admin panel", "Deprecated endpoints removed; update clients to v2 API"

## Consequences

### Positive

- **Clear ownership:** Execution lead is named and invoked explicitly (Orchestrator or Squad coordinator).
- **Single source of truth:** Squad hiring logic lives in squad.agent.md, not duplicated in prompts.
- **SDD framework discipline:** Framework-native specs and implement loops are explicit execution-lead responsibilities when framework selected.
- **Scenario-agnostic modernization:** Prompt reads as applicable to web, API, framework, data migrations equally; no single domain is privileged.
- **Archetype-driven team formation:** Team-formation.md role archetypes become authoritative source for any scenario.
- **Parallel approaches consistent:** Approach A and Approach B handoff wording is consistent across all 3 prompts.

### Neutral

- Prompt length increases slightly (20-30 lines per file) due to explicit handoff detail and scenario examples.

### Negative

- None identified. Changes are surgical and additive; existing phase numbering and formatting preserved.

## Implementation

**Deliverables:**

- `.github/prompts/green-field.prompt.md` (Phase 5 Team Formation, Phase 7 Execution)
- `.github/prompts/brown-field.prompt.md` (Phase 7 Team Formation, Phase 8 Execution)
- `.github/prompts/modernization.prompt.md` (Phase 8 Team Formation, Phase 9 Execution, Phase 10 Verification, Phase 11 Handoff)
- `.squad/agents/morpheus/history.md` (learning appended)

**Verification:**

- [x] Edits 1-3 applied consistently to all 3 prompts
- [x] Edit 4 de-biasing applied to modernization.prompt.md only
- [x] Existing phase numbering, headings, formatting preserved
- [x] Approach A and Approach B wording parallel across prompts

## References

- `.github/skills/meta-agentic-method/references/team-formation.md` (role archetypes)
- `.github/skills/meta-agentic-method/references/sdd-frameworks.md` (framework-native specs and implement loops)
- `.github/agents/orchestrator.agent.md` (Approach A execution lead)
- `.github/agents/squad.agent.md` (Approach B execution lead)
# Decision: Orchestrator Agent for Custom Agents Execution Approach

**Date**: 2026-01-16  
**By**: Oracle (Knowledge Architect)  
**Requested by**: Pascal van der Heiden

## Context

The meta-agentic template supports two execution approaches for spec-driven workflows:
1. **Custom Agents**: Explicitly-defined role agents (`.github/agents/<role>.agent.md`) created during Team Formation.
2. **Squad Team**: Squad members spawned from universes and managed by `.github/agents/squad.agent.md`.

The Squad approach had a dedicated coordinator (squad.agent.md) to orchestrate execution, enforce reviewer gates, and maintain logs. The Custom Agents approach lacked an equivalent execution lead — the workflow just listed role agents for manual invocation.

## Decision

Created `.github/agents/orchestrator.agent.md` — a generic, scenario-agnostic execution lead for the Custom Agents approach.

**Orchestrator Contract**:
- **Reads** team roster (`docs/<scenario>-<slug>/06-team.md` or `04-team.md`) to extract agent roster, handoff DAG, and reviewer assignment.
- **Invokes** role agents (`.github/agents/<role>.agent.md`) as subagents via the `task` tool in the handoff order defined by the DAG. Spawns independent agents in parallel; serializes only on real data dependencies.
- **Enforces reviewer gate** with **strict lockout**: when a reviewer rejects an artifact, the original author may NOT revise it — a different agent must. This mirrors squad.agent.md's Reviewer Rejection Protocol.
- **Runs SDD implement loop** when an SDD framework (Spec-Kit, OpenSpec, Superpowers) was chosen at Intake:
  - Generates framework-native specs (in addition to `docs/` specs).
  - Executes the framework's implement loop (e.g., `/speckit.implement`, `/opsx:apply`, `subagent-driven-development`).
  - Keeps framework specs derived from and consistent with `docs/` specs (single source of truth).
- **Maintains** append-only `docs/<scenario>-<slug>/execution-log.md` (timestamps, artifacts, reviewer verdicts, summaries).
- **Reports** completion summary (what shipped, exit-criteria status, blockers).
- Is **generic** — reads scenario artifacts at runtime; contains no scenario/domain specifics.
- Is **NOT used for Squad approach** (squad.agent.md owns that).

**Supporting Edits**:
1. **`.github/skills/meta-agentic-method/references/sdd-frameworks.md`**: Added "Native specs + implement loop" sections for Spec-Kit, OpenSpec, and Superpowers, detailing which framework-native artifacts to generate and which commands to run for implementation.
2. **`.github/instructions/agents.instructions.md`**: Added concise note documenting the orchestrator pattern (Custom Agents execution lead that mirrors Squad coordinator's role for a different agent topology).

## Rationale

- **Parity**: Both execution approaches now have dedicated orchestrators — squad.agent.md for Squad, orchestrator.agent.md for Custom Agents.
- **Automation**: The Custom Agents workflow no longer requires manual agent invocation. The orchestrator drives the handoff DAG automatically.
- **Quality gates**: Strict reviewer lockout prevents self-justification loops and ensures independent revision, improving artifact quality.
- **SDD framework support**: Execution leads must know how to run framework implement loops when a framework is chosen. This was implicit before; now it's explicit.
- **Reusability**: The orchestrator is generic — it works for green-field, brown-field, and modernization by reading scenario artifacts at runtime.

## Constraints Preserved

- **Scenario-agnostic**: No domain/ETL/migration specifics in orchestrator logic.
- **Framework-agnostic**: Supports None, Spec-Kit, OpenSpec, Superpowers by reading intake/analysis docs.
- **Execution-approach-specific**: Used ONLY for Custom Agents, not Squad.

## Verification

- **File created**: `.github/agents/orchestrator.agent.md` (219 lines, follows `agents.instructions.md` authoring standard).
- **sdd-frameworks.md updated**: Three "Native specs + implement loop" sections added (Spec-Kit, OpenSpec, Superpowers).
- **agents.instructions.md updated**: Orchestrator pattern note added (4 sentences, concise).
- **Generic operation verified**: No scenario/domain tokens in orchestrator prompt; all specifics read from runtime artifacts.
- **Reviewer lockout semantics verified**: Mirrors squad.agent.md § Reviewer Rejection Protocol.

## Consequences

- Scenario prompts can now offer both execution approaches with clear orchestration:
  - **Custom Agents**: Team Formation creates role agents → orchestrator.agent.md drives execution.
  - **Squad Team**: Team Formation spawns Squad members → squad.agent.md drives execution.
- The orchestrator becomes the execution entry point for Custom Agents workflows (invoked after Team Formation completes).
- SDD framework implement loops are now documented as an orchestrator responsibility, ensuring frameworks are actually used (not just installed).

## Next Steps

- Update scenario prompts (green-field.prompt.md, brown-field.prompt.md, modernization.prompt.md) to invoke orchestrator.agent.md after Team Formation when Custom Agents approach is chosen. (Assigned to agent owning prompts, not Oracle.)
- Update team.template.md to clarify that the "Handoff To" column feeds the orchestrator's DAG parsing. (Assigned to agent owning templates, not Oracle.)

---

**Status**: PROPOSED  
**Scope**: Repository (meta-agentic-template)
# Decision: Execution Lead Documentation + README Restructure

**Date:** 2026-06-09  
**By:** Trinity (Template Engineer)  
**Requested by:** Pascal van der Heiden

## Context

The Team Formation → Execution handoff needed explicit documentation. Two execution approaches (Custom Agents via Orchestrator, Squad Team via Squad coordinator) both use a generic execution lead that reads the team roster, invokes role agents, enforces reviewer gates, and runs optional SDD framework workflows. The README's usage instructions were comprehensive but not optimized for new users landing on the template.

## Decision

### 1. Team Template: Added Execution Lead Section

Added `## Execution Lead` to `team.template.md` (placed after `## Reviewer Assignment`, before `## Shared Utilities`) documenting:

- **Approach A lead**: `.github/agents/orchestrator.agent.md` (generic Orchestrator)
- **Approach B lead**: `.github/agents/squad.agent.md` (Squad coordinator)
- **Lead responsibilities**: invoke agents per handoff protocol, enforce strict reviewer gate (original author cannot revise own rejected work), run SDD framework implement loop if chosen, maintain execution-log.md, report completion
- **Lead-specific contracts**: what each lead reads, how it invokes agents, reviewer-rejection enforcement
- **SDD framework integration**: if a framework was chosen, the lead generates framework-native specs and runs the framework's implement loop

### 2. README: Restructured for Clarity

Rewrote usage section with:

- **Quick Start Guide** (5 numbered steps): choose scenario → run prompt → answer Intake → team formation/execution → review report
- **Example Prompts** (3 concrete examples): green-field task API, brown-field OAuth addition, modernization Angular→React with parity oracle
- **Simplified Execution Approaches** table: removed redundant examples, focused on orchestration differences
- **Refined How It Works**: emphasized execution lead's role in Phase 8, clarified lead responsibilities
- **Verified defaults**: green-field → OpenSpec, brown-field → None, modernization → Spec-Kit (confirmed against SKILL.md and prompts)

## Rationale

**Execution Lead placement:** Reviewer is assigned BEFORE execution (Team Formation outputs reviewer assignment), and the lead enforces reviewer gates DURING execution (Execution phase). Logical sequence: Reviewer Assignment → Execution Lead → Shared Utilities.

**README restructure:** New users need a clear "what to do first" flow. The previous version was accurate but required reading multiple sections to understand the basic workflow. The Quick Start Guide + Example Prompts pattern reduces time-to-first-run and provides copy-paste starting points.

**Example prompt strategy:** Used generic, illustrative examples across all three scenarios to avoid locking the template to any specific domain while still showing realistic use cases (task API, OAuth, Angular→React).

## Consequences

- Team template now documents the execution lead's contract explicitly — no ambiguity about who invokes agents or enforces reviewer gates
- README is easier to follow for new users; Quick Start + Examples frontload actionable steps
- Example prompts provide concrete starting points without biasing the template toward specific domains
- All factual claims (defaults, file paths, phase names) verified against repo content

## Verification

- Added execution lead section preserves template placeholder style (`[PLACEHOLDER]`, `<!-- GENERATED: ... -->`)
- README example prompts cover all three scenarios with realistic, scenario-agnostic use cases
- SDD framework defaults match those in SKILL.md and prompts
- No hardcoded file paths or domain-specific details in examples

### 2026-06-09: CLI Wrapper Skills + README Restructure

**By:** Trinity (Template Engineer)  
**Reviewed by:** Neo (Quality Reviewer)  
**Requested by:** Pascal van der Heiden

**Context:**
Template had 3 scenario workflows as VS Code `.prompt.md` files but no Copilot CLI equivalent. README falsely claimed `gh copilot prompt <scenario>` works (that command doesn't exist). Needed CLI parity via skills, cleaner README, corrected APM install list.

**Decision:**
Created 3 thin wrapper skills for CLI invocation:
- `.github/skills/green-field/SKILL.md`
- `.github/skills/brown-field/SKILL.md`
- `.github/skills/modernization/SKILL.md`

Each delegates to authoritative `.github/prompts/<scenario>.prompt.md` (single source of truth). Skills have YAML frontmatter with scenario-distinguishing descriptions (green = build new; brown = extend in-repo; mod = migrate side-by-side). Body notes VS Code users can invoke via `/<scenario>` slash command.

README restructured into 3-step flow (Get template → Run scenario → Execute by team), removed false `gh copilot prompt` claim, updated Repository Structure section, added Mermaid "How This Meta-Template Works" diagram. APM install list corrected: added orchestrator.agent.md, 3 scenario skills, find-skills, mcp-builder (all 17 paths verified).

**Rationale:**
- **CLI Parity:** Copilot CLI doesn't execute prompt files — it uses skills. Wrapper skills let CLI users ask naturally ("Run the modernization workflow to..."), triggering the skill, which reads the prompt.
- **Single Source of Truth:** Workflow content lives in `.prompt.md` (not duplicated). Skills are thin routing layer.
- **README Clarity:** Removed false commands, merged redundant sections, 3-step flow makes path obvious. Both CLI + VS Code surfaces documented together.
- **APM Correctness:** Execution lead (orchestrator.agent.md) + CLI skills (green-field, brown-field, modernization) + capability-phase skills (find-skills, mcp-builder) all included.

**Consequences:**
- CLI users can invoke scenarios naturally via skill triggering
- VS Code users still use `/<scenario>` slash commands
- Both surfaces share `.prompt.md` (no duplication)
- APM installs into existing repos now include execution lead + CLI skills
- README accurate (no false commands)

**Verification (Neo, 6-criteria review):**
- ✅ Skills follow agent-skills.instructions.md (wrapper pattern valid, YAML complete, descriptions distinguish scenarios)
- ✅ Single source of truth (workflow logic in `.prompt.md`, skills delegate)
- ✅ README accurate (no false `gh copilot prompt`, both CLI + VS Code documented, 3-step flow clear)
- ✅ APM install list (orchestrator.agent.md, 3 skills, find-skills, mcp-builder added; all 17 paths verified)
- ✅ No broken links (all internal references resolve, cross-references in instructions/skills intact)
- ✅ Documentation updated (copilot-instructions.md Scenario Prompts + APM install corrected)

**Pattern:**
GENERIC scenario entry-points allowed (not domain-fixed). Delegate to authoritative workflow files, note alternative invocation surfaces (VS Code slash commands).
# Decision: Mandatory Human Validation Gate Before Execution

**Date:** 2026-06-09  
**Status:** Proposed  
**Decider:** Morpheus (Agent Designer)  
**Scope:** All scenario prompts (green-field, brown-field, modernization)  

## Context

During live testing, the scenario workflows were found to scaffold all planning documents (plan.md, tasks.md, execution-log.md, and upstream artifacts like intake, discovery/analysis/assessment, capability-map, team, testing-strategy) and then **immediately** hand off to the execution lead and start building implementation code — with NO opportunity for the user to review the generated planning documents in person first.

This violated the expectation that users should have a mandatory human checkpoint to review and approve all planning artifacts before the team is materialized, execution begins, and code is written.

## Decision

Insert a **🚦 Human Validation Gate (MANDATORY)** step in the Execution phase of all three scenario prompts, positioned AFTER all planning documents are scaffolded and IMMEDIATELY BEFORE the "Hand off to execution lead" step.

### Implementation Details

**Placement:**
- Green-field: Phase 7 Execution, new step 4 (before hand-off step, now step 5)
- Brown-field: Phase 8 Execution, new step 5 (before hand-off step, now step 6)
- Modernization: Phase 9 Execution, new step 5 (before hand-off step, now step 6)

**Gate Behavior:**
1. **STOP** — Do NOT invoke execution lead, materialize/initiate team, or write implementation code yet
2. Present concise summary + enumerated list of generated planning docs for user review
3. Ask user to **review docs in person and explicitly approve** before execution proceeds
4. Make explicit: team/execution lead initiated and building begins ONLY after approval
5. **WAIT** for explicit approval; if user requests changes, revise docs and re-present gate
6. Proceed to hand-off step ONLY after user approves

**Document Lists (per scenario):**
- **Green-field:** 00-intake.md, 01-analysis.md, 03-capability-map.md, 04-team.md, 05-testing-strategy.md, plan.md, tasks.md, plus SDD-framework specs if chosen
- **Brown-field:** 00-intake.md, 01-discovery.md, wiki/, 02-analysis.md, 03-capability-map.md, 04-team.md, 06-testing-strategy.md, plan.md, tasks.md, plus SDD-framework specs if chosen
- **Modernization:** 00-intake.md, 01-discovery.md (if source available), wiki/ (if source available), 02-assessment.md, 04-analysis.md, 05-capability-map.md, 06-team.md, 07-testing-strategy.md, plan.md, tasks.md, plus SDD-framework specs if chosen

**Style:** Mirrors existing Phase 1 Intake hard gate (emphatic **⚠️ MANDATORY** / **🚦** marker, unambiguous wording, explicit WAIT instruction). Scenario-agnostic language with scenario-specific doc enumerations.

## Consequences

**Positive:**
- User gains mandatory review checkpoint before execution begins
- Prevents unwanted code generation before plan review
- Aligns with user expectations for human-in-the-loop validation
- Revision loops supported (user can request changes and re-approve)
- Consistent gate pattern across all three scenario prompts

**Negative:**
- Adds one additional step to Execution phase workflow
- Requires user interaction before automation continues (intentional friction)
- Longer end-to-end time for fully automated runs (mitigated: this is the intended behavior)

**Neutral:**
- Gate uses same style as existing Phase 1 Intake gate (familiar pattern)
- Subsequent steps cleanly renumbered in all three prompts
- No changes to other phases or prompt logic

## Alternatives Considered

1. **No gate** — rejected; users explicitly requested this checkpoint
2. **Optional gate** — rejected; must be mandatory to prevent accidental skips
3. **Gate after team materialization** — rejected; team instantiation itself is part of execution and should require approval
4. **Gate in Team Formation phase** — rejected; plan/tasks not yet scaffolded at that point

## Related Decisions

- Phase 1 Intake Hard Gate for Execution Approach & SDD Framework (2026-06-09) — established pattern for emphatic mandatory gates
- Execution Handoff Redesign (2026-06-09) — defined hand-off-to-execution-lead step that this gate precedes

## References

- `.github/prompts/green-field.prompt.md` Phase 7 Execution step 4
- `.github/prompts/brown-field.prompt.md` Phase 8 Execution step 5
- `.github/prompts/modernization.prompt.md` Phase 9 Execution step 5
- User feedback: "I want to review the docs before it starts building"
