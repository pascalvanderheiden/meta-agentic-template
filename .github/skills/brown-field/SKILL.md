---
name: brown-field
description: 'Extend or modify existing codebases using Spec-Driven Development (SDD). Use when adding features to an existing system, modifying current functionality, or working within an established codebase. Discovers existing architecture, analyzes change requirements, forms specialized agent team, and delivers safe changes with confidence scoring.'
---

# Brown-Field Development

Run the brown-field development workflow to extend or modify existing systems using Spec-Driven Development (SDD).

## When to Use This Skill

- User requests EXTENDING or MODIFYING an existing codebase
- User says "add feature to existing app/service"
- User wants to make changes while preserving existing functionality
- User needs to discover current system before planning changes

## What This Skill Does

This skill delegates to the authoritative brown-field workflow at `.github/prompts/brown-field.prompt.md`, which orchestrates:

1. **Intake & Clarification** — Capture change request, choose execution approach (Custom Agents or Squad), select optional SDD framework
2. **Discovery** — Inventory existing system and generate repo-wiki for context
3. **Analysis** — Decompose requirements and integration points
4. **Capability Mapping** — Identify required skills, MCP servers, instructions
5. **Capability Acquisition** — Discover or build missing capabilities
6. **Team Formation** — Assign capabilities to agent roles, define handoff DAG
7. **Execution** — Execute iteratively with reviewer gates and safety nets
8. **Verification** — Validate deliverables and calculate confidence score
9. **Handoff** — Generate progress report and package artifacts

**Read and execute `.github/prompts/brown-field.prompt.md` in full** — it is the single source of truth for the brown-field workflow.

## VS Code Users

VS Code users can invoke this workflow directly via the `/brown-field` slash command instead of using this skill. Both surfaces share the same authoritative prompt file.
