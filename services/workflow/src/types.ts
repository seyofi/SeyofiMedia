export interface VerticalSliceInput {
  projectId: string;
  action: 'BREAKDOWN_SCRIPT' | 'AUDIT_CHARACTER' | 'REBALANCE_BUDGET' | 'DISPATCH_AUTOMATION';
  payload: {
    scriptSnippet?: string;
    characterCode?: string;
    budgetDelta?: number;
    notes?: string;
  };
}

export interface VerticalSliceOutput {
  executionId: string;
  status: 'COMPLETED' | 'FAILED';
  intelligenceRouting: {
    unit: string;
    confidence: number;
    summary: string;
  };
  domainMutations: {
    entityType: string;
    entityId: string;
    mutationSummary: string;
  }[];
  n8nDispatches: {
    workflowName: string;
    timestamp: string;
    status: 'DISPATCHED' | 'ACKNOWLEDGED';
  }[];
  durationMs: number;
}
