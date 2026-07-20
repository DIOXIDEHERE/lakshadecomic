"use client";

import { useState, useRef, useEffect } from "react";

export default function SocialDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="nav-link" 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "0.5rem",
          background: "transparent",
          cursor: "pointer",
          fontSize: "1rem",
          fontFamily: "inherit",
          border: "none"
        }}
      >
        Socials
        <svg 
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          right: 0,
          marginTop: "0.5rem",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "0.5rem",
          padding: "0.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          minWidth: "150px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          zIndex: 50,
          animation: "fadeIn 0.2s ease-out"
        }}>
          <a 
            href="https://www.instagram.com/lak.shade/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            style={{ padding: "0.75rem 1rem", borderRadius: "0.25rem", color: "var(--color-text)", textDecoration: "none", transition: "background 0.2s" }}
            onMouseOver={(e) => e.currentTarget.style.background = "var(--color-surface-hover)"}
            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
          >
            Instagram
          </a>
          <a 
            href="https://www.youtube.com/@lakshade12" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            style={{ padding: "0.75rem 1rem", borderRadius: "0.25rem", color: "var(--color-text)", textDecoration: "none", transition: "background 0.2s" }}
            onMouseOver={(e) => e.currentTarget.style.background = "var(--color-surface-hover)"}
            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
          >
            YouTube
          </a>
        </div>
      )}
    </div>
  );
}
