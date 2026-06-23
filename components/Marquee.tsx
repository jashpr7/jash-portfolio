export function Marquee() {
  const primary = "GRAPHIC DESIGN · VIDEO EDITING · 3D ART · MOTION · BRANDING · ";
  const secondary = "SHAPE THE IDEA · BUILD THE WORLD · MOVE THE FRAME · ";

  return (
    <div className="marquee-stack" aria-label="Creative services and philosophy">
      <div className="marquee marquee--primary">
        <div className="marquee__track">
          <span>{primary}</span>
          <span aria-hidden="true">{primary}</span>
        </div>
      </div>
      <div className="marquee marquee--secondary">
        <div className="marquee__track marquee__track--reverse">
          <span>{secondary}</span>
          <span aria-hidden="true">{secondary}</span>
        </div>
      </div>
    </div>
  );
}
