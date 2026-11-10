import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  evaluateMedApplicant, 
  calculateBessSimulation, 
  calculateCpmsMetrics,
  filterProjects 
} from './projects.ts';
import { ProjectItem, CpmsTask } from '../types/index.ts';

test('evaluateMedApplicant computes score and high tier for strong applicant', () => {
  const result = evaluateMedApplicant({
    gpa: 3.95,
    mcat: 522,
    clinicalHours: 450,
    researchPubs: 2
  });

  assert.ok(result.score >= 85, `Score should be high, got ${result.score}`);
  assert.equal(result.tier, 'Elite Competitor');
  assert.ok(result.keyStrengths.length >= 3);
});

test('evaluateMedApplicant correctly flags need for clinical hours when low', () => {
  const result = evaluateMedApplicant({
    gpa: 3.8,
    mcat: 512,
    clinicalHours: 50,
    researchPubs: 0
  });

  assert.match(result.recommendedFocus, /clinical/i);
});

test('calculateBessSimulation calculates discharge and savings correctly', () => {
  const sim = calculateBessSimulation({
    currentSoc: 80,
    capacityKwh: 500,
    chargeDischargeKw: -100, // discharge 100 kW
    electricityPricePerKwh: 0.40 // peak price
  });

  assert.ok(sim.newSoc < 80, `SoC should decrease from 80%, got ${sim.newSoc}`);
  assert.ok(sim.costImpactUsd < 0, `Discharging should yield negative cost (savings), got ${sim.costImpactUsd}`);
  assert.equal(sim.recommendation, 'Discharge (Peak Arbitrage)');
});

test('calculateBessSimulation recommends charging during cheap off-peak', () => {
  const sim = calculateBessSimulation({
    currentSoc: 30,
    capacityKwh: 500,
    chargeDischargeKw: 100, // charge 100 kW
    electricityPricePerKwh: 0.08 // off-peak price
  });

  assert.ok(sim.newSoc > 30, `SoC should increase, got ${sim.newSoc}`);
  assert.equal(sim.recommendation, 'Charge (Off-Peak)');
});

test('calculateCpmsMetrics detects project health and completion rate', () => {
  const tasks: CpmsTask[] = [
    { id: '1', title: 'Task 1', stage: 'completed', priority: 'medium', riskScore: 10, owner: 'George' },
    { id: '2', title: 'Task 2', stage: 'completed', priority: 'high', riskScore: 20, owner: 'Alex' },
    { id: '3', title: 'Task 3', stage: 'in_progress', priority: 'critical', riskScore: 85, owner: 'Dev' },
    { id: '4', title: 'Task 4', stage: 'backlog', priority: 'low', riskScore: 15, owner: 'George' },
  ];

  const metrics = calculateCpmsMetrics(tasks);
  assert.equal(metrics.totalTasks, 4);
  assert.equal(metrics.completedTasks, 2);
  assert.equal(metrics.completionRate, 50);
  assert.equal(metrics.highRiskCount, 1);
  assert.equal(metrics.healthStatus, 'MODERATE');
});

test('filterProjects correctly handles category and text queries', () => {
  const mockProjects: ProjectItem[] = [
    {
      id: 'med',
      title: 'Med Project',
      titleZh: '医学项目',
      subTitle: 'Admissions & Diagnostic',
      subTitleZh: '申请与诊断',
      description: 'Medical admissions counseling',
      descriptionZh: '医学院申请辅导',
      fullOverview: 'Overview',
      fullOverviewZh: '概览',
      category: 'healthcare',
      categoryLabel: 'Healthcare AI',
      categoryLabelZh: '医疗健康',
      url: 'https://gz2ai.com/med',
      themeColor: 'indigo',
      accentHex: '#818cf8',
      glowColor: 'rgba(129, 140, 248, 0.4)',
      iconName: 'stethoscope',
      iconEmoji: '⚕️',
      tags: ['Healthcare AI'],
      tagsZh: ['医疗 AI'],
      metrics: [],
      highlights: [],
      techStack: ['PyTorch', 'FastAPI'],
      demoType: 'med'
    },
    {
      id: 'bess',
      title: 'BESS System',
      titleZh: 'BESS 储能系统',
      subTitle: 'Battery Storage',
      subTitleZh: '电池储能',
      description: 'Intelligent AI-driven energy',
      descriptionZh: '智能能源数据分析',
      fullOverview: 'Overview',
      fullOverviewZh: '概览',
      category: 'energy',
      categoryLabel: 'Energy AI',
      categoryLabelZh: '能源算力',
      url: 'https://gz2ai.com/bess',
      themeColor: 'purple',
      accentHex: '#c084fc',
      glowColor: 'rgba(192, 132, 252, 0.4)',
      iconName: 'zap',
      iconEmoji: '⚡',
      tags: ['CleanTech'],
      tagsZh: ['清洁能源'],
      metrics: [],
      highlights: [],
      techStack: ['Python', 'Time-series'],
      demoType: 'bess'
    }
  ];

  const medFiltered = filterProjects(mockProjects, 'healthcare', '');
  assert.equal(medFiltered.length, 1);
  assert.equal(medFiltered[0].id, 'med');

  const textFiltered = filterProjects(mockProjects, 'all', 'energy');
  assert.equal(textFiltered.length, 1);
  assert.equal(textFiltered[0].id, 'bess');
});
