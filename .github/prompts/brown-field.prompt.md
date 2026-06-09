---
description: 'Orchestrate brown-field development using Spec-Driven Development (SDD): discover existing system, analyze requirements, form specialized agent team, acquire capabilities (MCP/skills/instructions), execute iteratively, generate HTML progress reports with confidence scoring.'
name: 'brown-field'
agent: 'agent'
tools: ['view', 'edit', 'create', 'bash', 'web_fetch', 'grep', 'glob', 'task']
argument-hint: 'Describe the existing system and desired changes, e.g., "Add OAuth to legacy Express.js API"'
---

# Brown-Field Development Workflow

Orchestrate brown-field development (extending/modifying existing systems) from discovery to deliverable using the Meta-Agentic SDD methodology.

## Mission

Execute spec-driven brown-field development by discovering existing system architecture, analyzing change requirements, forming a custom agent team with discovered/built capabilities (MCP servers, skills, instructions), and producing verified deliverables with real-time confidence scoring.

## Scope & Preconditions

**Use This Workflow When:**
- User requests EXTENDING or MODIFYING an existing codebase
- System architecture needs to be discovered before planning changes
- Goal is to preserve existing functionality while adding new capabilities
- Risk tolerance requires understanding current state before changes

**Preconditions:**
- Access to existing codebase (repository path provided or discoverable)
- Access to `.github/skills/meta-agentic-method/SKILL.md` for phase model
- Access to `.github/skills/meta-agentic-method/references.md` for MCP/skill discovery
- Access to `.github/skills/progress-report/progress-report.template.html` for report generation
- Repository authoring instructions at `.github/instructions/`

**Topology:**
- Brown-field is **in-repo**: install these artifacts into the existing repository via APM (see README § "Use on an Existing Codebase (APM)"), do not fork, and work alongside the source.
- Store docs, specs, wiki, ADRs, and verification artifacts under `docs/<scenario>-<slug>/` beside source. See `../skills/meta-agentic-method/SKILL.md` § "Repository Topology by Scenario".

**Out of Scope:**
- Building NEW systems from scratch → use `green-field.prompt.md`
- Migrating between platforms → use `modernization.prompt.md`

## Inputs

**Required:**
- `${input:scenarioDetail:Describe the existing system and desired changes, e.g., 'Add real-time notifications to Django monolith'}` — User's change request

**Optional Context:**
- Codebase location (repository path, branch)
- Constraints (must preserve existing APIs, backward compatibility)
- Access to existing documentation, architecture diagrams

**If Missing:**
Request scenario detail and codebase access from user, then STOP. Cannot proceed without change description and system location.

## Workflow

Execute these SDD phases in sequence. After EACH phase, update the HTML progress report.

### Phase 1: Intake & Clarification

**Objective:** Capture change request and resolve ambiguities.

**Actions:**
1. Scaffold `docs/<scenario>-<slug>/00-intake.md` from `../skills/meta-agentic-method/templates/00-intake.template.md`, fill placeholders, record user's scenario verbatim, document scenario classification (brown-field), and record codebase location.
2. (Optional) Scaffold `docs/<scenario>-<slug>/constitution.md` from `../skills/meta-agentic-method/templates/constitution.template.md` if user provides explicit principles/non-negotiables for the project.
3. Ask clarifying questions from this bank (adapt to scenario):
   - **Existing system location:** Where is the codebase? Branch/commit to work from?
   - **Access level:** Full codebase access, or API/documentation only?
   - **Change scope:** Which parts to modify vs. preserve? Backward compatibility required?
   - **Risk tolerance:** Can we refactor existing code, or only additive changes?
   - **Success criteria:** What defines successful integration of new functionality?
   - **Testing:** Existing test suite? Coverage requirements for new code?
   - **Deployment:** Existing CI/CD pipeline? Deployment constraints (downtime tolerance)?
   - **Execution approach:** Would you prefer **(A) Custom Agents** (standalone `.agent.md` files invoked individually) or **(B) Squad Team** (coordinator-orchestrated team with parallel execution, handoff enforcement, reviewer gates)? **Default to Squad Team** for multi-agent scenarios with complex orchestration needs; choose Custom Agents for simpler, linear workflows.
   - **SDD framework:** Would you like to use a spec-driven-development framework — **(1) None** (our native pipeline), **(2) GitHub Spec-Kit**, **(3) OpenSpec**, or **(4) Superpowers**? These are prescriptive and change the workflow somewhat. **Recommended default for this scenario: None.** If unsure, choose the recommended default. See `../skills/meta-agentic-method/SKILL.md` § "SDD Framework Selection (Optional)" for what each entails.
   
   **⚠️ MANDATORY:** You MUST present the **Execution Approach** and **SDD Framework** questions to the user and WAIT for their explicit answer before proceeding to the next phase. You may recommend this scenario's default, but DO NOT silently assume it. Only fall back to the default if the user explicitly defers (e.g., "use the default") or indicates they don't care.
4. Capture answers in `00-intake.md` under `## Clarifications`
5. Document the chosen execution approach in `00-intake.md` under `## Execution Approach`
6. Document the chosen SDD framework independently in `00-intake.md` under `## SDD Framework`
7. Document assumptions for any unanswered secondary questions (system location, access level, change scope, risk tolerance, success criteria, testing, deployment) under `## Assumptions`. DO NOT assume answers for Execution Approach or SDD Framework — these require explicit user input.

**Exit Gate:** Codebase location confirmed, change scope understood. **Execution Approach and SDD Framework are explicitly chosen by the user (not assumed).** No blocking unknowns.

---

### Phase 2: Discovery

**Objective:** Inventory existing system architecture, components, data flows, dependencies, and token-bounded source context.

**Actions:**
1. Read `../skills/meta-agentic-method/SKILL.md` § Discovery phase requirements and § "Source Context Ingestion (Repo-Wiki)".
2. Analyze existing codebase:
   - **System Architecture:** Identify major components (frontend, backend, databases, message queues, storage)
   - **Technology Stack:** Languages, frameworks, versions (check package.json, requirements.txt, pom.xml, etc.)
   - **Component Inventory:** Services, APIs, databases, external integrations
   - **Data Flows:** Trace input → processing → output for critical paths
   - **Dependency Graph:** Internal dependencies (module imports) + external (third-party services, libraries)
   - **Integration Points:** API contracts, message formats, database schemas
3. Generate `docs/<scenario>-<slug>/wiki/` by Pack → Summarize → Index:
   - Follow bundled `../skills/repo-wiki/SKILL.md` for the full Ingest → Query → Lint workflow and `index.md`/`log.md` wiki conventions; keep the templates below as produced artifacts.
   - Pick a packer that fits the repo (for example, repomix, gitingest, or code2prompt).
   - Summarize with `../skills/meta-agentic-method/templates/discovery-wiki.template.md`.
   - Create `docs/<scenario>-<slug>/wiki/wiki-index.json` with `../skills/meta-agentic-method/templates/wiki-index.template.json`.
   - Use the wiki as default downstream context; reference raw source on demand only.
4. Generate architecture diagram (Mermaid or ASCII art)
5. Scaffold `docs/<scenario>-<slug>/02-discovery.md` from `../skills/meta-agentic-method/templates/discovery.template.md`, fill placeholders, link to the wiki directory, generate discovery findings including all components, data flows, dependencies, integration points; highlight areas affected by proposed changes, and document unknowns or areas needing human confirmation.
6. Use tools to inventory:
   - `grep` for import/require statements (dependency mapping)
   - `glob` for file structure analysis
   - `view` for configuration files (package.json, docker-compose.yml, etc.)
   - `bash` to run existing tests/build commands (verify baseline)

**Exit Gate:** Complete component inventory, data flows traced, architecture diagram produced, repo-wiki generated, and no "unknown" placeholders without follow-up. **Baseline test pass-rate recorded** (if existing test suite present).

---

### Phase 3: Safety Net Establishment

**Objective:** Capture existing behavior via snapshot + characterization testing BEFORE altering code.

**Actions:**
1. Read `../skills/meta-agentic-method/SKILL.md` § Testing Strategy (Brown-Field)
2. **Snapshot Tests (Approval Tests):**
   - Identify critical outputs (API responses, rendered pages, data transformations, file generations)
   - Implement Approval Tests to lock current outputs (ApprovalTests.Java, ApprovalTests.Net, approvaltests-python)
   - Run tests → capture baselines → commit approved files
3. **Characterization Tests:**
   - Reverse-engineer unit tests from existing code
   - Focus on non-obvious behavior, edge cases, legacy quirks
   - Goal: document current behavior as executable tests (even if behavior is "wrong")
4. **Dependency Mapping:**
   - Run BMAD (Bayesian Model for Automated Dependency analysis) or static analysis
   - Map component dependencies → understand blast radius of changes
   - Document coupling hotspots in `docs/<scenario>-<slug>/03-safety-net.md`
5. **UI Baselines (if applicable):**
   - Use Playwright MCP server to capture screenshots of existing UI states
   - Record interaction flows (login, navigation, forms)
   - Store baselines for visual regression testing
6. Document testing approach in `docs/<scenario>-<slug>/03-safety-net.md`:
   - Approval test inventory (what outputs are locked)
   - Characterization test coverage (which behaviors documented)
   - Dependency graph (coupling analysis)
   - Playwright baseline inventory (UI states captured)
7. **Run all tests → verify green:** If tests fail, fix TESTS (update baselines), not code (code is ground truth)
8. Framework selection:
   - **Snapshot:** Approval Tests (language-specific library)
   - **Unit:** Existing test framework + new characterization tests
   - **Dependency:** BMAD, Understand, CodeScene, or `jdeps`/`dependency-cruiser`
   - **UI:** Playwright (via Playwright MCP server — see `../skills/meta-agentic-method/references.md`)

**Exit Gate:** Safety net green (all approval tests, characterization tests, Playwright baselines pass). Dependency map documented. **Only NOW** proceed to change analysis.

---

### Phase 4: Analysis

**Objective:** Decompose change request into functional domains and capability requirements.

**Actions:**
1. Read `../skills/meta-agentic-method/SKILL.md` § Analysis phase requirements
2. If an SDD framework was selected in Intake, follow its flow per `../skills/meta-agentic-method/SKILL.md` § "SDD Framework Selection (Optional)" and reconcile framework specs with native analysis artifacts.
3. Read `docs/<scenario>-<slug>/wiki/index.md` (produced in Discovery); derive functional domains from module responsibilities; map capability requirements to wiki evidence (cite page/source paths); flag wiki gaps for follow-up ingest.
4. Scaffold `docs/<scenario>-<slug>/01-analysis.md` from `../skills/meta-agentic-method/templates/analysis.template.md`, fill placeholders, generate:
   - **Functional Domains:** Break change request into domains (e.g., "Authentication Extension", "API Integration", "Data Migration")
   - **Success Criteria:** Measurable outcomes per domain (e.g., "OAuth flow completes in <2s", "Zero breaking changes to existing /api/v1 endpoints")
   - **Non-Functional Requirements:** Performance (no degradation), security (maintain existing posture), observability
   - **Preservation Requirements:** Explicitly list what MUST NOT change (backward compatibility constraints)
   - **Capability Requirements:** List needed agents, skills, instructions, MCP servers
5. Cross-reference Analysis with Discovery:
   - Map new domains to existing components (integration points)
   - Identify refactoring candidates vs. untouchable legacy code

**Exit Gate:** ≥2 functional domains defined, each with success criteria. Preservation requirements documented.

---

### Phase 5: Capability Mapping

**Objective:** Map required capabilities to concrete artifacts (MCP servers, skills, instructions, agents).

**Actions:**
1. Read `../skills/meta-agentic-method/SKILL.md` § Capability Acquisition Decision Tree
2. If an SDD framework was selected in Intake, include its required commands, skills, templates, and artifact locations in the capability map.
3. For each capability from Analysis:
   - **[A] REUSE:** Search `.github/skills/`, `.github/instructions/` for existing repo artifacts
     - Check if existing skills/instructions apply to legacy stack (e.g., `express-api.instructions.md`)
   - **[B] FIND:** Consult `../skills/meta-agentic-method/references.md` for external MCP servers or published skills
     - Use `web_fetch` to verify registry links
     - Use `find-skills` skill to discover published skills matching existing stack
   - **[C] BUILD:** If not found, mark for creation:
     - **C1:** MCP from OpenAPI → use `.github/skills/mcp-builder` (if existing system exposes OpenAPI spec)
     - **C2:** New skill → author following `.github/instructions/agent-skills.instructions.md`
     - **C3:** New instruction → author following `.github/instructions/instructions.instructions.md`
     - **C4:** Custom agent role → defer to Team Formation
4. Scaffold `docs/<scenario>-<slug>/03-capability-map.md` from `../skills/meta-agentic-method/templates/capability-map.template.md`, fill placeholders, generate capability rows:

   | Capability Needed | Type | Source | Status | Evidence |
   |-------------------|------|--------|--------|----------|
   | Express.js middleware authoring | Instruction | Reuse `express-api.instructions.md` | Available | .github/instructions/express-api.instructions.md |
   | OAuth 2.0 flow implementation | Skill | Find `oauth-integration-skill` | To Find | Search awesome-mcp-servers |
   | Existing API backward compat testing | Skill | Generate new | To Build | Custom validation for legacy endpoints |

5. Document discovery sources used

**Exit Gate:** Every capability mapped with source/status. No "Unknown" or "TBD" without action.

---

### Phase 6: Capability Acquisition

**Objective:** Obtain all "To Build" and "To Find" capabilities.

**Actions:**
1. For each "To Build" capability:
   - **MCP servers:** Locate OpenAPI spec (existing system docs), invoke `mcp-builder` skill, save to `mcp-servers/<name>/`
   - **Skills:** Author `SKILL.md` following `.github/instructions/agent-skills.instructions.md`:
     - Include frontmatter: `name`, `description` (with WHEN triggers and KEYWORDS)
     - Body: Mission, When to Use, Prerequisites, Workflow, **Gotchas** (critical for legacy integration), Troubleshooting
     - Bundle scripts/references/templates if needed
   - **Instructions:** Author `.instructions.md` following `.github/instructions/instructions.instructions.md`:
     - Frontmatter: `description`, `applyTo` glob (match existing codebase file patterns)
     - Body: standards, best practices, examples (include existing code patterns from Discovery)
2. For each "To Find" capability:
   - Search MCP registry, awesome-mcp-servers, skills.sh
   - Document search results, install/configure if found
   - Fallback to "To Build" if not found
3. Test generated MCP servers (connection verify)
4. Update `03-capability-map.md`: change "To Build"/"To Find" → "Available", add file path/URL evidence

**Exit Gate:** All capabilities marked "Available". Generated artifacts pass validation.

---

### Phase 7: Team Formation

**Objective:** Define agent team roles and capabilities; materialize using chosen execution approach.

**Actions:**
1. Read `../skills/meta-agentic-method/SKILL.md` § Team Formation Algorithm
2. Apply algorithm with brown-field specialization to define the **role roster** (independent of execution approach):
   - Map functional domains → agent roles (e.g., "API Extension" → `APIEnhancer` agent, "Legacy Compatibility" → `BackwardCompatValidator` agent)
   - Assign capabilities from Capability Map to agents (≥1 per agent)
   - **Key brown-field role:** Assign a `LegacyGuardian` or `CompatibilityValidator` agent to enforce preservation requirements
   - Define handoff protocol (what each agent produces, who consumes it)
   - Designate reviewer agent (typically validator responsible for existing functionality preservation)
3. Scaffold `docs/<scenario>-<slug>/04-team.md` from `../skills/meta-agentic-method/templates/team.template.md`, fill placeholders, generate team roster rows with the role roster:

   | Agent Name | Role | Assigned Skills | Assigned Instructions | MCP Servers | Handoff To |
   |------------|------|-----------------|----------------------|-------------|------------|
   | APIEnhancer | Add OAuth endpoints | `oauth-integration-skill` | `express-api.instructions.md` | - | CompatValidator |
   | CompatValidator | Verify no breaking changes | `api-compat-testing-skill` | - | `existing-api-mcp` | Documenter |
   | Documenter | Update API docs | `api-doc-skill` | - | - | - |

4. **Document the chosen execution approach** in `04-team.md` under `## Execution Approach`.
5. **Document the chosen SDD framework** in `04-team.md` under `## SDD Framework` and note how framework artifacts map to the native workflow.

**Exit Gate:** ≥2 agents defined (including compatibility/validation agent), each with ≥1 capability, acyclic handoff chain, reviewer designated.

---

#### SDD Framework (choose one from Intake)

Recommended default for brown-field work: **None (native — Squad/custom agents)**. This is optional and orthogonal to Execution Approach: framework controls how specs/workflow artifacts are produced; Execution Approach controls whether Custom Agents or Squad Team performs the work. For full details, follow `../skills/meta-agentic-method/SKILL.md` § "SDD Framework Selection (Optional)".

- **None — recommended native pipeline:** Run this prompt's existing Discovery, Safety Net, Analysis, Capability Mapping, Team Formation, Execution, Verification, and Handoff phases unchanged. Native `docs/<scenario>-<slug>/` artifacts remain the source of truth.
- **GitHub Spec-Kit:** Optional after Discovery stabilizes current behavior. Initialize with `uvx --from git+https://github.com/github/spec-kit.git specify init . --integration copilot`, feed discovered constraints into `/speckit.specify`, keep `/speckit.plan` conservative, use `/speckit.tasks`, and require `/speckit.analyze` before `/speckit.implement`. Spec-Kit supersedes native Analysis/Execution structure while native Discovery, Safety Net, Capability Mapping, Team Formation, Verification, and Handoff remain.
- **OpenSpec:** Optional for persistent change folders. Use `npm install -g @fission-ai/openspec@latest && openspec init`, capture current behavior in `openspec/specs/`, create one `openspec/changes/<change>/` per modification via `/opsx:propose` or `/opsx:explore`, then `/opsx:apply`, `/opsx:verify`, `/opsx:sync`, and `/opsx:archive`. OpenSpec reframes Analysis as change scoping and replaces Execution structure with change-folder tasks.
- **Superpowers:** Optional for refactoring or bug fixes. Use `brainstorming` → `writing-plans` → `test-driven-development` → `subagent-driven-development` or `executing-plans` → `requesting-code-review` → `finishing-a-development-branch`; pair it with the native safety net and characterization tests.

Framework artifacts live alongside, or in place of the native `docs/<scenario>-<slug>/` artifacts as defined in SKILL.md. The Confidence Rubric and Verification phases still apply; lower confidence if required framework artifacts are missing, stale, unsynced, or unverified.

#### Execution Approach (choose one from Intake)

The role roster defined above materializes differently based on the approach chosen in Phase 1.

##### **Approach A — Custom Agents**

**Use when:** Linear workflows, simple handoffs, direct agent invocation preferred.

**Steps:**
1. For each role in the roster table above, create a standalone agent file following `.github/instructions/agents.instructions.md`:
   - Path: `.github/agents/<role-name>.agent.md`
   - Frontmatter: `name`, `description`, `tools` (match assigned skills/MCP servers from roster)
   - Body: role charter, assigned skills/instructions/MCP servers, **preservation constraints**, handoff responsibilities
2. **Designate the Orchestrator** (`.github/agents/orchestrator.agent.md`) as the execution lead. It will read the roster and handoff DAG from `docs/<scenario>-<slug>/04-team.md` and drive Execution (Phase 8) by invoking the role agents as subagents.

**Artifact locations:**
- Agent files: `.github/agents/<role-name>.agent.md`
- Work products: `docs/<scenario>-<slug>/`

##### **Approach B — Squad Team**

**Use when:** Complex orchestration, parallel execution, reviewer gates, multi-agent coordination needed.

**Steps:**
1. The **Squad coordinator** (`.github/agents/squad.agent.md`) is already present in this repository — no installation needed
2. Hand the role roster to the Squad coordinator, which will hire members via its **native flow**:
   - Squad creates themed cast names (per `.squad/casting/registry.json`)
   - Squad generates `charter.md` and seeded `history.md` for each member
   - Squad updates `.squad/team.md` `## Members` table
   - Squad updates `.squad/routing.md` with task-to-agent routing
3. The Squad coordinator orchestrates execution (see Phase 8 for handoff details)

**Artifact locations:**
- Team roster: `.squad/team.md`
- Agent charters: `.squad/agents/<agent-name>/charter.md`
- Agent history: `.squad/agents/<agent-name>/history.md`
- Work products: `docs/<scenario>-<slug>/`
- Orchestration log: `.squad/orchestration-log/`

**Key point:** Both approaches use the **same skills, instructions, and MCP servers** from the roster. The difference is how agents are stored, invoked, and coordinated. Squad (Approach B) is pre-installed in this repository; see `../agents/squad.agent.md` for coordinator details.

---

### Phase 8: Execution (Iterative with Safety Net)

**Objective:** Execute changes using agent team, preserving existing functionality.

**Actions:**
1. **Pre-execution check:** Verify safety net is green (all baseline tests pass, snapshots captured)
2. Scaffold `docs/<scenario>-<slug>/plan.md` from `../skills/meta-agentic-method/templates/plan.template.md`, fill placeholders, generate execution plan with phases and milestones.
3. Scaffold `docs/<scenario>-<slug>/tasks.md` from `../skills/meta-agentic-method/templates/tasks.template.md`, fill placeholders, generate task breakdown per functional domain.
4. Create `docs/<scenario>-<slug>/execution-log.md` (append-only timestamped log)
5. **🚦 Human Validation Gate (MANDATORY):**
   - **STOP.** Do NOT invoke the execution lead, materialize/initiate the team for execution, or write any implementation code yet.
   - Present the user with a concise summary and the following generated planning documents for review in `docs/<scenario>-<slug>/`:
     - `00-intake.md` (change request and clarifications)
     - `01-discovery.md` (existing system architecture and component inventory)
     - `wiki/` (repo-wiki index and summaries)
     - `02-analysis.md` (change impact analysis and success criteria)
     - `03-capability-map.md` (MCP servers, skills, instructions, agents)
     - `04-team.md` (agent roster and responsibilities)
     - `06-testing-strategy.md` (safety net and regression test plan)
     - `plan.md` (execution plan with phases and milestones)
     - `tasks.md` (task breakdown per functional domain)
     - Any SDD-framework-native specs generated if a framework was chosen (e.g., Spec-Kit `spec.md`/`plan.md`/`tasks.md`, OpenSpec change proposal, Superpowers plan)
   - Ask the user to **review these documents in person and explicitly approve** before execution proceeds.
   - **Make explicit:** The team/execution lead will be initiated and building will begin ONLY after approval.
   - **WAIT** for the user's explicit approval. If the user requests changes, revise the relevant documents and re-present this gate. Proceed to the next step ONLY once the user approves.
6. **Hand off to execution lead:**
   - **Approach A:** Invoke the **Orchestrator** (`.github/agents/orchestrator.agent.md`). It reads the roster and plan/tasks from `docs/<scenario>-<slug>/`, invokes role agents as subagents in handoff/parallel order, enforces the reviewer gate (strict lockout — author can't fix own rejected work), maintains `execution-log.md`, and reports back when done.
   - **Approach B:** The **Squad coordinator** (`.github/agents/squad.agent.md`) drives execution — fan-out to members, reviewer gates, Scribe logging — per its charter.
7. **If an SDD framework was selected at Intake:**
   - The execution lead must (a) **generate the framework's native specs** in addition to the `docs/<scenario>-<slug>/` specs already created (Spec-Kit: `spec.md`/`plan.md`/`tasks.md`; OpenSpec: change proposal under `openspec/changes/<id>/`; Superpowers: plan via `writing-plans`), keeping them derived from / consistent with the `docs/` specs, and (b) **explicitly run that framework's implement loop** (Spec-Kit: `/speckit.implement`; OpenSpec: `/opsx:apply` + `/opsx:verify`; Superpowers: `subagent-driven-development` or `executing-plans`).
   - Reference `../skills/meta-agentic-method/references/sdd-frameworks.md` for per-framework detail.
8. Record architecture decisions in `docs/<scenario>-<slug>/adr/*.md`:
   - Use standard ADR format: Status, Context, Decision, Consequences
   - Examples: OAuth library choice, session storage strategy, API versioning approach

**Exit Gate:** All success criteria met, all preservation requirements validated, existing tests pass, no blockers.

---

### Phase 9: Verification

**Objective:** Validate changes against requirements AND preservation of existing functionality.

**Actions:**
1. Scaffold `docs/<scenario>-<slug>/verification.md` from `../skills/meta-agentic-method/templates/verification.template.md`, fill placeholders, generate:
   - **Requirements Traceability Matrix:** Map each success criterion → artifact(s) that satisfy it
   - **Backward Compatibility Report:** Document existing functionality preserved (test pass rates, API contract verification)
   - **Test Results:** Pass/fail per criterion (run automated tests)
   - **Regression Analysis:** Compare baseline metrics (from execution pre-check) to post-change metrics
   - **Known Limitations:** Document gaps with workarounds
2. Scaffold `docs/<scenario>-<slug>/checklist.md` from `../skills/meta-agentic-method/templates/checklist.template.md`, fill placeholders, generate quality gate checklist.
3. Calculate **Confidence Score** using rubric from `../skills/meta-agentic-method/SKILL.md`:
   - Score 6 dimensions (0-100 each): Capability Coverage, MCP Availability, Skill/Instruction Coverage, Data/Domain Knowledge, Spec Completeness, Verification Status
   - Weights: 25%, 20%, 15%, 15%, 15%, 10%
   - Formula: `sum(dimension_score × weight)`
   - Band: High (≥80, green), Medium (50-79, amber), Low (<50, red)
   - **Brown-field adjustment:** Penalize Verification Status if existing test pass rate decreased
4. Document score breakdown in `verification.md`

**Exit Gate:** ≥80% success criteria met (or documented exceptions), no regression in existing functionality, confidence score calculated.

---

### Phase 10: Handoff

**Objective:** Package deliverables for user handoff.

**Actions:**
1. Scaffold `docs/<scenario>-<slug>/README.md` from `../skills/meta-agentic-method/templates/summary.template.md`, fill placeholders, generate:
   - **Executive Summary:** 2-3 paragraph overview of changes made
   - **Artifacts Inventory:** Links to all docs, code, configs
   - **Confidence Score:** Overall score with dimension breakdown
   - **Migration/Deployment Steps:** How to roll out changes (phased deployment, feature flags, rollback plan)
   - **Backward Compatibility Notes:** What was preserved, any breaking changes (with migration guide)
   - **Next Steps:** Clear actions for user (e.g., "Deploy to staging", "Update API documentation")
   - **Known Gaps:** Documented limitations and recommended follow-up
2. **Generate HTML Report:**
   - Copy `../skills/progress-report/progress-report.template.html` → `docs/<scenario>-<slug>/progress-report.html`
   - Update `<script id="report-data">` JSON block with:
     ```json
     {
       "scenario": "<project name>",
       "promptType": "brown-field",
       "generatedAt": "<ISO8601 timestamp>",
       "currentPhase": "Handoff",
       "overallConfidence": {
         "score": <calculated score>,
         "interpretation": "<one sentence summary>"
       },
       "confidenceDimensions": [
         {"name": "Capability Coverage", "score": <0-100>, "weight": 0.25},
         {"name": "MCP Availability", "score": <0-100>, "weight": 0.20},
         {"name": "Skill/Instruction Coverage", "score": <0-100>, "weight": 0.15},
         {"name": "Data/Domain Knowledge", "score": <0-100>, "weight": 0.15},
         {"name": "Spec Completeness", "score": <0-100>, "weight": 0.15},
         {"name": "Verification Status", "score": <0-100>, "weight": 0.10}
       ],
       "phases": [
         {"name": "Intake & Clarification", "status": "done", "artifact": "00-intake.md"},
         {"name": "Discovery", "status": "done", "artifact": "02-discovery.md"},
         {"name": "Analysis", "status": "done", "artifact": "01-analysis.md"},
         {"name": "Capability Mapping", "status": "done", "artifact": "03-capability-map.md"},
         {"name": "Capability Acquisition", "status": "done", "artifact": null},
         {"name": "Team Formation", "status": "done", "artifact": "04-team.md"},
         {"name": "Execution", "status": "done", "artifact": "execution-log.md"},
         {"name": "Verification", "status": "done", "artifact": "verification.md"},
         {"name": "Handoff", "status": "done", "artifact": "README.md"}
       ],
       "team": [
         {"name": "<agent>", "role": "<role>", "skills": ["..."], "instructions": ["..."], "mcpServers": ["..."]}
       ],
       "capabilities": [
         {"capability": "<name>", "status": "found|built|reused|missing", "evidence": "<details>"}
       ],
       "mcpServers": [
         {"name": "<server>", "source": "registry|built from <spec>", "connectionStatus": "connected|disconnected"}
       ],
       "risks": [
         {"severity": "critical|high|medium|low", "description": "<risk detail>"}
       ]
     }
     ```
   - Verify report renders correctly in browser

**Exit Gate:** README self-contained, HTML report renders with live confidence score, migration/deployment steps clear.

---

### Phase 11: Template Feedback (If Applicable)

**Objective:** Report template-level gaps back to upstream for continuous improvement.

**Actions:**
1. **Review execution for template friction:**
   - Did a capability gap force manual implementation when the template catalog should have included it?
   - Was a reference broken, outdated, or missing in `../skills/meta-agentic-method/references.md`?
   - Did unclear prompt instructions cause rework or delay?
   - Did missing guidance (ADR template, validation checklist) hurt a confidence dimension by >5 points?
2. **If YES to any:** Invoke the `github-issues` skill (`../skills/github-issues/SKILL.md`) to file an issue:
   - **Repository:** `pascalvanderheiden/meta-agentic-template` (upstream template repo; forks override this)
   - **Label:** `template-feedback` (required)
   - **Issue body:** Use structured template from `../skills/meta-agentic-method/SKILL.md` § Upstream Template Feedback Loop (Scenario, Prompt, Phase, What was missing, Suggested improvement, Confidence impact with rubric dimension + point delta, Repro/context)
3. **If NO gaps found:** Skip this phase. No action required.

**Exit Gate:** Template feedback filed (if applicable), or confirmed no template-level gaps detected.

---

## Progressive Report Updates

**CRITICAL:** After EACH phase (not just at handoff), update `progress-report.html` JSON block:
- Change `currentPhase` field
- Update corresponding phase `status` (pending → in-progress → done)
- Add new team members, capabilities, MCP servers as discovered
- Recalculate confidence dimensions as data becomes available
- Update `generatedAt` timestamp

This ensures real-time visibility into progress.

## Output Expectations

**Primary Deliverables:**
- `docs/<scenario>-<slug>/` folder with all phase artifacts (includes Discovery artifact and `wiki/` repo-wiki)
- Custom agent files in `.github/agents/` (if new agents created)
- Skills in `.github/skills/<name>/SKILL.md` (if new skills created)
- Instructions in `.github/instructions/<name>.instructions.md` (if new instructions created)
- MCP servers in `mcp-servers/<name>/` (if generated from OpenAPI)
- Self-rendering `progress-report.html` with confidence score

**Artifact Count (Brown-Field):**
- Minimum 9 markdown docs (intake, discovery, analysis, capability-map, team, execution-log, verification, README, ≥1 ADR)
- HTML report (1 file)
- ≥2 custom agent files (including compatibility validator)
- Variable skills/instructions/MCP based on scenario

**Success Indicators:**
- All 9 SDD phases completed (includes Discovery)
- Confidence score ≥50 (Medium or High band)
- Existing test pass rate maintained or improved
- HTML report displays confidence gauge correctly
- All "To Build" capabilities now "Available"

## Quality Assurance / Validation

Run this checklist before declaring workflow complete:

- [ ] `00-intake.md` exists with clarifying questions answered
- [ ] `02-discovery.md` has system architecture diagram, component inventory, and link to `wiki/`
- [ ] `docs/<scenario>-<slug>/wiki/wiki-index.json` exists and downstream phases use wiki context by default
- [ ] `01-analysis.md` has ≥2 functional domains with success criteria AND preservation requirements
- [ ] `03-capability-map.md` shows no "Unknown" or "TBD" statuses
- [ ] All generated `*.agent.md` files follow `.github/instructions/agents.instructions.md`
- [ ] All generated `SKILL.md` files follow `.github/instructions/agent-skills.instructions.md` (description has WHEN triggers)
- [ ] All generated `*.instructions.md` files follow `.github/instructions/instructions.instructions.md` (applyTo glob matches existing codebase patterns)
- [ ] `04-team.md` has ≥2 agents (including compatibility/validation role) with capability assignments
- [ ] `execution-log.md` has baseline test results + timestamped entries
- [ ] `verification.md` contains backward compatibility report + confidence score with dimension breakdown
- [ ] `README.md` has executive summary, backward compatibility notes, migration steps, next steps
- [ ] `progress-report.html` exists and renders (open in browser)
- [ ] Report JSON `confidenceDimensions` weights sum to 1.0
- [ ] Report `overallConfidence.score` matches formula: `sum(dimension_score × weight)`
- [ ] All MCP servers listed in report have connection status
- [ ] No secrets or credentials in generated files
- [ ] Existing test suite still passes (or regressions documented)

## Example Invocation

**User Prompt:**  
"Add OAuth to legacy Express.js API (v4.17) without breaking existing /api/v1 endpoints"

**Expected Flow:**
1. Intake: Ask codebase location, access level, OAuth provider (Google/GitHub?), test coverage expectations
2. Discovery: Analyze Express app structure, inventory existing /api/v1 routes, identify session management (express-session?), map dependencies (passport.js already present?)
3. Analysis: Domains = [OAuth Integration, Session Extension, API Backward Compatibility], Success = "OAuth flow <2s", Preservation = "All existing /api/v1 tests pass"
4. Capability Mapping: Find `passport-oauth2` skill, reuse `express-api.instructions.md`, mark `api-compat-testing` skill "To Build"
5. Capability Acquisition: Generate `api-compat-testing` skill with existing route contract validation
6. Team Formation: Agents = [OAuthIntegrator, SessionEnhancer, CompatValidator]
7. Execution: Baseline (run existing tests → 87/87 passing), integrate OAuth, re-run tests → 87/87 still passing
8. Verification: All new OAuth tests pass, no regressions, confidence = 85 (High/Green)
9. Handoff: README with OAuth setup steps, migration guide, report shows 85 score with green gauge

---

**Related Workflows:**
- For new systems: `.github/prompts/green-field.prompt.md`
- For migrations: `.github/prompts/modernization.prompt.md`

**References:**
- SDD phases: `../skills/meta-agentic-method/SKILL.md`
- MCP/skill catalog: `../skills/meta-agentic-method/references.md`
- Report template: `../skills/progress-report/progress-report.template.html`
