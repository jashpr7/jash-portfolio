"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Asterisk, Sparkles } from "lucide-react";
import type { MouseEvent } from "react";

const specialties = ["Photoshop", "Motion", "VFX", "Blender"];

export function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 130, damping: 22 });
  const smoothY = useSpring(y, { stiffness: 130, damping: 22 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);
  const shineX = useTransform(smoothX, [-0.5, 0.5], ["18%", "82%"]);
  const shineY = useTransform(smoothY, [-0.5, 0.5], ["18%", "82%"]);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section id="top" className="hero section-grid" aria-labelledby="hero-title">
      <div className="hero__aurora hero__aurora--one" aria-hidden="true" />
      <div className="hero__aurora hero__aurora--two" aria-hidden="true" />

      <motion.div
        className="hero__kicker"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.7 }}
      >
        <span><Sparkles size={14} /> Independent multidisciplinary designer</span>
        <span>Gujarat / India</span>
      </motion.div>

      <h1 id="hero-title" className="hero__title" aria-label="Design without limits">
        <motion.span
          className="hero__line hero__line--one"
          initial={{ y: "110%", rotate: 2 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ delay: 0.92, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          DESIGN
        </motion.span>
        <motion.span
          className="hero__line hero__line--two"
          initial={{ y: "110%", rotate: -2 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ delay: 1.02, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          WITHOUT
        </motion.span>
        <motion.span
          className="hero__line hero__line--three"
          initial={{ y: "110%", rotate: 1.5 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ delay: 1.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <em>LIMITS</em><Asterisk aria-hidden="true" />
        </motion.span>
      </h1>

      <motion.div
        className="hero__portrait"
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        onMouseMove={handleMove}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        initial={{ opacity: 0, scale: 0.86, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: -2 }}
        transition={{ delay: 1.12, duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        data-cursor="view"
      >
        <div className="hero__portrait-orbit" aria-hidden="true">
          <span>IDEAS · FORM · MOTION · STORY ·</span>
        </div>
        <div className="hero__portrait-frame" data-protected-media>
          <Image
            src="/images/profile-art.webp"
            alt="Portrait of Jash Prajapati, graphic designer and 3D artist"
            fill
            priority
            sizes="(max-width: 680px) 78vw, (max-width: 1100px) 42vw, 30vw"
          />
          <motion.div
            className="hero__portrait-shine"
            style={{ left: shineX, top: shineY }}
            aria-hidden="true"
          />
          <div className="hero__portrait-grid" aria-hidden="true" />
        </div>
        <span className="hero__portrait-label">JASH PRAJAPATI / VISUAL DESIGNER</span>
        <span className="hero__portrait-stamp">PLAY<br />BOLD</span>
      </motion.div>

      <motion.div
        className="hero__intro"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, duration: 0.8 }}
      >
        <ArrowDownRight aria-hidden="true" />
        <p>
          Graphic designer, video editor, VFX artist and 3D creator building cinematic posters, spatial renders and motion-led digital experiences.
        </p>
      </motion.div>

      <motion.a
        className="hero__cta button button--ink magnetic"
        href="#work"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.45, duration: 0.8 }}
      >
        Enter the project orbit <ArrowUpRight size={18} aria-hidden="true" />
      </motion.a>

      <motion.div
        className="hero__specialties"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.55, duration: 0.8 }}
        aria-label="Creative specialties"
      >
        {specialties.map((specialty) => <span key={specialty}>{specialty}</span>)}
      </motion.div>

      <div className="hero__index" aria-hidden="true">
        <span>01</span>
        <span>08</span>
      </div>

      <div className="hero__scroll-bridge" aria-hidden="true">
        <span>SCROLL TO ROTATE THE GALLERY</span>
        <i />
      </div>
    </section>
  );
}
