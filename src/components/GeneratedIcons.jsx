// New generated raster atlas: no legacy SVG icon library is rendered.
const positions = {
  ArrowRight: 0,
  ArrowLeft: 1,
  ArrowUp: 2,
  ChevronDown: 3,
  ArrowUpRight: 4,
  Check: 5,
  Menu: 6,
  X: 7,
  Pause: 8,
  Play: 9,
  Search: 10,
  Quote: 11,
  Users: 12,
  Cpu: 13,
  Workflow: 14,
  Code2: 15,
  Phone: 16,
  Globe2: 17,
  Database: 18,
  GraduationCap: 19,
  HeartPulse: 20,
  ShoppingBag: 21,
  Smartphone: 22,
  Video: 23,
  MapPin: 24,
  Network: 25,
  Server: 26,
  Package: 27,
  Zap: 28,
  ShieldCheck: 29,
  Building2: 30,
  BedDouble: 31,
  ScanLine: 32,
  Radio: 33,
  Layers: 34,
  Mail: 35,
};
export function RasterIcon({ name = 'Layers', size = 24, className = '', style, ...props }) {
  const index = positions[name] ?? positions.Layers;
  return (
    <span
      {...props}
      aria-hidden="true"
      className={`generated-icon ${className}`}
      style={{
        width: size,
        height: size,
        backgroundPosition: `${(-((index % 6) + 0.15) * size) / 0.7}px ${(-(Math.floor(index / 6) + 0.15) * size) / 0.7}px`,
        ...style,
      }}
    />
  );
}
export function ArrowRight(props) {
  return <RasterIcon {...props} name="ArrowRight" />;
}
export function ArrowLeft(props) {
  return <RasterIcon {...props} name="ArrowLeft" />;
}
export function ArrowUp(props) {
  return <RasterIcon {...props} name="ArrowUp" />;
}
export function ArrowUpRight(props) {
  return <RasterIcon {...props} name="ArrowUpRight" />;
}
export function ChevronDown(props) {
  return <RasterIcon {...props} name="ChevronDown" />;
}
export function Check(props) {
  return <RasterIcon {...props} name="Check" />;
}
export function Menu(props) {
  return <RasterIcon {...props} name="Menu" />;
}
export function X(props) {
  return <RasterIcon {...props} name="X" />;
}
export function Pause(props) {
  return <RasterIcon {...props} name="Pause" />;
}
export function Play(props) {
  return <RasterIcon {...props} name="Play" />;
}
export function Search(props) {
  return <RasterIcon {...props} name="Search" />;
}
export function Quote(props) {
  return <RasterIcon {...props} name="Quote" />;
}
export function Users(props) {
  return <RasterIcon {...props} name="Users" />;
}
export function Cpu(props) {
  return <RasterIcon {...props} name="Cpu" />;
}
export function Workflow(props) {
  return <RasterIcon {...props} name="Workflow" />;
}
export function Code2(props) {
  return <RasterIcon {...props} name="Code2" />;
}
export function Phone(props) {
  return <RasterIcon {...props} name="Phone" />;
}
export function Globe2(props) {
  return <RasterIcon {...props} name="Globe2" />;
}
export function Database(props) {
  return <RasterIcon {...props} name="Database" />;
}
export function GraduationCap(props) {
  return <RasterIcon {...props} name="GraduationCap" />;
}
export function HeartPulse(props) {
  return <RasterIcon {...props} name="HeartPulse" />;
}
export function ShoppingBag(props) {
  return <RasterIcon {...props} name="ShoppingBag" />;
}
export function Smartphone(props) {
  return <RasterIcon {...props} name="Smartphone" />;
}
export function Video(props) {
  return <RasterIcon {...props} name="Video" />;
}
export function MapPin(props) {
  return <RasterIcon {...props} name="MapPin" />;
}
export function Network(props) {
  return <RasterIcon {...props} name="Network" />;
}
export function Server(props) {
  return <RasterIcon {...props} name="Server" />;
}
export function Package(props) {
  return <RasterIcon {...props} name="Package" />;
}
export function Zap(props) {
  return <RasterIcon {...props} name="Zap" />;
}
export function ShieldCheck(props) {
  return <RasterIcon {...props} name="ShieldCheck" />;
}
export function Building2(props) {
  return <RasterIcon {...props} name="Building2" />;
}
export function BedDouble(props) {
  return <RasterIcon {...props} name="BedDouble" />;
}
export function ScanLine(props) {
  return <RasterIcon {...props} name="ScanLine" />;
}
export function Radio(props) {
  return <RasterIcon {...props} name="Radio" />;
}
export function Layers(props) {
  return <RasterIcon {...props} name="Layers" />;
}
export function Mail(props) {
  return <RasterIcon {...props} name="Mail" />;
}
export function Activity(props) {
  return <RasterIcon {...props} name="Radio" />;
}
export function Landmark(props) {
  return <RasterIcon {...props} name="Building2" />;
}
export function CircleAlert(props) {
  return <RasterIcon {...props} name="ShieldCheck" />;
}
export function LoaderCircle(props) {
  return <RasterIcon {...props} name="Layers" />;
}
export function ChevronRight(props) {
  return (
    <RasterIcon
      {...props}
      name="ChevronDown"
      style={{ transform: 'rotate(-90deg)', ...props.style }}
    />
  );
}
// Brand wordmarks are preserved as text, rather than re-generated likenesses.
export function Facebook({ size = 18, ...props }) {
  return (
    <span {...props} aria-hidden="true" className="social-wordmark" style={{ fontSize: size }}>
      f
    </span>
  );
}
export function Linkedin({ size = 18, ...props }) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className="social-wordmark"
      style={{ fontSize: size * 0.8 }}
    >
      in
    </span>
  );
}
