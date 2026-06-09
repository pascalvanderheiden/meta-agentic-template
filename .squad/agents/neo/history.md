# Neo — History

## Core Context

- **Project:** A meta-cognitive template framework for building GitHub Copilot agentic capabilities across green-field, brownfield, and code modernization scenarios.
- **Role:** Lead
- **Joined:** 2026-06-08T11:54:03.956Z

## Learnings

<!-- Append learnings below -->
- 2026-06-08: Reviewed green-field/brown-field/modernization prompts. Found 1 blocking issue: modernization artifact numbering contradicts method doc (uses 04-analysis vs. canonical 01-analysis). Recommended Trinity/Oracle patch.
- 2026-01-16: Pre-flight validation for Angular→React modernization revealed template bias toward data/ETL scenarios. Three key gaps: (1) assessment.template.md lacks UI-specific sections (component mapping, route parity, DI→hook strategy); (2) MCP Availability dimension (20%) is semantically awkward for UI-only migrations (trivially 100 or misleadingly 0); (3) highest-value parity test strategy—reusing existing Playwright E2E suite as cross-framework oracle—is undocumented despite being framework-agnostic. Template shines for phase pipeline, repo-wiki ingestion, target-framework skill ecosystem, and feedback loop.
- 2026-01-16: Topology gap identified: modernization prescribes side-car + `legacy/` submodule, but OWNED frontend repos with existing submodules (like `realworld/` backend) create submodule-in-submodule ambiguity. Workaround: treat as in-repo branch migration with repo-wiki.

## 2026-01-16: RE-REVIEW — Three Scenario Prompts (green/brown/modernization)

Conducted formal gate re-review following Oracle's method doc updates. **VERDICT: APPROVED**. Blocking artifact-numbering issue resolved via canonical convention (base: 00,01,03,04 vs modernization: 00,02,03,04,05,06). Dual execution approach (Custom Agents vs Squad Team) verified consistent across all three prompts. Core criteria re-confirmed (frontmatter, rubric, links, tone). No new inconsistencies. Files production-ready.

## 2026-06-08: Restructure Review — Skills Migration

**VERDICT: APPROVED**

Reviewed restructure converting loose `.github/prompts/` files into proper skills:
- `meta-agentic-method/` (SKILL.md + references.md) — methodology now skill-packaged
- `progress-report/` (SKILL.md + progress-report.template.html) — report template now skill-packaged

**Findings:**
1. **Skill compliance** — Both SKILL.md files have valid frontmatter (name + description with WHAT/WHEN/KEYWORDS), progressive disclosure structure, bundled-resource referencing via relative paths. meta-agentic-method at 490 lines (within 500 limit).
2. **Link integrity** — All 60+ internal links verified: prompts reference `../skills/meta-agentic-method/SKILL.md`, `../skills/meta-agentic-method/references.md`, `../skills/progress-report/progress-report.template.html`. No dangling links.
3. **No regression** — 6-dimension confidence rubric intact (weights sum to 1.0), artifact numbering convention preserved (base vs modernization slots), JSON data contract (10 fields) unchanged, dual execution approach (Custom Agents/Squad) consistent.
4. **Vision fit** — `.github/` now contains only Copilot-native artifacts (prompts, skills, instructions, agents, hooks). Methodology/report no longer loose files.

**Learning:** Skill migration requires explicit cross-reference linking between skills (e.g., progress-report → meta-agentic-method for rubric source). Verify relative paths work from skill folder context.

## 2026-06-08: Testing Strategy + Template Feedback Loop Review

**Features Reviewed:**
1. **Feature A (committed HEAD):** Upstream Template Feedback Loop — `template-feedback` label mechanism, `github-issues` skill transport, Squad routing rule #10
2. **Feature B (uncommitted):** Testing strategy by scenario + Playwright MCP + Auth correction

**VERDICT: APPROVED**

### Findings

1. **mcp-config.json validity** — ✅ PASS. Valid JSON, both `github` and `playwright` servers present:
   - `github`: HTTP type, `https://api.githubcopilot.com/mcp/`, Bearer auth (canonical form)
   - `playwright`: command `npx`, args `["@playwright/mcp@latest"]` (correct)
   - Server named `github` so `mcp__github__*` tools resolve correctly.

2. **Auth accuracy** — ✅ PASS. Verified in 4 locations (copilot-instructions.md line 168, SKILL.md line 633-637, decisions.md line 293-296, references.md line 64-66):
   - Filing issues on public repos requires auth — TRUE (no anonymous creation)
   - Host OAuth primary (GitHub MCP / IDE sign-in provides identity) — TRUE
   - PAT is fallback, NOT mandatory — TRUE
   - Reading public issues needs no auth — TRUE
   - **No remaining PAT-mandatory wording found.**

3. **Testing strategy soundness** — ✅ PASS.
   - Green-field: TDD+BDD BEFORE coding (SKILL.md lines 500-508) — correct phase placement at Analysis/Execution
   - Brown-field: Safety Net BEFORE altering (SKILL.md lines 509-517, brown-field.prompt.md Phase 3 lines 107-141) — correct placement
   - Modernization: API contract/parity testing (SKILL.md lines 519-527) — tied to legacy operational during migration
   - Frameworks match intent: Playwright (E2E), Jest/JUnit (unit), Gherkin/Cucumber (BDD), Approval Tests (snapshot), BMAD (dependency), Pact/Schemathesis (contract)
   - Verification Status linkage present (SKILL.md lines 530-540) — explicitly maps to rubric dimension

4. **Consistency / dual-path parity** — ✅ PASS.
   - Custom-agent AND Squad paths both inherit template feedback (SKILL.md lines 574-580, routing rule #10 line 62)
   - All 3 prompts have template feedback phase (Phase 9/10/11/12)
   - No contradictions found between method skill, instructions, prompts

5. **Link integrity** — ✅ PASS.
   - `../skills/meta-agentic-method/SKILL.md` — exists (23 references)
   - `../skills/meta-agentic-method/references.md` — exists (13 references)
   - `../skills/progress-report/progress-report.template.html` — exists (6 references)
   - `../skills/github-issues/SKILL.md` — exists (3 references)
   - Routing.md rule #10 references correct skill paths

6. **No regression** — ✅ PASS.
   - 6-dimension confidence rubric intact (weights sum to 1.0)
   - All prompt phases preserved with testing + feedback phases added
   - Artifact numbering convention unchanged

### Learnings

- Auth model for public repo issue filing: Host OAuth via GitHub MCP is preferred; PAT is fallback. Documentation now correct across all touchpoints.
- Testing strategy is phase-gated by scenario: green-field locks specs first, brown-field establishes safety net first, modernization maintains parity tests during dual-operation. Playwright MCP enables all UI testing paths.
- Template feedback loop is cross-cutting: routing rule #10 enforces both Approach A (custom-agent) and Approach B (Squad) filing to upstream.

## 2026-06-08: Spec Templates Review

### Learnings

1. **Template wiring pattern:** Each phase's "Scaffold from X → Y" instruction references `../skills/meta-agentic-method/templates/<template>.template.md`. This relative path convention ensures portability across environments.

2. **Dynamic content markers:** Two conventions work together: `[PLACEHOLDER]` tokens for fill-in values (scenario name, date) and `<!-- GENERATED: ... -->` markers for rows/sections generated from scenario input (team roster, capability matrix). Fixed skeleton + dynamic rows = structured but adaptable.

3. **Numbering collision avoidance:** The `01` slot intentionally unused in modernization keeps `02-discovery` aligned across brown-field and modernization, preventing file collision when `03-assessment` is introduced.

4. **Scenario gating enforcement:** Template README and SKILL.md "Key Rules" section both state the rule: green-field SKIPS discovery/assessment, brown-field ADDS discovery only, modernization ADDS both. Prompts honor this via which templates they reference.

5. **Exit criteria in templates:** Each template ends with exit criteria checklist, enabling quality gates and verification automation.

## 2026-06-09: Repo-Wiki Skill Review (Karpathy LLM-Wiki Pattern)

**VERDICT: APPROVED**

Reviewed new bundled `repo-wiki` skill implementing Karpathy's LLM-wiki pattern for token-bounded codebase indexing in brown-field/modernization Discovery.

**Contributors:** Oracle (SKILL.md, method delegation), Trinity (templates), Tank (references.md/apm.yml/README), Morpheus (prompt integration).

### Findings

1. **Karpathy-pattern fidelity** — ✅ PASS
   - Three-layer schema present: raw sources → wiki markdown → skill schema (SKILL.md lines 20-27)
   - `index.md` convention documented as first-read content catalog (lines 53-70)
   - `log.md` append-only with parseable `## [YYYY-MM-DD] ingest|query|lint` entries (lines 72-90)
   - Ingest/Query/Lint workflows fully defined (lines 92-133)
   - Wiki is persistent compounding artifact, NOT re-derived per query (line 105, gotchas line 167)
   - Optional search (qmd) mentioned, not mandated (lines 137-141)

2. **Skill conventions** — ✅ PASS
   - Valid frontmatter: `name: repo-wiki`, `description` with WHAT/WHEN/KEYWORDS (10-1024 char)
   - Follows agent-skills.instructions.md: When to Use, Pattern, Workflows, Token-Mindfulness, Gotchas, References
   - 177 lines (well under 500 limit, no need for references/ split)
   - Templates bundled: index.md.template, log.md.template, module-page.template.md, templates/README.md

3. **Delegation correctness** — ✅ PASS
   - `meta-agentic-method/SKILL.md` § Source Context Ingestion (lines 48-52) delegates to `../repo-wiki/SKILL.md` for full workflow
   - `references/source-context-and-topology.md` (lines 1-16) delegates repo-wiki workflow, keeps ONLY topology rules
   - No duplicated ingest/query/lint workflow content in method skill
   - No contradictions found

4. **Cross-refs resolve** — ✅ PASS (all links verified from their file's location)
   - From repo-wiki/SKILL.md: `../meta-agentic-method/SKILL.md` ✓, `../meta-agentic-method/templates/discovery-wiki.template.md` ✓
   - From meta-agentic-method/SKILL.md: `../repo-wiki/SKILL.md` ✓
   - From references/source-context-and-topology.md: `../../repo-wiki/SKILL.md` ✓
   - From prompts (brown-field, modernization): `../skills/repo-wiki/SKILL.md` ✓

5. **Additive & non-breaking** — ✅ PASS
   - Green-field prompt unchanged (only 1 unrelated "wiki" mention)
   - Brown-field/modernization Discovery phases now reference repo-wiki skill (lines 97, 99 brown-field; lines 99, 123 modernization)
   - references.md adds Karpathy gist, qmd, codebase-documenter entries — no removals
   - Existing template discovery-wiki.template.md and wiki-index.template.json remain in meta-agentic-method/templates/

### Notes (non-blocking)

- Consider adding LICENSE.txt to repo-wiki skill folder (Apache 2.0 typical per skill guidelines).
- `codebase-documenter` referenced in references.md as complementary to repo-wiki — good optional human-readable onboarding docs vs LLM-context wiki distinction.

### Learnings

- Karpathy wiki pattern key invariants: (1) index.md is first-read, (2) log.md is append-only with date-prefixed entries, (3) wiki is the compiled understanding layer that compounds, not raw source.
- Delegation pattern: when extracting a skill from a larger methodology, keep ONLY topology/timing in the parent; move full workflow to the new skill to avoid duplication and drift.

## 2026-01-17: Tier-1 + Tier-2 Generic Improvements Review (Angular→React Probe-Validated)

**VERDICT: ✅ APPROVED**

Reviewed 10 scenario-agnostic improvements validated via Angular→React probe but containing no scenario-fixed content.

**Files Reviewed:**
- `testing-strategy.md` — Parity oracle + durable/throwaway split
- `modernization.prompt.md` (Phases 2, 4, 7) — Discovery→Analysis handoff, de-biased tool list, parity testing
- `brown-field.prompt.md` (Analysis handoff) — Wiki/index.md citation
- `capability-acquisition.md` — BUILD path [C] + GUARDRAIL
- `repo-wiki/SKILL.md` — Ecosystem-agnostic packer exclusions, UI/client scope vocab
- `module-page.template.md` — UI/client Public API note
- `source-context-and-topology.md` — Nested submodule exclusion, side-car read-only stance
- `assessment.template.md` — Optional UI migration tables (gated)
- `team-formation.md` — Generic role archetypes + execution-approach-agnostic note
- `progress-report/SKILL.md` — Optional testResults field
- `concept-page.template.md` (new) — Concepts/ page template
- `wiki-index.template.json` — Route/DeepLink entrypoint enum

**Criteria Check:**

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Scenario-agnostic | ✅ PASS | No Angular/React/Oracle/Fabric mandates; examples illustrative only |
| Additive & non-breaking | ✅ PASS | No required sections removed; testResults/UI tables optional; JSON valid |
| Honors stored decisions | ✅ PASS | Side-car read-only preserved; GUARDRAIL enforces scenario-local artifacts |
| #8 fits BOTH approaches | ✅ PASS | team-formation.md explicitly states Custom Agents + Squad parity |
| Consistency | ✅ PASS | testing-strategy.md ↔ Phase 7 agree on parity oracle wording |
| Quality | ✅ PASS | Concise, retrieval-friendly, no placeholder cruft |

**Key Decisions Verified:**
1. **Meta-template stays scenario-agnostic:** capability-acquisition.md GUARDRAIL enforces bespoke artifacts stay in scenario repo, only generic improvements flow upstream.
2. **Topology:** brown-field = in-repo; modernization = side-car read-only (no branching). Nested submodules excluded from packing.

**Notes (non-blocking):**
- MCP Availability dimension (20%) remains semantically awkward for pure UI migrations with no backend MCP needs. Consider future rubric refinement for UI-only scenarios.

**Learning:** Probe-validated changes must remain scenario-agnostic — use illustrative examples (e.g., "Angular component tests" as throwaway category) without mandating frameworks. Optional sections gated with HTML comment markers (`<!-- UI_MIGRATION ... -->`) prevent template bloat while enabling coverage when applicable.

## 2026-06-09: Orchestration Log + Session Log Consolidation

Scribe created orchestration logs for each agent, session log for execution-handoff-redesign batch, merged decision inbox to decisions.md, updated cross-agent history records. All deliverables staged for git commit.

**Reviewed:** Morpheus's Human Validation Gate + Trinity's README Step 4 Reframing work (2026-06-09)  
**Scope:** Gate placement (blocking, sequential), README coherence, no regressions.

**Findings:**
1. ✅ Gate placement correct — new steps 4/5/5 in green/brown/modernization Execution phases, positioned BEFORE hand-off-to-execution-lead
2. ✅ Gate behavior blocking and non-bypassable — WAIT for explicit approval, handle revision loops
3. ✅ Step renumbering sequential — no gaps or duplicates in each prompt
4. ✅ README coherence — "Step 4: Review & Execute" wording matches gate behavior
5. ✅ No regressions — existing prompts/README structure intact

**VERDICT: APPROVED**

All criteria pass. Human validation gate + README update ready for commit.

---
**Scope:** 6-criteria gate review (skills compliance, single source of truth, README accuracy, APM list, link integrity, docs updated)

**Findings:**
1. ✅ Skills follow agent-skills.instructions.md (wrapper pattern valid, YAML frontmatter complete, descriptions distinguish scenarios)
2. ✅ Single source of truth (workflow logic in `.prompt.md`, skills thin routing layer, no duplication)
3. ✅ README accurate (no false `gh copilot prompt` command, both CLI + VS Code documented, 3-step flow)
4. ✅ APM install list corrected (orchestrator.agent.md, 3 scenario skills, find-skills, mcp-builder added; all 17 paths verified)
5. ✅ Links intact (internal references resolve, cross-references in instructions/skills unbroken)
6. ✅ Documentation updated (copilot-instructions.md Scenario Prompts + APM install corrected)

**VERDICT: APPROVED**

All criteria pass. Skills ready for commit.
