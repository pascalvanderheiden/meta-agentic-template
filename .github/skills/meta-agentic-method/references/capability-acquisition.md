## Capability Acquisition Decision Tree

For each capability identified in the Capability Mapping phase, apply this decision tree **in order** until a match is found:

```
CAPABILITY NEEDED
│
├─→ [A] REUSE EXISTING REPO ARTIFACT
│   ├─ Search `.github/skills/`, `.github/instructions/`, `.github/agents/`
│   ├─ Evidence: File path, version/last-modified date
│   └─ Action: Add to Capability Map as "Status: Available (Reused)"
│
├─→ [B] FIND EXISTING MCP SERVER OR PUBLISHED SKILL
│   ├─ Search `references.md` (same folder) for MCP servers matching capability domain
│   ├─ Search published skill repositories (Anthropic skills, GitHub awesome-copilot)
│   ├─ Evidence: URL, installation command, compatibility notes
│   └─ Action: Add to Capability Map as "Status: Available (External)"
│
└─→ [C] BUILD NEW ARTIFACT
    ├─ [C1] Generate MCP server from OpenAPI spec
    │   ├─ Condition: Capability maps to a REST API with OpenAPI/Swagger spec
    │   ├─ Tool: Use repo `mcp-builder` skill to generate server from spec URL
    │   ├─ Evidence: OpenAPI spec URL, generated server path
    │   └─ Action: Create MCP server in `mcp-servers/<name>/`, mark "Status: Built (MCP)"
    │
    ├─ [C2] Author new skill
    │   ├─ Condition: Capability is a reusable workflow (multi-step procedure)
    │   ├─ Guidelines: Follow `.github/instructions/agent-skills.instructions.md`
    │   ├─ Evidence: Skill file path, validation results
    │   └─ Action: Create skill in `.github/skills/<name>/SKILL.md`, mark "Status: Built (Skill)"
    │
    ├─ [C3] Author new instruction
    │   ├─ Condition: Capability is a coding standard, pattern, or guideline
    │   ├─ Guidelines: Follow `.github/instructions/instructions.instructions.md`
    │   ├─ Evidence: Instruction file path, applyTo glob pattern
    │   └─ Action: Create instruction in `.github/instructions/<name>.instructions.md`, mark "Status: Built (Instruction)"
    │
    └─ [C4] Define custom agent role
        ├─ Condition: Capability requires autonomous decision-making or orchestration
        ├─ Guidelines: Follow `.github/instructions/agents.instructions.md`
        ├─ Evidence: Agent charter file path, assigned capabilities
        └─ Action: Defer to Team Formation phase, mark "Status: Pending (Agent Role)"
```

**Recording Requirements:**
- Document decision path taken (A / B / C1 / C2 / C3 / C4) in Capability Map "Source" column
- Link to evidence (file path, URL, or generation log)
- If multiple paths viable, document rationale for chosen path in `adr/`

---
