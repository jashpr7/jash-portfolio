const isMobile = window.innerWidth <= 768;

// ==========================
// SCROLL ARROW — INTERACTIVE
// ==========================

const scrollArrow = document.getElementById('scroll-arrow');

if (scrollArrow) {
  scrollArrow.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      // Use Lenis if available, otherwise fallback to native smooth scroll
      if (window.lenis) {
        window.lenis.scrollTo(aboutSection, { duration: 1.6, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Pulse animation feedback
    scrollArrow.style.transform = 'scale(0.88)';
    setTimeout(() => scrollArrow.style.transform = '', 250);
  });
}

// ==========================
// CUSTOM CURSOR
// ==========================

const cursor =
document.querySelector(".cursor");

if(!isMobile){
document.addEventListener("mousemove", (e) => {

  cursor.style.left =
  e.clientX + "px";

  cursor.style.top =
  e.clientY + "px";

});
}

// ==========================
// CURSOR HOVER
// ==========================

const hoverItems =
document.querySelectorAll(
  "a, button, .tag, .skill-card, .project-card"
);

hoverItems.forEach((item) => {

  item.addEventListener("mouseenter", () => {

    cursor.style.width = "60px";
    cursor.style.height = "60px";

    cursor.style.background =
    "rgba(255,255,255,0.08)";

  });

  item.addEventListener("mouseleave", () => {

    cursor.style.width = "22px";
    cursor.style.height = "22px";

    cursor.style.background = "transparent";

  });

});

// ==========================
// IMAGE PARALLAX
// ==========================

const image =
document.querySelector(".image-container");

document.addEventListener("mousemove", (e) => {

  const x =
  (window.innerWidth / 2 - e.clientX) / 18;

  const y =
  (window.innerHeight / 2 - e.clientY) / 18;

  image.style.transform = `
    translate(-50%, -50%)
    perspective(2200px)
    rotateY(${x}deg)
    rotateX(${-y}deg)
    scale(1.02)
  `;

});

// ==========================
// TAG PARALLAX
// ==========================

const tags =
document.querySelectorAll(".tag");

document.addEventListener("mousemove", (e) => {

  let x =
  e.clientX / window.innerWidth;

  let y =
  e.clientY / window.innerHeight;

  tags.forEach((tag, index) => {

    let speed =
    (index + 1) * 15;

    tag.style.transform =
    `translate(${x * speed}px,
    ${y * speed}px)`;

  });

});

// ==========================
// PROJECT PARALLAX
// ==========================

const projectCards =
document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

  card.addEventListener("mousemove", (e) => {

    const rect =
    card.getBoundingClientRect();

    const x =
    e.clientX - rect.left;

    const y =
    e.clientY - rect.top;

    const centerX =
    rect.width / 2;

    const centerY =
    rect.height / 2;

    const rotateX =
    (y - centerY) / 30;

    const rotateY =
    (centerX - x) / 30;

    const image =
    card.querySelector(".project-image");

    image.style.transform = `
      perspective(2000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.02)
    `;

  });

  card.addEventListener("mouseleave", () => {

    const image =
    card.querySelector(".project-image");

    image.style.transform = `
      perspective(2000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;

  });

});
// ==========================
// CREATIVE WALL PARALLAX
// ==========================

const wallItems =
document.querySelectorAll(".wall-item");

wallItems.forEach((item) => {

  item.addEventListener("mousemove", (e) => {

    const rect =
    item.getBoundingClientRect();

    const x =
    e.clientX - rect.left;

    const y =
    e.clientY - rect.top;

    const centerX =
    rect.width / 2;

    const centerY =
    rect.height / 2;

    const rotateX =
    (y - centerY) / 25;

    const rotateY =
    (centerX - x) / 25;

    item.style.transform = `
      perspective(2000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;

  });

  item.addEventListener("mouseleave", () => {

    item.style.transform = "";

  });

});

// =========================================
// LENIS SMOOTH SCROLL
// =========================================

const lenis = window.lenis = new Lenis({

  duration: 1.2,

  smoothWheel: true,

  easing: (t) => {

    return Math.min(
      1,
      1.001 - Math.pow(2, -10 * t)
    );

  }

});

function raf(time){

  lenis.raf(time);

  requestAnimationFrame(raf);

}

requestAnimationFrame(raf);

// =========================================
// GSAP REGISTER
// =========================================

gsap.registerPlugin(ScrollTrigger);

// =========================================
// HERO ENTRANCE
// =========================================

gsap.from(".navbar",{

  y:-100,
  opacity:0,

  duration:1.2,

  ease:"power4.out"

});

gsap.from(".hero-text",{

  scale:1.4,
  opacity:0,

  duration:1.5,

  ease:"expo.out"

});

gsap.from(".image-container",{

  y:120,
  opacity:0,
  scale:0.8,

  duration:1.5,

  ease:"power4.out"

});

gsap.from(".tag",{

  opacity:0,
  scale:0,

  duration:1,

  stagger:0.15,

  ease:"back.out(2)"

});

// =========================================
// REVEAL ANIMATIONS
// =========================================

gsap.utils.toArray(".reveal-up").forEach((el)=>{

  gsap.to(el,{

    y:0,
    opacity:1,

    duration:1.2,

    ease:"power4.out",

    scrollTrigger:{

      trigger:el,

      start:"top 85%"

    }

  });

});

gsap.utils.toArray(".reveal-left").forEach((el)=>{

  gsap.to(el,{

    x:0,
    opacity:1,

    duration:1.2,

    ease:"power4.out",

    scrollTrigger:{

      trigger:el,

      start:"top 85%"

    }

  });

});

gsap.utils.toArray(".reveal-right").forEach((el)=>{

  gsap.to(el,{

    x:0,
    opacity:1,

    duration:1.2,

    ease:"power4.out",

    scrollTrigger:{

      trigger:el,

      start:"top 85%"

    }

  });

});

gsap.utils.toArray(".scale-reveal").forEach((el)=>{

  gsap.to(el,{

    scale:1,
    opacity:1,

    duration:1.2,

    ease:"expo.out",

    scrollTrigger:{

      trigger:el,

      start:"top 85%"

    }

  });

});

// =========================================
// PARALLAX BACKGROUND
// =========================================

window.addEventListener("mousemove",(e)=>{

  let x = e.clientX / window.innerWidth;
  let y = e.clientY / window.innerHeight;

  gsap.to(".gradient-light",{

    x:x * 80,
    y:y * 80,

    duration:2,

    ease:"power3.out"

  });

  gsap.to(".gradient-light2",{

    x:-x * 80,
    y:-y * 80,

    duration:2,

    ease:"power3.out"

  });

});

// =========================================
// MAGNETIC BUTTON EFFECT
// =========================================

const magneticButtons =
document.querySelectorAll(".work-btn");

magneticButtons.forEach((btn)=>{

  btn.addEventListener("mousemove",(e)=>{

    const rect =
    btn.getBoundingClientRect();

    const x =
    e.clientX - rect.left - rect.width / 2;

    const y =
    e.clientY - rect.top - rect.height / 2;

    gsap.to(btn,{

      x:x * 0.25,
      y:y * 0.25,

      duration:0.4,

      ease:"power3.out"

    });

  });

  btn.addEventListener("mouseleave",()=>{

    gsap.to(btn,{

      x:0,
      y:0,

      duration:0.5,

      ease:"elastic.out(1,0.4)"

    });

  });

});

// =========================================
// PROJECT SCROLL ANIMATION
// =========================================

gsap.utils.toArray(".project-card").forEach((card)=>{

  gsap.from(card,{

    y:180,
    opacity:0,

    duration:1.4,

    ease:"power4.out",

    scrollTrigger:{

      trigger:card,

      start:"top 80%"

    }

  });

});

// =========================================
// CREATIVE WALL FLOATING
// =========================================

gsap.to(".wall-item",{

  y:-20,

  duration:3,

  repeat:-1,

  yoyo:true,

  stagger:0.2,

  ease:"sine.inOut"

});

// =========================================
// TEXT PARALLAX
// =========================================

gsap.to(".hero-text",{

  yPercent:20,

  ease:"none",

  scrollTrigger:{

    trigger:".hero",

    scrub:true

  }

});

gsap.to(".about-bg-text",{

  yPercent:-20,

  ease:"none",

  scrollTrigger:{

    trigger:".about-section",

    scrub:true

  }

});

gsap.to(".projects-bg-text",{

  yPercent:-25,

  ease:"none",

  scrollTrigger:{

    trigger:".projects-section",

    scrub:true

  }

});

// =========================================
// SMOOTH PAGE FADE
// =========================================

gsap.from("body",{

  opacity:0,

  duration:1.2,

  ease:"power2.out"

});

// Magnetic Button Effect

document.querySelectorAll(".contact-card,.send-btn")
.forEach((btn)=>{

    btn.addEventListener("mousemove",(e)=>{

        const rect=btn.getBoundingClientRect();

        const x=e.clientX-rect.left-rect.width/2;
        const y=e.clientY-rect.top-rect.height/2;

        btn.style.transform=
        `translate(${x*0.12}px,${y*0.12}px)`;
    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform=
        "translate(0px,0px)";
    });

});

// Form Submission

document.querySelector(".contact-form")
.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert("Message Sent Successfully 🚀");
});
document.querySelectorAll(".contact-card")
.forEach((card)=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x =
        e.clientX - rect.left;

        const y =
        e.clientY - rect.top;

        const centerX =
        rect.width/2;

        const centerY =
        rect.height/2;

        const rotateY =
        (x-centerX)/18;

        const rotateX =
        -(y-centerY)/18;

        card.style.transform=
        `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-15px)
        scale(1.03)
        `;
    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform=
        "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    });

});

document.addEventListener("contextmenu", e => {
  e.preventDefault();
});

document.addEventListener("contextmenu", e => {
  e.preventDefault();
});

/*form sent to the whatsapp*/

document.querySelector(".contact-form")
.addEventListener("submit", function(e){

    e.preventDefault();

    const name =
      document.querySelector('[name="name"]').value;

    const email =
      document.querySelector('[name="email"]').value;

    const message =
      document.querySelector('[name="message"]').value;

    const whatsappURL =
      `https://wa.me/916354489570?text=
      Name: ${name}%0A
      Email: ${email}%0A
      Message: ${message}`;

    window.open(whatsappURL, "_blank");
});
// =========================================
// WALL CARD HOVER PREVIEW LIGHTBOX
// Shows full-resolution media on hover,
// collapses back when mouse leaves card.
// =========================================

(function() {

  const backdrop  = document.getElementById("preview-backdrop");
  const box       = document.getElementById("preview-box");
  const label     = document.getElementById("preview-label");
  const titleEl   = document.getElementById("preview-title");
  const subEl     = document.getElementById("preview-sub");
  const numEl     = document.getElementById("preview-num");
  const escHint   = document.getElementById("preview-esc-hint");

  if (!backdrop || !box) return;

  // Skip on touch/mobile
  if (window.matchMedia("(hover: none)").matches) return;

  let activeVideo = null;
  let hideTimer   = null;
  let currentCard = null;

  function buildMedia(card) {
    // Remove old media child (keep .preview-label)
    box.querySelectorAll("img, video").forEach(el => el.remove());

    const srcImg   = card.querySelector(".wall-card-media img");
    const srcVideo = card.querySelector(".wall-card-media video source");

    let media;

    if (srcVideo) {
      media = document.createElement("video");
      media.src       = srcVideo.src;
      media.autoplay  = true;
      media.muted     = true;
      media.loop      = true;
      media.playsInline = true;
      activeVideo = media;
    } else if (srcImg) {
      media = document.createElement("img");
      media.src = srcImg.src;
      media.alt = srcImg.alt || "";
      activeVideo = null;
    }

    if (!media) return;

    // Insert before the label overlay
    box.insertBefore(media, label);
  }

  function showPreview(card) {
    clearTimeout(hideTimer);
    if (currentCard === card) return;
    currentCard = card;

    buildMedia(card);

    // Populate label
    const titleNode = card.querySelector(".wall-card-title");
    const subNode   = card.querySelector(".wall-card-sub");
    const numNode   = card.querySelector(".wall-card-num");
    titleEl.textContent = titleNode ? titleNode.textContent : "";
    subEl.textContent   = subNode   ? subNode.textContent   : "";
    numEl.textContent   = numNode   ? numNode.textContent   : "";

    backdrop.classList.add("active");
    box.classList.add("active");
    escHint.classList.add("active");
  }

  function hidePreview() {
    hideTimer = setTimeout(() => {
      backdrop.classList.remove("active");
      box.classList.remove("active");
      escHint.classList.remove("active");
      currentCard = null;

      // Pause/remove video to free resources
      if (activeVideo) {
        activeVideo.pause();
        activeVideo = null;
      }
    }, 120); // tiny delay so moving between card → preview doesn't flicker
  }

  // Allow hovering the preview box itself without closing
  box.addEventListener("mouseenter", () => clearTimeout(hideTimer));
  box.addEventListener("mouseleave", hidePreview);
  backdrop.addEventListener("mouseenter", hidePreview);

  // Wire up each card
  document.querySelectorAll(".wall-card").forEach(card => {
    card.addEventListener("mouseenter", () => showPreview(card));
    card.addEventListener("mouseleave", hidePreview);
  });

  // ESC key to close
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") hidePreview();
  });

})();