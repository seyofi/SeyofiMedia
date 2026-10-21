import React, { useState } from 'react';
import { 
  Film, 
  Cpu, 
  Users, 
  Workflow, 
  BookOpen, 
  Sparkles, 
  Play, 
  Plus, 
  Copy, 
  Check, 
  Layers, 
  ShieldCheck, 
  DollarSign, 
  Clock, 
  Zap, 
  Search,
  ExternalLink,
  ChevronRight,
  Sliders,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { 
  INITIAL_PROJECT, 
  INITIAL_SCENES, 
  INITIAL_CHARACTERS, 
  INITIAL_COGNITIVE_UNITS, 
  INITIAL_TASKS
} from '../packages/domain/src/entities';
import {
  SceneEntity,
  CharacterEntity,
  WorkflowTaskEntity
} from '../packages/domain/src/types';
import { SeyofiIntentRouter } from '../services/intelligence/src/intent-router';
import { SeyofiVerticalSliceEngine } from '../services/workflow/src/vertical-slice';
import { VerticalSliceOutput } from '../services/workflow/src/types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'workspace' | 'intelligence' | 'characters' | 'workflow' | 'research'>('workspace');
  const [project] = useState(INITIAL_PROJECT);
  const [scenes, setScenes] = useState<SceneEntity[]>(INITIAL_SCENES);
  const [characters] = useState<CharacterEntity[]>(INITIAL_CHARACTERS);
  const [tasks, setTasks] = useState<WorkflowTaskEntity[]>(INITIAL_TASKS);
  
  // Selected items
  const [selectedScene, setSelectedScene] = useState<SceneEntity>(INITIAL_SCENES[0]);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterEntity>(INITIAL_CHARACTERS[0]);
  const [copiedPromptKey, setCopiedPromptKey] = useState<string | null>(null);

  // Intelligence Router Interactive State
  const [queryInput, setQueryInput] = useState('');
  const [routingResult, setRoutingResult] = useState<any>(null);

  // Vertical Slice Execution State
  const [sliceAction, setSliceAction] = useState<'BREAKDOWN_SCRIPT' | 'AUDIT_CHARACTER' | 'REBALANCE_BUDGET' | 'DISPATCH_AUTOMATION'>('BREAKDOWN_SCRIPT');
  const [sliceResult, setSliceResult] = useState<VerticalSliceOutput | null>(null);
  const [isExecutingSlice, setIsExecutingSlice] = useState(false);

  // New Scene Modal / State
  const [showAddScene, setShowAddScene] = useState(false);
  const [newSceneTitle, setNewSceneTitle] = useState('');
  const [newSceneLocation, setNewSceneLocation] = useState('');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptKey(key);
    setTimeout(() => setCopiedPromptKey(null), 2000);
  };

  const handleRunQuery = (customPrompt?: string) => {
    const textToRun = customPrompt || queryInput;
    if (!textToRun.trim()) return;
    const res = SeyofiIntentRouter.processRequest({
      id: 'req-' + Date.now(),
      userPrompt: textToRun,
      context: { projectId: project.id, sceneId: selectedScene.id },
      timestamp: new Date().toISOString()
    });
    setRoutingResult(res);
  };

  const handleExecuteVerticalSlice = () => {
    setIsExecutingSlice(true);
    setTimeout(() => {
      const res = SeyofiVerticalSliceEngine.executeSlice({
        projectId: project.id,
        action: sliceAction,
        payload: {
          characterCode: selectedCharacter.code,
          budgetDelta: 15000,
          notes: 'Triggered from Seyofi Media OS dashboard'
        }
      });
      setSliceResult(res);
      setIsExecutingSlice(false);
    }, 250);
  };

  const handleAddScene = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSceneTitle.trim()) return;
    const newScene: SceneEntity = {
      id: 'sc-' + (scenes.length + 1).toString().padStart(2, '0'),
      projectId: project.id,
      sceneNumber: scenes.length + 1,
      title: newSceneTitle,
      location: newSceneLocation || 'Location Pending',
      setting: 'EXT',
      timeOfDay: 'DAY',
      scriptPages: 1.5,
      summary: 'New scene registered in Seyofi Media OS workspace.',
      cast: ['KER_CHR_010_ARCHER'],
      status: 'DRAFT',
      estimatedCost: 35000
    };
    setScenes([...scenes, newScene]);
    setSelectedScene(newScene);
    setNewSceneTitle('');
    setNewSceneLocation('');
    setShowAddScene(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 font-bold text-lg text-white">
              S
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-amber-200 bg-clip-text text-transparent">
                  SEYOFI MEDIA OS
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Foundation v0.1
                </span>
              </div>
              <p className="text-xs text-slate-400">Autonomous Enterprise & Cinematic Production OS</p>
            </div>
          </div>

          {/* Status Badges */}
          <div className="hidden md:flex items-center space-x-3 text-xs font-mono">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Local-First Runtime</span>
            </div>
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kush Atlas Synced</span>
            </div>
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Workflow className="w-3.5 h-3.5" />
              <span>n8n / MCP Ready</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto border-t border-slate-800/60 pt-1">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`flex items-center space-x-2 py-3 px-4 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'workspace'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Creative Workspace</span>
          </button>

          <button
            onClick={() => setActiveTab('intelligence')}
            className={`flex items-center space-x-2 py-3 px-4 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'intelligence'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Intelligence Core & Units</span>
          </button>

          <button
            onClick={() => setActiveTab('characters')}
            className={`flex items-center space-x-2 py-3 px-4 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'characters'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Character & Visual DNA</span>
          </button>

          <button
            onClick={() => setActiveTab('workflow')}
            className={`flex items-center space-x-2 py-3 px-4 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'workflow'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Vertical Slice & Automation</span>
          </button>

          <button
            onClick={() => setActiveTab('research')}
            className={`flex items-center space-x-2 py-3 px-4 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'research'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Market Research & Foundation</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* ============================================================== */}
        {/* TAB 1: CREATIVE WORKSPACE */}
        {/* ============================================================== */}
        {activeTab === 'workspace' && (
          <div className="space-y-6">
            {/* Project Header Banner */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Film className="w-48 h-48" />
              </div>
              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {project.era}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Status: {project.status}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">{project.title}</h1>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">{project.description}</p>
                
                {/* Financial KPI bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
                  <div>
                    <span className="text-xs text-slate-400 flex items-center">
                      <DollarSign className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      Approved Budget
                    </span>
                    <p className="text-lg font-bold text-white mt-1">${project.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Total Spent</span>
                    <p className="text-lg font-bold text-amber-400 mt-1">${project.spent.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Remaining</span>
                    <p className="text-lg font-bold text-emerald-400 mt-1">${(project.budget - project.spent).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Scenes Ready</span>
                    <p className="text-lg font-bold text-indigo-400 mt-1">{scenes.length} Scenes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scenes & Production Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Scene List Column */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-white flex items-center">
                    <Film className="w-4 h-4 mr-2 text-indigo-400" />
                    Scene Breakdown
                  </h2>
                  <button
                    onClick={() => setShowAddScene(true)}
                    className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center space-x-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Scene</span>
                  </button>
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto">
                  {scenes.map((scene) => (
                    <div
                      key={scene.id}
                      onClick={() => setSelectedScene(scene)}
                      className={`p-3.5 rounded-lg cursor-pointer border transition ${
                        selectedScene.id === scene.id
                          ? 'bg-indigo-950/40 border-indigo-500/70 text-white shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono font-bold text-indigo-400">
                          SCENE {scene.sceneNumber} • {scene.setting}.
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                          {scene.timeOfDay}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm line-clamp-1">{scene.title}</h4>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                        <span className="truncate max-w-[150px]">{scene.location}</span>
                        <span className="font-mono text-emerald-400">${scene.estimatedCost.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scene Detail Panel */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-4">
                    <div>
                      <span className="text-xs font-mono text-indigo-400 uppercase">
                        Production Strip #{selectedScene.sceneNumber} • {selectedScene.setting} • {selectedScene.timeOfDay}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">{selectedScene.title}</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {selectedScene.status}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-1">Location & Setting</h4>
                      <p className="text-sm font-medium text-slate-200">{selectedScene.location}</p>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-1">Narrative Summary</h4>
                      <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-lg border border-slate-800">
                        {selectedScene.summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Required Cast & Assets</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedScene.cast.map((c: string, i: number) => (
                            <span key={i} className="px-2.5 py-1 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 text-xs font-mono">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Technical Metrics</h4>
                        <div className="text-xs space-y-1 text-slate-300">
                          <p>Script Pages: <span className="font-mono text-white font-bold">{selectedScene.scriptPages} pages</span></p>
                          <p>Est. Shoot Day: <span className="font-mono text-white font-bold">0.75 Days</span></p>
                          <p>Estimated Budget: <span className="font-mono text-emerald-400 font-bold">${selectedScene.estimatedCost.toLocaleString()}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Automation actions for selected scene */}
                <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-400 flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-1.5 text-amber-400" />
                    Kush Atlas Standards Verified
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRunQuery(`Generate call sheet and camera package for ${selectedScene.title}`)}
                      className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition"
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Analyze via Intelligence Core</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Add Scene Modal */}
            {showAddScene && (
              <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
                  <h3 className="text-lg font-bold text-white mb-4">Add Production Scene</h3>
                  <form onSubmit={handleAddScene} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Scene Title</label>
                      <input
                        type="text"
                        value={newSceneTitle}
                        onChange={(e) => setNewSceneTitle(e.target.value)}
                        placeholder="e.g. The Caravan Crosses the Nile Cataract"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                      <input
                        type="text"
                        value={newSceneLocation}
                        onChange={(e) => setNewSceneLocation(e.target.value)}
                        placeholder="e.g. Kerma River Harbor"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddScene(false)}
                        className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white"
                      >
                        Create Scene
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: INTELLIGENCE CORE & COGNITIVE UNITS */}
        {/* ============================================================== */}
        {activeTab === 'intelligence' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Cpu className="w-5 h-5 mr-2 text-indigo-400" />
                  Enterprise Intelligence Architecture (CU_0001 – CU_0008)
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Autonomous cognitive units mapped from the Seyofi Project Constitution and Virtual Organization Standards.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-mono text-emerald-400">All Units Operational</span>
              </div>
            </div>

            {/* Cognitive Unit Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {INITIAL_COGNITIVE_UNITS.map((unit) => (
                <div key={unit.unitCode} className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      {unit.unitCode}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {unit.layer}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">{unit.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed min-h-[38px]">{unit.purpose}</p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Runs: <span className="text-white">{unit.executionMetrics.runs}</span></span>
                    <span className="text-slate-400">Latency: <span className="text-indigo-300">{unit.executionMetrics.avgLatencyMs}ms</span></span>
                    <span className="text-slate-400">Score: <span className="text-emerald-400">{Math.round(unit.confidenceScore * 100)}%</span></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Intent Router Tester */}
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-amber-400" />
                Live Intent Router & Cognitive Dispatcher
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Submit production queries or test sample requests to see which cognitive unit intercepts and processes the requirement.
              </p>

              {/* Sample Quick Buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => handleRunQuery('Verify historical accuracy of Kerma Nubian archer longbow and leather armour')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                >
                  🏹 Kerma Archer Forensic Check
                </button>
                <button
                  onClick={() => handleRunQuery('Audit project budget variance and calculate scene burn rate')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                >
                  💰 Budget Threshold Audit
                </button>
                <button
                  onClick={() => handleRunQuery('Optimize shooting schedule call sheet for morning golden hour')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                >
                  📅 Shooting Schedule Plan
                </button>
                <button
                  onClick={() => handleRunQuery('Trigger n8n automated pipeline for proxy video ingestion')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                >
                  ⚡ n8n Webhook Dispatch
                </button>
              </div>

              {/* Input Bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunQuery()}
                  placeholder="Enter production query or intent (e.g., 'Check PBR leather aging for Kerma costumes')..."
                  className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleRunQuery()}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg flex items-center space-x-1.5 transition"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Route Intent</span>
                </button>
              </div>

              {/* Live Output */}
              {routingResult && (
                <div className="mt-6 p-4 rounded-lg bg-slate-950 border border-indigo-500/30">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold">
                        {routingResult.routing.targetUnitCode}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {routingResult.routing.unitName}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">
                      Confidence: {Math.round(routingResult.routing.confidence * 100)}%
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-slate-400 font-mono uppercase">Routing Reason:</span>
                      <p className="text-slate-300 mt-0.5">{routingResult.routing.reasoning}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-mono uppercase">Synthesis Summary:</span>
                      <p className="text-amber-300 font-medium mt-0.5">{routingResult.result.summary}</p>
                    </div>
                    {routingResult.result.details.length > 0 && (
                      <div>
                        <span className="text-slate-400 font-mono uppercase">Verified Evidence & Output:</span>
                        <ul className="mt-1 space-y-1 list-disc list-inside text-slate-300">
                          {routingResult.result.details.map((item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: CHARACTER & VISUAL DNA (KUSH ATLAS) */}
        {/* ============================================================== */}
        {activeTab === 'characters' && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-indigo-400" />
                    Kush Atlas: Character & Visual DNA Engine
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Anthropologically verified character profiles and multi-format generative prompt packs from `20_MASTER_CHARACTER_LIBRARY`.
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Gold Asset Tier
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Character Selector */}
              <div className="space-y-3">
                {characters.map((chr) => (
                  <div
                    key={chr.id}
                    onClick={() => setSelectedCharacter(chr)}
                    className={`p-4 rounded-xl cursor-pointer border transition ${
                      selectedCharacter.id === chr.id
                        ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-lg'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono text-amber-400 font-bold">{chr.code}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {chr.era}
                      </span>
                    </div>
                    <h3 className="font-bold text-base">{chr.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{chr.archetype}</p>
                  </div>
                ))}

                {/* Master Material Library Quick View */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mt-6">
                  <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-300 mb-2">
                    19_MASTER_MATERIAL_LIBRARY (PBR)
                  </h4>
                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span>MAT_0001_LEATHER</span>
                      <span className="text-slate-200">Vegetable-tanned Acacia</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span>MAT_0002_LINEN</span>
                      <span className="text-slate-200">Hand-spun Nile Flax</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span>MAT_0004_GOLD</span>
                      <span className="text-slate-200">Nubian Alluvial Electrum</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>MAT_0009_ACACIA_WOOD</span>
                      <span className="text-slate-200">Dense Desert Heartwood</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Character Details & Prompt Packs */}
              <div className="lg:col-span-2 space-y-6">
                {/* Visual DNA Breakdown */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div>
                      <span className="text-xs font-mono text-indigo-400 uppercase">{selectedCharacter.code}</span>
                      <h3 className="text-xl font-bold text-white mt-0.5">{selectedCharacter.name}</h3>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{selectedCharacter.archetype}</span>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-xs uppercase font-mono text-slate-400 mb-1">Forensic Anthropology</h5>
                    <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                      {selectedCharacter.forensicProfile}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/60">
                      <span className="text-slate-400 block font-mono">Hair & Grooming:</span>
                      <span className="text-slate-200 mt-1 block">{selectedCharacter.visualDna.hair}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/60">
                      <span className="text-slate-400 block font-mono">Eyes & Gaze:</span>
                      <span className="text-slate-200 mt-1 block">{selectedCharacter.visualDna.eyes}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/60">
                      <span className="text-slate-400 block font-mono">Costume & Armor:</span>
                      <span className="text-slate-200 mt-1 block">{selectedCharacter.visualDna.clothing}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/60">
                      <span className="text-slate-400 block font-mono">Ornaments & Regalia:</span>
                      <span className="text-slate-200 mt-1 block">{selectedCharacter.visualDna.ornaments}</span>
                    </div>
                  </div>
                </div>

                {/* Prompt Packs */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <h4 className="text-base font-bold text-white mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
                    Multi-Format Production Prompt Pack
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Standardized production prompt templates engineered for photorealistic, stylized 3D, AAA video game, and 2D concept workflows.
                  </p>

                  <div className="space-y-3">
                    {/* Photorealistic */}
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-bold text-indigo-400">01. PHOTOREALISTIC (CINEMATIC 8K)</span>
                        <button
                          onClick={() => copyToClipboard(selectedCharacter.promptPack.photorealistic, 'photo')}
                          className="text-xs font-mono flex items-center text-slate-400 hover:text-white transition"
                        >
                          {copiedPromptKey === 'photo' ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                          {copiedPromptKey === 'photo' ? 'Copied' : 'Copy Prompt'}
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 font-mono leading-relaxed">{selectedCharacter.promptPack.photorealistic}</p>
                    </div>

                    {/* Stylized Pixar */}
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-bold text-amber-400">02. STYLIZED 3D ANIMATION (PIXAR STYLE)</span>
                        <button
                          onClick={() => copyToClipboard(selectedCharacter.promptPack.stylizedPixar, 'pixar')}
                          className="text-xs font-mono flex items-center text-slate-400 hover:text-white transition"
                        >
                          {copiedPromptKey === 'pixar' ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                          {copiedPromptKey === 'pixar' ? 'Copied' : 'Copy Prompt'}
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 font-mono leading-relaxed">{selectedCharacter.promptPack.stylizedPixar}</p>
                    </div>

                    {/* AAA Game */}
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-bold text-emerald-400">03. AAA GAME ENGINE (UNREAL ENGINE 5 PBR)</span>
                        <button
                          onClick={() => copyToClipboard(selectedCharacter.promptPack.cinematicAaa, 'aaa')}
                          className="text-xs font-mono flex items-center text-slate-400 hover:text-white transition"
                        >
                          {copiedPromptKey === 'aaa' ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                          {copiedPromptKey === 'aaa' ? 'Copied' : 'Copy Prompt'}
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 font-mono leading-relaxed">{selectedCharacter.promptPack.cinematicAaa}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: VERTICAL SLICE & WORKFLOW ENGINE */}
        {/* ============================================================== */}
        {activeTab === 'workflow' && (
          <div className="space-y-6">
            {/* Vertical Slice Runner Card */}
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-indigo-400" />
                    Vertical Slice Execution Engine
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Validates end-to-end integration across Domain entities, Intelligence router, and automation webhook dispatches.
                  </p>
                </div>
                <button
                  disabled={isExecutingSlice}
                  onClick={handleExecuteVerticalSlice}
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center space-x-2 transition self-start sm:self-auto"
                >
                  <Play className="w-4 h-4" />
                  <span>{isExecutingSlice ? 'Executing Slice...' : 'Execute Vertical Slice'}</span>
                </button>
              </div>

              {/* Selector */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                {(['BREAKDOWN_SCRIPT', 'AUDIT_CHARACTER', 'REBALANCE_BUDGET', 'DISPATCH_AUTOMATION'] as const).map((action) => (
                  <button
                    key={action}
                    onClick={() => setSliceAction(action)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                      sliceAction === action
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </div>

              {/* Slice Result */}
              {sliceResult && (
                <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="text-xs font-mono font-bold text-white">Execution: {sliceResult.executionId}</span>
                    </div>
                    <span className="text-xs font-mono text-indigo-300">Latency: {sliceResult.durationMs}ms</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-mono uppercase block">Intelligence Unit:</span>
                      <p className="text-white mt-1 font-semibold">{sliceResult.intelligenceRouting.unit}</p>
                      <p className="text-slate-300 text-[11px] mt-0.5">{sliceResult.intelligenceRouting.summary}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-mono uppercase block">Domain Mutation:</span>
                      {sliceResult.domainMutations.map((m, i) => (
                        <div key={i} className="mt-1">
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[10px] mr-1">
                            {m.entityType}
                          </span>
                          <span className="text-slate-300 text-[11px]">{m.mutationSummary}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <span className="text-slate-400 font-mono uppercase block">Automation & Webhook:</span>
                      {sliceResult.n8nDispatches.map((d, i) => (
                        <div key={i} className="mt-1 flex items-center justify-between bg-slate-900 p-1.5 rounded">
                          <span className="font-mono text-indigo-300 text-[11px]">{d.workflowName}</span>
                          <span className="text-[10px] text-emerald-400 font-mono font-bold">{d.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Workflow Task Board */}
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center">
                  <Workflow className="w-4 h-4 mr-2 text-indigo-400" />
                  Active Production Workflows
                </h3>
                <span className="text-xs font-mono text-slate-400">{tasks.length} Tracked Tasks</span>
              </div>

              <div className="space-y-2.5">
                {tasks.map((task) => (
                  <div key={task.id} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          task.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                          task.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-slate-800 text-slate-300'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{task.division}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white">{task.title}</h4>
                      <p className="text-xs text-slate-400">Assigned: <span className="text-indigo-300 font-mono">{task.assignee}</span> • Due: {task.dueDate}</p>
                    </div>

                    <div className="flex items-center space-x-2 self-start sm:self-center">
                      <span className="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-slate-300">
                        {task.automationType}
                      </span>
                      <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${
                        task.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        task.status === 'IN_PROGRESS' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MCP Tool Catalog */}
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2 flex items-center">
                <Layers className="w-4 h-4 mr-2 text-indigo-400" />
                Model Context Protocol (MCP) Tool Endpoints
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Internal RPCs and external tool interfaces registered in `services/mcp/src/tool-catalog.md`.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-mono text-amber-400 font-bold block">kush_atlas_lookup</span>
                  <p className="text-slate-400 text-[11px] mt-1">Historical 2500–1500 BCE ontology queries</p>
                  <span className="text-[10px] font-mono text-emerald-400 mt-2 block">STATUS: ONLINE</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-mono text-indigo-400 font-bold block">n8n_trigger_workflow</span>
                  <p className="text-slate-400 text-[11px] mt-1">Webhook dispatcher for call-sheet automation</p>
                  <span className="text-[10px] font-mono text-emerald-400 mt-2 block">STATUS: ONLINE</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-mono text-indigo-400 font-bold block">production_budget_auditor</span>
                  <p className="text-slate-400 text-[11px] mt-1">CU_0002 threshold variance monitor</p>
                  <span className="text-[10px] font-mono text-emerald-400 mt-2 block">STATUS: ONLINE</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-mono text-indigo-400 font-bold block">shot_list_generator</span>
                  <p className="text-slate-400 text-[11px] mt-1">CU_0007 camera focal length calculator</p>
                  <span className="text-[10px] font-mono text-emerald-400 mt-2 block">STATUS: ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: DEEP RESEARCH & FOUNDATION REPORT */}
        {/* ============================================================== */}
        {activeTab === 'research' && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-400" />
                Industry Deep Research: Global Media Production Analysis
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Forensic synthesis of worldwide cinematic bottlenecks and the Seyofi Media OS architectural solution from `deep-research-report.md`.
              </p>
            </div>

            {/* Core Comparative Analysis Matrix */}
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
              <h3 className="text-base font-bold text-white mb-3">
                Platform Landscape: Seyofi vs. Existing Solutions
              </h3>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-2.5 px-3">Platform</th>
                    <th className="py-2.5 px-3">Key Capabilities</th>
                    <th className="py-2.5 px-3">Strengths</th>
                    <th className="py-2.5 px-3">Limitations</th>
                    <th className="py-2.5 px-3">Target Market</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="bg-indigo-950/20 font-semibold text-white">
                    <td className="py-3 px-3 font-bold text-indigo-400">Seyofi Media OS</td>
                    <td className="py-3 px-3">End-to-end production OS, AI scheduling, rights & IP, remote sync, predictive analytics</td>
                    <td className="py-3 px-3 text-emerald-400">Full lifecycle integration, autonomous cognitive units, Kush Atlas historical standard</td>
                    <td className="py-3 px-3 text-slate-400">Early rollout foundation phase</td>
                    <td className="py-3 px-3">Independent cinema, studios, co-productions</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-200">Yamdu</td>
                    <td className="py-3 px-3">Pre-production breakdown, call sheets, time tracking</td>
                    <td className="py-3 px-3">Clean pre-production UI, API integrations</td>
                    <td className="py-3 px-3 text-rose-400">Restricted to pre-production only</td>
                    <td className="py-3 px-3">Commercials, mid-sized TV</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-200">Entertainment Partners (EP)</td>
                    <td className="py-3 px-3">Movie Magic Scheduling & Budgeting, SyncOnSet</td>
                    <td className="py-3 px-3">Deep legacy studio trust, payroll compliance</td>
                    <td className="py-3 px-3 text-rose-400">Extremely expensive, siloed legacy software</td>
                    <td className="py-3 px-3">Hollywood major studios</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-200">Autodesk Flow</td>
                    <td className="py-3 px-3">ShotGrid asset tracking, media review, cloud VFX</td>
                    <td className="py-3 px-3">Native Maya & 3D software pipeline integration</td>
                    <td className="py-3 px-3 text-rose-400">Complex setup, steep learning curve</td>
                    <td className="py-3 px-3">VFX & Animation studios</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-200">StudioBinder</td>
                    <td className="py-3 px-3">Shot lists, script breakdowns, call sheets</td>
                    <td className="py-3 px-3">Intuitive web interface, low barrier to entry</td>
                    <td className="py-3 px-3 text-rose-400">No enterprise intelligence or real-time automation</td>
                    <td className="py-3 px-3">Indie shorts, film schools</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Strategic Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-indigo-400" />
                  Technical & Financial Problem Space
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Film production budgets are constrained by macroeconomic inflation and fragmented tools. Traditional productions lose 18–25% of operational efficiency due to disjointed call-sheet software, manual script breakdown, and delayed cost accounting. Seyofi Media OS resolves this via synchronous in-memory state, automated budget variance tracking (CU_0002), and AI script decomposition.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
                  Environmental Sustainability & Carbon Index
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Major productions generate up to 3,370 tonnes of CO2 equivalent per film. Seyofi integrates carbon accounting directly into location and logistics planning, allowing producers to cluster location days, minimize redundant diesel generator runs, and simulate remote review workflows via frame-accurate cloud review pipelines.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-4 px-6 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span>Seyofi Media OS</span>
          <span>•</span>
          <span>Execution Foundation v0.1</span>
          <span>•</span>
          <span className="text-indigo-400">BUILD → USE → LEARN → IMPROVE</span>
        </div>
        <div className="text-slate-400 text-[11px] font-mono">
          Container: Linux-x64 • Node 22 • Vite on port 3000 (0.0.0.0)
        </div>
      </footer>
    </div>
  );
}
