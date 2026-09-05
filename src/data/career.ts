// Curated demo data for curriculum, references and career opportunities.

export type Salary = {
  region: "India" | "US";
  flag: string;
  fresher: string;
  mid: string;
  note: string;
};

export const roleSalaries: Record<string, Salary[]> = {
  "data-analyst": [
    {
      region: "India",
      flag: "🇮🇳",
      fresher: "₹5.5 – 9 LPA",
      mid: "₹14 – 22 LPA",
      note: "Bengaluru and Hyderabad pay ~20% above the national median.",
    },
    {
      region: "US",
      flag: "🇺🇸",
      fresher: "$72k – $98k",
      mid: "$110k – $140k",
      note: "SQL depth plus dashboard storytelling drives the top of the band.",
    },
  ],
  "frontend-engineer": [
    {
      region: "India",
      flag: "🇮🇳",
      fresher: "₹6 – 12 LPA",
      mid: "₹18 – 30 LPA",
      note: "Product companies pay well above service firms for React depth.",
    },
    {
      region: "US",
      flag: "🇺🇸",
      fresher: "$80k – $115k",
      mid: "$125k – $160k",
      note: "Accessibility and performance work is the clearest premium.",
    },
  ],
  "ml-engineer": [
    {
      region: "India",
      flag: "🇮🇳",
      fresher: "₹8 – 16 LPA",
      mid: "₹25 – 45 LPA",
      note: "Highest-paying entry track if you can ship models, not just notebooks.",
    },
    {
      region: "US",
      flag: "🇺🇸",
      fresher: "$105k – $150k",
      mid: "$160k – $210k",
      note: "Production experience beats coursework in every interview loop.",
    },
  ],
  "product-manager": [
    {
      region: "India",
      flag: "🇮🇳",
      fresher: "₹8 – 14 LPA",
      mid: "₹22 – 38 LPA",
      note: "Most entry PM roles here start as APM or associate programs.",
    },
    {
      region: "US",
      flag: "🇺🇸",
      fresher: "$88k – $125k",
      mid: "$135k – $175k",
      note: "APM programs are the main new-grad door; internships matter most.",
    },
  ],
};

export type Internship = {
  title: string;
  org: string;
  mode: string;
  window: string;
  stipend: string;
  fitsBecause: string;
};

export const roleInternships: Record<string, Internship[]> = {
  "data-analyst": [
    {
      title: "Analytics Intern",
      org: "Flipkart · Growth team",
      mode: "Hybrid · Bengaluru",
      window: "Summer, 10 weeks",
      stipend: "₹45k / month",
      fitsBecause: "Your SQL course maps directly to their funnel reporting work.",
    },
    {
      title: "Business Intelligence Intern",
      org: "Deloitte India",
      mode: "Remote",
      window: "Rolling",
      stipend: "₹30k / month",
      fitsBecause: "Dashboard storytelling is the core screening skill.",
    },
    {
      title: "Data Science Intern",
      org: "Wayfair (US)",
      mode: "On-site · Boston",
      window: "Applications open Sep–Nov",
      stipend: "$8k / month",
      fitsBecause: "Python + SQL combo is exactly their intern screen.",
    },
  ],
  "frontend-engineer": [
    {
      title: "Frontend Engineering Intern",
      org: "Zomato",
      mode: "Hybrid · Gurugram",
      window: "Winter, 12 weeks",
      stipend: "₹60k / month",
      fitsBecause: "React work in your projects covers most of the take-home.",
    },
    {
      title: "Web Platform Intern",
      org: "Razorpay",
      mode: "Remote",
      window: "Summer",
      stipend: "₹50k / month",
      fitsBecause: "They screen for component design and accessibility basics.",
    },
    {
      title: "UI Engineering Intern",
      org: "Shopify (US)",
      mode: "Remote",
      window: "Applications open Aug–Oct",
      stipend: "$8.5k / month",
      fitsBecause: "Your UX basics coursework helps you stand out here.",
    },
  ],
  "ml-engineer": [
    {
      title: "ML Intern",
      org: "Sarvam AI",
      mode: "On-site · Bengaluru",
      window: "Rolling",
      stipend: "₹75k / month",
      fitsBecause: "Your Python depth plus an LLM side project is the ideal profile.",
    },
    {
      title: "Applied AI Intern",
      org: "Microsoft IDC",
      mode: "Hybrid · Hyderabad",
      window: "Summer",
      stipend: "₹1L / month",
      fitsBecause: "Cloud fundamentals coursework is a listed requirement.",
    },
    {
      title: "Machine Learning Intern",
      org: "Scale AI (US)",
      mode: "On-site · SF",
      window: "Applications open Sep",
      stipend: "$9k / month",
      fitsBecause: "They want evaluation and data-quality instincts, not just models.",
    },
  ],
  "product-manager": [
    {
      title: "Associate PM Intern",
      org: "Swiggy",
      mode: "Hybrid · Bengaluru",
      window: "Summer",
      stipend: "₹55k / month",
      fitsBecause: "Your product thinking coursework plus data literacy fits their case round.",
    },
    {
      title: "Product Intern",
      org: "Freshworks",
      mode: "On-site · Chennai",
      window: "Rolling",
      stipend: "₹40k / month",
      fitsBecause: "SQL literacy is a differentiator for their metrics interviews.",
    },
    {
      title: "APM Intern",
      org: "Atlassian (US)",
      mode: "Remote",
      window: "Applications open Sep–Oct",
      stipend: "$8k / month",
      fitsBecause: "Presenting scores well above benchmark — lean on it.",
    },
  ],
};

export const roleResume: Record<string, string> = {
  "data-analyst":
    "Second-year Computer Science student building analytics depth through coursework in SQL for Real Analytics and Data Viz & Storytelling. Comfortable writing multi-table SQL with window functions, cleaning messy datasets in Python (pandas), and turning results into dashboards that a non-technical reader can act on. Recently built a course-project dashboard tracking a mock e-commerce funnel end to end, from raw exports to a one-page executive summary. Looking for an analytics internship where I can own recurring reporting and sharpen stakeholder communication.",
  "frontend-engineer":
    "Second-year Computer Science student focused on modern front-end engineering, with coursework in React, UX fundamentals and data visualisation. Build accessible, component-driven interfaces with React and TypeScript, and care about performance budgets and keyboard navigation as much as visual polish. Recently shipped a responsive dashboard interface with animated charts and a reusable component library as part of a course project. Seeking a front-end internship where I can contribute to a real design system and learn production review practices.",
  "ml-engineer":
    "Second-year Computer Science student moving from machine-learning coursework into applied, deployable work. Strong Python foundation, hands-on with scikit-learn and pandas, currently completing Cloud Foundations to learn how models actually reach users. Built and evaluated a classification project end to end, including data cleaning, baseline comparison and a written error analysis rather than just an accuracy number. Looking for an ML or applied-AI internship where I can help take a model from notebook to a served endpoint.",
  "product-manager":
    "Second-year Computer Science student pairing technical coursework with product thinking and communication practice. Comfortable reading and writing SQL to answer my own questions, framing problems as measurable outcomes, and presenting recommendations to a room. Recently led a course project from user interviews through scope decisions to a demo, documenting the trade-offs I chose not to build. Seeking a product internship where I can own a small surface area and learn how prioritisation happens under real constraints.",
};

export type SchoolCourse = {
  code: string;
  title: string;
  credits: number;
  grade: string;
  gpa: number;
  emoji: string;
  nextStep: { title: string; why: string };
};

export type Semester = {
  label: string;
  gpa: number;
  courses: SchoolCourse[];
};

export const curriculum: Semester[] = [
  {
    label: "Semester 3 · current",
    gpa: 8.9,
    courses: [
      {
        code: "CS-301",
        title: "Database Systems",
        credits: 4,
        grade: "A",
        gpa: 9.0,
        emoji: "🗄️",
        nextStep: {
          title: "Advanced SQL Patterns",
          why: "School covered normalisation and basic joins. Employers test window functions and query tuning.",
        },
      },
      {
        code: "CS-305",
        title: "Data Structures & Algorithms II",
        credits: 4,
        grade: "A-",
        gpa: 8.5,
        emoji: "🧩",
        nextStep: {
          title: "Timed problem-solving practice, 4 problems a week",
          why: "Interviews test speed under pressure, not just correctness.",
        },
      },
      {
        code: "STA-210",
        title: "Probability & Statistics",
        credits: 3,
        grade: "B+",
        gpa: 7.5,
        emoji: "📐",
        nextStep: {
          title: "Statistics for real datasets (A/B testing basics)",
          why: "Turns textbook theory into the experiment reasoning analysts are asked about.",
        },
      },
    ],
  },
  {
    label: "Semester 2 · completed",
    gpa: 8.6,
    courses: [
      {
        code: "CS-201",
        title: "Object Oriented Programming",
        credits: 4,
        grade: "A",
        gpa: 9.0,
        emoji: "🧱",
        nextStep: {
          title: "Design patterns in a real codebase",
          why: "Reading someone else's code is the skill your first job starts with.",
        },
      },
      {
        code: "CS-215",
        title: "Web Technologies",
        credits: 3,
        grade: "A-",
        gpa: 8.5,
        emoji: "🌐",
        nextStep: {
          title: "React + TypeScript project with tests",
          why: "The syllabus stops at HTML/CSS/JS; teams hire for component frameworks.",
        },
      },
      {
        code: "MAT-202",
        title: "Linear Algebra",
        credits: 3,
        grade: "B+",
        gpa: 7.5,
        emoji: "➗",
        nextStep: {
          title: "Linear algebra applied to ML (vectors → embeddings)",
          why: "Makes machine learning intuitive instead of memorised.",
        },
      },
    ],
  },
  {
    label: "Semester 1 · completed",
    gpa: 8.4,
    courses: [
      {
        code: "CS-101",
        title: "Programming Fundamentals (Python)",
        credits: 4,
        grade: "A",
        gpa: 9.0,
        emoji: "🐍",
        nextStep: {
          title: "Python for data work: pandas + notebooks",
          why: "Same language, the part actually used on the job.",
        },
      },
      {
        code: "CS-110",
        title: "Computer Organisation",
        credits: 3,
        grade: "B",
        gpa: 7.0,
        emoji: "🖥️",
        nextStep: {
          title: "Cloud Foundations",
          why: "Modern equivalent: knowing where your code runs and what it costs.",
        },
      },
      {
        code: "HUM-105",
        title: "Technical Communication",
        credits: 2,
        grade: "A",
        gpa: 9.0,
        emoji: "🎤",
        nextStep: {
          title: "Record a 3-minute project demo every month",
          why: "Communication is your strongest score — keep compounding it.",
        },
      },
    ],
  },
];

export type Reference = {
  title: string;
  author: string;
  subject: string;
  why: string;
  emoji: string;
  length: string;
};

export const books: Reference[] = [
  {
    title: "SQL for Data Scientists",
    author: "Renee M. P. Teate",
    subject: "Database Systems",
    why: "Bridges your coursework into the queries analysts write daily.",
    emoji: "🗄️",
    length: "384 pages",
  },
  {
    title: "Storytelling with Data",
    author: "Cole Nussbaumer Knaflic",
    subject: "Data Viz",
    why: "The single best fix for charts that technically work but don't convince.",
    emoji: "📊",
    length: "288 pages",
  },
  {
    title: "Grokking Algorithms",
    author: "Aditya Bhargava",
    subject: "Data Structures & Algorithms",
    why: "Visual explanations that make DSA revision fast before interviews.",
    emoji: "🧩",
    length: "256 pages",
  },
  {
    title: "Practical Statistics for Data Scientists",
    author: "Bruce & Bruce",
    subject: "Probability & Statistics",
    why: "Connects STA-210 theory to experiments and real sampling problems.",
    emoji: "📐",
    length: "368 pages",
  },
  {
    title: "Refactoring UI",
    author: "Adam Wathan & Steve Schoger",
    subject: "Web Technologies",
    why: "Makes your project work look designed, not just functional.",
    emoji: "🎨",
    length: "220 pages",
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    subject: "Cloud & Systems",
    why: "Read one chapter a fortnight — it pays off for years.",
    emoji: "☁️",
    length: "590 pages",
  },
];

export const podcasts: Reference[] = [
  {
    title: "Data Skeptic",
    author: "Kyle Polich",
    subject: "Probability & Statistics",
    why: "Short episodes that explain statistical ideas without the maths wall.",
    emoji: "🎧",
    length: "~30 min episodes",
  },
  {
    title: "Syntax",
    author: "Wes Bos & Scott Tolinski",
    subject: "Web Technologies",
    why: "Keeps your front-end knowledge current between semesters.",
    emoji: "🎙️",
    length: "~45 min episodes",
  },
  {
    title: "The Analytics Power Hour",
    author: "Michael, Tim & Moe",
    subject: "Data Analytics",
    why: "How analysts actually argue about metrics inside companies.",
    emoji: "📈",
    length: "~60 min episodes",
  },
  {
    title: "Practical AI",
    author: "Changelog",
    subject: "Machine Learning",
    why: "Applied ML stories — great for internship interview small talk.",
    emoji: "🤖",
    length: "~50 min episodes",
  },
  {
    title: "Lenny's Podcast",
    author: "Lenny Rachitsky",
    subject: "Product Thinking",
    why: "Product decision-making explained by people who made them.",
    emoji: "🧭",
    length: "~70 min episodes",
  },
  {
    title: "Soft Skills Engineering",
    author: "Dave & Jamison",
    subject: "Technical Communication",
    why: "The workplace questions no syllabus answers.",
    emoji: "🗣️",
    length: "~35 min episodes",
  },
];

// Why each skill matters to an employer, in plain language.
export const skillWhy: Record<string, string> = {
  Python: "Almost every analysis, automation or model you'll be asked to build starts here.",
  SQL: "It's the first live test in most analytics interviews — you either get the data out or you don't.",
  "Data Viz": "A correct answer nobody understands doesn't get used. This is how your work travels.",
  React: "The fastest way to show your work as something people can click instead of a screenshot.",
  "Cloud Basics": "Teams expect you to run your work somewhere other than your own laptop.",
  "Machine Learning": "Signals you can go beyond describing the past to predicting what's next.",
  "Product Thinking": "Decides whether you're handed instructions or handed problems.",
  Presenting: "The skill that turns good work into a job offer and, later, into influence.",
  "UX Basics": "Helps you build things people can actually use without being told how.",
  "Stakeholder Comms": "Most junior work fails on alignment, not on technique.",
};
