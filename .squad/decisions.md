# Squad Decisions

## Active Decisions

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

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
