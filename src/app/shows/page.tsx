"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";

// Mock data (will come from CMS)
const mockShows = [
  { id: 1, date: "Oct 15", venue: "The Comedy Club", time: "8:00 PM", status: "upcoming", link: "#" },
  { id: 2, date: "Sep 28", venue: "Laugh Lounge", time: "9:00 PM", status: "past" },
  { id: 3, date: "Sep 14", venue: "Delhi Open Mic", time: "7:30 PM", status: "past" },
];

export default function Shows() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  const upcomingShows = mockShows.filter(s => s.status === "upcoming");
  
  return (
    <div className="container" style={{ minHeight: "100vh", paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}>
      <main style={{ maxWidth: "600px", margin: "0 auto" }}>
        
        <h1 style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-xl)", textAlign: "center" }}>
          <TextReveal text="Shows." />
        </h1>

        {upcomingShows.length === 0 && (
          <FadeIn delay={0.5}>
            <p style={{ textAlign: "center", fontStyle: "italic", color: "var(--color-text-muted)" }}>
              Loading the next chapter...
            </p>
          </FadeIn>
        )}

        <div style={{ position: "relative", marginTop: "var(--space-xl)" }}>
          {/* Vertical Timeline Line */}
          <div style={{ 
            position: "absolute", 
            left: "40px", 
            top: 0, 
            bottom: 0, 
            width: "1px", 
            background: "linear-gradient(to bottom, var(--color-border), transparent)" 
          }} />

          {mockShows.map((show, index) => {
            const isHovered = hoveredId === show.id;
            const isUpcoming = show.status === "upcoming";
            
            return (
              <FadeIn key={show.id} delay={0.2 + index * 0.1} yOffset={20}>
                <div 
                  onMouseEnter={() => setHoveredId(show.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    position: "relative",
                    paddingLeft: "80px",
                    paddingBottom: "var(--space-lg)",
                    opacity: isUpcoming ? 1 : 0.5,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {/* Timeline Dot */}
                  <div style={{
                    position: "absolute",
                    left: "36px",
                    top: "8px",
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: isUpcoming ? "var(--color-warm-white)" : "var(--color-border)",
                    boxShadow: isUpcoming ? "0 0 10px rgba(246, 244, 239, 0.5)" : "none",
                    transition: "all 0.3s ease",
                    transform: isHovered ? "scale(1.5)" : "scale(1)",
                  }} />

                  <motion.div 
                    animate={{ x: isHovered ? 10 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {show.date} — {show.time}
                    </p>
                    <h3 style={{ fontSize: "var(--text-xl)", margin: "0.5rem 0", color: "var(--color-warm-white)" }}>
                      {show.venue}
                    </h3>
                    
                    <AnimatePresence>
                      {isHovered && isUpcoming && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{ overflow: "hidden", marginTop: "1rem" }}
                        >
                          <a href={show.link} className="btn-editorial" style={{ fontSize: "0.75rem", padding: "0.5rem 1rem" }}>
                            Get Tickets
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </FadeIn>
            );
          })}
        </div>

      </main>
    </div>
  );
}
