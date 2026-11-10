import React, { useState } from 'react';
import { 
  X, ExternalLink, Play, ArrowRight, 
  Cpu, Zap, Stethoscope, BarChart3, Copy, Check, Battery, Building, Plug, Server 
} from 'lucide-react';
import { 
  ProjectItem, 
  Language, 
  MedEvaluationInput, 
  BessSimulationInput, 
  CpmsTask,
  AidcSimulationInput,
  BatSohInput,
  CpemInput,
  BbemInput
} from '../types/index.ts';
import { 
  evaluateMedApplicant, 
  calculateBessSimulation, 
  calculateCpmsMetrics,
  calculateAidcSimulation,
  calculateBatSoh,
  calculateCpemLoad,
  calculateBbemEnergy
} from '../utils/projects.ts';

interface ProjectModalProps {
  project: ProjectItem | null;
  lang: Language;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, lang, onClose }) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'demo' | 'architecture' | 'access'>('demo');
  const [copied, setCopied] = useState(false);

  // --- 1. AIDC Simulator State ---
  const [aidcInput, setAidcInput] = useState<AidcSimulationInput>({
    gpuUtilizationPct: 85,
    ambientTempC: 26,
    rackPowerKw: 45,
  });
  const aidcResult = calculateAidcSimulation(aidcInput);

  // --- 2. EMS-BESS Simulator State ---
  const [bessInput, setBessInput] = useState<BessSimulationInput>({
    currentSoc: 65,
    capacityKwh: 500,
    chargeDischargeKw: -120,
    electricityPricePerKwh: 0.38,
  });
  const bessResult = calculateBessSimulation(bessInput);

  // --- 3. BBEM Simulator State ---
  const [bbemInput, setBbemInput] = useState<BbemInput>({
    occupancyPct: 75,
    pvSolarGenerationKw: 110,
    batteryDischargeKw: 60,
  });
  const bbemResult = calculateBbemEnergy(bbemInput);

  // --- 4. BAT-SOH Simulator State ---
  const [batSohInput, setBatSohInput] = useState<BatSohInput>({
    cycles: 1850,
    chargeCRate: 1.0,
    avgOperatingTempC: 32,
    dodPct: 80,
  });
  const batSohResult = calculateBatSoh(batSohInput);

  // --- 5. CPMS Simulator State ---
  const [tasks, setTasks] = useState<CpmsTask[]>([
    { id: '1', title: 'ML Pipeline Inference Optimization', stage: 'completed', priority: 'high', riskScore: 12, owner: 'George Z.' },
    { id: '2', title: 'Redis Distributed Lock Integration', stage: 'completed', priority: 'medium', riskScore: 18, owner: 'Backend' },
    { id: '3', title: 'Edge Modbus Telemetry Protocol Adapter', stage: 'in_progress', priority: 'critical', riskScore: 78, owner: 'IoT Team' },
    { id: '4', title: 'OAuth Role-Based Access Control Audit', stage: 'review', priority: 'medium', riskScore: 35, owner: 'SecOps' },
    { id: '5', title: 'Zero-Downtime Database Migration', stage: 'in_progress', priority: 'high', riskScore: 82, owner: 'DevOps' },
    { id: '6', title: 'Executive BI Analytics Dashboard', stage: 'backlog', priority: 'low', riskScore: 20, owner: 'Frontend' },
  ]);
  const cpmsMetrics = calculateCpmsMetrics(tasks);

  const toggleTaskStage = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextStage: CpmsTask['stage'] = 
          t.stage === 'backlog' ? 'in_progress' :
          t.stage === 'in_progress' ? 'review' :
          t.stage === 'review' ? 'completed' : 'backlog';
        return { ...t, stage: nextStage };
      }
      return t;
    }));
  };

  // --- 6. CPEM Simulator State ---
  const [cpemInput, setCpemInput] = useState<CpemInput>({
    concurrentEvs: 8,
    powerPerEvKw: 120,
    transformerCapacityKw: 800,
  });
  const cpemResult = calculateCpemLoad(cpemInput);

  // --- 7. MED Simulator State ---
  const [medInput, setMedInput] = useState<MedEvaluationInput>({
    gpa: 3.88,
    mcat: 516,
    clinicalHours: 350,
    researchPubs: 1,
  });
  const medResult = evaluateMedApplicant(medInput);

  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const clinicalCases = [
    {
      titleZh: '病例 1: 58岁男性急性压榨样胸痛',
      titleEn: 'Case 1: 58M with acute retrosternal pressure pain',
      symptoms: 'Substernal chest pain radiating to left arm, diaphoresis, dyspnea. BP 155/95, HR 102.',
      diffTop: 'Acute Coronary Syndrome (STEMI / NSTEMI)',
      diffProb: '86% Probable',
      pearlZh: '首要目标明确 ST 段抬高，若明确立即启动导管室行 PCI 介入。',
      pearlEn: 'Primary goal is immediate ST elevation exclusion. Trigger cath lab if positive within 90 min.'
    },
    {
      titleZh: '病例 2: 24岁女性反复低热伴淋巴结肿大',
      titleEn: 'Case 2: 24F with recurrent low-grade fever & cervical lymphadenopathy',
      symptoms: '3-week history of night sweats, persistent painless cervical node enlargement, malaise.',
      diffTop: 'Infectious Mononucleosis vs. Lymphoma (Hodgkin)',
      diffProb: '72% Top Differential',
      pearlZh: '青年人无痛性进行性增大淋巴结需警惕霍奇金淋巴瘤，避免单纯细针穿刺，需切除活检。',
      pearlEn: 'Persistent painless nodal enlargement in young adults warrants excisional biopsy over FNA.'
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(project.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto relative animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 flex items-start justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-xs">
              {project.iconEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {lang === 'zh' ? project.titleZh : project.title}
                </h3>
                <span className="px-2 py-0.5 rounded text-[9.5px] font-mono uppercase bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                  {project.categoryLabel}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                {lang === 'zh' ? project.subTitleZh : project.subTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 pt-2 border-b border-slate-200 flex items-center gap-4 bg-slate-50/40 text-xs font-medium">
          <button
            onClick={() => setActiveTab('demo')}
            className={`pb-2 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'demo'
                ? 'border-indigo-600 text-indigo-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>{lang === 'zh' ? '交互沙盒推演' : 'Interactive Sandbox'}</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`pb-2 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'architecture'
                ? 'border-indigo-600 text-indigo-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{lang === 'zh' ? '系统架构与亮点' : 'Architecture & Specs'}</span>
          </button>
          <button
            onClick={() => setActiveTab('access')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'access'
                ? 'border-indigo-600 text-indigo-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{lang === 'zh' ? '直接访问与集成' : 'Live System Access'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 max-h-[72vh] overflow-y-auto">
          
          {/* TAB 1: INTERACTIVE DEMO */}
          {activeTab === 'demo' && (
            <div className="space-y-6">
              
              {/* --- 1. AIDC SIMULATOR --- */}
              {project.id === 'aidc' && (
                <div className="space-y-6">
                  <div className="bg-cyan-50/70 border border-cyan-200 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-cyan-950 mb-1 flex items-center gap-2">
                      <Server className="w-4 h-4 text-cyan-600" />
                      <span>{lang === 'zh' ? 'AI 智算集群负载与 PUE 能效推演' : 'AI Cluster Compute Load & PUE Thermal Simulator'}</span>
                    </h4>
                    <p className="text-xs text-cyan-800/80 font-normal">
                      {lang === 'zh'
                        ? '调整 GPU 计算利用率、环境湿球温度及高密机柜功率，系统将计算冷板液冷制冷功率开销与即时 PUE 指数。'
                        : 'Adjust GPU workload, ambient temperature, and rack power to simulate liquid cooling overhead and real-time PUE.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">GPU Cluster Load</span>
                        <span className="font-mono font-bold text-cyan-700">{aidcInput.gpuUtilizationPct}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        step="5"
                        value={aidcInput.gpuUtilizationPct}
                        onChange={e => setAidcInput({ ...aidcInput, gpuUtilizationPct: parseInt(e.target.value) })}
                        className="w-full accent-cyan-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">{lang === 'zh' ? '室外湿球温度' : 'Ambient Temp'}</span>
                        <span className="font-mono font-bold text-cyan-700">{aidcInput.ambientTempC}°C</span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="40"
                        step="1"
                        value={aidcInput.ambientTempC}
                        onChange={e => setAidcInput({ ...aidcInput, ambientTempC: parseInt(e.target.value) })}
                        className="w-full accent-cyan-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">{lang === 'zh' ? '单机柜 IT 功率' : 'Rack IT Power'}</span>
                        <span className="font-mono font-bold text-cyan-700">{aidcInput.rackPowerKw} kW</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="80"
                        step="5"
                        value={aidcInput.rackPowerKw}
                        onChange={e => setAidcInput({ ...aidcInput, rackPowerKw: parseInt(e.target.value) })}
                        className="w-full accent-cyan-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-cyan-200 bg-cyan-50/40">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="text-slate-700 font-semibold">{lang === 'zh' ? '实时 PUE 能效比' : 'Real-Time Facility PUE'}</span>
                      <span className="font-mono text-2xl font-extrabold text-cyan-700">{aidcResult.pue}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-cyan-200/60 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '液冷制冷功率' : 'Cooling Overhead'}</span>
                        <span className="font-mono font-bold text-slate-900">{aidcResult.coolingPowerKw} kW</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '总设施耗电' : 'Total Facility Power'}</span>
                        <span className="font-mono font-bold text-slate-900">{aidcResult.totalFacilityPowerKw} kW</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '能效等级' : 'PUE Tier'}</span>
                        <span className="font-mono font-bold text-emerald-700">{aidcResult.efficiencyTier}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '热失控防降频' : 'Thermal Margin'}</span>
                        <span className="font-mono font-bold text-cyan-700">+14.2°C Buffer</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 2. EMS-BESS SIMULATOR --- */}
              {project.id === 'ems-bess' && (
                <div className="space-y-6">
                  <div className="bg-purple-50/70 border border-purple-200 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-purple-900 mb-1 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-600" />
                      <span>{lang === 'zh' ? '储能电网遥测与动态削峰套利模拟器' : 'Battery Energy Dispatch & Peak Shaving Simulator'}</span>
                    </h4>
                    <p className="text-xs text-purple-700/80 font-normal">
                      {lang === 'zh'
                        ? '调整电池荷电状态 (SoC)、充放电功率及实时电网电价，AI 调度算法将实时测算热转换效率与经济收益。'
                        : 'Adjust State of Charge, dispatch power, and grid tariff to evaluate round-trip efficiency and cost savings.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">Current SoC</span>
                        <span className="font-mono font-bold text-purple-700">{bessInput.currentSoc}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="95"
                        step="1"
                        value={bessInput.currentSoc}
                        onChange={e => setBessInput({ ...bessInput, currentSoc: parseInt(e.target.value) })}
                        className="w-full accent-purple-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">
                          {bessInput.chargeDischargeKw < 0 ? 'Discharging (放电)' : bessInput.chargeDischargeKw > 0 ? 'Charging (充电)' : 'Idle'}
                        </span>
                        <span className="font-mono font-bold text-purple-700">{bessInput.chargeDischargeKw} kW</span>
                      </div>
                      <input
                        type="range"
                        min="-200"
                        max="200"
                        step="10"
                        value={bessInput.chargeDischargeKw}
                        onChange={e => setBessInput({ ...bessInput, chargeDischargeKw: parseInt(e.target.value) })}
                        className="w-full accent-purple-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">{lang === 'zh' ? '电网电价' : 'Grid Tariff'}</span>
                        <span className="font-mono font-bold text-purple-700">${bessInput.electricityPricePerKwh.toFixed(2)}/kWh</span>
                      </div>
                      <input
                        type="range"
                        min="0.06"
                        max="0.50"
                        step="0.02"
                        value={bessInput.electricityPricePerKwh}
                        onChange={e => setBessInput({ ...bessInput, electricityPricePerKwh: parseFloat(e.target.value) })}
                        className="w-full accent-purple-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="text-slate-700 font-semibold">{lang === 'zh' ? '储能系统预测荷电量 (1小时后推演)' : 'Projected Battery State (1-Hour Horizon)'}</span>
                      <span className="font-mono font-bold text-purple-700">{bessResult.newSoc}% SoC</span>
                    </div>

                    <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300 relative">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
                        style={{ width: `${bessResult.newSoc}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-purple-200/60 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '吞吐能量' : 'Exchanged Energy'}</span>
                        <span className="text-sm font-bold font-mono text-slate-900">{bessResult.energyExchangedKwh} kWh</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '财务成本/收益' : 'Cost / Savings'}</span>
                        <span className={`text-sm font-bold font-mono ${bessResult.costImpactUsd < 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                          {bessResult.costImpactUsd < 0 ? `+ $${Math.abs(bessResult.costImpactUsd).toFixed(2)} (Earned)` : `- $${bessResult.costImpactUsd.toFixed(2)}`}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '综合换流效率' : 'Round-Trip Eff.'}</span>
                        <span className="text-sm font-bold font-mono text-purple-700">{bessResult.thermalEfficiencyPct}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '电芯健康预警' : 'Health SOH'}</span>
                        <span className="text-sm font-bold font-mono text-emerald-700">Optimal 99.4%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 3. BBEM SIMULATOR --- */}
              {project.id === 'bbem' && (
                <div className="space-y-6">
                  <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-amber-950 mb-1 flex items-center gap-2">
                      <Building className="w-4 h-4 text-amber-600" />
                      <span>{lang === 'zh' ? '建筑在席负荷与光储协同微网仿真' : 'Building Load & Solar-Storage Coordination Sandbox'}</span>
                    </h4>
                    <p className="text-xs text-amber-800/80 font-normal">
                      {lang === 'zh'
                        ? '调整建筑在席率、屋顶光伏发电量与储能放电功率，测算净下网电量与需量电费节省。'
                        : 'Adjust occupancy load, solar PV output, and battery dispatch to evaluate net grid import and demand charge shaving.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">Building Occupancy</span>
                        <span className="font-mono font-bold text-amber-700">{bbemInput.occupancyPct}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={bbemInput.occupancyPct}
                        onChange={e => setBbemInput({ ...bbemInput, occupancyPct: parseInt(e.target.value) })}
                        className="w-full accent-amber-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">Solar PV Output</span>
                        <span className="font-mono font-bold text-amber-700">{bbemInput.pvSolarGenerationKw} kW</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        step="10"
                        value={bbemInput.pvSolarGenerationKw}
                        onChange={e => setBbemInput({ ...bbemInput, pvSolarGenerationKw: parseInt(e.target.value) })}
                        className="w-full accent-amber-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">Battery Shaving Power</span>
                        <span className="font-mono font-bold text-amber-700">{bbemInput.batteryDischargeKw} kW</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="150"
                        step="10"
                        value={bbemInput.batteryDischargeKw}
                        onChange={e => setBbemInput({ ...bbemInput, batteryDischargeKw: parseInt(e.target.value) })}
                        className="w-full accent-amber-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '建筑实时总负荷' : 'Total Building Load'}</span>
                      <span className="font-mono font-bold text-slate-900">{bbemResult.baseBuildingLoadKw} kW</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '电网实际净买电' : 'Net Grid Import'}</span>
                      <span className="font-mono font-bold text-amber-700">{bbemResult.netGridImportKw} kW</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '清洁绿电占比' : 'Clean Power Share'}</span>
                      <span className="font-mono font-bold text-emerald-700">{bbemResult.cleanEnergyRatioPct}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '需量电费节省' : 'Demand Savings'}</span>
                      <span className="font-mono font-bold text-emerald-700">+ ${bbemResult.demandChargeSavingsUsd}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 4. BAT-SOH SIMULATOR --- */}
              {project.id === 'bat-soh' && (
                <div className="space-y-6">
                  <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-emerald-950 mb-1 flex items-center gap-2">
                      <Battery className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'zh' ? '电芯全生命周期老化与热失控风险预测' : 'Cell Degradation SOH & Thermal Safety Engine'}</span>
                    </h4>
                    <p className="text-xs text-emerald-800/80 font-normal">
                      {lang === 'zh'
                        ? '调整等效完整充放电循环次数、快充倍率及电芯平均工作温度，推演健康度 (SOH) 衰减与剩余使用循环。'
                        : 'Adjust equivalent cycles, C-rate, and operating temp to compute battery State-of-Health and safety margins.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">Cycles</span>
                        <span className="font-mono font-bold text-emerald-700">{batSohInput.cycles}</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="4000"
                        step="50"
                        value={batSohInput.cycles}
                        onChange={e => setBatSohInput({ ...batSohInput, cycles: parseInt(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">Charge C-Rate</span>
                        <span className="font-mono font-bold text-emerald-700">{batSohInput.chargeCRate}C</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="2.0"
                        step="0.1"
                        value={batSohInput.chargeCRate}
                        onChange={e => setBatSohInput({ ...batSohInput, chargeCRate: parseFloat(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">Avg Temp</span>
                        <span className="font-mono font-bold text-emerald-700">{batSohInput.avgOperatingTempC}°C</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="50"
                        step="1"
                        value={batSohInput.avgOperatingTempC}
                        onChange={e => setBatSohInput({ ...batSohInput, avgOperatingTempC: parseInt(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">Depth of Discharge</span>
                        <span className="font-mono font-bold text-emerald-700">{batSohInput.dodPct}%</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        step="5"
                        value={batSohInput.dodPct}
                        onChange={e => setBatSohInput({ ...batSohInput, dodPct: parseInt(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="text-slate-700 font-semibold">{lang === 'zh' ? '推演当前电芯健康度 SOH' : 'Calculated Battery Health (SOH)'}</span>
                      <span className="font-mono text-2xl font-extrabold text-emerald-700">{batSohResult.sohPct}%</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-emerald-200/60 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '直流等效内阻' : 'Internal Resistance'}</span>
                        <span className="font-mono font-bold text-slate-900">{batSohResult.internalResistanceMohm} mΩ</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '剩余可用循环寿命' : 'Remaining Useful Cycles'}</span>
                        <span className="font-mono font-bold text-emerald-700">{batSohResult.remainingUsefulCycles} Cycles</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '热失控安全等级' : 'Thermal Safety Tier'}</span>
                        <span className={`font-mono font-bold ${batSohResult.thermalRunawayRisk === 'Low' ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {batSohResult.thermalRunawayRisk}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 5. CPMS SIMULATOR --- */}
              {project.id === 'cpms' && (
                <div className="space-y-6">
                  <div className="bg-pink-50/70 border border-pink-200 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-pink-900 mb-1 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-pink-600" />
                      <span>{lang === 'zh' ? '敏捷交付风险雷达与工作流自动化' : 'Agile Sprint Risk Radar & Workflow Automation'}</span>
                    </h4>
                    <p className="text-xs text-pink-700/80 font-normal">
                      {lang === 'zh'
                        ? '点击下方任务卡片推进阶段，系统自动化算法将实时重构项目交付健康度与延期概率雷达。'
                        : 'Click any task to advance its stage. The heuristic risk engine recalculates delivery likelihood in real time.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '迭代完成度' : 'Sprint Progress'}</span>
                      <span className="text-lg font-bold font-mono text-pink-700">{cpmsMetrics.completionRate}%</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '加权风险指数' : 'Avg Risk Index'}</span>
                      <span className="text-lg font-bold font-mono text-slate-900">{cpmsMetrics.averageRiskScore} / 100</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '高风险阻塞项' : 'Critical Blockers'}</span>
                      <span className={`text-lg font-bold font-mono ${cpmsMetrics.highRiskCount > 0 ? 'text-amber-600' : 'text-emerald-700'}`}>
                        {cpmsMetrics.highRiskCount} Tasks
                      </span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '交付健康状态' : 'Sprint Health'}</span>
                      <span className={`text-sm font-bold font-mono mt-0.5 block ${
                        cpmsMetrics.healthStatus === 'HEALTHY' ? 'text-emerald-700' :
                        cpmsMetrics.healthStatus === 'MODERATE' ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {cpmsMetrics.healthStatus}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {tasks.map(t => (
                      <div
                        key={t.id}
                        onClick={() => toggleTaskStage(t.id)}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-pink-300 hover:bg-white cursor-pointer transition-all flex flex-col justify-between shadow-2xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-semibold text-slate-900 line-clamp-1">{t.title}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                            t.stage === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            t.stage === 'in_progress' ? 'bg-pink-50 text-pink-700 border border-pink-200' :
                            t.stage === 'review' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}>
                            {t.stage.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 font-medium">
                          <span>Owner: {t.owner}</span>
                          <span className="font-mono">Risk: {t.riskScore}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- 6. CPEM SIMULATOR --- */}
              {project.id === 'cpem' && (
                <div className="space-y-6">
                  <div className="bg-indigo-50/70 border border-indigo-200 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-indigo-950 mb-1 flex items-center gap-2">
                      <Plug className="w-4 h-4 text-indigo-600" />
                      <span>{lang === 'zh' ? '充电站群控功率调度与变压器防过载仿真' : 'EV Charging Group Control & Transformer Headroom Sandbox'}</span>
                    </h4>
                    <p className="text-xs text-indigo-800/80 font-normal">
                      {lang === 'zh'
                        ? '调整同时在充电动汽车数量、单枪需求功率及变电站容量上限，观测动态限流保护与群控均衡。'
                        : 'Adjust concurrent EVs, charging power demand, and transformer limit to simulate dynamic load sharing.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">Concurrent EVs Charging</span>
                        <span className="font-mono font-bold text-indigo-700">{cpemInput.concurrentEvs} Cars</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="20"
                        step="1"
                        value={cpemInput.concurrentEvs}
                        onChange={e => setCpemInput({ ...cpemInput, concurrentEvs: parseInt(e.target.value) })}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">Power per EV</span>
                        <span className="font-mono font-bold text-indigo-700">{cpemInput.powerPerEvKw} kW</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="240"
                        step="10"
                        value={cpemInput.powerPerEvKw}
                        onChange={e => setCpemInput({ ...cpemInput, powerPerEvKw: parseInt(e.target.value) })}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">Transformer Cap</span>
                        <span className="font-mono font-bold text-indigo-700">{cpemInput.transformerCapacityKw} kW</span>
                      </div>
                      <input
                        type="range"
                        min="400"
                        max="1200"
                        step="50"
                        value={cpemInput.transformerCapacityKw}
                        onChange={e => setCpemInput({ ...cpemInput, transformerCapacityKw: parseInt(e.target.value) })}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '总申请功率' : 'Total Requested'}</span>
                      <span className="font-mono font-bold text-slate-900">{cpemResult.totalRequestedKw} kW</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '实际安全分配' : 'Actual Delivered'}</span>
                      <span className="font-mono font-bold text-indigo-700">{cpemResult.actualDeliveredKw} kW</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '变压器负荷率' : 'Transformer Load'}</span>
                      <span className="font-mono font-bold text-emerald-700">{cpemResult.transformerLoadPct}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">{lang === 'zh' ? '安全调度状态' : 'Safety Status'}</span>
                      <span className="font-mono font-bold text-indigo-700">{cpemResult.safetyStatus}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 7. MED SIMULATOR --- */}
              {project.id === 'med' && (
                <div className="space-y-6">
                  <div className="bg-indigo-50/70 border border-indigo-200 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-indigo-900 mb-1 flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-indigo-600" />
                      <span>{lang === 'zh' ? '医学院申请竞争力量化诊断模型' : 'Admissions Competitiveness Predictive Engine'}</span>
                    </h4>
                    <p className="text-xs text-indigo-700/80 font-normal">
                      {lang === 'zh'
                        ? '调整下方参数，系统将基于全美医学院录取大数据与临床经历权重，实时计算录取指数梯队与靶向提升策略。'
                        : 'Adjust parameters below. The engine calculates target tier, admissions probability, and tailored focus areas.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">GPA (Grade Point Average)</span>
                        <span className="font-mono font-bold text-indigo-600">{medInput.gpa.toFixed(2)} / 4.00</span>
                      </div>
                      <input
                        type="range"
                        min="2.8"
                        max="4.0"
                        step="0.01"
                        value={medInput.gpa}
                        onChange={e => setMedInput({ ...medInput, gpa: parseFloat(e.target.value) })}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">MCAT Score (Total)</span>
                        <span className="font-mono font-bold text-indigo-600">{medInput.mcat} / 528</span>
                      </div>
                      <input
                        type="range"
                        min="490"
                        max="528"
                        step="1"
                        value={medInput.mcat}
                        onChange={e => setMedInput({ ...medInput, mcat: parseInt(e.target.value) })}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">{lang === 'zh' ? '直面临床实践工时' : 'Clinical Patient Hours'}</span>
                        <span className="font-mono font-bold text-indigo-600">{medInput.clinicalHours} hrs</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="800"
                        step="10"
                        value={medInput.clinicalHours}
                        onChange={e => setMedInput({ ...medInput, clinicalHours: parseInt(e.target.value) })}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700 font-medium">{lang === 'zh' ? '同行评审科研成果' : 'Research Publications'}</span>
                        <span className="font-mono font-bold text-indigo-600">{medInput.researchPubs} Papers</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        value={medInput.researchPubs}
                        onChange={e => setMedInput({ ...medInput, researchPubs: parseInt(e.target.value) })}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono font-semibold">{lang === 'zh' ? '综合录取竞争力指数' : 'Admissions Index'}</span>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-3xl font-extrabold font-mono text-indigo-700">{medResult.score}</span>
                          <span className="text-xs text-slate-500">/ 100</span>
                        </div>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono font-semibold">{lang === 'zh' ? '匹配梯队' : 'Evaluated Cohort'}</span>
                        <div className="text-sm font-bold text-emerald-700 mt-0.5">{lang === 'zh' ? medResult.tierZh : medResult.tier}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {lang === 'zh' ? '临床思维与鉴别诊断演练' : 'Clinical Reasoning Sandbox'}
                    </h5>
                    <div className="flex gap-2 mb-3">
                      {clinicalCases.map((c, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedCaseIdx(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                            selectedCaseIdx === idx ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                          }`}
                        >
                          {lang === 'zh' ? c.titleZh.split(':')[0] : c.titleEn.split(':')[0]}
                        </button>
                      ))}
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                      <div className="text-slate-900 font-bold">{lang === 'zh' ? clinicalCases[selectedCaseIdx].titleZh : clinicalCases[selectedCaseIdx].titleEn}</div>
                      <p className="text-slate-600 font-normal">{clinicalCases[selectedCaseIdx].symptoms}</p>
                      <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-center justify-between font-medium">
                        <span>Top Differential: <strong>{clinicalCases[selectedCaseIdx].diffTop}</strong></span>
                        <span className="font-mono text-emerald-700 font-bold">{clinicalCases[selectedCaseIdx].diffProb}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: ARCHITECTURE & SPECS */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  {lang === 'zh' ? '系统深度概览' : 'System Overview & Mission'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {lang === 'zh' ? project.fullOverviewZh : project.fullOverview}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">
                  {lang === 'zh' ? '核心架构亮点与算法引擎' : 'Core Architectural Innovations'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col shadow-2xs">
                      <span className="text-xs font-bold text-indigo-700 mb-1.5">
                        {lang === 'zh' ? h.titleZh : h.title}
                      </span>
                      <p className="text-xs text-slate-600 font-normal leading-relaxed">
                        {lang === 'zh' ? h.descZh : h.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  {lang === 'zh' ? '技术架构栈' : 'Technology Stack'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 border border-slate-200 text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  {lang === 'zh' ? '基准性能与可靠性指标' : 'Verified Production Metrics'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block truncate font-medium">
                        {lang === 'zh' ? m.labelZh : m.label}
                      </span>
                      <span className="text-sm font-bold font-mono text-slate-900 mt-0.5 block">
                        {m.value}
                      </span>
                      {m.change && (
                        <span className="text-[10px] font-mono text-emerald-700 font-semibold">{m.change}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DIRECT SYSTEM ACCESS */}
          {activeTab === 'access' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 mx-auto flex items-center justify-center text-3xl shadow-xs">
                {project.iconEmoji}
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">
                  {lang === 'zh' ? '访问生产环境系统' : 'Access Live Production System'}
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto font-normal">
                  {lang === 'zh'
                    ? `该系统已部署在 gz2ai.com 高可用云基础设施上，点击即可直达专属子域名。`
                    : `This platform is deployed and active on gz2ai.com high-availability infrastructure.`}
                </p>
              </div>

              <div className="max-w-md mx-auto bg-slate-100 border border-slate-200 p-2.5 rounded-xl flex items-center justify-between text-xs font-mono text-slate-800">
                <span className="truncate px-2 font-medium">{project.url}</span>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 shadow-2xs font-sans font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (lang === 'zh' ? '已复制' : 'Copied') : (lang === 'zh' ? '复制' : 'Copy')}</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>{lang === 'zh' ? '在新标签页打开系统' : 'Launch Live Web Portal'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href="https://gz2ai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 flex items-center justify-center gap-2 transition-all"
                >
                  <span>{lang === 'zh' ? '返回主门户 (gz2ai.com)' : 'Visit gz2ai.com Hub'}</span>
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Direct Endpoint: <code className="text-slate-800 font-semibold">{project.url}</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
          >
            {lang === 'zh' ? '关闭' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
