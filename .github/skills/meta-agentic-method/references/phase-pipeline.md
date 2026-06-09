### Phase Pipeline

All scenarios flow through these phases (starting at their scenario-specific entry point):

#### 1. Intake & Clarification (All Scenarios)

**Objective:** Capture user's scenario description and resolve ambiguities.

**Inputs:**
- User prompt (e.g., "Oracle→Fabric ETL migration")
- Scenario type selection (green-field / brown-field / modernization)

**Output Artifact:** `docs/<scenario>-<slug>/00-intake.md`
- User scenario verbatim
- Clarifying questions asked & answers received
- Assumptions documented
- Scenario classification confirmed

**Exit Criteria:**
- Scenario is unambiguous enough to proceed to next phase
- No critical unknowns remain that would invalidate downstream work

---

#### 2. Discovery (Brown-field & Modernization Existing-Source Scenarios)

**Objective:** Inventory the existing system's architecture, components, data flows, dependencies, integration points, and generate a token-bounded repo-wiki as the indexed source representation.

**Inputs:**
- Intake artifact
- Access to codebase, infrastructure configs, API specs, database schemas
- Source Context Ingestion loop (Pack → Summarize → Index → Reference on demand)

**Output Artifacts:**
- `docs/<scenario>-<slug>/02-discovery.md`
- `docs/<scenario>-<slug>/wiki/` generated from `templates/discovery-wiki.template.md` and `templates/wiki-index.template.json`

`02-discovery.md` remains the phase document and MUST link to the generated wiki directory. It summarizes system architecture, components, data flows, dependencies, technology stack, integration points, contracts, and wiki freshness metadata. The wiki is the primary indexed source representation for downstream phases.

**Exit Criteria:**
- Complete component inventory with no unresolved "unknown" placeholders
- Data flows traced end-to-end
- All external dependencies identified
- Repo-wiki exists at `docs/<scenario>-<slug>/wiki/` with overview, architecture, module/component index, data flows, dependency graph, glossary, risk hotspots, refresh/drift log, and machine-readable index
- `02-discovery.md` links to the wiki and records packer choice, source revision, and refresh timestamp

---

#### 3. Assessment (Modernization only)

**Objective:** Evaluate legacy system capabilities, identify technical debt, map target-state requirements, calculate migration gap, and confirm the repo-wiki is current enough to support target design.

**Inputs:**
- Intake artifact
- Discovery artifact and generated repo-wiki
- Legacy system documentation
- Read-only legacy source reference when topology uses a side-car control repo

**Output Artifacts:**
- `docs/<scenario>-<slug>/03-assessment.md`
- `docs/<scenario>-<slug>/wiki/` retained or patched as the indexed source representation when assessment reveals drift or missing modules

`03-assessment.md` remains the phase document and MUST link to the wiki directory. It contains the legacy capability matrix, technical debt inventory, target-state requirements, gap analysis, migration complexity, risk assessment, and source-context confidence notes.

**Exit Criteria:**
- Every legacy capability mapped to target-state equivalent or marked "deprecated"
- Migration risks quantified with mitigation strategies
- Target platform/technology decisions documented
- Assessment links to the wiki and records whether the wiki is fresh, patched, or stale
- Stale or incomplete wiki areas are listed as confidence-reducing gaps before downstream planning

---

#### 4. Analysis (All Scenarios)

**Objective:** Decompose the scenario into functional domains, define success criteria, and specify required capabilities.

**Inputs:**
- Intake artifact
- Discovery artifact and repo-wiki (brown-field)
- Assessment artifact and repo-wiki (modernization)

**Output Artifact:** `docs/<scenario>-<slug>/01-analysis.md` (or `04-analysis.md` for modernization)
- Functional domain breakdown (e.g., ETL Orchestration, Data Transformation, Monitoring)
- Success criteria per domain
- Non-functional requirements (performance, security, scalability)
- Capability requirements (what agents/skills/tools are needed)

**Exit Criteria:**
- Scenario decomposed into ≥2 distinct functional domains
- Each domain has measurable success criteria
- Capability requirements enumerated (even if "TBD" on implementation)

---

#### 5. Capability Mapping (All Scenarios)

**Objective:** Identify the exact agents, skills, instructions, and MCP servers required to execute the scenario.

**Inputs:**
- Analysis artifact
- Capability Acquisition Decision Tree (see below)
- Repository's existing skills/instructions/agents
- MCP server catalog (see [references.md](./references.md))

**Output Artifact:** `docs/<scenario>-<slug>/03-capability-map.md` (or `05-capability-map.md` for modernization)
- Capability matrix table:

| Capability Needed | Type | Source | Status | Evidence |
|-------------------|------|--------|--------|----------|
| Oracle schema extraction | MCP server | `database-inspector-mcp` (existing) | Available | URL in references.md |
| Fabric API integration | Skill | Generate from OpenAPI spec | To Build | OpenAPI URL provided |
| Migration validation | Agent | Custom agent "Validator" | To Create | Role defined in team formation |

**Exit Criteria:**
- Every capability from Analysis mapped to a concrete artifact (agent/skill/instruction/MCP)
- All "To Build" items have a defined creation path (see Capability Acquisition decision tree)
- No "Unknown" or "TBD" rows without follow-up action

---

#### 6. Capability Acquisition (All Scenarios)

**Objective:** Obtain all required capabilities by reusing existing artifacts or generating new ones.

**Inputs:**
- Capability map
- Capability Acquisition Decision Tree (see below)
- MCP-builder skill (for MCP generation)
- Skill/instruction authoring guidelines (`.github/instructions/`)

**Output Artifacts:**
- New skills: `.github/skills/<skill-name>/SKILL.md`
- New instructions: `.github/instructions/<name>.instructions.md`
- New MCP servers: `mcp-servers/<name>/` or reference to external server
- Updated capability map with "Status: Available"

**Authoring Standard:**
When generating any skill, agent, instruction, or prompt, apply the matching `.github/instructions/*` guideline to ensure consistency (per the standing decision in `.squad/decisions.md`).

**Exit Criteria:**
- All capabilities marked "Available" in capability map
- Generated artifacts pass validation (linting, schema checks)
- MCP servers tested and connection verified

---

#### 7. Team Formation (All Scenarios)

**Objective:** Instantiate a set of CUSTOM agents specialized for this scenario, assign capabilities to each, and define handoff protocols.

**Inputs:**
- Analysis artifact (functional domains)
- Capability map (available skills/instructions/MCP)
- Team Formation Algorithm (see below)

**Output Artifact:** `docs/<scenario>-<slug>/04-team.md` (or `06-team.md` for modernization)
- Agent roster table:

| Agent Name | Role | Assigned Skills | Assigned Instructions | MCP Servers | Handoff To |
|------------|------|-----------------|----------------------|-------------|------------|
| Extractor | Extract Oracle schema | `oracle-query`, `database-inspector-mcp` | `data-extraction.instructions.md` | `database-inspector-mcp` | Transformer |
| Transformer | Convert schema to Fabric format | `data-transform`, `fabric-api` | `fabric-schema.instructions.md` | - | Validator |
| Validator | Verify migration completeness | `migration-validate` | `validation.instructions.md` | - | - |

- Reviewer assignment (which agent reviews team output)
- Communication protocol (how agents hand off work)

**Exit Criteria:**
- ≥2 agents defined (ensures actual team, not single-agent workflow)
- Each agent has ≥1 capability assigned
- Handoff chain is acyclic (no circular dependencies)
- Reviewer agent designated

---

#### 8. Execution (All Scenarios)

**Objective:** Instantiate the agent team and execute the scenario iteratively, producing spec documents and code artifacts.

**Inputs:**
- Team artifact
- All acquired capabilities
- Scenario requirements from Analysis

**Output Artifacts:**
- `docs/<scenario>-<slug>/execution-log.md` (timestamped progress entries)
- `adr/` (Architecture Decision Records for major choices)
- Code/config artifacts (depends on scenario)

**Exit Criteria:**
- All success criteria from Analysis phase met
- All agents report task completion
- No blocking issues remain unresolved

---

#### 9. Verification (All Scenarios)

**Objective:** Validate that deliverables meet scenario requirements and pass quality gates.

**Inputs:**
- Execution artifacts
- Success criteria from Analysis
- Verification tests (if applicable)

**Output Artifact:** `docs/<scenario>-<slug>/verification.md`
- Requirements traceability matrix (requirement → artifact mapping)
- Test results (pass/fail per success criterion)
- Known limitations documented
- Confidence score (see Confidence Scoring rubric below)

**Exit Criteria:**
- ≥80% of success criteria met (or lower threshold with documented exceptions)
- Confidence score calculated and justified
- Handoff readiness checklist complete

---

#### 10. Handoff (All Scenarios)

**Objective:** Package deliverables for human handoff with clear next steps.

**Inputs:**
- All phase artifacts
- Verification results
- Confidence score

**Output Artifact:** `docs/<scenario>-<slug>/README.md` (scenario summary)
- Executive summary (2-3 paragraphs)
- Artifacts inventory (links to all docs, code, configs)
- Confidence score with breakdown
- Next steps for human team
- Known gaps and recommended follow-up work

**Exit Criteria:**
- HTML report generated (using [progress-report skill](../progress-report/SKILL.md))
- All artifacts committed to repository
- Handoff README is self-contained (readable without re-running workflow)

---
