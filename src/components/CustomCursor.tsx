"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<"default" | "link" | "view" | "click" | "play">("default");

  useEffect(() => {
    // Only run on desktop/devices with a mouse
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (target.tagName.toLowerCase() === "a" || target.closest("a")) {
        setCursorState("link");
      } else if (target.tagName.toLowerCase() === "button" || target.closest("button")) {
        setCursorState("click");
      } else if (target.tagName.toLowerCase() === "img" || target.closest("img")) {
        setCursorState("view");
      } else if (target.tagName.toLowerCase() === "video" || target.closest("video")) {
        setCursorState("play");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      width: 32,
      height: 32,
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      opacity: 0.5,
      border: "1px solid var(--color-warm-white)",
      backgroundColor: "transparent",
    },
    link: {
      width: 64,
      height: 64,
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      opacity: 0.2,
      border: "1px solid var(--color-warm-white)",
      backgroundColor: "var(--color-warm-white)",
    },
    view: {
      width: 80,
      height: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      opacity: 1,
      border: "none",
      backgroundColor: "var(--color-warm-white)",
    },
    click: {
      width: 80,
      height: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      opacity: 1,
      border: "none",
      backgroundColor: "var(--color-warm-white)",
    },
    play: {
      width: 80,
      height: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      opacity: 1,
      border: "none",
      backgroundColor: "var(--color-warm-white)",
    }
  };

  const textVariants = {
    default: { opacity: 0 },
    link: { opacity: 0 },
    view: { opacity: 1 },
    click: { opacity: 1 },
    play: { opacity: 1 }
  };

  const getCursorText = () => {
    switch (cursorState) {
      case "view": return "VIEW";
      case "click": return "CLICK";
      case "play": return "PLAY";
      default: return "";
    }
  };

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="custom-cursor-ring hidden md:flex"
        variants={variants}
        animate={cursorState}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mixBlendMode: "difference"
        }}
      >
        <motion.span
          variants={textVariants}
          animate={cursorState}
          style={{
            color: "var(--color-charcoal)", // Dark text on light circle (because of mix-blend-mode it flips)
            fontSize: "10px",
            fontWeight: "bold",
            letterSpacing: "0.1em",
            fontFamily: "var(--font-inter)",
          }}
        >
          {getCursorText()}
        </motion.span>
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="custom-cursor-dot hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: cursorState === "default" ? 1 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 50,
          mass: 0.1
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: "var(--color-warm-white)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10000,
          mixBlendMode: "difference"
        }}
      />
    </>
  );
}
