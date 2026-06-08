<!--
SCENARIO APPLICABILITY: All scenarios
OUTPUT FILENAME: docs/<scenario>-<slug>/verification.md
DYNAMIC RULES:
  - Fixed: Heading skeleton, rubric dimension names, confidence formula
  - Generated: Requirements traceability rows (from analysis.md), test results (from execution), confidence dimension scores (calculated), rubric table with justifications
  - Tokens: [SCENARIO_NAME]
-->

# Verification: [SCENARIO_NAME]

**Date**: [DATE]  
**Scenario**: [Green-field | Brown-field | Modernization]

## Objective

Validate that deliverables meet scenario requirements, pass quality gates, and calculate the confidence score using the 6-dimension rubric.

## Requirements Traceability Matrix

<!-- GENERATED: Map each requirement from analysis.md → artifact → test -->

| Requirement ID | Description | Artifact(s) | Test(s) | Status |
|----------------|-------------|-------------|---------|--------|
| [REQ_ID from analysis] | [REQUIREMENT_TEXT] | [CODE_FILE, CONFIG_FILE, or DOC] | [TEST_NAME or MANUAL_VERIFICATION] | [PASS/FAIL/PARTIAL] |

## Test Results

<!-- GENERATED: Test suite pass/fail results per testing strategy -->

### Scenario-Specific Testing

**Testing Strategy**: [TDD+BDD | Safety Net | Parity Testing] (per `plan.md`)

#### Test Suites

<!-- GENERATED: Results per test suite -->

| Test Suite | Type | Total Tests | Passed | Failed | Coverage | Notes |
|------------|------|-------------|--------|--------|----------|-------|
| [SUITE_NAME] | [BDD/Unit/Integration/Snapshot/Parity] | [COUNT] | [COUNT] | [COUNT] | [PERCENTAGE]% | [NOTES] |

#### Key Test Results

<!-- GENERATED: Critical tests with details -->

**BDD Scenarios** (Green-field):
- ✅ `[SCENARIO_NAME from analysis.md]`: PASS
- ✅ `[SCENARIO_NAME]`: PASS
- ❌ `[SCENARIO_NAME]`: FAIL — [REASON]

**Safety Net Baseline** (Brown-field):
- ✅ Snapshot tests: [X/Y] passing (baseline preserved)
- ✅ Characterization tests: [X/Y] passing
- ❌ Regression: [DESCRIPTION if any]

**Parity Tests** (Modernization):
- ✅ API contract test [ENDPOINT]: PASS (100% parity)
- ✅ Golden dataset [NAME]: PASS (byte-identical output)
- ❌ Golden dataset [NAME]: FAIL — [DELTA_DESCRIPTION]

### Overall Test Status

- **Total Tests**: [COUNT]
- **Passed**: [COUNT] ([PERCENTAGE]%)
- **Failed**: [COUNT] ([PERCENTAGE]%)
- **Coverage**: [PERCENTAGE]%

**Status**: [ALL_PASS | SOME_FAILURES | CRITICAL_FAILURES]

## Confidence Score

<!-- GENERATED: 6-dimension rubric scores with justifications -->

The confidence score is calculated using the 6-dimension rubric from `../SKILL.md` § Confidence Scoring Rubric.

### Dimension Scores

| Dimension | Weight | Score (0-100) | Justification |
|-----------|--------|---------------|---------------|
| **Capability Coverage** | 25% | [SCORE] | [WHY_THIS_SCORE: X/Y capabilities available, gaps: ...] |
| **MCP Availability** | 20% | [SCORE] | [WHY_THIS_SCORE: MCP servers for X, manual fallback for Y] |
| **Skill/Instruction Coverage** | 15% | [SCORE] | [WHY_THIS_SCORE: Skills for core workflows, missing edge-case docs] |
| **Data/Domain Knowledge** | 15% | [SCORE] | [WHY_THIS_SCORE: Full schemas + APIs, partial data samples] |
| **Spec Completeness** | 15% | [SCORE] | [WHY_THIS_SCORE: All artifacts present, minor gaps in ADRs] |
| **Verification Status** | 10% | [SCORE] | [WHY_THIS_SCORE: X% tests pass, manual verification for Y] |

### Aggregate Calculation

```
Confidence Score = 
  ([CAPABILITY_SCORE] × 0.25) +
  ([MCP_SCORE] × 0.20) +
  ([SKILL_SCORE] × 0.15) +
  ([DATA_SCORE] × 0.15) +
  ([SPEC_SCORE] × 0.15) +
  ([VERIFICATION_SCORE] × 0.10)

= [CALCULATION_BREAKDOWN]
= [FINAL_SCORE]
```

### Confidence Band

**Score**: **[FINAL_SCORE] / 100**  
**Band**: **[High (80-100) | Medium (50-79) | Low (0-49)]**  
**Color**: **[Green | Amber | Red]**

**Interpretation**: [WHAT_THIS_SCORE_MEANS for production readiness]

## Known Limitations

<!-- GENERATED: Gaps, workarounds, or incomplete features -->

- **[LIMITATION_CATEGORY]**: [DESCRIPTION] — Mitigation: [WORKAROUND or NONE]
- **[LIMITATION_CATEGORY]**: [DESCRIPTION] — Impact: [SEVERITY]

## Handoff Readiness Checklist

<!-- GENERATED: Final quality gates before handoff -->

- [ ] All "MUST_HAVE" requirements from `00-intake.md` met
- [ ] ≥80% of success criteria from analysis achieved (or documented exceptions)
- [ ] Confidence score calculated and justified
- [ ] All test suites executed (pass/fail documented)
- [ ] Known limitations documented with impact assessment
- [ ] All phase artifacts complete (see `README.md` summary)

**Handoff Status**: [READY | READY_WITH_CAVEATS | NOT_READY]

---

**Cross-references**:  
- Previous: `tasks.md`
- Next: `README.md` (scenario summary)
- Requirements source: `01-analysis.md` (green/brown) or `04-analysis.md` (modernization)
- Confidence rubric: `../SKILL.md` § Confidence Scoring Rubric
