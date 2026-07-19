"use client";

import { motion } from "framer-motion";

const images = [
  { src: "/1.jpg", alt: "Stand-up comedy performance 1", rotation: -1.5, floatDelay: 0 },
  { src: "/2.jpg", alt: "Stand-up comedy performance 2", rotation: 1.2, floatDelay: 0.5 },
  { src: "/3.jpg", alt: "Stand-up comedy performance 3", rotation: -0.8, floatDelay: 1 },
  { src: "/4.jpg", alt: "Stand-up comedy performance 4", rotation: 1.8, floatDelay: 1.5 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export default function Gallery() {
  return (
    <div 
      style={{
        marginTop: "4rem",
        width: "100%",
        maxWidth: "1000px",
        padding: "0 1rem"
      }}
    >
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        style={{ 
          fontSize: "2rem", 
          marginBottom: "2rem", 
          textAlign: "center"
        }}
      >
        In Action
      </motion.h2>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          paddingBottom: "2rem"
        }}
      >
        {images.map((img, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            style={{ perspective: 1000 }}
          >
            <motion.div
              animate={{
                y: ["-3px", "3px", "-3px"],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: img.floatDelay
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <motion.div
                initial={{ rotate: img.rotation, scale: 1, filter: "brightness(1)" }}
                whileHover={{ 
                  rotate: 0, 
                  scale: 1.05, 
                  filter: "brightness(1.05)",
                  boxShadow: "0 15px 35px rgba(59, 130, 246, 0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{
                  position: "relative",
                  aspectRatio: "7/8",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  transformOrigin: "center center",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                <img 
                  src={img.src} 
                  alt={img.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    position: "absolute",
                    top: 0,
                    left: 0
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
