import { 
  ProjectItem, 
  ProjectCategory, 
  MedEvaluationInput, 
  MedEvaluationResult, 
  BessSimulationInput, 
  BessSimulationResult,
  CpmsTask
} from '../types/index.ts';

/**
 * Filter projects by category and search term
 */
export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory,
  searchQuery: string
): ProjectItem[] {
  const query = searchQuery.trim().toLowerCase();
  
  return projects.filter(project => {
    // Category match
    if (category !== 'all' && project.category !== category) {
      return false;
    }
    
    // Search query match
    if (!query) return true;

    return (
      project.title.toLowerCase().includes(query) ||
      project.titleZh.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.descriptionZh.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query)) ||
      project.tagsZh.some(tag => tag.toLowerCase().includes(query)) ||
      project.techStack.some(tech => tech.toLowerCase().includes(query))
    );
  });
}

/**
 * Med Project: Admissions & Competitiveness Evaluator Algorithm
 */
export function evaluateMedApplicant(input: MedEvaluationInput): MedEvaluationResult {
  const gpa = Math.min(4.0, Math.max(2.0, input.gpa));
  const mcat = Math.min(528, Math.max(472, input.mcat));
  const clinical = Math.max(0, input.clinicalHours);
  const pubs = Math.max(0, input.researchPubs);

  // Standardized scoring components
  // GPA contribution (max 35 pts)
  const gpaScore = Math.max(0, ((gpa - 2.5) / 1.5)) * 35;
  
  // MCAT contribution (max 40 pts)
  const mcatScore = Math.max(0, ((mcat - 490) / 38)) * 40;
  
  // Clinical hours contribution (max 15 pts, cap at 600h)
  const clinicalScore = Math.min(15, (clinical / 600) * 15);
  
  // Research publications contribution (max 10 pts, cap at 3 pubs)
  const researchScore = Math.min(10, pubs * 3.33);

  const rawTotal = Math.round(gpaScore + mcatScore + clinicalScore + researchScore);
  const score = Math.min(99, Math.max(30, rawTotal));

  let tier: MedEvaluationResult['tier'] = 'Target';
  let tierZh = '目标院校稳健匹配';
  const strengths: string[] = [];
  const strengthsZh: string[] = [];
  let recommendedFocus = '';
  let recommendedFocusZh = '';

  if (score >= 85) {
    tier = 'Elite Competitor';
    tierZh = '顶级医学院顶尖候选人 (T20/Top Tier)';
  } else if (score >= 72) {
    tier = 'Strong Competitive';
    tierZh = '高竞争力录取梯队 (Strong Match)';
  } else if (score >= 60) {
    tier = 'Target';
    tierZh = '主流医学院匹配梯队 (Target Candidate)';
  } else {
    tier = 'High Reach';
    tierZh = '冲刺储备梯队 (Needs Profile Boost)';
  }

  if (gpa >= 3.8) {
    strengths.push(`Distinguished Academic GPA (${gpa.toFixed(2)})`);
    strengthsZh.push(`优异本科 GPA (${gpa.toFixed(2)})`);
  }
  if (mcat >= 515) {
    strengths.push(`High Percentile MCAT (${mcat})`);
    strengthsZh.push(`顶尖 MCAT 分位值 (${mcat})`);
  }
  if (clinical >= 300) {
    strengths.push(`Extensive Clinical Direct Patient Hours (${clinical}h)`);
    strengthsZh.push(`扎实临床直面临床实践 (${clinical}小时)`);
  }
  if (pubs >= 1) {
    strengths.push(`Peer-Reviewed Research Exposure (${pubs} papers)`);
    strengthsZh.push(`同行评审学术产出 (${pubs}篇)`);
  }

  if (clinical < 200) {
    recommendedFocus = 'Increase direct clinical shadowing or EMT patient interactions to meet competitive baselines.';
    recommendedFocusZh = '增加直面患者临床见习或志愿者时长，弥补实践经历短板。';
  } else if (mcat < 510) {
    recommendedFocus = 'Focus on targeted MCAT CARS and Bio/Biochem mock simulations.';
    recommendedFocusZh = '重点突破 MCAT CARS 分析阅读与生化模块模拟练习。';
  } else {
    recommendedFocus = 'Deepen secondary application narratives and interview synthesis.';
    recommendedFocusZh = '深挖文书叙事与二级申请 (Secondary) 核心经历，强化面试表现。';
  }

  return {
    score,
    tier,
    tierZh,
    keyStrengths: strengths.length ? strengths : ['Broad Foundations Balanced across criteria'],
    keyStrengthsZh: strengthsZh.length ? strengthsZh : ['综合基础平衡，具备良好拓展潜力'],
    recommendedFocus,
    recommendedFocusZh
  };
}

/**
 * BESS System: Battery Energy Storage Simulation Calculation
 */
export function calculateBessSimulation(input: BessSimulationInput): BessSimulationResult {
  const { currentSoc, capacityKwh, chargeDischargeKw, electricityPricePerKwh } = input;
  
  // Power exchanged over 1 hour (kWh)
  const powerExchangedKwh = chargeDischargeKw; // 1 hr delta
  
  // Inverter round-trip thermal efficiency loss (approx 94% efficiency)
  const thermalEfficiencyPct = chargeDischargeKw === 0 ? 100 : 94.2;
  const effectiveKwh = chargeDischargeKw > 0 
    ? powerExchangedKwh * (thermalEfficiencyPct / 100) 
    : powerExchangedKwh / (thermalEfficiencyPct / 100);

  // New SoC clamped between 5% (depth of discharge buffer) and 100%
  const socDeltaPct = (effectiveKwh / capacityKwh) * 100;
  const rawSoc = currentSoc + socDeltaPct;
  const newSoc = Math.min(100, Math.max(5, Math.round(rawSoc * 10) / 10));

  // Cost or savings:
  // Charging (kw > 0): consumes electricity -> cost = powerExchangedKwh * price
  // Discharging (kw < 0): injects electricity to grid/facility -> savings = -powerExchangedKwh * price
  const costImpactUsd = Math.round(powerExchangedKwh * electricityPricePerKwh * 100) / 100;

  let recommendation: BessSimulationResult['recommendation'] = 'Hold Reserve';
  let recommendationZh = '平峰期维持基准荷电量 (Hold Reserve)';

  if (electricityPricePerKwh >= 0.35 && newSoc > 20) {
    recommendation = 'Discharge (Peak Arbitrage)';
    recommendationZh = '高峰电价套利：建议高功率放电并网 (Peak Arbitrage)';
  } else if (electricityPricePerKwh <= 0.15 && newSoc < 90) {
    recommendation = 'Charge (Off-Peak)';
    recommendationZh = '低谷储能充电：利用低谷廉价绿电充电 (Off-Peak Charge)';
  }

  return {
    newSoc,
    energyExchangedKwh: Math.abs(Math.round(powerExchangedKwh * 10) / 10),
    costImpactUsd,
    thermalEfficiencyPct,
    recommendation,
    recommendationZh
  };
}

/**
 * CPMS: Project Portfolio Risk and Velocity Engine
 */
export function calculateCpmsMetrics(tasks: CpmsTask[]): {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  averageRiskScore: number;
  highRiskCount: number;
  healthStatus: 'HEALTHY' | 'MODERATE' | 'AT_RISK';
  healthStatusZh: string;
} {
  if (!tasks.length) {
    return {
      totalTasks: 0,
      completedTasks: 0,
      completionRate: 0,
      averageRiskScore: 0,
      highRiskCount: 0,
      healthStatus: 'HEALTHY',
      healthStatusZh: '项目状态优良'
    };
  }

  const completed = tasks.filter(t => t.stage === 'completed').length;
  const completionRate = Math.round((completed / tasks.length) * 100);
  const totalRisk = tasks.reduce((acc, t) => acc + t.riskScore, 0);
  const averageRiskScore = Math.round(totalRisk / tasks.length);
  const highRiskCount = tasks.filter(t => t.riskScore >= 70).length;

  let healthStatus: 'HEALTHY' | 'MODERATE' | 'AT_RISK' = 'HEALTHY';
  let healthStatusZh = '系统运转顺畅，交付风险极低';

  if (highRiskCount >= 2 || averageRiskScore >= 65) {
    healthStatus = 'AT_RISK';
    healthStatusZh = '存在高风险里程碑，建议介入协调';
  } else if (highRiskCount >= 1 || averageRiskScore >= 45) {
    healthStatus = 'MODERATE';
    healthStatusZh = '项目进度稳定，需关注次要瓶颈';
  }

  return {
    totalTasks: tasks.length,
    completedTasks: completed,
    completionRate,
    averageRiskScore,
    highRiskCount,
    healthStatus,
    healthStatusZh
  };
}
