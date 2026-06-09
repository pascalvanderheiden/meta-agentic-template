<!--
USAGE: Token-mindful module/component wiki page. Link, do not paste code; keep concise; cite file:line for claims.
OUTPUT FILENAME: docs/<scenario>-<slug>/wiki/modules/<module-slug>.md
DYNAMIC RULES:
  - Fixed: Section skeleton and evidence-first style
  - Generated: Module facts, links, dependencies, flows, risks, cross-references, source list
  - Tokens: [MODULE_NAME], [MODULE_PATH], [MODULE_SLUG], [UPDATED_AT], [SOURCE_FILES]
-->

# [MODULE_NAME]

**Path / area**: `[MODULE_PATH]`  
**Wiki slug**: `[MODULE_SLUG]`  
**Last updated**: [UPDATED_AT]

## Responsibility

<!-- GENERATED: Why this module exists and what boundary it owns. -->

[RESPONSIBILITY_SUMMARY]

## Key Files

<!-- GENERATED: Link to source paths. Do not inline code. Cite file:line when useful. -->

- [`[FILE_PATH]`]([FILE_LINK]) — [WHY_IT_MATTERS] ([FILE_PATH:LINE])

## Public API / Entry Points

<!-- GENERATED: Exported functions, commands, routes, events, jobs, components, or user-facing entry points. For UI/client modules, include component selectors/identifiers, public inputs/outputs (props), injectable/shared services, and upstream APIs consumed. -->

| Entry Point | Type | Purpose | Evidence |
|-------------|------|---------|----------|
| `[ENTRY_POINT]` | [Function/Class/Route/Event/CLI/Component] | [PURPOSE] | [FILE_PATH:LINE] |

## Dependencies

<!-- GENERATED: Internal wiki links first, then external packages/services. -->

### Internal

- [Related Module](../modules/related-module.md) — [DEPENDENCY_REASON] ([FILE_PATH:LINE])

### External

- `[PACKAGE_OR_SERVICE]` — [PURPOSE] ([MANIFEST_OR_SOURCE_PATH:LINE])

## Data Flows

<!-- GENERATED: Input → process → output for key paths. -->

| Flow | In | Process | Out | Evidence |
|------|----|---------|-----|----------|
| [FLOW_NAME] | [INPUT] | [PROCESSING_STEPS] | [OUTPUT] | [FILE_PATH:LINE] |

## Risks / Gotchas

<!-- GENERATED: Fragility, hidden coupling, security, performance, migration, or maintenance concerns. -->

- **[RISK_LEVEL]**: [RISK_OR_GOTCHA] — [WHY_IT_MATTERS] ([FILE_PATH:LINE])

## Cross-References

<!-- GENERATED: Links to related wiki pages. -->

- [Related Page](../concepts/related-page.md) — [RELATIONSHIP]

## Last Updated / Sources

**Last updated**: [UPDATED_AT]

<!-- GENERATED: Source files used to produce this page. -->

- [`[SOURCE_FILE]`]([SOURCE_LINK]) — [SOURCE_NOTE]
