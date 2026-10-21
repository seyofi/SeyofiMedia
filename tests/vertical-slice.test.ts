import { describe, it, expect } from 'vitest';
import { SeyofiIntentRouter } from '../services/intelligence/src/intent-router';
import { SeyofiVerticalSliceEngine } from '../services/workflow/src/vertical-slice';
import { INITIAL_PROJECT, INITIAL_CHARACTERS, INITIAL_COGNITIVE_UNITS } from '../packages/domain/src/entities';

describe('Seyofi Media OS - Intelligence & Domain Verification', () => {
  it('correctly routes historical Kush Atlas queries to Knowledge Engine (CU_0004)', () => {
    const response = SeyofiIntentRouter.processRequest({
      id: 'test-1',
      userPrompt: 'Verify historical accuracy of Kerma Nubian archer longbow and leather armour',
      context: {},
      timestamp: new Date().toISOString()
    });

    expect(response.routing.targetUnitCode).toBe('CU_0004');
    expect(response.routing.confidence).toBeGreaterThan(0.9);
    expect(response.result.status).toBe('SUCCESS');
  });

  it('correctly routes budget queries to Decision Engine (CU_0002)', () => {
    const response = SeyofiIntentRouter.processRequest({
      id: 'test-2',
      userPrompt: 'Review project budget variance and calculate scene cost burn',
      context: {},
      timestamp: new Date().toISOString()
    });

    expect(response.routing.targetUnitCode).toBe('CU_0002');
    expect(response.result.details.length).toBeGreaterThan(0);
  });

  it('executes end-to-end vertical slice for script breakdown', () => {
    const output = SeyofiVerticalSliceEngine.executeSlice({
      projectId: 'proj-kush-01',
      action: 'BREAKDOWN_SCRIPT',
      payload: { scriptSnippet: 'EXT. WESTERN DEFFUFA - DAWN' }
    });

    expect(output.status).toBe('COMPLETED');
    expect(output.domainMutations.length).toBeGreaterThan(0);
    expect(output.n8nDispatches.length).toBeGreaterThan(0);
  });

  it('loads valid initial project and character entities', () => {
    expect(INITIAL_PROJECT.title).toContain('Kush Atlas');
    expect(INITIAL_CHARACTERS.length).toBeGreaterThanOrEqual(2);
    expect(INITIAL_COGNITIVE_UNITS.length).toBeGreaterThanOrEqual(5);
  });
});
