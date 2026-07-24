"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
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

  const progress = data.progress;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

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
            <div style={{ position: "relative", width: "100px", height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--color-border)" strokeWidth="2" />
                <motion.circle 
                  cx="50" cy="50" r="40" fill="transparent" 
                  stroke="var(--color-warm-white)" strokeWidth="2"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: "absolute", fontFamily: "var(--font-inter)", fontSize: "var(--text-lg)", fontWeight: "bold" }}>
                {progress}%
              </div>
            </div>
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

      <style jsx>{`
        .mission-block {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: var(--space-sm) 0;
        }
        .mission-label {
          font-family: var(--font-inter);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
        }
        .mission-value {
          font-family: var(--font-playfair);
          font-size: var(--text-xl);
          color: var(--color-warm-white);
          margin: 0;
        }
      `}</style>
    </div>
  );
}
