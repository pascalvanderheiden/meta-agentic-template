## Source Context Ingestion (Repo-Wiki)

Existing-codebase scenarios MUST distill source context before agents reason over it. Raw source is token-heavy, hard to index, and easy to over-load into context. The repo-wiki is the working source-of-truth for understanding; raw files are pulled only when a specific task requires exact code.

### Ingestion Loop

1. **Pack:** Create a token-bounded repository snapshot with a packer such as repomix, gitingest, or code2prompt. Select the packer that fits repository size, language mix, ignore rules, and available tooling. Exclude generated files, vendored dependencies, build outputs, secrets, and irrelevant binary assets.
2. **Summarize:** Use the packed snapshot to generate `docs/<scenario>-<slug>/wiki/` from `templates/discovery-wiki.template.md`. Capture overview, architecture, module/component index, data flows, dependency graph, glossary, risk hotspots, and refresh/drift log.
3. **Index:** Generate `docs/<scenario>-<slug>/wiki/wiki-index.json` from `templates/wiki-index.template.json`. Include concise file/module/symbol mappings, ownership hints, dependencies, and retrieval anchors.
4. **Reference on demand:** Use the wiki and index as default context. Pull raw source files only for implementation, verification, or ambiguity resolution that names the needed file/module/symbol.

### Token-Mindfulness Rules

- Link to raw files and wiki pages; do not inline large source or long generated content.
- Keep wiki entries concise, structured, and retrieval-friendly.
- Chunk large repositories by module, bounded context, service, package, or runtime boundary.
- Never load the whole tree into agent context. Use the index to select the smallest useful source slice.
- Prefer stable identifiers: path, module, symbol, endpoint, table, job, event, or contract name.

### Drift Refresh

Regenerate or patch the wiki whenever source changes materially, including architecture moves, dependency changes, API/schema changes, renamed modules, or implementation work that invalidates documented behavior. Record source revision, packer, timestamp, changed areas, and confidence impact in the wiki refresh/drift log. Treat a stale wiki as reduced confidence and verify against raw files before making design or implementation decisions.

### Scenario Timing

- **Green-field:** Skip repo-wiki ingestion; no existing source exists yet.
- **Brown-field Discovery:** Run ingestion during Discovery after APM installs this template's artifacts into the existing repository.
- **Modernization Discovery/Assessment:** Run ingestion for the legacy source, then use the wiki throughout Assessment and target-state planning.

### Confidence Impact

Missing, incomplete, or stale repo-wiki lowers these confidence dimensions:

| Dimension | Impact |
|-----------|--------|
| **Data/Domain Knowledge** | Source behavior, domain terms, schemas, and module boundaries are incomplete. |
| **Spec Completeness** | Discovery/Assessment lacks indexed evidence and traceable source references. |
| **Verification Status** | Tests and implementation checks cannot be confidently tied back to actual source behavior. |

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
