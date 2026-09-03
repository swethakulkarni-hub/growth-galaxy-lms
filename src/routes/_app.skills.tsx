import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { Briefcase, Copy, MapPin, Wallet } from "lucide-react";
import { gapsForRole, targetRoles } from "@/data/demo";
import { roleInternships, roleResume, roleSalaries } from "@/data/career";
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
          "Compare your skills against the role you want, see India and US salary bands, get an AI four-week action path, and find matching internships.",
      },
      { property: "og:title", content: "Skill Gap Analysis — SkillForge" },
      {
        property: "og:description",
        content: "Your skills vs role benchmarks, salary bands and internship opportunities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  const { roleId, setRoleId, role } = useStudent();
  const gaps = gapsForRole(roleId);
  const radarData = gaps.map((g) => ({ skill: g.name, you: g.level, role: g.required }));
  const salaries = roleSalaries[roleId] ?? [];
  const internships = roleInternships[roleId] ?? [];
  const resume = roleResume[roleId] ?? "";

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Skill gap analysis"
        title="How close are you, really?"
        blurb="Pick the role you're chasing. We'll show how your skills line up, what it pays, and what to do next."
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
        <div className="space-y-5">
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-pop p-6"
          >
            <h2 className="text-xl font-bold">You vs {role.title}</h2>
            <p className="text-sm text-muted-foreground">{role.blurb}</p>
            <div className="mt-2 h-[320px]">
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

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="card-pop p-6"
          >
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Wallet className="h-5 w-5 text-primary" /> What {role.title} pays
            </h2>
            <p className="text-sm text-muted-foreground">Typical 2026 bands, before bonuses.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {salaries.map((s) => (
                <div key={s.region} className="rounded-2xl bg-muted p-4">
                  <p className="text-sm font-bold">
                    {s.flag} {s.region}
                  </p>
                  <div className="mt-3 space-y-2">
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

        <AiPanel
          kind="gap"
          role={role.title}
          title="Your gap coaching brief"
          skills={gaps.map((g) => ({ name: g.name, level: g.level, required: g.required }))}
        />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Briefcase className="h-5 w-5 text-primary" /> Career opportunities
          </h2>
          <p className="text-sm text-muted-foreground">
            Internships that match what you're studying right now.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {internships.map((i) => (
            <motion.article key={i.title} whileHover={{ y: -4 }} className="card-pop flex flex-col p-5">
              <h3 className="text-base font-bold">{i.title}</h3>
              <p className="text-xs font-semibold text-muted-foreground">{i.org}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {i.mode}
              </p>
              <p className="mt-3 flex-1 text-xs leading-relaxed text-foreground/80">
                {i.fitsBecause}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-bold">
                <span className="rounded-full bg-lime/25 px-2.5 py-1 text-lime-foreground">
                  {i.stipend}
                </span>
                <span className="text-muted-foreground">{i.window}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="card-pop p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold">Add this to your resume</h3>
              <p className="text-sm text-muted-foreground">
                Written from the courses you're taking — paste it under your summary and edit a
                line or two.
              </p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(resume);
                toast.success("Resume paragraph copied 📋");
              }}
              className="flex items-center gap-2 rounded-2xl bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/20"
            >
              <Copy className="h-4 w-4" /> Copy
            </button>
          </div>
          <p className="mt-4 rounded-2xl bg-muted p-4 text-sm leading-relaxed text-foreground/85">
            {resume}
          </p>
        </div>
      </motion.section>
    </div>
  );
}
