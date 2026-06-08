---
name: progress-report
description: 'Generate and update real-time HTML progress reports for meta-agentic workflows. Use when generating progress dashboards, tracking multi-phase SDD execution, visualizing confidence scores, reporting team composition, displaying capability gaps, or updating status for green-field, brown-field, and modernization scenarios. Self-contained HTML with embedded JSON data island.'
---

# Progress Report Generator

Generate self-contained HTML progress reports for meta-agentic development workflows. Provides real-time visibility into multi-phase, spec-driven development driven by green-field, brown-field, and modernization prompts.

## When to Use This Skill

- User asks to generate a progress report for a meta-agentic workflow
- User requests a status dashboard for SDD (Spec-Driven Development) execution
- User needs to visualize confidence scores and team composition
- User wants to track phase completion and capability gaps
- User asks to update an existing progress report after phase completion
- User needs to display MCP server status and risk assessment

## How the Report Works

The progress report uses a **data island pattern** — a self-contained HTML file with embedded JSON that renders without external dependencies:

1. **Initial Generation**: Copy the bundled `progress-report.template.html` to `docs/<scenario>-<slug>/progress-report.html`
2. **Data Embedding**: Replace the JSON block inside `<script id="report-data" type="application/json">` with actual project data
3. **Rendering**: Open the HTML file in any browser — JavaScript reads the JSON and renders all sections
4. **Updates**: After each SDD phase completion, rewrite only the JSON block + `generatedAt` timestamp; HTML/CSS/JS remain static

**Key advantage**: No network required, works offline, single file contains everything.

## Update Protocol

After each phase completion:

1. Locate `<script id="report-data" type="application/json">` block in the HTML file
2. Replace entire JSON payload with updated data
3. Update `generatedAt` timestamp to current ISO 8601 time
4. Save file — page auto-refreshes on reload

**Only the JSON changes.** Never modify HTML/CSS/JS structure.

## JSON Data Contract

### Full Schema

```json
{
  "scenario": "string",                      // Project name/description
  "promptType": "string",                    // "green-field" | "brown-field" | "modernization"
  "generatedAt": "ISO8601 timestamp",        // Last update time
  "currentPhase": "string",                  // Active SDD phase name
  
  "overallConfidence": {
    "score": "number (0-100)",               // Weighted composite confidence
    "interpretation": "string"               // Human explanation of score
  },
  
  "confidenceDimensions": [
    {
      "name": "string",                      // Dimension name from Oracle's rubric
      "score": "number (0-100)",             // Dimension score
      "weight": "number (0-1)"               // Dimension weight (sum to 1.0)
    }
  ],
  
  "phases": [
    {
      "name": "string",                      // SDD phase name
      "status": "string",                    // "pending" | "in-progress" | "done" | "blocked"
      "artifact": "string | null"            // Relative path to spec/doc or null
    }
  ],
  
  "team": [
    {
      "name": "string",                      // Agent name
      "role": "string",                      // Agent responsibility
      "skills": ["string"],                  // Assigned skills
      "instructions": ["string"],            // Assigned instruction files
      "mcpServers": ["string"]               // Assigned MCP servers
    }
  ],
  
  "capabilities": [
    {
      "capability": "string",                // Required capability description
      "status": "string",                    // "found" | "built" | "reused" | "missing"
      "evidence": "string"                   // Source/explanation
    }
  ],
  
  "mcpServers": [
    {
      "name": "string",                      // Server name
      "source": "string",                    // "registry" | "found" | "built from <source>"
      "connectionStatus": "string"           // "connected" | "disconnected"
    }
  ],
  
  "risks": [
    {
      "severity": "string",                  // "critical" | "high" | "medium" | "low"
      "description": "string"                // Risk description
    }
  ]
}
```

### Field Descriptions

#### Top Level

- **scenario**: Human-readable project name (e.g., "Oracle → Fabric ETL Migration")
- **promptType**: Which prompt variant drives this workflow
- **generatedAt**: ISO 8601 timestamp of last report update
- **currentPhase**: Name of active SDD phase (e.g., "Domain Discovery", "Implementation")

#### Confidence

- **overallConfidence.score**: Composite 0–100 score calculated from weighted dimensions
- **overallConfidence.interpretation**: One-sentence human summary (e.g., "High confidence — all capabilities available")
- **confidenceDimensions**: Array of rubric dimensions from the meta-agentic-method skill
  - **name**: Dimension name (e.g., "Capability Coverage", "MCP Availability")
  - **score**: 0–100 assessment for this dimension
  - **weight**: Fractional weight (0–1); all weights sum to 1.0

**Important**: Dimension names and weights are defined by Oracle's confidence rubric in `../meta-agentic-method/SKILL.md`. Read the rubric and emit matching JSON.

#### Phases

Ordered array of SDD phases:

- **name**: Phase name from SDD process
- **status**: Current state (`pending`, `in-progress`, `done`, `blocked`)
- **artifact**: Relative path to generated spec/doc (e.g., `docs/my-project/domain-map.md`) or `null`

#### Team

Generated custom agents:

- **name**: Agent identifier
- **role**: Agent's responsibility (one-line description)
- **skills**: Array of skill names assigned to this agent
- **instructions**: Array of instruction file names
- **mcpServers**: Array of MCP server names this agent uses

#### Capabilities

Each required capability and its acquisition status:

- **capability**: What's needed (e.g., "Oracle schema introspection")
- **status**: How acquired (`found` = discovered existing, `built` = created new, `reused` = existing generic, `missing` = gap)
- **evidence**: Explanation (e.g., "Built MCP from Fabric OpenAPI", "No CDC connector — gap")

Color coding:
- `found` / `built` → green
- `reused` → blue
- `missing` → red

#### MCP Servers

Discovered or created MCP servers:

- **name**: Server name
- **source**: Origin (`registry`, `found in <location>`, `built from <source>`)
- **connectionStatus**: `connected` or `disconnected`

#### Risks

Identified gaps and blockers:

- **severity**: `critical` | `high` | `medium` | `low`
- **description**: Plain-text explanation

## Examples

### Minimal Payload

```json
{
  "scenario": "Simple API Migration",
  "promptType": "modernization",
  "generatedAt": "2024-01-15T10:00:00Z",
  "currentPhase": "Domain Discovery",
  "overallConfidence": {
    "score": 85,
    "interpretation": "High confidence — reusing existing skills."
  },
  "confidenceDimensions": [
    { "name": "Capability Coverage", "score": 90, "weight": 0.5 },
    { "name": "MCP Availability", "score": 80, "weight": 0.5 }
  ],
  "phases": [
    { "name": "Domain Discovery", "status": "in-progress", "artifact": null }
  ],
  "team": [],
  "capabilities": [],
  "mcpServers": [],
  "risks": []
}
```

### Full Payload

See the embedded JSON in `progress-report.template.html` for a complete Oracle → Fabric ETL example with all sections populated.

## Rendering Logic

On page load, the template:

1. Reads `<script id="report-data">` JSON
2. Parses and validates structure
3. Renders each section:
   - **Confidence gauge** with color thresholds (≥80 green, 50–79 amber, <50 red)
   - **Dimension bars** with weighted percentages
   - **Phase timeline** with status badges
   - **Team cards** with resources
   - **Capability table** with color-coded status
   - **MCP server list** with connection state
   - **Risk list** with severity colors

All styling is inline. No runtime network requests.

## Gotchas

- **Never edit HTML/CSS/JS** — only update the JSON data island and timestamp
- **Confidence dimensions must match Oracle's rubric** — if Oracle updates dimension names or weights, update your JSON accordingly
- **ISO 8601 timestamps required** — use format `2024-01-15T10:00:00Z` for `generatedAt`
- **Weights must sum to 1.0** — validate `confidenceDimensions` weights before writing
- **Phase status values are strict** — only use `pending`, `in-progress`, `done`, `blocked`
- **Capability status values are strict** — only use `found`, `built`, `reused`, `missing`

## References

- Template file: [progress-report.template.html](./progress-report.template.html)
- Confidence rubric source: [../meta-agentic-method/SKILL.md](../meta-agentic-method/SKILL.md)
