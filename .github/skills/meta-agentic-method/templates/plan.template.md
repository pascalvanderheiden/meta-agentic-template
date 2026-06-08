<!--
SCENARIO APPLICABILITY: All scenarios
OUTPUT FILENAME: docs/<scenario>-<slug>/plan.md
DYNAMIC RULES:
  - Fixed: Heading skeleton
  - Generated: Phases (from scenario type), milestones (from success criteria), testing strategy (scenario-specific per SKILL.md § Testing Strategy), risks (from analysis/assessment)
  - Tokens: [SCENARIO_NAME], [SCENARIO_TYPE]
-->

# Implementation Plan: [SCENARIO_NAME]

**Date**: [DATE]  
**Scenario**: [SCENARIO_TYPE]  
**Branch**: `[BRANCH_NAME]`

## Summary

[BRIEF_SUMMARY from analysis.md]

## Implementation Phases

<!-- GENERATED: Phases derived from scenario type and functional domains -->

### Phase 1: [PHASE_NAME]

**Objective**: [WHAT_THIS_PHASE_ACHIEVES]

**Owner(s)**: [AGENT_NAME(S)]

**Key Activities**:
- [ACTIVITY_1]
- [ACTIVITY_2]

**Success Criteria**: [MEASURABLE_CRITERION]

**Estimated Effort**: [TIME_ESTIMATE or T-shirt size]

---

### Phase 2: [PHASE_NAME]

**Objective**: [WHAT_THIS_PHASE_ACHIEVES]

**Owner(s)**: [AGENT_NAME(S)]

**Key Activities**:
- [ACTIVITY_1]
- [ACTIVITY_2]

**Success Criteria**: [MEASURABLE_CRITERION]

**Estimated Effort**: [TIME_ESTIMATE or T-shirt size]

---

<!-- GENERATED: Additional phases as needed -->

## Milestones

<!-- GENERATED: Key deliverables mapped to phases -->

| Milestone | Phase | Deliverable | Target Date | Status |
|-----------|-------|-------------|-------------|--------|
| [MILESTONE_NAME] | [PHASE_NAME] | [ARTIFACT_OR_CODE] | [DATE or TBD] | [Not Started/In Progress/Complete] |

## Testing Strategy

<!-- GENERATED: Scenario-specific testing approach per SKILL.md § Testing Strategy -->

**Scenario**: [Green-field | Brown-field | Modernization]

**Testing Approach**: [TDD+BDD | Safety Net | Parity Testing]

### Test Types

<!-- GENERATED: Test suite definitions based on scenario -->

| Test Type | Framework | Scope | Owner |
|-----------|-----------|-------|-------|
| [BDD Scenarios / Snapshot Tests / Parity Tests] | [Playwright / Approval Tests / Contract Testing] | [WHAT_IT_COVERS] | [AGENT_NAME] |
| [Unit Tests] | [Jest/JUnit/pytest/xUnit] | [WHAT_IT_COVERS] | [AGENT_NAME] |
| [Integration Tests] | [Framework] | [WHAT_IT_COVERS] | [AGENT_NAME] |

### Testing Workflow

<!-- GENERATED: Scenario-specific test sequence -->

**Green-field (TDD+BDD)**:
1. Author BDD scenarios (Gherkin `.feature` files) from `01-analysis.md`
2. Author failing unit tests (TDD red phase)
3. Implement code to make tests green
4. Verify all tests pass before Verification phase

**Brown-field (Safety Net)**:
1. Capture baseline: snapshot tests, characterization tests, UI baselines (Playwright)
2. Run BMAD dependency mapping
3. Ensure safety net is green BEFORE altering code
4. Modify code; safety net must stay green (no regressions)

**Modernization (Parity Testing)**:
1. Capture golden datasets from legacy system
2. Author API contract tests comparing legacy vs. modernized responses
3. Run parity tests continuously during migration
4. Achieve 100% parity on golden datasets before cutover

### Available Testing Tools

- **Playwright MCP Server**: Browser/UI automation (E2E, visual regression) — configured in `.copilot/mcp-config.json`
- **Unit Frameworks**: [Jest | JUnit | pytest | xUnit] (project-appropriate)
- **Approval Tests**: Snapshot testing libraries
- **BDD Frameworks**: [Cucumber | Behave | SpecFlow | Cucumber.js]
- **Contract Testing**: [Pact | Spring Cloud Contract | Postman/Newman]

## Risks & Mitigations

<!-- GENERATED: Risks from analysis.md or assessment.md (modernization) -->

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [RISK_DESCRIPTION] | [High/Medium/Low] | [High/Medium/Low] | [MITIGATION_STRATEGY] |

## Dependencies

<!-- GENERATED: External blockers or prerequisites -->

| Dependency | Type | Owner | Status |
|------------|------|-------|--------|
| [DEPENDENCY_DESCRIPTION] | [External API / Infrastructure / Data] | [TEAM_OR_SERVICE] | [AVAILABLE / PENDING / BLOCKED] |

## Exit Criteria

- [ ] All phases complete with success criteria met
- [ ] All milestones delivered
- [ ] Testing strategy executed (tests passing per scenario requirements)
- [ ] All risks mitigated or accepted with documentation

---

**Cross-references**:  
- Previous: `04-team.md` (green/brown) or `06-team.md` (modernization)
- Next: `tasks.md`
- Testing details: See `../SKILL.md` § Testing Strategy
