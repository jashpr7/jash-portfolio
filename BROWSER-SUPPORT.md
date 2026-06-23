# Browser and Device Support

Target browsers:

- current Chrome and Edge
- current Firefox
- current Safari on macOS and iOS
- current Android Chrome

Responsive modes:

- desktop: scroll-driven CSS-3D orbit
- tablet and mobile: native horizontal scroll-snap project gallery
- reduced-motion: static accessible gallery without pinned motion
- coarse pointer: hover-only effects are removed

The layout uses `clamp()`, safe-area insets, `svh` with `vh` fallbacks, responsive Next.js images and content-sized typography. Project art is rendered with `object-fit: contain`, so posters and landscape renders remain fully visible rather than being cropped.
