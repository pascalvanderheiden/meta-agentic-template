<!--
SCENARIO APPLICABILITY: Brown-field, Modernization
OUTPUT FILENAME: docs/<scenario>-<slug>/02-discovery.md
DYNAMIC RULES:
  - Fixed: Heading skeleton
  - Generated: Component inventory (from codebase scan), data flows (from tracing), dependency graph (from analysis), tech stack (from detection)
  - Tokens: [SYSTEM_NAME]
  - Brown-field: Include safety-net plan section
  - Modernization: Include legacy-to-target mapping hooks
-->

# Discovery: [SYSTEM_NAME]

**Date**: [DATE]  
**Scenario**: [Brown-field | Modernization]

## Objective

Inventory the existing system's architecture, components, data flows, dependencies, and integration points to inform safe modifications.

## System Architecture

<!-- GENERATED: Architecture diagram (ASCII or Mermaid) -->

```
[ARCHITECTURE_DIAGRAM]
```

**Description**: [ARCHITECTURE_NARRATIVE]

## Component Inventory

<!-- GENERATED: Services, databases, APIs, queues, storage, UI components -->

| Component | Type | Purpose | Technology | Version | Status |
|-----------|------|---------|------------|---------|--------|
| [COMPONENT_NAME] | [Service/Database/API/Queue/Storage] | [PURPOSE] | [TECH_STACK] | [VERSION] | [Active/Deprecated] |

## Data Flows

<!-- GENERATED: Input → processing → output sequences -->

### Flow 1: [FLOW_NAME]

1. **Input**: [SOURCE] → [DATA_FORMAT]
2. **Processing**: [COMPONENT] performs [OPERATION]
3. **Output**: [DATA_FORMAT] → [DESTINATION]

### Flow 2: [FLOW_NAME]

1. **Input**: [SOURCE] → [DATA_FORMAT]
2. **Processing**: [COMPONENT] performs [OPERATION]
3. **Output**: [DATA_FORMAT] → [DESTINATION]

<!-- Add more flows as needed -->

## Dependencies

<!-- GENERATED: Internal and external dependencies -->

### Internal Dependencies

```
[DEPENDENCY_GRAPH]
```

| Dependent Component | Depends On | Type | Criticality |
|---------------------|------------|------|-------------|
| [COMPONENT_A] | [COMPONENT_B] | [Data/API/Event] | [High/Medium/Low] |

### External Dependencies

| Service/API | Purpose | Contract Location | Version | SLA/Availability |
|-------------|---------|-------------------|---------|------------------|
| [EXTERNAL_SERVICE] | [PURPOSE] | [CONTRACT_URL_OR_PATH] | [VERSION] | [SLA] |

## Technology Stack

<!-- GENERATED: Languages, frameworks, runtime versions -->

| Layer | Technology | Version | Notes |
|-------|------------|---------|-------|
| [Frontend/Backend/Database/Infrastructure] | [TECH_NAME] | [VERSION] | [EOL_STATUS_OR_NOTES] |

## Integration Points

<!-- GENERATED: APIs, webhooks, message queues, file exports -->

| Integration | Type | Protocol | Data Format | Owner |
|-------------|------|----------|-------------|-------|
| [INTEGRATION_NAME] | [API/Webhook/Queue/File] | [HTTP/AMQP/FTP] | [JSON/XML/CSV] | [TEAM_OR_SERVICE] |

## Known Issues & Technical Debt

<!-- GENERATED: Discovered during codebase scan -->

- **[ISSUE_CATEGORY]**: [DESCRIPTION] _(Impact: [IMPACT])_
- **[ISSUE_CATEGORY]**: [DESCRIPTION] _(Impact: [IMPACT])_

## Safety Net Plan (Brown-field only)

<!-- GENERATED: For brown-field scenarios; testing strategy to capture existing behavior -->

### Baseline Capture

- [ ] **Snapshot tests**: Capture current outputs for [COMPONENT_LIST]
- [ ] **Characterization tests**: Reverse-engineer unit tests for [MODULE_LIST]
- [ ] **Dependency map**: BMAD analysis on [CODEBASE_PATH]
- [ ] **UI baselines**: Playwright screenshots for [PAGE_LIST]

### Baseline Test Results

| Test Suite | Pass Rate | Coverage | Notes |
|------------|-----------|----------|-------|
| [EXISTING_SUITE_NAME] | [PASS_RATE]% | [COVERAGE]% | [NOTES] |

**Safety Net Status**: [GREEN (>90% pass) | AMBER (50-90% pass) | RED (<50% pass)]

## Exit Criteria

- [ ] Component inventory complete (no "unknown" placeholders)
- [ ] Data flows traced end-to-end for all critical paths
- [ ] All external dependencies identified with contract locations
- [ ] Safety net baseline captured (brown-field only)

---

**Cross-references**:  
- Previous: `00-intake.md`
- Next: `01-analysis.md` (brown-field) or `03-assessment.md` (modernization)
