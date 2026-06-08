---
description: 'Orchestrate green-field development using Spec-Driven Development (SDD): gather requirements, form specialized agent team, acquire capabilities (MCP/skills/instructions), execute iteratively, generate HTML progress reports with confidence scoring.'
name: 'green-field'
agent: 'agent'
tools: ['view', 'edit', 'create', 'bash', 'web_fetch', 'grep', 'glob', 'task']
argument-hint: 'Describe the project to build, e.g., "Customer portal with Next.js and PostgreSQL"'
---

# Green-Field Development Workflow

Orchestrate complete green-field development from requirements to deliverable using the Meta-Agentic SDD methodology.

## Mission

Execute spec-driven green-field development by decomposing user requirements into functional domains, forming a custom agent team with discovered/built capabilities (MCP servers, skills, instructions), and producing verified deliverables with real-time confidence scoring.

## Scope & Preconditions

**Use This Workflow When:**
- User requests building a NEW system from scratch (no existing codebase)
- Requirements are high-level or incomplete (clarifications needed)
- Target technology stack is known or discoverable
- Goal is production-ready deliverables with documentation

**Preconditions:**
- Access to `.github/prompts/shared/meta-agentic-method.md` for phase model
- Access to `.github/prompts/references.md` for MCP/skill discovery
- Access to `.github/prompts/templates/progress-report.template.html` for report generation
- Repository authoring instructions at `.github/instructions/`

**Out of Scope:**
- Migrating or modernizing existing systems → use `modernization.prompt.md`
- Extending existing codebases → use `brown-field.prompt.md`

## Inputs

**Required:**
- `${input:scenarioDetail:Describe what to build, e.g., 'E-commerce checkout API with Stripe integration'}` — User's project description

**Optional Context:**
- Target technology stack preferences
- Non-functional requirements (performance, security, scalability)
- Timeline or phasing constraints

**If Missing:**
Request scenario detail from user and STOP. Cannot proceed without project description.

## Workflow

Execute these SDD phases in sequence. After EACH phase, update the HTML progress report.

### Phase 1: Intake & Clarification

**Objective:** Capture scenario and resolve ambiguities.

**Actions:**
1. Create `docs/<scenario>-<slug>/00-intake.md`:
   - Record user's scenario verbatim
   - Document scenario classification (green-field)
2. Ask clarifying questions from this bank (adapt to scenario):
   - **Target stack:** Which technologies/frameworks/platforms (or recommend based on requirements)?
   - **Constraints:** Budget limits, deployment environment (cloud/on-prem), compliance requirements?
   - **Non-functionals:** Expected traffic/load, latency targets, availability SLA?
   - **Success criteria:** What defines "done"? What metrics measure success?
   - **Scope boundaries:** What's explicitly OUT of scope (e.g., mobile apps, internationalization)?
   - **Data/integration:** External APIs, databases, third-party services to integrate?
   - **Execution approach:** Would you prefer **(A) Custom Agents** (standalone `.agent.md` files invoked individually) or **(B) Squad Team** (coordinator-orchestrated team with parallel execution, handoff enforcement, reviewer gates)? **Default to Squad Team** for multi-agent scenarios with complex orchestration needs; choose Custom Agents for simpler, linear workflows.
3. Capture answers in `00-intake.md` under `## Clarifications`
4. Document the chosen execution approach in `00-intake.md` under `## Execution Approach`
5. Document assumptions for any unanswered questions under `## Assumptions`

**Exit Gate:** No blocking unknowns remain. Proceed only when scenario is unambiguous.

---

### Phase 2: Analysis

**Objective:** Decompose scenario into functional domains and capability requirements.

**Actions:**
1. Read `./shared/meta-agentic-method.md` § Analysis phase requirements
2. Create `docs/<scenario>-<slug>/01-analysis.md`:
   - **Functional Domains:** Break scenario into ≥2 distinct domains (e.g., Authentication, API Layer, Data Persistence, Monitoring)
   - **Success Criteria:** Measurable outcomes per domain (e.g., "API supports 1000 req/sec", "Zero plaintext secrets in code")
   - **Non-Functional Requirements:** Performance, security, scalability, observability
   - **Capability Requirements:** List needed agents, skills, instructions, MCP servers (names only; defer implementation)
3. Validate decomposition: each domain has clear boundaries and success criteria

**Exit Gate:** ≥2 functional domains defined, each with measurable success criteria.

---

### Phase 3: Capability Mapping

**Objective:** Map required capabilities to concrete artifacts (MCP servers, skills, instructions, agents).

**Actions:**
1. Read `./shared/meta-agentic-method.md` § Capability Acquisition Decision Tree
2. For each capability from Analysis:
   - **[A] REUSE:** Search `.github/skills/`, `.github/instructions/` for existing repo artifacts
   - **[B] FIND:** Consult `./references.md` for external MCP servers or published skills
     - Use `web_fetch` to verify registry links and check MCP availability
     - Use `find-skills` skill to discover published skills
   - **[C] BUILD:** If not found, mark for creation:
     - **C1:** MCP from OpenAPI → use `.github/skills/mcp-builder`
     - **C2:** New skill → author following `.github/instructions/agent-skills.instructions.md`
     - **C3:** New instruction → author following `.github/instructions/instructions.instructions.md`
     - **C4:** Custom agent role → defer to Team Formation
3. Create `docs/<scenario>-<slug>/03-capability-map.md`:

   | Capability Needed | Type | Source | Status | Evidence |
   |-------------------|------|--------|--------|----------|
   | PostgreSQL schema management | MCP server | `postgres-mcp` (registry) | Available | https://registry.modelcontextprotocol.io/... |
   | Next.js project setup | Skill | Generate new | To Build | Follow agent-skills.instructions.md |
   | Stripe integration | Instruction | Generate new | To Build | Stripe API docs + instructions.instructions.md |

4. Document discovery sources used (which registries checked, search queries run)

**Exit Gate:** Every capability mapped with source/status. No "Unknown" or "TBD" without action.

---

### Phase 4: Capability Acquisition

**Objective:** Obtain all "To Build" capabilities.

**Actions:**
1. For each "To Build" capability:
   - **MCP servers:** Locate OpenAPI spec, invoke `mcp-builder` skill, save to `mcp-servers/<name>/`
   - **Skills:** Author `SKILL.md` following `.github/instructions/agent-skills.instructions.md`:
     - Include frontmatter: `name`, `description` (with WHEN triggers and KEYWORDS)
     - Body: Mission, When to Use, Prerequisites, Workflow, Gotchas, Troubleshooting
     - Bundle scripts/references/templates if needed
   - **Instructions:** Author `.instructions.md` following `.github/instructions/instructions.instructions.md`:
     - Frontmatter: `description`, `applyTo` glob
     - Body: standards, best practices, examples
2. Test generated MCP servers (connection verify)
3. Update `03-capability-map.md`: change "To Build" → "Available", add file path evidence

**Exit Gate:** All capabilities marked "Available". Generated artifacts pass validation.

---

### Phase 5: Team Formation

**Objective:** Define agent team roles and capabilities; materialize using chosen execution approach.

**Actions:**
1. Read `./shared/meta-agentic-method.md` § Team Formation Algorithm
2. Apply algorithm to define the **role roster** (independent of execution approach):
   - Map functional domains → agent roles (e.g., "Data Persistence" → `DatabaseArchitect` agent)
   - Assign capabilities from Capability Map to agents (≥1 per agent)
   - Define handoff protocol (what each agent produces, who consumes it)
   - Designate reviewer agent (typically `Validator` or last in chain)
3. Create `docs/<scenario>-<slug>/04-team.md` with the **shared role roster**:

   | Agent Name | Role | Assigned Skills | Assigned Instructions | MCP Servers | Handoff To |
   |------------|------|-----------------|----------------------|-------------|------------|
   | APIBuilder | Build REST API endpoints | `nextjs-api-skill` | `api-security.instructions.md` | - | DatabaseArchitect |
   | DatabaseArchitect | Design schema, migrations | `db-design-skill` | `postgres.instructions.md` | `postgres-mcp` | Validator |
   | Validator | Verify requirements met | `validation-skill` | - | - | - |

4. **Document the chosen execution approach** in `04-team.md` under `## Execution Approach`.

**Exit Gate:** ≥2 agents defined, each with ≥1 capability, acyclic handoff chain, reviewer designated.

---

#### Execution Approach (choose one from Intake)

The role roster defined above materializes differently based on the approach chosen in Phase 1.

##### **Approach A — Custom Agents**

**Use when:** Linear workflows, simple handoffs, direct agent invocation preferred.

**Steps:**
1. For each role in the roster table above, create a standalone agent file following `.github/instructions/agents.instructions.md`:
   - Path: `.github/agents/<role-name>.agent.md`
   - Frontmatter: `name`, `description`, `tools` (match assigned skills/MCP servers from roster)
   - Body: role charter, assigned skills/instructions/MCP servers, handoff responsibilities
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

### Phase 6: Execution (Iterative)

**Objective:** Execute scenario using agent team.

**Actions:**
1. Create `docs/<scenario>-<slug>/execution-log.md` (append-only timestamped log)
2. For each functional domain (in dependency order):
   - Instantiate responsible agent(s) with their assigned capabilities
   - Agent produces spec/code artifacts
   - Log agent actions: `## [ISO8601 timestamp] <AgentName>: <Action>`
   - Handoff to next agent in chain
3. Record architecture decisions in `docs/<scenario>-<slug>/adr/*.md`:
   - Use standard ADR format: Status, Context, Decision, Consequences
   - Examples: framework choice, database schema design, API versioning strategy
4. Iterate until all success criteria from Analysis met

**Exit Gate:** All success criteria met, all agents report completion, no blockers.

---

### Phase 7: Verification

**Objective:** Validate deliverables against requirements.

**Actions:**
1. Create `docs/<scenario>-<slug>/verification.md`:
   - **Requirements Traceability Matrix:** Map each success criterion → artifact(s) that satisfy it
   - **Test Results:** Pass/fail per criterion (run automated tests where applicable)
   - **Known Limitations:** Document gaps with workarounds
2. Calculate **Confidence Score** using rubric from `./shared/meta-agentic-method.md`:
   - Score 6 dimensions (0-100 each): Capability Coverage, MCP Availability, Skill/Instruction Coverage, Data/Domain Knowledge, Spec Completeness, Verification Status
   - Weights: 25%, 20%, 15%, 15%, 15%, 10%
   - Formula: `sum(dimension_score × weight)`
   - Band: High (≥80, green), Medium (50-79, amber), Low (<50, red)
3. Document score breakdown in `verification.md`

**Exit Gate:** ≥80% success criteria met (or documented exceptions), confidence score calculated.

---

### Phase 8: Handoff

**Objective:** Package deliverables for user handoff.

**Actions:**
1. Create `docs/<scenario>-<slug>/README.md`:
   - **Executive Summary:** 2-3 paragraph overview of what was built
   - **Artifacts Inventory:** Links to all docs, code, configs
   - **Confidence Score:** Overall score with dimension breakdown
   - **Next Steps:** Clear actions for user (e.g., "Deploy to staging", "Set up monitoring")
   - **Known Gaps:** Documented limitations and recommended follow-up
2. **Generate HTML Report:**
   - Copy `./templates/progress-report.template.html` → `docs/<scenario>-<slug>/progress-report.html`
   - Update `<script id="report-data">` JSON block with:
     ```json
     {
       "scenario": "<project name>",
       "promptType": "green-field",
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
- `docs/<scenario>-<slug>/` folder with all phase artifacts
- Custom agent files in `.github/agents/` (if new agents created)
- Skills in `.github/skills/<name>/SKILL.md` (if new skills created)
- Instructions in `.github/instructions/<name>.instructions.md` (if new instructions created)
- MCP servers in `mcp-servers/<name>/` (if generated from OpenAPI)
- Self-rendering `progress-report.html` with confidence score

**Artifact Count (Green-Field):**
- Minimum 8 markdown docs (intake, analysis, capability-map, team, execution-log, verification, README, ≥1 ADR)
- HTML report (1 file)
- ≥2 custom agent files
- Variable skills/instructions/MCP based on scenario

**Success Indicators:**
- All 8 SDD phases completed
- Confidence score ≥50 (Medium or High band)
- HTML report displays confidence gauge correctly
- All "To Build" capabilities now "Available"

## Quality Assurance / Validation

Run this checklist before declaring workflow complete:

- [ ] `00-intake.md` exists with clarifying questions answered
- [ ] `01-analysis.md` has ≥2 functional domains with success criteria
- [ ] `03-capability-map.md` shows no "Unknown" or "TBD" statuses
- [ ] All generated `*.agent.md` files follow `.github/instructions/agents.instructions.md`
- [ ] All generated `SKILL.md` files follow `.github/instructions/agent-skills.instructions.md` (description has WHEN triggers)
- [ ] All generated `*.instructions.md` files follow `.github/instructions/instructions.instructions.md` (applyTo glob present)
- [ ] `04-team.md` has ≥2 agents with capability assignments
- [ ] `execution-log.md` has timestamped entries
- [ ] `verification.md` contains confidence score with dimension breakdown
- [ ] `README.md` has executive summary, next steps, known gaps
- [ ] `progress-report.html` exists and renders (open in browser)
- [ ] Report JSON `confidenceDimensions` weights sum to 1.0
- [ ] Report `overallConfidence.score` matches formula: `sum(dimension_score × weight)`
- [ ] All MCP servers listed in report have connection status
- [ ] No secrets or credentials in generated files

## Example Invocation

**User Prompt:**  
"Customer portal with Next.js, PostgreSQL, and Stripe checkout"

**Expected Flow:**
1. Intake: Ask stack preferences (App Router vs Pages?), performance targets, compliance (PCI-DSS?), deployment platform
2. Analysis: Domains = [Authentication, Product Catalog, Checkout, Payment Processing, Admin Panel], Success = "Sub-100ms page load", "PCI-compliant payment flow"
3. Capability Mapping: Find `postgres-mcp` in registry, mark Next.js skill "To Build", mark Stripe instruction "To Build"
4. Capability Acquisition: Generate `nextjs-setup` skill, `stripe-integration.instructions.md`
5. Team Formation: Agents = [FrontendBuilder, BackendAPI, PaymentIntegrator, Validator]
6. Execution: Iterate through domains, produce specs + code
7. Verification: Test checkout flow, calculate confidence = 78 (Medium/Amber) due to missing load testing
8. Handoff: README with deployment steps, report shows 78 score with amber gauge

---

**Related Workflows:**
- For existing codebases: `.github/prompts/brown-field.prompt.md`
- For migrations: `.github/prompts/modernization.prompt.md`

**References:**
- SDD phases: `./shared/meta-agentic-method.md`
- MCP/skill catalog: `./references.md`
- Report template: `./templates/progress-report.template.html`
