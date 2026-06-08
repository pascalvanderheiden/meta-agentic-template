# Progress Report Template

Self-contained HTML progress report for meta-agentic development workflows.

## Purpose

Provides real-time visibility into multi-phase, spec-driven development driven by green-field, brown-field, and modernization prompts. Each prompt generates and updates a report showing confidence scores, phase progress, team roster, capability gaps, and risks.

## Usage Protocol

### Initial Generation

1. Copy `progress-report.template.html` to `docs/<scenario>-<slug>/progress-report.html`
2. Replace JSON data island (`<script id="report-data">`) with actual project data
3. Update `generatedAt` timestamp
4. Open file in browser — renders immediately, no network required

### Phase Updates

After each SDD phase completion:

1. Locate `<script id="report-data" type="application/json">` block in the HTML
2. Replace entire JSON payload with updated data
3. Update `generatedAt` timestamp
4. Save file — page auto-refreshes on reload

**Key**: Only the JSON block changes. HTML/CSS/JS remain static.

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
- **confidenceDimensions**: Array of rubric dimensions from `../shared/meta-agentic-method.md`
  - **name**: Dimension name (e.g., "Capability Coverage", "MCP Availability")
  - **score**: 0–100 assessment for this dimension
  - **weight**: Fractional weight (0–1); all weights sum to 1.0

**Important**: Dimension names and weights are defined by Oracle's rubric. Prompts must read the rubric and emit matching JSON.

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

See embedded JSON in `progress-report.template.html` for a complete Oracle → Fabric ETL example.

## Confidence Rubric Sync

Confidence dimensions and weights are **not hardcoded** in the template. The report renders whatever the JSON provides.

**Source of truth**: `../shared/meta-agentic-method.md` — Oracle's confidence rubric.

**Prompt responsibility**: Read the rubric, calculate dimension scores, emit matching JSON. The template only visualizes.

**Maintaining sync**: If Oracle updates the rubric (adds/removes dimensions, changes weights), prompts auto-adapt. Template requires no changes.

## File Organization

```
.github/prompts/
├── templates/
│   ├── progress-report.template.html    # This template
│   └── README.md                        # This doc
├── shared/
│   └── meta-agentic-method.md          # Oracle's confidence rubric (source of truth)
└── <green-field|brown-field|modernization>.prompt.md

docs/
└── <scenario-slug>/
    ├── progress-report.html             # Generated report (copy of template)
    └── <other-spec-docs>.md
```

## Design Notes

- **Self-contained**: No external dependencies. Works offline.
- **Data island pattern**: JSON embedded in HTML as `<script type="application/json">`. JS reads on load.
- **Update efficiency**: Prompts rewrite only the JSON block + timestamp. No HTML/CSS/JS changes.
- **Accessible**: Semantic HTML, ARIA-friendly, responsive design.
- **Professional**: GitHub-inspired palette, clean layout, print-friendly.

## Rendering Logic

On page load:

1. Read `<script id="report-data">` JSON
2. Parse and validate
3. Render each section:
   - Confidence gauge with color thresholds (≥80 green, 50–79 amber, <50 red)
   - Dimension bars with weighted percentages
   - Phase timeline with status badges
   - Team cards with resources
   - Capability table with color-coded status
   - MCP server list with connection state
   - Risk list with severity colors

All styling inline. No runtime network requests.
