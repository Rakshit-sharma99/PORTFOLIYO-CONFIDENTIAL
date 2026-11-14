import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { scrambleText } from './utils/scrambleText';
import GallerySection from './components/GallerySection';
import BackgroundMusic from './components/BackgroundMusic';
import MatrixEntry from './components/MatrixEntry';
import { initGlobalFX, initReveals, initOdometers, isFinePointer, prefersReducedMotion, getScrollVelocity } from './fx/fx';
import { useViewport, SplitReveal, RollText, VMarquee, SpinBadge, FollowImage, ImageTrail, Odometer, Scribble, LiveClock, HangingBadge, Starfield } from './fx/components';
import { Github, Linkedin, Mail, Phone, ExternalLink, Zap, Home, User, Code, Trophy, Briefcase, Play, FileText, Sun } from 'lucide-react';
import metafurySnap from './assets/websitesnaps/metafury.webp';
import desitarzanSnap from './assets/websitesnaps/Desitarzan.webp';
import dentalclinicSnap from './assets/websitesnaps/dentalclinic.webp';
import aistylerSnap from './assets/websitesnaps/AiStyler.webp';
import netflixSnap from './assets/websitesnaps/Netflix.webp';
import algovizSnap from './assets/websitesnaps/algorithmviz.webp';
import face1 from './assets/FOOTERIMG/face1.webp';
import face2 from './assets/FOOTERIMG/face2.webp';
import resumeFile from './assets/RESUME/Rakshit Resume.png';
import cert1 from './assets/Certificates/Build generative ai.pdf';
import cert2 from './assets/Certificates/ChatGPT-4 Prompt Engineering ChatGPT, Generative AI & LL.pdf';
import cert3 from './assets/Certificates/Computational Theory Language Principle & Finite Automata Theor.pdf';
import cert4 from './assets/Certificates/Master Generative AI &.pdf';

gsap.registerPlugin(ScrollTrigger);

/* ================================================
   RAKSHIT SHARMA — ULTRA CINEMATIC PORTFOLIO  v2
   7 Scenes · GSAP · Lenis · All 5 Changes Applied
   ================================================ */

// ─── Data ────────────────────────────────────────
const PERSONAL = {
  name: 'Rakshit Sharma',
  role: 'Frontend Developer',
  email: 'rakshitsharmalpu@gmail.com',
  phone: '+91-7018672992',
  github: 'https://github.com/Rakshit-sharma99',
  linkedin: 'https://www.linkedin.com/in/rakshit-sharma99',
  uni: 'Lovely Professional University, Punjab',
  cgpa: '7.33',
};

const EXPERIENCE = [
  {
    num: '01',
    company: 'Meta Fury',
    subtitle: 'Energy Drink Brand Website',
    role: 'Web Developer',
    when: 'Since Jan 2026',
    stack: ['React', 'Node.js', 'MongoDB'],
    impact: '40% brand reach uplift · €400 project value',
    url: 'https://metafury.fit',
    snap: metafurySnap,
  },
  {
    num: '02',
    company: 'Dental Clinic',
    subtitle: 'Appointment Booking Platform',
    role: 'Web Developer',
    when: 'Live Jul 2025',
    stack: ['React', 'Node.js', 'Express', 'MongoDB Atlas'],
    impact: '30% increase in patient inquiries · INR 20,000',
    url: 'https://moderndentalclinicphagwara.com',
    snap: dentalclinicSnap,
  },
  {
    num: '03',
    company: 'Desi Tarzan Store',
    subtitle: 'E-Commerce Platform',
    role: 'Web Developer',
    when: 'Live Jun 2025',
    stack: ['Wix', 'Custom Styling'],
    impact: 'Full store setup · INR 8,000',
    url: 'https://desitarzanstore.com',
    snap: desitarzanSnap,
  },
];

const PROJECTS = [
  { num: '01', title: 'AI Styler', sub: 'Full-Stack AI Project', when: 'Jan 2026', stack: ['React', 'Node', 'MongoDB', 'Multer', 'Sharp'], color: '#C8F135', url: '#', snap: aistylerSnap },
  { num: '02', title: 'Netflix Clone', sub: 'Streaming Platform UI', when: 'Nov 2025', stack: ['React', 'Firebase', 'TMDB API'], color: '#E50914', url: 'https://github.com/Rakshit-sharma99/Netflix-Clone', snap: netflixSnap },
  { num: '03', title: 'Meta Fury', sub: 'Energy Drink Brand Site', when: 'Jan 2026', stack: ['React', 'Node.js', 'MongoDB'], color: '#FF8C00', url: 'https://metafury.fit', snap: metafurySnap },
  { num: '04', title: 'Dental Clinic', sub: 'Appointment System', when: 'Jul 2025', stack: ['React', 'Node.js', 'Express', 'Atlas'], color: '#4D9FFF', url: 'https://dentalclinic.com', snap: dentalclinicSnap },
  { num: '05', title: 'Algorithm Viz', sub: 'Pathfinding Visualizer', when: 'Feb 2026', stack: ['Java', 'Swing', 'BFS', 'DFS', 'A*'], color: '#A855F7', url: 'https://github.com/Rakshit-sharma99/ADVANCE-PATH-FINDING-VISUALIZER', snap: algovizSnap },
  { num: '06', title: 'Desi Tarzan', sub: 'E-Commerce Store', when: 'Jun 2025', stack: ['Wix', 'Custom CSS'], color: '#22C55E', url: 'https://desitarzan.com', snap: desitarzanSnap },
];

const SKILLS = {
  Frontend: ['React', 'HTML5', 'CSS3', 'Tailwind', 'GSAP', 'JavaScript'],
  Backend: ['Java', 'Node.js', 'Express', 'Spring MVC', 'Laravel', 'REST API'],
  Database: ['MongoDB', 'MySQL', 'Atlas'],
  Tools: ['Git', 'GitHub', 'Figma', 'Postman', 'VS Code', 'Xampp', 'Cursor'],
};

const STATS = [
  { value: 300, suffix: '+', label: 'Problems Solved' },
  { value: 12, suffix: '+', label: 'Clients' },
  { value: 999, suffix: '+', label: 'Cups of Coffee' },
  { value: 99999, suffix: '+', label: 'Line of Code' },
];

const CERTS_DRIVE_LINK = 'https://drive.google.com/drive/folders/YOUR_FOLDER_ID';

const CERTS_DATA = [
  { issuer: 'Infosys Springboard', title: 'Build Generative AI Apps & Solutions', date: 'AUG 2025', color: '#C8F135', credentialId: 'ISB-GAI-2025-0847', pdf: cert1 },
  { issuer: 'Udemy', title: 'ChatGPT-4 Prompt Engineering', date: 'APR 2024', color: '#4D9FFF', credentialId: 'NPTEL-PSSM-2024-1023', pdf: cert2 },
  { issuer: 'NPTEL', title: 'Computational Theory Language Principle', date: 'SEP 2024', color: '#FF8C00', credentialId: 'COUR-CN-2024-5591', pdf: cert3 },
  { issuer: 'Infosys Springboard', title: 'Master Generative AI', date: 'OCT 2024', color: '#A855F7', credentialId: 'COUR-SE-2024-7732', pdf: cert4 },
];

const TECH_MARQUEE = ['REACT', 'NODE.JS', 'JAVA', 'EXPRESS', 'MONGODB', 'MYSQL', 'REST API', 'GSAP', 'FIGMA', 'GIT', 'DSA', 'MERN'];

const SECTIONS = ['hero', 'statement', 'about', 'experience', 'process', 'projects', 'gallery', 'skills', 'coding-arena', 'certifications'];
const SECTION_LABELS = ['INTRO', 'MANIFESTO', 'ABOUT', 'CLIENT WORK', 'PROCESS', 'PROJECTS', 'STACK', 'SKILLS', 'ARENA', 'CREDENTIALS'];

const STORY_LINES = [
  'I craft full-stack experiences.',
  'MERN is my weapon.',
  'Java is my logic.',
  'Clean UI is my obsession.',
  '3 live client projects shipped.',
  '300+ DSA problems solved.',
  'Ranked #1 at university.',
  'Always building.',
];

const PROCESS = [
  { num: '01', title: 'Discover', desc: 'We dig into your goals, your audience and what success looks like — then lock a clear scope and timeline.' },
  { num: '02', title: 'Design', desc: 'Wireframes and a distinct visual direction in Figma, so you see the product before a single line of code.' },
  { num: '03', title: 'Develop', desc: 'React + Node builds with smooth motion, clean architecture and performance budgets baked in from day one.' },
  { num: '04', title: 'Launch', desc: 'Deployment, SEO basics, analytics and a proper hand-over — plus support after the site goes live.' },
];

const CODING_PROFILES = [
  {
    platform: 'LEETCODE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png',
    color: '#FFA116',
    stats: [
      { label: 'SOLVED', value: '250+' },
      { label: 'RANK', value: '5,50,500+' },
      { label: 'STREAK', value: '70+' }
    ],
    about: 'Mastering algorithmic problem solving and DSA.',
    url: 'https://leetcode.com/u/reddragon9999/'
  },
  {
    platform: 'CODEFORCES',
    logo: 'https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3628695-3029920.png',
    color: '#318CF2',
    stats: [
      { label: 'SUBMISSIONS', value: '150+' },
      { label: 'RANK', value: 'UNRANKED' },
      { label: 'PROBLEMS', value: '50+' }
    ],
    about: 'Competitive programmer focusing on speed and accuracy.',
    url: 'https://codeforces.com/profile/Rakshit9999'
  },
  {
    platform: 'GEEKSFORGEEKS',
    logo: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png',
    color: '#2F8D46',
    stats: [
      { label: 'SCORE', value: '0' },
      { label: 'PROBLEMS', value: '25+' },
      { label: 'GLOBAL RANK', value: '10,00,000+' }
    ],
    about: 'Mastering core Computer Science fundamentals.',
    url: 'https://www.geeksforgeeks.org/user/rakshitsharmalpu/'
  }
];

const CodingFlipCard = ({ platform, logo, color, stats, about, url }) => {
  return (
    <div className="flip-card" style={{ '--glow-color': color }}>
      <div className="flip-card-inner">
        <div className="card-glow" />

        {/* FRONT SIDE */}
        <div className="flip-card-front">
          <div className="platform-logo-container">
            <img src={logo} alt={platform} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: platform === 'LEETCODE' ? 'invert(1)' : 'none' }} />
          </div>
          <h3 className="font-display" style={{ color: '#fff', fontSize: 28, letterSpacing: '0.05em' }}>{platform}</h3>
          <div style={{ position: 'absolute', bottom: 30, width: '100%', textAlign: 'center' }}>
            <span className="font-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>HOVER TO REVEAL</span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="flip-card-back">
          <h4 className="font-mono" style={{ fontSize: 12, color: color, letterSpacing: '0.2em', marginBottom: 20 }}>{platform} STATS</h4>

          <div className="back-stats-row">
            {stats.map((s, i) => (
              <div key={i} className="stat-box" style={{ textAlign: 'left' }}>
                <div className="font-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                <div className="font-display" style={{ fontSize: 24, color: '#fff' }}>{s.value}</div>
              </div>
            ))}
          </div>

          <p className="font-body" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 24, lineHeight: 1.6 }}>
            {about}
          </p>

          <div style={{ position: 'absolute', bottom: 30 }}>
            <a href={url} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
              <ExternalLink size={16} color={color} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


// ─── Performance Optimized Sub-Components — Prevents App from re-rendering every second ───
const FooterClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <>{time.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })}</>;
};

const FooterPortrait = ({ face1, face2 }) => {
  const [index, setIndex] = useState(0);
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const inter = setInterval(() => {
      setGlitch(true);
      setTimeout(() => {
        setIndex(p => p === 0 ? 1 : 0);
        setTimeout(() => setGlitch(false), 80);
      }, 100);
    }, 2000);
    return () => clearInterval(inter);
  }, []);

  return (
    <img
      src={index === 0 ? face1 : face2}
      alt="Rakshit Sharma"
      className={glitch ? "footer-glitch-active" : ""}
      style={{
        height: 'auto',
        maxHeight: '82vh',
        width: '140%',
        objectFit: 'contain',
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))',
        verticalAlign: 'bottom',
        willChange: 'transform, filter'
      }}
    />
  );
};

const splitChars = (text) =>
  text.split('').map((c, i) => (
    <span key={i} className="char" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
      {c}
    </span>
  ));

const marqueeText = TECH_MARQUEE.map(t => t).join(' · ') + ' · ';

// Tubes random color helper - Hoisted to top level
const randomColorsArr = (count) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

// ─── App Component ───────────────────────────────
export default function App() {
  const appRef = useRef(null);

  const progressRef = useRef(null);
  const lenisRef = useRef(null);
  const heroRef = useRef(null);
  const cornerGridRefs = useRef([]);
  const flashRef = useRef(null);

  const projectSectionRef = useRef(null);
  const projectHorizontalRef = useRef(null);
  const tubesAppRef = useRef(null); // Ref to store Tubes instance
  const tubesInited = useRef(false); // Flag to prevent double init

  const [matrixDone, setMatrixDone] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const counterRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoverSnap, setHoverSnap] = useState(null);
  const [hoverActive, setHoverActive] = useState(false);
  const vw = useViewport();



  // ─── Memoized Splits (Prevents animation disruption on re-render) ───
  const heroFirstChars = useMemo(() => splitChars('RAKSHIT'), []);
  const heroLastChars = useMemo(() => splitChars('SHARMA'), []);
  const statementWordsMarkup = useMemo(() =>
    'I BUILD THINGS THAT LIVE ON THE WEB'.split(' ').map((word, i) => (
      <span
        key={i}
        className="statement-word"
        style={{ display: 'inline-block', margin: '0 0.15em', whiteSpace: 'nowrap' }}
      >
        {word}
      </span>
    )), []);
  const [activeSection, setActiveSection] = useState(0);


  // Cursor helpers removed



  // ─── Curtain page transition ─────────
  const curtainBusy = useRef(false);
  const scrollToSection = useCallback((id) => {
    const target = document.querySelector(`#${id}`);
    const lenis = lenisRef.current;
    if (!lenis || !target || curtainBusy.current) return;
    if (prefersReducedMotion()) { lenis.scrollTo(target, { immediate: true }); return; }

    curtainBusy.current = true;
    const cols = flashRef.current?.querySelectorAll('.page-curtain-col');
    const label = document.querySelector('.page-curtain-label');
    const idx = SECTIONS.indexOf(id);
    if (label) label.textContent = idx >= 0 ? SECTION_LABELS[idx] : id.toUpperCase();

    gsap.timeline({ onComplete: () => { curtainBusy.current = false; } })
      .set(cols, { transformOrigin: 'bottom' })
      .to(cols, { scaleY: 1, duration: 0.55, ease: 'expo.inOut', stagger: { each: 0.05, from: 'center' } })
      .fromTo(label, { opacity: 0, yPercent: 30 }, { opacity: 1, yPercent: 0, duration: 0.35, ease: 'power3.out' }, '-=0.2')
      .add(() => { lenis.scrollTo(target, { immediate: true, force: true }); ScrollTrigger.update(); })
      .to(label, { opacity: 0, yPercent: -30, duration: 0.3, ease: 'power3.in' }, '+=0.15')
      .set(cols, { transformOrigin: 'top' })
      .to(cols, { scaleY: 0, duration: 0.6, ease: 'expo.inOut', stagger: { each: 0.05, from: 'edges' } }, '-=0.1');
  }, []);

  // Combined throttle helper
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function (...args) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  // ─── Master useEffect: Lenis + Cursor ──
  useEffect(() => {
    // Lenis — smoother, silkier scroll
    // Lenis — silky lerp-based scroll, fully synced with ScrollTrigger
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    if (import.meta.env.DEV) window.__lenis = lenis;
    lenis.stop(); // locked until the intro finishes

    lenis.on('scroll', ScrollTrigger.update);
    const lenisTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisTick);
    gsap.ticker.lagSmoothing(0);

    // Global FX layer (cursor, magnetic, tilt, velocity skew/marquees)
    const fxCleanup = initGlobalFX({ lenis });

    // Active section tracker removed from here, moving Scroll Progress to initSceneAnimations for accurate calculation

    // Active section tracker
    SECTIONS.forEach((id, i) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        refreshPriority: -1,
        onEnter: () => setActiveSection(i),
        onEnterBack: () => setActiveSection(i),
      });
    });

    // Scroll to Top visibility
    ScrollTrigger.create({
      start: 'top -800',
      onUpdate: (self) => {
        setShowScrollTop(self.scroll() > 800);
      }
    });
    // ─── Corner LeetCode Torch (Throttled update) ──
    const heroEl = heroRef.current;
    const corners = cornerGridRefs.current.filter(Boolean);
    let heroMoveRaf = null;

    const updateTorch = (e) => {
      if (!heroEl || corners.length === 0) return;
      const rect = heroEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const w = rect.width, h = rect.height;
      const distances = [
        Math.hypot(x, y),
        Math.hypot(w - x, y),
        Math.hypot(x, h - y),
        Math.hypot(w - x, h - y),
      ];
      const maxDist = 500;
      corners.forEach((corner, i) => {
        if (!corner) return;
        const proximity = Math.max(0, 1 - distances[i] / maxDist);
        corner.style.opacity = String(proximity * 0.85);
      });
    };

    const throttledHeroMove = throttle(updateTorch, 16); // ~60fps but steady

    const onHeroLeave = () => {
      corners.forEach(c => { if (c) gsap.to(c, { opacity: 0, duration: 0.5 }); });
    };

    if (heroEl) {
      heroEl.addEventListener('mousemove', throttledHeroMove);
      heroEl.addEventListener('mouseleave', onHeroLeave);
    }

    // Tubes Cursor Integration (Optimized for One-Time Init + Cleanup)
    let onTubesResize = null;
    let tubesRO = null;
    const initTubesEffect = () => {
      if (tubesInited.current) return;
      tubesInited.current = true;

      // The library forces pixelRatio 2 (4x pixels on a 1x screen). The bloom output is
      // soft glow, so rendering at 0.75x and letting CSS upscale is visually identical
      // and ~7x cheaper than the default.
      const targetPr = 0.75;
      const start = () => {
        const TubesCursorManager = window.TubesCursor;
        const canvas = document.getElementById('hero-tubes-canvas');

        if (!TubesCursorManager || !canvas) {
          heroMoveRaf = requestAnimationFrame(start);
          return;
        }

        console.log('Initializing Tubes Cursor...');
        try {
          const instance = TubesCursorManager(canvas, {
            bloom: { threshold: 0.1, strength: 0.55, radius: 0.3 },
            tubes: {
              colors: ["#35f14e", "#51b52a", "#267356"],
              lights: {
                intensity: 55,
                colors: ["#C8F135", "#ff7403", "#ff12f3", "#60aed5"]
              }
            }
          });
          tubesAppRef.current = instance;

          if (instance && instance.three) {
            const { renderer } = instance.three;
            instance.three.minPixelRatio = targetPr;
            instance.three.maxPixelRatio = targetPr;

            // Draw the bloom pipeline every other frame (30fps). The canvas keeps
            // showing its last frame in between, and the tubes are slow, soft motion.
            const origRender = instance.three.render;
            if (typeof origRender === 'function') {
              let flip = false;
              instance.three.render = (...args) => {
                flip = !flip;
                return flip ? origRender.apply(instance.three, args) : undefined;
              };
            }
            // Always size from the live viewport — canvas.clientWidth gets frozen
            // to the inline px style three.js writes, which made the canvas stick
            // at its first size (the visible "black box" after a window resize).
            const getSafeSize = () => {
              const w = Math.min(window.innerWidth, 4096);
              const h = Math.min(window.innerHeight, 4096);
              return { w, h, pw: Math.floor(w * targetPr), ph: Math.floor(h * targetPr) };
            };

            const originalSetSize = renderer.setSize.bind(renderer);
            const originalSetPixelRatio = renderer.setPixelRatio.bind(renderer);

            renderer.setPixelRatio = () => originalSetPixelRatio(targetPr);
            renderer.setPixelRatio(targetPr);

            renderer.setSize = () => {
              const { w, h, pw, ph } = getSafeSize();
              if (instance.bloomPass && typeof instance.bloomPass.setSize === 'function') {
                try {
                  if (instance.bloomPass.renderTargetsHorizontal?.length > 0) {
                    instance.bloomPass.setSize(pw, ph);
                  }
                } catch (e) { console.error('Error in bloomPass setSize:', e); }
              }
              const res = originalSetSize(w, h, false);
              canvas.style.width = '100%';
              canvas.style.height = '100%';
              const composer = instance.three.composer || instance.composer;
              if (composer && typeof composer.setSize === 'function') {
                try { composer.setSize(w, h); } catch { /* ignore */ }
              }
              return res;
            };

            instance.three.resize();

            let resizeT = 0;
            onTubesResize = () => {
              clearTimeout(resizeT);
              resizeT = setTimeout(() => {
                try { instance.three.resize(); } catch { renderer.setSize(window.innerWidth, window.innerHeight); }
              }, 120);
            };
            window.addEventListener('resize', onTubesResize);
            if ('ResizeObserver' in window && canvas.parentElement) {
              tubesRO = new ResizeObserver(() => onTubesResize && onTubesResize());
              tubesRO.observe(canvas.parentElement);
            }
          }

          const handleGlobalClick = () => {
            if (tubesAppRef.current?.tubes) {
              const colors = randomColorsArr(3);
              const lightsColors = randomColorsArr(4);
              tubesAppRef.current.tubes.setColors(colors);
              tubesAppRef.current.tubes.setLightsColors(lightsColors);
            }
          };

          window.addEventListener('click', handleGlobalClick);
          return () => window.removeEventListener('click', handleGlobalClick);
        } catch (err) {
          console.error('Error during Tubes Cursor init:', err);
        }
      };

      return start();
    };

    const cleanupInit = initTubesEffect();

    // Tubes only live in the hero. When neither is on screen the
    // wrapper goes display:none — the library's IntersectionObserver then pauses
    // its render loop entirely (opacity:0 alone kept the WebGL bloom running).
    const tubesZones = new Set(['hero']);
    const tubesWrap = document.querySelector('.tubes-canvas-wrapper');
    const syncTubes = () => {
      if (!tubesWrap) return;
      if (tubesZones.size) {
        tubesWrap.style.display = 'block';
        gsap.to(tubesWrap, { opacity: 1, duration: 0.8, overwrite: 'auto' });
      } else {
        gsap.to(tubesWrap, { opacity: 0, duration: 0.4, overwrite: 'auto', onComplete: () => { if (!tubesZones.size) tubesWrap.style.display = 'none'; } });
      }
    };
    ['hero'].forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top bottom',
        end: 'bottom top',
        refreshPriority: -1,
        onToggle: (self) => { if (self.isActive) tubesZones.add(id); else tubesZones.delete(id); syncTubes(); },
      });
    });

    return () => {
      if (heroEl) {
        heroEl.removeEventListener('mousemove', throttledHeroMove);
        heroEl.removeEventListener('mouseleave', onHeroLeave);
      }
      if (heroMoveRaf) cancelAnimationFrame(heroMoveRaf);
      if (cleanupInit && typeof cleanupInit === 'function') cleanupInit();
      if (onTubesResize) window.removeEventListener('resize', onTubesResize);
      tubesRO?.disconnect();

      if (tubesAppRef.current) {
        try {
          if (typeof tubesAppRef.current.dispose === 'function') tubesAppRef.current.dispose();
          else if (typeof tubesAppRef.current.destroy === 'function') tubesAppRef.current.destroy();
        } catch (e) { console.error('Error destroying tubes instance:', e); }
        tubesAppRef.current = null;
        tubesInited.current = false;
      }

      ScrollTrigger.getAll().forEach((t) => t.kill());
      fxCleanup();
      gsap.ticker.remove(lenisTick);
      lenis.destroy();
    };
  }, []);

  // Tubes random color helper moved to top level

  // ─── Preloader Timeline — giant counter → fluted-glass strip exit ───
  useEffect(() => {
    if (!matrixDone) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setPreloaderDone(true);
          lenisRef.current?.start();
        },
      });

      const c = { val: 0 };
      tl.fromTo('.preloader-meta', { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'expo.out' })
        .fromTo('.preloader-count', { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: 'expo.out' }, 0)
        .to(c, {
          val: 100,
          duration: 2.1,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) counterRef.current.textContent = String(Math.floor(c.val)).padStart(3, '0');
            gsap.set('.preloader-line-fill', { scaleX: c.val / 100 });
          },
        }, 0.2)
        .to('.preloader-count', { yPercent: -105, duration: 0.7, ease: 'expo.in' }, '+=0.1')
        .to('.preloader-meta, .preloader-line', { opacity: 0, yPercent: -40, duration: 0.5, ease: 'power3.in' }, '<')
        // start the hero entrance underneath while the glass strips lift
        .call(() => requestAnimationFrame(() => initSceneAnimations()))
        .to('.preloader-strip', { yPercent: -101, duration: 1.1, ease: 'expo.inOut', stagger: { each: 0.05, from: 'center' } }, '<');
    }, appRef);

    return () => ctx.revert();
  }, [matrixDone]);

  const animationsInitiated = useRef(false);
  // ─── Scene Animations ──────────────────────────
  const initSceneAnimations = () => {
    if (animationsInitiated.current) return;
    animationsInitiated.current = true;
    const fine = isFinePointer();

    // === HERO entry — name splits around the portrait ===
    const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    heroTl
      .fromTo('.hero-portrait', { yPercent: 35, opacity: 0, scale: 1.08 }, { yPercent: 0, opacity: 1, scale: 1, duration: 1.8 }, 0.1)
      .fromTo('.hero-first .char',
        { yPercent: 110, rotationX: -95, opacity: 0, transformOrigin: '50% 100% -40px' },
        { yPercent: 0, rotationX: 0, opacity: 1, stagger: 0.05, duration: 1.4 }, 0.2)
      .fromTo('.hero-last .char',
        { yPercent: -110, rotationX: 95, opacity: 0, transformOrigin: '50% 0% -40px' },
        { yPercent: 0, rotationX: 0, opacity: 1, stagger: { each: 0.05, from: 'end' }, duration: 1.4 }, 0.35)
      .fromTo('.hero-label', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9 }, 0.8)
      .fromTo('.hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1 }, 0.9)
      .fromTo('.hero-stat-pill', { x: 80, opacity: 0, skewX: -12 }, { x: 0, opacity: 1, skewX: 0, stagger: 0.12, duration: 1 }, 1)
      .fromTo('.hero-hang', { y: -520 }, { y: 0, duration: 1.8, ease: 'elastic.out(1, 0.55)' }, 0.9)
      .fromTo('.grid-lines span', { scaleY: 0 }, { scaleY: 1, duration: 1.6, stagger: 0.06, ease: 'expo.inOut', transformOrigin: 'top' }, 0)
      .fromTo('.hero-bottom > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1 }, 1.1);

    // Occasional glitch on the back name (skew only — x is owned by the parallax)
    gsap.to('.hero-name-back', {
      keyframes: [
        { skewX: 10, duration: 0.05 },
        { skewX: -10, duration: 0.05 },
        { skewX: 4, duration: 0.05 },
        { skewX: 0, duration: 0.05 },
      ],
      delay: 3.4,
      repeat: -1,
      repeatDelay: 6,
    });

    // Hero — scroll-out: letters scatter, portrait sinks, badge flies up
    heroTl.call(() => {
      const heroOut = gsap.timeline({
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
        defaults: { ease: 'none' },
      });
      heroOut
        .to('.hero-first .char', { yPercent: (i) => -40 - i * 18, rotation: (i) => (i - 3) * 6, opacity: 0.1, stagger: 0.02 }, 0)
        .to('.hero-last .char', { yPercent: (i) => 40 + i * 18, rotation: (i) => (i - 3) * -6, opacity: 0.1, stagger: 0.02 }, 0)
        .to('.hero-portrait', { yPercent: 18, scale: 1.1 }, 0)
        .to('.hero-hang', { y: -360 }, 0)
        .to('.hero-label-wrap, .hero-intro, .hero-stats', { y: -80, opacity: 0 }, 0)
        .to('.hero-bottom', { opacity: 0, y: 40 }, 0);
    });

    // Hero — layered mouse parallax (back name / portrait / front name)
    if (fine) {
      const layers = [
        ['.hero-name-back', -28],
        ['.hero-portrait', 14],
        ['.hero-name-front', 46],
        ['.grid-lines', -8],
      ].map(([sel, amt]) => {
        const el = document.querySelector(sel);
        return el ? { x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }), amt } : null;
      }).filter(Boolean);
      heroRef.current?.addEventListener('pointermove', (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        layers.forEach((l) => l.x(nx * l.amt));
      });
    }

    // === STATEMENT — pinned word reveal → zoom-through portal ===
    const stWords = document.querySelectorAll('.statement-word');
    const stDesktop = window.innerWidth > 1024;
    if (stWords.length > 0) {
      const stTl = gsap.timeline({
        scrollTrigger: stDesktop
          ? { trigger: '#statement', start: 'top top', end: '+=180%', pin: true, scrub: 1, anticipatePin: 1 }
          : { trigger: '#statement', start: 'top 75%', end: 'center 40%', scrub: 1 },
        defaults: { ease: 'none' },
      });
      stTl.fromTo(stWords,
        { opacity: 0.06, color: '#555550', yPercent: 40, rotationX: -60 },
        {
          opacity: 1, yPercent: 0, rotationX: 0,
          color: (i) => i === stWords.length - 1 ? '#C8F135' : '#F0EDE6',
          stagger: 0.12, duration: 0.5, ease: 'power2.out',
        }, 0)
        .fromTo('.statement-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, '-=0.2');

      if (stDesktop) {
        stTl
          .to({}, { duration: 0.3 }) // hold
          .to('.statement-portal', { scale: 4, duration: 1, stagger: 0.15, ease: 'power2.in' }, 'zoom')
          .to('#statement h2', { scale: 9, opacity: 0, duration: 1, ease: 'power3.in', transformOrigin: '50% 60%' }, 'zoom')
          .to('.statement-sub', { opacity: 0, y: -40, duration: 0.4 }, 'zoom')
          .to('#statement .section-watermark', { scale: 3, opacity: 0, duration: 1 }, 'zoom');
      }
    }

    // === HERO — letters stretch toward the cursor ===
    if (fine) {
      const chars = Array.from(document.querySelectorAll('.hero-first .char, .hero-last .char'));
      const setters = chars.map((c) => gsap.quickTo(c, 'scaleY', { duration: 0.6, ease: 'power3' }));
      const heroEl2 = heroRef.current;
      let raf2 = 0;
      let centers = [];
      let centersAt = 0;
      heroEl2?.addEventListener('pointermove', (e) => {
        if (raf2) return;
        raf2 = requestAnimationFrame(() => {
          raf2 = 0;
          // measure at most ~4x/sec — reading 13 rects every frame forced style recalcs
          const now = performance.now();
          if (now - centersAt > 250) {
            centers = chars.map((c) => { const r = c.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
            centersAt = now;
          }
          centers.forEach(([cx, cy], i) => {
            const d = Math.hypot(e.clientX - cx, e.clientY - cy);
            setters[i](1 + Math.max(0, 1 - d / 260) * 0.4);
          });
        });
      });
      heroEl2?.addEventListener('pointerleave', () => setters.forEach((set) => set(1)));
    }

    // === ABOUT — pinned story, one line at a time over a warp starfield ===
    const storyLines = gsap.utils.toArray('.story-line');
    const storyIdx = document.querySelector('.story-idx');
    if (storyLines.length) {
      if (window.innerWidth > 1024) {
        const storyTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#about', start: 'top top', end: `+=${storyLines.length * 55}%`, pin: true, scrub: 0.8, anticipatePin: 1,
            onUpdate: (self) => {
              const n = Math.min(storyLines.length, Math.floor(self.progress * storyLines.length * 1.02) + 1);
              const txt = String(n).padStart(2, '0');
              if (storyIdx && storyIdx.textContent !== txt) storyIdx.textContent = txt;
            },
          },
          defaults: { ease: 'power2.out' },
        });
        gsap.set(storyLines, { opacity: 0.06, y: 40 });
        storyLines.forEach((line, i) => {
          storyTl.to(line, { opacity: 1, y: 0, duration: 1 }, i);
          if (i > 0) storyTl.to(storyLines[i - 1], { opacity: 0.22, duration: 1 }, i);
        });
        storyTl.to({}, { duration: 0.6 });
      } else {
        storyLines.forEach((line) => {
          gsap.fromTo(line, { opacity: 0.08, y: 30 }, { opacity: 1, y: 0, scrollTrigger: { trigger: line, start: 'top 85%', end: 'top 55%', scrub: true } });
        });
      }
    }

    // === PROCESS — numbered steps light up as they cross the centre ===
    gsap.utils.toArray('.process-item').forEach((item) => {
      ScrollTrigger.create({ trigger: item, start: 'top 62%', end: 'bottom 38%', toggleClass: 'active' });
    });

    // Watermark parallax
    gsap.utils.toArray('.section-watermark').forEach((el) => {
      gsap.to(el, {
        y: -150,
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        ease: 'none',
      });
    });

    // === EXPERIENCE — title punch-in + timeline ===
    gsap.fromTo('.exp-title',
      { yPercent: 60, opacity: 0, skewY: 6 },
      {
        yPercent: 0, opacity: 1, skewY: 0,
        scrollTrigger: { trigger: '#experience', start: 'top 70%' },
        duration: 1.2,
        ease: 'expo.out',
      }
    );

    gsap.fromTo('.timeline-line-fill',
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top',
        scrollTrigger: { trigger: '#experience', start: 'top center', end: 'bottom center', scrub: true },
        ease: 'none',
      }
    );

    document.querySelectorAll('.exp-card').forEach((card) => {
      gsap.fromTo(card,
        { y: 80, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', scrollTrigger: { trigger: card, start: 'top 88%' }, duration: 1.2, ease: 'expo.out', clearProps: 'clipPath' }
      );
    });

    // === PROJECTS — Cinematic Horizontal Story (3D coverflow) ===
    const desktop = window.innerWidth > 1024;
    const projectScroll = desktop ? gsap.to(projectHorizontalRef.current, {
      x: () => -(projectHorizontalRef.current.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: projectSectionRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${projectHorizontalRef.current.scrollWidth * 0.9}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const fill = document.querySelector('.project-hud-fill');
          if (fill) fill.style.transform = `scaleX(${self.progress})`;
          const n = Math.min(PROJECTS.length, Math.floor(self.progress * PROJECTS.length) + 1);
          const cnt = document.querySelector('.project-hud-num');
          if (cnt && cnt.textContent !== String(n).padStart(2, '0')) cnt.textContent = String(n).padStart(2, '0');
        },
      }
    }) : null;

    document.querySelectorAll('.project-card-v2').forEach((card) => {
      const frame = card.querySelector('.project-frame');
      const img = card.querySelector('.project-frame-img');
      const content = card.querySelector('.project-content-v2');

      if (desktop) {
        // Coverflow: cards swing in from the right, flatten in the centre, swing out to the left.
        // Transform + opacity only → stays on the compositor (no blur filter).
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: projectScroll,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
          defaults: { ease: 'none' },
        })
          .fromTo(card, { rotationY: -28, scale: 0.82, opacity: 0.25, z: -200 }, { rotationY: 0, scale: 1, opacity: 1, z: 0, ease: 'power2.out' }, 0)
          .to(card, { rotationY: 28, scale: 0.82, opacity: 0.25, z: -200, ease: 'power2.in' }, 0.5);

        if (img) {
          gsap.fromTo(img, { xPercent: 6 }, {
            xPercent: -6, ease: 'none',
            scrollTrigger: { trigger: card, containerAnimation: projectScroll, start: 'left right', end: 'right left', scrub: true },
          });
        }
        if (content) {
          gsap.fromTo(content.children, { x: 120, opacity: 0 }, {
            x: 0, opacity: 1, stagger: 0.06, ease: 'power3.out',
            scrollTrigger: { trigger: card, containerAnimation: projectScroll, start: 'left 85%', end: 'left 35%', scrub: true },
          });
        }
      } else {
        gsap.fromTo(card, { y: 100, opacity: 0, scale: 0.94 }, {
          y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
        if (frame) {
          gsap.fromTo(frame, { clipPath: 'inset(100% 0 0 0 round 16px)' }, {
            clipPath: 'inset(0% 0 0 0 round 16px)', duration: 1.4, ease: 'expo.inOut',
            scrollTrigger: { trigger: card, start: 'top 80%' },
          });
        }
      }
    });

    // Toggle gallery visibility with discrete events for better performance
    ScrollTrigger.create({
      trigger: projectSectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => gsap.set('#gallery', { autoAlpha: 0 }),
      onLeave: () => gsap.set('#gallery', { autoAlpha: 1 }),
      onEnterBack: () => gsap.set('#gallery', { autoAlpha: 0 }),
      onLeaveBack: () => gsap.set('#gallery', { autoAlpha: 1 }),
    });

    // === SKILLS — 4C Scale + Fade on skill pills + staggered category reveal + clip wipe title ===
    gsap.fromTo('.skills-title',
      { yPercent: 60, opacity: 0, skewY: 6 },
      {
        yPercent: 0, opacity: 1, skewY: 0,
        scrollTrigger: { trigger: '#skills', start: 'top 70%' },
        duration: 1.2,
        ease: 'expo.out',
      }
    );

    document.querySelectorAll('.skill-category').forEach((cat, i) => {
      gsap.fromTo(cat,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger: '#skills', start: 'top 65%' },
          delay: i * 0.15,
          duration: 0.6,
          ease: 'power2.out',
        }
      );
    });

    // 4C — Scale + Fade on skill pills
    const skillPills = document.querySelectorAll('.skill-pill');
    gsap.fromTo(skillPills,
      { scale: 0.85, opacity: 0, y: 20 },
      {
        scale: 1, opacity: 1, y: 0,
        duration: 0.5,
        stagger: { amount: 0.6, from: 'start' },
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '#skills',
          start: 'top 75%',
        },
      }
    );

    // Removed clip-path curtain wipe — too GPU intensive on large sections

    // 4D — Letter scramble on section titles
    const scrambleTitles = document.querySelectorAll('[data-scramble]');
    scrambleTitles.forEach(title => {
      const finalText = title.dataset.scramble;
      ScrollTrigger.create({
        trigger: title,
        start: 'top 80%',
        onEnter: () => scrambleText(title, finalText),
        once: true,
      });
    });

    // === STATS — rolling odometers ===
    initOdometers();

    // === GRAND FINALE — screen grows out of the dark ===
    gsap.fromTo('#grand-finale-screen',
      { scale: 0.86, borderRadius: 120, yPercent: 8 },
      {
        scale: 1, borderRadius: 40, yPercent: 0, ease: 'none',
        scrollTrigger: { trigger: '#grand-finale-outer', start: 'top bottom', end: 'top 15%', scrub: 1 },
      });
    gsap.fromTo('.finale-watermark', { yPercent: -30, opacity: 0 }, {
      yPercent: 30, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: '#grand-finale-outer', start: 'top bottom', end: 'bottom bottom', scrub: true },
    });
    gsap.fromTo('.mega-link', { yPercent: 110, opacity: 0 }, {
      yPercent: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.06,
      scrollTrigger: { trigger: '#grand-finale-screen', start: 'top 55%' },
    });

    // Attribute-driven reveals (data-split / data-reveal / data-parallax)
    initReveals();

    ScrollTrigger.refresh();

    // ─── Post-Refesh: Global Progress Bar ───
    // Using end: "max" + refreshPriority: -1 ensures it accounts for the TOTAL length after pinning is added
    ScrollTrigger.create({
      start: 0,
      end: "max",
      refreshPriority: -1,
      onUpdate: (self) => {
        if (progressRef.current) gsap.set(progressRef.current, { scaleX: self.progress });
      },
    });
  };

  // ─── Render ─────────────────────────────────────
  return (
    <>
      <BackgroundMusic />
      {/* Scroll Progress — Outside app wrapper for fixed position stability */}
      <div ref={progressRef} className="scroll-progress" />

      {!matrixDone && <MatrixEntry onEnter={() => setMatrixDone(true)} />}

      <div ref={appRef} className="app">
        {/* Custom Cursor */}
        <div className="cursor-dot" />
        <div className="cursor-ring"><span className="cursor-label" /></div>

        {/* Film grain + vignette */}
        <div className="vignette" />

        {/* Curtain page transition */}
        <div ref={flashRef} className="page-curtain" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => <div key={i} className="page-curtain-col" />)}
        </div>
        <div className="page-curtain-label" aria-hidden="true" />

        {/* Experience hover follow-image */}
        <FollowImage src={hoverSnap} active={hoverActive} />

        {/* Preloader */}
        {!preloaderDone && (
          <div className="preloader">
            <div className="preloader-strips" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => <div key={i} className="preloader-strip" />)}
            </div>
            <div className="preloader-meta preloader-tl font-mono"><span>RAKSHIT SHARMA</span><span>PORTFOLIO ©2026</span></div>
            <div className="preloader-meta preloader-tr font-mono"><span>LOADING EXPERIENCE</span><span>HIMACHAL PRADESH, IN</span></div>
            <div className="preloader-line"><div className="preloader-line-fill" /></div>
            <div className="preloader-count-wrap"><div ref={counterRef} className="preloader-count font-display">000</div></div>
          </div>
        )}

        {/* Nav */}
        <nav className="nav-fixed">
          <div className="nav-left">
            <div
              className="nav-monogram"
              data-magnetic="0.5"
              onClick={() => scrollToSection('hero')}
            >
              RS
            </div>
            <div className="nav-section-label">
              <span key={activeSection} className="nav-label-anim">
                {String(activeSection + 1).padStart(2, '0')} — {SECTION_LABELS[activeSection]}
              </span>
            </div>
          </div>
          <div className="nav-right">
            <span className="nav-clock font-mono"><LiveClock /></span>
            <a href={`mailto:${PERSONAL.email}`} className="bracket-btn font-mono" data-magnetic="0.3">
              <RollText text="LET'S TALK" />
            </a>
          <div className="nav-dots">
            {SECTIONS.map((id, i) => (
              <div
                key={id}
                className={`nav-dot ${activeSection === i ? 'active' : ''}`}
                title={SECTION_LABELS[i]}
                onClick={() => scrollToSection(id)}
              />
            ))}
          </div>
          </div>
        </nav>

        {/* ═══════════ SCENE 01 — HERO (portrait layered inside the name) ═══════════ */}
        <section ref={heroRef} id="hero" className="hero-v2">
          <h1 className="sr-only">Rakshit Sharma — Frontend Developer</h1>
          <div className="grid-lines" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => <span key={i} />)}
          </div>

          <div className="hero-stage" aria-hidden="true">
            <div className="hero-name-back hero-first font-display">{heroFirstChars}</div>
            <img className="hero-portrait" src={face1} alt="" draggable="false" />
            <div className="hero-name-front hero-last font-display">{heroLastChars}</div>
          </div>

          <div className="hero-label-wrap">
            <span className="hero-label font-mono">Available for work · 2026</span>
            <Scribble type="circle" className="hero-scribble-circle" trigger="#hero" delay={2.2} />
            <Scribble type="arrow" className="hero-scribble-arrow" trigger="#hero" delay={2.6} />
          </div>

          <div className="hero-intro">
            <p className="hero-sub font-mono hero-intro-kicker">// FRONTEND DEVELOPER — HIMACHAL, IN</p>
            <p className="hero-sub font-body hero-intro-text">
              I craft cinematic, high-performance web experiences with React, Node &amp; Java — from idea to deployment.
            </p>
          </div>

          <div className="hero-stats">
            {['300+ DSA Problems Solved', '3 Live Client Projects'].map((t, i) => (
              <div key={i} className="hero-stat-pill font-mono" data-magnetic="0.25">{t}</div>
            ))}
          </div>

          <div className="hero-hang">
            <HangingBadge href={`mailto:${PERSONAL.email}`} getVelocity={getScrollVelocity} links={vw < 768 ? 6 : 9}>
              <SpinBadge size={vw < 768 ? 104 : 140} magnetic={false}>
                <span className="font-display" style={{ fontSize: vw < 768 ? 18 : 22, letterSpacing: '0.05em' }}>HIRE</span>
              </SpinBadge>
            </HangingBadge>
          </div>

          {/* Bottom bar */}
          <div
            className="hero-bottom"
            style={{ zIndex: 2 }}
          >
            <a
              href={`mailto:${PERSONAL.email}`}
              className="hover-line font-mono hero-bottom-email"
              style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}
              onMouseEnter={() => { }}
              onMouseLeave={() => { }}
            >
              {PERSONAL.email}
            </a>
            <div className="hero-scroll-indicator font-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.3em' }}>
              SCROLL
              <span className="hero-scroll-line" />
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              {[
                { label: 'GitHub', url: PERSONAL.github },
                { label: 'LinkedIn', url: PERSONAL.linkedin },
              ].map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-line font-mono"
                  style={{ fontSize: 11, color: 'var(--muted)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  onMouseEnter={() => { }}
                  onMouseLeave={() => { }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </section >

        {/* ═══════════ SCENE 02 — STATEMENT ═══════════ */}
        < section
          id="statement"
          data-cursor=""
          style={{
            minHeight: '100vh', height: '100vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', padding: '120px 48px',
            textAlign: 'center', position: 'relative',
          }
          }
        >
          <div className="section-watermark" style={{ top: '30%', left: '42%' }}>02</div>

          <ImageTrail images={[aistylerSnap, netflixSnap, metafurySnap, dentalclinicSnap, algovizSnap, desitarzanSnap]} />
          <div className="statement-portal" />
          <div className="statement-portal p2" />

          {/* Subtle accent glow */}
          <div style={{
            position: 'absolute', width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200, 241, 53, 0.04) 0%, transparent 70%)',
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none',
          }} />

          <h2 className="font-display" style={{ fontSize: 'clamp(50px, 8vw, 130px)', lineHeight: 1, maxWidth: 1000, position: 'relative', zIndex: 1, perspective: 800 }}>
            {statementWordsMarkup}
          </h2>
          <p className="statement-sub font-mono" style={{ fontSize: 13, color: 'var(--muted)', marginTop: 40, maxWidth: 500, letterSpacing: '0.05em', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
            — from idea to deployment, full stack, no compromises
          </p>
        </section >

        {/* ═══════════ MEGA MARQUEE BAND ═══════════ */}
        <div className="mega-marquee" data-skew>
          <VMarquee speed={1.4}>
            {['CREATIVE DEVELOPER', 'MOTION', 'FULL STACK', 'PIXEL PERFECT'].map((t, i) => (
              <span key={i} className={`mega-marquee-item ${i % 2 ? 'outline' : ''}`}>{t}<span className="star">✦</span></span>
            ))}
          </VMarquee>
        </div>

        {/* ═══════════ SCENE 03 — ABOUT (pinned story over a warp starfield) ═══════════ */}
        <section id="about" className="story-section">
          <Starfield getVelocity={getScrollVelocity} />
          <div className="story-inner">
            <div className="story-meta font-mono">
              <span>// ABOUT ME — THE SHORT VERSION</span>
              <span className="story-count"><b className="story-idx">01</b> / {String(STORY_LINES.length).padStart(2, '0')}</span>
            </div>
            <div className="story-lines">
              {STORY_LINES.map((l, i) => (
                <p key={i} className={`story-line font-body ${i === STORY_LINES.length - 1 ? 'last' : ''}`}>{l}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SCENE 04 — EXPERIENCE ═══════════ */}
        < section id="experience" style={{ padding: '160px 48px', background: 'var(--dim)', position: 'relative' }}>
          <div className="section-watermark" style={{ top: '5%', right: '-3%' }}>04</div>

          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            {/* Change 5F — clip wipe title */}
            <h2 className="exp-title clip-wipe-title font-display" data-scramble="RECENT PAID PROJECTS" style={{ fontSize: 'clamp(60px, 8vw, 120px)', marginBottom: 80 }}>
              RECENT PAID PROJECTS
            </h2>

            <div style={{ position: 'relative', paddingLeft: 40 }}>
              {/* Timeline line */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'var(--border)' }}>
                <div className="timeline-line-fill" style={{ width: '100%', height: '100%', background: 'var(--accent)' }} />
              </div>

              {EXPERIENCE.map((exp, i) => (
                <div
                  key={i}
                  className="exp-card"
                  data-cursor="VISIT"
                  onMouseEnter={() => { setHoverSnap(exp.snap); setHoverActive(true); }}
                  onMouseLeave={() => setHoverActive(false)}
                  onClick={(e) => { if (!e.target.closest('a')) window.open(exp.url, '_blank', 'noopener'); }}
                  style={{ position: 'relative' }}
                >
                  <div className="font-display text-outline" style={{ fontSize: 48, lineHeight: 1 }}>{exp.num}</div>
                  <div>
                    <h3 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: 'var(--white)', lineHeight: 1 }}>
                      {exp.company}
                    </h3>
                    <p className="font-body" style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>{exp.subtitle}</p>
                    <p className="font-mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 12 }}>
                      {exp.role} · {exp.when}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                      {exp.stack.map((s, j) => (
                        <span key={j} className="font-mono" style={{ fontSize: 10, padding: '4px 10px', border: '1px solid var(--border)', color: 'var(--white)' }}>{s}</span>
                      ))}
                    </div>
                    <p className="font-mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 12 }}>{exp.impact}</p>
                  </div>
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono"
                    style={{ fontSize: 11, color: 'var(--accent)', textDecoration: 'none', alignSelf: 'center', letterSpacing: '0.1em' }}
                  >
                    <RollText text="VIEW LIVE →" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section >

        {/* ═══════════ SCENE 04B — PROCESS (sticky title + numbered steps) ═══════════ */}
        <section id="process" className="process-section">
          <div className="process-grid">
            <div className="process-left">
              <span className="font-mono process-kicker">// HOW I WORK</span>
              <h2 className="font-display process-title">
                <SplitReveal text="FROM IDEA" /><br />
                <span className="process-title-accent">
                  <SplitReveal text="TO LIVE" charStyle={{ color: 'var(--accent)' }} />
                  <Scribble type="underline" className="process-scribble" width={4} />
                </span>
              </h2>
              <p className="font-body process-desc" data-reveal="up">
                I handle the whole journey — strategy, design, build and launch — so you get one partner, one vision and zero hand-off gaps.
              </p>
              <a href={`mailto:${PERSONAL.email}`} className="bracket-btn bracket-btn-lg font-mono" data-magnetic="0.3">
                <RollText text="START A PROJECT" />
              </a>
            </div>
            <div className="process-list">
              {PROCESS.map((p) => (
                <div key={p.num} className="process-item">
                  <span className="process-num font-mono">({p.num})</span>
                  <div>
                    <h3 className="font-display process-item-title">{p.title}</h3>
                    <p className="font-body process-item-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SCENE 05 — PROJECTS (HORIZONTAL STORY) ═══════════ */}
        < section ref={projectSectionRef} id="projects" style={{ background: 'var(--black)', overflow: 'hidden', position: 'relative', zIndex: 20 }}>
          <div className="section-watermark" style={{ top: '10%', left: '5%' }}>05</div>

          <div className="project-sticky-header" style={{ position: 'absolute', top: '8vh', left: '48px', zIndex: 10 }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: 'var(--white)' }}>
              <SplitReveal text="MY" /> <SplitReveal text="PROJECTS" charStyle={{ color: 'var(--accent)' }} />
            </h2>
            <p className="font-mono" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8, letterSpacing: '0.2em' }}>
            // SLIDE TO DISCOVER THE STORY
            </p>
          </div>

          <div className="project-hud">
            <span className="project-hud-count"><b className="project-hud-num">01</b> / {String(PROJECTS.length).padStart(2, '0')}</span>
            <div className="project-hud-track"><div className="project-hud-fill" /></div>
            <span>SCROLL →</span>
          </div>

          <div ref={projectHorizontalRef} className="project-horizontal-container" style={{ perspective: 1600 }}>
            {PROJECTS.map((p, i) => (
              <div key={i} className="project-card-v2 project-card-v3" style={{ '--pc': p.color }}>
                <div className="project-glow" />

                {/* Content Side */}
                <div className="project-content-v2">
                  <div className="project-num-big">{p.num}</div>
                  <div className="project-date">— {p.when} · {p.sub.toUpperCase()}</div>
                  <h3 className="project-title font-display">{p.title}</h3>
                  <p className="project-description font-body">
                    {p.sub}. A cinematic full-stack solution optimized for modern web performance.
                  </p>

                  <div className="project-tags">
                    {p.stack.map((s, j) => (
                      <span key={j} className="project-tag font-mono">{s}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <a href={p.url} target="_blank" rel="noreferrer" className="magnetic-btn project-btn" data-magnetic="0.3">
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <RollText text="View Live" /> <ExternalLink size={16} />
                      </span>
                    </a>
                    <a href={PERSONAL.github} target="_blank" rel="noreferrer" className="magnetic-btn project-btn-alt" data-magnetic="0.3">
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Github size={18} /> <RollText text="Source" />
                      </span>
                    </a>
                  </div>
                </div>

                {/* Browser frame mockup with inner parallax + glare */}
                <a href={p.url} target="_blank" rel="noreferrer" className="project-frame" data-tilt="6" data-cursor="OPEN ↗">
                  <div className="project-frame-bar"><i /><i /><i /></div>
                  <img className="project-frame-img" src={p.snap} alt={p.title} loading="lazy" />
                </a>
              </div>
            ))}

            {/* Final Transition Slide */}
            <div className="project-final-slide">
              <div className="font-display" style={{ fontSize: '10vw', opacity: 0.05, whiteSpace: 'nowrap' }}>NEXT STAGE</div>
            </div>
          </div>
        </section >

        {/* ═══════════ GALLERY — Horizontal Parallax (Effect 03) ═══════════ */}
        < GallerySection />

        <div style={{ overflow: 'hidden', background: 'var(--dim)', padding: '2vh 0' }}>
          <div className="tilted-band" data-skew>
            <VMarquee speed={1.2} dir="right">
              {['OPEN TO WORK', "LET'S BUILD", 'REACT', 'NODE', 'JAVA', 'GSAP'].map((t, i) => (
                <span key={i} className="mega-marquee-item">{t}<span className="star">✦</span></span>
              ))}
            </VMarquee>
          </div>
        </div>

        {/* ═══════════ SCENE 06 — SKILLS + ACHIEVEMENTS ═══════════ */}
        < section id="skills" style={{ padding: '160px 48px', background: 'var(--dim)', position: 'relative' }}>
          <div className="section-watermark" style={{ top: '10%', right: '0' }}>06</div>

          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            {/* Change 5F — clip wipe title */}
            <h2 className="skills-title clip-wipe-title font-display" style={{ fontSize: 'clamp(60px, 8vw, 120px)', marginBottom: 80 }}>
              SKILLS & <span style={{ color: 'var(--accent)' }}>STATS</span>
            </h2>

            {/* Stack Roller (Tech Marquee) for Skills section */}
            <div className="marquee-wrapper" style={{ marginBottom: 80, opacity: 0.5, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
              <div className="marquee-track marquee-track-left">
                {[0, 1, 2, 3].map(k => (
                  <span key={k} className="font-display" style={{ fontSize: 32, color: 'var(--white)', opacity: 0.8, whiteSpace: 'nowrap', paddingRight: 60 }}>{marqueeText}</span>
                ))}
              </div>
            </div>

            <div className="skills-stats-grid">
              {/* Skills Grid — Change 5D staggered category */}
              <div className="skills-column">
                {Object.entries(SKILLS).map(([cat, items], i) => (
                  <div key={i} className="skill-category">
                    <h4 className="skill-cat-title font-mono">
                      {cat}
                    </h4>
                    <div className="skill-pills-row">
                      {items.map((s, j) => (
                        <div
                          key={j}
                          className="skill-pill"
                          data-magnetic="0.4"
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="stats-column">
                <div className="stats-grid">
                  {STATS.map((s, i) => (
                    <div key={i} className="stat-item">
                      <div className="stat-number">
                        <Odometer value={s.value} suffix={s.suffix} />
                      </div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* ═══════════ SCENE 06B — CODING ARENA (Electric Border) ═══════════ */}
        < section id="coding-arena" style={{ padding: '160px 48px', background: '#050505', position: 'relative', overflow: 'hidden' }}>
          <div className="section-watermark" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>CODE</div>

          <div style={{ maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
            <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase' }}>
              03 / COMPETITIVE ARENA
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(60px, 10vw, 140px)', color: '#fff', lineHeight: 0.85, marginTop: 20, marginBottom: 100 }}>
              <SplitReveal text="CODING" /><br />
              <span className="text-outline-accent"><SplitReveal text="PROFILES" /></span>
            </h2>

            <div data-reveal="stagger" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 20px',
              perspective: 1200
            }}>
              {CODING_PROFILES.map((profile, i) => (
                <div key={i} className="tilt-wrap"><CodingFlipCard {...profile} url={profile.url} /></div>
              ))}
            </div>
          </div>
        </section >

        {/* ═══════════ CERTIFICATIONS — Responsive Grid ═══════════ */}
        <section id="certifications" style={{ position: 'relative', background: 'var(--black)', padding: '120px 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
              PROFESSIONAL CERTIFICATIONS
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 7vw, 100px)', color: '#fff', marginTop: 12, textTransform: 'uppercase', lineHeight: 0.9 }}>
              <SplitReveal text="MY CERTIFICATIONS" />
            </h2>
          </div>

          <div data-reveal="stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '24px',
            maxWidth: '1400px',
            margin: '0 auto',
            perspective: 1400
          }}>
            {CERTS_DATA.map((cert, i) => (
              <a key={i} href={cert.pdf} download target="_blank" rel="noopener noreferrer" className="cert-card-premium" data-spotlight data-tilt="5" data-cursor="OPEN PDF" style={{ '--spot': cert.color,
                position: 'relative',
                display: 'block',
                textDecoration: 'none',
                background: '#0a0a0a',
                borderRadius: '24px',
                padding: '40px',
                border: '1px solid rgba(255,255,255,0.03)',
                overflow: 'hidden',
                cursor: 'none'
              }}>
                {/* Vertical Accent Line */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '25%',
                  height: '50%',
                  width: 4,
                  background: cert.color,
                  boxShadow: `0 0 15px ${cert.color}44`,
                  borderRadius: '0 100px 100px 0'
                }} />

                {/* Background Number Watermark */}
                <div className="font-display" style={{
                  position: 'absolute',
                  bottom: -20,
                  right: 20,
                  fontSize: 160,
                  color: cert.color,
                  opacity: 0.04,
                  pointerEvents: 'none',
                  lineHeight: 1
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Header: Org + Date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, position: 'relative', zIndex: 1 }}>
                  <span className="font-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    {cert.issuer}
                  </span>
                  <span className="font-mono" style={{ fontSize: 10, color: cert.color, opacity: 0.8, fontWeight: 600 }}>
                    {cert.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display" style={{
                  fontSize: 'clamp(24px, 2.5vw, 36px)',
                  lineHeight: 1.1,
                  color: '#fff',
                  textTransform: 'uppercase',
                  marginBottom: 32,
                  position: 'relative',
                  zIndex: 1,
                  maxWidth: '90%'
                }}>
                  {cert.title}
                </h3>

                {/* Separator */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 24, position: 'relative', zIndex: 1 }} />

                {/* Footer: ID + Verified Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                  <span className="font-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
                    {cert.credentialId}
                  </span>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 14px',
                    borderRadius: '100px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.02)'
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: cert.color }} />
                    <span className="font-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em' }}>VERIFIED</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div style={{ marginTop: 80, textAlign: 'center' }}>
            <a
              href={CERTS_DRIVE_LINK}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn"
              data-magnetic="0.4"
              style={{ pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 32px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, color: '#fff', textDecoration: 'none' }}
            >
              <span className="font-mono" style={{ fontSize: 11 }}><RollText text="VIEW ALL CREDENTIALS" /></span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </section >

        {/* ═══════════ THE GRAND FINALE — FLOATING SCREEN FOOTER ═══════════ */}
        < section id="grand-finale-outer" style={{ background: 'var(--black)', padding: '40px 20px 20px', position: 'relative', zIndex: 100 }
        }>
          <div id="grand-finale-screen" style={{
            background: 'var(--accent)',
            minHeight: '85vh',
            padding: '60px 40px 0', // Remove bottom padding so image touches edge
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '40px'
          }}>
            {/* Notched Top (Aesthetic only since we are using border radius) */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: '40%', height: '35px', background: '#000', zIndex: 10,
              clipPath: 'polygon(0 0, 100% 0, 92% 100%, 8% 100%)'
            }} />

            {/* Top Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 20 }}>
              <div>
                <h2 className="font-display" style={{ color: 'var(--black)', fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 0.9, fontWeight: 900 }}>
                  {PERSONAL.name.split(' ')[0].toUpperCase()}<br />
                  {PERSONAL.name.split(' ')[1].toUpperCase()}
                </h2>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                <span className="font-mono" style={{ color: 'var(--black)', opacity: 0.4, fontSize: 9, letterSpacing: '0.2em' }}>FULL STACK DEVELOPER</span>
                <a href={resumeFile} download="Rakshit_Sharma_Resume.png" className="resume-btn font-mono" data-magnetic="0.35" style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '12px 24px',
                  background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '100px', color: 'var(--black)', textDecoration: 'none', fontSize: 10, fontWeight: 700
                }}>
                  <FileText size={14} /> DOWNLOAD RESUME <span style={{ opacity: 0.3 }}>↗</span>
                </a>
              </div>
            </div>

            {/* Main Content Area */}
            <div style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: vw < 1024 ? '1fr' : '1.2fr 1.6fr 1.2fr',
              gap: vw < 1024 ? '40px' : '0',
              alignItems: 'center',
              position: 'relative',
              marginTop: 20
            }}>

              {/* Role Watermark */}
              <div className="font-display finale-watermark" style={{
                position: 'absolute', top: '25%', left: 0, right: 0,
                fontSize: '14vw', color: 'var(--black)', opacity: 0.05, pointerEvents: 'none', fontWeight: 900,
                textAlign: 'center', lineHeight: 0.8, zIndex: 0
              }}>
                FULL<br />STACK<br />DEVELOPER
              </div>

              {/* Menu Links */}
              <div style={{ zIndex: 5, textAlign: vw < 1024 ? 'center' : 'left' }}>
                <span className="font-mono" style={{ color: 'var(--black)', opacity: 0.3, fontSize: 9, letterSpacing: '0.4em' }}>LINKS / MENU</span>
                <ul style={{ listStyle: 'none', padding: 0, marginTop: 30 }}>
                  {['HOME', 'ABOUT', 'SKILLS', 'PROJECTS'].map((item, i) => (
                    <li key={i} style={{ marginBottom: 8 }}>
                      <a href={`#${item === 'HOME' ? 'hero' : item.toLowerCase()}`} onClick={(e) => { e.preventDefault(); scrollToSection(item === 'HOME' ? 'hero' : item.toLowerCase()); }} className="font-display mega-link" style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 800 }}><RollText text={item} /></a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Portrait Area */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', position: 'relative', zIndex: 4 }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', position: 'relative' }}>
                  <FooterPortrait face1={face1} face2={face2} />
                </div>
              </div>

              {/* Social Links */}
              <div style={{ textAlign: vw < 1024 ? 'center' : 'right', zIndex: 5 }}>
                <span className="font-mono" style={{ color: 'var(--black)', opacity: 0.3, fontSize: 9, letterSpacing: '0.4em' }}>CONNECT / SOCIAL</span>
                <ul style={{ listStyle: 'none', padding: 0, marginTop: 30 }}>
                  {[
                    { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/rakshit-sharma99' },
                    { label: 'GITHUB', url: 'https://github.com/Rakshit-sharma99' },
                    { label: 'YOUTUBE', url: 'https://youtube.com/@raxhit_vlogs-e3i?si=wneeKHwRapKvGXpM' },
                    { label: 'INSTAGRAM', url: 'https://www.instagram.com/raxhitzz?igsh=MXQyNnhnYmFzMHQybg==' },
                  ].map((item, i) => (
                    <li key={i} style={{ marginBottom: 8 }}>
                      <a href={item.url} target="_blank" rel="noreferrer" className="font-display mega-link" style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 800 }}><RollText text={item.label} /></a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Metadata Bar (In the black frame) */}
          <div style={{
            padding: '24px 20px 0',
            display: 'grid',
            gridTemplateColumns: vw < 768 ? '1fr' : '1.2fr 2fr 1.2fr',
            gap: '20px',
            alignItems: 'center'
          }}>

            <div className="font-mono" style={{ fontSize: 9, color: 'var(--white)', opacity: 0.4, textAlign: vw < 768 ? 'center' : 'left' }}>
              © {new Date().getFullYear()} RAKSHIT SHARMA. BUILDING FOR THE FUTURE. <br />
              HIMACHAL PRADESH / <FooterClock />
            </div>

            {/* Floating Nav Bar - Exact Icon Set */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="finale-nav-bar" style={{
                background: '#0a0a0a', borderRadius: '100px', padding: '8px 24px',
                display: 'flex', gap: 20, alignItems: 'center', border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.3)'
              }}>
                <a href="#hero" style={{ color: 'inherit' }}><Home size={16} /></a>
                <a href="#about" style={{ color: 'inherit' }}><User size={16} /></a>
                <a href="#skills" style={{ color: 'inherit' }}><Code size={16} /></a>
                <a href="#certifications" style={{ color: 'inherit' }}><Trophy size={16} /></a>
                <a href="#experience" style={{ color: 'inherit' }}><Briefcase size={16} /></a>
                <a href="#projects" style={{ color: 'inherit' }}><Play size={16} /></a>
                <a href={`mailto:${PERSONAL.email}`} style={{ color: 'inherit' }}><Mail size={16} /></a>
                <a href="#coding-arena" className="nav-circle" style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(200, 241, 53, 0.3)', textDecoration: 'none' }}>
                  <Zap size={18} color="black" fill="black" />
                </a>
                <a href={resumeFile} download="Rakshit_Resume.png" style={{ color: 'inherit' }}><FileText size={16} /></a>
              </div>
            </div>

            <div className="font-mono" style={{ textAlign: vw < 768 ? 'center' : 'right', display: 'flex', justifyContent: vw < 768 ? 'center' : 'flex-end', gap: 30, fontSize: 9, color: 'var(--white)', opacity: 0.4 }}>
              <span>MADE IN INDIA</span>
            </div>
          </div>

        </section >

        {/* Scroll to Top Button */}
        <button
          className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
          data-magnetic="0.5"
          aria-label="Back to top"
          onClick={() => lenisRef.current?.scrollTo(0, { duration: 2.2, easing: (t) => 1 - Math.pow(1 - t, 4) })}
        >
          <Zap size={20} fill="currentColor" />
        </button>

        {/* Tubes Cursor Canvas — Moved to bottom to ensure it overlays while staying out of the way of layout */}
        <div className="tubes-canvas-wrapper" >
          <canvas id="hero-tubes-canvas" />
        </div>
      </div>
    </>
  );
}
