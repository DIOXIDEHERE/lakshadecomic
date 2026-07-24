"use client";

import { motion } from "framer-motion";

export default function FadeIn({
  children,
  delay = 0,
  duration = 1,
  yOffset = 30,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
