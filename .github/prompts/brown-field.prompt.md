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
- Access to `.github/prompts/shared/meta-agentic-method.md` for phase model
- Access to `.github/prompts/references.md` for MCP/skill discovery
- Access to `.github/prompts/templates/progress-report.template.html` for report generation
- Repository authoring instructions at `.github/instructions/`

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
1. Create `docs/<scenario>-<slug>/00-intake.md`:
   - Record user's scenario verbatim
   - Document scenario classification (brown-field)
   - Record codebase location
2. Ask clarifying questions from this bank (adapt to scenario):
   - **Existing system location:** Where is the codebase? Branch/commit to work from?
   - **Access level:** Full codebase access, or API/documentation only?
   - **Change scope:** Which parts to modify vs. preserve? Backward compatibility required?
   - **Risk tolerance:** Can we refactor existing code, or only additive changes?
   - **Success criteria:** What defines successful integration of new functionality?
   - **Testing:** Existing test suite? Coverage requirements for new code?
   - **Deployment:** Existing CI/CD pipeline? Deployment constraints (downtime tolerance)?
   - **Execution approach:** Would you prefer **(A) Custom Agents** (standalone `.agent.md` files invoked individually) or **(B) Squad Team** (coordinator-orchestrated team with parallel execution, handoff enforcement, reviewer gates)? **Default to Squad Team** for multi-agent scenarios with complex orchestration needs; choose Custom Agents for simpler, linear workflows.
3. Capture answers in `00-intake.md` under `## Clarifications`
4. Document the chosen execution approach in `00-intake.md` under `## Execution Approach`
5. Document assumptions for any unanswered questions under `## Assumptions`

**Exit Gate:** Codebase location confirmed, change scope understood. No blocking unknowns.

---

### Phase 2: Discovery

**Objective:** Inventory existing system architecture, components, data flows, and dependencies.

**Actions:**
1. Read `./shared/meta-agentic-method.md` § Discovery phase requirements
2. Analyze existing codebase:
   - **System Architecture:** Identify major components (frontend, backend, databases, message queues, storage)
   - **Technology Stack:** Languages, frameworks, versions (check package.json, requirements.txt, pom.xml, etc.)
   - **Component Inventory:** Services, APIs, databases, external integrations
   - **Data Flows:** Trace input → processing → output for critical paths
   - **Dependency Graph:** Internal dependencies (module imports) + external (third-party services, libraries)
   - **Integration Points:** API contracts, message formats, database schemas
3. Generate architecture diagram (Mermaid or ASCII art)
4. Create `docs/<scenario>-<slug>/02-discovery.md`:
   - Include all findings above
   - Highlight areas affected by proposed changes
   - Document unknowns or areas needing human confirmation
5. Use tools to inventory:
   - `grep` for import/require statements (dependency mapping)
   - `glob` for file structure analysis
   - `view` for configuration files (package.json, docker-compose.yml, etc.)
   - `bash` to run existing tests/build commands (verify baseline)

**Exit Gate:** Complete component inventory, data flows traced, architecture diagram produced. No "unknown" placeholders without follow-up.

---

### Phase 3: Analysis

**Objective:** Decompose change request into functional domains and capability requirements.

**Actions:**
1. Read `./shared/meta-agentic-method.md` § Analysis phase requirements
2. Create `docs/<scenario>-<slug>/01-analysis.md`:
   - **Functional Domains:** Break change request into domains (e.g., "Authentication Extension", "API Integration", "Data Migration")
   - **Success Criteria:** Measurable outcomes per domain (e.g., "OAuth flow completes in <2s", "Zero breaking changes to existing /api/v1 endpoints")
   - **Non-Functional Requirements:** Performance (no degradation), security (maintain existing posture), observability
   - **Preservation Requirements:** Explicitly list what MUST NOT change (backward compatibility constraints)
   - **Capability Requirements:** List needed agents, skills, instructions, MCP servers
3. Cross-reference Analysis with Discovery:
   - Map new domains to existing components (integration points)
   - Identify refactoring candidates vs. untouchable legacy code

**Exit Gate:** ≥2 functional domains defined, each with success criteria. Preservation requirements documented.

---

### Phase 4: Capability Mapping

**Objective:** Map required capabilities to concrete artifacts (MCP servers, skills, instructions, agents).

**Actions:**
1. Read `./shared/meta-agentic-method.md` § Capability Acquisition Decision Tree
2. For each capability from Analysis:
   - **[A] REUSE:** Search `.github/skills/`, `.github/instructions/` for existing repo artifacts
     - Check if existing skills/instructions apply to legacy stack (e.g., `express-api.instructions.md`)
   - **[B] FIND:** Consult `./references.md` for external MCP servers or published skills
     - Use `web_fetch` to verify registry links
     - Use `find-skills` skill to discover published skills matching existing stack
   - **[C] BUILD:** If not found, mark for creation:
     - **C1:** MCP from OpenAPI → use `.github/skills/mcp-builder` (if existing system exposes OpenAPI spec)
     - **C2:** New skill → author following `.github/instructions/agent-skills.instructions.md`
     - **C3:** New instruction → author following `.github/instructions/instructions.instructions.md`
     - **C4:** Custom agent role → defer to Team Formation
3. Create `docs/<scenario>-<slug>/03-capability-map.md`:

   | Capability Needed | Type | Source | Status | Evidence |
   |-------------------|------|--------|--------|----------|
   | Express.js middleware authoring | Instruction | Reuse `express-api.instructions.md` | Available | .github/instructions/express-api.instructions.md |
   | OAuth 2.0 flow implementation | Skill | Find `oauth-integration-skill` | To Find | Search awesome-mcp-servers |
   | Existing API backward compat testing | Skill | Generate new | To Build | Custom validation for legacy endpoints |

4. Document discovery sources used

**Exit Gate:** Every capability mapped with source/status. No "Unknown" or "TBD" without action.

---

### Phase 5: Capability Acquisition

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

### Phase 6: Team Formation

**Objective:** Define agent team roles and capabilities; materialize using chosen execution approach.

**Actions:**
1. Read `./shared/meta-agentic-method.md` § Team Formation Algorithm
2. Apply algorithm with brown-field specialization to define the **role roster** (independent of execution approach):
   - Map functional domains → agent roles (e.g., "API Extension" → `APIEnhancer` agent, "Legacy Compatibility" → `BackwardCompatValidator` agent)
   - Assign capabilities from Capability Map to agents (≥1 per agent)
   - **Key brown-field role:** Assign a `LegacyGuardian` or `CompatibilityValidator` agent to enforce preservation requirements
   - Define handoff protocol (what each agent produces, who consumes it)
   - Designate reviewer agent (typically validator responsible for existing functionality preservation)
3. Create `docs/<scenario>-<slug>/04-team.md` with the **shared role roster**:

   | Agent Name | Role | Assigned Skills | Assigned Instructions | MCP Servers | Handoff To |
   |------------|------|-----------------|----------------------|-------------|------------|
   | APIEnhancer | Add OAuth endpoints | `oauth-integration-skill` | `express-api.instructions.md` | - | CompatValidator |
   | CompatValidator | Verify no breaking changes | `api-compat-testing-skill` | - | `existing-api-mcp` | Documenter |
   | Documenter | Update API docs | `api-doc-skill` | - | - | - |

4. **Document the chosen execution approach** in `04-team.md` under `## Execution Approach`.

**Exit Gate:** ≥2 agents defined (including compatibility/validation agent), each with ≥1 capability, acyclic handoff chain, reviewer designated.

---

#### Execution Approach (choose one from Intake)

The role roster defined above materializes differently based on the approach chosen in Phase 1.

##### **Approach A — Custom Agents**

**Use when:** Linear workflows, simple handoffs, direct agent invocation preferred.

**Steps:**
1. For each role in the roster table above, create a standalone agent file following `.github/instructions/agents.instructions.md`:
   - Path: `.github/agents/<role-name>.agent.md`
   - Frontmatter: `name`, `description`, `tools` (match assigned skills/MCP servers from roster)
   - Body: role charter, assigned skills/instructions/MCP servers, **preservation constraints**, handoff responsibilities
2. Each agent is invoked individually by the user or by other agents using the `task` tool
3. Agents coordinate via documented handoff protocol in their charters

**Artifact locations:**
- Agent files: `.github/agents/<role-name>.agent.md`
- Work products: `docs/<scenario>-<slug>/`

##### **Approach B — Squad Team**

**Use when:** Complex orchestration, parallel execution, reviewer gates, multi-agent coordination needed.

**Steps:**
1. The **Squad coordinator** (`.github/agents/squad.agent.md`) is already present in this repository — no installation needed
2. Hire the roles from the roster table as **Squad team members**:
   - For each role, create `.squad/agents/<role-name>/charter.md` with:
     - Role definition (from roster table)
     - Assigned skills, instructions, MCP servers (same as roster)
     - **Preservation constraints** (critical for brown-field)
     - Handoff responsibilities
   - Create `.squad/agents/<role-name>/history.md` seeded with project context
3. Update `.squad/team.md` with the team roster under `## Members`
4. The Squad coordinator orchestrates execution:
   - Spawns agents using the `task` tool
   - Inlines each agent's `charter.md` into spawn prompts
   - Enforces handoff protocol and reviewer gates
   - Supports parallel fan-out for independent tasks
   - Maintains orchestration log via Scribe

**Artifact locations:**
- Team roster: `.squad/team.md`
- Agent charters: `.squad/agents/<role-name>/charter.md`
- Agent history: `.squad/agents/<role-name>/history.md`
- Work products: `docs/<scenario>-<slug>/`
- Orchestration log: `.squad/orchestration-log/`

**Key point:** Both approaches use the **same skills, instructions, and MCP servers** from the roster. The difference is how agents are stored, invoked, and coordinated. Squad (Approach B) is pre-installed in this repository; see `../agents/squad.agent.md` for coordinator details.

---

### Phase 7: Execution (Iterative)

**Objective:** Execute changes using agent team while preserving existing functionality.

**Actions:**
1. Create `docs/<scenario>-<slug>/execution-log.md` (append-only timestamped log)
2. **Pre-execution baseline:**
   - Run existing tests: `bash` to execute test suite (document baseline pass/fail)
   - Capture existing metrics (if applicable): API response times, error rates
   - Log baseline: `## [timestamp] Baseline: <test count> tests, <pass count> passing`
3. For each functional domain (in dependency order):
   - Instantiate responsible agent(s) with their assigned capabilities
   - Agent produces spec/code artifacts
   - **After each agent's work:** Run compatibility checks (existing tests must still pass)
   - Log agent actions: `## [ISO8601 timestamp] <AgentName>: <Action>`
   - Handoff to next agent in chain
4. Record architecture decisions in `docs/<scenario>-<slug>/adr/*.md`:
   - Use standard ADR format: Status, Context, Decision, Consequences
   - Examples: OAuth library choice, session storage strategy, API versioning approach
5. Iterate until all success criteria from Analysis met

**Exit Gate:** All success criteria met, all preservation requirements validated, existing tests pass, no blockers.

---

### Phase 8: Verification

**Objective:** Validate changes against requirements AND preservation of existing functionality.

**Actions:**
1. Create `docs/<scenario>-<slug>/verification.md`:
   - **Requirements Traceability Matrix:** Map each success criterion → artifact(s) that satisfy it
   - **Backward Compatibility Report:** Document existing functionality preserved (test pass rates, API contract verification)
   - **Test Results:** Pass/fail per criterion (run automated tests)
   - **Regression Analysis:** Compare baseline metrics (from execution pre-check) to post-change metrics
   - **Known Limitations:** Document gaps with workarounds
2. Calculate **Confidence Score** using rubric from `./shared/meta-agentic-method.md`:
   - Score 6 dimensions (0-100 each): Capability Coverage, MCP Availability, Skill/Instruction Coverage, Data/Domain Knowledge, Spec Completeness, Verification Status
   - Weights: 25%, 20%, 15%, 15%, 15%, 10%
   - Formula: `sum(dimension_score × weight)`
   - Band: High (≥80, green), Medium (50-79, amber), Low (<50, red)
   - **Brown-field adjustment:** Penalize Verification Status if existing test pass rate decreased
3. Document score breakdown in `verification.md`

**Exit Gate:** ≥80% success criteria met (or documented exceptions), no regression in existing functionality, confidence score calculated.

---

### Phase 9: Handoff

**Objective:** Package deliverables for user handoff.

**Actions:**
1. Create `docs/<scenario>-<slug>/README.md`:
   - **Executive Summary:** 2-3 paragraph overview of changes made
   - **Artifacts Inventory:** Links to all docs, code, configs
   - **Confidence Score:** Overall score with dimension breakdown
   - **Migration/Deployment Steps:** How to roll out changes (phased deployment, feature flags, rollback plan)
   - **Backward Compatibility Notes:** What was preserved, any breaking changes (with migration guide)
   - **Next Steps:** Clear actions for user (e.g., "Deploy to staging", "Update API documentation")
   - **Known Gaps:** Documented limitations and recommended follow-up
2. **Generate HTML Report:**
   - Copy `./templates/progress-report.template.html` → `docs/<scenario>-<slug>/progress-report.html`
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

**Exit Gate:** README self-contained, HTML report renders with live confidence score.

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
- `docs/<scenario>-<slug>/` folder with all phase artifacts (includes Discovery artifact)
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
- [ ] `02-discovery.md` has system architecture diagram and component inventory
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
- SDD phases: `./shared/meta-agentic-method.md`
- MCP/skill catalog: `./references.md`
- Report template: `./templates/progress-report.template.html`
