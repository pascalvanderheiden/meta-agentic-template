# Tank — History

## Core Context

- **Project:** A meta-cognitive template framework for building GitHub Copilot agentic capabilities across green-field, brownfield, and code modernization scenarios.
- **Role:** Integration Dev
- **Joined:** 2026-06-08T11:54:03.959Z

## Learnings

### 2026-06-08: MCP Server Landscape for Oracle → Fabric Migration

**Key findings:**
- **No first-party Oracle MCP server** — none found in official registry or community awesome-mcp-servers lists. Recommended path: Oracle REST Data Services (ORDS) OpenAPI → `.github/skills/mcp-builder` skill.
- **No first-party Microsoft Fabric MCP server** — gap in official MCP ecosystem. Recommended path: Microsoft Fabric REST APIs OpenAPI → mcp-builder skill.
- **Azure integrations limited** — community servers exist for Azure Storage/SQL but not comprehensive Fabric coverage.
- **Strong database MCP examples** — Supabase MCP server demonstrates best practices for database integration (tables, config, queries).
- **OpenAPI → MCP pattern is critical** — for domains without first-party servers, mcp-builder skill enables rapid MCP server generation from REST API specs.

**Source hubs verified:**
- **MCP Registry** (registry.modelcontextprotocol.io) — official, but small catalog (~dozens)
- **wong2/awesome-mcp-servers** (300+ servers) — most comprehensive community list
- **modelcontextprotocol/servers** — reference implementations (fetch, filesystem, git, memory, time)
- **Skills.sh ecosystem** — Vercel, Anthropic, Supabase skill sources
- **GitHub awesome-copilot** — agents, instructions, skills, MCP tools hub

<!-- Append learnings below -->
