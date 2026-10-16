"use client";

import { MotionConfig } from "motion/react";

/*
 * Réglages communs des animations Motion : si le visiteur a demandé moins
 * d'animations à son système, les déplacements sont supprimés (seuls les
 * fondus d'opacité restent).
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  );
}
