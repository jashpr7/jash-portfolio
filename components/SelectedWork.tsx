"use client";

import { projects } from "@/data/projects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, MoveHorizontal } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ProjectLightbox } from "./ProjectLightbox";

const segment = 360 / projects.length;

function normaliseAngle(value: number) {
  return ((value + 180) % 360 + 360) % 360 - 180;
}

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const scrollRotation = useRef(0);
  const manualRotation = useRef(0);
  const dragging = useRef(false);
  const pointerStart = useRef(0);
  const rotationStart = useRef(0);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const renderOrbit = useCallback(() => {
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const theta = index * segment + scrollRotation.current + manualRotation.current;
      const normalised = normaliseAngle(theta);
      const radians = (normalised * Math.PI) / 180;
      const frontness = (Math.cos(radians) + 1) / 2;
      const distance = Math.abs(normalised);

      card.style.setProperty("--theta", `${theta}deg`);
      card.style.setProperty("--theta-neg", `${-theta}deg`);
      card.style.setProperty("--orbit-scale", `${0.76 + frontness * 0.24}`);
      card.style.setProperty("--orbit-opacity", `${0.32 + frontness * 0.68}`);
      card.style.setProperty("--orbit-blur", `${(1 - frontness) * 1.8}px`);
      card.style.zIndex = String(Math.round(frontness * 100));

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeRef.current) {
      activeRef.current = closestIndex;
      setActiveIndex(closestIndex);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    renderOrbit();

    const media = gsap.matchMedia();
    media.add("(min-width: 960px) and (prefers-reduced-motion: no-preference)", () => {
      if (!sectionRef.current) return undefined;

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.7,
        onUpdate: (self) => {
          scrollRotation.current = self.progress * -360;
          renderOrbit();
        },
      });

      return () => trigger.kill();
    });

    return () => media.revert();
  }, [renderOrbit]);

  const rotateBy = useCallback((amount: number) => {
    manualRotation.current += amount;
    renderOrbit();
  }, [renderOrbit]);

  const pointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging.current = true;
    pointerStart.current = event.clientX;
    rotationStart.current = manualRotation.current;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    manualRotation.current = rotationStart.current + (event.clientX - pointerStart.current) * 0.26;
    renderOrbit();
  };

  const pointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const openProject = (index: number) => setSelectedIndex(index);
  const closeProject = useCallback(() => setSelectedIndex(null), []);
  const nextProject = useCallback(() => {
    setSelectedIndex((current) => (current === null ? 0 : (current + 1) % projects.length));
  }, []);
  const previousProject = useCallback(() => {
    setSelectedIndex((current) => (current === null ? 0 : (current - 1 + projects.length) % projects.length));
  }, []);

  const activeProject = projects[activeIndex];

  return (
    <>
      <section ref={sectionRef} id="work" className="orbit-work" aria-labelledby="work-title">
        <div className="orbit-work__sticky">
          <div className="orbit-work__heading section-grid" data-reveal>
            <div>
              <span className="eyebrow">01 / SELECTED WORK</span>
              <h2 id="work-title">A gallery with its own gravity.</h2>
            </div>
            
          </div>

          <div
            className="orbit-stage"
            onPointerDown={pointerDown}
            onPointerMove={pointerMove}
            onPointerUp={pointerUp}
            onPointerCancel={pointerUp}
          >
            <div className="orbit-stage__halo" aria-hidden="true" />
            <div className="orbit-stage__grid" aria-hidden="true" />

            <div className="orbit-ring" aria-label="Interactive three-dimensional project gallery">
              {projects.map((project, index) => (
                <button
                  ref={(node) => { cardRefs.current[index] = node; }}
                  key={project.slug}
                  type="button"
                  className={`orbit-card orbit-card--${project.orientation}`}
                  style={{
                    "--project-accent": project.accent,
                    "--project-soft": project.softAccent,
                    "--project-ratio": project.aspectRatio,
                  } as CSSProperties}
                  onClick={() => openProject(index)}
                  aria-label={`Open ${project.title}`}
                  data-cursor="view"
                >
                  <span className="orbit-card__media" data-protected-media onContextMenu={(event) => event.preventDefault()}>
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      draggable={false}
                      sizes="(max-width: 959px) 84vw, 340px"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    <span className="orbit-card__shield" aria-hidden="true">JASH </span>
                  </span>
                  <span className="orbit-card__meta">
                    <span>{project.number}</span>
                    <strong>{project.shortTitle}</strong>
                    <ArrowUpRight aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>

            <div className="orbit-stage__controls">
              <button type="button" onClick={() => rotateBy(segment)} aria-label="Previous project">
                <ArrowLeft aria-hidden="true" />
              </button>
              <span><MoveHorizontal aria-hidden="true" /> Drag / scroll</span>
              <button type="button" onClick={() => rotateBy(-segment)} aria-label="Next project">
                <ArrowRight aria-hidden="true" />
              </button>
            </div>

            <div className="orbit-stage__info" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.slug}
                  initial={{ y: 14, opacity: 0, filter: "blur(7px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -10, opacity: 0, filter: "blur(7px)" }}
                  transition={{ duration: 0.35 }}
                >
                  <span>{activeProject.category}</span>
                  <strong>{activeProject.title}</strong>
                </motion.div>
              </AnimatePresence>
              <span>{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="project-rail" aria-label="Selected projects">
            {projects.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                className="project-rail__card"
                style={{
                  "--project-accent": project.accent,
                  "--project-soft": project.softAccent,
                } as CSSProperties}
                onClick={() => openProject(index)}
              >
                <span className={`project-rail__media project-rail__media--${project.orientation}`}>
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    draggable={false}
                    sizes="82vw"
                  />
                </span>
                <span className="project-rail__meta">
                  <span>{project.number}</span>
                  <span><strong>{project.shortTitle}</strong><small>{project.category}</small></span>
                  <ArrowUpRight aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <ProjectLightbox
        project={selectedIndex === null ? null : projects[selectedIndex]}
        open={selectedIndex !== null}
        onClose={closeProject}
        onNext={nextProject}
        onPrevious={previousProject}
      />
    </>
  );
}
