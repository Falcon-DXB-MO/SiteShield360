/* global React */
const { useState, useEffect, useRef } = React;

// === SVG glyph helpers (no emoji, simple line icons) ===
const Icon = {
  Shield: ({ s = 18 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3z" />
    </svg>
  ),
  Radar: ({ s = 18 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /><path d="M12 3v9l6-4" />
    </svg>
  ),
  Pump: ({ s = 18 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18M5 20V9m4 11V6m4 14v-9m4 9V4m4 16V11" />
    </svg>
  ),
  Truck: ({ s = 18 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h11v9H3zM14 11h4l3 3v2h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
    </svg>
  ),
  Atom: ({ s = 18 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)" />
    </svg>
  ),
  ArrowRight: ({ s = 14 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Layers: ({ s = 22 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /><path d="m3 18 9 5 9-5" />
    </svg>
  ),
  Filter: ({ s = 22 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4h18l-7 9v6l-4 2v-8z" />
    </svg>
  ),
  Sigma: ({ s = 22 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 4H6l6 8-6 8h13" />
    </svg>
  ),
  Bell: ({ s = 22 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9a6 6 0 1 1 12 0c0 4 2 5 2 7H4c0-2 2-3 2-7z" /><path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  ),
  Sun: ({ s = 14 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" />
    </svg>
  ),
  Moon: ({ s = 14 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 13a8 8 0 1 1-9-10 6 6 0 0 0 9 10z" />
    </svg>
  ),
};

// === Brand mark — small SVG abstraction of the shield (no copying user's logo art) ===
const BrandMark = () => (
  <svg viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="bm-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--cyan)" />
        <stop offset="100%" stopColor="var(--blue)" />
      </linearGradient>
    </defs>
    <path d="M16 2 3 6.5V18c0 8 5.5 13.5 13 16 7.5-2.5 13-8 13-16V6.5z"
          stroke="url(#bm-g)" strokeWidth="1.4" fill="none" />
    <path d="M16 2v32" stroke="var(--line-2)" strokeWidth="1" />
    <path d="M9 10 11 14M11 14l-2 3M11 14h3M14 11v6" stroke="var(--cyan)" strokeWidth="1.2" fill="none" />
    <circle cx="14" cy="11" r="1" fill="var(--cyan)" />
    <circle cx="14" cy="17" r="1" fill="var(--cyan)" />
    <circle cx="9" cy="10" r="1" fill="var(--cyan)" />
    <circle cx="9" cy="17" r="1" fill="var(--cyan)" />
    <path d="M19 22h8" stroke="var(--red)" strokeWidth="1.4" />
    <path d="M21 22v-3M24 22v-5M27 22v-2" stroke="var(--red-2)" strokeWidth="1.2" />
  </svg>
);

// === Animated composite gauge ===
function Gauge({ score = 47, label = 'COMPOSITE RISK', drivers = [] }) {
  const r = 130;
  const cx = 170, cy = 170;
  const startAngle = -210, endAngle = 30; // 240° arc
  const sweep = endAngle - startAngle;
  const len = (Math.PI * 2 * r) * (sweep / 360);
  const fill = (score / 100) * len;

  const polarToXY = (angle) => {
    const a = (angle * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const [x1, y1] = polarToXY(startAngle);
  const [x2, y2] = polarToXY(endAngle);
  const arc = `M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2}`;

  // ticks every 10
  const ticks = [];
  for (let i = 0; i <= 10; i++) {
    const a = startAngle + (sweep * i) / 10;
    const [tx1, ty1] = polarToXY(a);
    const [tx2, ty2] = (() => {
      const r2 = r - (i % 5 === 0 ? 14 : 8);
      const aa = (a * Math.PI) / 180;
      return [cx + r2 * Math.cos(aa), cy + r2 * Math.sin(aa)];
    })();
    ticks.push(<line key={i} x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="var(--line-2)" strokeWidth="1.2" />);
  }

  // needle
  const angle = startAngle + (sweep * score) / 100;
  const [nx, ny] = polarToXY(angle - 0);
  const nr = r - 26;
  const ax = cx + nr * Math.cos((angle * Math.PI) / 180);
  const ay = cy + nr * Math.sin((angle * Math.PI) / 180);

  let level = 'NORMAL';
  let color = 'var(--cyan)';
  if (score >= 75) { level = 'EMERGENCY'; color = 'var(--red)'; }
  else if (score >= 55) { level = 'CRITICAL'; color = 'var(--red-2)'; }
  else if (score >= 35) { level = 'ELEVATED'; color = 'var(--amber)'; }

  return (
    <div className="gauge-card">
      <div className="gauge-head">
        <div>
          <div className="title">Unified Risk View · Site BR-117</div>
          <div className="eyebrow" style={{ marginTop: 4 }}>SCAN INTERVAL · 1.2s</div>
        </div>
        <div className="live">LIVE</div>
      </div>
      <div className="gauge-svg-wrap">
        <svg width="100%" viewBox="0 0 340 260" style={{ maxWidth: 380, display: 'block', margin: '0 auto' }}>
          <defs>
            <linearGradient id="g-arc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--cyan)" />
              <stop offset="55%" stopColor="var(--amber)" />
              <stop offset="100%" stopColor="var(--red)" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* track */}
          <path d={arc} stroke="var(--bg-2)" strokeWidth="14" fill="none" strokeLinecap="round" />
          {/* fill */}
          <path d={arc} stroke="url(#g-arc)" strokeWidth="14" fill="none" strokeLinecap="round"
                strokeDasharray={`${fill} ${len}`} style={{ transition: 'stroke-dasharray 1s ease' }} filter="url(#glow)" />
          {ticks}
          {/* needle */}
          <line x1={cx} y1={cy} x2={ax} y2={ay}
                stroke={color} strokeWidth="2.5" strokeLinecap="round"
                style={{ transition: 'all 1s cubic-bezier(.2,.8,.2,1)' }} />
          <circle cx={cx} cy={cy} r="6" fill="var(--bg)" stroke={color} strokeWidth="2" />
          {/* labels */}
          <text x={polarToXY(startAngle)[0] - 4} y={polarToXY(startAngle)[1] + 22} fontFamily="JetBrains Mono" fontSize="11" fill="var(--ink-3)">0</text>
          <text x={cx - 4} y={28} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="var(--ink-3)">50</text>
          <text x={polarToXY(endAngle)[0] - 8} y={polarToXY(endAngle)[1] + 22} fontFamily="JetBrains Mono" fontSize="11" fill="var(--ink-3)">100</text>
        </svg>
        <div className="gauge-center">
          <div>
            <div className="gauge-num">{Math.round(score)}<span className="of">/100</span></div>
            <div className="gauge-label">{label}</div>
            <div className="gauge-state" style={{ color }}>{level}</div>
          </div>
        </div>
      </div>
      <div className="gauge-drivers">
        {drivers.map((d) => (
          <div className="driver" key={d.name}>
            <div className="name">{d.name}</div>
            <div className="bar"><i style={{ width: `${d.v}%`, background: d.v >= 70 ? 'var(--red)' : d.v >= 45 ? 'var(--amber)' : 'var(--cyan)' }} /></div>
            <div className="v">{d.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Icon, BrandMark, Gauge });
