/* =====================================================
   FX ENGINE — global interaction + motion layer
   Everything is attribute-driven so the JSX stays clean:
     data-cursor="LABEL"     → cursor morphs into a labelled blob
     data-magnetic[="0.4"]   → element is pulled toward the pointer
     data-tilt[="10"]        → 3D tilt + --mx/--my glare vars
     data-spotlight          → sets --mx/--my for radial spotlight borders
     data-skew               → skews with scroll velocity
     data-reveal="up|fade|clip|scale" → scroll-triggered entrance
     data-split              → char-by-char masked reveal (via SplitReveal)
     data-parallax="0.2"     → y-parallax while in view
     .vmarquee > .vmarquee-track → velocity-reactive infinite marquee
   ===================================================== */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* Shared live scroll velocity (fed by Lenis) for physics toys */
const scrollState = { velocity: 0 };
export const getScrollVelocity = () => scrollState.velocity;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- CURSOR ---------- */
function initCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  const label = document.querySelector('.cursor-label');
  if (!dot || !ring) return () => { };

  gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

  const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });

  let lastX = 0, lastY = 0, visible = false;
  // squash & stretch state, smoothed in a ticker (no per-event tweens)
  const st = { speed: 0, target: 0, angle: 0 };
  const stretchTick = () => {
    st.speed += (st.target - st.speed) * 0.2;
    st.target *= 0.85;
    if (ring.classList.contains('is-label')) {
      gsap.set(ring, { rotation: 0, scaleX: 1, scaleY: 1 });
      return;
    }
    gsap.set(ring, { rotation: st.angle, scaleX: 1 + st.speed, scaleY: 1 - st.speed * 0.45 });
  };
  gsap.ticker.add(stretchTick);

  const onMove = (e) => {
    const { clientX: x, clientY: y } = e;
    if (!visible) {
      visible = true;
      gsap.set([dot, ring], { x, y });
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
    }
    dotX(x); dotY(y); ringX(x); ringY(y);
    const dx = x - lastX, dy = y - lastY;
    const speed = Math.min(Math.hypot(dx, dy) / 80, 0.5);
    if (speed > 0.02) st.angle = Math.atan2(dy, dx) * 180 / Math.PI;
    st.target = Math.max(st.target, speed);
    lastX = x; lastY = y;
  };

  const onDown = () => gsap.to(dot, { scale: 0.5, duration: 0.2 });
  const onUp = () => gsap.to(dot, { scale: 1, duration: 0.35, ease: 'back.out(3)' });
  const onLeaveWindow = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
  const onEnterWindow = () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });

  const HOVER_SEL = 'a, button, [data-cursor], .nav-dot, .nav-monogram, .skill-pill, .gallery-pill, .flip-card';
  let current = null;

  const onOver = (e) => {
    const el = e.target.closest(HOVER_SEL);
    if (el === current) return;
    current = el;
    if (!el) {
      ring.classList.remove('is-hover', 'is-label');
      if (label) label.textContent = '';
      gsap.to(ring, { width: 40, height: 40, duration: 0.45, ease: 'expo.out' });
      gsap.to(dot, { scale: 1, duration: 0.3 });
      return;
    }
    const text = el.getAttribute('data-cursor');
    if (text) {
      ring.classList.add('is-label');
      ring.classList.remove('is-hover');
      if (label) label.textContent = text;
      gsap.to(ring, { width: 96, height: 96, duration: 0.5, ease: 'expo.out' });
      gsap.to(dot, { scale: 0, duration: 0.25 });
    } else {
      ring.classList.add('is-hover');
      ring.classList.remove('is-label');
      if (label) label.textContent = '';
      gsap.to(ring, { width: 64, height: 64, duration: 0.45, ease: 'expo.out' });
      gsap.to(dot, { scale: 0, duration: 0.25 });
    }
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onDown);
  window.addEventListener('pointerup', onUp);
  document.addEventListener('pointerover', onOver, { passive: true });
  document.documentElement.addEventListener('mouseleave', onLeaveWindow);
  document.documentElement.addEventListener('mouseenter', onEnterWindow);

  return () => {
    gsap.ticker.remove(stretchTick);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointerup', onUp);
    document.removeEventListener('pointerover', onOver);
    document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
    document.documentElement.removeEventListener('mouseenter', onEnterWindow);
  };
}

/* ---------- MAGNETIC / TILT / SPOTLIGHT (delegated) ---------- */
function initPointerFX() {
  const cache = new WeakMap();

  const getMag = (el) => {
    let m = cache.get(el);
    if (!m) {
      m = {
        x: gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' }),
        rx: gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3' }),
        ry: gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3' }),
      };
      cache.set(el, m);
    }
    return m;
  };

  let activeMag = null;
  let activeTilt = null;

  const onMove = (e) => {
    const t = e.target;

    // Magnetic
    const mag = t.closest ? t.closest('[data-magnetic]') : null;
    if (activeMag && activeMag !== mag) {
      gsap.to(activeMag, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' });
      cache.delete(activeMag);
      activeMag = null;
    }
    if (mag) {
      activeMag = mag;
      const s = parseFloat(mag.dataset.magnetic) || 0.35;
      const r = mag.getBoundingClientRect();
      const m = getMag(mag);
      m.x((e.clientX - (r.left + r.width / 2)) * s);
      m.y((e.clientY - (r.top + r.height / 2)) * s);
    }

    // Tilt
    const tilt = t.closest ? t.closest('[data-tilt]') : null;
    if (activeTilt && activeTilt !== tilt) {
      gsap.to(activeTilt, { rotationX: 0, rotationY: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
      cache.delete(activeTilt);
      activeTilt = null;
    }
    if (tilt) {
      activeTilt = tilt;
      const max = parseFloat(tilt.dataset.tilt) || 10;
      const r = tilt.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const m = getMag(tilt);
      m.ry((px - 0.5) * max * 2);
      m.rx(-(py - 0.5) * max * 2);
      tilt.style.setProperty('--mx', `${px * 100}%`);
      tilt.style.setProperty('--my', `${py * 100}%`);
    }

    // Spotlight (pure CSS var)
    const spot = t.closest ? t.closest('[data-spotlight]') : null;
    if (spot) {
      const r = spot.getBoundingClientRect();
      spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
      spot.style.setProperty('--my', `${e.clientY - r.top}px`);
    }
  };

  const onLeave = () => {
    if (activeMag) gsap.to(activeMag, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)' });
    if (activeTilt) gsap.to(activeTilt, { rotationX: 0, rotationY: 0, duration: 1, ease: 'elastic.out(1, 0.5)' });
    activeMag = activeTilt = null;
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('mouseleave', onLeave);
  return () => {
    window.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('mouseleave', onLeave);
  };
}

/* ---------- SCROLL VELOCITY: skew + marquees + spinning badges ---------- */
function initVelocityFX(lenis) {
  const skewEls = gsap.utils.toArray('[data-skew]');
  const skewSetters = skewEls.map((el) => gsap.quickTo(el, 'skewY', { duration: 0.6, ease: 'power3' }));

  const marquees = gsap.utils.toArray('.vmarquee').map((wrap) => {
    const track = wrap.querySelector('.vmarquee-track');
    const base = parseFloat(wrap.dataset.speed || '1') * (wrap.dataset.dir === 'right' ? -1 : 1);
    return { wrap, track, base, x: 0, width: 0, visible: false };
  }).filter((m) => m.track);

  // Only animate what is on screen
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const m = marquees.find((mm) => mm.wrap === en.target);
      if (m) m.visible = en.isIntersecting;
      const sp = spinnersRef.find((ss) => ss.el === en.target);
      if (sp) sp.visible = en.isIntersecting;
    });
  });
  const spinnersRef = [];
  marquees.forEach((m) => io.observe(m.wrap));
  let lastSkew = 0;

  const measure = () => marquees.forEach((m) => { m.width = m.track.scrollWidth / 2; });
  measure();

  const spinners = gsap.utils.toArray('[data-spin]').map((el) => ({ el, rot: 0, visible: true }));
  spinners.forEach((sp) => { spinnersRef.push(sp); io.observe(sp.el); });

  let velocity = 0;
  let direction = 1;
  const onScroll = (e) => {
    velocity = e.velocity || 0;
    if (e.direction) direction = e.direction;
  };
  lenis?.on?.('scroll', onScroll);

  const tick = (_t, deltaMs) => {
    const dt = Math.min(deltaMs, 50) / 16.67;
    const v = gsap.utils.clamp(-40, 40, velocity);
    const skew = Math.round(gsap.utils.clamp(-6, 6, v * -0.18) * 10) / 10;
    if (skew !== lastSkew) { lastSkew = skew; skewSetters.forEach((set) => set(skew)); }

    const boost = 1 + Math.abs(v) * 0.35;
    marquees.forEach((m) => {
      if (!m.width || !m.visible) return;
      m.x -= m.base * boost * direction * dt * 0.9;
      if (m.x <= -m.width) m.x += m.width;
      if (m.x > 0) m.x -= m.width;
      m.track.style.transform = `translate3d(${m.x}px,0,0)`;
    });

    spinners.forEach((s) => {
      if (!s.visible) return;
      s.rot += (0.25 + Math.abs(v) * 0.25) * direction * dt;
      s.el.style.transform = `rotate(${s.rot}deg)`;
    });
    velocity *= 0.92; // decay if lenis stops emitting
    scrollState.velocity = velocity;
  };
  gsap.ticker.add(tick);
  window.addEventListener('resize', measure);

  return () => {
    gsap.ticker.remove(tick);
    io.disconnect();
    lenis?.off?.('scroll', onScroll);
    window.removeEventListener('resize', measure);
  };
}

/* ---------- SCROLL REVEALS ---------- */
export function initReveals(root = document) {
  const triggers = [];

  // Split char reveal (markup created by <SplitReveal/>)
  gsap.utils.toArray(root.querySelectorAll('[data-split]')).forEach((el) => {
    const chars = el.querySelectorAll('.sr-char');
    const tw = gsap.fromTo(chars,
      { yPercent: 120, rotate: 12, opacity: 0 },
      {
        yPercent: 0, rotate: 0, opacity: 1,
        duration: 1.1, ease: 'expo.out',
        stagger: { each: 0.025 },
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    triggers.push(tw);
  });

  // Hand-drawn scribbles: stroke draws itself in
  gsap.utils.toArray(root.querySelectorAll('[data-draw]')).forEach((path) => {
    const len = path.getTotalLength ? path.getTotalLength() : 600;
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    const trig = path.dataset.trigger ? document.querySelector(path.dataset.trigger) : path.closest('svg');
    const tw = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.1,
      ease: 'power2.inOut',
      delay: parseFloat(path.dataset.delay || '0'),
      scrollTrigger: { trigger: trig || path, start: 'top 85%' },
    });
    triggers.push(tw);
  });

  gsap.utils.toArray(root.querySelectorAll('[data-reveal]')).forEach((el) => {
    const type = el.dataset.reveal;
    const delay = parseFloat(el.dataset.delay || '0');
    const st = { trigger: el, start: 'top 90%' };
    let tw;
    if (type === 'clip') {
      tw = gsap.fromTo(el,
        { clipPath: 'inset(100% 0% 0% 0% round 24px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.4, ease: 'expo.inOut', delay, scrollTrigger: st });
    } else if (type === 'scale') {
      tw = gsap.fromTo(el,
        { scale: 0.85, opacity: 0, y: 60 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', delay, scrollTrigger: st });
    } else if (type === 'fade') {
      tw = gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out', delay, scrollTrigger: st });
    } else if (type === 'stagger') {
      tw = gsap.fromTo(el.children,
        { y: 80, opacity: 0, rotateX: -35, transformOrigin: '50% 0%' },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12, delay, scrollTrigger: st });
    } else {
      tw = gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', delay, scrollTrigger: st });
    }
    triggers.push(tw);
  });

  gsap.utils.toArray(root.querySelectorAll('[data-parallax]')).forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.2;
    const tw = gsap.fromTo(el, { yPercent: -speed * 50 }, {
      yPercent: speed * 50,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    triggers.push(tw);
  });

  return () => triggers.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
}

/* ---------- PUBLIC ---------- */
export function initGlobalFX({ lenis }) {
  const cleanups = [];
  const fine = isFinePointer();
  const reduced = prefersReducedMotion();

  if (fine) {
    cleanups.push(initCursor());
    cleanups.push(initPointerFX());
  }
  if (!reduced) cleanups.push(initVelocityFX(lenis));

  return () => cleanups.forEach((c) => c && c());
}

/* ---------- ODOMETERS ---------- */
export function initOdometers() {
  const tweens = [];
  gsap.utils.toArray('.odometer').forEach((odo) => {
    const cols = odo.querySelectorAll('.odo-col');
    gsap.set(cols, { yPercent: 0 });
    const tw = gsap.to(cols, {
      // roll one full lap (0-9) then land on the digit → index 10 + d of 20 rows
      yPercent: (i, el) => -((10 + parseInt(el.dataset.target, 10)) * 5),
      duration: 2.4,
      ease: 'expo.inOut',
      stagger: { each: 0.12, from: 'end' },
      scrollTrigger: { trigger: odo, start: 'top 85%' },
    });
    tweens.push(tw);
  });
  return () => tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
}
