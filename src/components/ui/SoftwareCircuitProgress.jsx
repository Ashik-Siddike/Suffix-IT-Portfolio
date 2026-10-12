// Every node is a product chapter, in the same order as the horizontal track.
export default function SoftwareCircuitProgress({ chapters }) {
  const points = chapters.map((_, index) => ({
    x: 32 + (1216 * index) / (chapters.length - 1),
    y: index % 2 ? 36 : 18,
  }));
  const route = points.reduce((path, point, index) => {
    if (!index) return `M${point.x} ${point.y}`;
    const previous = points[index - 1];
    const midpoint = (previous.x + point.x) / 2;
    return `${path} H${midpoint - 24} Q${midpoint - 16} ${previous.y} ${midpoint - 10} ${previous.y + (point.y > previous.y ? 6 : -6)} L${midpoint + 10} ${point.y + (point.y > previous.y ? -6 : 6)} Q${midpoint + 16} ${point.y} ${midpoint + 24} ${point.y} H${point.x}`;
  }, '');
  return (
    <svg className="software-story-circuit" viewBox="0 0 1280 76" fill="none" aria-hidden="true">
      <path className="software-circuit-inactive" d={route} />
      <path className="software-circuit-progress" d={route} pathLength="1" />
      {points.map((point, index) => (
        <g
          key={chapters[index].slug}
          className="software-circuit-node"
          data-index={index}
          data-active={index === 0}
          data-current={index === 0}
        >
          <path
            className="software-circuit-branch"
            d={`M${point.x} ${point.y} V${point.y + (index % 2 ? -12 : 12)} h${index % 2 ? -14 : 14} v${index % 2 ? -8 : 8}`}
          />
          <circle className="software-circuit-node-halo" cx={point.x} cy={point.y} r="12" />
          <circle className="software-circuit-node-ring" cx={point.x} cy={point.y} r="7" />
          <circle className="software-circuit-node-core" cx={point.x} cy={point.y} r="3" />
          <text x={point.x} y="68" textAnchor="middle">
            {String(index + 1).padStart(2, '0')}
          </text>
        </g>
      ))}
    </svg>
  );
}
