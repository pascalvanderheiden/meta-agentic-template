<!--
SCENARIO APPLICABILITY: Modernization only
OUTPUT FILENAME: docs/<scenario>-<slug>/03-assessment.md
DYNAMIC RULES:
  - Fixed: Heading skeleton
  - Generated: Legacy capability matrix (from discovery), target-state requirements (from user goals), gap analysis (from comparison), migration risks (from complexity analysis)
  - Tokens: [LEGACY_SYSTEM_NAME], [TARGET_PLATFORM]
-->

# Assessment: [LEGACY_SYSTEM_NAME] → [TARGET_PLATFORM]

**Date**: [DATE]  
**Scenario**: Modernization

## Objective

Evaluate legacy system capabilities, identify technical debt, map target-state requirements, and calculate the migration gap.

## Legacy System Capabilities

<!-- GENERATED: Current-state inventory of what the legacy system does -->

| Capability | Description | Components Involved | Business Criticality |
|------------|-------------|---------------------|----------------------|
| [CAPABILITY_NAME] | [WHAT_IT_DOES] | [COMPONENT_LIST] | [High/Medium/Low] |

## Technical Debt Inventory

<!-- GENERATED: EOL versions, security gaps, performance issues -->

| Debt Item | Type | Severity | Impact | Mitigation Required? |
|-----------|------|----------|--------|----------------------|
| [ITEM_DESCRIPTION] | [Version_EOL/Security/Performance/Architectural] | [Critical/High/Medium/Low] | [IMPACT_DESCRIPTION] | [YES/NO] |

## Target-State Requirements

<!-- GENERATED: What the modernized system must do -->

| Requirement | Description | Rationale | Must-Have / Nice-to-Have |
|-------------|-------------|-----------|--------------------------|
| [REQUIREMENT_ID] | [DESCRIPTION] | [WHY_NEEDED] | [MUST_HAVE/NICE_TO_HAVE] |

## Gap Analysis

<!-- GENERATED: Legacy vs. target for each capability -->

| Capability | Legacy Implementation | Target Implementation | Gap Size | Migration Complexity |
|------------|----------------------|----------------------|----------|----------------------|
| [CAPABILITY_NAME] | [HOW_LEGACY_DOES_IT] | [HOW_TARGET_WILL_DO_IT] | [None/Small/Medium/Large] | [Low/Medium/High] |

### Gap Summary

- **Total Capabilities**: [COUNT]
- **No Gap (direct port)**: [COUNT] ([PERCENTAGE]%)
- **Small Gap (config change)**: [COUNT] ([PERCENTAGE]%)
- **Medium Gap (refactor)**: [COUNT] ([PERCENTAGE]%)
- **Large Gap (redesign)**: [COUNT] ([PERCENTAGE]%)

## Migration Risks

<!-- GENERATED: Data loss, downtime, compatibility, performance -->

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|------------|--------|---------------------|
| [RISK_DESCRIPTION] | [High/Medium/Low] | [High/Medium/Low] | [MITIGATION_PLAN] |

## Backward Compatibility Requirements

<!-- GENERATED: Parity constraints (what must stay identical) -->

| Interface/Contract | Backward Compatibility Required? | Parity Test Strategy |
|--------------------|----------------------------------|----------------------|
| [API_ENDPOINT_OR_DATA_FORMAT] | [YES/NO] | [HOW_TO_VERIFY_PARITY] |

## Target Platform Decisions

<!-- GENERATED: Technology choices for target state -->

| Decision Point | Options Considered | Selected Option | Rationale |
|----------------|-------------------|-----------------|-----------|
| [DECISION_AREA] | [OPTION_1, OPTION_2] | [SELECTED_OPTION] | [WHY_CHOSEN] |

## Exit Criteria

- [ ] Every legacy capability mapped to target-state equivalent or marked "deprecated"
- [ ] Migration risks quantified with mitigation strategies
- [ ] Target platform/technology decisions documented
- [ ] Backward compatibility requirements identified

---

**Cross-references**:  
- Previous: `02-discovery.md`
- Next: `04-analysis.md` (modernization)
