# Neo — History

## Core Context

- **Project:** A meta-cognitive template framework for building GitHub Copilot agentic capabilities across green-field, brownfield, and code modernization scenarios.
- **Role:** Lead
- **Joined:** 2026-06-08T11:54:03.956Z

## Learnings

<!-- Append learnings below -->
- 2026-06-08: Reviewed green-field/brown-field/modernization prompts. Found 1 blocking issue: modernization artifact numbering contradicts method doc (uses 04-analysis vs. canonical 01-analysis). Recommended Trinity/Oracle patch.

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
