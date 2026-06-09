## Testing Strategy

Testing is a **first-class, scenario-specific** part of the meta-agentic methodology. The appropriate testing approach varies by scenario and must be integrated at the correct SDD phase to maximize confidence and minimize rework.

### Testing Approach by Scenario

| Scenario | Testing Strategy | Primary Goal | Frameworks |
|----------|------------------|--------------|------------|
| **Green-field** | Test-Driven Development (TDD) + Behavior-Driven Development (BDD) | Lock specs BEFORE coding begins via executable acceptance scenarios | Playwright (E2E/UI), Jest/JUnit (unit), Gherkin/Cucumber (BDD scenarios) |
| **Brown-field** | Safety Net via Snapshot + Characterization Testing | Maintain SAFETY NET around existing behavior BEFORE altering | Approval Tests (lock legacy outputs), BMAD dependency mapping, Playwright (UI regression) |
| **Modernization** | Backward Compatibility + API Contract Testing | Guarantee modernized modules output EXACT same data as legacy | API contract testing (parity tests), golden dataset comparison |

### When Testing Occurs in the SDD Phase Pipeline

Testing is **not** a final phase — it is woven into the pipeline at scenario-specific entry points:

#### Green-Field (TDD + BDD)
1. **Analysis Phase:** Define measurable success criteria (these become test assertions)
2. **Team Formation Phase:** Assign a `Tester` or `QA` agent role with BDD/TDD skills
3. **Execution Phase — BEFORE Implementation:**
   - Author BDD scenarios (Gherkin `.feature` files) derived from requirements
   - Author failing unit tests that specify expected behavior (TDD red phase)
   - **Only then** implement code to make tests green
4. **Verification Phase:** All tests must pass; coverage metrics calculated

#### Brown-Field (Safety Net)
1. **Discovery Phase:** Capture baseline test pass-rate (if existing test suite present)
2. **Analysis Phase — BEFORE Altering Code:**
   - Author **snapshot tests** to lock down current outputs (Approval Tests)
   - Author **characterization tests** to capture existing behavior (unit tests reverse-engineered from code)
   - Run dependency mapping (BMAD) to understand blast radius of changes
   - Capture Playwright UI baselines (screenshots, interaction flows)
3. **Execution Phase:** Modify code ONLY after safety net is green
4. **Verification Phase:** Safety net must remain green (no regressions); new tests for new functionality

#### Modernization (Parity + Contract Testing)
1. **Assessment Phase:** Identify legacy system outputs to preserve (API responses, data formats, business logic results)
2. **Analysis Phase:** Define parity success criteria (e.g., "Fabric output byte-identical to Oracle for golden dataset")
3. **Execution Phase:**
   - Author **API contract tests** comparing legacy vs. modernized responses on identical inputs
   - Maintain **golden datasets** (representative inputs + expected outputs from legacy system)
   - Run **parity tests** continuously (legacy system still operational during migration)
4. **Verification Phase:** 100% parity on golden datasets; performance within tolerance; contract tests green

### Link to Confidence Rubric

Testing directly impacts the **Verification Status** dimension (10% weight) in the 6-dimension confidence rubric:

| Verification Status Score | Criteria |
|---------------------------|----------|
| 0 (Critical Gap) | No testing; deliverables unvalidated |
| 50 (Partial) | Manual verification performed; no automated tests |
| 100 (Full Coverage) | Automated tests pass; requirements traced to test cases |

**Additional rubric impacts:**
- **Capability Coverage (25%):** Penalized if testing framework capabilities (Playwright MCP, Approval Tests, contract testing tools) are missing
- **Spec Completeness (15%):** Penalized if test specifications (BDD scenarios, characterization test suites, parity datasets) are incomplete

### Available Testing Tools

- **Playwright MCP Server:** Available for browser/UI automation (E2E testing, visual regression, screenshot capture). Invoke via MCP connection configured in `.copilot/mcp-config.json`. See [references.md](./references.md) for Playwright MCP server details.
- **Standard Unit Frameworks:** Jest (JS/TS), JUnit (Java), pytest (Python), xUnit (.NET) — use project-appropriate framework
- **Approval Tests:** Libraries for snapshot testing (ApprovalTests.Java, ApprovalTests.Net, approvaltests-python)
- **BDD Frameworks:** Cucumber (Java/Ruby), Behave (Python), SpecFlow (.NET), Cucumber.js (JS/TS)
- **Contract Testing:** Pact (consumer-driven), Spring Cloud Contract, Postman/Newman (API validation)
- **Dependency Mapping:** BMAD (Bayesian Model for Automated Dependency analysis) or similar static analysis tools

### Gotchas

- **Green-field:** Writing tests AFTER code defeats TDD's design benefits — specs must lock BEFORE implementation
- **Brown-field:** Skipping the safety net phase leads to regressions; ALWAYS characterize before altering
- **Modernization:** Parity testing requires the legacy system to remain operational during migration — plan infrastructure accordingly
- **All scenarios:** Weak test coverage lowers the Verification Status score, which cascades into overall confidence degradation

---
