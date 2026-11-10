import React, { useState } from 'react';
import { 
  X, ExternalLink, Play, CheckCircle2, AlertTriangle, ArrowRight, 
  Cpu, Activity, Zap, Stethoscope, BarChart3, RefreshCw, Copy, Check 
} from 'lucide-react';
import { 
  ProjectItem, 
  Language, 
  MedEvaluationInput, 
  BessSimulationInput, 
  CpmsTask 
} from '../types/index.ts';
import { 
  evaluateMedApplicant, 
  calculateBessSimulation, 
  calculateCpmsMetrics 
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

  // --- MED Simulator State ---
  const [medInput, setMedInput] = useState<MedEvaluationInput>({
    gpa: 3.88,
    mcat: 516,
    clinicalHours: 350,
    researchPubs: 1,
  });
  const medResult = evaluateMedApplicant(medInput);

  // Clinical Case presets for Med
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const clinicalCases = [
    {
      titleZh: '病例 1: 58岁男性急性压榨样胸痛',
      titleEn: 'Case 1: 58M with acute retrosternal pressure pain',
      symptoms: 'Substernal chest pain radiating to left arm, diaphoresis, dyspnea. BP 155/95, HR 102.',
      diffTop: 'Acute Coronary Syndrome (STEMI / NSTEMI)',
      diffProb: '86% Probable',
      tests: ['Stat 12-lead ECG within 10min', 'Serial high-sensitivity Troponin I', 'Bedside Echo'],
      pearlZh: '首要目标明确 ST 段抬高，若明确立即启动导管室行 PCI 介入。',
      pearlEn: 'Primary goal is immediate ST elevation exclusion. Trigger cath lab if positive within 90 min.'
    },
    {
      titleZh: '病例 2: 24岁女性反复低热伴淋巴结肿大',
      titleEn: 'Case 2: 24F with recurrent low-grade fever & cervical lymphadenopathy',
      symptoms: '3-week history of night sweats, persistent painless cervical node enlargement, malaise.',
      diffTop: 'Infectious Mononucleosis vs. Lymphoma (Hodgkin)',
      diffProb: '72% Top Differential',
      tests: ['Heterophile antibody test (Monospot)', 'EBV viral capsid IgM/IgG', 'Excisional node biopsy if >4 wks'],
      pearlZh: '青年人无痛性进行性增大淋巴结需警惕霍奇金淋巴瘤，避免单纯细针穿刺，需切除活检。',
      pearlEn: 'Persistent painless nodal enlargement in young adults warrants excisional biopsy over FNA.'
    }
  ];

  // --- BESS Simulator State ---
  const [bessInput, setBessInput] = useState<BessSimulationInput>({
    currentSoc: 65,
    capacityKwh: 500,
    chargeDischargeKw: -120, // Discharging 120 kW during peak
    electricityPricePerKwh: 0.38,
  });
  const bessResult = calculateBessSimulation(bessInput);

  // --- CPMS Simulator State ---
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
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50/70">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-xs">
              {project.iconEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {lang === 'zh' ? project.titleZh : project.title}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                  {project.categoryLabel}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {lang === 'zh' ? project.subTitleZh : project.subTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-slate-200 flex items-center gap-4 bg-slate-50/40 text-xs font-medium">
          <button
            onClick={() => setActiveTab('demo')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
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
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
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
              
              {/* --- MED PROJECT INTERACTIVE SIMULATION --- */}
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

                  {/* Sliders Grid */}
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
                        <span className="text-slate-700 font-medium">
                          {lang === 'zh' ? '直面临床患者实践工时' : 'Clinical Direct Patient Hours'}
                        </span>
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
                        <span className="text-slate-700 font-medium">
                          {lang === 'zh' ? '学术论文/同行评审成果' : 'Peer-Reviewed Research Pubs'}
                        </span>
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

                  {/* Calculated Output Card */}
                  <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono font-semibold">
                          {lang === 'zh' ? '综合录取竞争力指数' : 'Admissions Index'}
                        </span>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-3xl font-extrabold font-mono text-indigo-700">
                            {medResult.score}
                          </span>
                          <span className="text-xs text-slate-500">/ 100</span>
                        </div>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono font-semibold">
                          {lang === 'zh' ? '匹配梯队' : 'Evaluated Cohort'}
                        </span>
                        <div className="text-sm font-bold text-emerald-700 mt-0.5">
                          {lang === 'zh' ? medResult.tierZh : medResult.tier}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-indigo-200/60 pt-3 space-y-2 text-xs">
                      <div>
                        <span className="text-slate-600 font-semibold">
                          {lang === 'zh' ? '优势特征: ' : 'Key Identified Strengths: '}
                        </span>
                        <span className="text-slate-800">
                          {lang === 'zh' ? medResult.keyStrengthsZh.join(' • ') : medResult.keyStrengths.join(' • ')}
                        </span>
                      </div>
                      <div>
                        <span className="text-indigo-700 font-semibold">
                          {lang === 'zh' ? 'AI 策略建议: ' : 'Recommended Focus Area: '}
                        </span>
                        <span className="text-slate-800">
                          {lang === 'zh' ? medResult.recommendedFocusZh : medResult.recommendedFocus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Case reasoning section */}
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
                            selectedCaseIdx === idx
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                          }`}
                        >
                          {lang === 'zh' ? c.titleZh.split(':')[0] : c.titleEn.split(':')[0]}
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2.5">
                      <div className="text-slate-900 font-bold">
                        {lang === 'zh' ? clinicalCases[selectedCaseIdx].titleZh : clinicalCases[selectedCaseIdx].titleEn}
                      </div>
                      <p className="text-slate-600 font-normal">
                        {clinicalCases[selectedCaseIdx].symptoms}
                      </p>
                      <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-center justify-between font-medium">
                        <span>Top Differential: <strong>{clinicalCases[selectedCaseIdx].diffTop}</strong></span>
                        <span className="font-mono text-emerald-700 font-bold">{clinicalCases[selectedCaseIdx].diffProb}</span>
                      </div>
                      <div className="text-slate-600 text-[11px]">
                        <strong className="text-slate-800">Clinical Pearl: </strong>
                        {lang === 'zh' ? clinicalCases[selectedCaseIdx].pearlZh : clinicalCases[selectedCaseIdx].pearlEn}
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* --- BESS SYSTEM INTERACTIVE SIMULATION --- */}
              {project.id === 'bess' && (
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

                  {/* Sliders Grid */}
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
                        <span className="text-slate-700 font-medium">
                          {lang === 'zh' ? '电网电价' : 'Grid Tariff'}
                        </span>
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

                  {/* Battery Visual Gauge */}
                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="text-slate-700 font-semibold">
                        {lang === 'zh' ? '储能系统预测荷电量 (1小时后推演)' : 'Projected Battery State (1-Hour Horizon)'}
                      </span>
                      <span className="font-mono font-bold text-purple-700">{bessResult.newSoc}% SoC</span>
                    </div>

                    {/* Battery Bar */}
                    <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300 relative">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
                        style={{ width: `${bessResult.newSoc}%` }}
                      />
                    </div>

                    {/* Calculated Metrics row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-purple-200/60">
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">
                          {lang === 'zh' ? '吞吐能量' : 'Exchanged Energy'}
                        </span>
                        <span className="text-sm font-bold font-mono text-slate-900">
                          {bessResult.energyExchangedKwh} kWh
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">
                          {lang === 'zh' ? '财务成本/收益' : 'Cost / Savings'}
                        </span>
                        <span className={`text-sm font-bold font-mono ${bessResult.costImpactUsd < 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                          {bessResult.costImpactUsd < 0 
                            ? `+ $${Math.abs(bessResult.costImpactUsd).toFixed(2)} (Earned)`
                            : `- $${bessResult.costImpactUsd.toFixed(2)}`}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">
                          {lang === 'zh' ? '综合换流效率' : 'Round-Trip Eff.'}
                        </span>
                        <span className="text-sm font-bold font-mono text-purple-700">
                          {bessResult.thermalEfficiencyPct}%
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">
                          {lang === 'zh' ? '电芯健康预警' : 'Health SOH'}
                        </span>
                        <span className="text-sm font-bold font-mono text-emerald-700">
                          Optimal 99.4%
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 text-xs bg-white p-2.5 rounded-lg border border-purple-200 text-purple-900 shadow-2xs font-medium">
                      <strong className="text-purple-950">AI Dispatch Policy: </strong>
                      <span>{lang === 'zh' ? bessResult.recommendationZh : bessResult.recommendation}</span>
                    </div>

                  </div>

                </div>
              )}

              {/* --- CPMS PORTAL INTERACTIVE SIMULATION --- */}
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

                  {/* Metrics bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block font-medium">
                        {lang === 'zh' ? '迭代完成度' : 'Sprint Progress'}
                      </span>
                      <span className="text-lg font-bold font-mono text-pink-700">{cpmsMetrics.completionRate}%</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block font-medium">
                        {lang === 'zh' ? '加权风险指数' : 'Avg Risk Index'}
                      </span>
                      <span className="text-lg font-bold font-mono text-slate-900">{cpmsMetrics.averageRiskScore} / 100</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block font-medium">
                        {lang === 'zh' ? '高风险阻塞项' : 'Critical Blockers'}
                      </span>
                      <span className={`text-lg font-bold font-mono ${cpmsMetrics.highRiskCount > 0 ? 'text-amber-600' : 'text-emerald-700'}`}>
                        {cpmsMetrics.highRiskCount} Tasks
                      </span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block font-medium">
                        {lang === 'zh' ? '交付健康状态' : 'Sprint Health'}
                      </span>
                      <span className={`text-sm font-bold font-mono mt-0.5 block ${
                        cpmsMetrics.healthStatus === 'HEALTHY' ? 'text-emerald-700' :
                        cpmsMetrics.healthStatus === 'MODERATE' ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {cpmsMetrics.healthStatus}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Task Cards */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        {lang === 'zh' ? '当前冲刺执行流水线 (点击切换状态)' : 'Active Sprint Pipeline (Click to advance stage)'}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {cpmsMetrics.completedTasks} of {cpmsMetrics.totalTasks} Done
                      </span>
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

                  {/* AI Status summary banner */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-pink-700 block mb-1">
                      {lang === 'zh' ? 'AI 自动化状态综述: ' : 'AI Executive Status Synthesis: '}
                    </span>
                    <span>{lang === 'zh' ? cpmsMetrics.healthStatusZh : 'Sprint execution velocity tracks within nominal target variance.'}</span>
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

              {/* Technical Highlights list */}
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

              {/* Tech Stack Matrix */}
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

              {/* Performance Metrics Table */}
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
                    ? `该系统已部署在 gz2ai.com 高可用云基础设施上，点击即可直达。`
                    : `This platform is deployed and active on gz2ai.com high-availability infrastructure.`}
                </p>
              </div>

              {/* URL Display Box */}
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

              {/* Action Buttons */}
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
