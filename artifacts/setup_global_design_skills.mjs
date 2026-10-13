import fs from 'fs';
import path from 'path';

const configRoot = 'C:/Users/ashik/.gemini/config';
const skillsDir = path.join(configRoot, 'skills');
const rulesDir = path.join(configRoot, 'rules');

fs.mkdirSync(skillsDir, { recursive: true });
fs.mkdirSync(rulesDir, { recursive: true });

// -------------------------------------------------------------
// 1. Skill: joss-ui-ux-design-system
// -------------------------------------------------------------
const skill1Dir = path.join(skillsDir, 'joss-ui-ux-design-system');
fs.mkdirSync(skill1Dir, { recursive: true });

const skill1Content = `---
name: joss-ui-ux-design-system
description: >-
  Use this skill whenever designing, styling, refactoring, or evaluating web applications, websites, landing pages, or UI components to produce award-winning, state-of-the-art ("joss leveler"), premium visual aesthetics. Enforces luxury dark/light design systems, vibrant harmonious color palettes, modern typography, glassmorphism, micro-animations, and anti-boring layout patterns.
---

# Joss UI/UX Design System Guide

This skill enforces world-class, premium, award-winning visual and interaction design ("Joss Level"). Follow these principles on every web page, component, and dashboard you build.

---

## 1. Core Design Axioms: Eliminating Boring UIs

1. **First Impression Must WOW**:
   - The user must be visually captivated in the first 2 seconds.
   - Never produce barebones, generic, or sterile minimum viable products (MVPs).
   - If a page looks like an unstyled textbook or plain flat bootstrap template, it has failed.

2. **The Anti-Boring Law**:
   - **Never use plain bullet points (\`•\`)**: Always convert unordered lists into interactive feature cards, pill badges, or responsive grids with custom icons and hover lifts.
   - **Never leave raw unstyled text blocks**: Anchor paragraphs with glowing eyebrow badges (e.g. \`✨ ARCHITECTURAL SUITE\`), subtitle lead-ins, and modular metric pills.
   - **Never use sharp flat white boxes**: Apply generous corner rounding (\`rounded-2xl\` / \`rounded-3xl\`), 1px translucent border strokes, subtle inner highlights, and layered ambient shadows.

---

## 2. Color Palettes & Visual Tone

Always use tailored, harmonious HSL or curated hex color systems. Avoid generic primary red, green, and flat blue.

### A. Cyber / Futuristic Blue & Cyan (Suffix IT Theme)
- **Deep Backgrounds**: \`#050B14\`, \`#0a1124\`, \`#0f172a\`
- **Clean Luxury Light**: \`#f8fafc\`, \`#f0f7ff\`, \`#e0f2fe\`
- **Vibrant Accents**: Cyan Neon (\`#00f2fe\`), Electric Sky (\`#38bdf8\`), Tech Cobalt (\`#0284c7\`, \`#0072bc\`)
- **Glow Highlights**: \`rgba(56, 189, 248, 0.25)\`, \`rgba(2, 132, 199, 0.15)\`

### B. Dark Mode Luxury
- Base: \`#0B0F19\` with radial ambient mesh: \`radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.12) 0%, transparent 60%)\`
- Card Surfaces: \`rgba(15, 23, 42, 0.75)\` with \`backdrop-filter: blur(16px)\`
- Borders: \`1px solid rgba(255, 255, 255, 0.08)\` with hover transition to \`rgba(56, 189, 248, 0.4)\`

### C. Clean Modern Light Mode
- Base: \`#ffffff\` with ultra-subtle tinted surface layers: \`#f8fafc\` and \`#f0f9ff\`
- Card Surfaces: \`rgba(255, 255, 255, 0.9)\` with \`backdrop-filter: blur(12px)\`
- Borders: \`1px solid rgba(226, 232, 240, 0.8)\` with hover transition to \`rgba(56, 189, 248, 0.6)\`
- Shadows: Soft dual-layer shadow: \`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 20px 30px -6px rgba(56, 189, 248, 0.07)\`

---

## 3. Typography Rules

1. **Modern Font Stacks**:
   - Primary Headings: Outfit, Plus Jakarta Sans, Syne, or Manrope.
   - Body & Interface: Inter, Plus Jakarta Sans, or Geist.
   - Technical / Tags / Numbers: JetBrains Mono or Space Grotesk.
2. **Optical Scaling & Tracking**:
   - Display & Hero Headlines (\`48px+\`): Tighten letter-spacing (\`-0.03em\` to \`-0.04em\`) and set line-height to \`1.08 - 1.15\`.
   - Small Badges & Eyebrows (\`11px - 13px\`): Uppercase, font-semibold, letter-spacing \`+0.05em\` to \`+0.08em\`.
   - Body Copy: Generous line-height (\`1.65 - 1.75\`), relaxed contrast (\`#334155\` in light, \`#94a3b8\` in dark).

---

## 4. Glassmorphism & Elevation System

\`\`\`css
/* High-End Glassmorphic Card */
.glass-surface {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 10px 30px -10px rgba(0, 71, 171, 0.06),
    0 1px 3px rgba(0, 0, 0, 0.02),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}

.glass-surface:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 20px 40px -15px rgba(2, 132, 199, 0.16),
    0 0 0 1px rgba(56, 189, 248, 0.4);
}
\`\`\`

---

## 5. Micro-Interactions & Hover Polish

- **Buttons**: Glowing radial hover gradient, forward arrow translation (\`group-hover:translate-x-1\`), spring click scale (\`active:scale-[0.98]\`).
- **Cards**: Ambient glow flares on hover, smooth border color transitions, subtle internal icon bounce.
- **Badges**: Pulsing indicator dot (\`animate-ping\` / \`animate-pulse\`) indicating real-time status.
- **Scroll Spy & HUDs**: Active state indicator pills sliding smoothly between sections.
`;

fs.writeFileSync(path.join(skill1Dir, 'SKILL.md'), skill1Content, 'utf8');

// -------------------------------------------------------------
// 2. Skill: advanced-framer-animations
// -------------------------------------------------------------
const skill2Dir = path.join(skillsDir, 'advanced-framer-animations');
fs.mkdirSync(skill2Dir, { recursive: true });

const skill2Content = `---
name: advanced-framer-animations
description: >-
  Use this skill whenever implementing animations, micro-interactions, scroll-driven storytelling, 3D card physics, spring transitions, or SVG path animations using Framer Motion, GSAP, or modern CSS.
---

# Advanced Framer Motion & Animation Guide

Create butter-smooth, hardware-accelerated animations that bring web interfaces to life.

---

## 1. Spring Physics Configuration

Always prefer physical spring simulations over generic linear or cubic ease curves for user interactions.

\`\`\`javascript
// Snappy Micro-Interactions (Buttons, Badges, Hover Lifts)
export const snappySpring = {
  type: "spring",
  stiffness: 400,
  damping: 28,
  mass: 0.8
};

// Smooth Natural Page & Modal Transitions
export const smoothSpring = {
  type: "spring",
  stiffness: 220,
  damping: 24,
  mass: 1
};

// Floating / Ambient Levitation
export const floatingPhysics = {
  y: [0, -8, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};
\`\`\`

---

## 2. Scroll-Linked Zoom & Morph Transitions

When transforming hero elements (such as device mockups or illustrations) on scroll:

\`\`\`javascript
import { useScroll, useTransform, motion } from "framer-motion";

export function ScrollMorphSection({ targetRef, children }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Scale from initial stage to zoomed showcase
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1.35, 1.2]);
  const y = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 40, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.9, 1, 1, 0.2]);

  return (
    <motion.div style={{ scale, y, opacity }} className="relative will-change-transform">
      {children}
    </motion.div>
  );
}
\`\`\`

---

## 3. 3D Perspective Card Tilt

\`\`\`javascript
import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function PerspectiveTiltCard({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={\`perspective-1000 transition-shadow duration-300 \${className}\`}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
\`\`\`

---

## 4. SVG Circuit / Path Tracing Animations

- Animate \`pathLength\` with \`useScroll\` or \`animate\`.
- Use translucent background tracks with vibrant glowing stroke overlays.
- Add glowing beacon dots that translate along the path.
`;

fs.writeFileSync(path.join(skill2Dir, 'SKILL.md'), skill2Content, 'utf8');

// -------------------------------------------------------------
// 3. Skill: 3d-web-visuals-and-mockups
// -------------------------------------------------------------
const skill3Dir = path.join(skillsDir, '3d-web-visuals-and-mockups');
fs.mkdirSync(skill3Dir, { recursive: true });

const skill3Content = `---
name: 3d-web-visuals-and-mockups
description: >-
  Use this skill when creating high-tech 3D mockups (MacBook, iPhone, iPad, dual-device stages), Three.js / WebGL canvas effects, interactive shaders, isometric hardware showcases, or futuristic particle networks.
---

# 3D Web Visuals & Device Mockups Guide

Bring high-tech physical presence to software products with realistic 3D staging and interactive canvases.

---

## 1. Laptop & Multi-Device Staging Rules

1. **Viewing Angles**:
   - **Upright Natural Profile (90° - 105°)**: The laptop display must stand upright facing the user.
   - **Keyboard Base in 3D Perspective**: The keyboard sits flat on the desk with a trapezoidal 3D perspective base (wider at front, narrower at hinge).
   - **Never flip flat 180°**: Never let the keyboard fold completely backwards or flat down unless explicitly creating an exploded blueprint diagram.
2. **Device Hardware Realism**:
   - Space Gray / Space Black metallic chassis gradients.
   - Chamfered edges with 1px top highlight reflection.
   - Recessed keyboard deck with laser-etched key caps and soft key shadows.
   - Centered glass trackpad with subtle boundary line.
   - Front lip thumb notch for opening the lid.
   - Ground contact shadow: Soft dual-layer blurred ellipse directly beneath the chassis.

---

## 2. Vector Perspective SVG Laptop Base

\`\`\`tsx
export function PerspectiveLaptopBase({ width = 720, height = 180 }) {
  return (
    <svg viewBox="0 0 720 180" className="w-full h-auto drop-shadow-2xl">
      <defs>
        <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#242830" />
          <stop offset="60%" stopColor="#181a20" />
          <stop offset="100%" stopColor="#0d0e12" />
        </linearGradient>
        <linearGradient id="lipHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3a3f4d" />
          <stop offset="50%" stopColor="#71788e" />
          <stop offset="100%" stopColor="#3a3f4d" />
        </linearGradient>
      </defs>
      {/* Table ambient contact shadow */}
      <ellipse cx="360" cy="165" rx="330" ry="14" fill="rgba(0,0,0,0.35)" filter="blur(10px)" />
      {/* 3D Chassis Deck */}
      <polygon points="60,10 660,10 710,145 10,145" fill="url(#chassisGrad)" stroke="#383c48" strokeWidth="1.5" />
      {/* Front Beveled Lip */}
      <polygon points="10,145 710,145 700,162 20,162" fill="#121318" stroke="#2a2d36" strokeWidth="1" />
      <line x1="12" y1="145" x2="708" y2="145" stroke="url(#lipHighlight)" strokeWidth="1.2" opacity="0.8" />
      {/* Front Center Notch */}
      <path d="M315,145 L325,152 L395,152 L405,145 Z" fill="#08090c" />
      {/* Recessed Trackpad */}
      <polygon points="265,95 455,95 470,140 250,140" fill="#14161b" stroke="#282b35" strokeWidth="1" />
    </svg>
  );
}
\`\`\`

---

## 3. Staging with 3D Holographic Pedestals

When displaying product graphics, illustrations, or floating cards:
- Place an illuminated glass pedestal or glowing cyber cylinder beneath the object.
- Surround with concentric circular light rings and particle sparkles.
- Add a soft blue/cyan rim light on the object.
`;

fs.writeFileSync(path.join(skill3Dir, 'SKILL.md'), skill3Content, 'utf8');

// -------------------------------------------------------------
// 4. Skill: world-class-component-craft
// -------------------------------------------------------------
const skill4Dir = path.join(skillsDir, 'world-class-component-craft');
fs.mkdirSync(skill4Dir, { recursive: true });

const skill4Content = `---
name: world-class-component-craft
description: >-
  Use this skill when building complex, high-converting, modern UI components such as Bento grids, interactive feature checklists, sticky HUD navigation sidebars, timeline roadmaps, and testimonial carousels in React, Next.js, or HTML/CSS.
---

# World-Class Component Craft Guide

Patterns and implementation recipes for building components that feel state-of-the-art.

---

## 1. The Bento Grid Architecture

Bento grids organize disparate product features into an asymmetrical, visually thrilling mosaic:

- **Primary Hero Slot (2x2)**: Interactive live preview, 3D canvas, or dynamic animated graphic.
- **Secondary Metric Slots (1x1)**: Big bold KPI numbers (\`99.99%\`, \`<12ms\`) with gradient text and mini sparkline graphs.
- **Interactive Micro-Tool Slot (2x1)**: Draggable slider, live toggle, or interactive code switcher.
- **Social Proof / Security Slot (1x1)**: Security badges, avatar clusters, or animated checkmarks.

---

## 2. Interactive Feature Pill Grids (Replacing Boring Bullets)

Never use standard \`<ul><li>\` bullets. Implement the interactive feature pill grid:

\`\`\`tsx
export function FeaturePillGrid({ features }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
      {features.map((feat, idx) => (
        <div
          key={idx}
          className="group flex items-center gap-3 p-3.5 bg-sky-50/60 dark:bg-slate-900/60 border border-sky-100 dark:border-slate-800 rounded-2xl hover:bg-white dark:hover:bg-slate-800 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200 shrink-0">
            <CheckIcon className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
            {feat}
          </span>
        </div>
      ))}
    </div>
  );
}
\`\`\`

---

## 3. Sticky Directory HUD Sidebar

For documentation, product capabilities, or long-form solution pages:
- Wrap in a sticky container: \`sticky top-28\`.
- Large bold eyebrow: \`ON THIS PAGE\` with pulsating blue beacon dot.
- Numbered index tags: \`01\`, \`02\`, \`03\` with cyber blue background.
- Live progress tracker showing current active section.
- Integrated Call-to-Action (CTA) at the bottom: \`Request Live Demo\` or \`Explore Docs\`.
`;

fs.writeFileSync(path.join(skill4Dir, 'SKILL.md'), skill4Content, 'utf8');

// -------------------------------------------------------------
// 5. Global Rule: epic-design-standards.md
// -------------------------------------------------------------
const ruleContent = `# Global Rule: Epic & "Joss Level" Design Standards

## 1. Zero Boring UIs Policy
- Never create simple, flat, sterile, or barebones user interfaces.
- Every webpage, component, landing page, and dashboard must feel premium, polished, state-of-the-art, and captivating ("joss level").
- Draw visual inspiration from modern award-winning web design (e.g., Apple, Linear, Stripe, Vercel, Raycast).

## 2. Core Visual Rules
- **Color Harmony**: Use curated, harmonious color palettes (Tailored HSL, deep dark slates, radiant light slates, vibrant cyan/sky/emerald neon accents, smooth gradient overlays). Never use flat generic primary colors.
- **Typography**: Always use modern typography (Outfit, Plus Jakarta Sans, Inter, Manrope) with optical letter-spacing (tightened headers, spaced uppercase eyebrows).
- **Glassmorphism & Depth**: Multi-layered backdrop-blur surfaces, 1px translucent borders, inner highlights, and soft ambient drop shadows.
- **No Raw Unstyled Bullets**: All lists must be formatted into responsive feature grids, interactive pill cards with checkmark icons, or timeline nodes.
- **Dynamic Micro-Interactions**: Hover lifts, smooth spring physics, magnetic buttons, pulsating status beacons, and fluid transitions.
- **Realistic 3D & Hardware Staging**: When rendering devices (laptops, phones, tablets), always maintain realistic 3D perspective angles (e.g., 90° upright laptop viewing angles with 3D perspective bases).

## 3. Scope
This rule applies globally across all projects, repositories, and workspaces.
`;

fs.writeFileSync(path.join(rulesDir, 'epic-design-standards.md'), ruleContent, 'utf8');

console.log('Successfully installed all global design skills and rules!');
