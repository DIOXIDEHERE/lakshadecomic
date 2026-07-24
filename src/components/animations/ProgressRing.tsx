"use client";

import { motion } from "framer-motion";

export default function ProgressRing({ progress }: { progress: number }) {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
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
  );
}
