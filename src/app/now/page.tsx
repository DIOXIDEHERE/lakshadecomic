import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import ProgressRing from "@/components/animations/ProgressRing";
import { getCMSData } from "@/lib/cms";

export const revalidate = 0;

export default async function Now() {
  const data = await getCMSData("mission", {
    status: "Active",
    progress: 37,
    currentGoal: "Become one of Delhi's strongest upcoming comics.",
    currentArc: "Writing 15 minutes of undeniable new material.",
    recentAchievement: "Crushed the late-night spot at The Comedy Club."
  });

  return (
    <div className="container theme-thoughtful" style={{ minHeight: "100vh", paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)", display: "flex", alignItems: "center" }}>
      <main style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-xl)", flexWrap: "wrap", gap: "var(--space-md)" }}>
          <div>
            <FadeIn delay={0.1}>
              <p style={{ fontFamily: "var(--font-inter)", textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
                Status: {data.status}
              </p>
            </FadeIn>
            <h1 style={{ fontSize: "var(--text-3xl)", margin: 0 }}>
              <TextReveal text="Current Mission" />
            </h1>
          </div>

          <FadeIn delay={0.5}>
            <ProgressRing progress={data.progress} />
          </FadeIn>
        </div>

        <div style={{ display: "grid", gap: "var(--space-md)", borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-md)" }}>
          <FadeIn delay={0.6} yOffset={20}>
            <div className="mission-block">
              <span className="mission-label">Current Goal</span>
              <p className="mission-value">{data.currentGoal}</p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.7} yOffset={20}>
            <div className="mission-block">
              <span className="mission-label">Current Arc</span>
              <p className="mission-value">{data.currentArc}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.8} yOffset={20}>
            <div className="mission-block">
              <span className="mission-label">Recent Achievement</span>
              <p className="mission-value">{data.recentAchievement}</p>
            </div>
          </FadeIn>
        </div>

      </main>
    </div>
  );
}
