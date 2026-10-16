"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Barre de progression de lecture, fine et rouge, sous l'en-tête.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-20 z-40 h-px origin-left bg-[#d00018]"
      style={{ scaleX }}
    />
  );
}
