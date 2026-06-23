# Jash Prajapati — Spatial Portfolio V3.8

A light, editorial, scroll-driven portfolio built with Next.js, TypeScript, GSAP, Framer Motion and Lenis. This edition keeps the full V3 gallery, mobile responsiveness, artwork and security configuration, while using a simple Gmail compose workflow for the project form.

## Included

- Jash's supplied profile image
- Six real poster and Blender projects supplied by Jash
- Desktop CSS-3D project orbit driven by vertical scroll
- Horizontal drag controls for the project orbit
- Mobile and reduced-motion horizontal scroll-snap gallery
- Uncropped project previews using `object-fit: contain`
- Full-screen project viewer with keyboard navigation
- Sticky scroll-story section whose visual changes while moving up or down
- Responsive layout for mobile, tablet, laptop, short landscape screens and wide displays
- Safe-area-aware fullscreen mobile navigation
- Project-brief dialog that opens a pre-filled Gmail draft
- Smooth scrolling, reveal animations, custom cursor and ambient canvas particles
- Localhost-first metadata and robots behaviour
- Security headers, disabled production browser source maps and same-origin asset policies

## Run locally

Open the folder containing `package.json` in VS Code and run:

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

## Contact form behaviour

The form does not use Web3Forms, SMTP, an API key, a password, a database or a backend email service.

When a visitor submits the form:

1. The website prepares the entered project information.
2. Gmail Compose opens with `work.jashpr@gmail.com` already entered.
3. The visitor reviews the draft and presses **Send** in Gmail.
4. If a new Gmail tab is blocked, the website falls back to the device's normal email application.

Because there is no email service or backend, the website cannot send the message automatically or confirm delivery. The visitor must press Send.

## Verification commands

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
npm.cmd run start
```

## Main content files

- `data/projects.ts` — project names, categories, descriptions, tools and image paths
- `components/Hero.tsx` — hero text and profile presentation
- `components/SelectedWork.tsx` — 3D orbit and mobile project rail
- `components/ScrollChapters.tsx` — scroll-linked chapter experience
- `components/ContactSection.tsx` — Gmail project-brief form, email and social profiles
- `public/images/projects/` — optimised website project images
- `app/globals.css` — responsive styling and effects
- `next.config.ts` — security and image configuration

## Replace a project

1. Add a WebP image inside `public/images/projects/`.
2. Open `data/projects.ts`.
3. Change the relevant `title`, `category`, `image`, `description`, `tools`, `orientation` and `aspectRatio` values.
4. Keep `object-fit: contain` to prevent artwork cropping.

## Replace the profile image

Replace `public/images/profile-art.webp` with another WebP image using the same filename. A transparent-background portrait works best.

## Add a domain later

The project defaults to localhost. When a final domain is selected, create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

No form credential needs to be added when deploying this Gmail-compose version.

## Security reality

Browser developer tools cannot be reliably hidden or disabled. Anything rendered by a public website is delivered to the visitor's device and can ultimately be inspected or captured. This project uses practical protections instead:

- no original layered or high-resolution source files are shipped
- optimised derivative WebP images are used
- production browser source maps are disabled
- project media blocks casual right-click and drag actions
- ownership labels are present
- CSP and related response headers restrict code and embedding behaviour
- no database, login, secret key or admin panel is exposed

These controls deter casual copying and reduce attack surface, but they cannot make public artwork impossible to save.
