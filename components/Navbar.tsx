"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Story", href: "#lab" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const email = "work.jashpr@gmail.com";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={`nav-wrap${open ? " is-open" : ""}`}>
      <a className="brand magnetic" href="#top" aria-label="Jash Prajapati, home">
        JASH<span></span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <a key={link.href} className="nav-link" href={link.href}>
            <span>{link.label}</span>
            <span aria-hidden="true">{link.label}</span>
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
