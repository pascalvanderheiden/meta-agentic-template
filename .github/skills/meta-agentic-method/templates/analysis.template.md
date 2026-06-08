<!--
SCENARIO APPLICABILITY: All scenarios
OUTPUT FILENAME: 
  - Green-field/Brown-field: docs/<scenario>-<slug>/01-analysis.md
  - Modernization: docs/<scenario>-<slug>/04-analysis.md
DYNAMIC RULES:
  - Fixed: Heading skeleton
  - Generated: Functional domain sections (from requirements decomposition), BDD scenarios (from success criteria), capability requirements (from domain analysis)
  - Tokens: [SCENARIO_NAME]
-->

# Analysis: [SCENARIO_NAME]

**Date**: [DATE]  
**Scenario**: [Green-field | Brown-field | Modernization]

## Objective

Decompose the scenario into functional domains, define success criteria, specify acceptance scenarios (BDD), and identify required capabilities.

## Functional Domain Breakdown

<!-- GENERATED: Domains extracted from requirements; each domain = a distinct area of responsibility -->

### Domain 1: [DOMAIN_NAME]

**Purpose**: [WHAT_THIS_DOMAIN_DOES]

**Responsibilities**:
- [RESPONSIBILITY_1]
- [RESPONSIBILITY_2]
- [RESPONSIBILITY_3]

**Key Entities**: [ENTITY_1, ENTITY_2, ...]

**Dependencies**: [DEPENDS_ON_DOMAIN_X] | None

---

### Domain 2: [DOMAIN_NAME]

**Purpose**: [WHAT_THIS_DOMAIN_DOES]

**Responsibilities**:
- [RESPONSIBILITY_1]
- [RESPONSIBILITY_2]

**Key Entities**: [ENTITY_1, ENTITY_2, ...]

**Dependencies**: [DEPENDS_ON_DOMAIN_X] | None

---

<!-- GENERATED: Additional domains as needed (minimum 2) -->

## Acceptance Scenarios (BDD)

<!-- GENERATED: Executable Gherkin scenarios derived from success criteria -->

### Scenario 1: [SCENARIO_TITLE]

**Domain**: [DOMAIN_NAME]

```gherkin
Feature: [FEATURE_NAME]

  Scenario: [SCENARIO_NAME]
    Given [PRECONDITION]
    When [ACTION]
    Then [EXPECTED_OUTCOME]
    And [ADDITIONAL_OUTCOME]
```

---

### Scenario 2: [SCENARIO_TITLE]

**Domain**: [DOMAIN_NAME]

```gherkin
Feature: [FEATURE_NAME]

  Scenario: [SCENARIO_NAME]
    Given [PRECONDITION]
    When [ACTION]
    Then [EXPECTED_OUTCOME]
```

---

<!-- GENERATED: Additional scenarios (minimum 1 per domain) -->

## Success Criteria (Per Domain)

<!-- GENERATED: Measurable goals per domain -->

| Domain | Success Criterion | Measurable Metric | Target Value |
|--------|-------------------|-------------------|--------------|
| [DOMAIN_NAME] | [CRITERION_DESCRIPTION] | [METRIC_NAME] | [TARGET] |

## Non-Functional Requirements

<!-- GENERATED: Cross-cutting requirements (performance, security, scalability) -->

| Requirement Type | Description | Constraint | Verification Method |
|------------------|-------------|------------|---------------------|
| [Performance/Security/Scalability/Usability] | [REQUIREMENT_DESCRIPTION] | [SPECIFIC_CONSTRAINT] | [HOW_TO_VERIFY] |

## Capability Requirements

<!-- GENERATED: High-level capabilities needed (refined in Capability Mapping phase) -->

| Capability Needed | Domain | Type Hint | Rationale |
|-------------------|--------|-----------|-----------|
| [CAPABILITY_NAME] | [DOMAIN_NAME] | [Agent/Skill/MCP/Instruction] | [WHY_NEEDED] |

## Exit Criteria

- [ ] Scenario decomposed into ≥2 distinct functional domains
- [ ] Each domain has measurable success criteria
- [ ] ≥1 BDD scenario per domain defined
- [ ] Capability requirements enumerated

---

**Cross-references**:  
- Previous: `00-intake.md` (green-field), `02-discovery.md` (brown-field), `03-assessment.md` (modernization)
- Next: `03-capability-map.md` (green/brown) or `05-capability-map.md` (modernization)
