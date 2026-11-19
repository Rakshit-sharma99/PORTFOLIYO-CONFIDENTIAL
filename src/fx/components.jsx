import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';

/* Reactive viewport width (replaces render-time window.innerWidth reads) */
export function useViewport() {
  const [w, setW] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1440));
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setW(window.innerWidth));
    };
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);
  return w;
}

/* Char-split masked reveal — animated by initReveals() via [data-split] */
export function SplitReveal({ text, className = '', style, charStyle }) {
  const words = useMemo(() => text.split(' '), [text]);
  return (
    <span className={`split-reveal ${className}`} style={style} data-split aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="sr-word" aria-hidden="true">
          {w.split('').map((c, ci) => (
            <span key={ci} className="sr-char" style={charStyle}>{c}</span>
          ))}
          {wi < words.length - 1 && <span className="sr-char">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

/* Hover text roll — each letter flips up to a duplicate with a stagger */
export function RollText({ text, className = '' }) {
  return (
    <span className={`roll-text ${className}`} aria-label={text}>
      {text.split('').map((c, i) => (
        <span key={i} className="roll-char" aria-hidden="true" style={{ '--i': i }}>
          <span className="roll-a">{c === ' ' ? ' ' : c}</span>
          <span className="roll-b">{c === ' ' ? ' ' : c}</span>
        </span>
      ))}
    </span>
  );
}

/* Velocity-reactive marquee */
export function VMarquee({ children, speed = 1, dir = 'left', className = '', style }) {
  return (
    <div className={`vmarquee ${className}`} data-speed={speed} data-dir={dir} style={style}>
      <div className="vmarquee-track">
        <div className="vmarquee-group">{children}</div>
        <div className="vmarquee-group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

/* Rotating circular text badge */
export function SpinBadge({ text = 'SOFTWARE DEVELOPER • MACBEASE • ', size = 140, magnetic = true, children }) {
  const id = useMemo(() => `badge-${Math.random().toString(36).slice(2, 8)}`, []);
  return (
    <div className="spin-badge" style={{ width: size, height: size }} data-magnetic={magnetic ? '0.3' : undefined} data-cursor={magnetic ? 'HIRE' : undefined}>
      <svg viewBox="0 0 200 200" data-spin style={{ width: '100%', height: '100%' }}>
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="spin-badge-text">
          {/* 2πr of the r=78 circle ≈ 490 — stretch the text to wrap exactly once */}
          <textPath href={`#${id}`} textLength="486" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <div className="spin-badge-core">{children}</div>
    </div>
  );
}

/* Floating image that follows the cursor (experience hover preview) */
export function FollowImage({ src, active }) {
  const ref = useRef(null);
  const imgRef = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3' });
    const rTo = gsap.quickTo(el, 'rotation', { duration: 0.9, ease: 'power3' });
    let lx = 0;
    const move = (e) => {
      xTo(e.clientX); yTo(e.clientY);
      rTo(gsap.utils.clamp(-14, 14, (e.clientX - lx) * 0.6));
      lx = e.clientX;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      scale: active ? 1 : 0,
      opacity: active ? 1 : 0,
      duration: active ? 0.7 : 0.4,
      ease: active ? 'expo.out' : 'power3.in',
      overwrite: 'auto',
    });
  }, [active]);

  useEffect(() => {
    if (!src || !imgRef.current) return;
    gsap.fromTo(imgRef.current, { scale: 1.4, filter: 'brightness(2)' }, { scale: 1, filter: 'brightness(1)', duration: 0.8, ease: 'expo.out' });
  }, [src]);

  return (
    <div ref={ref} className="follow-image">
      {src && <img ref={imgRef} src={src} alt="" />}
    </div>
  );
}

/* Film grain + vignette overlay */
export function Grain() {
  return <div className="grain" aria-hidden="true" />;
}

/* Image trail — spawns screenshots along the cursor path inside its parent */
export function ImageTrail({ images, threshold = 90 }) {
  const ref = useRef(null);
  useEffect(() => {
    const wrap = ref.current;
    const host = wrap?.parentElement;
    if (!wrap || !host || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const nodes = Array.from(wrap.children);
    let idx = 0, z = 1, last = null;

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (last && Math.hypot(x - last.x, y - last.y) < threshold) return;
      const dx = last ? x - last.x : 0, dy = last ? y - last.y : 0;
      last = { x, y };
      const el = nodes[idx];
      idx = (idx + 1) % nodes.length;
      el.style.zIndex = String(z++);
      gsap.killTweensOf(el);
      gsap.timeline()
        .set(el, { x, y, xPercent: -50, yPercent: -50, scale: 0.3, opacity: 1, rotation: gsap.utils.random(-12, 12) })
        .to(el, { scale: 1, x: x + dx * 0.6, y: y + dy * 0.6, duration: 0.6, ease: 'expo.out' })
        .to(el, { opacity: 0, scale: 0.6, y: `+=${120}`, duration: 0.9, ease: 'power3.in' }, 0.45);
    };
    const onLeave = () => { last = null; };
    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave);
    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [threshold]);

  return (
    <div ref={ref} className="image-trail" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <img key={i} src={images[i % images.length]} alt="" draggable="false" />
      ))}
    </div>
  );
}

/* Odometer — each digit is a rolling 0-9 column (animated by initOdometers) */
export function Odometer({ value, suffix = '' }) {
  const digits = String(value).split('');
  return (
    <span className="odometer" data-odometer={value} aria-label={`${value}${suffix}`}>
      {digits.map((d, i) => (
        <span key={i} className="odo-digit" aria-hidden="true">
          <span className="odo-col" data-target={d}>
            {Array.from({ length: 20 }).map((_, n) => <span key={n}>{n % 10}</span>)}
          </span>
        </span>
      ))}
      <span className="odo-suffix">{suffix}</span>
    </span>
  );
}

/* 3D tag sphere — items sit on a Fibonacci sphere, rotated in a ticker */
export function TagSphere({ items, radius = 260 }) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll('.sphere-tag'));
    const n = els.length;
    const pts = els.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      return [Math.cos(theta) * Math.sin(phi), Math.sin(theta) * Math.sin(phi), Math.cos(phi)];
    });
    let rx = 0, ry = 0, vx = 0.0025, vy = 0.004, tx = vx, ty = vy;
    let R = radius;
    const fit = () => { R = Math.min(radius, root.clientWidth * 0.44); };
    fit();
    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
      ty = nx * 0.03; tx = -ny * 0.03;
    };
    const onLeave = () => { tx = 0.0025; ty = 0.004; };
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: '100px' });
    io.observe(root);
    const lastFront = new Array(n).fill(null);
    const tick = () => {
      if (!visible) return;
      vx += (tx - vx) * 0.05; vy += (ty - vy) * 0.05;
      rx += vx; ry += vy;
      const cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry);
      for (let i = 0; i < n; i++) {
        const [x0, y0, z0] = pts[i];
        const y1 = y0 * cx - z0 * sx, z1 = y0 * sx + z0 * cx;
        const x2 = x0 * cy + z1 * sy, z2 = -x0 * sy + z1 * cy;
        const depth = (z2 + 1) / 2;
        const s = 0.6 + depth * 0.45;
        const el = els[i];
        el.style.transform = `translate3d(${(x2 * R).toFixed(1)}px,${(y1 * R).toFixed(1)}px,0) translate(-50%,-50%) scale(${s.toFixed(3)})`;
        el.style.opacity = (0.08 + depth * 0.92).toFixed(2);
        const front = depth > 0.86;
        if (lastFront[i] !== front) {
          lastFront[i] = front;
          el.classList.toggle('front', front);
          el.style.zIndex = front ? '2' : '1';
        }
      }
    };
    gsap.ticker.add(tick);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', fit);
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', fit);
    };
  }, [radius, items.length]);

  return (
    <div ref={ref} className="tag-sphere" data-cursor="STEER">
      {items.map((t, i) => <span key={i} className="sphere-tag">{t}</span>)}
    </div>
  );
}

/* Hand-drawn scribble — paths draw themselves on scroll (initReveals → [data-draw]) */
const SCRIBBLES = {
  underline: { vb: '0 0 300 40', d: ['M4 24 C 60 10, 120 34, 180 20 S 270 12, 296 22'] },
  circle: { vb: '0 0 320 110', d: ['M170 12 C 80 6, 12 28, 14 58 C 16 92, 130 104, 214 96 C 292 88, 314 52, 280 28 C 246 6, 168 4, 112 16'] },
  arrow: { vb: '0 0 200 120', d: ['M8 10 C 30 70, 90 104, 168 96', 'M146 80 L170 96 L146 110'] },
  zigzag: { vb: '0 0 300 30', d: ['M4 20 L 30 8 L 56 22 L 84 8 L 112 22 L 140 8 L 168 22 L 196 8 L 224 22 L 252 8 L 296 18'] },
};
export function Scribble({ type = 'underline', className = '', style, color = 'var(--accent)', width = 3, delay = 0, trigger }) {
  const s = SCRIBBLES[type];
  return (
    <svg className={`scribble ${className}`} viewBox={s.vb} style={style} fill="none" aria-hidden="true">
      {s.d.map((d, i) => (
        <path key={i} d={d} stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"
          data-draw data-delay={delay + i * 0.35} data-trigger={trigger} />
      ))}
    </svg>
  );
}

/* Live clock (own component so the App never re-renders per second) */
export function LiveClock({ tz = 'Asia/Kolkata', label = 'IN' }) {
  const [t, setT] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  const time = t.toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  return <span className="live-clock">{time} <b>[{label}]</b></span>;
}

/* Hanging badge — a pendulum on a chain. Swings with scroll velocity, can be
   grabbed and flung. Physics runs in the GSAP ticker only while on screen. */
export function HangingBadge({ href, links = 9, children, getVelocity }) {
  const rigRef = useRef(null);
  const badgeRef = useRef(null);
  useEffect(() => {
    const rig = rigRef.current;
    const badge = badgeRef.current;
    if (!rig || !badge) return;
    let angle = 0.25, vel = 0, dragging = false, moved = false, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(rig);

    const pivot = () => { const r = rig.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top }; };
    const onDown = (e) => { dragging = true; moved = false; badge.setPointerCapture?.(e.pointerId); };
    const onMove = (e) => {
      if (!dragging) {
        // brushing past the badge nudges it
        if (e.movementX) vel += e.movementX * 0.0009;
        return;
      }
      const p = pivot();
      const target = Math.atan2(-(e.clientX - p.x), e.clientY - p.y);
      const clamped = gsap.utils.clamp(-1.4, 1.4, target);
      vel = (clamped - angle) * 0.5;
      angle = clamped;
      moved = true;
    };
    const onUp = () => { dragging = false; };
    const onClick = (e) => { if (moved) { e.preventDefault(); moved = false; } };

    let lastV = 0;
    const tick = (_t, dms) => {
      if (!visible) return;
      const dt = Math.min(dms, 40) / 16.67;
      const v = getVelocity ? getVelocity() : 0;
      vel += (v - lastV) * 0.004 + v * 0.0004; // kick on scroll + acceleration
      lastV = v;
      if (!dragging) {
        vel += -0.012 * Math.sin(angle) * dt; // gravity
        vel *= Math.pow(0.985, dt);           // air damping
        angle += vel * dt;
      }
      rig.style.transform = `rotate(${(angle * 180 / Math.PI).toFixed(2)}deg)`;
    };
    gsap.ticker.add(tick);
    badge.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    badge.addEventListener('click', onClick);
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      badge.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      badge.removeEventListener('click', onClick);
    };
  }, [getVelocity]);

  return (
    <div ref={rigRef} className="hang-rig">
      <div className="hang-chain">
        {Array.from({ length: links }).map((_, i) => <span key={i} className={i % 2 ? 'link side' : 'link'} />)}
      </div>
      <a ref={badgeRef} href={href} className="hang-badge" data-cursor="GRAB ME" draggable="false">
        {children}
      </a>
    </div>
  );
}

/* Warp starfield — 2D canvas, speeds up with scroll velocity, idles offscreen */
export function Starfield({ count = 380, getVelocity }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, visible = false;
    const stars = Array.from({ length: count }, () => ({ x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: Math.random(), pz: 0 }));
    const size = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w; canvas.height = h; // DPR 1 on purpose: cheap + soft
    };
    size();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    let speed = 0.002;
    const tick = () => {
      if (!visible) return;
      const v = Math.abs(getVelocity ? getVelocity() : 0);
      speed += ((0.0018 + v * 0.0009) - speed) * 0.08;
      ctx.fillStyle = 'rgba(5,5,5,0.55)';
      ctx.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, f = Math.max(w, h) * 0.5;
      ctx.lineCap = 'round';
      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed;
        if (s.z <= 0.02) { s.x = (Math.random() - 0.5) * 2; s.y = (Math.random() - 0.5) * 2; s.z = 1; s.pz = 1; }
        const sx = cx + (s.x / s.z) * f, sy = cy + (s.y / s.z) * f;
        const px = cx + (s.x / s.pz) * f, py = cy + (s.y / s.pz) * f;
        if (sx < 0 || sx > w || sy < 0 || sy > h) continue;
        const b = 1 - s.z;
        ctx.strokeStyle = b > 0.85 ? `rgba(200,241,53,${b})` : `rgba(240,237,230,${b * 0.9})`;
        ctx.lineWidth = Math.max(0.6, b * 2.2);
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
      }
    };
    gsap.ticker.add(tick);
    window.addEventListener('resize', size);
    return () => { gsap.ticker.remove(tick); io.disconnect(); window.removeEventListener('resize', size); };
  }, [count, getVelocity]);
  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}
