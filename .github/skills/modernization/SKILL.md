---
name: modernization
description: 'Migrate or modernize legacy systems using Spec-Driven Development (SDD). Use when migrating between platforms, modernizing legacy code to current-generation stacks, or performing cross-platform migrations. Assesses legacy capabilities, maps to target platform, forms specialized agent team, and delivers verified migration with parity testing and confidence scoring.'
---

# Modernization & Migration

Run the modernization workflow to migrate platforms or modernize legacy systems using Spec-Driven Development (SDD).

## When to Use This Skill

- User requests MIGRATING from one platform/technology to another
- User wants to MODERNIZE legacy systems to current-generation stacks
- User says "migrate to" or "modernize from"
- User needs legacy-to-target gap analysis and migration planning

## What This Skill Does

This skill delegates to the authoritative modernization workflow at `.github/prompts/modernization.prompt.md`, which orchestrates:

1. **Intake & Clarification** — Capture migration request, choose execution approach (Custom Agents or Squad), select optional SDD framework
2. **Discovery** — Inventory legacy system and generate repo-wiki for context
3. **Assessment** — Map legacy capabilities to target state, identify gaps and migration risks
4. **Analysis** — Decompose migration into phases and validation requirements
5. **Capability Mapping** — Identify required skills, MCP servers, instructions
6. **Capability Acquisition** — Discover or build missing capabilities
7. **Team Formation** — Assign capabilities to agent roles, define handoff DAG
8. **Execution** — Execute migration iteratively with parity testing and reviewer gates
9. **Verification** — Validate deliverables, ensure parity, calculate confidence score
10. **Handoff** — Generate progress report and package migration artifacts

**Read and execute `.github/prompts/modernization.prompt.md` in full** — it is the single source of truth for the modernization workflow.

## VS Code Users

VS Code users can invoke this workflow directly via the `/modernization` slash command instead of using this skill. Both surfaces share the same authoritative prompt file.
