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
└─→ [C] BUILD NEW ARTIFACT AT RUNTIME
    ├─ **General Principle**: When no reusable repo artifact (A) and no external MCP/skill (B) exists,
    │   BUILD the missing capability AT RUNTIME in the scenario's working repository/project — NOT in
    │   this meta-template. Bespoke artifacts are created once, then refined across the run as agents
    │   learn and capture improvements back into the artifact (compounding knowledge).
    │
    ├─ **LLM-Native Work**: Much transformation/translation work (e.g., framework migrations, data format
    │   conversions, pattern adaptations) is inherently LLM-native and requires NO tool/MCP. A bespoke
    │   skill capturing project-specific patterns, gotchas, and anti-patterns is often the right artifact,
    │   not an MCP server.
    │
    ├─ [C1] Generate MCP server from OpenAPI spec
    │   ├─ Condition: Capability maps to a REST API with OpenAPI/Swagger spec
    │   ├─ Tool: Use `mcp-builder` skill to generate server from spec URL
    │   ├─ Evidence: OpenAPI spec URL, generated server path
    │   ├─ Action: Create MCP server in scenario repo `mcp-servers/<name>/`, mark "Status: Built (MCP)"
    │   └─ Artifact Location: Scenario repository (not meta-template)
    │
    ├─ [C2] Author bespoke, scenario-specific skill
    │   ├─ Condition: Capability is a scenario-specific workflow, pattern library, or domain knowledge
    │   ├─ Tool: Use `skill-creator` skill for interactive creation and optimization
    │   ├─ Guidelines: Follow `.github/instructions/agent-skills.instructions.md` from meta-template
    │   ├─ Evidence: Skill file path, validation results, triggering accuracy
    │   ├─ Action: Create skill in scenario repo `.github/skills/<name>/SKILL.md`, mark "Status: Built (Skill)"
    │   ├─ Artifact Location: Scenario repository (not meta-template)
    │   └─ Refinement: Update skill with learnings throughout run (e.g., new gotchas, proven patterns)
    │
    ├─ [C3] Author new instruction
    │   ├─ Condition: Capability is a coding standard, pattern, or guideline for specific file types
    │   ├─ Guidelines: Follow `.github/instructions/instructions.instructions.md` from meta-template
    │   ├─ Evidence: Instruction file path, applyTo glob pattern
    │   ├─ Action: Create instruction in scenario repo `.github/instructions/<name>.instructions.md`, mark "Status: Built (Instruction)"
    │   └─ Artifact Location: Scenario repository (not meta-template)
    │
    ├─ [C4] Define custom agent role
    │   ├─ Condition: Capability requires autonomous decision-making or orchestration
    │   ├─ Guidelines: Follow `.github/instructions/agents.instructions.md` from meta-template
    │   ├─ Evidence: Agent charter file path, assigned capabilities
    │   ├─ Action: Defer to Team Formation phase, mark "Status: Pending (Agent Role)"
    │   └─ Artifact Location: Scenario repository (not meta-template)
    │
    └─ **GUARDRAIL — Bespoke vs. Generic Artifacts**:
        ├─ Bespoke, scenario-specific skills/MCPs/instructions/agents STAY in the scenario repository.
        │   They are NOT added to this meta-template — they solve ONE project's unique constraints.
        ├─ Generic, reusable improvements (e.g., broken reference fix, new MCP discovery source, prompt
        │   friction fix) MAY be proposed upstream to this meta-template via `github-issues` skill with
        │   label `template-feedback`. See SKILL.md § Upstream Template Feedback Loop for workflow.
        └─ If unsure: default to scenario-local. Only propose upstream if artifact applies to ALL scenarios.
```

**Recording Requirements:**
- Document decision path taken (A / B / C1 / C2 / C3 / C4) in Capability Map "Source" column
- Link to evidence (file path, URL, or generation log)
- If multiple paths viable, document rationale for chosen path in `adr/`

---
