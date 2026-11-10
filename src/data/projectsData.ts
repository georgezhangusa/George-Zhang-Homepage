import { ProjectItem } from '../types/index.ts';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'med',
    title: 'Med Project',
    titleZh: 'Med 医疗与医学院申请智能引擎',
    subTitle: 'Medical Admissions & Diagnostic Decision Engine',
    subTitleZh: '医学院申请辅导与智能诊断引擎',
    description: 'Medical school admissions advising & clinical diagnostic engine, empowering every step of the healthcare journey.',
    descriptionZh: '医学院申请辅导与智能诊断引擎，深度赋能医学成长与临床推理的每一步。',
    fullOverview: 'Med Project combines large-scale clinical case graphs and predictive admissions analytics. It delivers comprehensive MCAT preparation pathways, student portfolio diagnostic scoring, and interactive clinical case differential diagnostics for trainees and applicants.',
    fullOverviewZh: 'Med Project 结合大规模临床知识图谱与医学院招生录取预测分析，为有志于医学的学生提供从 MCAT/GPA 综合背景诊断、文书与临床经历优化，到模拟临床鉴别诊断的全流程智能化辅助引擎。',
    category: 'healthcare',
    categoryLabel: 'Healthcare AI',
    categoryLabelZh: '医疗健康与教育',
    url: 'https://gz2ai.com/med',
    themeColor: 'indigo',
    accentHex: '#818cf8',
    glowColor: 'rgba(99, 102, 241, 0.35)',
    iconName: 'stethoscope',
    iconEmoji: '⚕️',
    tags: ['Clinical AI', 'Admissions Model', 'Knowledge Graph', 'Decision Support'],
    tagsZh: ['临床 AI', '医学院录取模型', '医学知识图谱', '决策辅助'],
    metrics: [
      { label: 'Evaluation Accuracy', labelZh: '评估匹配精准度', value: '98.4%', change: '+3.2%', isPositive: true },
      { label: 'Admissions Uplift', labelZh: '申请录取率提升', value: '4.6x', change: '+18%', isPositive: true },
      { label: 'Clinical Cases Curated', labelZh: '精选临床病例库', value: '1,200+', change: 'Verified', isPositive: true },
      { label: 'Average Response Time', labelZh: 'AI 推理响应时延', value: '< 180ms', change: '-45ms', isPositive: true },
    ],
    highlights: [
      {
        title: 'Admissions Competitiveness Scoring',
        titleZh: '医学院背景立体量化诊断',
        desc: 'Multi-parametric assessment correlating GPA, MCAT distributions, direct patient care hours, and research impact against top MD/DO cohorts.',
        descZh: '多维度量化评估 GPA、MCAT、直面患者临床护理小时数及学术发表，精准锚定全美医学院录取区间。'
      },
      {
        title: 'Differential Diagnostic Simulator',
        titleZh: '模拟临床鉴别诊断推演',
        desc: 'Interactive symptom triage with Bayesian risk calculation and clinical guideline citation support for medical student training.',
        descZh: '基于临床路径与贝叶斯推断的交互式病症推理，提供循证医学参考与个性化复习靶点。'
      },
      {
        title: 'Personal Statement & Secondary AI Reviewer',
        titleZh: '医学生陈述与 Secondary 专属润色',
        desc: 'Domain-trained reviewer ensuring clinical authenticity, emotional resonance, and alignment with AMCAS competencies.',
        descZh: '专为医学领域微调的文书质检系统，保障临床体验真实度与 AAMC 核心能力画像高度契合。'
      }
    ],
    techStack: ['PyTorch', 'Transformers', 'FastAPI', 'BioBERT', 'TypeScript', 'Next.js'],
    demoType: 'med'
  },
  {
    id: 'bess',
    title: 'BESS System',
    titleZh: 'BESS 智能储能与数据分析系统',
    subTitle: 'Battery Energy Storage & Grid Telemetry Intelligence',
    subTitleZh: '智能 AI 驱动的高性能储能与数据分析系统',
    description: 'Intelligent AI-driven software module delivering real-time telemetry, predictive analytics, and flexible energy dispatch.',
    descriptionZh: '智能 AI 驱动的高性能软件模块，实现精准灵活的数据分析、电网负荷调度与充放电优化。',
    fullOverview: 'BESS (Battery Energy Storage System) combines high-frequency industrial IoT ingestion with machine learning forecasting. It optimizes state-of-charge (SoC) management, detects battery cell degradation, and executes automated peak shaving electricity arbitrage.',
    fullOverviewZh: 'BESS 智能电池储能与数据分析系统将工业级高频物联网遥测采集与深度学习时序预测无缝结合，实现电池组荷电状态（SoC）超前预判、电芯健康度（SOH）主动预警及电力现货峰谷套利自动化调度。',
    category: 'energy',
    categoryLabel: 'CleanTech & Energy',
    categoryLabelZh: '新能源与工业智能',
    url: 'https://gz2ai.com/bess',
    themeColor: 'purple',
    accentHex: '#c084fc',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    iconName: 'zap',
    iconEmoji: '⚡',
    tags: ['Battery Storage', 'Time-Series AI', 'Peak Shaving', 'Grid Optimization'],
    tagsZh: ['电池储能', '时序预测 AI', '峰谷套利', '智能微电网'],
    metrics: [
      { label: 'Round-Trip Efficiency', labelZh: '系统充放电综合效率', value: '94.2%', change: '+1.8%', isPositive: true },
      { label: 'Peak Cost Reduction', labelZh: '峰段用电成本削减', value: '31.5%', change: '-$42k/mo', isPositive: true },
      { label: 'Telemetry Ingestion Rate', labelZh: '遥测数据吞吐峰值', value: '250k evt/s', change: 'Real-time', isPositive: true },
      { label: 'Cell Anomaly Detection', labelZh: '电芯异常检出率', value: '99.7%', change: 'Zero False', isPositive: true },
    ],
    highlights: [
      {
        title: 'Dynamic Peak Shaving Arbitrage',
        titleZh: '电力现货动态削峰填谷套利',
        desc: 'Autonomous algorithm optimizing charge cycles during low-tariff off-peak windows and discharging at peak utility grid demand.',
        descZh: '自适应算法在电价低谷时段蓄能，电网高峰高费率期柔性放电并网，实现经济效益最大化。'
      },
      {
        title: 'State-of-Health (SOH) Degradation Forecast',
        titleZh: '电芯健康寿命 (SOH) 衰减预测',
        desc: 'Physics-informed neural networks simulating electrochemical wear, cycle fatigue, and thermal runaway risks.',
        descZh: '融合电化学动力学与时序神经网络，精确推演电芯循环寿命与温控热失控隐患。'
      },
      {
        title: 'Microgrid Islanding & Load Balancing',
        titleZh: '微电网孤岛切换与自愈平衡',
        desc: 'Sub-cycle response times safeguarding mission-critical operations through automated renewable load redistribution.',
        descZh: '毫秒级孤岛保护响应与负载动态平衡，保障企业与算力中心不间断绿色供能。'
      }
    ],
    techStack: ['Python', 'TimescaleDB', 'MQTT / Modbus', 'TensorFlow', 'FastAPI', 'Grafana SDK'],
    demoType: 'bess'
  },
  {
    id: 'cpms',
    title: 'CPMS Portal',
    titleZh: 'CPMS 核心业务及精细化项目管理平台',
    subTitle: 'Enterprise Workflow & Predictive Project Intelligence',
    subTitleZh: '核心业务及项目精细化管理与流程自动化平台',
    description: 'Mission-critical operations and project management platform automating streamlined workflows and tracking execution velocity.',
    descriptionZh: '核心业务及项目精细化管理平台，全自动化流转与执行，AI 智能预测交付风险与资源分配。',
    fullOverview: 'CPMS (Core Project Management System) unifies cross-departmental operations, stage-gate governance, agile pipeline automation, and predictive delivery risk forecasting for complex enterprise software deliverables.',
    fullOverviewZh: 'CPMS 统一组织跨部门协作、阶段门径流程治理、敏捷迭代自动化与交付风险预测引擎，帮助技术与业务团队在复杂交付周期中保持毫秒级透明与高吞吐执行力。',
    category: 'enterprise',
    categoryLabel: 'Enterprise Systems',
    categoryLabelZh: '企业核心业务系统',
    url: 'https://gz2ai.com/cpms',
    themeColor: 'pink',
    accentHex: '#f472b6',
    glowColor: 'rgba(244, 114, 182, 0.35)',
    iconName: 'barChart',
    iconEmoji: '📊',
    tags: ['Workflow Engine', 'Sprint Automation', 'Risk Radar', 'Resource Allocation'],
    tagsZh: ['工作流引擎', '敏捷自动化', '风险雷达', '精细化资源调度'],
    metrics: [
      { label: 'Cycle Time Reduction', labelZh: '研发交付周期缩短', value: '-38%', change: 'Validated', isPositive: true },
      { label: 'Milestone On-Time Rate', labelZh: '关键里程碑达成率', value: '96.8%', change: '+14%', isPositive: true },
      { label: 'Automated Workflows', labelZh: '自动化流水线覆盖', value: '45+', change: 'End-to-End', isPositive: true },
      { label: 'Resource Utilization', labelZh: '跨项目资源利用率', value: '92.4%', change: '+9.1%', isPositive: true },
    ],
    highlights: [
      {
        title: 'Predictive Milestone Risk Detection',
        titleZh: '里程碑延期风险前置预警',
        desc: 'Machine learning heuristic correlating pull request velocity, blocker dependencies, and commit cadence to alert early.',
        descZh: '结合代码提交频率、依赖阻塞链与工时燃尽图，提前 7-14 天自动预警交付瓶颈。'
      },
      {
        title: 'Stage-Gate Governance & Compliance',
        titleZh: '阶段门径控制与合规审计链',
        desc: 'Automated compliance validations, electronic sign-offs, and immutable audit trails for mission-critical deliverables.',
        descZh: '自动化合规审查、电子签名凭证与不可篡改的操作审计日志，满足严苛业务标准。'
      },
      {
        title: 'Executive AI Status Synthesis',
        titleZh: 'AI 自动生成高管项目周报与洞察',
        desc: 'Synthesizes hundreds of daily task movements into concise bulleted executive briefings with key action items.',
        descZh: '智能聚合并提炼数百项任务动向，一键自动生成高管级进度简报与风险对策清单。'
      }
    ],
    techStack: ['Node.js', 'PostgreSQL', 'Docker', 'React 19', 'Tailwind CSS', 'Redis Queue'],
    demoType: 'cpms'
  }
];

export const FOUNDER_INFO = {
  name: 'George Zhang',
  role: 'AI Engineer & Software Architect',
  roleZh: '人工智能工程师 & 软件系统架构师',
  email: 'gzhang.v@gmail.com',
  domain: 'gz2ai.com',
  bio: 'Architecting high-concurrency intelligence systems across healthcare diagnostics, energy storage analytics, and mission-critical enterprise workflows.',
  bioZh: '深耕人工智能与高可靠软件系统架构，主导医疗鉴别诊断模型、新能源储能时序优化与企业级精细化项目运营平台的工程化落地。',
  skills: [
    'PyTorch / AI Modeling',
    'Full-Stack Architecture',
    'Real-time IoT Telemetry',
    'TypeScript / React',
    'FastAPI / Python Microservices',
    'Distributed Data Pipelines',
    'High-Availability Systems'
  ],
  systemStats: {
    totalActivePipelines: '14 Active',
    globalTelemetryUptime: '99.98%',
    totalModelsDeployed: '9 Production Models',
    apiAvgLatency: '42ms'
  }
};
