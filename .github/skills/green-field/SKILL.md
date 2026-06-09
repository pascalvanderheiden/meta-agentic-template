---
name: green-field
description: 'Build new systems from scratch using Spec-Driven Development (SDD). Use when creating a new application, service, or project with no existing codebase. Gathers requirements, forms specialized agent team, acquires capabilities (MCP/skills/instructions), and delivers verified solutions with confidence scoring.'
---

# Green-Field Development

Run the green-field development workflow to build new systems from scratch using Spec-Driven Development (SDD).

## When to Use This Skill

- User requests building a NEW system with no existing codebase
- User says "create a new app/service/project"
- User provides high-level requirements for a green-field build
- User wants to scaffold a complete application from requirements

## What This Skill Does

This skill delegates to the authoritative green-field workflow at `.github/prompts/green-field.prompt.md`, which orchestrates:

1. **Intake & Clarification** — Gather requirements, choose execution approach (Custom Agents or Squad), select optional SDD framework
2. **Analysis** — Decompose into functional domains
3. **Capability Mapping** — Identify required skills, MCP servers, instructions
4. **Capability Acquisition** — Discover or build missing capabilities
5. **Team Formation** — Assign capabilities to agent roles, define handoff DAG
6. **Execution** — Execute iteratively with reviewer gates
7. **Verification** — Validate deliverables and calculate confidence score
8. **Handoff** — Generate progress report and package artifacts

**Read and execute `.github/prompts/green-field.prompt.md` in full** — it is the single source of truth for the green-field workflow.

## VS Code Users

VS Code users can invoke this workflow directly via the `/green-field` slash command instead of using this skill. Both surfaces share the same authoritative prompt file.
