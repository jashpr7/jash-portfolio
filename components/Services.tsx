"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  { index: "01", title: "Brand Identity", detail: "Visual systems, art direction, campaigns and scalable brand toolkits.", tag: "STRATEGY + SYSTEM" },
  { index: "02", title: "Graphic Design", detail: "Posters, editorial layouts, social content and high-impact key visuals.", tag: "FORM + TYPE" },
  { index: "03", title: "Video & Motion", detail: "Cinematic edits, title design, reels, transitions and motion graphics.", tag: "PACE + ENERGY" },
  { index: "04", title: "3D Art", detail: "Product visuals, stylised environments, lighting and animation studies.", tag: "SPACE + LIGHT" },
];

export function Services() {
  return (
    <section id="services" className="services section-pad" aria-labelledby="services-title">
      <div className="section-heading" data-reveal>
        <div>
          <span className="eyebrow">04 / CAPABILITIES</span>
          <h2 id="services-title">Design across dimensions.</h2>
        </div>
      </div>
      <div className="services__list">
        {services.map((service, index) => (
          <motion.article
            key={service.index}
            className="service-row"
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.75, delay: index * 0.07 }}
            whileHover="hover"
          >
            <span>{service.index}</span>
            <div className="service-row__title">
              <h3>{service.title}</h3>
              <small>{service.tag}</small>
            </div>
            <p>{service.detail}</p>
            <motion.span variants={{ hover: { rotate: 45, scale: 1.08 } }}>
              <ArrowUpRight aria-hidden="true" />
            </motion.span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
