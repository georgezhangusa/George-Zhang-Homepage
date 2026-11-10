import React from 'react';
import { Cpu, Zap, Layers, Network } from 'lucide-react';
import { Language } from '../types/index.ts';

interface ArchitectureSectionProps {
  lang: Language;
}

export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({ lang }) => {
  const pillars = [
    {
      icon: Cpu,
      title: 'Neural Inference & Clinical NLP',
      titleZh: '神经网络推理与临床知识引擎',
      desc: 'Optimized transformer models tuned on biomedical text and decision trees with sub-200ms latency boundaries.',
      descZh: '针对生物医学语料与鉴别诊断逻辑微调的 Transformer 模型，保持低于 200ms 的严苛延迟边界。',
      stat: '< 180ms Latency',
      color: 'indigo'
    },
    {
      icon: Zap,
      title: 'High-Frequency IoT Telemetry Ingestion',
      titleZh: '高频工业物联网遥测流引擎',
      desc: 'Distributed streaming pipelines processing battery sensor matrices, cell voltages, and thermal vectors in real-time.',
      descZh: '高吞吐分布式流处理流水线，毫秒级解析电池阵列电压、充放电电流及温度矢量遥测数据。',
      stat: '250k events/sec',
      color: 'purple'
    },
    {
      icon: Layers,
      title: 'Automated Stage-Gate Pipeline Governance',
      titleZh: '全流程阶段门径与敏捷治理自动化',
      desc: 'Integrated heuristics evaluating task blockers, deployment velocity, and cross-functional dependency risk.',
      descZh: '全自动评估交付阻碍链、代码发布吞吐及跨职能依赖链，实现风险前置告警。',
      stat: 'Zero-Touch CI/CD',
      color: 'pink'
    }
  ];

  return (
    <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium mb-3 shadow-2xs">
          <Network className="w-3.5 h-3.5 text-indigo-600" />
          <span>{lang === 'zh' ? '底层架构基座' : 'Architecture Foundation'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          {lang === 'zh' ? '高可靠性 AI 软件工程生态' : 'High-Reliability AI System Infrastructure'}
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto font-normal">
          {lang === 'zh'
            ? '从医疗临床决策到清洁能源微电网，所有系统均依托统一的工业级工程规范与高并发基座。'
            : 'From clinical diagnostic reasoning to clean energy microgrid dispatch, all platforms share a rigorous architectural foundation.'}
        </p>
      </div>

      {/* Grid of 3 pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-slate-200/90 bg-white/80 hover:bg-white hover:border-indigo-200 shadow-xs hover:shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {lang === 'zh' ? p.titleZh : p.title}
                </h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed mb-4">
                  {lang === 'zh' ? p.descZh : p.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono font-medium">SPEC:</span>
                <span className="font-mono text-indigo-700 font-bold bg-indigo-50/80 px-2 py-0.5 rounded border border-indigo-100">{p.stat}</span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
