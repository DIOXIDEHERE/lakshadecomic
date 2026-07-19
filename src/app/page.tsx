"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Gallery from "@/components/Gallery";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const // Apple-like ease-out
    }
  }
};

export default function Home() {
  return (
    <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center" }}>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <motion.h1 
          variants={itemVariants}
          style={{ fontSize: "4rem", marginBottom: "1rem", lineHeight: 1.1, minHeight: "4.4rem" }}
        >
          Ab aa hi gaye ho toh...
        </motion.h1>
        
        <div style={{ fontSize: "1.5rem", color: "var(--color-text-muted)", margin: "0 auto 3rem auto", lineHeight: 1.6, minHeight: "8rem" }}>
          <motion.div variants={itemVariants} style={{ marginBottom: "0.5rem" }}>
            Ye website mummy ko mat dikhana.
          </motion.div>
          <motion.div variants={itemVariants} style={{ marginBottom: "0.5rem" }}>
            Aur haan...
          </motion.div>
          <motion.div variants={itemVariants}>
            Please expectations ghar pe rakh ke aana.
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}
        >
          <a 
            href="https://www.instagram.com/lak.shade/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s ease" }}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            Follow on Instagram
          </a>
          
          <a 
            href="https://www.youtube.com/@lakshade12" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s ease" }}>
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
            Watch on YouTube
          </a>
        </motion.div>
      </motion.div>

      {/* Animated Photo Gallery */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Gallery />
      </motion.div>
    </div>
  );
}
