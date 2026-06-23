"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { About } from "./About";
import { AmbientScene } from "./AmbientScene";
import { AssetGuard } from "./AssetGuard";
import { ContactSection } from "./ContactSection";
import { CustomCursor } from "./CustomCursor";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { IntroLoader } from "./IntroLoader";
import { Marquee } from "./Marquee";
import { Navbar } from "./Navbar";
import { Process } from "./Process";
import { ScrollChapters } from "./ScrollChapters";
import { ScrollProgress } from "./ScrollProgress";
import { SectionRail } from "./SectionRail";
import { SelectedWork } from "./SelectedWork";
import { Services } from "./Services";
import { SmoothScroll } from "./SmoothScroll";

export function SiteShell() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !root.current) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 56, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 1.15,
            ease: "power3.inOut",
            scrollTrigger: { trigger: line, start: "top 92%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const amount = Number(element.dataset.parallax || 8);
        gsap.fromTo(
          element,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("main > section:not(.orbit-work)").forEach((section) => {
        gsap.fromTo(
          section,
          { "--section-shift": "24px" },
          {
            "--section-shift": "0px",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 44%",
              scrub: true,
            },
          },
        );
      });
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, []);

  return (
    <SmoothScroll>
      <div ref={root} className="site-shell">
        <AssetGuard />
        <IntroLoader />
        <AmbientScene />
        <ScrollProgress />
        <CustomCursor />
        <SectionRail />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <SelectedWork />
          <ScrollChapters />
          <About />
          <Services />
          <Process />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
