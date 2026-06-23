"use client";

import { projects } from "@/data/projects";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const chapters = [
  {
    index: "A",
    label: "COMPOSE",
    title: "Build the frame before decorating it.",
    copy: "Strong hierarchy, proportion and visual direction give every effect a reason to exist. The BMW i7 study starts with a clear advertising composition, then layers weather, type and reflection around it.",
    projectIndex: 0,
  },
  {
    index: "B",
    label: "SIMULATE",
    title: "Turn systems into atmosphere.",
    copy: "Procedural tools become expressive when density, light and scale are art-directed. The galaxy study uses structure first, then colour and glow to create depth rather than visual noise.",
    projectIndex: 2,
  },
  {
    index: "C",
    label: "LIGHT",
    title: "Make space feel cinematic.",
    copy: "The GT-R environment is driven by contrast: hard automotive surfaces against soft neon bounce, wet-floor reflections and oversized environmental graphics.",
    projectIndex: 3,
  },
  {
    index: "D",
    label: "REFINE",
    title: "Remove until only the idea remains.",
    copy: "The BMW M4 poster uses a quieter system—clean panels, controlled spacing and a direct product silhouette—to prove that impact does not always require complexity.",
    projectIndex: 4,
  },
];

export function ScrollChapters() {
  const rootRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.chapterIndex ?? 0);
        setActive(index);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.6, 1] },
    );

    panelRefs.current.forEach((panel) => panel && observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  const chapter = chapters[active];
  const project = projects[chapter.projectIndex];

  return (
    <section ref={rootRef} id="lab" className="scroll-chapters" aria-labelledby="chapters-title">
      <div className="scroll-chapters__intro section-grid" data-reveal>
        <div>
          <span className="eyebrow">02 / SCROLL STORY</span>
          <h2 id="chapters-title">One visual travels through every chapter.</h2>
        </div>
      </div>

      <div className="scroll-chapters__layout section-grid">
        <div className="scroll-chapters__visual" style={{ "--chapter-accent": project.accent } as CSSProperties}>
          <div className="scroll-chapters__portal" aria-hidden="true">
            <span /><span /><span />
          </div>
          <div className="scroll-chapters__frame">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.slug}
                className="scroll-chapters__image"
                initial={{ opacity: 0, scale: 0.93, rotate: -2, filter: "blur(15px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.04, rotate: 2, filter: "blur(15px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  draggable={false}
                  sizes="(max-width: 900px) 88vw, 46vw"
                />
              </motion.div>
            </AnimatePresence>
            <span className="scroll-chapters__frame-index">{chapter.index}</span>
            <span className="scroll-chapters__frame-label">{chapter.label}</span>
          </div>
          <div className="scroll-chapters__meter" aria-hidden="true">
            {chapters.map((item, index) => (
              <span key={item.index} className={index === active ? "is-active" : ""} />
            ))}
          </div>
        </div>

        <div className="scroll-chapters__panels">
          {chapters.map((item, index) => (
            <article
              ref={(node) => { panelRefs.current[index] = node; }}
              key={item.index}
              data-chapter-index={index}
              className={`scroll-chapter ${index === active ? "is-active" : ""}`}
            >
              <div className="scroll-chapter__top">
                <span>{item.index}</span>
                <span>{item.label}</span>
                <Sparkles aria-hidden="true" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <div className="scroll-chapter__project">
                <span>Referenced work</span>
                <strong>{projects[item.projectIndex].shortTitle}</strong>
              </div>
              <ArrowDownRight className="scroll-chapter__arrow" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
