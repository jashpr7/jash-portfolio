import { ArrowDownRight, Sparkles } from "lucide-react";

const stats = [
  ["30+", "Featured works"],
  ["04", "Creative disciplines"],
  ["2+", "Years of experience"],
  ["∞", "Room to experiment"],
];

export function About() {
  return (
    <section id="about" className="about section-pad" aria-labelledby="about-title">
      <div className="about__panel">
        <div className="about__top">
          <span className="eyebrow">03 / ABOUT</span>
          <ArrowDownRight aria-hidden="true" />
        </div>
        <h2 id="about-title" data-reveal>
          I turn raw ideas into <em>visual worlds</em> people can feel.
        </h2>
        <div className="about__content" data-reveal>
          <p className="about__lead">
            I’m Jash Prajapati, a multidisciplinary designer working across identity, editorial systems, video editing, motion and 3D art.
          </p>
          <div className="about__copy">
            <p>
              My approach balances clear design thinking with controlled experimentation. Every frame, texture and transition should strengthen the idea not distract from it.
            </p>
            <p>
              I create visually striking posters, cinematic edits, immersive digital experiences, and modern websites that combine creativity, storytelling, and technology.
            </p>
          </div>
        </div>
        <div className="about__signature" aria-hidden="true">
          <Sparkles /> Curious by default. Precise by choice.
        </div>
      </div>
      <div className="about__stats">
        {stats.map(([value, label]) => (
          <div key={label} className="stat" data-reveal>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
