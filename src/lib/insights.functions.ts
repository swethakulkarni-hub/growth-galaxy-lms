import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  kind: z.enum(["gap", "market"]),
  role: z.string(),
  skills: z.array(z.object({ name: z.string(), level: z.number(), required: z.number() })),
});

export type GapBrief = {
  headline: string;
  focus: { skill: string; why: string }[];
  weeks: { label: string; action: string }[];
};

export type InsightResult = {
  text: string;
  ai: boolean;
  brief?: GapBrief;
};

function fallbackBrief(role: string, skills: { name: string; level: number; required: number }[]) {
  const top = [...skills]
    .map((s) => ({ ...s, gap: Math.max(0, s.required - s.level) }))
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3);
  return {
    headline: `You're already in range for ${role}. Three skills are doing most of the holding back — fix them in four focused weeks.`,
    focus: top.map((s) => ({
      skill: s.name,
      why: `You're at ${s.level} and the role expects ${s.required}. Closing this ${s.gap}-point gap is the fastest lift to your readiness score.`,
    })),
    weeks: [
      { label: "Week 1", action: `Drill ${top[0]?.name ?? "your top gap"} for 25 focused minutes a day.` },
      { label: "Week 2", action: "Apply it in one small project you can screenshot and explain." },
      { label: "Week 3", action: `Close the second gap: ${top[1]?.name ?? "your next skill"}.` },
      { label: "Week 4", action: "Record a 3-minute demo and add it to your resume and portfolio." },
    ],
  } as GapBrief;
}

function fallbackMarket(role: string) {
  return `Demand for ${role} is holding steady, with hiring concentrated in teams that need people who can both analyse and communicate. AI-adjacent skills are the biggest multiplier this quarter, cloud fundamentals are becoming table stakes, and purely manual workflows are cooling fast. Pick one rising skill, pair it with a portfolio artefact, and you'll read as market-ready.`;
}

const briefSchema = z.object({
  headline: z.string(),
  focus: z.array(z.object({ skill: z.string(), why: z.string() })).min(1),
  weeks: z.array(z.object({ label: z.string(), action: z.string() })).min(1),
});

export const getInsight = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<InsightResult> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    const fb: InsightResult =
      data.kind === "gap"
        ? { text: "", ai: false, brief: fallbackBrief(data.role, data.skills) }
        : { text: fallbackMarket(data.role), ai: false };

    if (!apiKey) return fb;

    const gapLines = data.skills
      .map((s) => `${s.name}: you ${s.level}/100, role needs ${s.required}/100`)
      .join("; ");

    const prompt =
      data.kind === "gap"
        ? `A 2nd-year computer science student is targeting the role of ${data.role}. Their skill profile: ${gapLines}. Return ONLY compact JSON, no markdown fences, shaped exactly like {"headline":string,"focus":[{"skill":string,"why":string}],"weeks":[{"label":string,"action":string}]}. headline: one encouraging sentence under 25 words. focus: exactly the 3 biggest gaps, each "why" one short sentence naming the numbers. weeks: exactly 4 entries labelled "Week 1".."Week 4", each action one short imperative sentence.`
        : `Write a short market briefing (max 120 words) for a student targeting ${data.role} in 2026. Cover which skills are heating up, which are cooling, what employers screen for first, and one specific move this month. Plain prose, no markdown, second person.`;

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content:
                "You are a sharp, motivating career coach for university students. You write tight, specific, jargon-free prose.",
            },
            { role: "user", content: prompt },
          ],
        }),
      });

      if (!res.ok) return fb;
      const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const text = json.choices?.[0]?.message?.content?.trim();
      if (!text) return fb;

      if (data.kind === "market") return { text, ai: true };

      const cleaned = text
        .replace(/^```(?:json)?/i, "")
        .replace(/```$/, "")
        .trim();
      const parsed = briefSchema.safeParse(JSON.parse(cleaned));
      if (!parsed.success) return fb;
      return { text: "", ai: true, brief: parsed.data };
    } catch {
      return fb;
    }
  });
