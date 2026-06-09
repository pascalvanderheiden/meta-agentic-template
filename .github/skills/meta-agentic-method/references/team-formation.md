## Team Formation Algorithm

**Input:** Analysis artifact (functional domains + capability requirements)  
**Output:** Team artifact (agent roster with capability assignments)

**Algorithm:**

1. **Domain Decomposition**
   - Extract functional domains from Analysis artifact
   - For each domain, identify 1-3 core responsibilities
   - Example: "ETL Orchestration" domain → responsibilities: [schedule jobs, monitor execution, handle retries]

2. **Candidate Agent Role Assignment**
   - Map each domain to a candidate agent role using domain-to-role heuristics:
     - **Data extraction** → `Extractor` agent
     - **Data transformation** → `Transformer` agent
     - **Infrastructure provisioning** → `Provisioner` agent
     - **Testing/validation** → `Validator` agent
     - **Monitoring/observability** → `Monitor` agent
     - **Documentation** → `Documenter` agent (implicit in all teams)
   - Merge roles if domains overlap >70% in responsibilities
   - Split roles if a single domain has >5 distinct responsibilities

3. **Capability Assignment**
   - For each agent role, filter Capability Map for relevant capabilities:
     - Match by domain keywords (e.g., "Oracle" keyword → assign to `Extractor` if extracting Oracle data)
     - Match by capability type (e.g., MCP servers with database access → assign to data agents)
   - Assign ≥1 skill, instruction, or MCP server per agent
   - Document unassigned capabilities as "shared utilities" available to all agents

4. **Handoff Protocol Definition**
   - Order agents by dependency chain (data flow sequence)
   - Define handoff contract: what each agent produces and which agent consumes it
   - Example: `Extractor` → produces `schema.json` → consumed by `Transformer`

5. **Reviewer Assignment**
   - Default reviewer: `Validator` agent (if present) or last agent in chain
   - Reviewer responsibilities: verify completeness, check consistency, validate outputs

6. **Compliance Check**
   - Validate all generated agent files follow `.github/instructions/agents.instructions.md`
   - Validate all generated skills follow `.github/instructions/agent-skills.instructions.md`
   - Validate all generated instructions follow `.github/instructions/instructions.instructions.md`
   - Record compliance as decision in `adr/` (per standing decision in `.squad/decisions.md`)

**Evidence to Record:**
- Mapping rationale (why this domain → this agent role)
- Capability assignment justification (why this skill → this agent)
- Handoff contracts (explicit input/output per agent)

---
