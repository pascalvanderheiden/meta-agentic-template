<!--
SCENARIO APPLICABILITY: All scenarios
OUTPUT FILENAME: 
  - Green-field/Brown-field: docs/<scenario>-<slug>/04-team.md
  - Modernization: docs/<scenario>-<slug>/06-team.md
DYNAMIC RULES:
  - Fixed: Heading skeleton, agent roster columns
  - Generated: Agent roster rows (from team formation algorithm, one per domain/role), handoff protocol (from dependency chain), dual-path note (custom agents vs. Squad)
  - Tokens: None (fully generated from analysis + capability-map)
  - NOTE: This roster is scenario-custom; each row is generated from functional domains in analysis.md
-->

# Team Roster

**Date**: [DATE]  
**Scenario**: [Green-field | Brown-field | Modernization]

## Objective

Define a custom agent team specialized for this scenario, assign capabilities to each agent, and establish handoff protocols.

## Team Formation Approach

<!-- GENERATED: Dual-path note -->

**Approach**: [Custom Agents | Squad Members]

- **Custom Agents**: Agents explicitly created for this scenario with `.agent.md` files in `.github/agents/` or `.squad/agents/`. Each agent has a specific charter and capability assignment.
- **Squad Members**: If using the Squad system, agents are spawned from Squad universes and managed via `.squad/agents/<agent-name>/` folders with `charter.md`, `history.md`, `context.md`.

**Selected Approach for This Scenario**: [CUSTOM_AGENTS | SQUAD]

**Rationale**: [WHY_THIS_APPROACH]

## Agent Roster

<!-- GENERATED: One row per agent; derived from functional domains in analysis.md -->

| Agent Name | Role | Assigned Skills | Assigned Instructions | MCP Servers | Handoff To |
|------------|------|-----------------|----------------------|-------------|------------|
| [AGENT_NAME] | [ROLE_DESCRIPTION] | [SKILL_1, SKILL_2] | [INSTRUCTION_1] | [MCP_SERVER_1] | [NEXT_AGENT] |
| [AGENT_NAME] | [ROLE_DESCRIPTION] | [SKILL_1] | [INSTRUCTION_1, INSTRUCTION_2] | - | [NEXT_AGENT] |
| [AGENT_NAME] | [ROLE_DESCRIPTION] | [SKILL_1, SKILL_2, SKILL_3] | - | [MCP_SERVER_1, MCP_SERVER_2] | - (Final) |

**Total Agents**: [COUNT]

### Agent Details

<!-- GENERATED: Detailed charter per agent -->

#### [AGENT_NAME] — [ROLE]

**Domain**: [DOMAIN_NAME from analysis.md]

**Responsibilities**:
- [RESPONSIBILITY_1]
- [RESPONSIBILITY_2]

**Capabilities**:
- **Skills**: [SKILL_LIST with paths]
- **Instructions**: [INSTRUCTION_LIST with paths]
- **MCP Servers**: [MCP_SERVER_LIST with connection details]

**Input**: [WHAT_THIS_AGENT_RECEIVES]

**Output**: [WHAT_THIS_AGENT_PRODUCES]

**Handoff Contract**: Produces `[OUTPUT_ARTIFACT]` → consumed by `[NEXT_AGENT]`

---

#### [AGENT_NAME] — [ROLE]

**Domain**: [DOMAIN_NAME from analysis.md]

**Responsibilities**:
- [RESPONSIBILITY_1]
- [RESPONSIBILITY_2]

**Capabilities**:
- **Skills**: [SKILL_LIST with paths]
- **Instructions**: [INSTRUCTION_LIST with paths]
- **MCP Servers**: [MCP_SERVER_LIST with connection details]

**Input**: [WHAT_THIS_AGENT_RECEIVES]

**Output**: [WHAT_THIS_AGENT_PRODUCES]

**Handoff Contract**: Produces `[OUTPUT_ARTIFACT]` → consumed by `[NEXT_AGENT]` OR final deliverable

---

<!-- GENERATED: Additional agent sections (minimum 2 agents) -->

## Handoff Protocol

<!-- GENERATED: Dependency chain derived from agent roster -->

```
[AGENT_1] → produces [ARTIFACT_1] →
[AGENT_2] → produces [ARTIFACT_2] →
[AGENT_3] → produces [FINAL_DELIVERABLE]
```

### Handoff Contracts

<!-- GENERATED: Explicit input/output per handoff -->

| From Agent | To Agent | Artifact | Format | Validation Criteria |
|------------|----------|----------|--------|---------------------|
| [AGENT_A] | [AGENT_B] | [ARTIFACT_NAME] | [FILE_FORMAT] | [HOW_TO_VERIFY_COMPLETE] |

## Reviewer Assignment

**Designated Reviewer**: [AGENT_NAME or "Validator" agent]

**Reviewer Responsibilities**:
- Verify completeness of all agent outputs
- Check consistency across artifacts
- Validate outputs against success criteria from `01-analysis.md` (or `04-analysis.md`)
- Sign off on deliverables before handoff

## Shared Utilities

<!-- GENERATED: Capabilities not assigned to a specific agent (available to all) -->

- **[CAPABILITY_NAME]** (`[TYPE]`): [PURPOSE] — Available to all agents

## Exit Criteria

- [ ] ≥2 agents defined (ensures actual team, not single-agent workflow)
- [ ] Each agent has ≥1 capability assigned
- [ ] Handoff chain is acyclic (no circular dependencies)
- [ ] Reviewer agent designated
- [ ] All capabilities from `capability-map.md` assigned to agents or marked "shared"

---

**Cross-references**:  
- Previous: `03-capability-map.md` (green/brown) or `05-capability-map.md` (modernization)
- Next: `plan.md`
- Related: `01-analysis.md` (or `04-analysis.md`) for functional domains that informed agent roles
