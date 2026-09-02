import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, RotateCw } from "lucide-react";
import { motion } from "motion/react";
import { getInsight } from "@/lib/insights.functions";

export function AiPanel({
  kind,
  role,
  skills,
  title,
}: {
  kind: "gap" | "market";
  role: string;
  skills: { name: string; level: number; required: number }[];
  title: string;
}) {
  const fetchInsight = useServerFn(getInsight);
  const query = useQuery({
    queryKey: ["insight", kind, role],
    queryFn: () => fetchInsight({ data: { kind, role, skills } }),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="gradient-brand relative overflow-hidden rounded-3xl p-[1.5px] shadow-lift"
    >
      <div className="rounded-3xl bg-card p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="gradient-brand flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="text-xs text-muted-foreground">
                Personalized for {role} · AI generated
              </p>
            </div>
          </div>
          <button
            onClick={() => query.refetch()}
            disabled={query.isFetching}
            className="flex items-center gap-2 rounded-2xl bg-muted px-3 py-2 text-xs font-bold text-foreground transition-colors hover:bg-accent disabled:opacity-60"
          >
            <RotateCw className={`h-4 w-4 ${query.isFetching ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {query.isPending ? (
          <div className="mt-4 space-y-2.5">
            <div className="h-3.5 w-full animate-pulse rounded-full bg-muted" />
            <div className="h-3.5 w-11/12 animate-pulse rounded-full bg-muted" />
            <div className="h-3.5 w-10/12 animate-pulse rounded-full bg-muted" />
            <div className="h-3.5 w-8/12 animate-pulse rounded-full bg-muted" />
          </div>
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-foreground/85">
            {query.data?.text ??
              "Insights are taking a break right now — try refreshing in a moment."}
          </p>
        )}
      </div>
    </motion.section>
  );
}
