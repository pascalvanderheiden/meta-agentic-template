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

### 2026-06-08: Neo's Prompt Review Verdict

**By:** Neo (Reviewer Gate)

**Review Status:** CHANGES REQUESTED (1 blocking issue)

**Blocking Issue:** Modernization artifact numbering contradicts method doc. Current: `04-analysis.md`, `05-capability-map.md`, `06-team.md`. Expected: `01-analysis.md`, `03-capability-map.md`, `04-team.md` per method doc L260-271.

**Fixer:** Trinity or Oracle (mechanical find-replace in 1 file). Morpheus excluded per rotation rules.

**Passing Criteria:** Frontmatter complete, body structure correct, clarifying questions + halt, team formation algorithm, MCP discovery→build, skills/instructions acquisition, confidence rubric, HTML report contract.

**Non-blocking:** Add project-conventions skill reference in Capability Acquisition sections (optional).

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
