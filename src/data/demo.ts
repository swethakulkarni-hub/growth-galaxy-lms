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
  level: 7,
  levelTitle: "Skill Voyager",
  xp: 4820,
  xpIntoLevel: 620,
  xpForNextLevel: 1000,
  weeklyGoalXp: 900,
  weeklyXp: 685,
  streak: 12,
  bestStreak: 21,
  readiness: 72,
  subScores: [
    { label: "Technical", value: 78, emoji: "⚙️" },
    { label: "Projects", value: 64, emoji: "🚀" },
    { label: "Communication", value: 81, emoji: "🎤" },
    { label: "Market Fit", value: 66, emoji: "📈" },
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

export type Quest = {
  id: string;
  title: string;
  detail: string;
  xp: number;
  progress: number;
  target: number;
  emoji: string;
  endsIn: string;
};

export const quests: Quest[] = [
  {
    id: "q1",
    title: "Finish 2 lessons",
    detail: "Any course counts. Momentum > perfection.",
    xp: 150,
    progress: 2,
    target: 2,
    emoji: "⚡",
    endsIn: "2 days",
  },
  {
    id: "q2",
    title: "Close one skill gap",
    detail: "Push SQL from 61 to 70 with the practice set.",
    xp: 300,
    progress: 1,
    target: 3,
    emoji: "🎯",
    endsIn: "4 days",
  },
  {
    id: "q3",
    title: "Present a project recap",
    detail: "Record a 3-minute demo of your dashboard build.",
    xp: 220,
    progress: 0,
    target: 1,
    emoji: "🎤",
    endsIn: "6 days",
  },
  {
    id: "q4",
    title: "Keep the streak alive",
    detail: "5 days in a row of any learning activity.",
    xp: 180,
    progress: 5,
    target: 5,
    emoji: "🔥",
    endsIn: "today",
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

export type CertStage = {
  name: string;
  status: "done" | "current" | "locked";
  kind: "lesson" | "lab" | "boss";
};

export type CertTrack = {
  id: string;
  title: string;
  emoji: string;
  xp: number;
  marketValue: string;
  badge: string;
  accent: string;
  stages: CertStage[];
};

export const certTracks: CertTrack[] = [
  {
    id: "sql-master",
    title: "SQL Analytics Certified",
    emoji: "🗄️",
    xp: 1200,
    marketValue: "Named in 68% of analyst postings",
    badge: "Query Slayer",
    accent: "violet",
    stages: [
      { name: "Joins & Aggregates", status: "done", kind: "lesson" },
      { name: "Window Functions", status: "done", kind: "lesson" },
      { name: "Query Tuning Lab", status: "current", kind: "lab" },
      { name: "Modeling Sprint", status: "locked", kind: "lesson" },
      { name: "Boss Challenge", status: "locked", kind: "boss" },
    ],
  },
  {
    id: "viz-pro",
    title: "Data Storyteller",
    emoji: "📈",
    xp: 900,
    marketValue: "Top asked-for skill in analyst interviews",
    badge: "Chart Whisperer",
    accent: "lime",
    stages: [
      { name: "Chart Choice", status: "done", kind: "lesson" },
      { name: "Narrative Lab", status: "current", kind: "lab" },
      { name: "Exec Summary", status: "locked", kind: "lesson" },
      { name: "Boss Challenge", status: "locked", kind: "boss" },
    ],
  },
  {
    id: "cloud-ready",
    title: "Cloud Ready Engineer",
    emoji: "☁️",
    xp: 1500,
    marketValue: "+14% average starting offer",
    badge: "Sky Runner",
    accent: "orange",
    stages: [
      { name: "Core Services", status: "current", kind: "lesson" },
      { name: "Containers Lab", status: "locked", kind: "lab" },
      { name: "CI/CD Pipeline", status: "locked", kind: "lesson" },
      { name: "Cost & Scale", status: "locked", kind: "lesson" },
      { name: "Boss Challenge", status: "locked", kind: "boss" },
    ],
  },
];

export const earnedBadges = [
  { name: "Inorganic Chemistry", emoji: "🧪", date: "Mar 2026", tier: "Gold" },
  { name: "Social Philosophy", emoji: "🏛️", date: "Feb 2026", tier: "Silver" },
  { name: "Python Foundations", emoji: "🐍", date: "Jan 2026", tier: "Gold" },
  { name: "Presenting with Impact", emoji: "🎤", date: "Dec 2025", tier: "Gold" },
  { name: "First 7-Day Streak", emoji: "🔥", date: "Nov 2025", tier: "Bronze" },
  { name: "Peer Reviewer", emoji: "🤝", date: "Nov 2025", tier: "Silver" },
];

export const leaderboard = [
  { rank: 1, name: "Marcus Lee", xp: 7420, streak: 34, badges: 11, initials: "ML" },
  { rank: 2, name: "Priya Raman", xp: 6180, streak: 22, badges: 9, initials: "PR" },
  { rank: 3, name: "Diane Nguyen", xp: 4820, streak: 12, badges: 6, initials: "DN", isYou: true },
  { rank: 4, name: "Tomas Alvarez", xp: 4610, streak: 15, badges: 6, initials: "TA" },
  { rank: 5, name: "Ines Duarte", xp: 4270, streak: 9, badges: 5, initials: "ID" },
  { rank: 6, name: "Kwame Boateng", xp: 3980, streak: 18, badges: 5, initials: "KB" },
  { rank: 7, name: "Sofia Ricci", xp: 3540, streak: 6, badges: 4, initials: "SR" },
  { rank: 8, name: "Hana Sato", xp: 3110, streak: 11, badges: 4, initials: "HS" },
];

export const weeklyLeaderboard = [
  { rank: 1, name: "Diane Nguyen", xp: 685, streak: 12, badges: 2, initials: "DN", isYou: true },
  { rank: 2, name: "Priya Raman", xp: 640, streak: 22, badges: 1, initials: "PR" },
  { rank: 3, name: "Kwame Boateng", xp: 590, streak: 18, badges: 1, initials: "KB" },
  { rank: 4, name: "Marcus Lee", xp: 520, streak: 34, badges: 1, initials: "ML" },
  { rank: 5, name: "Hana Sato", xp: 480, streak: 11, badges: 0, initials: "HS" },
  { rank: 6, name: "Tomas Alvarez", xp: 410, streak: 15, badges: 0, initials: "TA" },
  { rank: 7, name: "Ines Duarte", xp: 360, streak: 9, badges: 0, initials: "ID" },
  { rank: 8, name: "Sofia Ricci", xp: 300, streak: 6, badges: 0, initials: "SR" },
];

// Last 12 weeks of activity intensity, 0-4
export const streakHeatmap = [
  2, 3, 1, 0, 4, 3, 2, 1, 3, 4, 4, 2, 0, 1, 3, 4, 2, 2, 3, 1, 0, 2, 4, 3, 3, 2, 1, 4, 4, 3, 2, 0,
  1, 3, 4, 4, 2, 3, 3, 4, 1, 0, 2, 4, 3, 4, 4, 2, 3, 3, 4, 4, 2, 1, 3, 4,
];

export function gapsForRole(roleId: string) {
  const role = targetRoles.find((r) => r.id === roleId) ?? targetRoles[0];
  return skills
    .map((s) => {
      const required = role.benchmark[s.name] ?? 40;
      return { ...s, required, gap: Math.max(0, required - s.level) };
    })
    .sort((a, b) => b.gap - a.gap);
}
