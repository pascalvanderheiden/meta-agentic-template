<!--
SCENARIO APPLICABILITY: All scenarios
OUTPUT FILENAME: 
  - Green-field/Brown-field: docs/<scenario>-<slug>/03-capability-map.md
  - Modernization: docs/<scenario>-<slug>/05-capability-map.md
DYNAMIC RULES:
  - Fixed: Heading skeleton, capability matrix columns
  - Generated: Capability matrix rows (from analysis), status updates (from acquisition decision tree)
  - Tokens: None (fully generated from analysis artifact)
-->

# Capability Map

**Date**: [DATE]  
**Scenario**: [Green-field | Brown-field | Modernization]

## Objective

Identify the exact agents, skills, instructions, and MCP servers required to execute the scenario. Map each capability to a concrete source (reuse existing, find external, or build new).

## Capability Matrix

<!-- GENERATED: Rows from analysis artifact; one row per required capability -->

| Capability Needed | Type | Source | Status | Evidence |
|-------------------|------|--------|--------|----------|
| [CAPABILITY_NAME] | [Agent/Skill/MCP/Instruction] | [REUSED: path/to/artifact] | Available | [FILE_PATH or URL] |
| [CAPABILITY_NAME] | [Agent/Skill/MCP/Instruction] | [EXTERNAL: package-name] | Available | [INSTALL_COMMAND or URL] |
| [CAPABILITY_NAME] | [Agent/Skill/MCP/Instruction] | [BUILD: OpenAPI → MCP] | Built | [SPEC_URL, generated at PATH] |
| [CAPABILITY_NAME] | [Agent/Skill/MCP/Instruction] | [BUILD: New skill] | Built | [SKILL_PATH] |
| [CAPABILITY_NAME] | [Agent/Skill/MCP/Instruction] | [BUILD: Custom agent] | Pending (Team Formation) | Role defined in `04-team.md` |

## Reused Capabilities

<!-- GENERATED: Existing artifacts from repository or personal skills -->

### From Repository

- **[CAPABILITY_NAME]** (`[TYPE]`): `[FILE_PATH]`
  - **Purpose**: [WHAT_IT_DOES]
  - **Assigned To**: [DOMAIN_OR_AGENT_NAME]

### From External Sources

- **[CAPABILITY_NAME]** (`[TYPE]`): `[PACKAGE_NAME or URL]`
  - **Installation**: `[INSTALL_COMMAND]`
  - **Documentation**: [URL]
  - **Assigned To**: [DOMAIN_OR_AGENT_NAME]

## Newly Built Capabilities

<!-- GENERATED: Artifacts created during Capability Acquisition phase -->

### MCP Servers

- **[MCP_SERVER_NAME]**: Generated from OpenAPI spec at `[SPEC_URL]`
  - **Location**: `mcp-servers/[NAME]/`
  - **Connection Config**: Added to `.copilot/mcp-config.json`
  - **Assigned To**: [DOMAIN_OR_AGENT_NAME]

### Skills

- **[SKILL_NAME]**: `[SKILL_PATH]`
  - **Purpose**: [WHAT_IT_DOES]
  - **Bundled Resources**: [SCRIPTS/REFERENCES/TEMPLATES if applicable]
  - **Assigned To**: [DOMAIN_OR_AGENT_NAME]

### Instructions

- **[INSTRUCTION_NAME]**: `[INSTRUCTION_PATH]`
  - **Applies To**: `[GLOB_PATTERN]`
  - **Purpose**: [WHAT_IT_ENFORCES]
  - **Assigned To**: [DOMAIN_OR_AGENT_NAME or "All agents"]

### Custom Agents

- **[AGENT_ROLE_NAME]**: Role defined, agent file created in Team Formation phase
  - **Charter**: See `04-team.md` (or `06-team.md` for modernization)
  - **Capabilities Assigned**: [CAPABILITY_LIST]

## Capability Acquisition Decision Log

<!-- GENERATED: Rationale for each "Build" decision (why not reuse or find?) -->

| Capability | Decision Path | Rationale |
|------------|---------------|-----------|
| [CAPABILITY_NAME] | [A: Reuse / B: Find / C1: MCP / C2: Skill / C3: Instruction / C4: Agent] | [WHY_THIS_PATH] |

## Status Summary

- **Total Capabilities Required**: [COUNT]
- **Available (Reused)**: [COUNT]
- **Available (External)**: [COUNT]
- **Built (MCP)**: [COUNT]
- **Built (Skill)**: [COUNT]
- **Built (Instruction)**: [COUNT]
- **Pending (Agent Role)**: [COUNT]

**Overall Status**: [ALL_AVAILABLE | SOME_PENDING | BLOCKERS_EXIST]

## Exit Criteria

- [ ] Every capability from Analysis mapped to a concrete artifact
- [ ] All "To Build" items have been built or deferred to Team Formation
- [ ] No "Unknown" or "TBD" rows without follow-up action
- [ ] All external dependencies tested for connectivity

---

**Cross-references**:  
- Previous: `01-analysis.md` (green/brown) or `04-analysis.md` (modernization)
- Next: `04-team.md` (green/brown) or `06-team.md` (modernization)
- Related: `../references.md` (MCP server catalog)
