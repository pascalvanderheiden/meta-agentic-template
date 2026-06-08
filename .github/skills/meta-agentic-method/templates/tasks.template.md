<!--
SCENARIO APPLICABILITY: All scenarios
OUTPUT FILENAME: docs/<scenario>-<slug>/tasks.md
DYNAMIC RULES:
  - Fixed: Heading skeleton, task format conventions
  - Generated: Task groups (from functional domains + plan phases), task rows (from implementation steps), [P] parallel markers (from dependency analysis)
  - Tokens: [SCENARIO_NAME]
  - NOTE: Tasks organized by domain/phase; each task → owner + artifact
-->

# Tasks: [SCENARIO_NAME]

**Date**: [DATE]  
**Input**: `plan.md`, `team.md`, `01-analysis.md` (or `04-analysis.md`)

## Task Format

Each task follows: `[ID] [P?] [Owner] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Owner]**: Agent responsible for this task (from `team.md`)
- Include exact file paths or artifact names in descriptions

## Phase 0: Setup

**Purpose**: Project initialization and infrastructure

<!-- GENERATED: Setup tasks -->

- [ ] T001 [P] [Infrastructure Agent] Create project structure per `plan.md`
- [ ] T002 [P] [Infrastructure Agent] Initialize [language] project with dependencies
- [ ] T003 [P] [Infrastructure Agent] Configure linting and formatting tools
- [ ] T004 [Infrastructure Agent] Setup version control and branching per `constitution.md` (if applicable)

---

## Phase 1: [PHASE_NAME from plan.md]

**Purpose**: [PHASE_OBJECTIVE]

**Owner(s)**: [AGENT_NAME(S)]

<!-- GENERATED: Tasks for this phase; group by domain or functional area -->

### [DOMAIN_NAME] Tasks

- [ ] T005 [P] [AGENT_NAME] [TASK_DESCRIPTION with file path or artifact]
- [ ] T006 [P] [AGENT_NAME] [TASK_DESCRIPTION]
- [ ] T007 [AGENT_NAME] [TASK_DESCRIPTION] (depends on T005, T006)

### [DOMAIN_NAME] Tasks

- [ ] T008 [P] [AGENT_NAME] [TASK_DESCRIPTION]
- [ ] T009 [AGENT_NAME] [TASK_DESCRIPTION]

**Checkpoint**: [WHAT_MUST_BE_COMPLETE before next phase]

---

## Phase 2: [PHASE_NAME from plan.md]

**Purpose**: [PHASE_OBJECTIVE]

**Owner(s)**: [AGENT_NAME(S)]

<!-- GENERATED: Tasks for this phase -->

### Testing (if scenario requires tests FIRST per testing strategy)

- [ ] T010 [P] [Tester Agent] Author BDD scenario for [FEATURE] in `tests/features/[name].feature`
- [ ] T011 [P] [Tester Agent] Author failing unit test for [MODULE] in `tests/unit/test_[name].py`

### Implementation

- [ ] T012 [P] [AGENT_NAME] Create [ENTITY] model in `src/models/[entity].py`
- [ ] T013 [P] [AGENT_NAME] Create [ENTITY] model in `src/models/[entity].py`
- [ ] T014 [AGENT_NAME] Implement [SERVICE] in `src/services/[service].py` (depends on T012, T013)
- [ ] T015 [AGENT_NAME] Implement [ENDPOINT/FEATURE] in `src/[location]/[file].py`

**Checkpoint**: [WHAT_MUST_BE_COMPLETE]

---

<!-- GENERATED: Additional phases as needed from plan.md -->

## Phase N: Polish & Cross-Cutting

**Purpose**: Final improvements and documentation

<!-- GENERATED: Final tasks -->

- [ ] TXXX [P] [Documenter Agent] Update documentation in `docs/`
- [ ] TXXX [P] [AGENT_NAME] Code cleanup and refactoring
- [ ] TXXX [AGENT_NAME] Run validation per `plan.md` testing strategy
- [ ] TXXX [Reviewer Agent] Final review per `team.md` reviewer responsibilities

---

## Dependencies & Execution Order

<!-- GENERATED: Phase dependencies and parallel opportunities -->

### Phase Dependencies

- **Phase 0 (Setup)**: No dependencies — start immediately
- **Phase 1 ([NAME])**: Depends on Phase 0 completion
- **Phase 2 ([NAME])**: Depends on Phase 1 checkpoint
- **Phase N (Polish)**: Depends on all functional phases complete

### Parallel Opportunities

<!-- GENERATED: Tasks marked [P] can run simultaneously -->

**Within Phase 1**:
- T005, T006, T008 can run in parallel (different files, no dependencies)

**Within Phase 2**:
- T010, T011 (tests) can run in parallel
- T012, T013 (models) can run in parallel
- T014 depends on T012, T013 complete

**Across Phases** (if agents are independent):
- Agents working on different domains can proceed in parallel once their dependencies are met

---

## Implementation Strategy

<!-- GENERATED: Execution guidance based on scenario + team structure -->

### Sequential (Single Agent or Linear Dependencies)

1. Complete Phase 0: Setup
2. Complete Phase 1: [NAME] → Checkpoint
3. Complete Phase 2: [NAME] → Checkpoint
4. Complete Phase N: Polish
5. Verify all checkpoints passed

### Parallel (Multiple Agents)

1. All agents: Complete Phase 0 together
2. Once Phase 0 done:
   - [AGENT_A]: Phase 1 Domain [X] tasks
   - [AGENT_B]: Phase 1 Domain [Y] tasks (can run in parallel)
3. Agents synchronize at phase checkpoints
4. All agents: Phase N polish together

### Testing-First (TDD+BDD for Green-field)

1. Author all tests FIRST (BDD scenarios + failing unit tests)
2. Verify tests FAIL before implementing
3. Implement code to make tests green
4. Commit after each task or logical group
5. Stop at checkpoints to validate

---

## Notes

- [P] tasks = different files, no dependencies (can parallelize)
- [Owner] maps to agent in `team.md`
- Each task should reference exact file path or artifact name
- Commit after each task or logical group
- Stop at checkpoints to validate before proceeding

---

**Cross-references**:  
- Previous: `plan.md`
- Next: `verification.md` (after execution)
- Owners: See `04-team.md` (green/brown) or `06-team.md` (modernization)
