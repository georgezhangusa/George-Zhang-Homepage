import { ProjectItem } from '../types/index.ts';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'aidc',
    title: 'AIDC Design Studio',
    titleZh: 'AIDC 智算中心基础设施设计平台',
    subTitle: 'AI Data Center Infrastructure & Thermal Design Studio',
    subTitleZh: 'AI 智算集群能效优化与液冷温控设计平台',
    description: 'High-density AI data center infrastructure design suite that optimizes GPU compute loads, power usage effectiveness (PUE), liquid cooling loops, and power distribution.',
    descriptionZh: '高密度 AI 算力中心智能基础设施设计平台，动态优化集群算力负载、PUE 能效比、冷板液冷散热与电力分配调度。',
    fullOverview: 'AIDC (AI Data Center Management) unifies server cluster telemetry, rack thermal profiling, dynamic liquid cooling loops, and intelligent power distribution. It maintains sub-1.20 PUE even under sustained high-wattage LLM training runs.',
    fullOverviewZh: 'AIDC 智算基础设施管理平台深度集成服务器集群遥测、机柜热力拓扑建模、动态冷板液冷闭环调控及智能配电单元，在千卡/万卡大模型高负载持续训练下将 PUE 稳定控制在 1.20 以下。',
    category: 'enterprise',
    categoryLabel: 'AI Data Center',
    categoryLabelZh: '智算中心与基础设施',
    url: 'https://aidc.gz2ai.com/',
    themeColor: 'cyan',
    accentHex: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    iconName: 'server',
    iconEmoji: '🖥️',
    tags: ['GPU Compute', 'PUE Optimization', 'Liquid Cooling', 'Cluster Telemetry'],
    tagsZh: ['GPU 算力集群', 'PUE 能效优化', '冷板液冷', '高密机柜遥测'],
    metrics: [
      { label: 'Average PUE', labelZh: '年均运行 PUE', value: '1.18', change: 'Tier 1', isPositive: true },
      { label: 'Thermal Throttling Prevention', labelZh: '热降频零发生率', value: '99.9%', change: 'Zero Fail', isPositive: true },
      { label: 'Cooling Power Saved', labelZh: '制冷综合节电率', value: '24.6%', change: '+4.2%', isPositive: true },
      { label: 'Cluster Telemetry Rate', labelZh: '遥测吞吐能力', value: '300k/s', change: 'Sub-second', isPositive: true },
    ],
    highlights: [
      {
        title: 'Dynamic Liquid Cooling Loop Regulation',
        titleZh: '冷板液冷动态变流量精准温控',
        desc: 'Autonomous PID & neural valve control adjusting coolant flow based on per-GPU power telemetry to eliminate hotspots.',
        descZh: '基于单卡功率遥测自适应调节冷却液流量与进出水温差，彻底消除局部热点，延长硬件服役寿命。'
      },
      {
        title: 'Rack-Level PUE Optimization Model',
        titleZh: '机柜级微拓扑 PUE 实时建模',
        desc: 'Continuously balances computing workloads against available chiller capacity to maximize throughput per watt.',
        descZh: '结合室外湿球温度与冷水机组实时性能系数 (COP)，动态微调算力作业调度以最大化单位瓦特算力产出。'
      },
      {
        title: 'Thermal Anomaly Early Warning',
        titleZh: '微漏液与气阻异常前置预警',
        desc: 'Detects micro-leaks, pump cavitation, and coolant degradation before thermal runaway limits cluster jobs.',
        descZh: '微渗漏感应与泵组气蚀声学诊断，提前预防管路气阻与冷却剂劣化，杜绝非计划停机。'
      }
    ],
    techStack: ['Python', 'FastAPI', 'Prometheus', 'TimescaleDB', 'Docker', 'React 19'],
    demoType: 'aidc'
  },
  {
    id: 'ems-bess',
    title: 'EMS for BESS',
    titleZh: '商用电池储能智能能量管理系统（EMS）',
    subTitle: 'Industrial Energy Management & Grid Telemetry Intelligence',
    subTitleZh: '工业级电池储能能量管理与毫秒级电网响应平台',
    description: 'Industrial Energy Management System (EMS) delivering autonomous grid telemetry, peak-shaving arbitrage, microgrid frequency regulation, and multi-cabinet SoC balancing.',
    descriptionZh: '工业级电池储能能量管理系统 (EMS)，实现毫秒级电网遥测响应、现货峰谷套利、微电网调频调峰与多簇电芯主动均衡。',
    fullOverview: 'EMS-BESS operates as the central nervous system for utility-scale and commercial energy storage assets. It coordinates battery management systems (BMS), power conversion systems (PCS), and market spot price feeds for maximum revenue generation and asset protection.',
    fullOverviewZh: 'EMS-BESS 作为电网侧与工商业储能资产的智能决策中枢，统一协调电池管理系统 (BMS)、储能变流器 (PCS) 与电力现货交易信号，实现经济收益与电池物理资产安全的最优平衡。',
    category: 'energy',
    categoryLabel: 'CleanTech & Energy',
    categoryLabelZh: '储能与清洁能源',
    url: 'https://ems-bess.gz2ai.com/',
    themeColor: 'purple',
    accentHex: '#c084fc',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    iconName: 'zap',
    iconEmoji: '⚡',
    tags: ['Battery Storage', 'Peak Shaving', 'Grid Arbitrage', 'Multi-Cabinet SoC'],
    tagsZh: ['电池储能', '削峰填谷', '电力现货套利', '多簇主动均衡'],
    metrics: [
      { label: 'Round-Trip Efficiency', labelZh: '系统充放电综合效率', value: '94.6%', change: '+1.8%', isPositive: true },
      { label: 'Peak Cost Reduction', labelZh: '峰段用电成本削减', value: '31.5%', change: '-$42k/mo', isPositive: true },
      { label: 'Response Latency', labelZh: '毫秒级响应时延', value: '< 20ms', change: 'High Precision', isPositive: true },
      { label: 'Asset Availability', labelZh: '系统常年可用率', value: '99.99%', change: 'Carrier-Grade', isPositive: true },
    ],
    highlights: [
      {
        title: 'Dynamic Peak Shaving Arbitrage',
        titleZh: '电力现货自适应削峰填谷套利',
        desc: 'Autonomous algorithm optimizing charge cycles during low-tariff off-peak windows and discharging at peak utility grid demand.',
        descZh: '在电价低谷时段蓄能，电网高峰高费率期柔性放电并网，实现经济效益最大化。'
      },
      {
        title: 'Multi-Cabinet Active Balancing',
        titleZh: '多电池簇主动均衡与温升均衡',
        desc: 'Intelligently mitigates barrel effects across heterogeneous battery racks to unlock maximum usable capacity.',
        descZh: '智能消除不同电池簇因内阻差异导致的木桶效应，最大化释放储能电站可充放电容量。'
      },
      {
        title: 'Sub-Cycle Microgrid Islanding',
        titleZh: '毫秒级孤岛保护与无缝切换',
        desc: 'Fast frequency response and zero-crossing detection enabling seamless microgrid backup switchovers.',
        descZh: '具备快速一次调频与过零检测能力，在主电网断电瞬间实现微电网无缝并离网切换。'
      }
    ],
    techStack: ['Python', 'MQTT / Modbus', 'TensorFlow', 'TimescaleDB', 'FastAPI', 'Grafana SDK'],
    demoType: 'ems-bess'
  },
  {
    id: 'bbem',
    title: 'DePIN & VDR Energy Platform',
    titleZh: '区块链综合能源盈利模型',
    subTitle: 'Blockchain-Based Energy Monetization Platform',
    subTitleZh: '楼宇建筑与分布式电池一体化能源综合管控平台',
    description: 'Blockchain-based energy monetization models that enable energy arbitrage using PV solar generation, battery storage systems (BESS), and vehicle-to-grid (V2G) technology as a Virtual Power Plant (VPP).',
    descriptionZh: '基于区块链的分布式综合能源管理系统，协调分布式光伏消纳与储能及电动车电池充放协同。',
    fullOverview: 'Blockchain-Based building automation systems with localized battery energy storage and solar photovoltaics. It provides holistic energy orchestration, demand charge reduction, dynamic HVAC load shedding, and optimal carbon footprint minimization.',
    fullOverviewZh: 'BBEM 将楼宇自动化自控系统 (BAS) 与分布式储能、屋顶分布式光伏深度耦合，通过负荷预测与储能充放电协同，有效抑制建筑最大需量电费，促进清洁绿电就地 100% 消纳。',
    category: 'energy',
    categoryLabel: 'CleanTech & Energy',
    categoryLabelZh: '储能与清洁能源',
    url: 'https://bbem.gz2ai.com/',
    themeColor: 'amber',
    accentHex: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    iconName: 'building',
    iconEmoji: '🏢',
    tags: ['Smart Building', 'Solar PV', 'Demand Response', 'Carbon Reduction'],
    tagsZh: ['智慧建筑', '光储充一体', '需求侧响应', '碳排前置管控'],
    metrics: [
      { label: 'HVAC Energy Saved', labelZh: '暖通综合节能率', value: '24.8%', change: '+3.1%', isPositive: true },
      { label: 'Solar Self-Consumption', labelZh: '绿电就地消纳率', value: '91.2%', change: 'Optimal', isPositive: true },
      { label: 'Demand Charge Savings', labelZh: '需量电费月降幅', value: '-$18.4k', change: 'Monthly', isPositive: true },
      { label: 'Carbon Intensity Offset', labelZh: '碳排放强度降低', value: '-34.2%', change: 'Certified', isPositive: true },
    ],
    highlights: [
      {
        title: 'Occupancy-Aware HVAC Pre-Cooling',
        titleZh: '基于在席率与热惯性的预冷预热',
        desc: 'Utilizes building thermal inertia and weather forecasting to shift energy demand away from peak tariff windows.',
        descZh: '利用建筑围护结构储热特性与人员在席感知，在低谷电价期提前预冷预热，避开尖峰用电时段。'
      },
      {
        title: 'Solar PV-Storage Harmonization',
        titleZh: '光储协同平滑弃光反送',
        desc: 'Absorbs transient solar fluctuations locally to avoid grid reverse-power curtailment and voltage violations.',
        descZh: '就地平抑屋顶光伏间歇性出力波动，防止电网反向送电罚款与母线过电压冲击。'
      },
      {
        title: 'Automated Demand Response Events',
        titleZh: '电网需求响应事件全自动调度',
        desc: 'Responds to grid curtailment signals within seconds, earning capacity incentive revenue without impacting tenant comfort.',
        descZh: '秒级响应电网需求响应邀约指令，在确保室内体感舒适度前提下赢取丰厚辅助服务补贴。'
      }
    ],
    techStack: ['Node.js', 'BACnet / Modbus', 'TypeScript', 'PostgreSQL', 'Chart.js', 'Tailwind CSS'],
    demoType: 'bbem'
  },
  {
    id: 'bat-soh',
    title: 'BAT-SoH Engine',
    titleZh: '电芯健康度与全生命周期预测引擎',
    subTitle: 'Physics-Informed Battery Degradation & Thermal Safety prediction by AI ',
    subTitleZh: '基于机理与深度学习的电芯健康度及热失控AI预测引擎',
    description: 'Electrochemical and physics-informed neural network evaluating cell internal impedance, cycle fatigue degradation, capacity fade, and thermal runaway precursor anomalies.',
    descriptionZh: '融合电化学动力学与时序神经网络，实时量化电芯等效内阻、循环老化寿命衰减、可用容量衰减及早期热失控前兆异常。',
    fullOverview: 'BAT-SOH integrates electrochemical mechanism models with fleet-wide field sensor data. It predicts remaining useful life (RUL), detects lithium plating anomalies during fast-charging, and provides early warnings for battery thermal runaway 15 minutes before critical failure thresholds.',
    fullOverviewZh: 'BAT-SOH 将电化学机理建模与工业现场全域传感器时序结合，精准推演电芯全生命周期健康状态 (SOH) 与剩余循环寿命 (RUL)，实时检出快充析锂等微观隐患，提前 15 分钟发出热失控风险预警。',
    category: 'energy',
    categoryLabel: 'Battery AI & Safety',
    categoryLabelZh: '电池安全与 AI 预测',
    url: 'https://bat-soh.gz2ai.com/',
    themeColor: 'emerald',
    accentHex: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    iconName: 'battery',
    iconEmoji: '🔋',
    tags: ['Electrochemical AI', 'SOH Prediction', 'Thermal Safety', 'Remaining Life RUL'],
    tagsZh: ['电化学 AI', 'SOH 衰减预测', '热失控预警', '剩余寿命 RUL'],
    metrics: [
      { label: 'SOH Estimation Error', labelZh: '健康度评估误差', value: '< 1.2%', change: 'RMSE', isPositive: true },
      { label: 'Early Warning Horizon', labelZh: '热失控前置告警窗口', value: '15 Mins', change: 'Ahead', isPositive: true },
      { label: 'RUL Prediction Accuracy', labelZh: '剩余循环预测精度', value: '97.8%', change: '+3.4%', isPositive: true },
      { label: 'Battery Life Extension', labelZh: '策略延寿幅度', value: '+18.5%', change: 'Validated', isPositive: true },
    ],
    highlights: [
      {
        title: 'Physics-Informed Neural Network (PINN)',
        titleZh: '物理机理约束神经网络 (PINN)',
        desc: 'Constrains black-box deep learning models with electrochemical Arrhenius and Butler-Volmer kinetic laws.',
        descZh: '以阿伦尼乌斯老化模型与电极动力学机理约束深度学习时序，杜绝数据外推失真，泛化精度卓越。'
      },
      {
        title: 'Lithium Plating Detection Under Fast Charge',
        titleZh: '大倍率快充析锂无损无感在线检出',
        desc: 'Identifies negative electrode overpotential transitions and relaxation voltage rebound signatures in real time.',
        descZh: '通过负极过电位演变与弛豫电压回弹特征，实时诊断电芯内部析锂隐患，防止枝晶穿刺短路。'
      },
      {
        title: 'Fleet Health Variance Clustering',
        titleZh: '电站级多并联组电芯离散度聚类',
        desc: 'Flags micro-short circuits and self-discharge anomalies by tracking voltage divergence across millions of cells.',
        descZh: '监控数百万只电芯的电压与温度离散度，毫秒级定位异常自放电单体，精准指示运维更换靶点。'
      }
    ],
    techStack: ['PyTorch', 'NumPy / SciPy', 'FastAPI', 'TimescaleDB', 'Docker', 'Python'],
    demoType: 'bat-soh'
  },
  {
    id: 'cpms',
    title: 'CPMS PRO',
    titleZh: '电动车充电后台管理平台',
    subTitle: 'EV Charge Point Management System',
    subTitleZh: '电动车充电核心业务及项目精细化管理与敏捷交付平台',
    description: 'Enterprise workflow orchestration platform automating sprint stage-gates, cross-functional dependency tracking, and predictive milestone delivery risk forecasting.',
    descriptionZh: '核心业务及精细化项目管理平台，全自动化流转与执行，AI 智能预测交付风险、依赖阻塞链与精细化资源分配。',
    fullOverview: 'CPMS (Core Project Management System) unifies cross-departmental operations, stage-gate governance, agile pipeline automation, and predictive delivery risk forecasting for complex enterprise software deliverables.',
    fullOverviewZh: 'CPMS 统一组织跨部门协作、阶段门径流程治理、敏捷迭代自动化与交付风险预测引擎，帮助技术与业务团队在复杂交付周期中保持毫秒级透明与高吞吐执行力。',
    category: 'enterprise',
    categoryLabel: 'Enterprise Systems',
    categoryLabelZh: '企业核心系统',
    url: 'https://cpms.gz2ai.com/',
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
  },
  {
    id: 'cpem',
    title: 'EV Charger Emulator',
    titleZh: '电动车充电桩模拟器',
    subTitle: 'EV Charger & Clean Power Energy Monitoring System',
    subTitleZh: '新能源汽车充电站集群与清洁电力负荷调度综合监控平台',
    description: 'Smart EV charging infrastructure monitoring platform balancing high-power DC fast-charging demand, transformer headroom capacity, dynamic power sharing, and green tariff incentives.',
    descriptionZh: '智能新能源汽车充电站与清洁电力综合监控平台，动态平衡超充桩高功率冲击负荷、变压器容量富裕度、群控有序充电与绿电就地消纳。',
    fullOverview: 'CPEM provides central orchestration for high-power EV charging hubs. It executes dynamic load sharing across multiple DC fast chargers, shields transformers from peak overload tripping, and coordinates local solar/battery generation with electricity spot pricing.',
    fullOverviewZh: 'CPEM 为大型公共与物流车队大功率超充站提供一体化能量中枢。通过动态均流功率共享算法，消除多车同时充电对上级变压器的负荷过载冲击，结合光伏储能与分时电价引导车主有序错峰充绿电。',
    category: 'energy',
    categoryLabel: 'CleanTech & Energy',
    categoryLabelZh: '储能与清洁能源',
    url: 'https://cpem.gz2ai.com/',
    themeColor: 'indigo',
    accentHex: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.35)',
    iconName: 'plug',
    iconEmoji: '🔌',
    tags: ['EV Charging', 'Dynamic Load Sharing', 'Transformer Protection', 'Green Energy'],
    tagsZh: ['新能源汽车充电', '群控动态均流', '变压器防过载', '绿电协同'],
    metrics: [
      { label: 'Transformer Overload Tripping', labelZh: '变压器过载跳闸率', value: '0.0%', change: 'Zero-Trip', isPositive: true },
      { label: 'Charging Cost Savings', labelZh: '车队平均度电成本下降', value: '27.4%', change: 'Off-Peak', isPositive: true },
      { label: 'Charger Availability', labelZh: '充电桩群常态在线率', value: '99.92%', change: 'High Uptime', isPositive: true },
      { label: 'Solar Green Power Share', labelZh: '光伏绿电直接消纳占比', value: '86.5%', change: '+12.3%', isPositive: true },
    ],
    highlights: [
      {
        title: 'Dynamic Group-Control Power Sharing',
        titleZh: '矩阵式超充桩群控动态柔性分流',
        desc: 'Reallocates kilowatts in real-time as vehicle battery acceptance curves change, cutting customer charging queue times.',
        descZh: '随受电车辆动力电池 BMS 接收功率曲线变动毫秒级重配直流母线功率，大幅缩短车主排队等候时长。'
      },
      {
        title: 'Transformer Thermal Headroom Shield',
        titleZh: '变压器容量红线热保护阻断',
        desc: 'Monitors real-time substation temperature and peak demand thresholds to prevent catastrophic transformer damage.',
        descZh: '精准监测箱式变电站绕组温度与上级负荷余量，在电网重载时段柔性降功率，坚决杜绝越限跳闸。'
      },
      {
        title: 'Spot Market Plug-and-Charge Incentives',
        titleZh: '即插即充与电力现货电价智能联动',
        desc: 'Dynamically routes green power and offers automated price discounts to maximize site revenue during surplus generation.',
        descZh: '支持 ISO 15118 即插即充协议，在局域光伏大发或电力现货极低时段主动发放度电优惠，引导用户消纳绿电。'
      }
    ],
    techStack: ['Python', 'OCPP 2.0.1', 'FastAPI', 'PostgreSQL', 'Redis', 'React 19'],
    demoType: 'cpem'
  },
  {
    id: 'med',
    title: 'Med School Coaching',
    titleZh: '医学院申请辅导与临床决策引擎',
    subTitle: 'Medical Admissions Counseling & Clinical Diagnostic Decision Engine',
    subTitleZh: '医学院申请辅导与智能鉴别诊断推演决策引擎',
    description: 'Medical admissions predictive advising & clinical reasoning AI engine empowering medical students, prospective applicants, and healthcare decision workflows.',
    descriptionZh: '医学院申请辅导与智能诊断引擎，深度赋能医学成长与临床思维推理之路，提供量化录取背景评估与模拟临床鉴别诊断推演。',
    fullOverview: 'Med Project combines large-scale clinical case graphs and predictive admissions analytics. It delivers comprehensive MCAT preparation pathways, student portfolio diagnostic scoring, and interactive clinical case differential diagnostics for trainees and applicants.',
    fullOverviewZh: 'Med Project 结合大规模临床知识图谱与医学院招生录取预测分析，为有志于医学的学生提供从 MCAT/GPA 综合背景诊断、文书与临床经历优化，到模拟临床鉴别诊断的全流程智能化辅助引擎。',
    category: 'healthcare',
    categoryLabel: 'Healthcare AI',
    categoryLabelZh: '医疗健康与教育',
    url: 'https://med.gz2ai.com/',
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
  }
];

export const FOUNDER_INFO = {
  name: 'George Zhang',
  role: 'AI Engineer & Software Architect',
  roleZh: '人工智能工程师 & 软件系统架构师',
  email: 'gzhang.v@gmail.com',
  domain: 'gz2ai.com',
  bio: 'Architecting high-concurrency intelligence systems across AI data centers, industrial battery storage analytics, smart charging networks, and medical decision workflows.',
  bioZh: '深耕人工智能与高可靠软件系统架构，主导 AI 智算中心基础设施、储能全生命周期时序优化、超充网络群控与医疗临床决策引擎的工程化落地。',
  skills: [
    'PyTorch / AI Modeling',
    'AIDC & GPU Infrastructure',
    'BESS / EMS Control Systems',
    'Battery SOH & Thermal Safety',
    'EV Charging Group-Control',
    'Distributed Data Pipelines',
    'TypeScript / React 19'
  ],
  systemStats: {
    totalActivePipelines: '7 Active Platforms',
    globalTelemetryUptime: '99.98%',
    totalModelsDeployed: '14 Production Models',
    apiAvgLatency: '35ms'
  }
};
