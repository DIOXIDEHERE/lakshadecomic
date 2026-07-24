"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const socials = [
  { name: "Instagram", href: "https://instagram.com/lakshadecomic", icon: "IG" },
  { name: "YouTube", href: "https://youtube.com/@lakshadecomic", icon: "YT" },
  { name: "Mail", href: "mailto:hello@lakshade.com", icon: "EM" },
  { name: "Maps", href: "#", icon: "MP" },
];

export default function SocialMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 90 }}>
      <AnimatePresence>
        {isOpen && (
          <div style={{ position: "absolute", bottom: "4rem", right: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {socials.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.3, delay: (socials.length - 1 - index) * 0.05, type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  className="social-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    background: "var(--color-surface, rgba(255,255,255,0.05))",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "var(--color-warm-white)",
                    textDecoration: "none",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    transition: "all 0.3s ease",
                  }}
                  title={social.name}
                >
                  {social.icon}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="social-toggle-btn"
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "50%",
          background: "var(--color-warm-white)",
          color: "var(--color-charcoal)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          boxShadow: isOpen ? "0 0 20px rgba(246, 244, 239, 0.4)" : "0 4px 12px rgba(0,0,0,0.2)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        +
      </motion.button>
      
      <style jsx>{`
        .social-btn:hover {
          background: var(--color-warm-white) !important;
          color: var(--color-charcoal) !important;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
