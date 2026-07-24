"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const socials = [
  { name: "Instagram", href: "https://instagram.com/lakshadecomic" },
  { name: "YouTube", href: "https://youtube.com/@lakshadecomic" },
];

export default function SocialMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 90, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <AnimatePresence>
        {isOpen && (
          <div style={{ position: "absolute", bottom: "3.5rem", right: 0, display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end", marginBottom: "1rem" }}>
            {socials.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.3, delay: (socials.length - 1 - index) * 0.05, ease: [0.4, 0, 0.2, 1] }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  className="social-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "100px",
                    background: "var(--color-surface, rgba(255,255,255,0.05))",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "var(--color-warm-white)",
                    textDecoration: "none",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                  }}
                  title={social.name}
                >
                  {social.name}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="social-toggle-btn"
        whileTap={{ scale: 0.95 }}
        style={{
          padding: "0.75rem 1.5rem",
          borderRadius: "100px",
          background: isOpen ? "var(--color-surface, rgba(255,255,255,0.05))" : "var(--color-warm-white)",
          color: isOpen ? "var(--color-warm-white)" : "var(--color-charcoal)",
          border: isOpen ? "1px solid rgba(255,255,255,0.1)" : "none",
          backdropFilter: isOpen ? "blur(10px)" : "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-inter)",
          fontSize: "0.85rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          boxShadow: isOpen ? "none" : "0 4px 12px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
        }}
      >
        {isOpen ? "Close" : "Social"}
      </motion.button>
      
      <style jsx>{`
        .social-btn:hover {
          background: var(--color-warm-white) !important;
          color: var(--color-charcoal) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
