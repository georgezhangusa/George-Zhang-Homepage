export type Language = 'zh' | 'en';

export type ProjectCategory = 'all' | 'healthcare' | 'energy' | 'enterprise';

export interface ProjectMetric {
  label: string;
  labelZh: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface ProjectTech {
  name: string;
  category: string;
}

export interface ProjectItem {
  id: 'med' | 'bess' | 'cpms';
  title: string;
  titleZh: string;
  subTitle: string;
  subTitleZh: string;
  description: string;
  descriptionZh: string;
  fullOverview: string;
  fullOverviewZh: string;
  category: 'healthcare' | 'energy' | 'enterprise';
  categoryLabel: string;
  categoryLabelZh: string;
  url: string;
  themeColor: 'indigo' | 'purple' | 'pink';
  accentHex: string;
  glowColor: string;
  iconName: 'stethoscope' | 'zap' | 'barChart';
  iconEmoji: string;
  tags: string[];
  tagsZh: string[];
  metrics: ProjectMetric[];
  highlights: {
    title: string;
    titleZh: string;
    desc: string;
    descZh: string;
  }[];
  techStack: string[];
  demoType: 'med' | 'bess' | 'cpms';
}

export interface MedEvaluationInput {
  gpa: number;
  mcat: number;
  clinicalHours: number;
  researchPubs: number;
}

export interface MedEvaluationResult {
  score: number; // 0-100
  tier: 'High Reach' | 'Target' | 'Strong Competitive' | 'Elite Competitor';
  tierZh: string;
  keyStrengths: string[];
  keyStrengthsZh: string[];
  recommendedFocus: string;
  recommendedFocusZh: string;
}

export interface BessSimulationInput {
  currentSoc: number; // 0-100%
  capacityKwh: number;
  chargeDischargeKw: number; // negative: discharge, positive: charge
  electricityPricePerKwh: number; // e.g. 0.28 $/kWh
}

export interface BessSimulationResult {
  newSoc: number; // after 1h
  energyExchangedKwh: number;
  costImpactUsd: number;
  thermalEfficiencyPct: number;
  recommendation: 'Charge (Off-Peak)' | 'Discharge (Peak Arbitrage)' | 'Hold Reserve';
  recommendationZh: string;
}

export interface CpmsTask {
  id: string;
  title: string;
  stage: 'backlog' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number; // 1-100
  owner: string;
}
