"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

<button type="button" onClick={() => scrollToSection("work")}>
  WORK
</button>

<button type="button" onClick={() => scrollToSection("story")}>
  STORY
</button>

<button type="button" onClick={() => scrollToSection("about")}>
  ABOUT
</button>

<button type="button" onClick={() => scrollToSection("services")}>
  SERVICES
</button>

<button type="button" onClick={() => scrollToSection("contact")}>
  CONTACT
</button>
const email = "work.jashpr@gmail.com";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={`nav-wrap${open ? " is-open" : ""}`}>
      <button
        type="button"
          onClick={() => scrollToSection("top")}
          className="navbar__logo">
        JASH
      </button>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a className="availability" href={`mailto:${email}`}>
        <span className="availability__dot" aria-hidden="true" />
        Available for work
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ clipPath: "circle(0% at calc(100% - 38px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 38px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 38px) 40px)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-menu__glow" aria-hidden="true" />
            <div className="mobile-menu__links">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ y: 42, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + index * 0.065 }}
                  onClick={() => setOpen(false)}
                >
                  <span>0{index + 1}</span>
                  {link.label}
                </motion.a>
              ))}
            </div>
            <a className="mobile-menu__email" href={`mailto:${email}`}>
              {email} <ArrowUpRight size={17} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  window.history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search,
  );
};
