import { ArrowDownRight } from "lucide-react";

const stages = [
  {
    index: "01",
    title: "Discover",
    text: "Understand the objective, audience, references and emotional territory before touching the visuals.",
  },
  {
    index: "02",
    title: "Define",
    text: "Turn the direction into a clear visual concept, hierarchy, palette and repeatable creative system.",
  },
  {
    index: "03",
    title: "Create",
    text: "Build, test and refine the work across still, motion and spatial formats with detail-level control.",
  },
  {
    index: "04",
    title: "Deliver",
    text: "Prepare polished, organised assets that work consistently across platforms, screens and campaigns.",
  },
];

export function Process() {
  return (
    <section className="process section-pad" aria-labelledby="process-title">
      <div className="process__heading" data-reveal>
        <span className="eyebrow">05 / PROCESS</span>
        <h2 id="process-title">Chaos in.<br /><em>Clarity out.</em></h2>
        <p>A focused process keeps the outcome bold without making the project feel random.</p>
        <ArrowDownRight aria-hidden="true" />
      </div>
      <div className="process__steps">
        {stages.map((stage) => (
          <article key={stage.index} className="process-step" data-reveal>
            <span>{stage.index}</span>
            <h3>{stage.title}</h3>
            <p>{stage.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
