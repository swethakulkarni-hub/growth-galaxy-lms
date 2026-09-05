import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Users } from "lucide-react";
import { gapsForRole, trendingCourses, trendingSkills } from "@/data/demo";
import { useStudent } from "@/context/StudentContext";
import { PageHeading } from "@/components/AppShell";
import { AiPanel } from "@/components/AiPanel";
import { Sparkline } from "@/components/CountUp";

export const Route = createFileRoute("/_app/market")({
  head: () => ({
    meta: [
      { title: "Market Pulse — Trending Skills & Courses | PathPilot" },
      {
        name: "description",
        content:
          "See which skills are heating up, which are cooling, salary ranges and openings trends by role, plus the courses employers value most right now.",
      },
      { property: "og:title", content: "Market Pulse — Trending Skills & Courses" },
      {
        property: "og:description",
        content: "Live-style demand signals for skills, roles and courses, with an AI briefing.",
      },
    ],
  }),
  component: MarketPage,
});

function MarketPage() {
  const { role, roleId } = useStudent();
  const rising = trendingSkills.filter((s) => s.state === "rising");
  const cooling = trendingSkills.filter((s) => s.state === "cooling");
  const gaps = gapsForRole(roleId ?? role.id);

  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Market pulse"
        title="What the market wants this month"
        blurb="Demand signals for skills, roles and courses — so you spend your study hours on things people are actually hiring for."
      />

      <AiPanel
        kind="market"
        role={role.title}
        title={`Market briefing · ${role.title}`}
        skills={gaps.map((g) => ({ name: g.name, level: g.level, required: g.required }))}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {[
          { title: "Heating up", items: rising, up: true },
          { title: "Cooling down", items: cooling, up: false },
        ].map((group) => (
          <motion.section
            key={group.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-pop p-6"
          >
            <h2 className="text-xl font-bold">{group.title}</h2>
            <div className="mt-4 space-y-3">
              {group.items.map((s) => (
                <div key={s.name} className="rounded-2xl bg-muted p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-bold">{s.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{s.note}</p>
                    </div>
                    <span
                      className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                        group.up ? "bg-primary/15 text-primary" : "bg-coral/15 text-coral"
                      }`}
                    >
                      {group.up ? (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5" />
                      )}
                      {s.growth > 0 ? "+" : ""}
                      {s.growth}%
                    </span>
                  </div>
                  <Sparkline
                    data={s.trend}
                    className={group.up ? "stroke-primary" : "stroke-coral"}
                  />
                  <div className="mt-1 flex items-center gap-2 text-[11px] font-bold text-muted-foreground">
                    <span>Demand index</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-background">
                      <div
                        className={`h-full rounded-full ${group.up ? "bg-primary" : "bg-coral"}`}
                        style={{ width: `${s.demand}%` }}
                      />
                    </div>
                    <span>{s.demand}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-xl font-bold">Trending courses, ranked by market relevance</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trendingCourses.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -5 }}
              className="card-pop p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{c.emoji}</span>
                <span className="rounded-full bg-primary/12 px-2.5 py-1 text-[11px] font-bold text-primary">
                  {c.relevance}% match
                </span>
              </div>
              <h3 className="mt-3 text-base font-bold">{c.title}</h3>
              <p className="text-xs text-muted-foreground">{c.provider}</p>
              <div className="mt-3 flex items-center gap-3 text-[11px] font-bold text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {c.learners}
                </span>
                <span>{c.weeks} weeks</span>
              </div>
              <p className="mt-3 inline-block rounded-full bg-lime/20 px-2.5 py-1 text-[11px] font-bold text-lime-foreground">
                Builds your {c.closesGap}
              </p>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
