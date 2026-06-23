"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  { id: "top", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "lab", label: "Story" },
  { id: "about", label: "About" },
  { id: "services", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function SectionRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = sections.findIndex((section) => section.id === visible.target.id);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-38% 0px -50%", threshold: [0, 0.15, 0.35, 0.6] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="section-rail" aria-label="Page chapters">
      <span className="section-rail__line" aria-hidden="true">
        <motion.span
          animate={{ y: `${active * 100}%` }}
          transition={{ type: "spring", stiffness: 170, damping: 24 }}
        />
      </span>
      {sections.map((section, index) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={index === active ? "is-active" : ""}
          aria-current={index === active ? "location" : undefined}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{section.label}</span>
        </a>
      ))}
    </nav>
  );
}
