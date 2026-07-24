"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "00 / Prologue" },
  { href: "/story", label: "01 / Story" },
  { href: "/now", label: "02 / Current Mission" },
  { href: "/shows", label: "03 / Comedy" },
  { href: "/progress", label: "04 / Progress" },
  { href: "/gallery", label: "05 / Gallery" },
  { href: "/notebook", label: "06 / Notebook" },
  { href: "/blueprints", label: "07 / Blueprints" },
  { href: "/firsts", label: "08 / Wall of Firsts" },
  { href: "/dreams", label: "09 / Dreams" },
  { href: "/archive", label: "10 / Archive" }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-50 text-warm-white mix-blend-difference hover:opacity-70 transition-opacity"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-inter)",
          fontSize: "var(--text-sm)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Menu
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "var(--color-charcoal)",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "var(--space-xl)",
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "2rem",
                right: "2rem",
                background: "none",
                border: "none",
                color: "var(--color-text)",
                cursor: "pointer",
                fontFamily: "var(--font-inter)",
                fontSize: "var(--text-sm)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Close
            </button>

            <nav style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", alignItems: "flex-start" }}>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "var(--text-2xl)",
                      color: "var(--color-text)",
                      textDecoration: "none",
                      position: "relative",
                      display: "inline-block",
                      transition: "opacity 0.4s ease",
                    }}
                    className="nav-item-editorial"
                  >
                    <span style={{ 
                      fontSize: "var(--text-sm)", 
                      fontFamily: "var(--font-inter)", 
                      color: "var(--color-text-muted)",
                      position: "absolute",
                      left: "-3rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      opacity: 0,
                      transition: "all 0.4s ease"
                    }} className="nav-index">
                      {link.label.split('/')[0].trim()}
                    </span>
                    {link.label.split('/')[1].trim()}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <style jsx>{`
              .nav-item-editorial:hover {
                opacity: 0.7;
              }
              .nav-item-editorial:hover .nav-index {
                opacity: 1;
                left: "-2rem";
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
