## SDD Framework Selection (Optional)

Scenario prompts MUST ask for an optional **SDD Framework** during Intake. Default to **None** unless the user explicitly chooses a framework. This choice is **orthogonal** to the existing Execution Approach choice: SDD Framework controls how specs and workflow artifacts are produced; Execution Approach controls who runs the work (Custom Agents or Squad Team). Valid combinations include `None + Custom Agents`, `None + Squad`, `Spec-Kit + Squad`, `OpenSpec + Custom Agents`, and `Superpowers + Squad`.

| Framework | Core philosophy | Prescriptive artifacts / commands | Best-fit scenarios | Install / entry point |
|-----------|-----------------|-----------------------------------|--------------------|-----------------------|
| **None** (default) | Use this template's native SDD flow without external framework ceremony. | Native `docs/<scenario>-<slug>/` artifacts, 10-phase pipeline, templates, confidence rubric. | **Recommended default for brown-field** because native Discovery + safety-net testing fits existing-system work; also valid for any scenario when users want no framework lock-in. | No install. Run native scenario prompt unchanged. |
| **GitHub Spec-Kit** | Intent → executable spec → plan → tasks → implementation; specs become the durable context for predictable outcomes. | `specify init`, `/speckit.constitution`, `/speckit.specify`, `/speckit.clarify`, `/speckit.checklist`, `/speckit.plan`, `/speckit.tasks`, `/speckit.analyze`, `/speckit.implement`; artifacts under `.specify/` and `specs/`/feature folders. | **Recommended default for modernization** because its governed constitution→specify→plan→tasks→analyze→implement flow fits legacy→target migration with parity gates. | `uvx --from git+https://github.com/github/spec-kit.git specify init . --integration copilot` or persistent `uv`/`pipx` install. Docs: https://github.github.io/spec-kit/ |
| **OpenSpec** | Align before code with lightweight, iterative, brownfield-first change proposals. | `openspec init`; `/opsx:propose`, `/opsx:explore`, `/opsx:apply`, `/opsx:sync`, `/opsx:archive`; expanded: `/opsx:new`, `/opsx:continue`, `/opsx:ff`, `/opsx:verify`, `/opsx:bulk-archive`, `/opsx:onboard`; artifacts under `openspec/specs/` and `openspec/changes/<change>/`. | **Recommended default for green-field** because change-proposal align-before-code discipline keeps a fresh build spec-locked; also useful for incremental changes and parallel streams. | `npm install -g @fission-ai/openspec@latest && openspec init`; then `/opsx:propose <change>`. |
| **Superpowers** | Composable process skills enforce disciplined brainstorming, planning, TDD, subagent execution, review, and branch finishing. | Skills: `brainstorming`, `writing-plans`, `using-git-worktrees`, `test-driven-development`, `subagent-driven-development` or `executing-plans`, `requesting-code-review`, `finishing-a-development-branch`; plans default to `docs/superpowers/plans/YYYY-MM-DD-<feature>.md`. | Optional execution-discipline overlay for any scenario; strongest when quality depends on TDD, small tasks, and review loops. | For Copilot CLI: `copilot plugin marketplace add obra/superpowers-marketplace` then `copilot plugin install superpowers@superpowers-marketplace`. |

### None (Native Pipeline)

Use the native pipeline when the user declines or skips framework selection. The 10 phases, artifact templates, capability mapping, team formation, testing strategy, confidence rubric, and handoff run exactly as defined in this skill.

**Pipeline mapping:** No phases are replaced or renamed. Framework-specific artifacts are not created. The scenario prompt still asks Execution Approach (Custom Agents vs Squad Team) and proceeds with that answer.

### GitHub Spec-Kit

**Verified URLs:** https://github.com/github/spec-kit and https://github.github.io/spec-kit/

Spec-Kit is the most prescriptive option. It treats specifications as first-class executable context and moves work through explicit gates: establish principles, specify behavior, clarify ambiguity, check requirements quality, plan implementation, generate tasks, analyze artifact consistency, then implement.

**Prescriptive flow:**

1. Run `specify init . --integration copilot` for the project or feature workspace.
2. Use `/speckit.constitution` to establish project principles: quality, testing, UX, performance, security, governance.
3. Use `/speckit.specify` to capture **what** and **why** without premature tech-stack decisions.
4. Use `/speckit.clarify` to resolve underspecified requirements.
5. Use `/speckit.checklist` to validate requirement completeness and clarity before planning.
6. Use `/speckit.plan` to choose architecture and technical approach.
7. Use `/speckit.tasks` to create actionable implementation tasks.
8. Use `/speckit.analyze` before implementation to detect inconsistencies across spec, plan, and tasks.
9. Use `/speckit.implement` to execute the tasks.

**Mapping to the native 10-phase pipeline:**

| Native phase | Spec-Kit mapping |
|--------------|------------------|
| Intake & Clarification | Augmented by framework selection and `/speckit.specify`; `/speckit.clarify` becomes the preferred ambiguity-resolution gate. |
| Discovery | Native discovery still runs for brown-field/modernization before or alongside `/speckit.specify`; discovery findings feed the feature spec. |
| Assessment | Native modernization assessment still runs; its target-state and gap outputs feed `/speckit.constitution`, `/speckit.specify`, and `/speckit.plan`. |
| Analysis | Largely superseded by `/speckit.specify` + `/speckit.checklist`; keep native capability-requirement extraction as an addendum. |
| Capability Mapping | Native phase remains; map Spec-Kit-required commands/templates plus implementation capabilities. |
| Capability Acquisition | Native phase remains; install/initialize Spec-Kit and any missing implementation tools. |
| Team Formation | Native phase remains; agents execute Spec-Kit commands/artifacts according to chosen Execution Approach. |
| Execution | Replaced in structure by `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`; native execution log records command outputs and decisions. |
| Verification | Augmented by `/speckit.analyze`, checklist results, tests, and native confidence scoring. |
| Handoff | Native handoff remains; include Spec-Kit artifacts, command history, and any remaining checklist gaps. |

**Artifact precedence:** Spec-Kit's constitution/spec/plan/tasks are authoritative for requirements and implementation sequencing once generated. Native artifacts continue to hold scenario context, capability/team decisions, verification, and handoff. If Spec-Kit artifacts are generated but not analyzed or reconciled, lower **Spec Completeness** in the Confidence Rubric because framework alignment is incomplete.

### OpenSpec

**Verified URL:** https://github.com/Fission-AI/OpenSpec

OpenSpec is a lightweight, iterative, brownfield-first spec layer. It separates current behavior (`openspec/specs/`) from proposed modifications (`openspec/changes/<change>/`) so humans and agents align on each change before implementation. Its philosophy is actions, not rigid phases: explore, propose, apply, verify/sync, and archive as the work evolves.

**Prescriptive flow:**

1. Install and initialize: `npm install -g @fission-ai/openspec@latest`, then `openspec init`.
2. Use `/opsx:explore` when requirements or existing-system behavior need investigation.
3. Use `/opsx:propose <change>` for the default quick path; it creates proposal, specs, design, and tasks for `openspec/changes/<change>/`.
4. For complex work, enable expanded workflow with `openspec config profile && openspec update`, then use `/opsx:new`, `/opsx:continue`, or `/opsx:ff` for controlled artifact creation.
5. Use `/opsx:apply` to implement tasks.
6. Use `/opsx:verify` when available to validate completeness, correctness, and coherence.
7. Use `/opsx:sync` to merge delta specs into `openspec/specs/` when needed.
8. Use `/opsx:archive` to preserve the completed change under `openspec/changes/archive/`.

**Mapping to the native 10-phase pipeline:**

| Native phase | OpenSpec mapping |
|--------------|------------------|
| Intake & Clarification | Augmented by framework selection; `/opsx:explore` handles unclear intent before creating a change. |
| Discovery | Strongly augmented; brown-field discovery feeds `openspec/specs/` as current behavior and/or `/opsx:explore` findings. |
| Assessment | Augmented for modernization; legacy and target-state gaps become separate OpenSpec changes or delta specs. |
| Analysis | Reframed as change scoping: proposal + behavior specs + scenarios. |
| Capability Mapping | Native phase remains; include OpenSpec CLI/profile, current-spec ownership, and implementation tools. |
| Capability Acquisition | Native phase remains; install OpenSpec and configure profile/agent commands. |
| Team Formation | Native phase remains; each agent owns a change, spec domain, or verification role depending on Execution Approach. |
| Execution | Replaced in structure by `/opsx:apply` against `tasks.md`; native execution log records change-folder progress. |
| Verification | Augmented by `/opsx:verify`; native verification also checks tests and confidence scoring. |
| Handoff | Native handoff remains; include active/archived changes, synced specs, and unresolved deltas. |

**Artifact precedence:** OpenSpec `openspec/specs/` is authoritative for current behavior; `openspec/changes/<change>/` is authoritative for proposed deltas. Native docs remain the scenario envelope and confidence record. Unsynced or unarchived completed changes reduce **Spec Completeness** because source-of-truth specs have not been reconciled.

### Superpowers

**Verified URL:** https://github.com/obra/superpowers

Superpowers is not a spec repository format; it is a composable methodology made of process skills. It prevents agents from jumping straight to code by forcing brainstorming, readable design review, detailed implementation plans, TDD, subagent task execution, review, and branch finishing.

**Prescriptive flow:**

1. Use `brainstorming` before coding to refine intent, ask questions, compare approaches, and present design in reviewable chunks.
2. Use `writing-plans` after design approval to create a complete plan with exact files, code snippets, verification commands, and 2-5 minute tasks.
3. Use `using-git-worktrees` when execution needs isolated branches/workspaces.
4. Use `test-driven-development` for implementation: RED test, verify failure, GREEN minimal code, verify pass, REFACTOR while green.
5. Use `subagent-driven-development` for independent task execution: fresh subagent per task, spec-compliance review, then code-quality review.
6. Use `executing-plans` instead when inline/batch execution is better than subagent dispatch.
7. Use `requesting-code-review` and `finishing-a-development-branch` before merge, PR, or handoff.

**Mapping to the native 10-phase pipeline:**

| Native phase | Superpowers mapping |
|--------------|---------------------|
| Intake & Clarification | Augmented by `brainstorming`; design must be reviewed in digestible chunks before planning. |
| Discovery | Native discovery remains; Superpowers adds disciplined questioning and option analysis. |
| Assessment | Native modernization assessment remains; Superpowers turns risk/gap findings into test-first tasks. |
| Analysis | Augmented by `brainstorming`; outputs become approved design/spec context. |
| Capability Mapping | Native phase remains; include required Superpowers skills and test/review capabilities. |
| Capability Acquisition | Native phase remains; install Superpowers and prepare worktree/test tools. |
| Team Formation | Native phase remains; if Execution Approach is Squad, Squad roles can map to implementer/reviewer/tester; if Custom Agents, subagents are dispatched per plan task. |
| Execution | Replaced in discipline by `writing-plans` + `test-driven-development` + `subagent-driven-development`/`executing-plans`. |
| Verification | Strongly augmented by TDD proof, spec-compliance review, code-quality review, and final branch verification. |
| Handoff | Augmented by `finishing-a-development-branch`; include plan file, commits, tests, and review outcomes. |

**Artifact precedence:** Native scenario artifacts remain authoritative for scenario context. Superpowers plan files are authoritative for task execution detail. If a Superpowers plan lacks exact paths, code, commands, or TDD steps, lower **Spec Completeness** and **Verification Status** because the framework's discipline was not actually followed.

### Per-Scenario Best-Practice Application

| Scenario | None (native) | Spec-Kit | OpenSpec | Superpowers |
|----------|---------------|----------|----------|-------------|
| **Green-field** | Valid when user wants no external framework; use native Intake → Analysis → Capability Map → Team → Execution. | Strong option for broad product requirements; use constitution/specify/clarify/checklist to avoid premature tech choices. | **Recommended default for this scenario.** Use OpenSpec's change-proposal align-before-code discipline to keep a fresh build spec-locked. Model initial features as changes and archive after verified implementation so `openspec/specs/` becomes the living product contract. | Optional quality overlay when execution discipline matters most: brainstorm MVP, write exact TDD plan, then execute with subagents and two-stage review. |
| **Brown-field** | **Recommended default for this scenario.** Existing-system Discovery + Safety Net testing is best served by the native pipeline. Capture current behavior in discovery docs and tests before any change; use Squad or Custom Agents per Execution Approach. | Optional after discovery stabilizes current behavior. Feed discovered constraints into `/speckit.specify`; keep `/speckit.plan` conservative and require `/speckit.analyze` to catch architecture conflicts. | Optional for teams that want persistent change folders. Capture current behavior in `openspec/specs/`, create one `openspec/changes/<change>/` per modification, use `/opsx:explore` for codebase investigation, and `/opsx:verify` before archive. | Optional for refactoring or bug fixes. Combine native safety net with strict TDD: characterization test first, minimal change, spec review, quality review. |
| **Modernization** | Valid when user wants native Assessment, target-state mapping, parity tests, and staged migration without external framework ceremony. | **Recommended default for this scenario.** Spec-Kit is widely used for modernization; put migration principles in `/speckit.constitution`, express target capabilities in `/speckit.specify`, use `/speckit.plan` for phased architecture, `/speckit.tasks` for migration slices, and `/speckit.analyze` with parity gates before implementation. | Strong optional fit for incremental modernization. Treat each migration slice as an OpenSpec change with delta specs, design, tasks, verify, sync, and archive. Use parallel changes carefully for independent components. | Optional risk-reduction overlay: brainstorm target architecture, write parity-first plans, enforce RED-GREEN-REFACTOR around adapter/contract tests, and require spec-compliance reviews after each slice. |

### Fallback and Confidence Rules

- If the user chooses **None** or gives no framework preference, run the native 10-phase pipeline unchanged with the selected Execution Approach.
- If the user chooses a framework but required artifacts are missing, stale, unsynced, unanalyzed, or not reconciled with native artifacts, reflect that in the Confidence Rubric:
  - Lower **Spec Completeness** for missing framework artifacts, unresolved ambiguity, unarchived OpenSpec changes, skipped Spec-Kit checklist/analyze, or placeholder-heavy Superpowers plans.
  - Lower **Verification Status** when framework-prescribed verification is skipped (`/speckit.analyze`, `/opsx:verify`, TDD red/green proof, spec/code review).
  - Lower **Capability Coverage** or **Skill/Instruction Coverage** if the selected framework requires tools/skills that are unavailable or uninitialized.
- Do not let framework selection override scenario entry phases: brown-field still needs Discovery; modernization still needs Assessment.
- Do not conflate choices: framework selection defines the spec workflow; Execution Approach defines whether Custom Agents or Squad Team performs it.

---
