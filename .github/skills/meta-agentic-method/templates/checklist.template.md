<!--
SCENARIO APPLICABILITY: All scenarios
OUTPUT FILENAME: docs/<scenario>-<slug>/checklist.md
DYNAMIC RULES:
  - Fixed: Heading skeleton, checklist categories
  - Generated: Checklist items (from scenario requirements + phase artifacts), gate criteria (from constitution.md if present)
  - Tokens: [SCENARIO_NAME], [SCENARIO_TYPE]
-->

# Quality Gate Checklist: [SCENARIO_NAME]

**Date**: [DATE]  
**Scenario**: [SCENARIO_TYPE]  
**Purpose**: Verify spec completeness, capability coverage, testing, verification, and confidence band before handoff.

## Instructions

- Check items off as completed: `[x]`
- Add findings inline or link to issues
- Items are numbered for traceability
- All items MUST pass for "Ready for Handoff" status

---

## Category 1: Spec Completeness

**Objective**: All required phase artifacts are present and complete.

<!-- GENERATED: Checklist items based on scenario type -->

- [ ] CHK001 `00-intake.md` present with all clarifying questions resolved
- [ ] CHK002 `02-discovery.md` present (brown-field/modernization) with component inventory complete
- [ ] CHK003 `03-assessment.md` present (modernization only) with gap analysis and migration risks documented
- [ ] CHK004 `01-analysis.md` (or `04-analysis.md`) present with ≥2 functional domains and BDD scenarios
- [ ] CHK005 `03-capability-map.md` (or `05-capability-map.md`) present with all capabilities mapped (no "TBD" or "Unknown")
- [ ] CHK006 `04-team.md` (or `06-team.md`) present with ≥2 agents and handoff chain defined
- [ ] CHK007 `plan.md` present with phases, milestones, and testing strategy
- [ ] CHK008 `tasks.md` present with all tasks assigned to agents
- [ ] CHK009 `verification.md` present with traceability matrix and confidence score
- [ ] CHK010 `README.md` present with executive summary and next steps
- [ ] CHK011 `checklist.md` (this file) complete
- [ ] CHK012 Constitution compliance verified (if `constitution.md` exists)

**Status**: [PASS / INCOMPLETE — [COUNT] items remaining]

---

## Category 2: Capability Coverage

**Objective**: All required capabilities are available and tested.

<!-- GENERATED: Items from capability-map.md -->

- [ ] CHK013 All capabilities from `capability-map.md` marked "Available" or "Built"
- [ ] CHK014 All "Reused" capabilities verified to exist at documented paths
- [ ] CHK015 All "External" capabilities installed and connection tested
- [ ] CHK016 All "Built" skills follow `.github/instructions/agent-skills.instructions.md`
- [ ] CHK017 All "Built" instructions follow `.github/instructions/instructions.instructions.md`
- [ ] CHK018 All "Built" agents follow `.github/instructions/agents.instructions.md`
- [ ] CHK019 All MCP servers configured in `.copilot/mcp-config.json` and connection verified
- [ ] CHK020 No critical capability gaps (or documented with mitigation)

**Status**: [PASS / INCOMPLETE — [COUNT] items remaining]

---

## Category 3: Testing

**Objective**: Testing strategy executed per scenario requirements.

<!-- GENERATED: Items based on scenario-specific testing strategy from plan.md -->

**Green-field (TDD+BDD)**:
- [ ] CHK021 BDD scenarios authored for all domains in `analysis.md`
- [ ] CHK022 Failing unit tests written before implementation (TDD red phase)
- [ ] CHK023 All tests green after implementation
- [ ] CHK024 Test coverage ≥[TARGET]% (or documented exception)

**Brown-field (Safety Net)**:
- [ ] CHK025 Baseline captured: snapshot tests, characterization tests, UI baselines
- [ ] CHK026 BMAD dependency mapping complete
- [ ] CHK027 Safety net green BEFORE code changes
- [ ] CHK028 Safety net remains green after changes (no regressions)

**Modernization (Parity Testing)**:
- [ ] CHK029 Golden datasets captured from legacy system
- [ ] CHK030 API contract tests comparing legacy vs. modernized
- [ ] CHK031 100% parity on golden datasets (or documented deltas)
- [ ] CHK032 Performance within tolerance of legacy baseline

**All Scenarios**:
- [ ] CHK033 All test results documented in `verification.md`

**Status**: [PASS / INCOMPLETE — [COUNT] items remaining]

---

## Category 4: Verification

**Objective**: Requirements traced to artifacts and confidence score justified.

<!-- GENERATED: Items from verification.md -->

- [ ] CHK034 Requirements traceability matrix complete (all requirements from `analysis.md` mapped)
- [ ] CHK035 ≥80% of success criteria met (or documented exceptions)
- [ ] CHK036 All 6 confidence rubric dimensions scored with justifications
- [ ] CHK037 Aggregate confidence score calculated correctly
- [ ] CHK038 Confidence band determined: [High (80-100) | Medium (50-79) | Low (0-49)]
- [ ] CHK039 Known limitations documented with impact assessment
- [ ] CHK040 Handoff readiness checklist complete (in `verification.md`)

**Status**: [PASS / INCOMPLETE — [COUNT] items remaining]

---

## Category 5: Artifacts & Deliverables

**Objective**: Code, config, and documentation artifacts delivered.

<!-- GENERATED: Items for code/config outputs -->

- [ ] CHK041 All code artifacts committed to repository
- [ ] CHK042 All config files (env, deployment, infrastructure) present
- [ ] CHK043 All new capabilities (skills/instructions/MCP/agents) in correct locations
- [ ] CHK044 HTML progress report generated (using `progress-report` skill)
- [ ] CHK045 ADRs documented for all major decisions (if applicable)
- [ ] CHK046 No secrets or credentials in committed files

**Status**: [PASS / INCOMPLETE — [COUNT] items remaining]

---

## Category 6: Handoff Preparation

**Objective**: Human team has clear next steps and context.

<!-- GENERATED: Items for handoff -->

- [ ] CHK047 Executive summary in `README.md` accurately reflects deliverables
- [ ] CHK048 Next steps clearly defined for human team
- [ ] CHK049 Known gaps and workarounds documented
- [ ] CHK050 Confidence interpretation explains production readiness
- [ ] CHK051 All cross-references in artifacts resolve correctly
- [ ] CHK052 Handoff contacts identified (if applicable)

**Status**: [PASS / INCOMPLETE — [COUNT] items remaining]

---

## Overall Status

**Total Checklist Items**: [COUNT]  
**Completed**: [COUNT] ([PERCENTAGE]%)  
**Remaining**: [COUNT]

**Handoff Status**: [✅ READY FOR HANDOFF | ⚠️ READY WITH CAVEATS | ❌ NOT READY]

### Pass Criteria

- **✅ Ready for Handoff**: All categories PASS (100% complete)
- **⚠️ Ready with Caveats**: ≥80% complete AND all incomplete items documented in `verification.md` as known gaps
- **❌ Not Ready**: <80% complete OR critical items incomplete without mitigation

---

**Notes**:  
[Add findings, exceptions, or follow-up actions here]

---

**Cross-references**:  
- Spec artifacts: All files in `docs/<scenario>-<slug>/`
- Verification: `verification.md`
- Summary: `README.md`
