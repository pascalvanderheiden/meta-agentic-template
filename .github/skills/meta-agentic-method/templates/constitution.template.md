<!--
SCENARIO APPLICABILITY: All scenarios (optional)
OUTPUT FILENAME: docs/<scenario>-<slug>/constitution.md
DYNAMIC RULES:
  - Fixed: Heading skeleton, principle placeholders
  - Generated: Principle descriptions (from user requirements/constraints)
  - Tokens: [PROJECT_NAME], [PRINCIPLE_*_NAME], [PRINCIPLE_*_DESCRIPTION]
-->

# [PROJECT_NAME] Constitution

**Created**: [DATE]  
**Status**: [Draft | Active | Archived]  
**Scope**: [PROJECT_NAME]

## Purpose

This constitution defines the non-negotiable principles, constraints, and quality standards for `[PROJECT_NAME]`. All phase artifacts, code, and decisions MUST comply with these rules.

## Core Principles

### [PRINCIPLE_1_NAME]

[PRINCIPLE_1_DESCRIPTION]

### [PRINCIPLE_2_NAME]

[PRINCIPLE_2_DESCRIPTION]

### [PRINCIPLE_3_NAME]

[PRINCIPLE_3_DESCRIPTION]

<!-- GENERATED: Additional principles from user-provided constraints -->

## Non-Negotiable Constraints

<!-- GENERATED: Hard constraints derived from intake artifact -->

- **[CONSTRAINT_TYPE]**: [CONSTRAINT_DESCRIPTION]
- **[CONSTRAINT_TYPE]**: [CONSTRAINT_DESCRIPTION]

## Quality Gates

<!-- GENERATED: Quality standards that block phase progression -->

| Gate | Criteria | Enforced At Phase |
|------|----------|-------------------|
| [GATE_NAME] | [MEASURABLE_CRITERIA] | [PHASE_NAME] |

## Governance

- This constitution supersedes all other project documentation
- Violations MUST be justified in an ADR and approved explicitly
- Amendments require documentation of rationale and migration plan

**Version**: [VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]

---

**Cross-references**: See `00-intake.md` for scenario constraints that informed this constitution.
