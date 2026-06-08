# Authoritative Source References

Curated catalog of authoritative URLs for discovering MCP servers, skills, and Copilot customizations. Prompts consult relevant categories during Capability Mapping / Acquisition phases and record which sources they used.

---

## 1. MCP — Registries & Marketplaces

**verified:** yes  
**url:** https://registry.modelcontextprotocol.io/  
**description:** Official MCP Registry — browse published MCP servers

**verified:** yes  
**url:** https://github.com/modelcontextprotocol/servers  
**description:** Reference MCP server implementations by the MCP steering group (fetch, filesystem, git, memory, time, sequential thinking)

**verified:** yes  
**url:** https://github.com/wong2/awesome-mcp-servers  
**description:** Community-curated list of 300+ MCP servers (AllInOneMCP, Airtable, databases, cloud services, dev tools)

**verified:** unverified  
**url:** https://github.com/punkpeye/awesome-mcp-servers  
**description:** Alternative awesome-mcp-servers list (check for additional servers not in wong2's list)

**verified:** unverified  
**url:** https://github.com/particlefuture/MCPDiscovery  
**description:** AllInOneMCP — MCP of MCPs, central hub for discovering and learning about MCP servers

---

## 2. MCP — GitHub Server (Feedback Loop Transport)

**verified:** yes  
**url:** https://github.com/github/github-mcp-server  
**description:** Official GitHub MCP server — provides read/search/projects tools for GitHub API access. Source repository for canonical configuration.

**Config (Remote, Recommended):**
```json
{
  "github": {
    "type": "http",
    "url": "https://api.githubcopilot.com/mcp/",
    "headers": {
      "Authorization": "Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}"
    }
  }
}
```

**Config (Local Fallback, No Remote MCP Support):**
```json
{
  "github": {
    "command": "docker",
    "args": ["run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN", "ghcr.io/github/github-mcp-server"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PERSONAL_ACCESS_TOKEN}"
    }
  }
}
```

**Usage in Template:**
- **Read operations:** MCP server provides `mcp__github__*` tools (search issues, list repos, query projects). Public repo reads need no auth.
- **Write operations:** `.github/skills/github-issues` skill uses `gh api` fallback (create/update/comment/close issues). Filing issues on public repos requires authentication but does NOT require a manual PAT — the remote GitHub MCP server supports host OAuth (IDE/Copilot sign-in) which provides identity. A classic-`repo` / fine-grained Issues:Write PAT is a fallback when OAuth isn't available.
- **Feedback loop:** Repos created from this template use GitHub MCP server to file issues upstream

---

## 3. Testing & MCP

**verified:** yes  
**url:** https://github.com/microsoft/playwright-mcp  
**description:** Official Playwright MCP server — provides browser automation and E2E testing capabilities via MCP. Enables AI-assisted UI testing, snapshot generation, and accessibility checks.

**Config:**
```json
{
  "playwright": {
    "command": "npx",
    "args": ["@playwright/mcp@latest"]
  }
}
```

**Testing Framework Sources:**

### E2E / UI Testing
**verified:** yes  
**url:** https://playwright.dev  
**description:** Playwright — modern E2E testing framework for web apps (Chromium, Firefox, WebKit). First-class for green-field scenario UI testing.

### Unit Testing
**verified:** yes  
**url:** https://jestjs.io  
**description:** Jest — JavaScript testing framework with snapshot testing, mocking, coverage. Green-field default for JavaScript/TypeScript unit tests.

**verified:** yes  
**url:** https://junit.org  
**description:** JUnit — standard Java unit testing framework. Green-field default for Java/Kotlin projects.

### BDD / Gherkin
**verified:** yes  
**url:** https://cucumber.io  
**description:** Cucumber — BDD framework using Gherkin syntax (Given/When/Then). Maps to green-field scenario Behavior Specification phase.

### Approval / Snapshot Testing (Legacy Lock-Down)
**verified:** yes  
**url:** https://approvaltests.com  
**description:** Approval Tests — characterization testing for legacy code. Lock down existing behavior before refactoring. Critical for brown-field scenario Discovery → Lock-Down phase.

### AI-Assisted Refactoring / Dependency Mapping
**verified:** yes  
**url:** https://github.com/bmad-code-org/BMAD-METHOD  
**description:** BMAD-METHOD — AI-assisted legacy code analysis and refactoring. Dependency mapping, blast radius analysis. Brown-field scenario companion for safe changes.

### API Contract Testing (Parity for Modernization)
**verified:** yes  
**url:** https://pact.io  
**description:** Pact — consumer-driven contract testing for APIs and microservices. Ensures API compatibility during modernization migrations.

**verified:** yes  
**url:** https://schemathesis.readthedocs.io  
**description:** Schemathesis — property-based API testing using OpenAPI/GraphQL schemas. Validates API contract parity in modernization scenario.

**Scenario Mapping:**
- **Green-field** (`green-field.prompt.md`): Playwright + Jest/JUnit + Cucumber/Gherkin for new systems
- **Brown-field** (`brown-field.prompt.md`): Approval Tests + BMAD-METHOD + Playwright for safe legacy changes
- **Modernization** (`modernization.prompt.md`): Pact + Schemathesis for API contract/parity testing during platform migration

---

## 4. MCP — Building Your Own

**verified:** unverified  
**url:** https://modelcontextprotocol.io/introduction  
**description:** Official Model Context Protocol documentation — spec, concepts, getting started

**verified:** unverified  
**url:** https://spec.modelcontextprotocol.io  
**description:** MCP protocol specification — full technical spec for implementing MCP servers and clients

**verified:** unverified  
**url:** https://github.com/modelcontextprotocol/typescript-sdk  
**description:** Official TypeScript/JavaScript SDK for building MCP servers

**verified:** unverified  
**url:** https://github.com/modelcontextprotocol/python-sdk  
**description:** Official Python SDK for building MCP servers

**Local skill:** `.github/skills/mcp-builder`  
**description:** Generates MCP servers from OpenAPI specifications. **Path:** Find OpenAPI spec → invoke mcp-builder skill → get generated MCP server code. Example: Oracle REST APIs OpenAPI → mcp-builder → Oracle MCP server.

---

## 5. MCP — Data & Cloud Servers (Migration/ETL Relevant)

### Azure & Microsoft Fabric

**verified:** unverified  
**url:** https://github.com/modelcontextprotocol/servers (search for Azure-related servers)  
**description:** Check official servers repo for Azure integrations

**verified:** unverified  
**url:** https://github.com/wong2/awesome-mcp-servers (search for Azure/Microsoft servers)  
**description:** Community servers may include Azure Storage, Azure SQL, Azure Functions integrations

**Gap noted:** No first-party Microsoft Fabric MCP server found. **Recommended path:** Use Microsoft Fabric REST APIs OpenAPI spec → `.github/skills/mcp-builder` to generate Fabric MCP server.

**verified:** unverified  
**url:** https://learn.microsoft.com/rest/api/fabric/  
**description:** Microsoft Fabric REST API reference — source for generating MCP server via mcp-builder

### Oracle Database

**Gap noted:** No first-party Oracle Database MCP server found in registry or awesome-mcp-servers lists. **Recommended path:** Use Oracle REST Data Services (ORDS) OpenAPI or Oracle Database API → `.github/skills/mcp-builder` to generate Oracle MCP server.

**verified:** unverified  
**url:** https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/  
**description:** Oracle REST Data Services (ORDS) documentation — foundation for Oracle database REST APIs

**verified:** unverified  
**url:** https://www.oracle.com/database/technologies/appdev/rest.html  
**description:** Oracle REST APIs overview — REST access to Oracle Database

### Generic SQL & Data Tools

**verified:** yes  
**url:** https://github.com/wong2/awesome-mcp-servers (search for SQL/database servers)  
**description:** Community MCP servers for PostgreSQL, MySQL, SQLite, generic SQL databases

**verified:** yes  
**url:** https://github.com/supabase/mcp  
**description:** Supabase MCP server — manage tables, fetch config, query data (example of database MCP integration)

---

## 6. Skills Ecosystem

**verified:** yes  
**url:** https://www.skills.sh/  
**description:** Official Skills.sh — open agent skills ecosystem, install skills with `npx skills add <owner/repo>`

**verified:** yes  
**url:** https://github.com/vercel-labs/agent-skills  
**description:** Vercel's agent skills collection — Vercel project audits, React/Next.js performance, UI best practices, writing handbook

**verified:** yes  
**url:** https://github.com/anthropics/claude-cookbooks  
**description:** Claude Cookbooks — code and guides for building with Claude, includes skill/MCP examples

**verified:** yes  
**url:** https://github.com/supabase/mcp  
**description:** Supabase MCP server (also demonstrates skill/MCP patterns)

**verified:** unverified  
**url:** https://github.com/microsoft (search for agent-skills, copilot-skills repos)  
**description:** Microsoft may publish agent skills for Azure, Fabric, GitHub Copilot integrations

**Local skill:** `.github/skills/find-skills`  
**description:** Discover and search agent skills from the ecosystem

**CLI:** `npx skills find <query>` or `npx skills add <owner/repo>`  
**description:** Skills.sh CLI for finding and installing agent skills

---

## 7. Copilot Customization

**verified:** yes  
**url:** https://github.com/github/awesome-copilot  
**description:** Community collection of custom agents, instructions, skills, hooks, workflows, plugins for GitHub Copilot

**verified:** yes  
**url:** https://awesome-copilot.github.com  
**description:** Awesome Copilot website — full-text search, filtering, Tools section (MCP servers), Learning Hub (guides/tutorials)

**verified:** yes  
**url:** https://awesome-copilot.github.com/llms.txt  
**description:** Machine-readable llms.txt with structured listings of agents, instructions, skills for AI consumption

**verified:** unverified  
**url:** https://code.visualstudio.com/docs/copilot/prompt-crafting  
**description:** VS Code Copilot prompt files documentation — creating .prompt.md files

**verified:** unverified  
**url:** https://code.visualstudio.com/docs/copilot/copilot-customization  
**description:** VS Code Copilot customization guide — custom instructions, workspace instructions

**verified:** unverified  
**url:** https://docs.github.com/copilot  
**description:** Official GitHub Copilot documentation — features, extensions, customization, best practices

---

## 8. Spec-Driven Development

**verified:** yes  
**url:** https://github.com/github/spec-kit  
**description:** GitHub Spec-Kit — open source toolkit for spec-driven development, executable specifications generate implementations

**verified:** yes  
**url:** https://github.github.io/spec-kit/  
**description:** Spec-Kit documentation — installation, guides, integration with Copilot

**verified:** unverified  
**url:** https://adr.github.io/  
**description:** Architecture Decision Records (ADR) — lightweight architectural decision documentation format

**verified:** unverified  
**url:** https://github.com/joelparkerhenderson/architecture-decision-record  
**description:** ADR templates and examples — comprehensive collection of ADR formats and use cases

**verified:** unverified  
**url:** https://martinfowler.com/articles/designDocs.html  
**description:** Martin Fowler on design documents — principles for effective technical documentation

---

## 9. Domain Docs — Oracle

**verified:** yes  
**url:** https://docs.oracle.com/en/database/  
**description:** Oracle Database documentation hub — comprehensive database docs, APIs, tools

**verified:** unverified  
**url:** https://docs.oracle.com/en/middleware/goldengate/  
**description:** Oracle GoldenGate documentation — real-time data integration and replication (relevant for ETL/migration)

**verified:** unverified  
**url:** https://www.oracle.com/integration/  
**description:** Oracle Integration — cloud integration platform, data integration, migration tools

**verified:** unverified  
**url:** https://docs.oracle.com/en/cloud/paas/integration-cloud/  
**description:** Oracle Integration Cloud documentation — integration patterns, connectors, ETL capabilities

**verified:** unverified  
**url:** https://www.oracle.com/database/technologies/datawarehouse-bigdata.html  
**description:** Oracle Data Warehousing and Big Data — analytics, data lakes, migration strategies

---

## 10. Domain Docs — Microsoft Fabric

**verified:** yes  
**url:** https://learn.microsoft.com/en-us/fabric/  
**description:** Microsoft Fabric documentation hub — unified data and analytics platform overview

**verified:** unverified  
**url:** https://learn.microsoft.com/en-us/fabric/data-factory/  
**description:** Data Factory in Fabric — data pipelines, dataflows, data integration

**verified:** unverified  
**url:** https://learn.microsoft.com/en-us/fabric/data-factory/dataflows-gen2-overview  
**description:** Dataflows Gen2 documentation — low-code data transformation in Fabric

**verified:** unverified  
**url:** https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-overview  
**description:** Lakehouse in Fabric — unified analytics with lakehouse architecture

**verified:** unverified  
**url:** https://learn.microsoft.com/en-us/fabric/data-warehouse/  
**description:** Data Warehouse in Fabric — enterprise data warehousing capabilities

**verified:** unverified  
**url:** https://learn.microsoft.com/en-us/fabric/get-started/copilot-fabric-overview  
**description:** Copilot in Fabric — AI-assisted data engineering and analytics workflows

**verified:** unverified  
**url:** https://learn.microsoft.com/en-us/power-bi/guidance/migrate-to-fabric  
**description:** Migration guidance to Fabric — strategies for migrating data workloads to Microsoft Fabric

**verified:** unverified  
**url:** https://learn.microsoft.com/en-us/azure/architecture/databases/guide/oracle-to-azure-migration  
**description:** Oracle to Azure migration guide — architectural patterns for Oracle → Azure/Fabric migration

---

## How to Keep This Current

1. **Re-verify `unverified` links:** Use `web_fetch` during prompt execution to validate unverified URLs and update their status.
2. **Add new sources discovered during runs:** When prompts discover valuable MCP servers, skills, or documentation not listed here, append them to the relevant category with verification status.
3. **Check for updates quarterly:** MCP ecosystem is rapidly evolving — quarterly reviews ensure catalog reflects latest servers, SDKs, and tools.
4. **Community contributions:** Monitor awesome-copilot, awesome-mcp-servers, skills.sh for new high-quality additions.
5. **Gap analysis:** Track capability gaps (e.g., missing first-party MCP servers) and update recommended paths (e.g., OpenAPI → mcp-builder).
