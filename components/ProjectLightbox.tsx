"use client";

import type { Project } from "@/data/projects";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";

export function ProjectLightbox({
  project,
  open,
  onClose,
  onNext,
  onPrevious,
}: {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrevious();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onNext, onPrevious, open]);

  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-lightbox-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <motion.div
            className="project-lightbox__panel"
            initial={{ y: 36, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ "--project-accent": project.accent } as CSSProperties}
          >
            <header className="project-lightbox__header">
              <div>
                <span>{project.number} / SELECTED WORK</span>
                <h2 id="project-lightbox-title">{project.title}</h2>
              </div>
              <button ref={closeRef} type="button" onClick={onClose} aria-label="Close project viewer">
                <X aria-hidden="true" />
              </button>
            </header>

            <div
              className={`project-lightbox__media project-lightbox__media--${project.orientation}`}
              data-protected-media
              onContextMenu={(event) => event.preventDefault()}
            >
              <Image
                src={project.image}
                alt={project.alt}
                fill
                priority
                draggable={false}
                sizes="(max-width: 900px) 94vw, 72vw"
              />
              <span className="project-lightbox__watermark" aria-hidden="true">JASH 2026</span>
            </div>

            <footer className="project-lightbox__footer">
              <div className="project-lightbox__copy">
                <p>{project.description}</p>
                <div className="project-lightbox__tools">
                  {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
                </div>
              </div>
              <div className="project-lightbox__navigation" aria-label="Project navigation">
                <button type="button" onClick={onPrevious} aria-label="Previous project">
                  <ArrowLeft aria-hidden="true" /> Previous
                </button>
                <button type="button" onClick={onNext} aria-label="Next project">
                  Next <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
