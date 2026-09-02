import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight } from "lucide-react";
import { gapsForRole, targetRoles, trendingCourses } from "@/data/demo";
import { useStudent } from "@/context/StudentContext";
import { PageHeading } from "@/components/AppShell";
import { AiPanel } from "@/components/AiPanel";

export const Route = createFileRoute("/_app/skills")({
  head: () => ({
    meta: [
      { title: "Skill Gap Analysis — SkillForge" },
      {
        name: "description",
        content:
          "Compare your skill levels against the role you want, see gaps ranked by impact, and get an AI-built four-week action path.",
      },
      { property: "og:title", content: "Skill Gap Analysis — SkillForge" },
      {
        property: "og:description",
        content: "Your skills vs role benchmarks, with a personalized plan to close the gap.",
      },
    ],
  }),
  component: SkillsPage,
});

function severity(gap: number) {
  if (gap >= 30) return { label: "Critical", cls: "bg-coral/15 text-coral" };
  if (gap >= 15) return { label: "Focus", cls: "bg-sun/25 text-sun-foreground" };
  if (gap > 0) return { label: "Polish", cls: "bg-sky/20 text-sky-foreground" };
  return { label: "Strength", cls: "bg-lime/25 text-lime-foreground" };
}

function SkillsPage() {
  const { roleId, setRoleId, role } = useStudent();
  const gaps = gapsForRole(roleId);
  const radarData = gaps.map((g) => ({ skill: g.name, you: g.level, role: g.required }));

  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Skill gap analysis"
        title="How close are you, really?"
        blurb="Pick the role you're chasing. We'll line your skills up against what employers actually ask for and rank the gaps by impact."
      />

      <div className="flex flex-wrap gap-2.5">
        {targetRoles.map((r) => (
          <motion.button
            key={r.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => setRoleId(r.id)}
            className={`rounded-2xl px-4 py-2.5 text-sm font-bold transition-all ${
              r.id === roleId
                ? "gradient-brand text-primary-foreground shadow-pop"
                : "bg-card text-muted-foreground shadow-pop hover:text-foreground"
            }`}
          >
            {r.emoji} {r.title}
          </motion.button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1.15fr]">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-pop p-6"
        >
          <h2 className="text-xl font-bold">You vs {role.title}</h2>
          <p className="text-sm text-muted-foreground">{role.blurb}</p>
          <div className="mt-2 h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Role needs"
                  dataKey="role"
                  stroke="var(--chart-3)"
                  fill="var(--chart-3)"
                  fillOpacity={0.18}
                />
                <Radar
                  name="You"
                  dataKey="you"
                  stroke="var(--chart-1)"
                  fill="var(--chart-1)"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-5 text-xs font-bold">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-chart-1" /> You
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-chart-3" /> Role benchmark
            </span>
          </div>
        </motion.section>

        <div className="space-y-5">
          <AiPanel
            kind="gap"
            role={role.title}
            title="Your gap coaching brief"
            skills={gaps.map((g) => ({ name: g.name, level: g.level, required: g.required }))}
          />

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="card-pop p-6"
          >
            <h2 className="text-xl font-bold">Gaps ranked by impact</h2>
            <div className="mt-4 space-y-3">
              {gaps.slice(0, 7).map((g, i) => {
                const sev = severity(g.gap);
                const course = trendingCourses.find((c) => c.closesGap === g.name);
                return (
                  <motion.div
                    key={g.name}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-2xl bg-muted p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-bold">{g.name}</p>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${sev.cls}`}>
                        {sev.label}
                        {g.gap > 0 ? ` · ${g.gap} pts` : ""}
                      </span>
                    </div>
                    <div className="relative mt-3 h-2.5 overflow-hidden rounded-full bg-background">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-coral/35"
                        style={{ width: `${g.required}%` }}
                      />
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${g.level}%` }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-muted-foreground">
                        You {g.level} · needs {g.required}
                      </span>
                      {course && (
                        <span className="flex items-center gap-1 font-bold text-primary">
                          {course.emoji} {course.title} <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
