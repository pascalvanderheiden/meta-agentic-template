## Shared Execution Method

**Applies to both Approach A (Orchestrator) and Approach B (Squad).**

After the human validation gate (🚦), the execution lead follows this unified contract regardless of approach. Both the Orchestrator agent (`.github/agents/orchestrator.agent.md`) and the Squad coordinator (`.github/agents/squad.agent.md`) must implement this same algorithm.

---

### Step 0: Analyze Generated Artifacts

**Before execution begins**, read and analyze ALL generated `docs/<scenario>-<slug>/` artifacts to understand requirements, scope, and team structure:

| Artifact | Purpose | Location |
|----------|---------|----------|
| **Intake** | User scenario, clarifications, assumptions | `00-intake.md` |
| **Discovery** | Existing-system inventory, repo-wiki (brown-field/modernization only) | `02-discovery.md`, `wiki/` |
| **Assessment** | Legacy-to-target gap analysis (modernization only) | `03-assessment.md` |
| **Analysis** | Functional domains, success criteria, capability requirements | `01-analysis.md` (green/brown) OR `04-analysis.md` (modernization) |
| **Capability Map** | Capabilities mapped to agents/skills/instructions/MCP servers | `03-capability-map.md` (green/brown) OR `05-capability-map.md` (modernization) |
| **Team** | Agent roster, handoff DAG, reviewer assignment | `04-team.md` (green/brown) OR `06-team.md` (modernization) |
| **Testing Strategy** | Testing approach, frameworks, phase integration | `testing-strategy.md` (if present) |
| **Plan** | Implementation plan | `plan.md` (if present) |
| **Tasks** | Work breakdown | `tasks.md` (if present) |
| **ADRs** | Architecture decision records | `adr/*.md` (if present) |

**Key data to extract:**
- SDD Framework choice (None | Spec-Kit | OpenSpec | Superpowers)
- Testing strategy (TDD/BDD, safety net, parity tests)
- Team roster and handoff order
- Exit criteria and verification requirements

---

### Step 1: Branch on SDD Framework Choice

The execution workflow diverges based on the **SDD Framework** selected during Intake. Read the framework choice from `00-intake.md` or the analysis document.

#### Path A: None (No SDD Framework)

**Default native execution:**

1. **Analyze** all generated `docs/<scenario>-<slug>/` artifacts (completed in Step 0).

2. **Enrich Plan and Tasks IN PLACE** using **GitHub Copilot Plan Mode**:
   - Use Plan Mode to produce a detailed implementation plan by **enriching the existing `plan.md`** (do NOT create a separate file).
   - Use Plan Mode to expand the existing `tasks.md` with concrete, actionable implementation tasks.
   - **Graceful degradation:** If Plan Mode is unavailable on the current surface, fall back to the `writing-plans` skill to enrich `plan.md` and `tasks.md` in place.
   - **Result:** `plan.md` and `tasks.md` are now detailed, execution-ready specifications.

3. Proceed to **Step 2: Per-Slice Execution Loop**.

#### Path B: Spec-Kit / OpenSpec / Superpowers

**Framework-native execution:**

Follow the chosen framework's STRICT stepped process using the framework's OWN prompts/skills. The `docs/<scenario>-<slug>/` specs remain the **single source of truth**; framework specs are the **DERIVED** execution-native projection. Both are kept.

**Cross-reference:** See [sdd-frameworks.md](./sdd-frameworks.md) for per-framework command detail. Do NOT duplicate the framework steps here; link to the authoritative reference.

**Key principle:** Framework specs are **derived from and consistent with** `docs/` specs. If framework artifacts diverge from `docs/` specs, reconcile them and update both.

**Examples:**

- **Spec-Kit:** Generate `spec.md` → `plan.md` → `tasks.md` using `/speckit.specify`, `/speckit.plan`, `/speckit.tasks` → execute with `/speckit.implement` → validate with `/speckit.analyze`.

- **OpenSpec:** Create change proposal under `openspec/changes/<id>/` using `/opsx:propose` → implement with `/opsx:apply` → verify with `/opsx:verify` → archive with `/opsx:archive` + `/opsx:sync`.

- **Superpowers:** Generate plan with `writing-plans` → execute with `subagent-driven-development` or `executing-plans` → enforce TDD with `test-driven-development` → review with `requesting-code-review` → finish with `finishing-a-development-branch`.

Proceed to **Step 2: Per-Slice Execution Loop** using the framework's native implement/apply/execute commands.

---

### Step 2: Per-Slice Execution Loop

Execute the plan iteratively, one domain/feature slice at a time. For each slice:

#### 2.1: Implement the Slice

Assign the implementer agent (from team roster) to produce code, configuration, or infrastructure for this slice.

**Outputs:** Code, config files, scripts, infrastructure-as-code, etc.

#### 2.2: Mandatory Testing (Write + Run)

**No artifact is "done" until its tests are written AND run.**

Follow the testing strategy from `testing-strategy.md`:

| Scenario | Testing Strategy | When Tests Are Written |
|----------|------------------|------------------------|
| **Green-field** | TDD + BDD | Write failing tests BEFORE implementation (red → green → refactor) |
| **Brown-field** | Safety Net (snapshot + characterization) | Write baseline tests BEFORE altering code |
| **Modernization** | Parity + Contract Testing | Write parity tests BEFORE migration; verify exact output match |

**Test execution:**
- Run the tests and capture results (pass/fail counts, coverage metrics, error logs).
- **Record test results** in `docs/<scenario>-<slug>/execution-log.md` and prepare data for the HTML report.
- Tests MUST pass before proceeding to the next step. If tests fail, fix the implementation until green.

**Test result data structure (for HTML report):**

Update the `testExecution` object per the schema in `.github/skills/progress-report/SKILL.md`:

```json
{
  "testExecution": {
    "summary": {
      "passed": 12,
      "failed": 0,
      "notRun": 0,
      "skipped": 0,
      "total": 12,
      "coverage": 85
    },
    "suites": [
      {
        "name": "domain-name or feature-name",
        "type": "unit",
        "status": "passed",
        "passed": 12,
        "failed": 0,
        "total": 12,
        "notes": "All tests passing"
      }
    ]
  }
}
```

#### 2.3: Rubber-Duck Contra-Model Review

**Automated contra-model review (ADDITIONAL review beat):**

After the implementer produces code, run a **rubber-duck review with the OPPOSITE model family**:

- **Claude-authored code** → reviewed by a **GPT model** (e.g., `gpt-5.x-codex`)
- **GPT-authored code** → reviewed by **Claude Opus**

**Model pairing table:**

| Author Model Family | Rubber-Duck Reviewer Model |
|---------------------|----------------------------|
| Claude (Sonnet, Opus, Haiku) | `gpt-5.x-codex` or `gpt-5.5` |
| GPT (GPT-4, GPT-5.x) | `claude-opus-4.8` or `claude-opus-4.7` |
| Gemini | `claude-opus-4.8` (default to Claude for non-Claude/GPT authors) |

**Implementation:**
- Use the `task` tool with `agent_type: "rubber-duck"` (if available) OR spawn a subagent with the contra-model explicitly specified using the `model` parameter override.
- The rubber-duck reviewer produces findings (issues, suggestions, security concerns) but does **NOT** modify code.
- Findings are **fed to the designated Reviewer** (from team roster) as additional input.

**Rubber-duck review result data structure (for HTML report):**

Append to the `reviews` array per the schema in `.github/skills/progress-report/SKILL.md`:

```json
{
  "reviews": [
    {
      "slice": "domain-name or feature-name",
      "author": "implementer-agent or claude-sonnet-4.5",
      "reviewerModel": "gpt-5.5",
      "verdict": "approved",
      "findings": 3,
      "notes": "Minor style issues noted; no blockers"
    }
  ]
}
```

#### 2.4: Designated Reviewer Gate (Strict Lockout)

The designated **Reviewer** (from team roster) evaluates the artifact using:
- The implementation itself
- Test results (from 2.2)
- Rubber-duck review findings (from 2.3)

**On Approval:** Proceed to the next slice.

**On Rejection (STRICT LOCKOUT):**
1. The **original author** is **LOCKED OUT** — they may NOT revise the artifact. No exceptions.
2. The Reviewer MUST choose ONE action:
   - **Reassign:** Name a *different* agent (not the original author) to revise.
   - **Escalate:** Spawn a *new* agent with specific expertise.
3. The execution lead MUST enforce lockout: verify that the selected revision agent is NOT the original author. If the Reviewer names the original author, refuse and ask for a different agent.
4. **Lockout scope:** Applies to the specific artifact rejected. The original author may still work on other unrelated slices.
5. **Lockout duration:** Persists for that revision cycle. If the revision is also rejected, the revision author is now also locked out — a third agent must revise.
6. **Deadlock handling:** If all eligible agents have been locked out, escalate to the user rather than re-admitting a locked-out author.

#### 2.5: Record Results and Update HTML Report

**Append to `execution-log.md`:**

```markdown
## [AGENT_NAME] — [SLICE_NAME] — [STATUS]
**Started**: [TIMESTAMP]
**Completed**: [TIMESTAMP]
**Duration**: [HH:MM:SS]
**Artifacts Produced**: [LIST]
**Tests**: [PASSED/FAILED COUNTS, COVERAGE]
**Rubber-Duck Review**: [AUTHOR_MODEL] → [REVIEWER_MODEL], [FINDINGS_COUNT] findings
**Reviewer Verdict**: [APPROVED | REJECTED → REASSIGNED TO <agent>]
**Summary**: [BRIEF_AGENT_SUMMARY]
---
```

**Update `docs/<scenario>-<slug>/progress-report.html`:**

The HTML report includes a JSON data island (`<script id="report-data" type="application/json">`) with the authoritative schema defined in `.github/skills/progress-report/SKILL.md`. **Trinity has added the `testExecution` and `reviews` blocks** — use these EXACT keys:

**testExecution schema:**
```json
{
  "testExecution": {
    "summary": {
      "passed": 12,
      "failed": 0,
      "notRun": 0,
      "skipped": 0,
      "total": 12,
      "coverage": 85
    },
    "suites": [
      {
        "name": "auth-module",
        "type": "unit",
        "status": "passed",
        "passed": 12,
        "failed": 0,
        "total": 12,
        "notes": "All tests passing"
      }
    ]
  }
}
```

**reviews schema:**
```json
{
  "reviews": [
    {
      "slice": "auth-module",
      "author": "implementer-agent or claude-sonnet-4.5",
      "reviewerModel": "gpt-5.5",
      "verdict": "approved",
      "findings": 3,
      "notes": "Minor style issues noted; no blockers"
    }
  ]
}
```

Update the `testExecution.summary`, `testExecution.suites[]`, and `reviews[]` structures with new entries for each slice. The report's render functions (implemented by Trinity) will display this data. See `.github/skills/progress-report/SKILL.md` for the complete schema.

#### 2.6: Repeat for Next Slice

Continue the loop (2.1 → 2.6) for each remaining slice in the plan/tasks.

---

### Step 3: Completion

Once all slices are complete:

#### 3.1: Map Exit Criteria

Compare deliverables against the exit criteria from `01-analysis.md` (or `04-analysis.md` for modernization). Mark each criterion as:

- **MET**: Fully satisfied with evidence (tests pass, artifacts present, requirements traced)
- **PARTIAL**: Partially satisfied with documented gaps
- **BLOCKED**: Not satisfied; blocker documented

#### 3.2: Compute Confidence Score

Calculate the 6-dimension confidence score using the rubric from [confidence-rubric.md](./confidence-rubric.md).

**Verification Status dimension MUST reflect:**
- **(a) Test pass rate:** Percentage of tests passing across all slices.
- **(b) Rubber-duck contra-model review execution:** Whether the rubber-duck review ran for each slice (binary: ran or skipped).

**Scoring guidance for Verification Status:**

| Score | Criteria |
|-------|----------|
| **100** | Automated tests pass (100% pass rate), requirements traced, rubber-duck review ran for all slices |
| **50** | Manual verification performed OR automated tests partial (&lt;100% pass rate) OR rubber-duck review skipped for some slices |
| **0** | No testing; deliverables unvalidated; rubber-duck review skipped entirely |

#### 3.3: Final Report Update

Update `docs/<scenario>-<slug>/progress-report.html` with:
- Final phase progress (all phases complete)
- Final test execution summary (aggregate pass/fail counts, coverage)
- Final review summary (total rubber-duck reviews run, findings)
- Final confidence score (all 6 dimensions)

Append completion summary to `execution-log.md`:

```markdown
## COMPLETION SUMMARY
**Total Duration**: [HH:MM:SS]
**Exit Criteria**: [MET/PARTIAL/BLOCKED counts]
**Confidence Score**: [SCORE] / 100 ([BAND])
**Deliverables**: [LIST OF FINAL ARTIFACTS]
**Blockers**: [ANY INCOMPLETE/REJECTED ITEMS]
---
```

Return the completion summary to the user.

---

## Notes

- **Scenario-agnostic:** This method applies to green-field, brown-field, and modernization scenarios without modification.
- **Approach-agnostic:** Both Orchestrator (Custom Agents) and Squad follow this same contract.
- **Framework-agnostic:** Works with None, Spec-Kit, OpenSpec, and Superpowers.
- **Test-first:** Testing is mandatory every slice, not optional or final-only.
- **Contra-model review:** Automatic opposite-model pairing is a process beat that feeds the existing reviewer gate; it does NOT replace the designated Reviewer.
- **Strict lockout:** Rejected artifacts must be revised by a different agent, never the original author.

---
