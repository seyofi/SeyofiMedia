export type ProjectStatus = 'PLANNING' | 'PRE_PRODUCTION' | 'PRODUCTION' | 'POST_PRODUCTION' | 'COMPLETED' | 'ARCHIVED';

export type TimeOfDay = 'DAY' | 'NIGHT' | 'DAWN' | 'DUSK' | 'GOLDEN_HOUR';

export interface ProjectEntity {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  budget: number;
  spent: number;
  era: string;
  currency: string;
  updatedAt: string;
}

export interface SceneEntity {
  id: string;
  projectId: string;
  sceneNumber: number;
  title: string;
  location: string;
  setting: 'INT' | 'EXT';
  timeOfDay: TimeOfDay;
  scriptPages: number;
  summary: string;
  cast: string[];
  status: 'DRAFT' | 'READY' | 'SCHEDULED' | 'SHOT' | 'WRAP';
  estimatedCost: number;
}

export interface CharacterEntity {
  id: string;
  code: string;
  name: string;
  era: string;
  archetype: string;
  forensicProfile: string;
  visualDna: {
    hair: string;
    eyes: string;
    skinTone: string;
    physique: string;
    clothing: string;
    ornaments: string;
  };
  promptPack: {
    photorealistic: string;
    stylizedPixar: string;
    cinematicAaa: string;
    concept2d: string;
  };
}

export interface CognitiveUnitEntity {
  unitCode: string; // e.g. CU_0001
  name: string;
  layer: 'REASONING' | 'DECISION' | 'MEMORY' | 'KNOWLEDGE' | 'LEARNING' | 'ORCHESTRATION' | 'PLANNING' | 'EXECUTION';
  purpose: string;
  status: 'ONLINE' | 'ACTIVE' | 'STANDBY';
  confidenceScore: number;
  executionMetrics: {
    runs: number;
    avgLatencyMs: number;
    errorRate: number;
  };
}

export interface WorkflowTaskEntity {
  id: string;
  title: string;
  division: string;
  stage: 'PRE_PRODUCTION' | 'PRODUCTION' | 'POST_PRODUCTION' | 'DISTRIBUTION';
  status: 'TODO' | 'IN_PROGRESS' | 'WAITING_APPROVAL' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  automationType: 'MANUAL' | 'N8N_WORKFLOW' | 'AI_COGNITIVE' | 'MCP_TOOL';
  assignee: string;
  dueDate: string;
}
