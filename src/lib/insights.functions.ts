import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  kind: z.enum(["gap", "market"]),
  role: z.string(),
  skills: z.array(z.object({ name: z.string(), level: z.number(), required: z.number() })),
});

function fallback(kind: "gap" | "market", role: string) {
  if (kind === "gap") {
    return `Your profile is already competitive for ${role} — the fastest wins are the three gaps listed below. Spend the next 4 weeks like this: week 1 drill the biggest gap daily for 25 minutes, week 2 apply it in a small project, week 3 close the second gap, week 4 record a short demo and add it to your portfolio. Consistency beats intensity: a 25-minute streak will move your readiness score faster than one long weekend.`;
  }
  return `Demand for ${role} is holding steady with hiring concentrated in teams that need people who can both analyse and communicate. AI-adjacent skills are the biggest multiplier this quarter, cloud fundamentals are becoming table stakes, and purely manual workflows are cooling fast. Pick one rising skill, pair it with a portfolio artefact, and you'll read as market-ready.`;
}

export const getInsight = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { text: fallback(data.kind, data.role), ai: false };

    const gapLines = data.skills
      .map((s) => `${s.name}: you ${s.level}/100, role needs ${s.required}/100`)
      .join("; ");

    const prompt =
      data.kind === "gap"
        ? `A 2nd-year computer science student is targeting the role of ${data.role}. Their skill profile: ${gapLines}. Write a punchy, encouraging coaching brief (max 130 words): name their top 3 gaps and give a concrete 4-week action path with weekly focus. Plain prose, no markdown, no headings, second person, energetic but not cheesy.`
        : `Write a short market briefing (max 130 words) for a student targeting ${data.role} in 2026. Cover: which skills are heating up, which are cooling, what employers screen for first, and one specific move to make this month. Plain prose, no markdown, no bullet points, second person, confident and concrete.`;

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

      if (!res.ok) return { text: fallback(data.kind, data.role), ai: false };
      const json = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = json.choices?.[0]?.message?.content?.trim();
      if (!text) return { text: fallback(data.kind, data.role), ai: false };
      return { text, ai: true };
    } catch {
      return { text: fallback(data.kind, data.role), ai: false };
    }
  });
