export interface IntelligenceRequest {
  id: string;
  userPrompt: string;
  context: {
    projectId?: string;
    sceneId?: string;
    characterCode?: string;
    department?: string;
  };
  timestamp: string;
}

export interface RoutingDecision {
  targetUnitCode: string;
  unitName: string;
  confidence: number;
  reasoning: string;
  recommendedAction: string;
  executionPayload: Record<string, unknown>;
}

export interface IntelligenceResponse {
  requestId: string;
  routing: RoutingDecision;
  result: {
    summary: string;
    details: string[];
    status: 'SUCCESS' | 'REQUIRES_CONFIRMATION' | 'DELEGATED_TO_WORKFLOW';
    n8nWebhookTriggered?: boolean;
    outputArtifacts?: string[];
  };
}
