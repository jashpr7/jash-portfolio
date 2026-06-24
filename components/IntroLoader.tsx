"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const INTRO_STORAGE_KEY = "jp-light-intro-seen";
const INTRO_DURATION_MS = 1350;
const FAILSAFE_CLOSE_MS = 2600;

export function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    let closeTimer = 0;
    let failsafeTimer = 0;
    let mounted = true;

    const closeLoader = () => {
      if (!mounted) return;

      setProgress(100);

      try {
        window.sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
      } catch {
        // Storage can be unavailable in strict privacy modes.
      }

      closeTimer = window.setTimeout(() => {
        if (mounted) setVisible(false);
      }, 120);
    };

    // Always schedule a fallback before reading browser storage.
    // This prevents the loader from trapping the page if storage or animation fails.
    failsafeTimer = window.setTimeout(closeLoader, FAILSAFE_CLOSE_MS);

    try {
      if (window.sessionStorage.getItem(INTRO_STORAGE_KEY)) {
        closeLoader();

        return () => {
          mounted = false;
          window.cancelAnimationFrame(animationFrame);
          window.clearTimeout(closeTimer);
          window.clearTimeout(failsafeTimer);
        };
      }
    } catch {
      // Continue normally when sessionStorage is blocked.
    }

    const startedAt = performance.now();

    const tick = (time: number) => {
      if (!mounted) return;

      const nextProgress = Math.min(
        100,
        Math.round(((time - startedAt) / INTRO_DURATION_MS) * 100),
      );

      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrame = window.requestAnimationFrame(tick);
      } else {
        closeLoader();
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      mounted = false;
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(closeTimer);
      window.clearTimeout(failsafeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
            pointerEvents: "none",
          }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
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

          <div className="loader__bar">
            <span style={{ transform: `scaleX(${progress / 100})` }} />
          </div>

          <div className="loader__meta">
            <span>VISUAL DESIGN / MOTION / 3D</span>
            <span>{progress.toString().padStart(3, "0")}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
