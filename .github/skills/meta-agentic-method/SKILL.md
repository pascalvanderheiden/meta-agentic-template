---
name: meta-agentic-method
description: 'Spec-Driven Development methodology for meta-agentic workflows. Use when planning or executing green-field, brown-field, or modernization scenarios that require team formation, capability mapping, confidence scoring, and iterative spec-first development. Covers 10-phase SDD pipeline, artifact conventions, team-formation algorithm, capability-acquisition decision tree, and 6-dimension confidence rubric.'
---

# Meta-Agentic Methodology

This skill defines the shared Spec-Driven Development (SDD) methodology for meta-agentic workflows. It provides a phase-driven pipeline, artifact schemas, team-formation logic, capability-acquisition decisions, and confidence-scoring criteria.

## When to Use This Skill

- Planning a green-field system from requirements
- Extending or modifying an existing codebase (brown-field)
- Migrating or modernizing legacy platforms
- Forming AI agent teams for complex multi-domain scenarios
- Mapping required capabilities (skills, MCP servers, instructions, agents)
- Scoring confidence for deliverable readiness

## Spec-Driven Development (SDD) Phase Model

Meta-agentic workflows execute an iterative, spec-first pipeline where each phase produces documentation artifacts that inform subsequent phases. Scenarios differ in their **entry phase** based on the starting context, then converge on a shared execution pipeline.

### Scenario Entry-Phase Mapping

| Scenario | Entry Phase | Rationale |
|----------|-------------|-----------|
| **Green-field** | Analysis | No existing system; gather requirements from scratch |
| **Brown-field** | Discovery | Existing system must be inventoried before analysis |
| **Modernization** | Assessment | Legacy system + target state both require assessment before migration design |

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

#### 2. Discovery (Brown-field only)

**Objective:** Inventory the existing system's architecture, components, data flows, dependencies, and integration points.

**Inputs:**
- Intake artifact
- Access to codebase, infrastructure configs, API specs, database schemas

**Output Artifact:** `docs/<scenario>-<slug>/02-discovery.md`
- System architecture diagram (ASCII or Mermaid)
- Component inventory (services, databases, APIs, queues, storage)
- Data flow maps (input → processing → output)
- Dependency graph (internal + external)
- Technology stack & versions
- Integration points & contracts

**Exit Criteria:**
- Complete component inventory with no "unknown" placeholders
- Data flows traced end-to-end
- All external dependencies identified

---

#### 3. Assessment (Modernization only)

**Objective:** Evaluate legacy system capabilities, identify technical debt, map target-state requirements, and calculate migration gap.

**Inputs:**
- Intake artifact
- Discovery artifact (if brown-field modernization)
- Legacy system documentation

**Output Artifact:** `docs/<scenario>-<slug>/03-assessment.md`
- Legacy capability matrix (what it does today)
- Technical debt inventory (version EOL, security gaps, performance issues)
- Target-state requirements (what it must do post-migration)
- Gap analysis table (legacy vs. target for each capability)
- Migration complexity rating (Low / Medium / High per component)
- Risk assessment (data loss, downtime, compatibility)

**Exit Criteria:**
- Every legacy capability mapped to target-state equivalent or marked "deprecated"
- Migration risks quantified with mitigation strategies
- Target platform/technology decisions documented

---

#### 4. Analysis (All Scenarios)

**Objective:** Decompose the scenario into functional domains, define success criteria, and specify required capabilities.

**Inputs:**
- Intake artifact
- Discovery artifact (brown-field)
- Assessment artifact (modernization)

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

## Spec/Document Artifacts

All artifacts are written to `docs/<scenario>-<slug>/` with consistent naming and structure.

### Artifact Numbering Convention

Base scenarios (green-field, brown-field) use: `00-intake`, `01-analysis`, `02-discovery` (brown-field only), `03-capability-map`, `04-team`.

Modernization uses an extended sequence because it adds the Assessment artifact: `00-intake`, `02-discovery`, `03-assessment`, `04-analysis`, `05-capability-map`, `06-team`. Note that `01` is the semantic slot for analysis and is intentionally left unused in the modernization path so that `02-discovery` stays aligned across brown-field and modernization scenarios.

**There is NO collision**: `03-assessment` only exists in modernization (where capability-map is `05`); in base scenarios capability-map is `03` and assessment does not exist.

### Artifact Table

| Artifact File | Phase | Purpose | Minimal Heading Skeleton |
|---------------|-------|---------|--------------------------|
| `00-intake.md` | Intake & Clarification | Captures user scenario and clarifications | `# Scenario`, `## User Request`, `## Clarifications`, `## Assumptions` |
| `01-analysis.md` (base) / `04-analysis.md` (modernization) | Analysis | Decomposes scenario into domains and capabilities | `# Functional Domains`, `## Success Criteria`, `## Capability Requirements` |
| `02-discovery.md` | Discovery (brown-field & modernization) | Inventories existing system | `# System Architecture`, `## Components`, `## Data Flows`, `## Dependencies` |
| `03-assessment.md` (modernization only) | Assessment (modernization) | Legacy-to-target gap analysis | `# Legacy Capabilities`, `## Technical Debt`, `## Target State`, `## Gap Analysis`, `## Migration Risks` |
| `03-capability-map.md` (base) / `05-capability-map.md` (modernization) | Capability Mapping | Maps needed capabilities to artifacts | `# Capability Matrix`, `## Reused Capabilities`, `## New Capabilities` |
| `04-team.md` (base) / `06-team.md` (modernization) | Team Formation | Defines agent team structure | `# Agent Roster`, `## Handoff Protocol`, `## Reviewer Assignment` |
| `execution-log.md` | Execution | Timestamped progress entries | `# Execution Log`, `## [Timestamp] Agent: Action` (append-only) |
| `verification.md` | Verification | Validates deliverables against requirements | `# Requirements Traceability`, `## Test Results`, `## Confidence Score` |
| `README.md` | Handoff | Scenario summary for human team | `# Executive Summary`, `## Artifacts`, `## Confidence Score`, `## Next Steps` |
| `adr/*.md` | Execution (as needed) | Architecture Decision Records | Standard ADR format: `# Title`, `## Status`, `## Context`, `## Decision`, `## Consequences` |

---

## Team Formation Algorithm

**Input:** Analysis artifact (functional domains + capability requirements)  
**Output:** Team artifact (agent roster with capability assignments)

**Algorithm:**

1. **Domain Decomposition**
   - Extract functional domains from Analysis artifact
   - For each domain, identify 1-3 core responsibilities
   - Example: "ETL Orchestration" domain → responsibilities: [schedule jobs, monitor execution, handle retries]

2. **Candidate Agent Role Assignment**
   - Map each domain to a candidate agent role using domain-to-role heuristics:
     - **Data extraction** → `Extractor` agent
     - **Data transformation** → `Transformer` agent
     - **Infrastructure provisioning** → `Provisioner` agent
     - **Testing/validation** → `Validator` agent
     - **Monitoring/observability** → `Monitor` agent
     - **Documentation** → `Documenter` agent (implicit in all teams)
   - Merge roles if domains overlap >70% in responsibilities
   - Split roles if a single domain has >5 distinct responsibilities

3. **Capability Assignment**
   - For each agent role, filter Capability Map for relevant capabilities:
     - Match by domain keywords (e.g., "Oracle" keyword → assign to `Extractor` if extracting Oracle data)
     - Match by capability type (e.g., MCP servers with database access → assign to data agents)
   - Assign ≥1 skill, instruction, or MCP server per agent
   - Document unassigned capabilities as "shared utilities" available to all agents

4. **Handoff Protocol Definition**
   - Order agents by dependency chain (data flow sequence)
   - Define handoff contract: what each agent produces and which agent consumes it
   - Example: `Extractor` → produces `schema.json` → consumed by `Transformer`

5. **Reviewer Assignment**
   - Default reviewer: `Validator` agent (if present) or last agent in chain
   - Reviewer responsibilities: verify completeness, check consistency, validate outputs

6. **Compliance Check**
   - Validate all generated agent files follow `.github/instructions/agents.instructions.md`
   - Validate all generated skills follow `.github/instructions/agent-skills.instructions.md`
   - Validate all generated instructions follow `.github/instructions/instructions.instructions.md`
   - Record compliance as decision in `adr/` (per standing decision in `.squad/decisions.md`)

**Evidence to Record:**
- Mapping rationale (why this domain → this agent role)
- Capability assignment justification (why this skill → this agent)
- Handoff contracts (explicit input/output per agent)

---

## Capability Acquisition Decision Tree

For each capability identified in the Capability Mapping phase, apply this decision tree **in order** until a match is found:

```
CAPABILITY NEEDED
│
├─→ [A] REUSE EXISTING REPO ARTIFACT
│   ├─ Search `.github/skills/`, `.github/instructions/`, `.github/agents/`
│   ├─ Evidence: File path, version/last-modified date
│   └─ Action: Add to Capability Map as "Status: Available (Reused)"
│
├─→ [B] FIND EXISTING MCP SERVER OR PUBLISHED SKILL
│   ├─ Search `references.md` (same folder) for MCP servers matching capability domain
│   ├─ Search published skill repositories (Anthropic skills, GitHub awesome-copilot)
│   ├─ Evidence: URL, installation command, compatibility notes
│   └─ Action: Add to Capability Map as "Status: Available (External)"
│
└─→ [C] BUILD NEW ARTIFACT
    ├─ [C1] Generate MCP server from OpenAPI spec
    │   ├─ Condition: Capability maps to a REST API with OpenAPI/Swagger spec
    │   ├─ Tool: Use repo `mcp-builder` skill to generate server from spec URL
    │   ├─ Evidence: OpenAPI spec URL, generated server path
    │   └─ Action: Create MCP server in `mcp-servers/<name>/`, mark "Status: Built (MCP)"
    │
    ├─ [C2] Author new skill
    │   ├─ Condition: Capability is a reusable workflow (multi-step procedure)
    │   ├─ Guidelines: Follow `.github/instructions/agent-skills.instructions.md`
    │   ├─ Evidence: Skill file path, validation results
    │   └─ Action: Create skill in `.github/skills/<name>/SKILL.md`, mark "Status: Built (Skill)"
    │
    ├─ [C3] Author new instruction
    │   ├─ Condition: Capability is a coding standard, pattern, or guideline
    │   ├─ Guidelines: Follow `.github/instructions/instructions.instructions.md`
    │   ├─ Evidence: Instruction file path, applyTo glob pattern
    │   └─ Action: Create instruction in `.github/instructions/<name>.instructions.md`, mark "Status: Built (Instruction)"
    │
    └─ [C4] Define custom agent role
        ├─ Condition: Capability requires autonomous decision-making or orchestration
        ├─ Guidelines: Follow `.github/instructions/agents.instructions.md`
        ├─ Evidence: Agent charter file path, assigned capabilities
        └─ Action: Defer to Team Formation phase, mark "Status: Pending (Agent Role)"
```

**Recording Requirements:**
- Document decision path taken (A / B / C1 / C2 / C3 / C4) in Capability Map "Source" column
- Link to evidence (file path, URL, or generation log)
- If multiple paths viable, document rationale for chosen path in `adr/`

---

## Confidence Scoring Rubric

The confidence score is a weighted aggregate of 6 dimensions, each scored 0–100. This rubric is the canonical source rendered in the HTML report.

### Scoring Dimensions

| Dimension | Weight | 0 (Critical Gap) | 50 (Partial) | 100 (Full Coverage) |
|-----------|--------|------------------|--------------|---------------------|
| **Capability Coverage** | 25% | <50% of required capabilities available | 50-79% available, major gaps documented | ≥80% available, no critical gaps |
| **MCP Availability** | 20% | No MCP servers; all data access manual | Some MCP servers; fallback scripts required | All data sources have MCP servers |
| **Skill/Instruction Coverage** | 15% | No skills/instructions; agents improvise | Core workflows documented, edge cases missing | Complete skill coverage with examples |
| **Data/Domain Knowledge** | 15% | No domain context; generic implementation | Partial domain data (schemas, APIs), incomplete | Full domain artifacts (schemas, OpenAPI, data samples) |
| **Spec Completeness** | 15% | Missing ≥2 phase artifacts | All artifacts present, some incomplete | All artifacts complete with verification |
| **Verification Status** | 10% | No testing; deliverables unvalidated | Manual verification performed | Automated tests pass; requirements traced |

### Aggregate Formula

```
Confidence Score = 
  (Capability Coverage × 0.25) +
  (MCP Availability × 0.20) +
  (Skill/Instruction Coverage × 0.15) +
  (Data/Domain Knowledge × 0.15) +
  (Spec Completeness × 0.15) +
  (Verification Status × 0.10)
```

### Confidence Bands

| Score Range | Band | Color | Interpretation |
|-------------|------|-------|----------------|
| 80–100 | High | Green | Ready for production execution with minimal risk |
| 50–79 | Medium | Amber | Viable with documented gaps; manual intervention likely |
| 0–49 | Low | Red | Significant blockers; not recommended for execution |

### Scenario-Specific Scoring Adjustments

While the base rubric applies to all scenarios, specific adjustments account for scenario-unique success criteria:

- **Brown-field**: The **Verification Status** dimension MAY penalize the score if the existing test suite's pass-rate regresses after changes. A baseline test pass-rate should be captured during Discovery and verified post-Execution. Any regression indicates integration risk.

- **Modernization**: The **Data/Domain Knowledge** dimension SHOULD weight toward data-parity verification. Full domain coverage includes not just schemas and APIs, but also data samples, lineage documentation, and evidence that migrated data matches legacy system output for representative test cases.

These adjustments ensure the confidence score reflects scenario-specific risks: preserving existing functionality in brown-field scenarios and ensuring data fidelity in migrations.

---

### Worked Example: Oracle → Fabric ETL Migration

**Scenario Context:**
- Migrate existing Oracle-based ETL pipeline to Microsoft Fabric
- Brown-field scenario (existing Oracle system to discover)
- Target: Fabric Lakehouse + Data Factory

**Dimension Scores:**

| Dimension | Score | Justification |
|-----------|-------|---------------|
| **Capability Coverage** | 85 | 9/10 capabilities available: MCP server for Oracle schema extraction (reused `database-inspector-mcp`), Fabric API skill (generated from OpenAPI), migration validator agent (created). Missing: real-time sync capability (documented as manual workaround). |
| **MCP Availability** | 90 | MCP servers available for Oracle (`database-inspector-mcp`) and Fabric REST API (`fabric-api-mcp` generated from OpenAPI). No MCP for Fabric Lakehouse direct access (using REST API as proxy). |
| **Skill/Instruction Coverage** | 70 | Skills created for schema transformation (`oracle-to-fabric-schema`) and data validation (`fabric-validation`). Missing: performance tuning guidelines for large datasets (documented in README as known gap). |
| **Data/Domain Knowledge** | 80 | Full Oracle schema extracted (120 tables documented). Fabric API spec available (OpenAPI v3). Sample data for 5 critical tables captured. Missing: full data lineage documentation for all tables. |
| **Spec Completeness** | 95 | All phase artifacts present (Intake, Discovery, Analysis, Capability Map, Team, Execution Log, Verification, README). Minor gap: ADR for Fabric Lakehouse vs. Delta Lake choice incomplete. |
| **Verification Status** | 60 | Schema transformation validated (10/10 tables mapped correctly). Data load tested on 3 sample tables (all pass). Missing: end-to-end integration test (Fabric environment not yet provisioned). |

**Aggregate Calculation:**

```
Confidence Score = 
  (85 × 0.25) + (90 × 0.20) + (70 × 0.15) + (80 × 0.15) + (95 × 0.15) + (60 × 0.10)
= 21.25 + 18.00 + 10.50 + 12.00 + 14.25 + 6.00
= 82.00
```

**Result:** **82 / 100** → **High Confidence (Green)**

**Interpretation:**  
This migration is ready for production execution. The primary risk is lack of end-to-end integration testing (mitigated by phased rollout plan in README). Real-time sync capability gap is acceptable for initial batch-migration phase (documented as Phase 2 follow-up work).

---

## References

- Team formation guidelines: `.github/instructions/agents.instructions.md`
- Skill authoring standards: `.github/instructions/agent-skills.instructions.md`
- Instruction authoring standards: `.github/instructions/instructions.instructions.md`
- MCP server catalog: [references.md](./references.md)
- HTML report template: [progress-report skill](../progress-report/SKILL.md)
