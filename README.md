# Meta-Agentic Template for GitHub Copilot

A comprehensive framework for authoring high-quality GitHub Copilot artifacts (custom agents, skills, instructions, prompts, and hooks) and orchestrating AI-powered development teams using Spec-Driven Development (SDD) methodology.

## Table of Contents

- [What This Is](#what-this-is)
- [Prerequisites](#prerequisites)
- [Repository Structure](#repository-structure)
- [Choosing a Scenario Prompt](#choosing-a-scenario-prompt)
- [Two Ways to Run: Custom Agents vs. Squad Team](#two-ways-to-run-custom-agents-vs-squad-team)
- [Step-by-Step Process](#step-by-step-process)
- [Understanding the Status Report](#understanding-the-status-report)
- [Extending the Template](#extending-the-template)
- [Conventions and Best Practices](#conventions-and-best-practices)
- [Additional Resources](#additional-resources)

## What This Is

This repository is a **meta-agentic template** that provides:

1. **Authoring Guidelines**: Standardized instructions for creating GitHub Copilot artifacts that work across VS Code, Copilot CLI, and GitHub.com
2. **Spec-Driven Development (SDD) Workflows**: Three comprehensive scenario prompts for orchestrating AI teams through complete development lifecycles
3. **Squad AI Team System**: A coordinator agent that forms specialized teams, discovers capabilities, and produces verified deliverables with real-time confidence scoring
4. **Reusable Capabilities**: Pre-built skills for discovering ecosystem tools, generating MCP servers from OpenAPI specs, and creating new skills

### Key Features

- **Three Scenario Workflows**: Green-field (build new), brown-field (extend existing), and modernization (migrate/replace) prompts
- **Automatic Capability Discovery**: Finds existing skills, MCP servers, and tools from registries; builds missing ones on demand
- **Real-Time Progress Tracking**: Self-rendering HTML reports with confidence scoring updated after each phase
- **Team-Based Execution**: Forms custom agent teams with assigned capabilities, MCP servers, and handoff protocols
- **Production-Ready Artifacts**: Generates agents, skills, instructions, and MCP servers following repository standards

## Prerequisites

### Required

- **VS Code** with GitHub Copilot (Chat / agent mode) OR **Copilot CLI**
- **GitHub Copilot subscription** (individual, business, or enterprise)
- **Node.js** (v18+) for `npx skills` commands and MCP server generation
- **Git** for version control

### Recommended

- **`gh` CLI** (optional, for GitHub issues and Squad workflows)
- **Access to domain systems** relevant to your scenario (e.g., Oracle databases, Microsoft Fabric, cloud platforms)

### Environment Setup

```bash
# Verify prerequisites
node --version  # Should be v18 or higher
git --version
gh --version    # Optional but recommended

# Install skills CLI (if using ecosystem skills)
npx skills --version
```

## Repository Structure

| Path | Purpose |
|------|---------|
| `.github/prompts/` | Scenario workflows (green-field, brown-field, modernization) and shared methodology |
| `.github/prompts/templates/` | Progress report HTML template and documentation |
| `.github/prompts/shared/` | Meta-agentic method (SDD phase model + confidence rubric) |
| `.github/prompts/references.md` | Authoritative sources for MCP servers, skills, and Copilot customizations |
| `.github/instructions/` | Authoring guidelines for each artifact type |
| `.github/skills/` | Reusable agent skills (`find-skills`, `mcp-builder`, `skill-creator`) |
| `.github/agents/` | Custom agents including Squad coordinator (`squad.agent.md`) |
| `.squad/` | Squad team management (team.md, routing.md, decisions.md, agent folders) |

### Authoring Guidelines (`.github/instructions/`)

- **`agent-skills.instructions.md`** → Creating agent skills (`**/skills/**/SKILL.md`)
- **`agents.instructions.md`** → Creating custom agents (`**/*.agent.md`)
- **`instructions.instructions.md`** → Creating instruction files (`**/*.instructions.md`)
- **`prompt.instructions.md`** → Creating prompt files (`**/*.prompt.md`)
- **`hooks.instructions.md`** → Creating lifecycle hooks (`.github/hooks/**`)
- **`caveman-mode.instructions.md`** → Terse, low-token output mode

## Choosing a Scenario Prompt

Select the workflow that matches your development scenario:

| Scenario | Prompt File | Use When | Entry Phase | Example |
|----------|-------------|----------|-------------|---------|
| **Green-Field** | `green-field.prompt.md` | Building a NEW system from scratch | Analysis | "Customer portal with Next.js and PostgreSQL" |
| **Brown-Field** | `brown-field.prompt.md` | EXTENDING or MODIFYING existing codebase | Discovery | "Add OAuth to legacy Express.js API" |
| **Modernization** | `modernization.prompt.md` | MIGRATING platforms or MODERNIZING legacy systems | Assessment | "Oracle ETL pipeline to Microsoft Fabric" |

### When to Use Each Scenario

**Green-Field** is ideal when:
- No existing codebase
- Requirements are high-level or incomplete
- Target technology stack is known or discoverable
- Goal is production-ready deliverables with documentation

**Brown-Field** is ideal when:
- Existing system needs new features or changes
- System architecture must be discovered before planning changes
- Risk tolerance requires understanding current state
- Goal is to preserve existing functionality while adding capabilities

## Two Ways to Run: Custom Agents vs. Squad Team

All three scenario prompts support **two execution approaches**. You choose during the Intake phase (the prompt will ask). The same team roles, skills, instructions, and MCP servers are used in both — only the orchestration mechanism differs.

### Comparison Table

| Criteria | **Approach A — Custom Agents** | **Approach B — Squad Team** |
|----------|--------------------------------|----------------------------|
| **Setup** | Generate standalone `.agent.md` files in `.github/agents/` | Use pre-installed Squad coordinator (`.github/agents/squad.agent.md`) + hire roles into `.squad/agents/` |
| **Orchestration** | User invokes agents individually; agents coordinate via documented handoffs | Squad coordinator spawns agents, inlines charters, enforces handoffs |
| **Parallelism** | Manual; user launches multiple agents or agents invoke sub-agents | Built-in parallel fan-out for independent tasks |
| **Reviewer Gates** | Documented in agent charters; enforced by manual invocation sequence | Enforced by Squad coordinator; reviewer approval required to proceed |
| **Best For** | Linear workflows, simple handoffs, direct agent control | Complex orchestration, parallel execution, multi-agent coordination |
| **Artifacts Live** | `.github/agents/<role>.agent.md` | `.squad/agents/<role>/charter.md` + `history.md` |
| **Orchestration Log** | None (manual tracking) | `.squad/orchestration-log/` maintained by Scribe |

### When to Choose Each

**Choose Custom Agents (A) when:**
- Workflow is linear with simple sequential handoffs
- You prefer direct control over agent invocation
- Team size is small (2-3 agents)
- Orchestration complexity is low

**Choose Squad Team (B) when:**
- Workflow benefits from parallel execution (e.g., parallel table migrations, independent module builds)
- Complex handoff protocols with reviewer gates are needed
- Team size is larger (4+ agents)
- Centralized orchestration log and coordination is valuable
- **Default for multi-agent scenarios in this template**

### How It Works

#### Approach A — Custom Agents

1. **Team Formation Phase** generates:
   - One `.github/agents/<role-name>.agent.md` per role (following `.github/instructions/agents.instructions.md`)
   - Each file contains: frontmatter (`name`, `description`, `tools`), role charter, assigned skills/instructions/MCP servers, handoff protocol

2. **Execution**:
   - User invokes agents directly: `@<agent-name> [task]`
   - Agents invoke other agents via `task` tool when handoffs occur
   - Work products written to `docs/<scenario>-<slug>/`

3. **Example invocation**:
   ```
   @APIBuilder Create REST endpoints for user authentication
   # APIBuilder completes, signals handoff
   @DatabaseArchitect Design schema for user authentication
   ```

#### Approach B — Squad Team

1. **Squad is pre-installed** in this repository:
   - Coordinator: `.github/agents/squad.agent.md`
   - Team management: `.squad/team.md`, `.squad/routing.md`, `.squad/decisions.md`
   - No installation needed — ready to use

2. **Team Formation Phase** hires roles as Squad members:
   - For each role, create `.squad/agents/<role-name>/charter.md` (same role definition as Custom Agents)
   - Assign same skills, instructions, MCP servers from roster
   - Create `.squad/agents/<role-name>/history.md` seeded with project context
   - Update `.squad/team.md` roster under `## Members`

3. **Execution**:
   - User invokes Squad coordinator: `@squad [task]`
   - Coordinator spawns agents using `task` tool, inlines their charters
   - Enforces handoff protocol and reviewer gates
   - Scribe maintains orchestration log in `.squad/orchestration-log/`
   - Work products written to `docs/<scenario>-<slug>/`

4. **Example invocation**:
   ```
   @squad Build user authentication system
   # Squad coordinator spawns APIBuilder, DatabaseArchitect, Validator in sequence
   # Coordinator enforces handoffs and reviewer approval
   # Scribe logs all actions
   ```

**Key Point**: Both approaches use the **exact same roles, skills, instructions, and MCP servers** from the team formation roster. The roster is defined once; the execution approach determines how agents are stored and coordinated.

See `.github/agents/squad.agent.md` for Squad coordinator details.

**Modernization** is ideal when:
- Migrating from one platform/technology to another
- Modernizing legacy system to current-generation stack
- Legacy capabilities must be preserved or enhanced
- Migration risk assessment is critical

## Step-by-Step Process

This walkthrough uses the **Modernization** scenario with the Oracle → Microsoft Fabric ETL migration as a worked example.

### 1. Invoke the Prompt

**In VS Code Copilot Chat:**
```
@workspace /modernization Oracle ETL pipeline to Microsoft Fabric
```

**In Copilot CLI:**
```bash
gh copilot prompt modernization "Oracle ETL pipeline to Microsoft Fabric"
```

### 2. Answer Clarifying Questions (Phase 1: Intake)

The workflow asks clarifying questions to resolve ambiguities:

- **Source system details**: Oracle version, ETL tool (GoldenGate, custom scripts), data volume
- **Target platform**: Microsoft Fabric components (Data Factory, Lakehouse, Data Warehouse)
- **Migration constraints**: Downtime tolerance, data validation requirements, compliance
- **Success criteria**: Performance parity, cost reduction targets, operational metrics

**Example answers:**
```
Source: Oracle 19c with custom PL/SQL ETL jobs (500GB daily volume)
Target: Microsoft Fabric Lakehouse + Data Factory dataflows
Constraints: <4 hour migration window, zero data loss, maintain audit trail
Success: Match current 2hr processing time, reduce cost by 30%
Execution Approach: Squad Team (benefits from parallel table migrations and reviewer gates)
```

The workflow creates `docs/oracle-fabric-etl/00-intake.md` capturing your responses.

### 3. Workflow Executes SDD Phases

The prompt orchestrates the complete workflow:

#### **Phase 2: Assessment** (Modernization-specific)
- Evaluates legacy Oracle ETL capabilities
- Identifies technical debt (EOL versions, security gaps)
- Maps target Fabric requirements
- Creates `03-assessment.md` with gap analysis

#### **Phase 3: Analysis**
- Decomposes scenario into functional domains (e.g., Data Extraction, Transformation, Loading, Monitoring)
- Defines success criteria per domain
- Lists capability requirements
- Creates `01-analysis.md`

#### **Phase 4: Capability Mapping**
- Searches for existing skills/MCP servers in:
  - Repository (`.github/skills/`, `.github/instructions/`)
  - Ecosystem registries (`references.md`)
  - MCP registries (modelcontextprotocol.io, awesome-mcp-servers)
- Creates `05-capability-map.md`:

| Capability Needed | Type | Source | Status | Evidence |
|-------------------|------|--------|--------|----------|
| Oracle schema introspection | MCP server | Build from Oracle REST API | To Build | OpenAPI spec available |
| Fabric API integration | MCP server | Build from Fabric REST API | To Build | Microsoft Fabric REST API docs |
| Data transformation logic | Skill | Reuse existing | Available | `.github/skills/data-transform/` |
| Migration validation | Instruction | Generate new | To Build | Follow `instructions.instructions.md` |

#### **Phase 5: Capability Acquisition**
- **Builds missing MCP servers** using `mcp-builder` skill + OpenAPI specs
- **Generates new skills** following `agent-skills.instructions.md`
- **Creates instructions** following `instructions.instructions.md`
- Tests MCP connections and validates artifacts
- Updates capability map: "To Build" → "Available"

#### **Phase 6: Team Formation**
- Forms custom agent team based on functional domains
- Assigns capabilities (skills, instructions, MCP servers) to each agent
- Defines handoff protocol
- **User's chosen execution approach** (Custom Agents or Squad Team) determines how roles materialize
- Creates `06-team.md`:

| Agent Name | Role | Assigned Skills | Assigned Instructions | MCP Servers | Handoff To |
|------------|------|-----------------|----------------------|-------------|------------|
| OracleExtractor | Extract Oracle schema and data | `oracle-query` | `data-extraction.instructions.md` | `oracle-mcp` | DataTransformer |
| DataTransformer | Convert Oracle schema to Fabric format | `data-transform`, `fabric-api` | `fabric-schema.instructions.md` | `fabric-mcp` | Loader |
| Loader | Load data into Fabric Lakehouse | `fabric-load` | `fabric-loading.instructions.md` | `fabric-mcp` | Validator |
| Validator | Verify migration completeness | `migration-validate` | `validation.instructions.md` | - | - |

**If Custom Agents (A):** Generates `.github/agents/<role>.agent.md` files  
**If Squad Team (B):** Hires roles into `.squad/agents/<role>/charter.md` + updates `.squad/team.md`

| Agent Name | Role | Assigned Skills | Assigned Instructions | MCP Servers | Handoff To |
|------------|------|-----------------|----------------------|-------------|------------|
| OracleExtractor | Extract Oracle schema and data | `oracle-query` | `data-extraction.instructions.md` | `oracle-mcp` | DataTransformer |
| DataTransformer | Convert Oracle schema to Fabric format | `data-transform`, `fabric-api` | `fabric-schema.instructions.md` | `fabric-mcp` | Loader |
| Loader | Load data into Fabric Lakehouse | `fabric-load` | `fabric-loading.instructions.md` | `fabric-mcp` | Validator |
| Validator | Verify migration completeness | `migration-validate` | `validation.instructions.md` | - | - |

#### **Phase 7: Execution**
- Instantiates agent team
- Each agent executes their assigned domain
- Produces spec documents, code, and migration scripts
- Logs progress in `execution-log.md`
- Records architecture decisions in `adr/*.md`

#### **Phase 8: Verification**
- Validates deliverables against success criteria
- Creates requirements traceability matrix
- Calculates confidence score (see below)
- Documents test results in `verification.md`

#### **Phase 9: Handoff**
- Generates executive summary in `README.md`
- Lists all artifacts and next steps
- **Generates HTML progress report** at `docs/oracle-fabric-etl/progress-report.html`

### 4. Track Progress

After each phase, the workflow updates `progress-report.html`. Open it in a browser to view:
- Current phase status
- Overall confidence score with color-coded gauge
- Dimension breakdown (capability coverage, MCP availability, etc.)
- Team roster with assigned capabilities
- Capability acquisition status (found/built/reused/missing)
- MCP server connection status
- Identified risks and gaps

**No network required** — the HTML is self-contained and renders immediately.

## Understanding the Status Report

The progress report provides real-time visibility into workflow execution with confidence scoring.

![Status Report](docs/images/status-report.png)

### Key Elements Explained

#### 1. Header Section
- **Scenario**: Project name (e.g., "Oracle → Microsoft Fabric ETL Migration")
- **Type**: Prompt variant (green-field / brown-field / modernization)
- **Current Phase**: Active SDD phase
- **Generated At**: Last update timestamp

#### 2. Overall Confidence Gauge
- **Score (0-100)**: Weighted aggregate of 6 dimensions
- **Color Bands**:
  - **Green (80-100)**: High confidence — ready for production execution with minimal risk
  - **Amber (50-79)**: Medium confidence — viable with documented gaps; manual intervention likely
  - **Red (0-49)**: Low confidence — significant blockers; not recommended for execution
- **Interpretation**: One-sentence summary explaining score

#### 3. Confidence Dimensions (6 Metrics)

| Dimension | Weight | What It Measures |
|-----------|--------|------------------|
| **Capability Coverage** | 25% | Percentage of required capabilities available (≥80% = full, 50-79% = partial, <50% = critical gap) |
| **MCP Availability** | 20% | Data source access via MCP servers (all sources = 100, some = 50, none = 0) |
| **Skill/Instruction Coverage** | 15% | Documented workflows and best practices (complete = 100, core only = 50, none = 0) |
| **Data/Domain Knowledge** | 15% | Domain artifacts like schemas, OpenAPI specs, data samples (full = 100, partial = 50, none = 0) |
| **Spec Completeness** | 15% | All phase artifacts present and complete (all = 100, some incomplete = 50, ≥2 missing = 0) |
| **Verification Status** | 10% | Testing and validation (automated tests pass = 100, manual verification = 50, none = 0) |

**Formula:**
```
Confidence Score = 
  (Capability Coverage × 0.25) +
  (MCP Availability × 0.20) +
  (Skill/Instruction Coverage × 0.15) +
  (Data/Domain Knowledge × 0.15) +
  (Spec Completeness × 0.15) +
  (Verification Status × 0.10)
```

#### 4. Phase Timeline
Shows status for all SDD phases:
- **Pending** (gray): Not started
- **In Progress** (blue): Currently executing
- **Done** (green): Completed with artifact link
- **Blocked** (red): Cannot proceed

#### 5. Team Roster
Lists custom agents with:
- Agent name and role
- Assigned skills
- Assigned instruction files
- MCP servers they use

#### 6. Capability Acquisition Table
Tracks how each capability was obtained:
- **Found** (green): Discovered in existing repository or ecosystem
- **Built** (green): Generated using `mcp-builder` or created following guidelines
- **Reused** (blue): Generic existing capability repurposed
- **Missing** (red): Required but not yet available (gap)

#### 7. MCP Servers
Lists MCP servers with:
- Server name
- Source (registry / built from OpenAPI / found)
- Connection status (connected / disconnected)

#### 8. Risks & Gaps
Identified blockers and issues:
- **Critical** (red): Must address before proceeding
- **High** (orange): Significant impact, mitigate soon
- **Medium** (yellow): Moderate impact, plan mitigation
- **Low** (gray): Minor issue, document and monitor

### Reading the Confidence Score

**High Confidence (≥80):**
- All capabilities available, MCP servers connected
- Complete skill/instruction coverage
- Full domain knowledge with artifacts
- All specs complete, automated tests passing
- **Action**: Proceed with execution confidently

**Medium Confidence (50-79):**
- Most capabilities available, some gaps documented
- Partial MCP coverage, some manual fallbacks
- Core workflows documented, edge cases missing
- Most specs complete, manual verification done
- **Action**: Execute with manual intervention plan; address gaps in parallel

**Low Confidence (<50):**
- Major capability gaps or missing MCP servers
- No skills/instructions; agents improvising
- Limited domain knowledge
- Missing ≥2 phase artifacts or no testing
- **Action**: Stop and resolve blockers before proceeding

## Extending the Template

### Adding a New Skill

Use the `skill-creator` skill for interactive creation:

```
@workspace Use the skill-creator skill to create a new skill for [purpose]
```

Or manually:

1. Create folder: `.github/skills/<skill-name>/`
2. Write `SKILL.md` following `.github/instructions/agent-skills.instructions.md`
3. Include YAML frontmatter: `name`, `description` (with WHEN triggers and KEYWORDS)
4. Add bundled resources: `scripts/`, `references/`, `templates/` (as needed)

**Standing Decision** (`.squad/decisions.md`, 2026-06-08): All squad agents MUST follow the matching `.github/instructions/` guideline when creating artifacts.

### Adding a New Agent

1. Create `<name>.agent.md` in `.github/agents/`
2. Follow `.github/instructions/agents.instructions.md` for frontmatter and structure
3. Define clear role, responsibilities, tool access, and constraints
4. Test agent invocation in VS Code or Copilot CLI

### Adding a New Instruction File

1. Create `<topic>.instructions.md` in `.github/instructions/`
2. Follow `.github/instructions/instructions.instructions.md` structure
3. Define `applyTo` glob pattern for target files
4. Include concrete examples, patterns, and anti-patterns

### Adding a New Prompt

1. Create `<name>.prompt.md` in `.github/prompts/`
2. Follow `.github/instructions/prompt.instructions.md` structure
3. Define minimal required tools and clear input/output expectations
4. Test execution with `Chat: Run Prompt` in VS Code

### Discovering Existing Capabilities

**Skills:**
```bash
# Use find-skills skill in Copilot
@workspace Use find-skills to search for [capability]

# Or directly via CLI
npx skills find <query>
```

**MCP Servers:**
- Check `.github/prompts/references.md` for registries and marketplaces
- Search https://registry.modelcontextprotocol.io/
- Browse https://github.com/wong2/awesome-mcp-servers

**Build MCP Servers from OpenAPI:**
```
@workspace Use mcp-builder to generate an MCP server from [OpenAPI spec URL]
```

## Conventions and Best Practices

### File Naming
- Use `kebab-case` for all filenames (lowercase, hyphens for spaces)
- Extensions: `.agent.md`, `.instructions.md`, `.prompt.md`, `.json` (hooks)
- Skill folders: `kebab-case` directory containing `SKILL.md`

### Format Standards
- **Markdown** for all documentation and instruction files
- **YAML frontmatter** required for agents, skills, instructions, prompts
- **Single quotes** for YAML string values
- **Relative paths** for referencing bundled resources within skills

### Portability
- Artifacts MUST work across VS Code, Copilot CLI, and GitHub Copilot coding agent
- Test in multiple environments before publishing
- Use cross-platform scripts (Python, Node.js, PowerShell Core)

### Documentation First
- Documentation is a first-class output, not an afterthought
- Prefer linking to existing docs over duplicating content
- Keep instructions concise and scannable
- Update docs when dependencies, tools, or conventions change

### Quality Standards
- Follow the matching instruction guideline from `.github/instructions/` for your artifact type
- Respect squad decisions in `.squad/decisions.md`
- Use imperative mood in instructions ("Use", "Implement", "Avoid")
- Include concrete examples and code snippets
- Test artifacts in representative scenarios before publishing

## Additional Resources

### Official Documentation
- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [VS Code Copilot Customization](https://code.visualstudio.com/docs/copilot/customization)
- [Custom Agents Guide](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)
- [Prompt Files Documentation](https://code.visualstudio.com/docs/copilot/customization/prompt-files)

### Community Resources
- [Awesome Copilot Collection](https://github.com/github/awesome-copilot)
- [Skills Ecosystem](https://www.skills.sh/)
- [MCP Registry](https://registry.modelcontextprotocol.io/)
- [Awesome MCP Servers](https://github.com/wong2/awesome-mcp-servers)

### Repository Files
- [Meta-Agentic Method](/.github/prompts/shared/meta-agentic-method.md) — SDD phase model and confidence rubric
- [References](/.github/prompts/references.md) — Authoritative sources for capabilities
- [Template Documentation](/.github/prompts/templates/README.md) — Progress report template guide

### Squad Workflow
- [Squad Agent](/.github/agents/squad.agent.md) — Team coordinator agent
- [Squad Decisions](/.squad/decisions.md) — Architectural decisions log
- [Squad Routing](/.squad/routing.md) — Task routing for specialized agents

---

**License**: MIT  
**Author**: Pascal van der Heiden  
**Version**: 1.0.0

For questions, issues, or contributions, please open an issue or submit a pull request.
