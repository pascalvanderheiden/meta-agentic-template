## Confidence Scoring Rubric

The confidence score is a weighted aggregate of 6 dimensions, each scored 0–100. This rubric is the canonical source rendered in the HTML report.

### Scoring Dimensions

| Dimension | Weight | 0 (Critical Gap) | 50 (Partial) | 100 (Full Coverage) |
|-----------|--------|------------------|--------------|---------------------|
| **Capability Coverage** | 25% | <50% of required capabilities available | 50-79% available, major gaps documented | ≥80% available, no critical gaps |
| **MCP Availability** | 20% | No MCP servers; all data access manual | Some MCP servers; fallback scripts required | All data sources have MCP servers |
| **Skill/Instruction Coverage** | 15% | No skills/instructions; agents improvise | Core workflows documented, edge cases missing | Complete skill coverage with examples |
| **Data/Domain Knowledge** | 15% | No domain context; generic implementation | Partial domain data (schemas, APIs), incomplete | Full domain artifacts (schemas, OpenAPI, data samples) |
| **Spec Completeness** | 15% | Missing ≥2 phase artifacts | All artifacts present, some incomplete | All artifacts complete with verification |
| **Verification Status** | 10% | No testing; deliverables unvalidated | Manual verification performed | Automated tests pass; requirements traced |

### Aggregate Formula

```
Confidence Score = 
  (Capability Coverage × 0.25) +
  (MCP Availability × 0.20) +
  (Skill/Instruction Coverage × 0.15) +
  (Data/Domain Knowledge × 0.15) +
  (Spec Completeness × 0.15) +
  (Verification Status × 0.10)
```

### Confidence Bands

| Score Range | Band | Color | Interpretation |
|-------------|------|-------|----------------|
| 80–100 | High | Green | Ready for production execution with minimal risk |
| 50–79 | Medium | Amber | Viable with documented gaps; manual intervention likely |
| 0–49 | Low | Red | Significant blockers; not recommended for execution |

### Scenario-Specific Scoring Adjustments

While the base rubric applies to all scenarios, specific adjustments account for scenario-unique success criteria:

- **Brown-field**: The **Verification Status** dimension MAY penalize the score if the existing test suite's pass-rate regresses after changes. A baseline test pass-rate should be captured during Discovery and verified post-Execution. Any regression indicates integration risk. Missing or stale repo-wiki content also lowers **Data/Domain Knowledge**, **Spec Completeness**, and **Verification Status**.

- **Modernization**: The **Data/Domain Knowledge** dimension SHOULD weight toward data-parity verification. Full domain coverage includes not just schemas and APIs, but also data samples, lineage documentation, repo-wiki coverage, and evidence that migrated data matches legacy system output for representative test cases. Stale or incomplete wiki coverage lowers **Data/Domain Knowledge**, **Spec Completeness**, and **Verification Status** until refreshed or verified against raw source.

These adjustments ensure the confidence score reflects scenario-specific risks: preserving existing functionality in brown-field scenarios, maintaining indexed source understanding, and ensuring data fidelity in migrations.

---

### Worked Example: Oracle → Fabric ETL Migration

**Scenario Context:**
- Migrate existing Oracle-based ETL pipeline to Microsoft Fabric
- Brown-field scenario (existing Oracle system to discover)
- Target: Fabric Lakehouse + Data Factory

**Dimension Scores:**

| Dimension | Score | Justification |
|-----------|-------|---------------|
| **Capability Coverage** | 85 | 9/10 capabilities available: MCP server for Oracle schema extraction (reused `database-inspector-mcp`), Fabric API skill (generated from OpenAPI), migration validator agent (created). Missing: real-time sync capability (documented as manual workaround). |
| **MCP Availability** | 90 | MCP servers available for Oracle (`database-inspector-mcp`) and Fabric REST API (`fabric-api-mcp` generated from OpenAPI). No MCP for Fabric Lakehouse direct access (using REST API as proxy). |
| **Skill/Instruction Coverage** | 70 | Skills created for schema transformation (`oracle-to-fabric-schema`) and data validation (`fabric-validation`). Missing: performance tuning guidelines for large datasets (documented in README as known gap). |
| **Data/Domain Knowledge** | 80 | Full Oracle schema extracted (120 tables documented). Fabric API spec available (OpenAPI v3). Sample data for 5 critical tables captured. Missing: full data lineage documentation for all tables. |
| **Spec Completeness** | 95 | All phase artifacts present (Intake, Discovery, Analysis, Capability Map, Team, Execution Log, Verification, README). Minor gap: ADR for Fabric Lakehouse vs. Delta Lake choice incomplete. |
| **Verification Status** | 60 | Schema transformation validated (10/10 tables mapped correctly). Data load tested on 3 sample tables (all pass). Missing: end-to-end integration test (Fabric environment not yet provisioned). |

**Aggregate Calculation:**

```
Confidence Score = 
  (85 × 0.25) + (90 × 0.20) + (70 × 0.15) + (80 × 0.15) + (95 × 0.15) + (60 × 0.10)
= 21.25 + 18.00 + 10.50 + 12.00 + 14.25 + 6.00
= 82.00
```

**Result:** **82 / 100** → **High Confidence (Green)**

**Interpretation:**  
This migration is ready for production execution. The primary risk is lack of end-to-end integration testing (mitigated by phased rollout plan in README). Real-time sync capability gap is acceptable for initial batch-migration phase (documented as Phase 2 follow-up work).

---
