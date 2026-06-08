<!--
SCENARIO APPLICABILITY: All scenarios
OUTPUT FILENAME: docs/<scenario>-<slug>/00-intake.md
DYNAMIC RULES:
  - Fixed: Heading skeleton
  - Generated: Clarifying questions (from ambiguity analysis), assumptions (from defaults), success criteria (from user goals)
  - Tokens: [SCENARIO_TYPE], [USER_REQUEST], [SLUG]
-->

# Intake & Clarification

**Date**: [DATE]  
**Scenario Type**: [SCENARIO_TYPE]  
**Slug**: `[SLUG]`

## User Request

[USER_REQUEST]

_(User's verbatim scenario description)_

## Scenario Classification

**Selected Scenario**: [Green-field | Brown-field | Modernization]

**Rationale**: [WHY_THIS_SCENARIO]

## Clarifying Questions

<!-- GENERATED: Questions asked to resolve ambiguities, with answers -->

### Q1: [QUESTION_TEXT]

**Answer**: [ANSWER_TEXT]

### Q2: [QUESTION_TEXT]

**Answer**: [ANSWER_TEXT]

<!-- Add more questions as needed -->

## Documented Assumptions

<!-- GENERATED: Assumptions made when user did not specify details -->

- **[ASSUMPTION_CATEGORY]**: [ASSUMPTION_DESCRIPTION] _(Reason: [RATIONALE])_
- **[ASSUMPTION_CATEGORY]**: [ASSUMPTION_DESCRIPTION] _(Reason: [RATIONALE])_

## Scope Boundaries

### In Scope

<!-- GENERATED: What will be delivered -->

- [IN_SCOPE_ITEM]
- [IN_SCOPE_ITEM]

### Out of Scope

<!-- GENERATED: What will NOT be delivered (explicit exclusions) -->

- [OUT_OF_SCOPE_ITEM]
- [OUT_OF_SCOPE_ITEM]

## High-Level Success Criteria

<!-- GENERATED: User's measurable goals (refined in analysis phase) -->

1. [SUCCESS_CRITERION_1]
2. [SUCCESS_CRITERION_2]
3. [SUCCESS_CRITERION_3]

## Known Constraints

<!-- GENERATED: Technical, budget, timeline, or regulatory constraints -->

| Constraint Type | Description |
|-----------------|-------------|
| [TYPE] | [DESCRIPTION] |

## Next Steps

- Proceed to: **[NEXT_PHASE_NAME]** (see `[NEXT_ARTIFACT_FILENAME]`)
- Entry criteria met: [YES/NO + rationale]

---

**Cross-references**:  
- Next artifact: `[NEXT_ARTIFACT_FILENAME]` (based on scenario type)
- Optional: `constitution.md` (if project principles defined)
