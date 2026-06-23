"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Instagram,
  Linkedin,
  LockKeyhole,
  Mail,
  Sparkles,
  X,
  Youtube,
} from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

const email = "work.jashpr@gmail.com";

type SubmitState = "idle" | "opened" | "error";

const socials = [
  {
    label: "Instagram",
    handle: "@jash7.fx",
    href: "https://www.instagram.com/jash7.fx/",
    icon: <Instagram aria-hidden="true" />,
  },
  {
    label: "LinkedIn",
    handle: "Jash Prajapati",
    href: "https://www.linkedin.com/in/jash-prajapati-811611296",
    icon: <Linkedin aria-hidden="true" />,
  },
  {
    label: "YouTube",
    handle: "@nottjashh",
    href: "https://www.youtube.com/@nottjashh",
    icon: <Youtube aria-hidden="true" />,
  },
];

function readFormValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (!briefOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBriefOpen(false);
    };

    document.body.classList.add("brief-open");
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.classList.remove("brief-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [briefOpen]);

  const openBrief = () => {
    setSubmitState("idle");
    setSubmitMessage("");
    setBriefOpen(true);
  };

  const closeBrief = () => {
    setBriefOpen(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const submitToGmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;

    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    const formData = new FormData(formElement);

    if (formData.get("botcheck")) {
      setSubmitState("error");
      setSubmitMessage("The form could not be opened. Please try again.");
      return;
    }

    const name = readFormValue(formData, "name");
    const senderEmail = readFormValue(formData, "email");
    const service = readFormValue(formData, "service");
    const timeline = readFormValue(formData, "timeline");
    const budget = readFormValue(formData, "budget");
    const message = readFormValue(formData, "message");

    const subject = `New portfolio project brief — ${service}`;
    const body = [
      "Hello Jash,",
      "",
      "I would like to discuss a new creative project.",
      "",
      `Name: ${name}`,
      `Email: ${senderEmail}`,
      `Project type: ${service}`,
      `Timeline: ${timeline}`,
      `Budget: ${budget}`,
      "",
      "Project details:",
      message,
      "",
      "Sent from the Jash Prajapati portfolio contact form.",
    ].join("\n");

    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1&tf=1" +
      `&to=${encodeURIComponent(email)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    const mailtoUrl =
      `mailto:${email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    const gmailWindow = window.open("about:blank", "_blank");

    if (gmailWindow) {
      gmailWindow.opener = null;
      gmailWindow.location.replace(gmailUrl);
    } else {
      window.location.href = mailtoUrl;
    }

    setSubmitState("opened");
    setSubmitMessage(
      "Your Gmail draft has opened. Review the project details and press Send in Gmail.",
    );
  };

  return (
    <>
      <section id="contact" className="contact section-pad" aria-labelledby="contact-title">
        <div className="contact__mesh" aria-hidden="true" />
        <div className="contact__orb contact__orb--one" aria-hidden="true" />
        <div className="contact__orb contact__orb--two" aria-hidden="true" />

        <span className="eyebrow" data-reveal>
          06 / START A PROJECT
        </span>

        <h2 id="contact-title" data-reveal>
          Have an idea?
          <br />
          Let&apos;s make it <em>impossible to ignore.</em>
        </h2>

        <div className="contact__actions" data-reveal>
          <button
            className="contact-launcher magnetic"
            type="button"
            onClick={openBrief}
            aria-haspopup="dialog"
          >
            <span className="contact-launcher__icon" aria-hidden="true">
              <Sparkles size={20} />
            </span>

            <span className="contact-launcher__copy">
              <small>Tell me what you are building</small>
              Start a project
            </span>

            <span className="contact-launcher__arrow" aria-hidden="true">
              <ArrowUpRight size={22} />
            </span>
          </button>

          <button className="copy-email" type="button" onClick={copyEmail} aria-live="polite">
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Email copied" : email}
          </button>
        </div>

        

        <div className="contact__socials" data-reveal>
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
              <span>{social.icon}</span>
              <span>
                <small>{social.label}</small>
                {social.handle}
              </span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {briefOpen && (
          <motion.div
            className="brief-dialog"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeBrief();
            }}
          >
            <motion.div
              className="brief-dialog__panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="brief-dialog-title"
              initial={{ y: 40, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 28, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="brief-dialog__header">
                <div>
                  <span>NEW CREATIVE PROJECT</span>
                  <h3 id="brief-dialog-title">Build your project brief.</h3>
                </div>

                <button type="button" onClick={closeBrief} aria-label="Close project brief">
                  <X aria-hidden="true" />
                </button>
              </div>

              <form className="brief-form" onSubmit={submitToGmail}>
                <label className="brief-form__field">
                  <span>Your name</span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="How should I address you?"
                    minLength={2}
                    maxLength={80}
                    required
                  />
                </label>

                <label className="brief-form__field">
                  <span>Your email</span>
                  <input
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    maxLength={254}
                    required
                  />
                </label>

                <label className="brief-form__field">
                  <span>Project type</span>
                  <select name="service" defaultValue="Graphic design / posters">
                    <option>Graphic design / posters</option>
                    <option>Video editing / cinematic reel</option>
                    <option>Motion graphics</option>
                    <option>VFX / compositing</option>
                    <option>3D art / Blender render</option>
                    <option>Creative direction / mixed media</option>
                  </select>
                </label>

                <label className="brief-form__field">
                  <span>Timeline</span>
                  <select name="timeline" defaultValue="2–4 weeks">
                    <option>As soon as possible</option>
                    <option>1–2 weeks</option>
                    <option>2–4 weeks</option>
                    <option>1–2 months</option>
                    <option>Flexible / to be discussed</option>
                  </select>
                </label>

                <label className="brief-form__field brief-form__field--wide">
                  <span>Budget range</span>
                  <select name="budget" defaultValue="To be discussed">
                    <option>To be discussed</option>
                    <option>₹5,000–₹15,000</option>
                    <option>₹15,000–₹40,000</option>
                    <option>₹40,000–₹1,00,000</option>
                    <option>₹1,00,000+</option>
                  </select>
                </label>

                <label className="brief-form__field brief-form__field--wide">
                  <span>What do you want to create?</span>
                  <textarea
                    name="message"
                    rows={5}
                    minLength={20}
                    maxLength={2000}
                    placeholder="Share the objective, deliverables, visual direction and anything else that matters."
                    required
                  />
                </label>

                <label className="brief-form__trap" aria-hidden="true">
                  <span>Leave this field empty</span>
                  <input name="botcheck" type="checkbox" tabIndex={-1} autoComplete="off" />
                </label>

                <div className="brief-form__footer">
                  <div className="brief-form__status" aria-live="polite" data-state={submitState}>
                    {submitState === "opened" ? (
                      <Check size={16} aria-hidden="true" />
                    ) : (
                      <Mail size={15} aria-hidden="true" />
                    )}
                    <span>
                      {submitMessage ||
                        `Your project details will open in Gmail, addressed to ${email}.`}
                    </span>
                  </div>

                  <button className="brief-form__submit" type="submit">
                    {submitState === "opened" ? "Open Gmail again" : "Continue to Gmail"}
                    {submitState === "opened" ? (
                      <Check size={18} aria-hidden="true" />
                    ) : (
                      <ArrowRight size={18} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
