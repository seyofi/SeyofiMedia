# Seyofi Media OS — MCP (Model Context Protocol) Tool Catalog

This catalog exposes the external tools and integration endpoints available to the Seyofi Enterprise Intelligence Layer and n8n execution pipelines.

## Active Tools

### 1. `kush_atlas_lookup`
- **Description**: Query the Kush Atlas historical reference ontology (2500–1500 BCE) for materials, costumes, anatomy, and architectural dimensions.
- **Provider**: Internal Semantic Graph (CU_0004)
- **Input Schema**:
  ```json
  {
    "era": "ERA_003_KERMA",
    "category": "CHARACTERS | MATERIALS | WEAPONS | ARCHITECTURE",
    "query": "string"
  }
  ```

### 2. `n8n_trigger_workflow`
- **Description**: Dispatches automation workflows (call-sheet rendering, DaVinci Resolve timeline sync, cloud asset distribution).
- **Endpoint**: `http://localhost:5678/webhook/seyofi-media`
- **Authentication**: Bearer token via environment configuration

### 3. `production_budget_auditor`
- **Description**: Evaluates planned shooting hours against labor contracts and currency conversion for local African & international co-productions.
- **Provider**: Decision Engine (CU_0002)

### 4. `shot_list_generator`
- **Description**: Generates camera focal length, lens package, daylight angle, and crew requirements based on screenplay page analysis.
- **Provider**: Planning Engine (CU_0007)
