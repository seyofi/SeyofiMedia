import { ProjectEntity, SceneEntity, CharacterEntity, CognitiveUnitEntity, WorkflowTaskEntity } from './types';

export const INITIAL_PROJECT: ProjectEntity = {
  id: 'proj-kush-01',
  title: 'Kush Atlas: Rise of Kerma',
  description: 'Historical cinematic production and narrative world exploring the Kerma era, ancient Nubian civilizations, architecture, and forensic character reconstructions.',
  status: 'PRE_PRODUCTION',
  budget: 2500000,
  spent: 420000,
  era: 'ERA_003_KERMA (ca. 2500–1500 BCE)',
  currency: 'USD',
  updatedAt: new Date().toISOString()
};

export const INITIAL_CHARACTERS: CharacterEntity[] = [
  {
    id: 'chr-001',
    code: 'KER_CHR_010_ARCHER',
    name: 'Kerma Royal Archer (Medjay Heritage)',
    era: 'ERA_003_KERMA',
    archetype: 'Elite Longbow Specialist & Vanguard Guardian',
    forensicProfile: 'Broad athletic stature, pronounced clavicular arch from archery draw weight, mid-thirties, sun-hardened mahogany complexion.',
    visualDna: {
      hair: 'Tight braided cornrows tied back with leather cord and carnelian beads',
      eyes: 'Deep dark amber with vigilant gaze',
      skinTone: 'Rich warm mahogany, subtle scarification along right cheekbone',
      physique: 'Muscular, asymmetrical shoulder hypertrophy typical of traditional Nubian longbow archers',
      clothing: 'Pleated natural linen loincloth with hardened leather bracer and embossed pectoral harness',
      ornaments: 'Ostrich feather badge of honor, carved ivory thumb ring, electrum torque amulet'
    },
    promptPack: {
      photorealistic: 'Cinematic photograph of an ancient Nubian Kerma master archer, 2000 BCE, holding composite acacia longbow, photorealistic 8k, golden hour sun reflection over the Nile, natural linen and leather harness, shot on 65mm Arri Alexa.',
      stylizedPixar: '3D stylized animated character portrait, heroic Kerma archer with expressive warm eyes, ornate braided hair, stylized leather bracer, rich vibrant lighting, Pixar style render.',
      cinematicAaa: 'Unreal Engine 5 hero asset render, AAA historical action RPG protagonist, 8k PBR leather and linen textures, subsurface scattering, ambient dust particles, volumetric lighting.',
      concept2d: 'Detailed 2D digital concept art sheet of Kerma Royal Archer, turnarounds, anatomical proportions, weapon callouts, traditional Sudanese ink wash aesthetics.'
    }
  },
  {
    id: 'chr-002',
    code: 'KER_CHR_001_KANDAKE',
    name: 'Kandake Amanirenas - Sovereign Strategist',
    era: 'ERA_004_MEROE',
    archetype: 'Warrior Queen & Supreme Diplomat',
    forensicProfile: 'Commanding regal presence, single blind left eye bearing battle scar, tall dignified posture, deep bronze skin.',
    visualDna: {
      hair: 'Sculpted royal crown braids interwoven with gold wire and lapis beads',
      eyes: 'Intense hawk-like right eye, left eye covered by decorative silver ocular crest',
      skinTone: 'Deep lustrous bronze with ceremonial ochre accents',
      physique: 'Commanding and stately, adorned in heavy golden collar and scale armor',
      clothing: 'Fine indigo-dyed linen royal mantle draped over engraved bronze cuirass',
      ornaments: 'Ram-head pendant of Amun, solid gold armlets, iron-tipped sceptre'
    },
    promptPack: {
      photorealistic: 'Historical documentary cinema still of Kandake Amanirenas, warrior queen of Kush, holding ceremonial iron sceptre, heavy gold jewelry, photorealistic, cinematic Rembrandt lighting.',
      stylizedPixar: 'Stylized 3D cinematic character of royal Nubian Queen, striking commanding expression, stylized gold accessories, Disney Pixar aesthetic.',
      cinematicAaa: 'Next-gen character model, Kandake Queen of Kush, photorealistic hair cards, 8k normal maps on golden breastplate, cinematic raytracing.',
      concept2d: 'Regal 2D visual development illustration, royal throne room of Meroe, dramatic side lighting, rich gold and lapis pigments.'
    }
  }
];

export const INITIAL_SCENES: SceneEntity[] = [
  {
    id: 'sc-01',
    projectId: 'proj-kush-01',
    sceneNumber: 1,
    title: 'The Western Deffufa at Dawn',
    location: 'Western Deffufa - Temple Complex (Mudbrick Monument)',
    setting: 'EXT',
    timeOfDay: 'DAWN',
    scriptPages: 3.5,
    summary: 'The sun rises behind the colossal mudbrick Deffufa. Priest-architects inspect the ceremonial ramp as royal archers take sentinel posts overlooking the Nile valley.',
    cast: ['KER_CHR_010_ARCHER', 'Priest Amun-Ra', 'Kerma Sentinel Guard'],
    status: 'READY',
    estimatedCost: 85000
  },
  {
    id: 'sc-02',
    projectId: 'proj-kush-01',
    sceneNumber: 2,
    title: 'Council of the High Chieftains',
    location: 'Royal Audience Hall - Mudbrick Colonnade',
    setting: 'INT',
    timeOfDay: 'DAY',
    scriptPages: 4.0,
    summary: 'High council convenes to discuss the northern trade expeditions and defense pacts with neighboring Nile kingdoms. Gold bullion and blue faience are presented.',
    cast: ['KER_CHR_001_KANDAKE', 'High Envoy', 'Trade Minister'],
    status: 'SCHEDULED',
    estimatedCost: 65000
  },
  {
    id: 'sc-03',
    projectId: 'proj-kush-01',
    sceneNumber: 3,
    title: 'The Great Longbow Demonstration',
    location: 'Kerma Military Training Grounds & Sand Flats',
    setting: 'EXT',
    timeOfDay: 'GOLDEN_HOUR',
    scriptPages: 2.0,
    summary: 'Vanguard archers demonstrate rapid volley accuracy against targets placed at 200 cubits distance, testing new acacia composite limbs.',
    cast: ['KER_CHR_010_ARCHER', 'Archer Cadets'],
    status: 'DRAFT',
    estimatedCost: 45000
  }
];

export const INITIAL_COGNITIVE_UNITS: CognitiveUnitEntity[] = [
  {
    unitCode: 'CU_0001',
    name: 'Reasoning Engine',
    layer: 'REASONING',
    purpose: 'Deductive, inductive, and contextual analysis of narrative and production data.',
    status: 'ONLINE',
    confidenceScore: 0.98,
    executionMetrics: { runs: 1420, avgLatencyMs: 42, errorRate: 0.001 }
  },
  {
    unitCode: 'CU_0002',
    name: 'Decision Engine',
    layer: 'DECISION',
    purpose: 'Multi-criteria evaluation for schedule optimization, cast allocation, and budget thresholds.',
    status: 'ONLINE',
    confidenceScore: 0.95,
    executionMetrics: { runs: 890, avgLatencyMs: 38, errorRate: 0.003 }
  },
  {
    unitCode: 'CU_0003',
    name: 'Memory Engine (Episodic & Knowledge)',
    layer: 'MEMORY',
    purpose: 'Persistent narrative continuity, historical lore verification, and world-state registry.',
    status: 'ONLINE',
    confidenceScore: 0.99,
    executionMetrics: { runs: 3200, avgLatencyMs: 18, errorRate: 0.0005 }
  },
  {
    unitCode: 'CU_0004',
    name: 'Knowledge Engine & Graph',
    layer: 'KNOWLEDGE',
    purpose: 'Semantic knowledge ontology linking ancient Kush anthropology, PBR materials, and cinematic shots.',
    status: 'ONLINE',
    confidenceScore: 0.97,
    executionMetrics: { runs: 2100, avgLatencyMs: 25, errorRate: 0.002 }
  },
  {
    unitCode: 'CU_0006',
    name: 'Orchestration & Workflow Engine',
    layer: 'ORCHESTRATION',
    purpose: 'Dispatches autonomous tasks to n8n pipelines, MCP tool endpoints, and human review queues.',
    status: 'ONLINE',
    confidenceScore: 0.99,
    executionMetrics: { runs: 5400, avgLatencyMs: 14, errorRate: 0.0001 }
  },
  {
    unitCode: 'CU_0007',
    name: 'Planning Engine',
    layer: 'PLANNING',
    purpose: 'Dynamic film production scheduling, call sheet generation, and weather-aware shooting days.',
    status: 'ACTIVE',
    confidenceScore: 0.94,
    executionMetrics: { runs: 670, avgLatencyMs: 85, errorRate: 0.004 }
  },
  {
    unitCode: 'CU_0008',
    name: 'Execution Engine',
    layer: 'EXECUTION',
    purpose: 'Executes automated render jobs, asset validation against Kush Atlas standards, and export packages.',
    status: 'ONLINE',
    confidenceScore: 0.96,
    executionMetrics: { runs: 1120, avgLatencyMs: 110, errorRate: 0.002 }
  }
];

export const INITIAL_TASKS: WorkflowTaskEntity[] = [
  {
    id: 'task-101',
    title: 'Forensic PBR Material Audit for Kerma Acacia Wood & Leather',
    division: 'Creative Division - World Building',
    stage: 'PRE_PRODUCTION',
    status: 'COMPLETED',
    priority: 'HIGH',
    automationType: 'AI_COGNITIVE',
    assignee: 'CU_0004_KNOWLEDGE_ENGINE',
    dueDate: '2026-11-01'
  },
  {
    id: 'task-102',
    title: 'Generate Scene 01 Shot List & Camera Rig Coordinates',
    division: 'Cinematic Language Dept',
    stage: 'PRE_PRODUCTION',
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    automationType: 'N8N_WORKFLOW',
    assignee: 'CU_0007_PLANNING_ENGINE',
    dueDate: '2026-11-05'
  },
  {
    id: 'task-103',
    title: 'Ingest n8n Automated Script Breakdown Webhook',
    division: 'Technology Division',
    stage: 'PRE_PRODUCTION',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    automationType: 'MCP_TOOL',
    assignee: 'Seyofi Automation Gateway',
    dueDate: '2026-11-10'
  },
  {
    id: 'task-104',
    title: 'Carbon Footprint & Environmental Sustainability Assessment',
    division: 'Production Division',
    stage: 'PRODUCTION',
    status: 'TODO',
    priority: 'MEDIUM',
    automationType: 'AI_COGNITIVE',
    assignee: 'CU_0002_DECISION_ENGINE',
    dueDate: '2026-11-15'
  }
];
