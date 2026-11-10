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

export type ProjectId = 'aidc' | 'ems-bess' | 'bbem' | 'bat-soh' | 'cpms' | 'cpem' | 'med';

export interface ProjectItem {
  id: ProjectId;
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
  themeColor: 'indigo' | 'purple' | 'pink' | 'emerald' | 'cyan' | 'amber';
  accentHex: string;
  glowColor: string;
  iconName: string;
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
  demoType: ProjectId;
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

export interface AidcSimulationInput {
  gpuUtilizationPct: number; // 20 - 100%
  ambientTempC: number; // 15 - 40 C
  rackPowerKw: number; // 20 - 80 kW
}

export interface AidcSimulationResult {
  pue: number;
  coolingPowerKw: number;
  totalFacilityPowerKw: number;
  efficiencyTier: 'Optimal' | 'Standard' | 'Warning';
  efficiencyTierZh: string;
}

export interface BatSohInput {
  cycles: number; // 0 - 5000
  chargeCRate: number; // 0.2 - 2.0 C
  avgOperatingTempC: number; // 15 - 55 C
  dodPct: number; // 50 - 100%
}

export interface BatSohResult {
  sohPct: number; // 100% -> 70%
  internalResistanceMohm: number;
  remainingUsefulCycles: number;
  thermalRunawayRisk: 'Low' | 'Moderate' | 'Elevated';
  thermalRunawayRiskZh: string;
}

export interface CpemInput {
  concurrentEvs: number; // 1 - 20
  powerPerEvKw: number; // 30 - 350 kW
  transformerCapacityKw: number; // e.g. 1000 kW
}

export interface CpemResult {
  totalRequestedKw: number;
  actualDeliveredKw: number;
  curtailmentRatePct: number;
  transformerLoadPct: number;
  safetyStatus: 'Safe' | 'Curtailed' | 'Overload Warning';
  safetyStatusZh: string;
}

export interface BbemInput {
  occupancyPct: number; // 10 - 100%
  pvSolarGenerationKw: number; // 0 - 200 kW
  batteryDischargeKw: number; // 0 - 150 kW
}

export interface BbemResult {
  baseBuildingLoadKw: number;
  netGridImportKw: number;
  cleanEnergyRatioPct: number;
  demandChargeSavingsUsd: number;
}
