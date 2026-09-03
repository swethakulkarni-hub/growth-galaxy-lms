import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, BookOpen, Headphones } from "lucide-react";
import { books, curriculum, podcasts } from "@/data/career";
import { PageHeading } from "@/components/AppShell";

export const Route = createFileRoute("/_app/curriculum")({
  head: () => ({
    meta: [
      { title: "My Curriculum — Grades, Next Steps & References | SkillForge" },
      {
        name: "description",
        content:
          "Every school course you've completed with grades, one recommended next step per subject, plus books and podcasts for the subjects you're learning.",
      },
      { property: "og:title", content: "My Curriculum — Grades & Next Steps" },
      {
        property: "og:description",
        content: "School grades, one step further per subject, and curated books and podcasts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CurriculumPage,
});

function gradeTone(gpa: number) {
  if (gpa >= 9) return "bg-lime/25 text-lime-foreground";
  if (gpa >= 8) return "bg-sky/20 text-sky-foreground";
  return "bg-sun/25 text-sun-foreground";
}

function CurriculumPage() {
  const all = curriculum.flatMap((s) => s.courses);
  const cgpa = (all.reduce((a, c) => a + c.gpa * c.credits, 0) / all.reduce((a, c) => a + c.credits, 0)).toFixed(2);
  const credits = all.reduce((a, c) => a + c.credits, 0);

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="My curriculum"
        title="What school covered — and one step further"
        blurb="Your completed subjects and grades, with a single recommended next step for each so your coursework turns into something employers recognise."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "CGPA", value: cgpa, hint: "out of 10" },
          { label: "Credits earned", value: String(credits), hint: "across 3 semesters" },
          { label: "Subjects", value: String(all.length), hint: "graded courses" },
        ].map((s) => (
          <div key={s.label} className="card-pop p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {s.label}
            </p>
            <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.hint}</p>
          </div>
        ))}
      </div>

      {curriculum.map((sem, si) => (
        <motion.section
          key={sem.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: si * 0.05 }}
          className="card-pop p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-bold">{sem.label}</h2>
            <span className="rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-primary">
              GPA {sem.gpa}
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {sem.courses.map((c) => (
              <div key={c.code} className="rounded-2xl bg-muted p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold">
                    {c.emoji} {c.title}
                    <span className="ml-2 text-xs font-semibold text-muted-foreground">
                      {c.code} · {c.credits} credits
                    </span>
                  </p>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${gradeTone(c.gpa)}`}>
                    Grade {c.grade}
                  </span>
                </div>
                <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-card p-3">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-xs leading-relaxed">
                    <span className="font-bold text-primary">Go one step further: </span>
                    <span className="font-semibold">{c.nextStep.title}</span>
                    <span className="block text-muted-foreground">{c.nextStep.why}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      ))}

      {[
        { title: "Books for your subjects", icon: BookOpen, items: books },
        { title: "Podcasts for your subjects", icon: Headphones, items: podcasts },
      ].map((group) => (
        <section key={group.title}>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <group.icon className="h-5 w-5 text-primary" /> {group.title}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.items.map((r) => (
              <motion.article
                key={r.title}
                whileHover={{ y: -4 }}
                className="card-pop flex flex-col p-5"
              >
                <span className="text-2xl">{r.emoji}</span>
                <h3 className="mt-2 text-base font-bold">{r.title}</h3>
                <p className="text-xs font-semibold text-muted-foreground">{r.author}</p>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-foreground/80">{r.why}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-bold">
                  <span className="rounded-full bg-primary/12 px-2.5 py-1 text-primary">
                    {r.subject}
                  </span>
                  <span className="text-muted-foreground">{r.length}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
