## Source Context Ingestion (Repo-Wiki)

Existing-codebase scenarios MUST distill source context before agents reason over it. Use the [`repo-wiki` skill](../../repo-wiki/SKILL.md) as the authoritative workflow for Karpathy-style LLM-maintained codebase wikis, including the three-layer schema, `index.md`, `log.md`, ingest/query/lint procedures, search tooling, token-mindfulness, and confidence/drift handling.

This reference keeps only scenario topology guidance. Do not duplicate the full repo-wiki workflow here.

### Scenario Timing

- **Green-field:** Skip repo-wiki ingestion; no existing source exists yet.
- **Brown-field Discovery:** Run repo-wiki ingestion during Discovery after APM installs this template's artifacts into the existing repository.
- **Modernization Discovery/Assessment:** Run repo-wiki ingestion for the legacy source, then use the wiki throughout Assessment and target-state planning.

### Confidence Impact Summary

Missing, incomplete, or stale repo-wiki content lowers **Data/Domain Knowledge**, **Spec Completeness**, and **Verification Status**. Apply the detailed drift rules from the [`repo-wiki` skill](../../repo-wiki/SKILL.md) before making design, planning, or implementation decisions.

---

## Repository Topology by Scenario

Choose repository topology during Intake because it determines where meta artifacts, docs, wiki, code changes, and feedback-loop files live.

| Scenario | Topology | Where Work Happens | Source Context Rule |
|----------|----------|--------------------|---------------------|
| **Green-field** | Template fork | Create a new project from this template. The repository is both scaffold and implementation workspace. | No repo-wiki initially; source emerges from specs and implementation. |
| **Brown-field** | In-repo | Install this template's artifacts into the existing source repository via APM. Modify the source in that same repo. Store `docs/<scenario>-<slug>/`, specs, wiki, ADRs, and verification artifacts beside the source. | Generate repo-wiki from the installed repository; wiki is default context, raw files on demand. |
| **Modernization** | Side-car control repo | Create a new repository derived from this template. Leave legacy source untouched and referenced read-only. Build target-state artifacts and new implementation in the control repo. | Add legacy source as a read-only git submodule at `legacy/` and generate repo-wiki as primary context. Use raw submodule files only on demand. |

### Topology Rules

- Use a template fork for green-field scenarios; it carries the methodology, Squad system, skills, prompts, and feedback loop.
- Use APM for brown-field in-repo installation; the existing codebase receives the meta artifacts needed to run Discovery, safety-net testing, specs, execution, and feedback.
- Use a side-car control repo for modernization when source and target differ, such as legacy Oracle remaining untouched while a new Fabric repository is built.
- Pin modernization legacy source with a git submodule at `legacy/` so the raw source revision is versioned and reproducible. Treat the submodule as read-only unless the modernization scope explicitly changes.
- Use the generated repo-wiki, not raw submodule files, as the default LLM context in modernization. Pull raw files from `legacy/` only when the wiki/index points to a precise need.
- Keep the upstream template feedback loop available in all topologies.

---
