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

### Spec Templates

Each phase's **Output Artifact** is produced by copying the matching template from `templates/` into `docs/<scenario>-<slug>/` and filling it in. Templates provide fixed section structure with `[PLACEHOLDER]` tokens and `<!-- GENERATED: ... -->` markers for scenario-specific content. Team roster rows, capability rows, and included phases are generated dynamically from scenario input while the document skeleton stays standardized.

**Per-Scenario Template Sets:**

| Scenario | Template Files Used (→ output artifact) |
|----------|----------------------------------------|
| **Green-field** | `constitution.template.md`(opt), `00-intake.template.md`→00-intake.md, `analysis.template.md`→01-analysis.md, `capability-map.template.md`→03-capability-map.md, `team.template.md`→04-team.md, `plan.template.md`, `tasks.template.md`, `verification.template.md`, `summary.template.md`, `checklist.template.md` |
| **Brown-field** | `constitution.template.md`(opt), `00-intake.template.md`→00-intake.md, `discovery.template.md`→02-discovery.md, `analysis.template.md`→01-analysis.md, `capability-map.template.md`→03-capability-map.md, `team.template.md`→04-team.md, `plan.template.md`, `tasks.template.md`, `verification.template.md`, `summary.template.md`, `checklist.template.md` |
| **Modernization** | `constitution.template.md`(opt), `00-intake.template.md`→00-intake.md, `discovery.template.md`→02-discovery.md, `assessment.template.md`→03-assessment.md, `analysis.template.md`→04-analysis.md, `capability-map.template.md`→05-capability-map.md, `team.template.md`→06-team.md, `plan.template.md`, `tasks.template.md`, `verification.template.md`, `summary.template.md`, `checklist.template.md` |

**Key Rules:**
- **Green-field SKIPS** `discovery.template` and `assessment.template` (no existing system to inventory or assess)
- **Brown-field ADDS** `discovery.template` (existing system inventory) but SKIPS `assessment.template`
- **Modernization ADDS** both `discovery.template` and `assessment.template` (legacy→target gap analysis)

**Dynamic Content:**
- Team roster rows: generated from team-formation algorithm per scenario
- Capability rows: generated from capability-map decisions per scenario
- Included phases: subset templates based on scenario type (see table above)
- Section structure: fixed per template (headings, skeleton text)

**Template Index:** See `templates/README.md` for a complete catalog of available templates and their usage guidance.

**Integration with Artifact Numbering Convention:** Each template documents its target output filename per the numbering convention below. For example, `analysis.template.md` produces `01-analysis.md` in green-field/brown-field scenarios, but `04-analysis.md` in modernization scenarios (because discovery→02 and assessment→03 shift the sequence).

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

## Testing Strategy

Testing is a **first-class, scenario-specific** part of the meta-agentic methodology. The appropriate testing approach varies by scenario and must be integrated at the correct SDD phase to maximize confidence and minimize rework.

### Testing Approach by Scenario

| Scenario | Testing Strategy | Primary Goal | Frameworks |
|----------|------------------|--------------|------------|
| **Green-field** | Test-Driven Development (TDD) + Behavior-Driven Development (BDD) | Lock specs BEFORE coding begins via executable acceptance scenarios | Playwright (E2E/UI), Jest/JUnit (unit), Gherkin/Cucumber (BDD scenarios) |
| **Brown-field** | Safety Net via Snapshot + Characterization Testing | Maintain SAFETY NET around existing behavior BEFORE altering | Approval Tests (lock legacy outputs), BMAD dependency mapping, Playwright (UI regression) |
| **Modernization** | Backward Compatibility + API Contract Testing | Guarantee modernized modules output EXACT same data as legacy | API contract testing (parity tests), golden dataset comparison |

### When Testing Occurs in the SDD Phase Pipeline

Testing is **not** a final phase — it is woven into the pipeline at scenario-specific entry points:

#### Green-Field (TDD + BDD)
1. **Analysis Phase:** Define measurable success criteria (these become test assertions)
2. **Team Formation Phase:** Assign a `Tester` or `QA` agent role with BDD/TDD skills
3. **Execution Phase — BEFORE Implementation:**
   - Author BDD scenarios (Gherkin `.feature` files) derived from requirements
   - Author failing unit tests that specify expected behavior (TDD red phase)
   - **Only then** implement code to make tests green
4. **Verification Phase:** All tests must pass; coverage metrics calculated

#### Brown-Field (Safety Net)
1. **Discovery Phase:** Capture baseline test pass-rate (if existing test suite present)
2. **Analysis Phase — BEFORE Altering Code:**
   - Author **snapshot tests** to lock down current outputs (Approval Tests)
   - Author **characterization tests** to capture existing behavior (unit tests reverse-engineered from code)
   - Run dependency mapping (BMAD) to understand blast radius of changes
   - Capture Playwright UI baselines (screenshots, interaction flows)
3. **Execution Phase:** Modify code ONLY after safety net is green
4. **Verification Phase:** Safety net must remain green (no regressions); new tests for new functionality

#### Modernization (Parity + Contract Testing)
1. **Assessment Phase:** Identify legacy system outputs to preserve (API responses, data formats, business logic results)
2. **Analysis Phase:** Define parity success criteria (e.g., "Fabric output byte-identical to Oracle for golden dataset")
3. **Execution Phase:**
   - Author **API contract tests** comparing legacy vs. modernized responses on identical inputs
   - Maintain **golden datasets** (representative inputs + expected outputs from legacy system)
   - Run **parity tests** continuously (legacy system still operational during migration)
4. **Verification Phase:** 100% parity on golden datasets; performance within tolerance; contract tests green

### Link to Confidence Rubric

Testing directly impacts the **Verification Status** dimension (10% weight) in the 6-dimension confidence rubric:

| Verification Status Score | Criteria |
|---------------------------|----------|
| 0 (Critical Gap) | No testing; deliverables unvalidated |
| 50 (Partial) | Manual verification performed; no automated tests |
| 100 (Full Coverage) | Automated tests pass; requirements traced to test cases |

**Additional rubric impacts:**
- **Capability Coverage (25%):** Penalized if testing framework capabilities (Playwright MCP, Approval Tests, contract testing tools) are missing
- **Spec Completeness (15%):** Penalized if test specifications (BDD scenarios, characterization test suites, parity datasets) are incomplete

### Available Testing Tools

- **Playwright MCP Server:** Available for browser/UI automation (E2E testing, visual regression, screenshot capture). Invoke via MCP connection configured in `.copilot/mcp-config.json`. See [references.md](./references.md) for Playwright MCP server details.
- **Standard Unit Frameworks:** Jest (JS/TS), JUnit (Java), pytest (Python), xUnit (.NET) — use project-appropriate framework
- **Approval Tests:** Libraries for snapshot testing (ApprovalTests.Java, ApprovalTests.Net, approvaltests-python)
- **BDD Frameworks:** Cucumber (Java/Ruby), Behave (Python), SpecFlow (.NET), Cucumber.js (JS/TS)
- **Contract Testing:** Pact (consumer-driven), Spring Cloud Contract, Postman/Newman (API validation)
- **Dependency Mapping:** BMAD (Bayesian Model for Automated Dependency analysis) or similar static analysis tools

### Gotchas

- **Green-field:** Writing tests AFTER code defeats TDD's design benefits — specs must lock BEFORE implementation
- **Brown-field:** Skipping the safety net phase leads to regressions; ALWAYS characterize before altering
- **Modernization:** Parity testing requires the legacy system to remain operational during migration — plan infrastructure accordingly
- **All scenarios:** Weak test coverage lowers the Verification Status score, which cascades into overall confidence degradation

---

## Upstream Template Feedback Loop

Repos created FROM this template inherit the ability to report template-level improvements back to the source. When an agent (custom-agent role OR Squad member) discovers a gap, friction point, or optimization opportunity **in the template itself** during scenario execution, they file a structured GitHub issue to the upstream template repo.

### When to Trigger

File upstream feedback when you detect:
- **Capability gap:** A skill, MCP server, or instruction the template catalog **should** include but doesn't
- **Broken/missing reference:** Dead link, outdated registry URL, missing documentation in `references.md`
- **Friction that lowered confidence:** Template workflow step unclear, causing delays or errors that reduced a rubric dimension score
- **Unclear prompt step:** Phase instructions ambiguous, leading to rework or incorrect artifact generation
- **Missing guidance:** Template lacks convention/pattern for a common scenario (e.g., no ADR template, no security review checklist)

### Who Triggers

This is a **cross-cutting responsibility** that applies to:
- **Custom-agent roles** (when using Approach A execution)
- **Squad members** (when using Approach B execution)
- **The GitHub Copilot agent** (when orchestrating via prompt files)

Any team member who encounters template-level friction during a scenario run should file feedback.

### How to File Feedback

1. **Invoke the `github-issues` skill** ([github-issues/SKILL.md](../github-issues/SKILL.md))
2. **Target repository:** `pascalvanderheiden/meta-agentic-template`  
   ⚠️ **Fork override:** If your repo is a fork with a custom template origin, change this to your upstream template repo in `.github/copilot-instructions.md`.
3. **Issue type:** Use `type=Bug` (for broken references, errors) or `type=Feature` (for capability gaps, enhancements)
4. **Label:** `template-feedback` (required for routing to template maintainers)
5. **Issue body structure:**

```markdown
## Scenario
<Green-field | Brown-field | Modernization>

## Prompt
<Which prompt file was active, e.g., green-field.prompt.md>

## Phase
<Which SDD phase surfaced the gap, e.g., "Capability Acquisition">

## What Was Missing / Friction
<Concrete description: what was expected vs. what happened>

## Suggested Improvement
<Actionable recommendation: add skill X, fix reference Y, clarify step Z>

## Confidence Impact
**Dimension:** <Which of the 6 rubric dimensions this affected>  
**Estimated Impact:** <Point delta, e.g., "-10 points on Skill/Instruction Coverage">  
**Justification:** <Why this gap hurt the score — what was missing that the rubric measures>

## Repro / Context
<Links to artifacts, logs, or files that demonstrate the issue>
```

### Confidence Impact Mapping

Map the gap to one of the **6 confidence dimensions** from the rubric:

| Rubric Dimension | Template Gap Example |
|------------------|---------------------|
| **Capability Coverage** | Missing skill in template catalog forced manual implementation |
| **MCP Availability** | `references.md` listed nonexistent MCP server, wasted discovery time |
| **Skill/Instruction Coverage** | Skill had no troubleshooting section, caused trial-and-error delays |
| **Data/Domain Knowledge** | No guidance on extracting domain artifacts (schemas, OpenAPI) from legacy systems |
| **Spec Completeness** | Prompt phase lacked clear output artifact template, produced incomplete doc |
| **Verification Status** | No validation checklist in template, deliverables shipped unverified |

Estimate the **point delta** (0-100 scale) this gap caused in the affected dimension. Be conservative: only significant gaps (>5 points) warrant filing.

### Transport

Filing issues on a **public** repository requires authentication (no anonymous issue creation), but does NOT require a hand-made PAT — host OAuth (GitHub MCP server / IDE sign-in) provides the necessary identity; a PAT is only a fallback option. Reading public issues requires no authentication.

- **Primary:** GitHub MCP server (configured in `.copilot/mcp-config.json`, server name `github`) — uses host OAuth
- **Fallback:** `gh api repos/{owner}/{repo}/issues` (via `gh` CLI) — uses `gh auth login` credentials or `GITHUB_TOKEN` environment variable
- **Auth Note:** Personal Access Tokens (PAT) are optional; most users authenticate via GitHub Copilot's built-in OAuth flow

### Example Issue

**Title:** `Missing Azure Fabric MCP server in references.md catalog`

**Body:**
```markdown
## Scenario
Modernization

## Prompt
modernization.prompt.md

## Phase
Capability Mapping

## What Was Missing / Friction
The prompt instructed agents to consult `references.md` for MCP servers supporting the target platform (Microsoft Fabric). No Fabric MCP server was listed. We spent 45 minutes searching registries manually before discovering `fabric-openapi-mcp` exists but wasn't cataloged.

## Suggested Improvement
Add `fabric-openapi-mcp` to `references.md` under "Data Platform MCP Servers" section with registry link: https://registry.modelcontextprotocol.io/fabric-openapi-mcp

## Confidence Impact
**Dimension:** MCP Availability  
**Estimated Impact:** -15 points  
**Justification:** The rubric awards 100 points when "all data sources have MCP servers." We had to build a fallback REST wrapper, leaving us at 70 points (partial coverage). If the catalog had listed the existing MCP, we'd have scored 90+ (near-full coverage).

## Repro / Context
- Capability map artifact: `docs/oracle-fabric-etl/05-capability-map.md` (line 23: "Fabric MCP — To Build")
- Execution log timestamp: 2026-06-08T14:32:00Z (manual search started)
```

**Labels:** `template-feedback`, `enhancement`  
**Type:** `Feature`

---

## References

- Team formation guidelines: `.github/instructions/agents.instructions.md`
- Skill authoring standards: `.github/instructions/agent-skills.instructions.md`
- Instruction authoring standards: `.github/instructions/instructions.instructions.md`
- MCP server catalog: [references.md](./references.md)
- HTML report template: [progress-report skill](../progress-report/SKILL.md)
- GitHub issues skill: [github-issues/SKILL.md](../github-issues/SKILL.md)
