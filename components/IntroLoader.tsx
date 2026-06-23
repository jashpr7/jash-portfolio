"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const seen = window.sessionStorage.getItem("jp-light-intro-seen");
    if (seen) {
      const hideTimer = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(hideTimer);
    }

    const startedAt = performance.now();
    let frame = 0;
    const tick = (time: number) => {
      const value = Math.min(100, Math.round(((time - startedAt) / 1150) * 100));
      setProgress(value);
      if (value < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem("jp-light-intro-seen", "1");
      setVisible(false);
    }, 1300);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="loader__glow" />
          <motion.div
            className="loader__mark"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
          >
            JASH
          </motion.div>
          <div className="loader__bar"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
          <div className="loader__meta">
            <span>VISUAL DESIGN / MOTION / 3D</span>
            <span>{progress.toString().padStart(3, "0")}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
