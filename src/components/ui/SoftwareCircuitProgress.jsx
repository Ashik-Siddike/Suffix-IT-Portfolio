import { useRef } from 'react';

/**
 * Modern High-Tech Interactive Circuit-Board Horizontal Progress Bar / Timeline
 *
 * Visual Features:
 * - Continuous 45° chamfered SVG circuit trace connecting 11 timeline milestone nodes (TP01 to TP11)
 * - Sci-Fi Cyber Target / Chip nodes: rounded outer square with 3 concentric rings (annular ring, inner reticle, laser core)
 * - Corner brackets, crosshair notches, pulsing radar halo
 * - Authentic PCB micro branch traces, via pads, SMD component pads, and extension terminal dots
 * - Clean light theme: #0072bc, #0284c7, #38bdf8 accents, translucent unpowered traces, glowing multi-stage active lines
 * - Smooth scroll-linked animation via stroke-dashoffset + Clickable milestone navigation
 *
 * @param {Object} props
 * @param {Array} [props.chapters] - Milestone / chapter data array
 * @param {Array} [props.milestones] - Alternative prop for milestone data
 * @param {number} [props.activeIndex] - Controlled active milestone index (0-based)
 * @param {number} [props.activeStep] - Alias for activeIndex
 * @param {number} [props.progress] - Controlled progress ratio (0 to 1)
 * @param {Function} [props.onStepClick] - Callback when any node is clicked: (index, item) => void
 * @param {string} [props.className] - Additional classes
 */
export default function SoftwareCircuitProgress({
  chapters,
  milestones,
  activeIndex,
  activeStep,
  progress,
  onStepClick,
  className = '',
}) {
  const svgRef = useRef(null);
  const items = milestones || chapters || [];
  const total = items.length || 11;
  const currentActive = activeIndex ?? activeStep;

  // Geometry: 11 milestone nodes evenly spaced along horizontal axis
  // Even nodes sit at y = 24, Odd nodes sit at y = 48 (24px delta for exact 45° chamfers)
  const points = Array.from({ length: total }, (_, index) => ({
    x: 36 + (1208 * index) / Math.max(1, total - 1),
    y: index % 2 === 0 ? 24 : 48,
  }));

  // Main 45-degree mitered PCB copper trace:
  const route = points.reduce((path, point, index) => {
    if (!index) return `M${point.x} ${point.y}`;
    const previous = points[index - 1];
    const midpoint = (previous.x + point.x) / 2;
    // 45-degree chamfer: horizontal to midpoint-12, diagonal 45° jog to midpoint+12 at point.y, then horizontal
    return `${path} H${midpoint - 12} L${midpoint + 12} ${point.y} H${point.x}`;
  }, '');

  // Secondary auxiliary parallel bus trace:
  const auxRoute = points.reduce((path, point, index) => {
    const auxY = index % 2 === 0 ? 11 : 61;
    if (!index) return `M${point.x - 14} ${auxY}`;
    const midpoint = (points[index - 1].x + point.x) / 2;
    return `${path} H${midpoint - 25} L${midpoint + 25} ${auxY} H${point.x + (index === points.length - 1 ? 14 : 0)}`;
  }, '');

  const handleNodeClick = (index, item) => {
    if (onStepClick) {
      onStepClick(index, item);
    }
    // Dispatch custom bubbling event for smooth scroll controllers (GSAP / window scroll)
    const event = new CustomEvent('circuit-node-jump', {
      bubbles: true,
      detail: { index, slug: item?.slug, item },
    });
    svgRef.current?.dispatchEvent(event);
  };

  const handleKeyDown = (event, index, item) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNodeClick(index, item);
    }
  };

  // Compute controlled stroke-dashoffset if progress or currentActive is given
  const strokeDashoffset =
    progress !== undefined
      ? String(1 - Math.max(0, Math.min(1, progress)))
      : currentActive !== undefined
        ? String(1 - Math.max(0, Math.min(1, currentActive / Math.max(1, total - 1))))
        : '1';

  return (
    <svg
      ref={svgRef}
      className={`software-story-circuit ${className}`.trim()}
      viewBox="0 0 1280 94"
      fill="none"
      role="group"
      aria-label="Interactive circuit timeline progress"
    >
      <defs>
        {/* Dynamic Multi-Stage Electric Progress Gradient */}
        <linearGradient id="software-circuit-progress-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#005fa3" />
          <stop offset="20%" stopColor="#0072bc" />
          <stop offset="45%" stopColor="#0284c7" />
          <stop offset="68%" stopColor="#00a8ff" />
          <stop offset="88%" stopColor="#00c8f8" />
          <stop offset="100%" stopColor="#00f0ff" />
        </linearGradient>
      </defs>

      {/* Background Auxiliary PCB Bus Trace */}
      <path className="software-circuit-aux-trace" d={auxRoute} />

      {/* Main Base Inactive Circuit Trace (the unpowered track) */}
      <path className="software-circuit-inactive" d={route} />

      {/* Energized Electric Progress Trace (starts at strokeDashoffset: 1, drawn by scroll) */}
      <path
        className="software-circuit-progress"
        d={route}
        pathLength="1"
        style={{ strokeDasharray: '1', strokeDashoffset }}
      />

      {/* Micro Vias along Auxiliary Trace */}
      {points.map((point, index) => {
        const auxY = index % 2 === 0 ? 11 : 61;
        const viaX = point.x + (index % 2 === 0 ? -18 : 18);
        return (
          <g key={`aux-via-${point.x}-${index}`} className="software-circuit-aux-node">
            <circle cx={viaX} cy={auxY} r="2.2" className="software-circuit-aux-via" />
            <circle cx={viaX} cy={auxY} r="0.9" className="software-circuit-via-hole" />
          </g>
        );
      })}

      {/* Product Milestone Nodes */}
      {points.map((point, index) => {
        const isEven = index % 2 === 0;
        const item = items[index] || { title: `Milestone ${index + 1}`, slug: `tp-${index + 1}` };
        const key = item.slug || `circuit-node-${index}`;

        // Branch 1: 45-degree PCB trace with via pad and SMD component
        const branchPath = isEven
          ? `M${point.x} ${point.y + 10.5} V${point.y + 20} L${point.x + 8} ${point.y + 28} H${point.x + 28}`
          : `M${point.x} ${point.y - 10.5} V${point.y - 20} L${point.x - 8} ${point.y - 28} H${point.x - 28}`;
        const viaX = isEven ? point.x + 28 : point.x - 28;
        const viaY = isEven ? point.y + 28 : point.y - 28;
        const branchDotX = isEven ? viaX + 16 : viaX - 16;
        const smd1X = isEven ? point.x + 34 : point.x - 38;
        const smd2X = isEven ? point.x + 40 : point.x - 44;
        const smdY = isEven ? point.y + 26 : point.y - 30;

        // Branch 2: Micro secondary branch stub with terminal dot
        const microBranchPath = isEven
          ? `M${point.x - 10.5} ${point.y} H${point.x - 18} L${point.x - 24} ${point.y - 6}`
          : `M${point.x + 10.5} ${point.y} H${point.x + 18} L${point.x + 24} ${point.y + 6}`;
        const microDotX = isEven ? point.x - 24 : point.x + 24;
        const microDotY = isEven ? point.y - 6 : point.y + 6;

        // Sci-Fi Cyber Target HUD Corner Brackets
        const bracketD = [
          `M${point.x - 14} ${point.y - 9} V${point.y - 14} H${point.x - 9}`,
          `M${point.x + 9} ${point.y - 14} H${point.x + 14} V${point.y - 9}`,
          `M${point.x + 14} ${point.y + 9} V${point.y + 14} H${point.x + 9}`,
          `M${point.x - 9} ${point.y + 14} H${point.x - 14} V${point.y + 9}`,
        ].join(' ');

        // PCB Terminal Alignment Crosshairs
        const crosshairD = `M${point.x - 15} ${point.y} h3 M${point.x + 12} ${point.y} h3 M${point.x} ${point.y - 15} v3 M${point.x} ${point.y + 12} v3`;

        const isActive = currentActive !== undefined ? index <= currentActive : index === 0;
        const isCurrent = currentActive !== undefined ? index === currentActive : index === 0;
        const labelText = item.title || item.label || `Milestone ${index + 1}`;

        return (
          <g
            key={key}
            className="software-circuit-node cursor-pointer"
            data-index={index}
            data-active={String(isActive)}
            data-current={String(isCurrent)}
            role="button"
            tabIndex={0}
            aria-label={`Jump to ${labelText} (TP${String(index + 1).padStart(2, '0')})`}
            onClick={() => handleNodeClick(index, item)}
            onKeyDown={(e) => handleKeyDown(e, index, item)}
          >
            {/* Extended Click / Tap Hit Area */}
            <rect
              className="software-circuit-hit-area"
              x={point.x - 22}
              y={point.y - 22}
              width="44"
              height="44"
              fill="transparent"
              pointerEvents="all"
            />

            {/* Branch Circuit Trace */}
            <path className="software-circuit-branch" d={branchPath} />

            {/* Secondary Micro Branch Trace */}
            <path className="software-circuit-branch-micro" d={microBranchPath} />

            {/* Micro Branch Via Pad */}
            <circle className="software-circuit-via-ring" cx={viaX} cy={viaY} r="3" />
            <circle className="software-circuit-via-hole" cx={viaX} cy={viaY} r="1.2" />

            {/* Branch Extension Terminal Dots */}
            <line
              className="software-circuit-branch-dot-line"
              x1={isEven ? viaX + 3 : viaX - 3}
              y1={viaY}
              x2={branchDotX}
              y2={viaY}
            />
            <circle className="software-circuit-branch-dot" cx={branchDotX} cy={viaY} r="1.8" />
            <circle className="software-circuit-branch-dot" cx={microDotX} cy={microDotY} r="1.6" />

            {/* SMD Component Footprint (Resistor / Capacitor) */}
            <line
              className="software-circuit-smd-line"
              x1={isEven ? viaX + 3 : viaX - 3}
              y1={viaY}
              x2={isEven ? smd1X : smd1X + 3.5}
              y2={viaY}
            />
            <rect className="software-circuit-smd" x={smd1X} y={smdY} width="3.5" height="4" rx="0.8" />
            <rect className="software-circuit-smd" x={smd2X} y={smdY} width="3.5" height="4" rx="0.8" />

            {/* Sci-Fi Cyber Target HUD Corner Brackets */}
            <path className="software-circuit-cyber-brackets" d={bracketD} />

            {/* PCB Solder Pad Land (Rounded Outer Square Chip Body) */}
            <rect
              className="software-circuit-pad-land"
              x={point.x - 10.5}
              y={point.y - 10.5}
              width="21"
              height="21"
              rx="4"
            />

            {/* PCB Terminal Alignment Crosshairs */}
            <path className="software-circuit-terminal-notches" d={crosshairD} />

            {/* Electric Halo Radar for Live Current Node */}
            <circle className="software-circuit-node-halo" cx={point.x} cy={point.y} r="16" />

            {/* Concentric Circle 1: Annular Outer Target Ring */}
            <circle className="software-circuit-node-ring" cx={point.x} cy={point.y} r="7.5" />

            {/* Concentric Circle 2: Inner Cyber Reticle Ring */}
            <circle className="software-circuit-node-inner-ring" cx={point.x} cy={point.y} r="4.8" />

            {/* Concentric Circle 3: Plated Through-Hole Laser Diode Core */}
            <circle className="software-circuit-node-core" cx={point.x} cy={point.y} r="2.4" />

            {/* Technical Silkscreen Reference Designator (TP01, TP02, etc.) */}
            <text
              className="software-circuit-node-tag"
              x={point.x}
              y={isEven ? point.y - 16 : point.y + 25}
              textAnchor="middle"
            >
              TP{String(index + 1).padStart(2, '0')}
            </text>

            {/* Monospace Circuit Node Number (01, 02, etc.) */}
            <text className="software-circuit-node-num" x={point.x} y="86" textAnchor="middle">
              {String(index + 1).padStart(2, '0')}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

