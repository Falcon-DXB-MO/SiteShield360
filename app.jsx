/* global React, ReactDOM, Gauge, Icon, BrandMark, TweaksPanel, useTweaks, TweakSection, TweakRadio */
const { useState, useEffect, useRef, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "cyan"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // sync theme to <body>
  useEffect(() => {
    document.body.classList.toggle('theme-dark', t.theme === 'dark');
    document.body.classList.toggle('theme-light', t.theme === 'light');
  }, [t.theme]);

  // accent variants
  useEffect(() => {
    const root = document.documentElement;
    if (t.accent === 'amber') {
      root.style.setProperty('--cyan', '#f59e0b');
      root.style.setProperty('--cyan-2', '#fbbf24');
    } else if (t.accent === 'green') {
      root.style.setProperty('--cyan', '#10b981');
      root.style.setProperty('--cyan-2', '#34d399');
    } else {
      root.style.removeProperty('--cyan');
      root.style.removeProperty('--cyan-2');
    }
  }, [t.accent]);

  // animated gauge state
  const scenarios = useMemo(() => ([
    {
      score: 38, label: 'COMPOSITE RISK',
      drivers: [
        { name: 'BOP_PRESSURE', v: 22 },
        { name: 'PERIMETER',    v: 41 },
        { name: 'WIND_LOAD',    v: 35 },
        { name: 'PIPE_TENSION', v: 18 },
      ],
    },
    {
      score: 67, label: 'DRIVER · WIND_LOAD',
      drivers: [
        { name: 'BOP_PRESSURE', v: 28 },
        { name: 'PERIMETER',    v: 52 },
        { name: 'WIND_LOAD',    v: 84 },
        { name: 'PIPE_TENSION', v: 36 },
      ],
    },
    {
      score: 82, label: 'DRIVER · PERIMETER',
      drivers: [
        { name: 'BOP_PRESSURE', v: 41 },
        { name: 'PERIMETER',    v: 91 },
        { name: 'WIND_LOAD',    v: 62 },
        { name: 'PIPE_TENSION', v: 48 },
      ],
    },
    {
      score: 51, label: 'DRIVER · BOP_PRESSURE',
      drivers: [
        { name: 'BOP_PRESSURE', v: 73 },
        { name: 'PERIMETER',    v: 38 },
        { name: 'WIND_LOAD',    v: 44 },
        { name: 'PIPE_TENSION', v: 29 },
      ],
    },
  ]), []);
  const [si, setSi] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSi((i) => (i + 1) % scenarios.length), 3600);
    return () => clearInterval(id);
  }, [scenarios.length]);
  const cur = scenarios[si];

  return (
    <div>
      {/* NAV */}
      <header className="nav">
        <div className="shell nav-inner">
          <a className="nav-brand" href="#top">
            <span className="word">SiteShield<span className="tld">360</span></span>
            <span className="logo logo-img"><img src="assets/logo-icon.png" alt="SiteShield360" /></span>
          </a>
          <nav className="nav-links">
            <a href="#problem">Problem</a>
            <a href="#how">How it works</a>
            <a href="#demo">Live view</a>
            <a href="#modules">Modules</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nav-cta">
            <button className="btn btn-ghost" onClick={() => setTweak('theme', t.theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
              {t.theme === 'dark' ? <Icon.Sun /> : <Icon.Moon />}
            </button>
            <a className="btn btn-primary" href="mailto:info@siteshield360.com?subject=SiteShield360%20pilot%20request">Request pilot <Icon.ArrowRight /></a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="top" data-screen-label="01 Hero">
        <div className="shell hero-inner">
          <div>
            <div className="hero-status">
              <span className="dot"></span>AI-CRV · US PATENT PENDING · 1,000+ STRESS-TEST SIMS
            </div>
            <h1 className="h-display">
              One trusted score.<br />
              <span className="accent">Zero blind spots.</span>
            </h1>
            <p className="hero-sub">
              SiteShield360 fuses every safety signal on a drilling, production, or pipeline site
              into a single 0–100 composite risk score — confidence-weighted, latency-aware, and
              operator-ready.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="mailto:info@siteshield360.com?subject=SiteShield360%20pilot%20request">Request pilot <Icon.ArrowRight /></a>
              <a className="btn btn-ghost" href="#how">View architecture</a>
            </div>
            <div className="hero-meta">
              <div><div className="key">Domains fused</div><div className="val">20+</div></div>
              <div><div className="key">Decision latency</div><div className="val">&lt; 2s</div></div>
              <div><div className="key">Cycle time</div><div className="val">1.2s scan</div></div>
            </div>
          </div>
          <Gauge score={cur.score} label={cur.label} drivers={cur.drivers} />
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" data-screen-label="02 Problem">
        <div className="shell">
          <div className="sec-head">
            <div>
              <span className="sec-num">02 / PROBLEM</span>
              <h2 className="h-section">Operators are drowning in disconnected alerts.</h2>
            </div>
            <p className="lede">
              Oil &amp; gas sites run 20+ independent risk domains — SCADA, GPS, radar, CCTV, wireline.
              Each has its own monitor, threshold, and alarm tone. Humans become the integration
              layer. Correlations are missed, criticals are diluted, fatigue compounds.
            </p>
          </div>

          <div className="problem-grid">
            <div className="problem-cell">
              <div className="num">73<span style={{fontSize: 28, color: 'var(--ink-3)'}}>%</span></div>
              <div className="lbl">of offshore incidents involve <strong style={{color:'var(--ink)'}}>multiple simultaneous</strong> risk factors no single system can correlate.</div>
              <div className="src">— UK HSE OFFSHORE 2023</div>
            </div>
            <div className="problem-cell">
              <div className="num">$15B</div>
              <div className="lbl">in preventable global drilling NPT every year — losses caused by reactive, not predictive, risk handling.</div>
              <div className="src">— GLOBAL DRILLING NPT</div>
            </div>
            <div className="problem-cell">
              <div className="num">60<span style={{fontSize: 28, color: 'var(--ink-3)'}}>min</span></div>
              <div className="lbl">average delay between risk emergence and human detection across disconnected dashboards.</div>
              <div className="src">— FIELD STUDY, AVG.</div>
            </div>
          </div>

          <div className="before-after">
            <div className="ba-side left">
              <h4><span className="tag">Before</span> Disconnected feeds</h4>
              <div className="alert-list">
                <div className="alert"><span className="src">SCADA</span><span className="msg">BOP pressure low</span><span className="ts">14:02:11</span></div>
                <div className="alert"><span className="src">RADAR</span><span className="msg">Threat detected · 3km</span><span className="ts">14:02:14</span></div>
                <div className="alert"><span className="src">GPS</span><span className="msg">Vehicle speed violation</span><span className="ts">14:02:17</span></div>
                <div className="alert"><span className="src">WIRELINE</span><span className="msg">Source cable tension high</span><span className="ts">14:02:19</span></div>
                <div className="alert"><span className="src">CCTV</span><span className="msg">Motion · zone 4 perimeter</span><span className="ts">14:02:23</span></div>
              </div>
            </div>
            <div className="ba-arrow"><Icon.ArrowRight s={20} /></div>
            <div className="ba-side right">
              <h4><span className="tag">After</span> Composite verification</h4>
              <div className="unified-out">
                <div className="uo-tag">UNIFIED SCORE</div>
                <div className="uo-score warn">68</div>
                <div className="uo-tag" style={{color: 'var(--amber)'}}>CRITICAL · ELEVATED</div>
                <div className="uo-driver">TOP DRIVER · CORRELATED PERIMETER + CABLE EVENT</div>
                <div className="alert" style={{marginTop: 12, width: '100%'}}>
                  <span className="src">CRV</span><span className="msg">Recommend hold operations</span><span className="ts">14:02:24</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" data-screen-label="03 How">
        <div className="shell">
          <div className="sec-head">
            <div>
              <span className="sec-num">03 / METHOD</span>
              <h2 className="h-section">Four stages. One score.</h2>
            </div>
            <p className="lede">
              The CRV pipeline takes raw module scores, weights them by sensor confidence,
              suppresses noise, and surfaces the dominant driver — without ever letting a
              critical signal get diluted by averaging.
            </p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="glyph"><Icon.Layers /></div>
              <div className="ix">01 · INGEST</div>
              <h4>Module scoring</h4>
              <p>Each native &amp; plug-in module (ThreatAware, OpsAware, FleetAware, HAZMAT) returns a 0–100 score with a sensor-confidence value over OPC-UA / MQTT.</p>
            </div>
            <div className="step">
              <div className="glyph"><Icon.Filter /></div>
              <div className="ix">02 · FILTER</div>
              <h4>Confidence &amp; freshness</h4>
              <p>Stale, noisy, or low-confidence inputs are down-weighted. Temporal filtering removes alarm chatter before it ever reaches the operator.</p>
            </div>
            <div className="step">
              <div className="glyph"><Icon.Sigma /></div>
              <div className="ix">03 · COMPOSE</div>
              <h4>Critical-priority fusion</h4>
              <p>Strong risks dominate the composite. Equal-weighting failures of legacy systems are eliminated — the score never hides danger behind averages.</p>
            </div>
            <div className="step">
              <div className="glyph"><Icon.Bell /></div>
              <div className="ix">04 · ACT</div>
              <h4>Operator view</h4>
              <p>One score. One alert level. One driver explanation. Sub-2s latency from sensor edge to decision surface — with emergency override built in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO / LIVE VIEW */}
      <section id="demo" data-screen-label="04 Live view">
        <div className="shell">
          <div className="sec-head">
            <div>
              <span className="sec-num">04 / LIVE VIEW</span>
              <h2 className="h-section">What the operator actually sees.</h2>
            </div>
            <p className="lede">
              Immediate vs. smoothed score. Driver explanation. Confidence indicator. No
              hunting across screens — every signal that matters lives in one frame.
            </p>
          </div>
          <LiveDashboard cur={cur} />
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" data-screen-label="05 Modules">
        <div className="shell">
          <div className="sec-head">
            <div>
              <span className="sec-num">05 / MODULES</span>
              <h2 className="h-section">Native modules. Built for the workflow.</h2>
            </div>
            <p className="lede">
              Buy one. Expand later. Every module returns the same scored, confidence-tagged
              signal into the composite — so adding capability never breaks the operator view.
            </p>
          </div>
          <div className="modules">
            <ModuleCard glyph={<Icon.Radar s={22} />} name="ThreatAware" sub="External threat detection" price="$20K" desc="Radar + AI vision (YOLO) fused for perimeter, drone, and FOD detection. 360° coverage with DJI AeroScope integration on the v2.0 roadmap.">
              <li>Multi-radar fusion</li>
              <li>Drone &amp; aerial threat ID</li>
              <li>FOD / debris classification</li>
            </ModuleCard>
            <ModuleCard glyph={<Icon.Pump s={22} />} name="OpsAware" sub="NPT prediction" price="$12K" desc="Real-time analysis of drilling and production telemetry. Stuck-pipe, kick, and equipment-degradation early warning before they become non-productive time.">
              <li>SCADA &amp; OPC-UA ingest</li>
              <li>Stuck-pipe early warning</li>
              <li>Equipment health scoring</li>
            </ModuleCard>
            <ModuleCard glyph={<Icon.Truck s={22} />} name="FleetAware" sub="Vehicle &amp; driver safety" price="$8K" desc="GPS, telematics, and event-based driver behavior fused with site-context — speed, fatigue, and proximity violations corrected for terrain and operations phase.">
              <li>Geofence &amp; speed events</li>
              <li>Driver fatigue signals</li>
              <li>Site-aware proximity</li>
            </ModuleCard>
            <ModuleCard glyph={<Icon.Atom s={22} />} name="HAZMATAware" sub="Source &amp; chemical safety" price="$25K" desc="Wireline source tracking, chemical inventory, and exposure modeling. Audit-grade chain-of-custody for radioactive and high-hazard sources, end-to-end.">
              <li>Source chain-of-custody</li>
              <li>Exposure modeling</li>
              <li>Inventory reconciliation</li>
            </ModuleCard>
          </div>

          <div className="bundles">
            <strong>Flexible bundles</strong>
            <span>·</span>
            <span className="pill">Pick one module to start</span>
            <span className="pill">Mix &amp; match across sites</span>
            <span className="pill hot">Enterprise (all 4 modules)</span>
          </div>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section className="cta" id="contact" data-screen-label="06 Contact">
        <div className="shell cta-inner">
          <span className="sec-num">06 / NEXT STEP</span>
          <h2 className="h-section">Turn blind spots into foresight.</h2>
          <p>
            We're moving from simulation-stage to edge-hardware integration with a select group
            of operators and design partners. If you run 100+ wells, a drilling fleet, or a
            critical-infrastructure pipeline — we want to talk.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="mailto:info@siteshield360.com?subject=SiteShield360%20pilot%20interest">Request pilot <Icon.ArrowRight /></a>
            <a className="btn btn-ghost" href="#modules">See modules</a>
          </div>
          <div className="cta-meta">
            <div><div className="key">IP STATUS</div><div className="val">US Patent Pending · PCT in progress</div></div>
            <div><div className="key">VALIDATION</div><div className="val">1,000+ stress-test simulations · edge integration in flight</div></div>
            <div><div className="key">CONTACT</div><div className="val">info@siteshield360.com</div></div>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell foot-inner">
          <div>SITESHIELD360 · COMPOSITE RISK VERIFICATION</div>
          <div>SITESHIELD360</div>
        </div>
      </footer>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Theme">
          <TweakRadio
            label="Mode"
            value={t.theme}
            options={[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }]}
            onChange={(v) => setTweak('theme', v)}
          />
          <TweakRadio
            label="Accent"
            value={t.accent}
            options={[{ value: 'cyan', label: 'Cyan' }, { value: 'amber', label: 'Amber' }, { value: 'green', label: 'Green' }]}
            onChange={(v) => setTweak('accent', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function ModuleCard({ glyph, name, sub, price, desc, children }) {
  return (
    <div className="module">
      <div className="module-top">
        <div className="module-glyph">{glyph}</div>
      </div>
      <div className="sub">{sub}</div>
      <h3>{name}</h3>
      <p className="desc">{desc}</p>
      <ul>{children}</ul>
    </div>
  );
}

// === Live dashboard mock ===
function LiveDashboard({ cur }) {
  // sparkline data — gently breathing
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick((x) => x + 1), 800); return () => clearInterval(id); }, []);
  const series = useMemo(() => {
    const out = [];
    for (let i = 0; i < 60; i++) {
      const base = cur.score;
      const v = base + Math.sin((i + tick) * 0.4) * 6 + Math.cos((i + tick) * 0.13) * 4;
      out.push(Math.max(8, Math.min(98, v)));
    }
    return out;
  }, [tick, cur.score]);

  const w = 920, h = 180;
  const path = series.map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i / (series.length - 1)) * w} ${h - (v / 100) * (h - 20) - 10}`).join(' ');
  const path2 = series.map((v, i) => {
    const sm = i < 4 ? v : (series[i] + series[i-1] + series[i-2] + series[i-3]) / 4;
    return `${i === 0 ? 'M' : 'L'} ${(i / (series.length - 1)) * w} ${h - (sm / 100) * (h - 20) - 10}`;
  }).join(' ');

  return (
    <div style={{
      border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden',
      background: 'var(--bg-1)', boxShadow: 'var(--shadow)',
    }}>
      {/* topbar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 20px', borderBottom: '1px solid var(--line)',
        fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)',
      }}>
        <div style={{ display: 'flex', gap: 18 }}>
          <span style={{ color: 'var(--ink)' }}>SITE BR-117 · OFFSHORE</span>
          <span>OPS PHASE · DRILLING · STAGE 3</span>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
            <i style={{width:6,height:6,borderRadius:'50%',background:'var(--green)'}}></i>
            12 OF 12 FEEDS HEALTHY
          </span>
          <span>CONF · 0.94</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', minHeight: 380 }}>
        {/* sidebar */}
        <div style={{ borderRight: '1px solid var(--line)', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="eyebrow">COMPOSITE</div>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
            fontSize: 76, lineHeight: 1, letterSpacing: '-0.04em',
            color: cur.score >= 75 ? 'var(--red)' : cur.score >= 55 ? 'var(--red-2)' : cur.score >= 35 ? 'var(--amber)' : 'var(--cyan)',
            transition: 'color .8s',
          }}>{Math.round(cur.score)}<span style={{ fontSize: 22, color: 'var(--ink-3)' }}>/100</span></div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
            {cur.score >= 75 ? 'EMERGENCY' : cur.score >= 55 ? 'CRITICAL' : cur.score >= 35 ? 'ELEVATED' : 'NORMAL'}
          </div>

          <div style={{ borderTop: '1px dashed var(--line)', paddingTop: 14, marginTop: 4 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>TOP DRIVER</div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18 }}>{cur.label.replace('DRIVER · ', '').replace('COMPOSITE RISK', 'Balanced')}</div>
            <div className="mono" style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>contributing {Math.max(...cur.drivers.map(d => d.v))}% of composite</div>
          </div>

          <div style={{ borderTop: '1px dashed var(--line)', paddingTop: 14 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>RECOMMENDATION</div>
            <div style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>
              {cur.score >= 75
                ? 'HOLD OPERATIONS · Notify on-tour engineer. Verify perimeter integrity before resume.'
                : cur.score >= 55
                ? 'CAUTION · Reduce trip speed. Monitor driver until score normalizes.'
                : cur.score >= 35
                ? 'OBSERVE · No action required. Confirm forecast wind window for next 2h.'
                : 'NORMAL · All systems within nominal envelope.'}
            </div>
          </div>
        </div>

        {/* main */}
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="eyebrow">SCORE · 60s WINDOW</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>
                <span style={{ color: 'var(--cyan)' }}>━</span> immediate &nbsp;
                <span style={{ color: 'var(--ink-2)' }}>━</span> smoothed
              </div>
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.12em' }}>RES · 1.2s</div>
          </div>

          <div style={{ position: 'relative', flex: 1, minHeight: 200 }}>
            <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="sf" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* horizontal bands */}
              {[35, 55, 75].map((b) => {
                const y = h - (b / 100) * (h - 20) - 10;
                return <line key={b} x1="0" x2={w} y1={y} y2={y} stroke="var(--line)" strokeDasharray="3 4" />;
              })}
              {[35, 55, 75].map((b) => {
                const y = h - (b / 100) * (h - 20) - 10;
                return <text key={`t${b}`} x={w-4} y={y-4} textAnchor="end" fontFamily="JetBrains Mono" fontSize="10" fill="var(--ink-3)">{b}</text>;
              })}
              {/* fill */}
              <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#sf)" />
              {/* smoothed */}
              <path d={path2} stroke="var(--ink-2)" strokeWidth="1.2" fill="none" />
              {/* immediate */}
              <path d={path} stroke="var(--cyan)" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* feed grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10,
            paddingTop: 14, borderTop: '1px solid var(--line)',
          }}>
            {cur.drivers.map((d) => {
              const c = d.v >= 70 ? 'var(--red)' : d.v >= 45 ? 'var(--amber)' : 'var(--cyan)';
              return (
                <div key={d.name} style={{ padding: 10, border: '1px solid var(--line)', borderRadius: 6, background: 'var(--bg-2)' }}>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.1em' }}>{d.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                    <div className="mono" style={{ fontSize: 22, color: c }}>{d.v}</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>conf 0.{80 + ((d.v * 7) % 19)}</div>
                  </div>
                  <div style={{ height: 3, background: 'var(--bg-1)', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                    <div style={{ width: `${d.v}%`, height: '100%', background: c, transition: 'width .8s' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
