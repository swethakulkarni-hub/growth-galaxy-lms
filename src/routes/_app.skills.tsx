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
import { AlertCircle, Wallet } from "lucide-react";
import { gapsForRole, targetRoles } from "@/data/demo";
import { roleSalaries, skillWhy } from "@/data/career";
import { useStudent } from "@/context/StudentContext";
import { PageHeading } from "@/components/AppShell";
import { AiPanel } from "@/components/AiPanel";

export const Route = createFileRoute("/_app/skills")({
  head: () => ({
    meta: [
      { title: "Skill Gap Analysis — PathPilot" },
      {
        name: "description",
        content:
          "See your current level against the target for the role you're exploring, which gap matters most and why, plus India and US salary bands.",
      },
      { property: "og:title", content: "Skill Gap Analysis — PathPilot" },
      {
        property: "og:description",
        content: "Current vs target skill levels, gap sizes, priority and why each one matters.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillsPage,
});

function priorityOf(gap: number, required: number) {
  const weight = gap * (required / 100);
  if (weight >= 25) return { label: "High", tone: "bg-primary text-primary-foreground" };
  if (weight >= 10) return { label: "Medium", tone: "bg-primary/15 text-primary" };
  return { label: "Low", tone: "bg-muted text-muted-foreground" };
}

function SkillsPage() {
  const { roleId, setRoleId, role } = useStudent();
  const gaps = gapsForRole(roleId ?? targetRoles[0]!.id);
  const radarData = gaps.map((g) => ({ skill: g.name, you: g.level, role: g.required }));
  const salaries = roleSalaries[role.id] ?? [];
  const top = gaps[0]!;

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Skill gap analysis"
        title="Where is the gap?"
        blurb="Based on where you want to go, PathPilot continuously shows you what you're missing and what you should do next."
      />

      <div className="flex flex-wrap gap-2.5">
        {targetRoles.map((r) => (
          <motion.button
            key={r.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => setRoleId(r.id)}
            className={`rounded-2xl px-4 py-2.5 text-sm font-bold transition-all ${
              r.id === role.id
                ? "gradient-brand text-primary-foreground shadow-pop"
                : "bg-card text-muted-foreground shadow-pop hover:text-foreground"
            }`}
          >
            {r.title}
          </motion.button>
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-pop p-6"
      >
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <AlertCircle className="h-4 w-4" /> Your highest-priority gap
        </p>
        <h2 className="mt-1.5 text-2xl font-bold">{top.name}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-muted p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Here's why
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">
              {role.title} roles expect about {top.required} out of 100 here and you're at{" "}
              {top.level} — a {top.gap}-point gap, the widest of any skill on your profile.{" "}
              {skillWhy[top.name]}
            </p>
          </div>
          <div className="rounded-2xl bg-muted p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Here's what you can do about it
            </p>
            <ul className="mt-1.5 space-y-1.5 text-sm leading-relaxed text-foreground/85">
              <li>· Spend 25 focused minutes a day on {top.name} for the next two weeks.</li>
              <li>· Use it once in a small piece of real work you can show someone.</li>
              <li>· Write two lines about it for your resume while it's fresh.</li>
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-pop overflow-hidden p-6"
      >
        <h2 className="text-xl font-bold">Your skills vs {role.title}</h2>
        <p className="text-sm text-muted-foreground">
          Current level, the target for this role, the gap between them, and why it matters.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <th className="pb-2 pr-4">Skill</th>
                <th className="pb-2 pr-4">Current</th>
                <th className="pb-2 pr-4">Target</th>
                <th className="pb-2 pr-4">Gap</th>
                <th className="pb-2 pr-4">Priority</th>
                <th className="pb-2">Why this matters</th>
              </tr>
            </thead>
            <tbody>
              {gaps.map((g) => {
                const p = priorityOf(g.gap, g.required);
                return (
                  <tr key={g.name} className="border-t border-border align-top">
                    <td className="py-3 pr-4 font-bold">{g.name}</td>
                    <td className="py-3 pr-4">{g.level}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{g.required}</td>
                    <td className="py-3 pr-4 font-bold text-primary">
                      {g.gap > 0 ? `+${g.gap}` : "—"}
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${p.tone}`}>
                        {p.label}
                      </span>
                    </td>
                    <td className="py-3 text-xs leading-relaxed text-muted-foreground">
                      {skillWhy[g.name]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.section>

      <div className="grid gap-5 xl:grid-cols-[1fr_1.1fr]">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-pop p-6"
        >
          <h2 className="text-xl font-bold">The same picture, at a glance</h2>
          <p className="text-sm text-muted-foreground">{role.blurb}</p>
          <div className="mt-2 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Target"
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
              <span className="h-2.5 w-2.5 rounded-full bg-chart-3" /> Role target
            </span>
          </div>
        </motion.section>

        <AiPanel
          kind="gap"
          role={role.title}
          title="What to do next"
          skills={gaps.map((g) => ({ name: g.name, level: g.level, required: g.required }))}
        />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-pop p-6"
      >
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Wallet className="h-5 w-5 text-primary" /> What {role.title} pays
        </h2>
        <p className="text-sm text-muted-foreground">Typical 2026 bands, before bonuses.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {salaries.map((s) => (
            <div key={s.region} className="rounded-2xl bg-muted p-4">
              <p className="text-sm font-bold">{s.region}</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Fresher
                  </p>
                  <p className="font-display text-lg font-bold text-primary">{s.fresher}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    3–5 years
                  </p>
                  <p className="font-display text-lg font-bold">{s.mid}</p>
                </div>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
