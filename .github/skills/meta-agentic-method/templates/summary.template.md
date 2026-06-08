<!--
SCENARIO APPLICABILITY: All scenarios
OUTPUT FILENAME: docs/<scenario>-<slug>/README.md
DYNAMIC RULES:
  - Fixed: Heading skeleton
  - Generated: Executive summary (from scenario), artifact inventory (from all phase artifacts), confidence breakdown (from verification.md), next steps (from handoff analysis)
  - Tokens: [SCENARIO_NAME], [SCENARIO_TYPE]
-->

# [SCENARIO_NAME]

**Scenario Type**: [SCENARIO_TYPE]  
**Date**: [DATE]  
**Status**: [Complete | In Progress | Blocked]  
**Confidence**: **[SCORE]/100** ([High | Medium | Low])

## Executive Summary

<!-- GENERATED: 2-3 paragraphs summarizing what was built -->

[PARAGRAPH_1: What the scenario aimed to achieve]

[PARAGRAPH_2: What was delivered, key decisions, approach taken]

[PARAGRAPH_3: Current status, confidence level, readiness for handoff]

## Scenario Context

**Type**: [Green-field | Brown-field | Modernization]

**Objective**: [ONE_SENTENCE_GOAL from 00-intake.md]

**Key Constraints**: [CONSTRAINT_LIST from 00-intake.md or constitution.md]

## Team

<!-- GENERATED: Agent roster summary from team.md -->

| Agent | Role | Key Capabilities |
|-------|------|------------------|
| [AGENT_NAME] | [ROLE] | [SKILL_1, SKILL_2, MCP_X] |

**Team Size**: [COUNT] agents

**Approach**: [Custom Agents | Squad Members]

See `04-team.md` (green/brown) or `06-team.md` (modernization) for full roster.

## Capabilities Acquired

<!-- GENERATED: Capability summary from capability-map.md -->

**Total Capabilities**: [COUNT]

- **Reused**: [COUNT] (existing skills/instructions/MCP servers)
- **External**: [COUNT] (found and installed)
- **Built**: [COUNT] (new skills/instructions/MCP servers/agents)

**Key Capabilities**:
- [CAPABILITY_NAME] ([TYPE]): [PURPOSE]
- [CAPABILITY_NAME] ([TYPE]): [PURPOSE]

See `03-capability-map.md` (green/brown) or `05-capability-map.md` (modernization) for full matrix.

## Artifacts

<!-- GENERATED: Links to all phase artifacts in this docs/<scenario>-<slug>/ folder -->

### Spec Documents

- [00-intake.md](./00-intake.md) — Scenario intake and clarifications
- [02-discovery.md](./02-discovery.md) — System discovery (brown-field/modernization only)
- [03-assessment.md](./03-assessment.md) — Legacy assessment (modernization only)
- [01-analysis.md](./01-analysis.md) or [04-analysis.md](./04-analysis.md) — Functional domain analysis
- [03-capability-map.md](./03-capability-map.md) or [05-capability-map.md](./05-capability-map.md) — Capability mapping
- [04-team.md](./04-team.md) or [06-team.md](./06-team.md) — Team roster
- [plan.md](./plan.md) — Implementation plan
- [tasks.md](./tasks.md) — Task list
- [verification.md](./verification.md) — Verification and confidence score
- [checklist.md](./checklist.md) — Quality gate checklist

### Code Artifacts

<!-- GENERATED: Links to code/config outputs -->

- [CODE_ARTIFACT_DESCRIPTION]: `[PATH]`
- [CONFIG_ARTIFACT_DESCRIPTION]: `[PATH]`

### Capabilities Created

<!-- GENERATED: New skills/instructions/MCP servers/agents -->

- **Skill**: [`.github/skills/[name]/SKILL.md`](./.github/skills/[name]/SKILL.md)
- **Instruction**: [`.github/instructions/[name].instructions.md`](./.github/instructions/[name].instructions.md)
- **MCP Server**: [`mcp-servers/[name]/`](./mcp-servers/[name]/)
- **Agent**: [`.github/agents/[name].agent.md`](./.github/agents/[name].agent.md)

## Confidence Score

**Overall Score**: **[SCORE] / 100** — **[High | Medium | Low]** Confidence ([Green | Amber | Red])

### Dimension Breakdown

<!-- GENERATED: Summary from verification.md -->

| Dimension | Score | Band |
|-----------|-------|------|
| Capability Coverage | [SCORE]/100 | [BAND] |
| MCP Availability | [SCORE]/100 | [BAND] |
| Skill/Instruction Coverage | [SCORE]/100 | [BAND] |
| Data/Domain Knowledge | [SCORE]/100 | [BAND] |
| Spec Completeness | [SCORE]/100 | [BAND] |
| Verification Status | [SCORE]/100 | [BAND] |

**Interpretation**: [WHAT_THIS_SCORE_MEANS]

See [verification.md](./verification.md) for detailed scoring rationale.

## HTML Progress Report

<!-- GENERATED: Link to HTML report from progress-report skill -->

**Interactive Report**: [View HTML Report](./progress-report.html)

The HTML report provides an interactive view of:
- Confidence score visualization
- Artifact completeness checklist
- Test results summary
- Team roster and handoffs

## Known Gaps

<!-- GENERATED: Limitations from verification.md -->

- **[CATEGORY]**: [DESCRIPTION] — [WORKAROUND or NONE]
- **[CATEGORY]**: [DESCRIPTION] — Impact: [SEVERITY]

## Next Steps

<!-- GENERATED: Recommended follow-up work -->

### Immediate Actions (for human team)

1. [ACTION_1: e.g., "Review confidence score and decide on production readiness"]
2. [ACTION_2: e.g., "Provision infrastructure per plan.md if confidence ≥80"]
3. [ACTION_3: e.g., "Address known gaps in [AREA] before deployment"]

### Follow-Up Work (Phase 2 / Future)

- [FOLLOW_UP_1: e.g., "Implement real-time sync capability (deferred from scope)"]
- [FOLLOW_UP_2: e.g., "Performance tuning for large datasets"]

### Handoff Contacts

<!-- GENERATED: Key contacts or teams for handoff -->

- **Project Owner**: [NAME or TEAM]
- **Technical Lead**: [NAME or TEAM]
- **Operations/SRE**: [NAME or TEAM] (for deployment)

## References

- **Methodology**: [`.github/skills/meta-agentic-method/SKILL.md`](../../.github/skills/meta-agentic-method/SKILL.md)
- **Capability Catalog**: [`.github/skills/meta-agentic-method/references.md`](../../.github/skills/meta-agentic-method/references.md)
- **Constitution**: [constitution.md](./constitution.md) (if applicable)

---

**Version**: [VERSION or DATE]  
**Last Updated**: [DATE]
