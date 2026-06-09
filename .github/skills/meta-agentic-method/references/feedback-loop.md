## Upstream Template Feedback Loop

Repos created FROM this template inherit the ability to report template-level improvements back to the source. When an agent (custom-agent role OR Squad member) discovers a gap, friction point, or optimization opportunity **in the template itself** during scenario execution, they file a structured GitHub issue to the upstream template repo.

### When to Trigger

File upstream feedback when you detect:
- **Capability gap:** A skill, MCP server, or instruction the template catalog **should** include but doesn't
- **Broken/missing reference:** Dead link, outdated registry URL, missing documentation in `references.md`
- **Friction that lowered confidence:** Template workflow step unclear, causing delays or errors that reduced a rubric dimension score
- **Unclear prompt step:** Phase instructions ambiguous, leading to rework or incorrect artifact generation
- **Missing guidance:** Template lacks convention/pattern for a common scenario (e.g., no ADR template, no security review checklist)

### Who Triggers

This is a **cross-cutting responsibility** that applies to:
- **Custom-agent roles** (when using Approach A execution)
- **Squad members** (when using Approach B execution)
- **The GitHub Copilot agent** (when orchestrating via prompt files)

Any team member who encounters template-level friction during a scenario run should file feedback.

### How to File Feedback

1. **Invoke the `github-issues` skill** ([github-issues/SKILL.md](../github-issues/SKILL.md))
2. **Target repository:** `pascalvanderheiden/meta-agentic-template`  
   ⚠️ **Fork override:** If your repo is a fork with a custom template origin, change this to your upstream template repo in `.github/copilot-instructions.md`.
3. **Issue type:** Use `type=Bug` (for broken references, errors) or `type=Feature` (for capability gaps, enhancements)
4. **Label:** `template-feedback` (required for routing to template maintainers)
5. **Issue body structure:**

```markdown
## Scenario
<Green-field | Brown-field | Modernization>

## Prompt
<Which prompt file was active, e.g., green-field.prompt.md>

## Phase
<Which SDD phase surfaced the gap, e.g., "Capability Acquisition">

## What Was Missing / Friction
<Concrete description: what was expected vs. what happened>

## Suggested Improvement
<Actionable recommendation: add skill X, fix reference Y, clarify step Z>

## Confidence Impact
**Dimension:** <Which of the 6 rubric dimensions this affected>  
**Estimated Impact:** <Point delta, e.g., "-10 points on Skill/Instruction Coverage">  
**Justification:** <Why this gap hurt the score — what was missing that the rubric measures>

## Repro / Context
<Links to artifacts, logs, or files that demonstrate the issue>
```

### Confidence Impact Mapping

Map the gap to one of the **6 confidence dimensions** from the rubric:

| Rubric Dimension | Template Gap Example |
|------------------|---------------------|
| **Capability Coverage** | Missing skill in template catalog forced manual implementation |
| **MCP Availability** | `references.md` listed nonexistent MCP server, wasted discovery time |
| **Skill/Instruction Coverage** | Skill had no troubleshooting section, caused trial-and-error delays |
| **Data/Domain Knowledge** | No guidance on extracting domain artifacts (schemas, OpenAPI) from legacy systems |
| **Spec Completeness** | Prompt phase lacked clear output artifact template, produced incomplete doc |
| **Verification Status** | No validation checklist in template, deliverables shipped unverified |

Estimate the **point delta** (0-100 scale) this gap caused in the affected dimension. Be conservative: only significant gaps (>5 points) warrant filing.

### Transport

Filing issues on a **public** repository requires authentication (no anonymous issue creation), but does NOT require a hand-made PAT — host OAuth (GitHub MCP server / IDE sign-in) provides the necessary identity; a PAT is only a fallback option. Reading public issues requires no authentication.

- **Primary:** GitHub MCP server (configured in `.copilot/mcp-config.json`, server name `github`) — uses host OAuth
- **Fallback:** `gh api repos/{owner}/{repo}/issues` (via `gh` CLI) — uses `gh auth login` credentials or `GITHUB_TOKEN` environment variable
- **Auth Note:** Personal Access Tokens (PAT) are optional; most users authenticate via GitHub Copilot's built-in OAuth flow

### Example Issue

**Title:** `Missing Azure Fabric MCP server in references.md catalog`

**Body:**
```markdown
## Scenario
Modernization

## Prompt
modernization.prompt.md

## Phase
Capability Mapping

## What Was Missing / Friction
The prompt instructed agents to consult `references.md` for MCP servers supporting the target platform (Microsoft Fabric). No Fabric MCP server was listed. We spent 45 minutes searching registries manually before discovering `fabric-openapi-mcp` exists but wasn't cataloged.

## Suggested Improvement
Add `fabric-openapi-mcp` to `references.md` under "Data Platform MCP Servers" section with registry link: https://registry.modelcontextprotocol.io/fabric-openapi-mcp

## Confidence Impact
**Dimension:** MCP Availability  
**Estimated Impact:** -15 points  
**Justification:** The rubric awards 100 points when "all data sources have MCP servers." We had to build a fallback REST wrapper, leaving us at 70 points (partial coverage). If the catalog had listed the existing MCP, we'd have scored 90+ (near-full coverage).

## Repro / Context
- Capability map artifact: `docs/oracle-fabric-etl/05-capability-map.md` (line 23: "Fabric MCP — To Build")
- Execution log timestamp: 2026-06-08T14:32:00Z (manual search started)
```

**Labels:** `template-feedback`, `enhancement`  
**Type:** `Feature`

---
