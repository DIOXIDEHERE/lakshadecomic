"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Story" },
  { href: "/shows", label: "Shows" },
  { href: "/gallery", label: "Gallery" },
  { href: "/journal", label: "Journal" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reveal nav after hero loads
    const timer = setTimeout(() => setIsVisible(true), 1500);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            top: isScrolled ? "1rem" : "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            padding: isScrolled ? "0.5rem 1.5rem" : "1rem 2.5rem",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "100px",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: isScrolled ? "0 10px 30px rgba(0,0,0,0.2)" : "none",
          }}
          className="floating-nav"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link-premium ${isActive ? "active" : ""}`}
                style={{
                  position: "relative",
                  fontFamily: "var(--font-inter)",
                  fontSize: "var(--text-sm)",
                  color: isActive ? "var(--color-warm-white)" : "var(--color-text-muted)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.05em",
                }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: "var(--color-warm-white)",
                      boxShadow: "0 0 8px rgba(246, 244, 239, 0.5)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          <style jsx>{`
            .nav-link-premium {
              display: inline-block;
            }
            .nav-link-premium:hover {
              color: var(--color-warm-white) !important;
              letter-spacing: 0.1em !important;
              text-shadow: 0 0 10px rgba(255,255,255,0.3);
            }
          `}</style>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
