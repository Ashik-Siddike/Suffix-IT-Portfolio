"use client";
import React, { useEffect, useRef, useState } from "react";
import { MotionValue, motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface MacbookScrollProps {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
  mobileSrc?: string;
  hasMobile?: boolean;
  mobileLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

export const MacbookScroll = ({
  src,
  title,
  mobileSrc,
  hasMobile,
  mobileLabel = "Mobile Application",
  className,
  children,
}: MacbookScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  // 1. Text title: fades out smoothly as user scrolls into the showcase
  const textTransform = useTransform(scrollYProgress, [0, 0.14], [0, -25]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // 2. 3D Keyboard Base & Hinge: Folds 90° on the table in realistic perspective, stays back & fades as tablet lifts
  const keyboardOpacity = useTransform(scrollYProgress, [0, 0.12, 0.32], [1, 0.6, 0]);
  const hingeOpacity = useTransform(scrollYProgress, [0, 0.12, 0.28], [1, 0.5, 0]);
  const cameraNotchOpacity = useTransform(scrollYProgress, [0, 0.12, 0.25], [1, 0.4, 0]);

  // 3. Display Screen -> Morphs into sleek Tablet and Zooms Forward into Hero View
  const tabletScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.48],
    [1.0, 1.08, isMobile ? 1.08 : 1.30],
  );
  const tabletTranslateY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.48],
    [0, 20, isMobile ? 30 : 55],
  );
  const tabletBorderRadius = useTransform(
    scrollYProgress,
    [0, 0.3],
    [18, 28],
  );
  const screenInnerRadius = useTransform(
    scrollYProgress,
    [0, 0.3],
    [12, 20],
  );

  // 4. Companion Mobile Device: Zooms forward in tandem beside the Tablet
  const mobileScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.48],
    [1.0, 1.06, isMobile ? 1.04 : 1.22],
  );
  const mobileTranslateY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.48],
    [0, 12, isMobile ? 18 : 35],
  );

  // 5. Hero Device Labels: fade in cleanly when morph completes
  const labelOpacity = useTransform(scrollYProgress, [0.28, 0.45], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.28, 0.45], [10, 0]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-[180vh] md:h-[200vh] w-full",
        className,
      )}
    >
      <div className="sticky top-10 sm:top-14 md:top-16 flex flex-col items-center justify-start overflow-visible pt-1 md:pt-3">
        {/* Title / Hero intro */}
        <motion.div
          style={{
            translateY: textTransform,
            opacity: textOpacity,
          }}
          className="mb-3 md:mb-5 text-center max-w-4xl px-4 z-20"
        >
          {typeof title === "string" ? (
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              {title}
            </h2>
          ) : (
            title || null
          )}
        </motion.div>

        {/* Dual Device Stage: Laptop/Morphing Tablet + Companion Mobile */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 scale-[0.62] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.92] xl:scale-100 transition-transform origin-top">
          
          {/* Left: Laptop & Morphing Tablet Container */}
          <div className="relative flex flex-col items-center">
            
            {/* 1. Display Screen -> Detaches & Morphs into Tablet */}
            <motion.div
              style={{
                scale: tabletScale,
                translateY: tabletTranslateY,
                borderRadius: tabletBorderRadius,
                transformOrigin: "center center",
              }}
              className="relative z-20 w-[32.5rem] sm:w-[35rem] h-[21rem] sm:h-[22.5rem] bg-[#0c0d12] p-2.5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.12)] border border-[#23242c]"
            >
              {/* Camera Notch (Fades out when morphed into tablet) */}
              <motion.div
                style={{ opacity: cameraNotchOpacity }}
                className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center h-3 w-20 bg-[#0c0d12] rounded-b-md"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-[#181920] ring-1 ring-sky-900/60" />
              </motion.div>

              {/* Screen Glass Area - Crisp, straight to user */}
              <motion.div
                style={{ borderRadius: screenInnerRadius }}
                className="relative h-full w-full overflow-hidden bg-[#111218] border border-white/5"
              >
                {src ? (
                  <img
                    src={src}
                    alt="Product software preview"
                    className="h-full w-full object-cover object-left-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#0d0e12] text-slate-400">
                    Software Preview
                  </div>
                )}
                {/* Subtle glass reflection highlight */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
              </motion.div>
            </motion.div>

            {/* 2. Physical Hinge (Gently fades as tablet detaches) */}
            <motion.div
              style={{ opacity: hingeOpacity }}
              className="relative z-15 -mt-1 w-[28.5rem] sm:w-[31rem] h-[7px] bg-[#121318] border-t border-black border-b border-[#2a2b36] shadow-[inset_0_2px_3px_rgba(0,0,0,0.9)]"
            />

            {/* 3. Realistic 3D Perspective Keyboard Base (Folded 90° on the desk, stays back) */}
            <motion.div
              style={{
                opacity: keyboardOpacity,
              }}
              className="relative -mt-[1px] z-10 w-[36.5rem] sm:w-[39rem] pointer-events-none"
            >
              <PerspectiveLaptopBase />

              {/* Realistic Floor Shadow underneath laptop */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[37rem] h-8 bg-slate-950/30 blur-xl rounded-full -z-10" />
            </motion.div>

            {/* Tablet Label underneath when morphed */}
            <motion.div
              style={{
                opacity: labelOpacity,
                y: labelY,
              }}
              className="mt-4 hidden sm:inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-sm backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
              Central Web &amp; Tablet Console
            </motion.div>
          </div>

          {/* Right: Companion Mobile Device Mockup */}
          {hasMobile && (
            <motion.div
              style={{
                scale: mobileScale,
                translateY: mobileTranslateY,
              }}
              className="relative z-20 flex flex-col items-center group self-center lg:self-end mb-2 mt-6 lg:mt-0"
            >
              <MobileDevice
                src={mobileSrc || src}
                label={mobileLabel}
                labelOpacity={labelOpacity}
                labelY={labelY}
              />
            </motion.div>
          )}

        </div>
      </div>

      {children}
    </div>
  );
};

/**
 * Realistic 3D Perspective Keyboard Base (Vector SVG)
 * Folds 90° flat on the table relative to the upright display.
 * Modeled after Apple Space Black MacBook Pro chassis in 3D desk perspective.
 */
export const PerspectiveLaptopBase = () => {
  return (
    <svg
      viewBox="0 0 590 145"
      className="w-full h-auto drop-shadow-[0_25px_30px_rgba(0,0,0,0.45)]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Metallic Dark Aluminum Surface Gradient */}
        <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#14151b" />
          <stop offset="35%" stopColor="#1b1c24" />
          <stop offset="92%" stopColor="#242531" />
          <stop offset="100%" stopColor="#181920" />
        </linearGradient>

        {/* Front Aluminum Lip Bevel Highlight */}
        <linearGradient id="frontLipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d3f4f" />
          <stop offset="50%" stopColor="#252632" />
          <stop offset="100%" stopColor="#0e0f14" />
        </linearGradient>

        {/* Recessed Keyboard Well Gradient */}
        <linearGradient id="wellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a0a0e" />
          <stop offset="100%" stopColor="#111217" />
        </linearGradient>

        {/* Key Caps Gradient */}
        <linearGradient id="keyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#20212b" />
          <stop offset="100%" stopColor="#15161c" />
        </linearGradient>

        {/* Centered Glass Trackpad Gradient */}
        <linearGradient id="trackpadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1c1d25" />
          <stop offset="100%" stopColor="#232430" />
        </linearGradient>
      </defs>

      {/* Main Chassis Top Surface (Trapezoid: 490px top width -> 580px bottom width) */}
      <polygon
        points="50,0 540,0 585,134 5,134"
        fill="url(#chassisGrad)"
        stroke="#323442"
        strokeWidth="0.8"
      />

      {/* Front Aluminum Lip (Beveled front edge with rounded corners) */}
      <path
        d="M 5,134 L 585,134 Q 588,144 578,144 L 12,144 Q 2,144 5,134 Z"
        fill="url(#frontLipGrad)"
      />

      {/* Front Centered Thumb Opening Notch */}
      <path
        d="M 260,134 L 330,134 C 328,140 322,142 318,142 L 272,142 C 268,142 262,140 260,134 Z"
        fill="#0c0d12"
        stroke="#4a4c5e"
        strokeWidth="0.5"
      />

      {/* Recessed Keyboard Well (Trapezoid) */}
      <polygon
        points="85,6 505,6 525,84 65,84"
        fill="url(#wellGrad)"
        stroke="#050508"
        strokeWidth="1"
      />

      {/* Speaker Grilles Left & Right */}
      <polygon points="68,10 82,10 64,80 50,80" fill="#14151b" opacity="0.8" />
      <polygon points="508,10 522,10 540,80 526,80" fill="#14151b" opacity="0.8" />

      {/* Row 1: Function Keys */}
      <g fill="url(#keyGrad)" stroke="#090a0d" strokeWidth="0.5">
        <polygon points="88,8 116,8 115,16 87,16" />
        <polygon points="120,8 148,8 147,16 119,16" />
        <polygon points="152,8 180,8 179,16 151,16" />
        <polygon points="184,8 212,8 211,16 183,16" />
        <polygon points="216,8 244,8 243,16 215,16" />
        <polygon points="248,8 276,8 275,16 247,16" />
        <polygon points="280,8 308,8 307,16 279,16" />
        <polygon points="312,8 340,8 339,16 311,16" />
        <polygon points="344,8 372,8 371,16 343,16" />
        <polygon points="376,8 404,8 403,16 375,16" />
        <polygon points="408,8 436,8 435,16 407,16" />
        <polygon points="440,8 468,8 467,16 439,16" />
        <polygon points="472,8 502,8 501,16 471,16" />
      </g>

      {/* Row 2: Numbers */}
      <g fill="url(#keyGrad)" stroke="#090a0d" strokeWidth="0.5">
        <polygon points="86,18 114,18 113,28 85,28" />
        <polygon points="117,18 143,18 142,28 116,28" />
        <polygon points="146,18 172,18 171,28 145,28" />
        <polygon points="175,18 201,18 200,28 174,28" />
        <polygon points="204,18 230,18 229,28 203,28" />
        <polygon points="233,18 259,18 258,28 232,28" />
        <polygon points="262,18 288,18 287,28 261,28" />
        <polygon points="291,18 317,18 316,28 290,28" />
        <polygon points="320,18 346,18 345,28 319,28" />
        <polygon points="349,18 375,18 374,28 348,28" />
        <polygon points="378,18 404,18 403,28 377,28" />
        <polygon points="407,18 433,18 432,28 406,28" />
        <polygon points="436,18 462,18 461,28 435,28" />
        <polygon points="465,18 503,18 503,28 464,28" />
      </g>

      {/* Row 3: QWERTY */}
      <g fill="url(#keyGrad)" stroke="#090a0d" strokeWidth="0.5">
        <polygon points="84,30 116,30 115,41 83,41" />
        <polygon points="119,30 146,30 145,41 118,41" />
        <polygon points="149,30 176,30 175,41 148,41" />
        <polygon points="179,30 206,30 205,41 178,41" />
        <polygon points="209,30 236,30 235,41 208,41" />
        <polygon points="239,30 266,30 265,41 238,41" />
        <polygon points="269,30 296,30 295,41 268,41" />
        <polygon points="299,30 326,30 325,41 298,41" />
        <polygon points="329,30 356,30 355,41 328,41" />
        <polygon points="359,30 386,30 385,41 358,41" />
        <polygon points="389,30 416,30 415,41 388,41" />
        <polygon points="419,30 446,30 445,41 418,41" />
        <polygon points="449,30 476,30 475,41 448,41" />
        <polygon points="479,30 506,30 506,41 478,41" />
      </g>

      {/* Row 4: ASDF */}
      <g fill="url(#keyGrad)" stroke="#090a0d" strokeWidth="0.5">
        <polygon points="81,43 118,43 117,55 79,55" />
        <polygon points="121,43 149,43 148,55 120,55" />
        <polygon points="152,43 180,43 179,55 151,55" />
        <polygon points="183,43 211,43 210,55 182,55" />
        <polygon points="214,43 242,43 241,55 213,55" />
        <polygon points="245,43 273,43 272,55 244,55" />
        <polygon points="276,43 304,43 303,55 275,55" />
        <polygon points="307,43 335,43 334,55 306,55" />
        <polygon points="338,43 366,43 365,55 337,55" />
        <polygon points="369,43 397,43 396,55 368,55" />
        <polygon points="400,43 428,43 427,55 399,55" />
        <polygon points="431,43 459,43 458,55 430,55" />
        <polygon points="462,43 509,43 509,55 461,55" />
      </g>

      {/* Row 5: ZXCV */}
      <g fill="url(#keyGrad)" stroke="#090a0d" strokeWidth="0.5">
        <polygon points="77,57 122,57 121,69 75,69" />
        <polygon points="125,57 154,57 153,69 124,69" />
        <polygon points="157,57 186,57 185,69 156,69" />
        <polygon points="189,57 218,57 217,69 188,69" />
        <polygon points="221,57 250,57 249,69 220,69" />
        <polygon points="253,57 282,57 281,69 252,69" />
        <polygon points="285,57 314,57 313,69 284,69" />
        <polygon points="317,57 346,57 345,69 316,69" />
        <polygon points="349,57 378,57 377,69 348,69" />
        <polygon points="381,57 410,57 409,69 380,69" />
        <polygon points="413,57 442,57 441,69 412,69" />
        <polygon points="445,57 474,57 473,69 444,69" />
        <polygon points="477,57 513,57 514,69 476,69" />
      </g>

      {/* Row 6: Spacebar row */}
      <g fill="url(#keyGrad)" stroke="#090a0d" strokeWidth="0.5">
        <polygon points="73,71 103,71 102,83 71,83" />
        <polygon points="106,71 133,71 132,83 105,83" />
        <polygon points="136,71 166,71 165,83 135,83" />
        <polygon points="169,71 202,71 201,83 168,83" />
        {/* Spacebar */}
        <polygon points="205,71 379,71 380,83 204,83" fill="#1b1c24" />
        <polygon points="382,71 415,71 416,83 383,83" />
        <polygon points="418,71 448,71 449,83 419,83" />
        <polygon points="451,71 475,71 476,83 452,83" />
        <polygon points="478,71 517,71 519,83 479,83" />
      </g>

      {/* Centered Glass Trackpad */}
      <polygon
        points="228,88 362,88 368,131 222,131"
        fill="url(#trackpadGrad)"
        stroke="#383949"
        strokeWidth="0.8"
      />
    </svg>
  );
};

export const MobileDevice = ({
  src,
  label,
  labelOpacity,
  labelY,
}: {
  src?: string;
  label?: string;
  labelOpacity?: MotionValue<number>;
  labelY?: MotionValue<number>;
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Smartphone Chassis - Space Black Dark Finish */}
      <div className="relative h-[22.5rem] w-[11.5rem] rounded-[38px] bg-[#0c0d10] p-[8px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.12)] border border-[#27282f]">
        {/* Physical side buttons */}
        <div className="absolute -left-[3px] top-16 h-8 w-[2px] rounded-l bg-[#3f4048]" />
        <div className="absolute -left-[3px] top-26 h-8 w-[2px] rounded-l bg-[#3f4048]" />
        <div className="absolute -right-[3px] top-20 h-11 w-[2px] rounded-r bg-[#3f4048]" />

        {/* Dynamic Island Pill Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 h-3.5 w-16 rounded-full bg-black flex items-center justify-end pr-2 border border-white/5">
          <div className="h-1.5 w-1.5 rounded-full bg-[#1c1c1e] ring-1 ring-[#2c2c2e]" />
        </div>

        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[30px] bg-[#111215]">
          {src ? (
            <img
              src={src}
              alt={label || "Mobile application screen"}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
              <span className="text-xs font-semibold text-sky-400">Suffix Mobile</span>
              <span className="mt-1 text-[10px] text-neutral-400">Companion App</span>
            </div>
          )}
          {/* Glass sheen */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 h-1 w-12 rounded-full bg-white/40" />
      </div>

      {/* Desk Shadow for Mobile */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950/25 blur-lg rounded-full -z-10" />

      {/* Mobile Label underneath when morphed */}
      {label && (
        <motion.span
          style={{
            opacity: labelOpacity,
            y: labelY,
          }}
          className="mt-4 hidden sm:inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-sm backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
          {label}
        </motion.span>
      )}
    </div>
  );
};
