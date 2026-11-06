import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";

export function DepthSurface({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 190, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 190, damping: 24 });
  return (
    <motion.div
      className={`depth-surface ${className}`}
      style={reduced ? {} : { rotateX, rotateY, transformPerspective: 1200 }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType === "touch") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(-((event.clientY - rect.top) / rect.height - 0.5) * 9);
        y.set(((event.clientX - rect.left) / rect.width - 0.5) * 9);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      whileHover={reduced ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 190, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}