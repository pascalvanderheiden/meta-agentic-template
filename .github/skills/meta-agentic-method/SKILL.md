---
name: meta-agentic-method
description: 'Spec-Driven Development methodology for meta-agentic workflows. Use when planning or executing green-field, brown-field, or modernization scenarios that require team formation, capability mapping, confidence scoring, and iterative spec-first development. Covers 10-phase SDD pipeline, artifact conventions, team-formation algorithm, capability-acquisition decision tree, and 6-dimension confidence rubric.'
---

# Meta-Agentic Methodology

This skill defines the shared Spec-Driven Development (SDD) methodology for meta-agentic workflows. It provides a phase-driven pipeline, artifact schemas, team-formation logic, capability-acquisition decisions, and confidence-scoring criteria.

## When to Use This Skill

- Planning a green-field system from requirements
- Extending or modifying an existing codebase (brown-field)
- Migrating or modernizing legacy platforms
- Forming AI agent teams for complex multi-domain scenarios
- Mapping required capabilities (skills, MCP servers, instructions, agents)
- Scoring confidence for deliverable readiness

## Spec-Driven Development (SDD) Phase Model

Meta-agentic workflows execute an iterative, spec-first pipeline where each phase produces documentation artifacts that inform subsequent phases. Scenarios differ in their entry phase, then converge on shared capability, team, execution, verification, and handoff phases.

### Scenario Entry-Phase Mapping

| Scenario | Entry Phase | Rationale |
|----------|-------------|-----------|
| **Green-field** | Analysis | No existing system; gather requirements from scratch |
| **Brown-field** | Discovery | Existing system must be inventoried before analysis |
| **Modernization** | Assessment | Legacy system + target state both require assessment before migration design |

### Phase Pipeline

All scenarios flow through these phases, starting at their scenario-specific entry point:

1. **Intake & Clarification:** Capture scenario, clarify unknowns, and create `00-intake.md`.
2. **Discovery:** Inventory existing source and generate repo-wiki for brown-field/modernization.
3. **Assessment:** Map legacy capabilities, target state, gaps, and migration risk for modernization.
4. **Analysis:** Decompose domains, success criteria, and capability requirements.
5. **Capability Mapping:** Map required capabilities to agents, skills, instructions, and MCP servers.
6. **Capability Acquisition:** Reuse, find, or build missing capabilities.
7. **Team Formation:** Instantiate agents, assignments, handoffs, and reviewer roles.
8. **Execution:** Run the team iteratively, producing logs, ADRs, code, and configs.
9. **Verification:** Validate requirements, tests, limitations, and confidence score.
10. **Handoff:** Package artifacts, report, confidence breakdown, and next steps.

**Full detail:** see [`references/phase-pipeline.md`](references/phase-pipeline.md).

## Source Context Ingestion (Repo-Wiki)

Existing-codebase scenarios use a repo-wiki so agents reason over token-bounded, indexed source context instead of raw code dumps. The wiki compiles source understanding into maintained markdown with `index.md`, `log.md`, module pages, concept pages, and a machine index; raw files are pulled only for precise implementation, verification, or ambiguity resolution.

**Authoritative workflow:** use the [`repo-wiki` skill](../repo-wiki/SKILL.md) for ingest, query, lint, index/log conventions, token-mindfulness, and drift handling. See [`references/source-context-and-topology.md`](references/source-context-and-topology.md) for scenario topology only.

## Repository Topology by Scenario

Choose topology during Intake because it controls where meta artifacts, docs, wiki, source changes, and feedback files live.

| Scenario | Topology | Where Work Happens | Source Context Rule |
|----------|----------|--------------------|---------------------|
| **Green-field** | Template fork | New project from this template; repo is scaffold and implementation workspace. | No repo-wiki initially; source emerges from specs and implementation. |
| **Brown-field** | In-repo | APM installs artifacts into the existing source repo; docs/specs/wiki live beside source. | Generate repo-wiki from installed repo; wiki is default context, raw files on demand. |
| **Modernization** | Side-car control repo | Template-derived control repo with read-only legacy source submodule at `legacy/`. | Generate legacy repo-wiki as primary context; raw submodule files only on demand. |

**Full detail:** see [`references/source-context-and-topology.md`](references/source-context-and-topology.md).

## SDD Framework Selection (Optional)

Scenario prompts MUST ask for an optional **SDD Framework** during Intake. Default to **None** unless the user explicitly chooses a framework. This choice is orthogonal to Execution Approach: framework controls the spec workflow; Execution Approach controls who runs it.

| Framework | Core philosophy | Prescriptive artifacts / commands | Best-fit scenarios | Install / entry point |
|-----------|-----------------|-----------------------------------|--------------------|-----------------------|
| **None** (default) | Native 10-phase SDD flow without external ceremony. | Native `docs/<scenario>-<slug>/` artifacts, templates, confidence rubric. | **Recommended default for brown-field**; valid for any scenario when users want no framework lock-in. | No install; run native prompt unchanged. |
| **GitHub Spec-Kit** | Intent → executable spec → plan → tasks → implementation. | `specify init`, `/speckit.constitution`, `/speckit.specify`, `/speckit.clarify`, `/speckit.checklist`, `/speckit.plan`, `/speckit.tasks`, `/speckit.analyze`, `/speckit.implement`. | **Recommended default for modernization** because governed gates fit legacy→target migration with parity checks. | `uvx --from git+https://github.com/github/spec-kit.git specify init . --integration copilot`. |
| **OpenSpec** | Lightweight, iterative, align-before-code proposals. | `openspec init`; `/opsx:propose`, `/opsx:explore`, `/opsx:apply`, `/opsx:sync`, `/opsx:archive`, `/opsx:verify`. | **Recommended default for green-field** because proposal discipline keeps fresh builds spec-locked. | `npm install -g @fission-ai/openspec@latest && openspec init`. |
| **Superpowers** | Composable process skills for brainstorming, planning, TDD, reviews, and branch finishing. | `brainstorming`, `writing-plans`, `test-driven-development`, `subagent-driven-development`/`executing-plans`, `requesting-code-review`, `finishing-a-development-branch`. | Optional execution-discipline overlay for any scenario. | `copilot plugin marketplace add obra/superpowers-marketplace` then install `superpowers`. |

**Recommended defaults:** green-field → OpenSpec; brown-field → None; modernization → Spec-Kit. Users may choose any framework, including None.

**Full detail:** see [`references/sdd-frameworks.md`](references/sdd-frameworks.md).

## Spec/Document Artifacts

All artifacts are written to `docs/<scenario>-<slug>/` with consistent naming and structure. Scaffold phase artifacts from `templates/`, fill placeholders, and keep numbering scenario-aware.

### Spec Templates

Each phase's **Output Artifact** is produced by copying the matching template from `templates/` into `docs/<scenario>-<slug>/` and filling it in.

| Scenario | Template Files Used (→ output artifact) |
|----------|----------------------------------------|
| **Green-field** | `constitution.template.md`(opt), `00-intake.template.md`→00-intake.md, `analysis.template.md`→01-analysis.md, `capability-map.template.md`→03-capability-map.md, `team.template.md`→04-team.md, `plan.template.md`, `tasks.template.md`, `verification.template.md`, `summary.template.md`, `checklist.template.md` |
| **Brown-field** | Green-field set plus `discovery.template.md`→02-discovery.md, `discovery-wiki.template.md`→wiki/, `wiki-index.template.json`→wiki/wiki-index.json; skips `assessment.template.md` |
| **Modernization** | Brown-field set plus `assessment.template.md`→03-assessment.md; outputs analysis→04, capability-map→05, team→06 |

**Key Rules:** Green-field skips discovery/wiki/assessment; brown-field adds discovery/wiki only; modernization adds discovery/wiki/assessment. Dynamic team, capability, and phase rows come from scenario outputs. See `templates/README.md`.

### Artifact Numbering Convention

Base scenarios use `00-intake`, `01-analysis`, `02-discovery` (brown-field only), `03-capability-map`, `04-team`. Modernization uses `00-intake`, `02-discovery`, `03-assessment`, `04-analysis`, `05-capability-map`, `06-team`; `01` is intentionally unused so `02-discovery` stays aligned.

### Artifact Table

| Artifact File | Phase | Purpose | Minimal Heading Skeleton |
|---------------|-------|---------|--------------------------|
| `00-intake.md` | Intake & Clarification | Captures user scenario and clarifications | `# Scenario`, `## User Request`, `## Clarifications`, `## Assumptions` |
| `01-analysis.md` / `04-analysis.md` | Analysis | Decomposes scenario into domains and capabilities | `# Functional Domains`, `## Success Criteria`, `## Capability Requirements` |
| `02-discovery.md` | Discovery | Inventories existing system and links to repo-wiki | `# System Architecture`, `## Components`, `## Data Flows`, `## Dependencies`, `## Repo-Wiki` |
| `docs/<scenario>-<slug>/wiki/` | Discovery / Assessment | Indexed source representation | Overview, architecture, module index, data flows, dependency graph, glossary, risk hotspots, drift log |
| `03-assessment.md` | Assessment | Legacy-to-target gap analysis | `# Legacy Capabilities`, `## Technical Debt`, `## Target State`, `## Gap Analysis`, `## Migration Risks` |
| `03-capability-map.md` / `05-capability-map.md` | Capability Mapping | Maps capabilities to artifacts | `# Capability Matrix`, `## Reused Capabilities`, `## New Capabilities` |
| `04-team.md` / `06-team.md` | Team Formation | Defines agent team structure | `# Agent Roster`, `## Handoff Protocol`, `## Reviewer Assignment` |
| `execution-log.md` | Execution | Timestamped progress entries | `# Execution Log`, `## [Timestamp] Agent: Action` |
| `verification.md` | Verification | Validates deliverables against requirements | `# Requirements Traceability`, `## Test Results`, `## Confidence Score` |
| `README.md` | Handoff | Scenario summary | `# Executive Summary`, `## Artifacts`, `## Confidence Score`, `## Next Steps` |
| `adr/*.md` | Execution | Architecture Decision Records | `# Title`, `## Status`, `## Context`, `## Decision`, `## Consequences` |

## Team Formation Algorithm

Use the Analysis artifact and Capability Map to form a multi-agent team. Decompose domains, assign candidate roles, map capabilities to roles, define acyclic handoff contracts, assign a reviewer, and verify generated artifacts follow `.github/instructions/*` standards. Record mapping rationale, capability assignment justification, and explicit input/output handoffs.

**Full detail:** see [`references/team-formation.md`](references/team-formation.md).

## Capability Acquisition Decision Tree

Apply the decision tree in order for each required capability: **A) reuse existing repo artifact**, **B) find an external MCP server or published skill**, then **C) build a new MCP server, skill, instruction, or custom agent role**. Record the chosen path, evidence link, status, and any ADR rationale when multiple paths are viable.

**Full detail:** see [`references/capability-acquisition.md`](references/capability-acquisition.md).

## Confidence Scoring Rubric

The confidence score is a weighted aggregate of 6 dimensions, each scored 0–100. This rubric is the canonical source rendered in the HTML report.

| Dimension | Weight | 0 (Critical Gap) | 50 (Partial) | 100 (Full Coverage) |
|-----------|--------|------------------|--------------|---------------------|
| **Capability Coverage** | 25% | <50% of required capabilities available | 50-79% available, major gaps documented | ≥80% available, no critical gaps |
| **MCP Availability** | 20% | No MCP servers; all data access manual | Some MCP servers; fallback scripts required | All data sources have MCP servers |
| **Skill/Instruction Coverage** | 15% | No skills/instructions; agents improvise | Core workflows documented, edge cases missing | Complete skill coverage with examples |
| **Data/Domain Knowledge** | 15% | No domain context; generic implementation | Partial domain data (schemas, APIs), incomplete | Full domain artifacts (schemas, OpenAPI, data samples) |
| **Spec Completeness** | 15% | Missing ≥2 phase artifacts | All artifacts present, some incomplete | All artifacts complete with verification |
| **Verification Status** | 10% | No testing; deliverables unvalidated | Manual verification performed | Automated tests pass; requirements traced |

**Bands:** 80–100 High/Green; 50–79 Medium/Amber; 0–49 Low/Red. Brown-field and modernization adjust scoring for regression safety, repo-wiki freshness, and parity evidence.

**Full detail:** see [`references/confidence-rubric.md`](references/confidence-rubric.md).

## Testing Strategy

Testing is first-class and scenario-specific; integrate it at the right phase instead of treating it as a final-only activity.

| Scenario | Testing Strategy | Primary Goal |
|----------|------------------|--------------|
| **Green-field** | TDD + BDD | Lock specs before implementation with executable acceptance scenarios and failing tests. |
| **Brown-field** | Snapshot + characterization safety net | Preserve existing behavior before changing code. |
| **Modernization** | Backward compatibility + API contract/parity testing | Prove modernized outputs match legacy outputs on identical inputs. |

Weak tests lower Verification Status directly and can also lower Capability Coverage and Spec Completeness when testing tools or test specs are missing.

**Full detail:** see [`references/testing-strategy.md`](references/testing-strategy.md).

## Upstream Template Feedback Loop

Repos created from this template can report template-level improvements back to the source when scenario execution reveals a gap in the template itself.

- **When:** File feedback for capability gaps, broken references, confidence-lowering friction, unclear prompt steps, or missing guidance.
- **Who:** Any custom-agent role, Squad member, or GitHub Copilot agent running a scenario.
- **How:** Invoke `github-issues`, target `pascalvanderheiden/meta-agentic-template` (unless fork override), label `template-feedback`, and include confidence impact.

Compact issue body headings retained for cross-reference compatibility:

```markdown
## Scenario
## Prompt
## Phase
## What Was Missing / Friction
## Suggested Improvement
## Confidence Impact
## Repro / Context
```

**Full detail:** see [`references/feedback-loop.md`](references/feedback-loop.md).

## References

### Reference folder index

- [`references/README.md`](references/README.md) — Short index of detailed methodology references.
- [`references/phase-pipeline.md`](references/phase-pipeline.md) — Full 10-phase SDD definitions, inputs, outputs, and exit criteria.
- [`references/source-context-and-topology.md`](references/source-context-and-topology.md) — Repo-wiki ingestion, drift handling, confidence impact, and topology rules.
- [`references/sdd-frameworks.md`](references/sdd-frameworks.md) — Full optional SDD framework mappings for None, Spec-Kit, OpenSpec, and Superpowers.
- [`references/team-formation.md`](references/team-formation.md) — Full domain-to-role team formation algorithm.
- [`references/capability-acquisition.md`](references/capability-acquisition.md) — Full reuse/find/build decision tree for capabilities.
- [`references/confidence-rubric.md`](references/confidence-rubric.md) — Full scoring formula, bands, scenario adjustments, and worked example.
- [`references/testing-strategy.md`](references/testing-strategy.md) — Full scenario-specific testing approach, tooling, and gotchas.
- [`references/feedback-loop.md`](references/feedback-loop.md) — Full upstream template feedback workflow, issue template, transport, and example.

### External and related resources

- Team formation guidelines: `.github/instructions/agents.instructions.md`
- Skill authoring standards: `.github/instructions/agent-skills.instructions.md`
- Instruction authoring standards: `.github/instructions/instructions.instructions.md`
- MCP server catalog: [references.md](./references.md)
- Repo-wiki source-context workflow: [repo-wiki skill](../repo-wiki/SKILL.md)
- HTML report template: [progress-report skill](../progress-report/SKILL.md)
- GitHub issues skill: [github-issues/SKILL.md](../github-issues/SKILL.md)
