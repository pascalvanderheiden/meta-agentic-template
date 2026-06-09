---
name: repo-wiki
description: 'Create and maintain an LLM-owned repo wiki for indexing and understanding existing codebases. Use for codebase understanding, repo wiki, LLM wiki, brown-field or modernization Discovery context, source assessment, architecture discovery, token-efficient repository indexing, and replacing ad hoc RAG with maintained markdown knowledge.'
---

# Repo-Wiki for Codebase Discovery

Create a persistent, LLM-maintained markdown wiki that compiles source understanding once, keeps it current, and uses it as the default working context for brown-field and modernization Discovery/Assessment.

## When to Use This Skill

- Indexing or understanding an existing source repository.
- Running brown-field Discovery before modifying an existing codebase.
- Running modernization Discovery/Assessment over legacy source.
- Building token-efficient source context without loading the whole tree.
- Creating or refreshing `docs/<scenario>-<slug>/wiki/` artifacts.
- Answering codebase questions from an existing repo-wiki.
- Checking wiki drift, stale source claims, orphan pages, and coverage gaps.

## Pattern: Three Layers

| Layer | Codebase Mapping | Rule |
|-------|------------------|------|
| **Raw sources** | Existing repository files, tests, configs, schemas, docs | Treat as immutable evidence. Read on demand. Never use the whole tree as working context. |
| **The wiki** | LLM-owned markdown under `docs/<scenario>-<slug>/wiki/` | Create, update, cross-link, and maintain as the compiled source understanding layer. |
| **The schema** | This `repo-wiki` skill | Use these conventions and workflows as the authoritative operating contract. |

This is the preferred Discovery/Assessment approach over ad hoc RAG or external indexing skills because knowledge compounds instead of being re-derived on every query.

## Wiki Directory Layout

Create the wiki under the scenario artifact folder:

```text
docs/<scenario>-<slug>/wiki/
├── index.md                 # First-read content catalog
├── log.md                   # Append-only activity timeline
├── overview.md              # Synthesis page from discovery-wiki.template.md
├── wiki-index.json          # Machine index from wiki-index.template.json
├── modules/                 # Per-module, package, service, or component pages
├── concepts/                # Domain concepts, APIs, schemas, flows, invariants
└── risks/                   # Hotspots, drift, technical debt, migration risks
```

Use these templates when available:

- `templates/index.md.template` — starter for `index.md`.
- `templates/log.md.template` — starter for `log.md`.
- `templates/module-page.template.md` — starter for module/component pages.
- `../meta-agentic-method/templates/discovery-wiki.template.md` — starter for `overview.md` synthesis.
- `../meta-agentic-method/templates/wiki-index.template.json` — starter for `wiki-index.json` machine index.

## `index.md` Convention

Read `index.md` first for every repo-wiki query, then drill into specific pages and raw files.

Maintain it as a content catalog grouped by category:

- **Overview:** synthesis and architecture pages.
- **Modules:** module/component pages with path, summary, source files, dependencies, and last reviewed date.
- **Concepts:** domain terms, schemas, APIs, events, jobs, invariants, and data flows.
- **Risks:** hotspots, ambiguous behavior, stale pages, migration risks, and verification gaps.

Each entry includes:

```markdown
- [Page Title](modules/page.md) — one-line summary. Metadata: path=`src/example`, sources=`src/a.ts; src/b.ts`, reviewed=`YYYY-MM-DD`.
```

At small and moderate scale, `index.md` replaces embedding-RAG as the navigation layer.

## `log.md` Convention

Append every ingest, query, and lint operation to `log.md`. Never rewrite prior entries except to fix formatting before commit.

Use this parseable heading prefix:

```markdown
## [YYYY-MM-DD] ingest|query|lint | <title>
```

Include:

- source revision or branch when known;
- packer/tool and scope used;
- pages created or updated;
- raw source paths inspected;
- confidence impact and follow-ups.

The heading format enables simple navigation: `grep "^## \[" docs/<scenario>-<slug>/wiki/log.md | tail`.

## Workflow: Ingest

Use ingest to compile source knowledge incrementally.

1. **Select scope.** Choose one module, package, service, bounded context, runtime boundary, schema area, API surface, or risk hotspot.
2. **Pack token-bounded source.** Use a repository packer such as `repomix`, `gitingest`, or `code2prompt`. Exclude generated files, vendored dependencies, build outputs, secrets, and irrelevant binaries.
3. **Read the area.** Inspect packed context plus targeted raw files only as needed.
4. **Write or update pages.** For module pages, capture responsibilities, key files with paths, public API, dependencies, data flows, invariants, tests, operational notes, and risks.
5. **Update cross-links.** Patch related module, concept, overview, and risk pages when the new area changes the synthesis.
6. **Update `index.md`.** Add or refresh page summaries, source paths, category placement, and reviewed date.
7. **Update `wiki-index.json`.** Keep machine mappings aligned with page/source changes.
8. **Append `log.md`.** Record scope, evidence, pages touched, drift notes, and follow-ups.

One source area can update many pages. Prefer small incremental passes that compound over time instead of re-deriving context per question.

## Workflow: Query

Use query to answer from the maintained wiki first, then raw source.

1. Read `docs/<scenario>-<slug>/wiki/index.md`.
2. Open the smallest relevant wiki pages.
3. Pull raw source files only when exact behavior, line numbers, or verification requires it.
4. Answer with `file:line` citations from raw source for factual code claims.
5. Flag stale or missing wiki coverage instead of guessing.
6. File durable discoveries back into the wiki when the answer adds reusable understanding.
7. Append a `log.md` `query` entry when the query materially changes knowledge or confidence.

## Workflow: Lint

Run lint periodically or before major decisions.

Check for:

- contradictions between pages;
- stale pages where source changed after `reviewed` date;
- orphan pages with no inbound links from `index.md` or related pages;
- missing cross-references between modules, concepts, APIs, schemas, and risks;
- important source areas with no wiki page;
- raw source claims without file path evidence;
- `wiki-index.json` entries that no longer match markdown pages.

Record findings in `log.md` with prefix `## [YYYY-MM-DD] lint | <title>`. Suggest follow-up ingest tasks for gaps instead of trying to repair the whole wiki in one pass.

## Search Tooling

Use `index.md` first. For larger wikis, optionally add on-device markdown search over the wiki:

- [`qmd`](https://github.com/tobi/qmd) provides local BM25/vector hybrid search, LLM re-ranking, CLI access, and MCP support.
- Plain `grep`/ripgrep over markdown is often enough for small wikis.

The wiki is markdown in git, so version history, review diffs, branches, and collaboration come for free.

## Token-Mindfulness Rules

- Link to source files; do not inline large code blocks.
- Chunk by module, service, package, bounded context, schema, or API surface.
- Never load the whole repository tree as working context.
- Treat the wiki and `index.md` as working context; treat raw files as evidence pulled on demand.
- Prefer stable anchors: path, symbol, endpoint, table, job, event, contract, test, or config key.
- Keep pages concise and retrieval-friendly.

## Confidence and Drift

Tie repo-wiki health directly to the meta-agentic confidence rubric:

| Condition | Confidence Impact |
|-----------|-------------------|
| Missing wiki for brown-field/modernization source | Lower **Data/Domain Knowledge** and **Spec Completeness**. |
| Stale pages after source changes | Lower **Data/Domain Knowledge**; require raw-file verification. |
| Weak source citations or missing line evidence | Lower **Verification Status**. |
| Unindexed modules, orphan pages, or missing cross-links | Lower **Spec Completeness**. |
| Lint findings unresolved before planning | Lower confidence band until follow-up ingest completes. |

## Gotchas

- **Never treat raw packed source as the long-lived context** — it is an ingest input, not the maintained knowledge layer.
- **Never answer code facts without source citations** — wiki pages guide retrieval, but raw `file:line` evidence supports factual claims.
- **Never duplicate the full workflow elsewhere** — this skill is the schema and source of truth for repo-wiki operations.
- **Do not rewrite `log.md` history** — append entries so wiki evolution remains auditable.

## References

- Karpathy LLM-maintained wiki pattern: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Overview template: [`../meta-agentic-method/templates/discovery-wiki.template.md`](../meta-agentic-method/templates/discovery-wiki.template.md)
- Machine index template: [`../meta-agentic-method/templates/wiki-index.template.json`](../meta-agentic-method/templates/wiki-index.template.json)
- Related methodology: [`../meta-agentic-method/SKILL.md`](../meta-agentic-method/SKILL.md)
