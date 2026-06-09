---
description: 'Orchestrate platform modernization/migration using Spec-Driven Development (SDD): assess legacy system, analyze target state, form specialized agent team, acquire capabilities (MCP/skills/instructions), execute migration iteratively, generate HTML progress reports with confidence scoring.'
name: 'modernization'
agent: 'agent'
tools: ['view', 'edit', 'create', 'bash', 'web_fetch', 'grep', 'glob', 'task']
argument-hint: 'Describe the migration, e.g., "Oracle ETL pipeline to Microsoft Fabric" or "Monolith to microservices"'
---

# Modernization & Migration Workflow

Orchestrate platform modernization and cross-platform migration from assessment to deliverable using the Meta-Agentic SDD methodology.

## Mission

Execute spec-driven modernization by assessing legacy system capabilities, mapping to target platform, forming a custom agent team with discovered/built capabilities (MCP servers, skills, instructions), and producing verified migration deliverables with real-time confidence scoring.

## Scope & Preconditions

**Use This Workflow When:**
- User requests MIGRATING from one platform/technology to another
- User requests MODERNIZING legacy system to current-generation stack
- Legacy system capabilities must be preserved or enhanced
- Target platform is known or can be recommended
- Migration risk assessment is critical

**Preconditions:**
- Access to legacy system (code, infrastructure, documentation) OR sufficient description
- Access to `.github/skills/meta-agentic-method/SKILL.md` for phase model
- Access to `.github/skills/meta-agentic-method/references.md` for MCP/skill discovery
- Access to `.github/skills/progress-report/progress-report.template.html` for report generation
- Repository authoring instructions at `.github/instructions/`

**Topology:**
- Modernization uses a **side-car control repo** derived from this template; the legacy source stays read-only and untouched (target ≠ source).
- Reference legacy source via a git submodule at `legacy/` plus generated repo-wiki. Use the wiki as default context, not raw submodule files. See `../skills/meta-agentic-method/SKILL.md` § "Repository Topology by Scenario".

**Out of Scope:**
- Building NEW systems from scratch → use `green-field.prompt.md`
- Extending existing systems on same platform → use `brown-field.prompt.md`

## Inputs

**Required:**
- `${input:scenarioDetail:Describe the migration, e.g., 'Oracle→Fabric ETL pipeline migration'}` — User's migration request

**Optional Context:**
- Source system details (platform, versions, scale)
- Target platform (or ask for recommendation)
- Migration constraints (downtime tolerance, data volume, compliance)
- Success criteria (performance parity, feature parity, cost reduction)

**If Missing:**
Request migration description (source → target) and STOP. Cannot proceed without source and target platforms.

## Workflow

Execute these SDD phases in sequence. After EACH phase, update the HTML progress report.

### Phase 1: Intake & Clarification

**Objective:** Capture migration request and resolve ambiguities.

**Actions:**
1. Scaffold `docs/<scenario>-<slug>/00-intake.md` from `../skills/meta-agentic-method/templates/00-intake.template.md`, fill placeholders, record user's scenario verbatim, document scenario classification (modernization), record source platform + target platform.
2. (Optional) Scaffold `docs/<scenario>-<slug>/constitution.md` from `../skills/meta-agentic-method/templates/constitution.template.md` if user provides explicit principles/non-negotiables for the project.
3. Ask clarifying questions from this bank (adapt to scenario):
   - **Source platform:** Current technology stack, versions, scale (data volume, throughput, users)?
   - **Target platform:** Desired technology/platform, or should we recommend based on requirements?
   - **Migration scope:** Full replacement, or phased migration (strangler fig pattern)?
   - **Data migration:** Volume, downtime tolerance, data validation requirements, cutover strategy?
   - **Parity requirements:** Must maintain exact feature parity, or acceptable to drop deprecated features?
   - **Performance:** Current performance metrics, target performance requirements (same/better/acceptable degradation)?
   - **Compliance:** Regulatory constraints (data residency, audit logs, encryption)?
   - **Timeline:** Deadline, phasing milestones?
   - **Rollback:** Rollback strategy if migration fails?
   - **Execution approach:** Would you prefer **(A) Custom Agents** (standalone `.agent.md` files invoked individually) or **(B) Squad Team** (coordinator-orchestrated team with parallel execution, handoff enforcement, reviewer gates)? **Default to Squad Team** for multi-agent scenarios with complex orchestration needs; choose Custom Agents for simpler, linear workflows.
   - **SDD framework:** Would you like to use a spec-driven-development framework — **(1) None** (our native pipeline), **(2) GitHub Spec-Kit**, **(3) OpenSpec**, or **(4) Superpowers**? These are prescriptive and change the workflow somewhat. **Recommended default for this scenario: Spec-Kit.** If unsure, choose the recommended default. See `../skills/meta-agentic-method/SKILL.md` § "SDD Framework Selection (Optional)" for what each entails.
   
   **⚠️ MANDATORY:** You MUST present the **Execution Approach** and **SDD Framework** questions to the user and WAIT for their explicit answer before proceeding to the next phase. You may recommend this scenario's default, but DO NOT silently assume it. Only fall back to the default if the user explicitly defers (e.g., "use the default") or indicates they don't care.
4. Capture answers in `00-intake.md` under `## Clarifications`
5. Document the chosen execution approach in `00-intake.md` under `## Execution Approach`
6. Document the chosen SDD framework independently in `00-intake.md` under `## SDD Framework`
7. Document assumptions for any unanswered secondary questions (source platform, target platform, migration scope, data migration, parity requirements, performance, compliance, timeline, rollback) under `## Assumptions`. DO NOT assume answers for Execution Approach or SDD Framework — these require explicit user input.

**Exit Gate:** Source + target platforms confirmed, migration scope understood. **Execution Approach and SDD Framework are explicitly chosen by the user (not assumed).** No blocking unknowns.

---

### Phase 2: Discovery (If Legacy Source Available)

**Objective:** Inventory existing legacy system architecture, components, data flows, and token-bounded source context.

**Actions:**
1. Read `../skills/meta-agentic-method/SKILL.md` § "Source Context Ingestion (Repo-Wiki)" and § "Repository Topology by Scenario".
2. **If legacy system code is accessible:**
   - Add the legacy repository as a read-only git submodule at `legacy/`.
   - Follow brown-field Discovery phase (see `brown-field.prompt.md`)
   - Analyze existing codebase, generate architecture diagram
   - Inventory components, dependencies, integration points
   - Generate `docs/<scenario>-<slug>/wiki/` by Pack → Summarize → Index with a fit-for-repo packer (for example, repomix, gitingest, or code2prompt), `../skills/meta-agentic-method/templates/discovery-wiki.template.md`, and `../skills/meta-agentic-method/templates/wiki-index.template.json`.
   - Follow bundled `../skills/repo-wiki/SKILL.md` for the full Ingest → Query → Lint workflow and `index.md`/`log.md` wiki conventions; keep the templates above as produced artifacts.
   - Use the generated wiki as the token-bounded default context for the legacy system; reference raw `legacy/` files on demand only.
   - Scaffold `docs/<scenario>-<slug>/02-discovery.md` from `../skills/meta-agentic-method/templates/discovery.template.md`, fill placeholders, link to the wiki directory, and generate complete system inventory.
3. **If legacy system is external/undocumented:**
   - Gather available documentation (API specs, data schemas, architecture diagrams)
   - Interview stakeholders (if available) or infer from public documentation
   - Document known components and data flows
   - Flag unknowns for validation during migration
   - Scaffold `docs/<scenario>-<slug>/02-discovery.md` from `../skills/meta-agentic-method/templates/discovery.template.md` with "best-effort" label, fill placeholders, generate best-effort discovery.
4. Use tools:
  - `grep`/`glob` to inventory source files and dependencies
  - `bash` to gather stack-appropriate system metadata: dependency/build manifests, configs, API/IDL specs, and (when relevant) database schemas or row counts
  - `web_fetch` to retrieve vendor/platform documentation

**Exit Gate:** Legacy system capabilities documented (code-level or API-level), architecture understood, repo-wiki generated when source is accessible, and unknowns flagged for validation.

---

### Phase 3: Assessment

**Objective:** Map legacy capabilities to target platform, identify gaps, assess migration complexity.

**Actions:**
1. Read `../skills/meta-agentic-method/SKILL.md` § Assessment phase requirements and § "Source Context Ingestion (Repo-Wiki)".
2. Confirm `docs/<scenario>-<slug>/wiki/` is current for the legacy system. If Assessment reveals drift or missing modules, patch or regenerate it with `../skills/meta-agentic-method/templates/discovery-wiki.template.md` and `../skills/meta-agentic-method/templates/wiki-index.template.json`; follow `../skills/repo-wiki/SKILL.md` for the full Ingest → Query → Lint workflow and `index.md`/`log.md` conventions; keep the wiki as token-bounded context, not raw `legacy/` files.
3. If an SDD framework was selected in Intake, follow its flow per `../skills/meta-agentic-method/SKILL.md` § "SDD Framework Selection (Optional)" and feed Assessment outputs into that framework's artifacts.
4. Scaffold `docs/<scenario>-<slug>/03-assessment.md` from `../skills/meta-agentic-method/templates/assessment.template.md`, fill placeholders, generate:
   - **Legacy Capability Matrix:** List every capability the legacy system provides (e.g., "Scheduled ETL jobs", "Data validation rules", "Error retry logic")
   - **Technical Debt Inventory:** Version EOL dates, security vulnerabilities, performance bottlenecks, maintainability issues
   - **Target-State Requirements:** What each capability must do post-migration (may differ from legacy)
   - **Gap Analysis Table:**

     | Legacy Capability | Target Equivalent | Migration Complexity | Notes |
     |-------------------|-------------------|----------------------|-------|
     | Oracle PL/SQL stored procedures (47 procedures) | Fabric Data Factory dataflows | High | No 1:1 mapping; requires rewrite in Python/SQL |
     | Cron-based scheduling | Fabric pipeline triggers | Low | Direct equivalent available |
     | Custom CDC (change data capture) | Fabric change feed | Medium | Fabric native CDC exists, config needed |

   - **Migration Risks:** Data loss risk, downtime impact, compatibility breaks, rollback difficulty
   - **Complexity Rating:** Per component (Low/Medium/High)
5. Research target platform capabilities:
   - Use `web_fetch` to consult `../skills/meta-agentic-method/references.md` for target platform docs (e.g., Microsoft Fabric docs)
   - Compare feature sets (source vs. target)
6. Highlight critical gaps:
   - **Missing capabilities:** Features legacy has that target doesn't (document workaround or "not migrating")
   - **New capabilities:** Features target offers that legacy doesn't (opportunity to enhance)

**Exit Gate:** Every legacy capability mapped to target equivalent or marked "deprecated". Migration risks quantified with mitigation strategies. Target platform decisions documented.

---

### Phase 4: Analysis

**Objective:** Decompose migration into functional domains and capability requirements.

**Actions:**
1. Read `../skills/meta-agentic-method/SKILL.md` § Analysis phase requirements
2. If an SDD framework was selected in Intake, follow its flow per `../skills/meta-agentic-method/SKILL.md` § "SDD Framework Selection (Optional)" and reconcile framework specs with native analysis artifacts.
3. Read `docs/<scenario>-<slug>/wiki/index.md` (produced in Discovery); derive functional domains from module responsibilities; map capability requirements to wiki evidence (cite page/source paths); flag wiki gaps for follow-up ingest.
4. Scaffold `docs/<scenario>-<slug>/04-analysis.md` from `../skills/meta-agentic-method/templates/analysis.template.md`, fill placeholders, generate (numbering adjusted for modernization path):
   - **Functional Domains:** Break migration into domains based on Assessment (e.g., "Data Extraction", "Schema Transformation", "Target Provisioning", "Data Validation", "Cutover Orchestration")
   - **Success Criteria:** Measurable outcomes per domain:
     - "100% of Oracle tables migrated with <0.01% data loss"
     - "Target Fabric lakehouse query performance within 10% of Oracle baseline"
     - "Migration completes within 4-hour maintenance window"
   - **Non-Functional Requirements:** Performance parity, security posture, compliance (e.g., GDPR data residency)
   - **Capability Requirements:** List needed agents, skills, instructions, MCP servers
     - **Key modernization-specific need:** MCP servers for BOTH source and target platforms
   - **Parity Testing Requirements:**
     - Define golden datasets (representative inputs + expected legacy outputs)
     - Specify parity success criteria (e.g., "100% match on golden dataset", "performance within 10% of legacy")
     - Identify APIs/endpoints requiring contract testing
5. Prioritize domains by dependency and risk

**Exit Gate:** ≥2 functional domains defined, each with success criteria. Migration sequence (domain execution order) documented.

---

### Phase 5: Capability Mapping

**Objective:** Map required capabilities to concrete artifacts, emphasizing MCP server availability for source + target platforms.

**Actions:**
1. Read `../skills/meta-agentic-method/SKILL.md` § Capability Acquisition Decision Tree
2. If an SDD framework was selected in Intake, include its required commands, skills, templates, and artifact locations in the capability map.
3. For each capability from Analysis:
   - **[A] REUSE:** Search `.github/skills/`, `.github/instructions/` for existing repo artifacts
   - **[B] FIND:** Consult `../skills/meta-agentic-method/references.md` for external MCP servers or published skills
     - **CRITICAL:** Check for MCP servers for BOTH source and target platforms
     - **Oracle example:** Search MCP registry → no first-party Oracle MCP server found → document as gap → path: use Oracle ORDS OpenAPI spec + `mcp-builder`
     - **Microsoft Fabric example:** Search MCP registry → no first-party Fabric MCP server found → document as gap → path: use Fabric REST API OpenAPI spec + `mcp-builder`
     - Use `web_fetch` to verify registry links, retrieve OpenAPI specs
     - Use `find-skills` skill to discover published skills (e.g., ETL transformation skills)
   - **[C] BUILD:** If not found, mark for creation:
     - **C1:** MCP from OpenAPI → use `.github/skills/mcp-builder` (PRIMARY PATH for missing platform MCP servers)
     - **C2:** New skill → author following `.github/instructions/agent-skills.instructions.md`
     - **C3:** New instruction → author following `.github/instructions/instructions.instructions.md` (domain knowledge: Oracle-specific patterns, Fabric best practices)
     - **C4:** Custom agent role → defer to Team Formation
4. Scaffold `docs/<scenario>-<slug>/05-capability-map.md` from `../skills/meta-agentic-method/templates/capability-map.template.md`, fill placeholders, generate capability rows:

   | Capability Needed | Type | Source | Status | Evidence |
   |-------------------|------|--------|--------|----------|
   | Oracle schema introspection | MCP server | Build from Oracle ORDS OpenAPI | To Build | https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/ |
   | Fabric lakehouse provisioning | MCP server | Build from Fabric REST API OpenAPI | To Build | https://learn.microsoft.com/rest/api/fabric/ |
   | ETL data transformation patterns | Skill | Find `data-transformation-skill` | To Find | Search awesome-mcp-servers |
   | Oracle PL/SQL to Python conversion | Instruction | Generate new | To Build | Domain-specific conversion rules |

5. Document discovery sources used (registries checked, OpenAPI specs located)
6. **Record MCP gaps:** Explicitly note when no first-party MCP server exists (Oracle, Fabric in this example) and the build path chosen

**Exit Gate:** Every capability mapped with source/status. All platform MCP server gaps identified with OpenAPI-to-MCP build path. No "Unknown" or "TBD" without action.

---

### Phase 6: Capability Acquisition

**Objective:** Obtain all "To Build" and "To Find" capabilities, prioritizing MCP servers.

**Actions:**
1. **MCP Server Generation (Priority 1):**
   - For each platform MCP server marked "To Build":
     - Locate OpenAPI spec (web_fetch from vendor docs)
     - Invoke `.github/skills/mcp-builder` with spec URL
     - Save generated server to `mcp-servers/<platform-name>/`
     - Test connection (verify authentication, basic query)
     - Document generation steps in capability map
   - **Example:** Oracle ORDS OpenAPI → `mcp-builder` → `mcp-servers/oracle-ords/` → test schema query → mark "Available"
   - **Example:** Fabric REST API OpenAPI → `mcp-builder` → `mcp-servers/fabric-api/` → test workspace list → mark "Available"
2. **Skills (Priority 2):**
   - For each "To Build" skill:
     - Author `SKILL.md` following `.github/instructions/agent-skills.instructions.md`
     - Include frontmatter: `name`, `description` (with WHEN triggers: "Oracle migration", "Fabric deployment", etc.)
     - Body: Mission, When to Use, Prerequisites, Workflow, **Gotchas** (migration-specific traps), Troubleshooting
     - Bundle migration-specific scripts (data validation, schema comparison)
3. **Instructions (Priority 3):**
   - For each "To Build" instruction:
     - Author `.instructions.md` following `.github/instructions/instructions.instructions.md`
     - Frontmatter: `description`, `applyTo` glob (match migration artifact file patterns)
     - Body: domain knowledge (Oracle best practices, Fabric patterns, migration anti-patterns)
     - **Critical for modernization:** Include source→target translation patterns (e.g., "PL/SQL cursors → Python generators")
4. For each "To Find" capability:
   - Search MCP registry, awesome-mcp-servers, skills.sh
   - Document search results, install/configure if found
   - Fallback to "To Build" if not found
5. Update `05-capability-map.md`: change "To Build"/"To Find" → "Available", add file path/URL evidence

**Exit Gate:** All capabilities marked "Available". MCP servers for source + target platforms functional. Generated artifacts pass validation.

---

### Phase 7: Parity Testing Strategy Definition

**Objective:** Define API contract + parity testing approach to guarantee backward compatibility.

**Actions:**
1. Read `../skills/meta-agentic-method/SKILL.md` § Testing Strategy (Modernization)
2. **Parity Scope:** Parity is not limited to data-output matching. When the legacy system ships an automated behavioral/E2E/acceptance test suite (Playwright, Cypress, Selenium, contract suites, etc.), REUSE it as the cross-stack parity oracle:
   - Run the SAME test suite against legacy baseline and modernized target
   - Pass/fail delta = quantifiable parity
   - Behavioral/E2E tests assert observable behavior and are largely stack-agnostic
   - End-to-end/contract tests are the durable parity net; stack-specific unit tests usually don't port 1:1 and are re-authored
   - Applicable to ANY modernization: UI reskin, DB/ETL migration, service rewrite
3. **Golden Datasets:**
   - Extract representative inputs from legacy system (sample queries, API requests, data files)
   - Capture expected outputs from legacy system (responses, processed data, generated files)
   - Store as golden dataset in `docs/<scenario>-<slug>/golden-data/`
   - Document dataset provenance (what it represents, coverage %)
4. **API Contract Tests:**
   - For each API/interface to migrate, author contract tests:
     - Send identical inputs to legacy vs. modernized system
     - Assert byte-for-byte equality (or semantic equality with documented deviations)
     - Test error handling parity (same errors for same invalid inputs)
   - Frameworks: Pact (consumer-driven), Spring Cloud Contract, Postman/Newman
5. **Parity Test Plan:**
   - Create `docs/<scenario>-<slug>/07-parity-testing.md`:
     - Golden dataset inventory (inputs + expected outputs)
     - Contract test inventory (API endpoints, data transformations tested)
     - Parity success criteria (100% match? 99.9%? Acceptable deviations documented?)
     - Performance parity thresholds (legacy baseline + acceptable degradation)
     - Existing test suite reuse plan (if applicable): which suites run against both stacks, baseline pass rate, delta tolerance
6. **Continuous Parity Validation:**
   - Run parity tests continuously during migration (legacy system operational)
   - Track parity score over time (% of golden dataset passing)
   - Document divergences (intended vs. bugs)
6. Framework selection:
   - **Contract Testing:** Pact, Spring Cloud Contract, Postman/Newman (API validation)
   - **Data Validation:** Custom scripts comparing CSV/JSON/XML outputs
   - **Performance:** JMeter, k6, Locust (compare legacy vs. modernized throughput/latency)
   - See `../skills/meta-agentic-method/references.md` for framework sources
7. **CRITICAL:** Legacy system must remain operational during migration for comparison testing

**Exit Gate:** Golden datasets captured, contract tests authored, parity test plan documented. Baseline parity score established (legacy vs. itself = 100%).

---

### Phase 8: Team Formation

**Objective:** Define agent team roles and capabilities; materialize using chosen execution approach.

**Actions:**
1. Read `../skills/meta-agentic-method/SKILL.md` § Team Formation Algorithm
2. Apply algorithm with modernization specialization to define the **role roster** (independent of execution approach):
   - Map functional domains → agent roles using the **role archetypes** from `../skills/meta-agentic-method/references/team-formation.md` (e.g., Discovery/Knowledge-Architect, Domain/Architecture Lead, Implementation/Component Migrator, Data/Schema Migrator, Integration/API, Test/Parity Engineer, Reviewer/Quality, DevOps/Release)
   - **Modernization context examples** (illustrative, not prescriptive):
     - **Data migration scenario** (one of many): Extractor (source platform specialist), Transformer (schema/logic conversion), Provisioner (target platform specialist), Validator (data parity), Orchestrator (cutover sequence), SafetyNet (rollback)
     - **Web migration scenario**: LegacyAnalyzer, ComponentMigrator, RoutingAdapter, UIRefactorer, ContractValidator, DeploymentEngineer
     - **API modernization scenario**: APIDiscoverer, EndpointMapper, AuthenticationMigrator, ResponseTransformer, CompatibilityTester, TrafficCutoverManager
     - **Framework port scenario**: DependencyAnalyzer, CoreMigrator, PluginAdapter, TestingHarness, RegressionValidator, RolloutCoordinator
   - Assign capabilities from Capability Map to agents (≥1 per agent)
   - **Key modernization roles** (scenario-dependent):
     - Source platform specialist (extract/analyze legacy behavior)
     - Target platform specialist (provision/configure new system)
     - Validator/Parity Engineer (verify functional/data equivalence)
     - Cutover Orchestrator (sequence migration, monitor checkpoints)
     - Safety/Rollback Engineer (detect failure, trigger revert)
   - Define handoff protocol (e.g., Analyzer → produces `legacy-spec.md` → consumed by Mapper)
   - Designate reviewer agent (typically Validator/Parity role)
3. Scaffold `docs/<scenario>-<slug>/06-team.md` from `../skills/meta-agentic-method/templates/team.template.md`, fill placeholders, generate team roster rows with the role roster:

   **Example for data migration scenario:**

   | Agent Name | Role | Assigned Skills | Assigned Instructions | MCP Servers | Handoff To |
   |------------|------|-----------------|----------------------|-------------|------------|
   | OracleExtractor | Extract Oracle schema and data | `oracle-query-skill` | `oracle-best-practices.instructions.md` | `oracle-ords-mcp` | SchemaTransformer |
   | SchemaTransformer | Convert Oracle schema to Fabric format | `schema-mapping-skill` | `oracle-to-fabric.instructions.md` | - | FabricProvisioner |
   | FabricProvisioner | Provision Fabric lakehouse and pipelines | `fabric-deployment-skill` | `fabric-best-practices.instructions.md` | `fabric-api-mcp` | DataValidator |
   | DataValidator | Verify migration completeness and performance | `data-validation-skill` | - | `oracle-ords-mcp`, `fabric-api-mcp` | - |

4. **Document the chosen execution approach** in `06-team.md` under `## Execution Approach`.
5. **Document the chosen SDD framework** in `06-team.md` under `## SDD Framework` and note how framework artifacts map to the native workflow.

**Exit Gate:** ≥3 agents defined (source specialist, target specialist, validator), each with ≥1 capability, acyclic handoff chain, reviewer designated.

---

#### SDD Framework (choose one from Intake)

Recommended default for modernization work: **Spec-Kit**. This is optional and orthogonal to Execution Approach: framework controls how specs/workflow artifacts are produced; Execution Approach controls whether Custom Agents or Squad Team performs the work. For full details, follow `../skills/meta-agentic-method/SKILL.md` § "SDD Framework Selection (Optional)".

- **None — native pipeline:** Run this prompt's existing Assessment, target mapping, parity testing, staged migration, Verification, and Handoff phases unchanged. Native `docs/<scenario>-<slug>/` artifacts remain the source of truth.
- **GitHub Spec-Kit — recommended:** Initialize with `uvx --from git+https://github.com/github/spec-kit.git specify init . --integration copilot`, put migration principles in `/speckit.constitution`, express target capabilities in `/speckit.specify`, resolve ambiguity with `/speckit.clarify`, validate with `/speckit.checklist`, plan phased architecture with `/speckit.plan`, slice migration work with `/speckit.tasks`, run `/speckit.analyze` with parity gates, then `/speckit.implement`. Spec-Kit supersedes native Analysis and Execution structure; native Discovery, Assessment, Capability Mapping, Parity Testing, Team Formation, Verification, and Handoff still augment it.
- **OpenSpec:** Strong optional fit for incremental modernization. Use `npm install -g @fission-ai/openspec@latest && openspec init`, treat each migration slice as `openspec/changes/<change>/` with `/opsx:propose` or `/opsx:explore`, then `/opsx:apply`, `/opsx:verify`, `/opsx:sync`, and `/opsx:archive`. Use parallel changes only for independent components.
- **Superpowers:** Optional risk-reduction overlay. Use `brainstorming` → `writing-plans` → `test-driven-development` → `subagent-driven-development` or `executing-plans` → `requesting-code-review` → `finishing-a-development-branch`; enforce parity-first RED-GREEN-REFACTOR around adapter and contract tests.

Framework artifacts live alongside, or in place of the native `docs/<scenario>-<slug>/` artifacts as defined in SKILL.md. The Confidence Rubric and Verification phases still apply; lower confidence if required framework artifacts are missing, stale, unsynced, or unverified.

#### Execution Approach (choose one from Intake)

The role roster defined above materializes differently based on the approach chosen in Phase 1.

##### **Approach A — Custom Agents**

**Use when:** Linear workflows, simple handoffs, direct agent invocation preferred.

**Steps:**
1. For each role in the roster table above, create a standalone agent file following `.github/instructions/agents.instructions.md`:
   - Path: `.github/agents/<role-name>.agent.md`
   - Frontmatter: `name`, `description`, `tools` (match assigned skills/MCP servers from roster)
   - Body: role charter, assigned skills/instructions/MCP servers, **migration constraints** (parity, rollback, cutover strategy), handoff responsibilities
2. **Designate the Orchestrator** (`.github/agents/orchestrator.agent.md`) as the execution lead. It will read the roster and handoff DAG from `docs/<scenario>-<slug>/06-team.md` and drive Execution (Phase 9) by invoking the role agents as subagents.

**Artifact locations:**
- Agent files: `.github/agents/<role-name>.agent.md`
- Work products: `docs/<scenario>-<slug>/`

##### **Approach B — Squad Team**

**Use when:** Complex orchestration, parallel execution (e.g., parallel component migrations), reviewer gates, multi-agent coordination needed.

**Steps:**
1. The **Squad coordinator** (`.github/agents/squad.agent.md`) is already present in this repository — no installation needed
2. Hand the role roster to the Squad coordinator, which will hire members via its **native flow**:
   - Squad creates themed cast names (per `.squad/casting/registry.json`)
   - Squad generates `charter.md` and seeded `history.md` for each member
   - Squad updates `.squad/team.md` `## Members` table
   - Squad updates `.squad/routing.md` with task-to-agent routing
3. The Squad coordinator orchestrates execution (see Phase 9 for handoff details)

**Artifact locations:**
- Team roster: `.squad/team.md`
- Agent charters: `.squad/agents/<agent-name>/charter.md`
- Agent history: `.squad/agents/<agent-name>/history.md`
- Work products: `docs/<scenario>-<slug>/`
- Orchestration log: `.squad/orchestration-log/`

**Key point:** Both approaches use the **same skills, instructions, and MCP servers** from the roster. The difference is how agents are stored, invoked, and coordinated. Squad (Approach B) is pre-installed in this repository; see `../agents/squad.agent.md` for coordinator details.

---

### Phase 9: Execution (Iterative Migration)

**Objective:** Execute migration using agent team, maintaining parity with legacy system.

**Actions:**
1. Scaffold `docs/<scenario>-<slug>/plan.md` from `../skills/meta-agentic-method/templates/plan.template.md`, fill placeholders, generate execution plan with migration phases and cutover milestones.
2. Scaffold `docs/<scenario>-<slug>/tasks.md` from `../skills/meta-agentic-method/templates/tasks.template.md`, fill placeholders, generate task breakdown per functional domain.
3. Create `docs/<scenario>-<slug>/execution-log.md` (append-only timestamped log)
4. **Pre-execution baseline:**
   - Capture source system metrics (scenario-dependent: data row counts for data migrations, API response signatures for API modernization, rendering snapshots for UI ports, test suite runtime for framework migrations)
   - Document cutover plan: sequence, rollback triggers, success checkpoints
   - Log baseline with scenario-appropriate detail
5. **🚦 Human Validation Gate (MANDATORY — TERMINAL STOP):**
   - Present the user with a concise summary and the following generated planning documents for in-person review in `docs/<scenario>-<slug>/`:
     - `00-intake.md` (migration request and clarifications)
     - `01-discovery.md` (legacy system architecture and component inventory, if source available)
     - `wiki/` (repo-wiki index and summaries, if source available)
     - `02-assessment.md` (legacy capability inventory and target platform mapping)
     - `04-analysis.md` (migration strategy and success criteria)
     - `05-capability-map.md` (MCP servers, skills, instructions, agents)
     - `06-team.md` (agent roster and responsibilities)
     - `07-testing-strategy.md` (parity testing plan with golden datasets)
     - `plan.md` (execution plan with migration phases and cutover milestones)
     - `tasks.md` (task breakdown per functional domain)
     - Any SDD-framework-native specs generated if a framework was chosen (e.g., Spec-Kit `spec.md`/`plan.md`/`tasks.md`, OpenSpec change proposal, Superpowers plan)
   - **This is the end of the planning run. END YOUR TURN HERE.**
   - **Do NOT invoke the execution lead, do NOT select or materialize an execution agent, do NOT perform any subsequent step or phase in this run.**
   - **▶ Next action (yours):**
     - If you want changes: re-run or continue this planning prompt to revise the docs, then the gate is re-presented.
     - If you approve: **in a SEPARATE new request**, select the execution agent yourself:
       - **Approach A (Custom Agents):** `@orchestrator execute the plan`
       - **Approach B (Squad):** Select/invoke the Squad coordinator and tell it to execute the plan
     - **Agent selection is a human action** — the assistant cannot select the custom agent on your behalf.

---

**⛔ EXECUTION BOUNDARY — everything below runs ONLY in the separate, user-initiated execution invocation (after you select the execution agent). The planning run does NOT cross this line.**

---

6. **Hand off to execution lead (execution invocation only):**
   - **Approach A (Orchestrator):** Invoke `.github/agents/orchestrator.agent.md`.
   - **Approach B (Squad):** The Squad coordinator (`.github/agents/squad.agent.md`) drives execution.
   - **BOTH approaches MUST follow** `../skills/meta-agentic-method/references/execution-method.md` (shared execution contract): analyze generated docs → branch on SDD framework choice (None = Plan Mode enrich plan.md/tasks.md in place with writing-plans fallback; framework = strict native loop with docs as source of truth, per `../skills/meta-agentic-method/references/sdd-frameworks.md`) → test-driven every slice → rubber-duck contra-model review (auto-opposite model, additional beat feeding reviewer gate with strict lockout) → realtime HTML progress report updates (progress + testExecution + reviews) → completion + confidence.
7. Record architecture decisions in `docs/<scenario>-<slug>/adr/*.md`:
   - Use standard ADR format: Status, Context, Decision, Consequences
   - **Migration-specific ADRs** (scenario-dependent examples): data type mappings (e.g., Oracle NUMBER → Fabric DECIMAL), CDC strategy, API contract versioning, UI component library choice, framework adapter patterns
8. **Cutover execution:**
   - Document cutover steps (scenario-dependent: freeze source, migrate final delta, validate, switch traffic for data/API migrations; phased rollout for UI/framework ports)
   - Log cutover timeline with checkpoints
   - Monitor for rollback triggers

**Exit Gate:** All success criteria met, parity validation passes (data, API contracts, UI behavior, test coverage as appropriate to scenario), target system operational, rollback plan documented.

---

### Phase 10: Verification

**Objective:** Validate migration against requirements and parity with legacy system.

**Actions:**
1. Scaffold `docs/<scenario>-<slug>/verification.md` from `../skills/meta-agentic-method/templates/verification.template.md`, fill placeholders, generate:
   - **Requirements Traceability Matrix:** Map each success criterion → artifact(s) that satisfy it
   - **Parity Report** (scenario-dependent validation):
     - **Data migration example:** Row count comparison (source vs. target per table/entity), schema validation (data types, constraints, indexes), data sampling validation (checksum/hash comparison for representative sample)
     - **API modernization example:** Contract parity (request/response schemas, status codes, error formats), endpoint mapping verification, authentication flow equivalence
     - **UI migration example:** Visual regression testing (screenshot diff), interaction parity (user flows, accessibility), rendering consistency (cross-browser, responsive)
     - **Framework port example:** Test suite parity (all tests ported and passing), API surface equivalence (public methods/classes), behavior consistency (integration test results)
   - **Performance Comparison:**
     - Baseline operations from source system → equivalent operations on target
     - Document performance delta (% faster/slower)
   - **Test Results:** Pass/fail per criterion (run automated tests)
   - **Known Limitations:** Document acceptable gaps (deprecated features not migrated, performance trade-offs, scope exclusions)
2. Scaffold `docs/<scenario>-<slug>/checklist.md` from `../skills/meta-agentic-method/templates/checklist.template.md`, fill placeholders, generate migration quality gate checklist.
3. Calculate **Confidence Score** using rubric from `../skills/meta-agentic-method/SKILL.md`:
   - Score 6 dimensions (0-100 each): Capability Coverage, MCP Availability, Skill/Instruction Coverage, Data/Domain Knowledge, Spec Completeness, Verification Status
   - Weights: 25%, 20%, 15%, 15%, 15%, 10%
   - Formula: `sum(dimension_score × weight)`
   - Band: High (≥80, green), Medium (50-79, amber), Low (<50, red)
   - **Modernization adjustment:** 
     - Penalize MCP Availability if source/target platform MCP servers missing (critical for migration)
     - Reward Data/Domain Knowledge if source platform expertise documented
4. Document score breakdown in `verification.md`

**Exit Gate:** ≥80% success criteria met (or documented exceptions), parity validated per scenario requirements (≥99.9% for data migrations, 100% for API contracts, acceptable visual delta for UI, full test suite pass for framework ports), confidence score calculated.

---

### Phase 11: Handoff

**Objective:** Package migration deliverables for user handoff.

**Actions:**
1. Scaffold `docs/<scenario>-<slug>/README.md` from `../skills/meta-agentic-method/templates/summary.template.md`, fill placeholders, generate:
   - **Executive Summary:** 2-3 paragraph overview of migration completed
   - **Artifacts Inventory:** Links to all docs, code, configs, migration scripts
   - **Confidence Score:** Overall score with dimension breakdown
   - **Migration Summary:** What was migrated, what was left behind (deprecated features, out-of-scope items), volume/scope metrics (scenario-dependent: data volume for data migrations, endpoint count for API modernization, component count for UI ports, module count for framework migrations)
   - **Performance Comparison:** Source vs. target metrics (scenario-appropriate: query latency, API response times, rendering speed, test suite runtime)
   - **Rollback Plan:** How to revert to source system if needed (time-sensitive)
   - **Next Steps:** Clear actions for user (scenario-dependent examples: "Decommission legacy instance", "Monitor target performance for 30 days", "Migrate remaining non-critical components", "Update client SDKs", "Train team on new framework")
   - **Known Gaps:** Documented limitations and recommended follow-up (e.g., "Real-time sync not implemented; batch runs hourly", "Legacy admin UI not ported; use new admin panel", "Deprecated endpoints removed; update clients to v2 API")
2. **Generate HTML Report:**
   - Copy `../skills/progress-report/progress-report.template.html` → `docs/<scenario>-<slug>/progress-report.html`
   - The report is **updated in realtime during execution** (progress timeline, testExecution summary + suites, contra-model reviews) per `../skills/progress-report/SKILL.md`.
   - At handoff, finalize `<script id="report-data">` JSON block with:
     ```json
     {
       "scenario": "<migration description, e.g., 'Oracle → Fabric ETL Pipeline Migration', 'Express → Fastify API Modernization', 'AngularJS → React UI Port'>",
       "promptType": "modernization",
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
         {"name": "Assessment", "status": "done", "artifact": "03-assessment.md"},
         {"name": "Analysis", "status": "done", "artifact": "04-analysis.md"},
         {"name": "Capability Mapping", "status": "done", "artifact": "05-capability-map.md"},
         {"name": "Capability Acquisition", "status": "done", "artifact": null},
         {"name": "Team Formation", "status": "done", "artifact": "06-team.md"},
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
         {"name": "oracle-ords-mcp", "source": "built from Oracle ORDS OpenAPI", "connectionStatus": "connected"},
         {"name": "fabric-api-mcp", "source": "built from Fabric REST API OpenAPI", "connectionStatus": "connected"}
       ],
       "risks": [
         {"severity": "medium", "description": "Real-time CDC not implemented; hourly batch sync may lag"}
       ],
       "testExecution": {
         "summary": {"passed": <n>, "failed": <n>, "notRun": <n>, "skipped": <n>, "total": <n>, "coverage": <0-100 or null>},
         "suites": [{"name": "<domain>", "type": "unit|integration|e2e|bdd", "status": "passed|failed|not-run|skipped", "passed": <n>, "failed": <n>, "total": <n>, "notes": "<summary>"}]
       },
       "reviews": [
         {"slice": "<domain>", "author": "<agent or model>", "reviewerModel": "gpt-5.x|claude-opus-4.x", "verdict": "approved|changes-requested|rejected", "findings": <n>, "notes": "<summary>"}
       ]
     }
     ```
   - See `../skills/progress-report/SKILL.md` for full schema (testExecution and reviews added by Trinity).
   - Verify report renders correctly in browser

**Exit Gate:** README self-contained, HTML report renders with live confidence score, rollback plan documented.

---

### Phase 12: Template Feedback (If Applicable)

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
- Add new team members, capabilities, MCP servers as discovered/built
- Recalculate confidence dimensions as data becomes available
- Update `generatedAt` timestamp

This ensures real-time visibility into migration progress.

## Output Expectations

**Primary Deliverables:**
- `docs/<scenario>-<slug>/` folder with all phase artifacts (includes Discovery, Assessment, and `wiki/` repo-wiki)
- Custom agent files in `.github/agents/` (migration-specific agents)
- Skills in `.github/skills/<name>/SKILL.md` (migration/transformation skills)
- Instructions in `.github/instructions/<name>.instructions.md` (source→target domain knowledge)
- **MCP servers in `mcp-servers/`:** Likely includes source platform MCP (Oracle) + target platform MCP (Fabric) generated from OpenAPI specs
- Self-rendering `progress-report.html` with confidence score

**Artifact Count (Modernization):**
- Minimum 10 markdown docs (intake, discovery, assessment, analysis, capability-map, team, execution-log, verification, README, ≥1 ADR)
- HTML report (1 file)
- ≥3 custom agent files (source specialist, target specialist, validator)
- ≥2 MCP servers (source + target platforms, often built via mcp-builder)
- Variable skills/instructions based on scenario

**Success Indicators:**
- All 10 SDD phases completed (includes Discovery + Assessment)
- Confidence score ≥50 (Medium or High band)
- Data parity ≥99.9% (row count, schema match)
- HTML report displays confidence gauge correctly
- All platform MCP server gaps closed (built from OpenAPI)

## Quality Assurance / Validation

Run this checklist before declaring workflow complete:

- [ ] `00-intake.md` exists with clarifying questions answered (source + target platforms confirmed)
- [ ] Legacy source is read-only at `legacy/` when source is accessible, and raw files are not default context
- [ ] `docs/<scenario>-<slug>/wiki/wiki-index.json` exists or `02-discovery.md` records why source-level wiki generation was impossible
- [ ] `02-discovery.md` has legacy system architecture (or "best-effort" if external system)
- [ ] `03-assessment.md` has gap analysis table mapping every legacy capability to target equivalent
- [ ] `04-analysis.md` has ≥2 functional domains with success criteria (including data parity threshold)
- [ ] `05-capability-map.md` shows no "Unknown" or "TBD" statuses; platform MCP server gaps documented with build path
- [ ] All generated `*.agent.md` files follow `.github/instructions/agents.instructions.md`
- [ ] All generated `SKILL.md` files follow `.github/instructions/agent-skills.instructions.md` (description has WHEN triggers: migration keywords)
- [ ] All generated `*.instructions.md` files follow `.github/instructions/instructions.instructions.md` (include source→target translation patterns)
- [ ] `06-team.md` has ≥3 agents (source specialist, target specialist, validator) with capability assignments
- [ ] `execution-log.md` has baseline metrics + timestamped migration steps + cutover timeline
- [ ] `verification.md` contains data parity report (row counts, schema validation) + confidence score with dimension breakdown
- [ ] `README.md` has migration summary, performance comparison, rollback plan, next steps
- [ ] `progress-report.html` exists and renders (open in browser)
- [ ] Report JSON `confidenceDimensions` weights sum to 1.0
- [ ] Report `overallConfidence.score` matches formula: `sum(dimension_score × weight)`
- [ ] Report `mcpServers` section lists source + target platform MCP servers with connection status
- [ ] MCP servers for both source and target platforms functional (or documented as missing with workaround)
- [ ] No secrets or credentials in generated files
- [ ] Data parity validation passed (≥99.9% row match documented)

## Worked Example: Oracle → Microsoft Fabric ETL Pipeline Migration

**User Prompt:**  
"Migrate Oracle-based ETL pipeline to Microsoft Fabric"

**Expected Flow:**
1. **Intake:** Ask Oracle version, data volume (TB?), Fabric target (Lakehouse/Warehouse?), downtime tolerance, performance targets, compliance
2. **Discovery:** Query Oracle schema (47 tables, 2.3 TB), inventory PL/SQL procedures (23 procedures), map cron jobs (12 jobs), identify CDC mechanism (custom log-based)
3. **Assessment:** 
   - Gap table: PL/SQL → Fabric dataflows (High complexity), Cron → Fabric triggers (Low), Custom CDC → Fabric change feed (Medium)
   - Risks: Data type mismatches (Oracle NUMBER precision), downtime during cutover, performance degradation risk
4. **Analysis:** Domains = [Schema Extraction, Schema Transformation, Fabric Provisioning, Data Migration, Validation], Success = "100% tables migrated <0.01% loss", "Query perf within 10% of Oracle baseline"
5. **Capability Mapping:**
   - Search MCP registry → no Oracle MCP server found → mark "To Build" (Oracle ORDS OpenAPI → mcp-builder)
   - Search MCP registry → no Fabric MCP server found → mark "To Build" (Fabric REST API OpenAPI → mcp-builder)
   - Find `data-transformation-skill` → mark "Available"
   - Mark `oracle-to-fabric.instructions.md` "To Build" (PL/SQL→Python conversion patterns)
6. **Capability Acquisition:**
   - Build `oracle-ords-mcp` from Oracle ORDS OpenAPI → test schema query → "Available"
   - Build `fabric-api-mcp` from Fabric REST API OpenAPI → test workspace list → "Available"
   - Generate `oracle-to-fabric.instructions.md` with data type mappings
7. **Team Formation:** Agents = [OracleExtractor (uses oracle-ords-mcp), SchemaTransformer, FabricProvisioner (uses fabric-api-mcp), DataValidator (uses both MCPs)]
8. **Execution:** Extract 47 tables → transform schemas (23 PL/SQL procedures rewritten as Python) → provision Fabric lakehouse → migrate data in batches → validate row counts (all 47 tables: 100% match)
9. **Verification:** Data parity 99.98%, performance comparison (queries 5% faster on Fabric), confidence = 82 (High/Green)
10. **Handoff:** README with decommission plan, rollback steps (revert DNS to Oracle), monitoring checklist. Report shows 82 score with green gauge, both MCP servers listed as "connected"

---

**Related Workflows:**
- For new systems: `.github/prompts/green-field.prompt.md`
- For extending existing systems: `.github/prompts/brown-field.prompt.md`

**References:**
- SDD phases: `../skills/meta-agentic-method/SKILL.md`
- MCP/skill catalog: `../skills/meta-agentic-method/references.md`
- Report template: `../skills/progress-report/progress-report.template.html`
