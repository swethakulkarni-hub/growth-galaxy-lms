export type Skill = {
  name: string;
  level: number; // 0-100 student's level
  category: "Technical" | "Data" | "Design" | "Communication" | "Business";
};

export type TargetRole = {
  id: string;
  title: string;
  blurb: string;
  emoji: string;
  salary: string;
  openingsTrend: number[];
  growth: number;
  benchmark: Record<string, number>;
};

export const student = {
  name: "Diane Nguyen",
  firstName: "Diane",
  year: "2nd year",
  program: "B.S. Computer Science",
  cohort: "CS '28 — Cohort B",
  initials: "DN",
  readiness: 72,
  subScores: [
    { label: "Technical", value: 78 },
    { label: "Projects", value: 64 },
    { label: "Communication", value: 81 },
    { label: "Market fit", value: 66 },
  ],
};

export const skills: Skill[] = [
  { name: "Python", level: 78, category: "Technical" },
  { name: "SQL", level: 61, category: "Data" },
  { name: "Data Viz", level: 44, category: "Data" },
  { name: "React", level: 70, category: "Technical" },
  { name: "Cloud Basics", level: 32, category: "Technical" },
  { name: "Machine Learning", level: 38, category: "Data" },
  { name: "Product Thinking", level: 55, category: "Business" },
  { name: "Presenting", level: 81, category: "Communication" },
  { name: "UX Basics", level: 48, category: "Design" },
  { name: "Stakeholder Comms", level: 66, category: "Communication" },
];

export const targetRoles: TargetRole[] = [
  {
    id: "data-analyst",
    title: "Data Analyst",
    blurb: "Turn messy data into decisions teams actually make.",
    emoji: "📊",
    salary: "$72k – $98k",
    openingsTrend: [42, 46, 51, 49, 58, 64, 71],
    growth: 18,
    benchmark: {
      Python: 75,
      SQL: 90,
      "Data Viz": 85,
      React: 25,
      "Cloud Basics": 55,
      "Machine Learning": 50,
      "Product Thinking": 55,
      Presenting: 70,
      "UX Basics": 30,
      "Stakeholder Comms": 75,
    },
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    blurb: "Ship interfaces people love using every single day.",
    emoji: "🎨",
    salary: "$80k – $115k",
    openingsTrend: [55, 52, 57, 60, 63, 61, 68],
    growth: 11,
    benchmark: {
      Python: 35,
      SQL: 40,
      "Data Viz": 55,
      React: 90,
      "Cloud Basics": 55,
      "Machine Learning": 20,
      "Product Thinking": 65,
      Presenting: 60,
      "UX Basics": 80,
      "Stakeholder Comms": 60,
    },
  },
  {
    id: "ml-engineer",
    title: "ML Engineer",
    blurb: "Take models from notebook to production traffic.",
    emoji: "🤖",
    salary: "$105k – $150k",
    openingsTrend: [30, 36, 44, 52, 61, 72, 88],
    growth: 41,
    benchmark: {
      Python: 92,
      SQL: 70,
      "Data Viz": 55,
      React: 25,
      "Cloud Basics": 80,
      "Machine Learning": 90,
      "Product Thinking": 50,
      Presenting: 55,
      "UX Basics": 20,
      "Stakeholder Comms": 55,
    },
  },
  {
    id: "product-manager",
    title: "Product Manager",
    blurb: "Decide what gets built, and why it matters.",
    emoji: "🧭",
    salary: "$88k – $125k",
    openingsTrend: [48, 47, 45, 50, 53, 55, 58],
    growth: 7,
    benchmark: {
      Python: 35,
      SQL: 60,
      "Data Viz": 65,
      React: 35,
      "Cloud Basics": 40,
      "Machine Learning": 35,
      "Product Thinking": 90,
      Presenting: 85,
      "UX Basics": 70,
      "Stakeholder Comms": 90,
    },
  },
];

export type Course = {
  id: string;
  title: string;
  instructor: string;
  emoji: string;
  lessonsLeft: number;
  completed: number;
  tint: string;
  closesSkill: string;
};

export const myCourses: Course[] = [
  {
    id: "sql-deep",
    title: "SQL for Real Analytics",
    instructor: "Prof. Linda Cruz",
    emoji: "🗄️",
    lessonsLeft: 3,
    completed: 65,
    tint: "from-violet-500/25 to-fuchsia-500/10",
    closesSkill: "SQL",
  },
  {
    id: "viz-story",
    title: "Data Viz & Storytelling",
    instructor: "Prof. Amara Okafor",
    emoji: "📈",
    lessonsLeft: 5,
    completed: 41,
    tint: "from-lime-400/30 to-emerald-400/10",
    closesSkill: "Data Viz",
  },
  {
    id: "cloud-101",
    title: "Cloud Foundations",
    instructor: "Prof. Jonathan Reyes",
    emoji: "☁️",
    lessonsLeft: 8,
    completed: 22,
    tint: "from-orange-400/30 to-rose-400/10",
    closesSkill: "Cloud Basics",
  },
];

export type TrendingSkill = {
  name: string;
  growth: number;
  demand: number;
  trend: number[];
  state: "rising" | "cooling";
  note: string;
};

export const trendingSkills: TrendingSkill[] = [
  {
    name: "LLM App Development",
    growth: 128,
    demand: 96,
    trend: [12, 20, 31, 44, 62, 80, 96],
    state: "rising",
    note: "Every product team is hiring for this right now.",
  },
  {
    name: "Data Engineering",
    growth: 46,
    demand: 88,
    trend: [40, 44, 51, 58, 66, 78, 88],
    state: "rising",
    note: "Pipelines beat dashboards for pay and stability.",
  },
  {
    name: "Cloud & Kubernetes",
    growth: 33,
    demand: 82,
    trend: [48, 52, 56, 63, 70, 76, 82],
    state: "rising",
    note: "Pairs with almost any engineering track.",
  },
  {
    name: "Analytics Engineering",
    growth: 27,
    demand: 74,
    trend: [38, 44, 49, 55, 61, 68, 74],
    state: "rising",
    note: "SQL + modeling is the sweet spot for analysts.",
  },
  {
    name: "Manual QA Testing",
    growth: -21,
    demand: 34,
    trend: [62, 58, 52, 47, 42, 38, 34],
    state: "cooling",
    note: "Automation is eating the entry-level roles.",
  },
  {
    name: "Basic WordPress Sites",
    growth: -16,
    demand: 29,
    trend: [50, 47, 44, 41, 36, 32, 29],
    state: "cooling",
    note: "Low differentiation, heavy price pressure.",
  },
];

export type TrendingCourse = {
  id: string;
  title: string;
  provider: string;
  emoji: string;
  learners: string;
  relevance: number;
  closesGap: string;
  weeks: number;
};

export const trendingCourses: TrendingCourse[] = [
  {
    id: "tc1",
    title: "Build & Ship an LLM App",
    provider: "Ace Academy Labs",
    emoji: "🤖",
    learners: "24.1k",
    relevance: 97,
    closesGap: "Machine Learning",
    weeks: 5,
  },
  {
    id: "tc2",
    title: "Advanced SQL Patterns",
    provider: "DataCraft",
    emoji: "🗄️",
    learners: "18.7k",
    relevance: 93,
    closesGap: "SQL",
    weeks: 4,
  },
  {
    id: "tc3",
    title: "Dashboards That Persuade",
    provider: "Ace Academy Labs",
    emoji: "📊",
    learners: "12.3k",
    relevance: 88,
    closesGap: "Data Viz",
    weeks: 3,
  },
  {
    id: "tc4",
    title: "Cloud Deploy Bootcamp",
    provider: "SkyForge",
    emoji: "☁️",
    learners: "9.8k",
    relevance: 84,
    closesGap: "Cloud Basics",
    weeks: 6,
  },
];

export function gapsForRole(roleId: string) {
  const role = targetRoles.find((r) => r.id === roleId) ?? targetRoles[0]!;
  return skills
    .map((s) => {
      const required = role.benchmark[s.name] ?? 40;
      return { ...s, required, gap: Math.max(0, required - s.level) };
    })
    .sort((a, b) => b.gap - a.gap);
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

/** Weighted coverage of the student's levels against a role's expectations. */
function coverage(roleId: string, categories?: Skill["category"][]) {
  const role = targetRoles.find((r) => r.id === roleId) ?? targetRoles[0]!;
  const pool = categories ? skills.filter((s) => categories.includes(s.category)) : skills;
  let weighted = 0;
  let weight = 0;
  for (const s of pool) {
    const required = role.benchmark[s.name] ?? 40;
    weighted += required * Math.min(1, s.level / Math.max(1, required));
    weight += required;
  }
  return weight === 0 ? 0 : clamp((weighted / weight) * 100);
}

export function readinessForRole(roleId: string) {
  const role = targetRoles.find((r) => r.id === roleId) ?? targetRoles[0]!;

  const technical = coverage(roleId, ["Technical", "Data"]);
  const communication = coverage(roleId, ["Communication", "Business", "Design"]);

  // Projects: how far current coursework carries the skills this role weights highly.
  let projWeighted = 0;
  let projWeight = 0;
  for (const c of myCourses) {
    const required = role.benchmark[c.closesSkill] ?? 40;
    projWeighted += required * (c.completed / 100);
    projWeight += required;
  }
  const projects = projWeight === 0 ? 0 : clamp((projWeighted / projWeight) * 100);

  // Market fit: this role's demand and growth relative to the other tracks.
  const demandOf = (r: TargetRole) => r.openingsTrend[r.openingsTrend.length - 1] ?? 0;
  const demands = targetRoles.map(demandOf);
  const growths = targetRoles.map((r) => r.growth);
  const norm = (v: number, all: number[]) => {
    const min = Math.min(...all);
    const max = Math.max(...all);
    return max === min ? 70 : ((v - min) / (max - min)) * 100;
  };
  const marketFit = clamp(
    0.5 * norm(demandOf(role), demands) + 0.5 * norm(role.growth, growths) * 0.9 + 8,
  );

  const score = clamp(0.5 * coverage(roleId) + 0.25 * projects + 0.15 * communication + 0.1 * marketFit);

  return {
    score,
    skillsCompared: skills.length,
    subScores: [
      { label: "Technical", value: technical },
      { label: "Projects", value: projects },
      { label: "Communication", value: communication },
      { label: "Market fit", value: marketFit },
    ],
  };
}
