"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/*
 * Parallaxe légère : le média glisse un peu plus lentement que la page.
 * Il est agrandi de 12 % pour que les bords ne se découvrent jamais.
 */
export default function ParallaxMedia({
  children,
  distance = 6,
}: {
  children: React.ReactNode;
  // Amplitude en % de la hauteur du cadre.
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${distance}%`, `${distance}%`]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y, scale: 1.12 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
