<!--
SCENARIO APPLICABILITY: Brown-field, Modernization
OUTPUT FILENAME: docs/<scenario>-<slug>/wiki/README.md
USAGE: Token-mindful repo-wiki for an existing source codebase. Link to files instead of inlining code, chunk content by module, keep summaries concise, and place generated output under docs/<scenario>-<slug>/wiki/.
DYNAMIC RULES:
  - Fixed: Heading skeleton and table shapes
  - Generated: Overview, architecture, module index, flows, dependency graph, stack, contracts, glossary, risks, drift log
  - Tokens: [SYSTEM_NAME], [SCENARIO_TYPE], [SLUG], [SOURCE_REPO], [GENERATED_AT], [PACKER_USED]
  - Brown-field/Modernization: Represents existing codebase context for Discovery and Assessment without dumping raw source
-->

# Repo Wiki: [SYSTEM_NAME]

**Scenario**: [SCENARIO_TYPE]  
**Slug**: [SLUG]  
**Source repo**: [SOURCE_REPO]  
**Generated at**: [GENERATED_AT]  
**Packer used**: [PACKER_USED]

## Overview

<!-- GENERATED: Concise system summary from packed source -->

[SYSTEM_OVERVIEW]

## Architecture

<!-- GENERATED: Mermaid or ASCII architecture diagram plus narrative -->

```mermaid
[ARCHITECTURE_DIAGRAM]
```

**Narrative**: [ARCHITECTURE_NARRATIVE]

## Module / Component Index

<!-- GENERATED: Concise module inventory. Link to files; do not inline code. -->

| Module / Path | Responsibility | Key Files | Depends On |
|---------------|----------------|-----------|------------|
| `[MODULE_PATH]` | [RESPONSIBILITY] | [KEY_FILE_LINKS] | [DEPENDENCY_LIST] |

## Data Flows

<!-- GENERATED: Input → processing → output maps for critical paths -->

| Flow | Input | Processing | Output |
|------|-------|------------|--------|
| [FLOW_NAME] | [INPUT_SOURCE_AND_FORMAT] | [PROCESSING_MODULES_AND_STEPS] | [OUTPUT_DESTINATION_AND_FORMAT] |

## Dependency Graph

<!-- GENERATED: Internal and external dependency graph or table -->

```mermaid
[DEPENDENCY_GRAPH]
```

### Internal Dependencies

| Source | Target | Type | Notes |
|--------|--------|------|-------|
| [INTERNAL_SOURCE] | [INTERNAL_TARGET] | [Import/API/Event/Data] | [NOTES] |

### External Dependencies

| Dependency | Type | Used By | Version / Constraint | Purpose |
|------------|------|---------|----------------------|---------|
| [EXTERNAL_DEPENDENCY] | [Package/API/Service/Runtime] | [MODULE_PATH] | [VERSION_OR_CONSTRAINT] | [PURPOSE] |

## Tech Stack & Versions

<!-- GENERATED: Languages, frameworks, runtimes, databases, infrastructure -->

| Layer | Technology | Version | Evidence |
|-------|------------|---------|----------|
| [LAYER] | [TECHNOLOGY] | [VERSION] | [FILE_OR_MANIFEST_LINK] |

## Integration Points & Contracts

<!-- GENERATED: APIs, events, webhooks, queues, files, schemas, CLIs -->

| Integration | Direction | Protocol / Mechanism | Contract Location | Owner / Consumer |
|-------------|-----------|----------------------|-------------------|------------------|
| [INTEGRATION_NAME] | [Inbound/Outbound] | [PROTOCOL_OR_MECHANISM] | [CONTRACT_LINK] | [OWNER_OR_CONSUMER] |

## Glossary

<!-- GENERATED: Domain terms discovered in code, docs, and contracts -->

| Term | Meaning | Evidence |
|------|---------|----------|
| [TERM] | [MEANING] | [FILE_OR_DOC_LINK] |

## Risk Hotspots

<!-- GENERATED: Fragile, complex, legacy, security-sensitive, or high-change areas -->

| Area | Risk Level | Why It Matters | Evidence | Suggested Follow-up |
|------|------------|----------------|----------|---------------------|
| [AREA_OR_PATH] | [High/Medium/Low] | [RISK_REASON] | [FILE_OR_SIGNAL_LINK] | [FOLLOW_UP_ACTION] |

## Refresh / Drift Log

<!-- GENERATED: Update when source changes trigger wiki re-generation -->

| Date | Change Detected | Sections Updated |
|------|-----------------|------------------|
| [DATE] | [CHANGE_DETECTED] | [SECTION_LIST] |
