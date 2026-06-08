# SDD Spec Templates

Bundled templates for the **Spec-Driven Development (SDD)** methodology. Each template produces a structured artifact in `docs/<scenario>-<slug>/` following the 10-phase meta-agentic pipeline.

## Template Inventory

| Template File | Output Filename | Scenario Applicability | Phase |
|---------------|-----------------|------------------------|-------|
| `constitution.template.md` | `constitution.md` | All (optional) | Pre-Phase (project-level) |
| `00-intake.template.md` | `00-intake.md` | All | 1. Intake & Clarification |
| `discovery.template.md` | `02-discovery.md` | Brown-field, Modernization | 2. Discovery |
| `assessment.template.md` | `03-assessment.md` | Modernization only | 3. Assessment |
| `analysis.template.md` | `01-analysis.md` (base)<br>`04-analysis.md` (modernization) | All | 4. Analysis |
| `capability-map.template.md` | `03-capability-map.md` (base)<br>`05-capability-map.md` (modernization) | All | 5. Capability Mapping |
| `team.template.md` | `04-team.md` (base)<br>`06-team.md` (modernization) | All | 6. Team Formation |
| `plan.template.md` | `plan.md` | All | 7. Execution (planning) |
| `tasks.template.md` | `tasks.md` | All | 7. Execution (task list) |
| `verification.template.md` | `verification.md` | All | 9. Verification |
| `summary.template.md` | `README.md` | All | 10. Handoff (summary) |
| `checklist.template.md` | `checklist.md` | All | 9. Verification (quality gate) |

## Scenario Ordered Sets

Each scenario follows a specific sequence of templates:

### Green-Field

1. `constitution.md` (optional)
2. `00-intake.md`
3. `01-analysis.md`
4. `03-capability-map.md`
5. `04-team.md`
6. `plan.md`
7. `tasks.md`
8. `verification.md`
9. `README.md` (summary)
10. `checklist.md`

### Brown-Field

1. `constitution.md` (optional)
2. `00-intake.md`
3. `02-discovery.md`
4. `01-analysis.md`
5. `03-capability-map.md`
6. `04-team.md`
7. `plan.md`
8. `tasks.md`
9. `verification.md`
10. `README.md` (summary)
11. `checklist.md`

### Modernization

1. `constitution.md` (optional)
2. `00-intake.md`
3. `02-discovery.md`
4. `03-assessment.md`
5. `04-analysis.md`
6. `05-capability-map.md`
7. `06-team.md`
8. `plan.md`
9. `tasks.md`
10. `verification.md`
11. `README.md` (summary)
12. `checklist.md`

## Artifact Numbering Convention

**Base scenarios (green-field, brown-field):**
- `00-intake`, `01-analysis`, `02-discovery` (brown-field only), `03-capability-map`, `04-team`

**Modernization:**
- `00-intake`, `02-discovery`, `03-assessment`, `04-analysis`, `05-capability-map`, `06-team`
- Note: `01` is the semantic slot for analysis and is intentionally left unused in the modernization path so that `02-discovery` stays aligned across brown-field and modernization scenarios.

**No collision:** `03-assessment` only exists in modernization (where capability-map is `05`); in base scenarios capability-map is `03` and assessment does not exist.

## Dynamic Content Markers

Templates use two marker conventions:

1. **`[PLACEHOLDER]`** — Fill-in tokens for fixed values (e.g., `[PROJECT_NAME]`, `[SCENARIO_TYPE]`)
2. **`<!-- GENERATED: <description> -->`** — Dynamic sections where content is generated from scenario inputs (e.g., team roster rows, capability table rows, functional domain sections)

Each template includes a **Dynamic Rules** section in its header comment specifying which parts are fixed vs. generated.

## Usage

1. Select the scenario-appropriate template set
2. Instantiate each template in sequence
3. Fill `[PLACEHOLDER]` tokens with scenario-specific values
4. Generate dynamic sections based on analysis/discovery inputs
5. Cross-reference sibling artifacts by their output filename

See `../SKILL.md` for the full SDD phase model and methodology.
