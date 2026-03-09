import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { scrambleText } from './utils/scrambleText';
import GallerySection from './components/GallerySection';
import BackgroundMusic from './components/BackgroundMusic';
import { Github, Linkedin, Mail, Phone, ExternalLink, Zap, Home, User, Code, Trophy, Briefcase, Play, FileText, Sun } from 'lucide-react';
import metafurySnap from './assets/websitesnaps/metafury.png';
import desitarzanSnap from './assets/websitesnaps/Desitarzan.png';
import dentalclinicSnap from './assets/websitesnaps/dentalclinic.png';
import aistylerSnap from './assets/websitesnaps/AiStyler.png';
import netflixSnap from './assets/websitesnaps/Netflix.png';
import algovizSnap from './assets/websitesnaps/algorithmviz.png';
import face1 from './assets/FOOTERIMG/face1.png';
import face2 from './assets/FOOTERIMG/face2.png';
import resumeFile from './assets/RESUME/Rakshit Resume.png';

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
  { num: '02', title: 'Netflix Clone', sub: 'Streaming Platform UI', when: 'Nov 2025', stack: ['React', 'Firebase', 'TMDB API'], color: '#E50914', url: '#', snap: netflixSnap },
  { num: '03', title: 'Meta Fury', sub: 'Energy Drink Brand Site', when: 'Jan 2026', stack: ['React', 'Node.js', 'MongoDB'], color: '#FF8C00', url: 'https://metafury.fit', snap: metafurySnap },
  { num: '04', title: 'Dental Clinic', sub: 'Appointment System', when: 'Jul 2025', stack: ['React', 'Node.js', 'Express', 'Atlas'], color: '#4D9FFF', url: 'https://dentalclinic.com', snap: dentalclinicSnap },
  { num: '05', title: 'Algorithm Viz', sub: 'Pathfinding Visualizer', when: 'Feb 2026', stack: ['Java', 'Swing', 'BFS', 'DFS', 'A*'], color: '#A855F7', url: '#', snap: algovizSnap },
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
  { issuer: 'Infosys Springboard', title: 'Build Generative AI Apps and Solutions', date: 'AUG 2025', color: '#C8F135', credentialId: 'ISB-GAI-2025-0847' },
  { issuer: 'NPTEL', title: 'Privacy and Security in Online social media', date: 'APR 2024', color: '#4D9FFF', credentialId: 'NPTEL-PSSM-2024-1023' },
  { issuer: 'Coursera', title: 'The Bits and Bytes of Computer Networking', date: 'SEP 2024', color: '#FF8C00', credentialId: 'COUR-CN-2024-5591' },
  { issuer: 'Coursera', title: 'Software Engineering: Implementation and Testing', date: 'OCT 2024', color: '#A855F7', credentialId: 'COUR-SE-2024-7732' },
];

const TECH_MARQUEE = ['REACT', 'NODE.JS', 'JAVA', 'EXPRESS', 'MONGODB', 'MYSQL', 'REST API', 'GSAP', 'FIGMA', 'GIT', 'DSA', 'MERN'];

const SECTIONS = ['hero', 'statement', 'about', 'experience', 'projects', 'gallery', 'skills', 'coding-arena', 'certifications'];

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

const CodingFlipCard = ({ platform, logo, color, stats, about, index, url }) => {
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


// LeetCode corner grid colors — more vibrant, weighted toward empty
const LC_ACTIVITY_COLORS = [
  'transparent', 'transparent', 'transparent', 'transparent',  // 40% empty
  '#1a3a1a', '#1a3a1a',                                       // 15% very low
  '#1e5c2e', '#1e5c2e',                                       // 15% low
  '#2ea84a', '#2ea84a',                                        // 15% medium
  '#3dcd5a',                                                   // 10% high
  '#C8F135',                                                   // 5% max (accent)
];

// Corner positions for LeetCode grids
const CORNER_POSITIONS = [
  { top: 0, left: 0 },
  { top: 0, right: 0 },
  { bottom: 0, left: 0 },
  { bottom: 0, right: 0 },
];

const CORNER_MASKS = [
  'radial-gradient(ellipse at top left, black 0%, transparent 75%)',
  'radial-gradient(ellipse at top right, black 0%, transparent 75%)',
  'radial-gradient(ellipse at bottom left, black 0%, transparent 75%)',
  'radial-gradient(ellipse at bottom right, black 0%, transparent 75%)',
];

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
  const projectCardRefs = useRef([]);
  const projectSectionRef = useRef(null);
  const projectHorizontalRef = useRef(null);
  const tubesAppRef = useRef(null); // Ref to store Tubes instance
  const tubesInited = useRef(false); // Flag to prevent double init

  const [preloaderDone, setPreloaderDone] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
  const [isHovering, setIsHovering] = useState(false);

  // ─── Generate corner LeetCode grid boxes (memoized, reduced count) ───
  const cornerBoxes = useMemo(() =>
    Array.from({ length: 4 }, () =>
      Array.from({ length: 10 * 8 }, () =>
        LC_ACTIVITY_COLORS[Math.floor(Math.random() * LC_ACTIVITY_COLORS.length)]
      )
    ), []
  );

  // Cursor helpers removed

  // ─── Magnetic effect helper ─────────────────────
  const btnRefs = useRef([]);
  const handleMagneticMove = useCallback((e, idx) => {
    const btn = btnRefs.current[idx];
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: dx * 0.35, y: dy * 0.35, ease: 'power2.out', duration: 0.3 });
  }, []);

  const handleMagneticLeave = useCallback((idx) => {
    const btn = btnRefs.current[idx];
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, ease: 'elastic.out(1, 0.3)', duration: 0.7 });
  }, []);

  // ─── Page transition flash (Change 5A) ─────────
  const triggerFlash = useCallback(() => {
    if (flashRef.current) {
      gsap.fromTo(flashRef.current, { opacity: 0 }, {
        keyframes: [
          { opacity: 0.15, duration: 0.1 },
          { opacity: 0, duration: 0.2 },
        ],
      });
    }
  }, []);

  // Navigate to section (with flash)
  const scrollToSection = useCallback((id) => {
    triggerFlash();
    const target = document.querySelector(`#${id}`);
    if (lenisRef.current && target) {
      lenisRef.current.scrollTo(`#${id}`, { duration: 1.6 });
    }
  }, [triggerFlash]);

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
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Cursor logic removed

    // ─── Custom Cursor Logic ───
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.to(cursorDot, { x: clientX, y: clientY, duration: 0.1, ease: 'power2.out' });
      gsap.to(cursorRing, { x: clientX, y: clientY, duration: 0.4, ease: 'power3.out' });
    };

    const onMouseDown = () => {
      gsap.to([cursorDot, cursorRing], { scale: 0.7, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to([cursorDot, cursorRing], { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Hover states for interactive elements
    const handleMouseEnter = () => {
      setIsHovering(true);
      gsap.to(cursorRing, { scale: 2.5, backgroundColor: 'rgba(200, 241, 53, 0.1)', borderColor: 'var(--accent)', duration: 0.3 });
      gsap.to(cursorDot, { scale: 0, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      gsap.to(cursorRing, { scale: 1, backgroundColor: 'transparent', borderColor: 'var(--white)', opacity: 0.4, duration: 0.3 });
      gsap.to(cursorDot, { scale: 1, duration: 0.3 });
    };

    const interactives = document.querySelectorAll('a, button, .nav-dot, .nav-monogram, .magnetic-btn, .skill-pill, .gallery-pill');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Active section tracker removed from here, moving Scroll Progress to initSceneAnimations for accurate calculation

    // Active section tracker
    SECTIONS.forEach((id, i) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
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
    const initTubesEffect = () => {
      if (tubesInited.current) return;
      tubesInited.current = true;

      const targetPr = Math.min(window.devicePixelRatio || 1, 2);
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
            tubes: {
              colors: ["#35f14e", "#51b52a", "#267356"],
              lights: {
                intensity: 150,
                colors: ["#C8F135", "#ff7403", "#ff12f3", "#60aed5"]
              }
            }
          });
          tubesAppRef.current = instance;

          if (instance && instance.three) {
            const { renderer } = instance.three;
            const getSafeSize = () => {
              const w = Math.min(canvas.clientWidth || window.innerWidth, 4096);
              const h = Math.min(canvas.clientHeight || window.innerHeight, 4096);
              return { w, h, pw: Math.floor(w * targetPr), ph: Math.floor(h * targetPr) };
            };

            const originalSetSize = renderer.setSize.bind(renderer);
            const originalSetPixelRatio = renderer.setPixelRatio.bind(renderer);

            renderer.setPixelRatio = (val) => originalSetPixelRatio(targetPr);
            renderer.setPixelRatio(targetPr);

            renderer.setSize = (width, height, updateStyle) => {
              const { w, h, pw, ph } = getSafeSize();
              if (instance.bloomPass && typeof instance.bloomPass.setSize === 'function') {
                try {
                  if (instance.bloomPass.renderTargetsHorizontal?.length > 0) {
                    instance.bloomPass.setSize(pw, ph);
                  }
                } catch (e) { }
              }
              return originalSetSize(w, h, updateStyle);
            };

            instance.three.resize();
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

    // Toggle tubes cursor visibility after About section (with existence checks)
    ScrollTrigger.create({
      trigger: '#experience',
      start: 'top bottom',
      onEnter: () => {
        const targets = document.querySelectorAll('.tubes-canvas-wrapper');
        if (targets.length > 0) {
          gsap.to(targets, { opacity: 0, duration: 0.5, pointerEvents: 'none' });
        }
      },
      onLeaveBack: () => {
        const targets = document.querySelectorAll('.tubes-canvas-wrapper');
        if (targets.length > 0) {
          gsap.to(targets, { opacity: 1, duration: 0.8, pointerEvents: 'none' });
        }
      },
    });

    return () => {
      if (heroEl) {
        heroEl.removeEventListener('mousemove', throttledHeroMove);
        heroEl.removeEventListener('mouseleave', onHeroLeave);
      }
      if (heroMoveRaf) cancelAnimationFrame(heroMoveRaf);
      if (cleanupInit && typeof cleanupInit === 'function') cleanupInit();

      if (tubesAppRef.current) {
        try {
          if (typeof tubesAppRef.current.dispose === 'function') tubesAppRef.current.dispose();
          else if (typeof tubesAppRef.current.destroy === 'function') tubesAppRef.current.destroy();
        } catch (e) { }
        tubesAppRef.current = null;
        tubesInited.current = false;
      }

      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      lenis.destroy();
    };
  }, []);

  // Tubes random color helper moved to top level

  // ─── Preloader Timeline ─────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setPreloaderDone(true);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              initSceneAnimations();
            });
          });
        },
      });

      const c = { val: 0 };
      tl.to(c, {
        val: 100,
        duration: 2,
        ease: 'circ.inOut',
        onUpdate: () => setCounter(Math.floor(c.val)),
      })
        .to('.preloader-monogram', {
          scale: 1.1,
          letterSpacing: '0.4em',
          opacity: 0,
          filter: 'blur(12px)',
          duration: 0.8,
          ease: 'power2.inOut'
        }, '+=0.15')
        .to('.preloader-top', { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '-=0.3')
        .to('.preloader-bottom', { yPercent: 100, duration: 0.8, ease: 'power4.inOut' }, '<');
    }, appRef);

    return () => ctx.revert();
  }, []);

  const animationsInitiated = useRef(false);
  // ─── Scene Animations ──────────────────────────
  const initSceneAnimations = () => {
    if (animationsInitiated.current) return;
    animationsInitiated.current = true;
    // === HERO entry sequence ===
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .fromTo('.hero-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
      .fromTo('.hero-first .char', { y: -100, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 0.8 }, '-=0.3')
      .fromTo('.hero-last .char', { y: 100, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.4')
      .fromTo('.hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 }, '-=0.3')
      .fromTo('.hero-stat-pill', { x: 60, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, '-=0.4')
      .fromTo('.hero-bottom', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3');

    // === Change 5B — Hero glitch after entry ===
    gsap.to('.hero-first', {
      keyframes: [
        { x: -4, duration: 0.05 },
        { x: 4, duration: 0.05 },
        { x: -2, duration: 0.05 },
        { x: 2, duration: 0.05 },
        { x: -1, duration: 0.05 },
        { x: 0, duration: 0.05 },
      ],
      delay: 3.2,
    });

    // === STATEMENT — word-by-word opacity scrub (Consolidated into one ScrollTrigger) ===
    const stWords = document.querySelectorAll('.statement-word');
    if (stWords.length > 0) {
      gsap.fromTo(stWords,
        { opacity: 0.06, color: '#555550' },
        {
          opacity: 1,
          color: (i) => i === stWords.length - 1 ? '#C8F135' : '#F0EDE6',
          stagger: 0.5,
          scrollTrigger: {
            trigger: '#statement',
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true,
          }
        }
      );
    }

    gsap.fromTo('.statement-sub',
      { opacity: 0 },
      { opacity: 1, scrollTrigger: { trigger: '#statement', start: 'center 60%' }, duration: 1.2 }
    );

    // === ABOUT — horizontal scroll (Change 02) ===
    const isSmallMobile = window.innerWidth < 1024;

    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        pin: !isSmallMobile, // Disable pinning on mobile for better scroll feel
        pinSpacing: !isSmallMobile,
      },
    });

    aboutTl
      .fromTo('.about-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0)
      .to('.about-line-1', {
        x: isSmallMobile ? '-20vw' : '-60vw',
        ease: 'none'
      }, 0)
      .to('.about-line-2', {
        x: isSmallMobile ? '20vw' : '60vw',
        ease: 'none'
      }, 0);

    // Watermark parallax
    gsap.utils.toArray('.section-watermark').forEach((el) => {
      gsap.to(el, {
        y: -150,
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        ease: 'none',
      });
    });

    // === EXPERIENCE — Change 5F clip wipe title + timeline ===
    gsap.fromTo('.exp-title',
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        scrollTrigger: { trigger: '#experience', start: 'top 70%' },
        duration: 0.8,
        ease: 'power3.out',
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
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, scrollTrigger: { trigger: card, start: 'top 85%' }, duration: 0.7, ease: 'power2.out' }
      );
    });

    // === PROJECTS — Cinematic Horizontal Story Layout ===
    const projectCount = PROJECTS.length;

    const projectScroll = window.innerWidth >= 1024 ? gsap.to(projectHorizontalRef.current, {
      x: () => -(projectHorizontalRef.current.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: projectSectionRef.current,
        pin: true,
        scrub: 0.5, // Faster, more tactile scrub
        start: 'top top',
        end: () => `+=${projectHorizontalRef.current.scrollWidth * 0.8}`, // Reduced scroll distance for faster speed
        anticipatePin: 1,
      }
    }) : null;

    // Individual project card effects (parallax + highlight + entrance)
    document.querySelectorAll('.project-card-v2').forEach((card, i) => {
      const content = card.querySelector('.project-content-v2');

      // ONE TIMELINE TO RULE THEM ALL (Fixes scroll-up glitch + ensures perfect smoothness)
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          containerAnimation: window.innerWidth >= 1024 ? projectScroll : null,
          start: window.innerWidth < 1024 ? 'top 80%' : 'left right',
          end: window.innerWidth < 1024 ? 'bottom 20%' : 'right left',
          scrub: 1.5, // Buttery smooth feel
        }
      });

      cardTl
        .fromTo(card,
          { opacity: 0.05, scale: 0.88, filter: 'blur(15px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'power2.inOut' },
          0
        )
        .to(card,
          { opacity: 0.05, scale: 0.88, filter: 'blur(15px)', ease: 'power2.inOut' },
          0.5 // Start fading out after the halfway point of the card's journey
        );

      // individual project card effects (parallax + highlight + entrance)
      if (content) {
        gsap.to(content, {
          y: -30,
          scrollTrigger: {
            trigger: card,
            containerAnimation: projectScroll,
            start: 'left center',
            end: 'center center',
            scrub: 1, // Added scrub for smoother transition
          }
        });
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
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        scrollTrigger: { trigger: '#skills', start: 'top 70%' },
        duration: 0.8,
        ease: 'power3.out',
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

    // === STATS — count up ===
    document.querySelectorAll('.stat-counter').forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const decimals = parseInt(el.dataset.decimals || '0');
      const suffix = el.dataset.suffix || '';
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
        onUpdate: () => {
          el.textContent = (decimals > 0 ? obj.val.toFixed(decimals) : Math.floor(obj.val)) + suffix;
        },
      });
    });

    // Contact animations removed (Missing elements)

    // ─── Certification Hover Effects ──────────────────────────
    document.querySelectorAll('.cert-card-v2').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -10, borderColor: 'rgba(200, 241, 53, 0.4)', duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, borderColor: 'rgba(255,255,255,0.05)', duration: 0.3, ease: 'power2.out' });
      });
    });

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

      <div ref={appRef} className="app">
        {/* Custom Cursor */}
        <div className="cursor-dot" />
        <div className="cursor-ring" />

        {/* Page Flash (Change 5A) */}
        <div ref={flashRef} className="page-flash" />

        {/* Preloader */}
        {!preloaderDone && (
          <div className="preloader">
            <div className="preloader-top" />
            <div className="preloader-bottom" />
            <div className="preloader-monogram">RS</div>
            <div className="preloader-bar" style={{ width: `${counter}%` }} />
            <div className="preloader-counter">{String(counter).padStart(3, '0')}</div>
          </div>
        )}

        {/* Nav */}
        <nav className="nav-fixed">
          <div
            className="nav-monogram"
            onClick={() => scrollToSection('hero')}
            onMouseEnter={() => { }}
            onMouseLeave={() => { }}
          >
            RS
          </div>
          <div className="nav-dots">
            {SECTIONS.map((id, i) => (
              <div
                key={id}
                className={`nav-dot ${activeSection === i ? 'active' : ''}`}
                onClick={() => scrollToSection(id)}
                onMouseEnter={() => { }}
                onMouseLeave={() => { }}
              />
            ))}
          </div>
        </nav>

        {/* ═══════════ SCENE 01 — HERO ═══════════ */}
        <section ref={heroRef} id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 48px 48px' }}>
          <div className="section-watermark" style={{ top: '10%', right: '-5%' }}>01</div>

          {/* Corner LeetCode Grids (lightweight) */}
          {CORNER_POSITIONS.map((pos, ci) => (
            <div
              key={ci}
              ref={(el) => (cornerGridRefs.current[ci] = el)}
              className="corner-grid-lite"
              style={{
                position: 'absolute',
                ...pos,
                width: 200, height: 128,
                opacity: 0,
                transition: 'opacity 0.4s ease',
                pointerEvents: 'none',
                zIndex: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
                gap: 2,
                padding: 6,
                WebkitMaskImage: CORNER_MASKS[ci],
                maskImage: CORNER_MASKS[ci],
              }}
            >
              {cornerBoxes[ci].map((color, j) => (
                <div key={j} style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: color, flexShrink: 0 }} />
              ))}
            </div>
          ))}

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1fr 1fr',
            gap: window.innerWidth < 768 ? '32px' : '48px',
            width: '100%',
            maxWidth: 1400,
            margin: '0 auto',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2
          }}>
            {/* Left Side */}
            <div style={{
              textAlign: window.innerWidth < 1024 ? 'center' : 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: window.innerWidth < 1024 ? 'center' : 'flex-start',
              width: '100%'
            }}>
              <div className="hero-label font-mono" style={{
                fontSize: window.innerWidth < 768 ? 10 : 12,
                color: 'var(--accent)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: 24,
                width: '100%'
              }}>
                Available for work · 2026
              </div>
              <h1 className="hero-first font-display" style={{
                fontSize: 'clamp(48px, 15vw, 200px)',
                lineHeight: 0.85,
                color: 'var(--white)',
                letterSpacing: '-0.01em',
                display: 'flex',
                justifyContent: window.innerWidth < 1024 ? 'center' : 'flex-start',
                flexWrap: 'nowrap',
                width: '100%'
              }}>
                {heroFirstChars}
              </h1>
              <h1 className="hero-last font-display" style={{
                fontSize: 'clamp(48px, 15vw, 200px)',
                lineHeight: 0.85,
                color: 'var(--accent)',
                letterSpacing: '-0.01em',
                display: 'flex',
                justifyContent: window.innerWidth < 1024 ? 'center' : 'flex-start',
                flexWrap: 'nowrap',
                width: '100%'
              }}>
                {heroLastChars}
              </h1>
              <div style={{
                marginTop: 32,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: window.innerWidth < 1024 ? 'center' : 'flex-start',
              }}>
                <p className="hero-sub font-body" style={{
                  fontSize: 'clamp(14px, 1.4vw, 22px)',
                  fontWeight: 700,
                  color: 'rgba(240,237,230,0.7)'
                }}>
                  Frontend Developer
                </p>
                <p className="hero-sub font-mono" style={{
                  fontSize: 10,
                  color: 'var(--accent)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginTop: 8
                }}>
                  React · UI/UX · Full Stack
                </p>
              </div>
            </div>



            {/* Right Side */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: window.innerWidth < 1024 ? 'center' : 'flex-end',
              gap: 16
            }}>
              {/* RS watermark */}
              <div className="text-outline-accent font-body" style={{ fontSize: 'clamp(80px, 10vw, 160px)', fontWeight: 800, opacity: 0.1, letterSpacing: '0.1em' }}>
                RS
              </div>
              {/* Stat pills — Change 03: removed TGPA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
                {[
                  '300+ Problems Solved',
                  '3 Live Projects',
                ].map((t, i) => (
                  <div
                    key={i}
                    className="hero-stat-pill font-mono"
                    style={{
                      fontSize: 11,
                      padding: '10px 20px',
                      border: '1px solid var(--border)',
                      color: 'var(--white)',
                      letterSpacing: '0.1em',
                      background: 'var(--dim)',
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
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
            <div className="font-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.2em' }}>
              ↓ SCROLL
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
          style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', padding: '120px 48px',
            textAlign: 'center', position: 'relative',
          }
          }
        >
          <div className="section-watermark" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>02</div>

          {/* Subtle accent glow */}
          <div style={{
            position: 'absolute', width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200, 241, 53, 0.04) 0%, transparent 70%)',
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none',
          }} />

          <h2 className="font-display" style={{ fontSize: 'clamp(50px, 8vw, 130px)', lineHeight: 1, maxWidth: 1000, position: 'relative', zIndex: 1 }}>
            {statementWordsMarkup}
          </h2>
          <p className="statement-sub font-mono" style={{ fontSize: 13, color: 'var(--muted)', marginTop: 40, maxWidth: 500, letterSpacing: '0.05em', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
            — from idea to deployment, full stack, no compromises
          </p>
        </section >

        {/* ═══════════ SCENE 03 — ABOUT (Change 02 — Horizontal Scroll) ═══════════ */}
        <section id="about" style={{ minHeight: '150vh', position: 'relative' }}>
          <div className="about-scroll-container">
            <div className="section-watermark" style={{ top: '10%', left: '-5%' }}>03</div>

            {/* Label */}
            <div className="about-label font-mono" style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 48, position: 'relative', zIndex: 2 }}>
            // ABOUT ME
            </div>

            {/* Line 1 — moves LEFT */}
            <div className="about-line about-line-1" style={{ color: 'var(--white)', position: 'relative', zIndex: 2 }}>
              I craft full-stack experiences — MERN is my weapon, Java is my logic, and clean UI is my obsession.
            </div>

            {/* Separator */}
            <div style={{ width: '60%', maxWidth: 500, height: 1, background: 'var(--border)', margin: '24px 0', position: 'relative', zIndex: 2 }} />

            {/* Line 2 — moves RIGHT */}
            <div className="about-line about-line-2 text-outline-accent" style={{ position: 'relative', zIndex: 2 }}>
              3 live client projects shipped. 300+ DSA problems solved. Ranked #1 at university. Always building.
            </div>

            {/* Moved Marquee inside pinned container for always-on visibility */}
            <div style={{ position: 'absolute', bottom: '10vh', left: 0, width: '100%', zIndex: 1 }}>
              {/* Track 1 — LEFT */}
              <div className="marquee-wrapper" style={{ background: 'transparent', padding: '14px 0', opacity: 0.3 }}>
                <div className="marquee-track marquee-track-left">
                  {[0, 1, 2, 3].map(k => (
                    <span key={k} className="font-display" style={{ fontSize: 24, color: 'var(--accent)', whiteSpace: 'nowrap', paddingRight: 60 }}>{marqueeText}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* ═══════════ SCENE 04 — EXPERIENCE ═══════════ */}
        < section id="experience" style={{ padding: '160px 48px', background: 'var(--dim)', position: 'relative' }}>
          <div className="section-watermark" style={{ top: '5%', right: '-3%' }}>04</div>

          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            {/* Change 5F — clip wipe title */}
            <h2 className="exp-title clip-wipe-title font-display" data-scramble="EXPERIENCE" style={{ fontSize: 'clamp(60px, 8vw, 120px)', marginBottom: 80 }}>
              EXPERIENCE
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
                  onMouseEnter={() => { }}
                  onMouseLeave={() => { }}
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
                    className="hover-line font-mono"
                    style={{ fontSize: 11, color: 'var(--accent)', textDecoration: 'none', alignSelf: 'center', letterSpacing: '0.1em' }}
                    onMouseEnter={() => { }}
                    onMouseLeave={() => { }}
                  >
                    VIEW LIVE →
                  </a>
                  {/* Website snap preview on hover */}
                  {exp.snap && (
                    <div className="exp-snap-preview">
                      <img src={exp.snap} alt={exp.company} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section >

        {/* ═══════════ SCENE 05 — PROJECTS (HORIZONTAL STORY) ═══════════ */}
        < section ref={projectSectionRef} id="projects" style={{ background: 'var(--black)', overflow: 'hidden', position: 'relative', zIndex: 20 }}>
          <div className="section-watermark" style={{ top: '10%', left: '5%' }}>05</div>

          <div className="project-sticky-header" style={{ position: 'absolute', top: '8vh', left: '48px', zIndex: 10 }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: 'var(--white)' }}>
              MY <span style={{ color: 'var(--accent)' }}>PROJECTS</span>
            </h2>
            <p className="font-mono" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8, letterSpacing: '0.2em' }}>
            // SLIDE TO DISCOVER THE STORY
            </p>
          </div>

          <div ref={projectHorizontalRef} className="project-horizontal-container">
            {PROJECTS.map((p, i) => (
              <div key={i} className="project-card-v2"
                onMouseMove={(e) => {
                  const el = e.currentTarget;
                  const { clientX, clientY } = e;
                  if (el._raf) return;
                  el._raf = requestAnimationFrame(() => {
                    const rect = el.getBoundingClientRect();
                    const x = ((clientX - rect.left) / rect.width) * 100;
                    const y = ((clientY - rect.top) / rect.height) * 100;
                    el.style.setProperty('--torch-x-bg', `${x}%`);
                    el.style.setProperty('--torch-y-bg', `${y}%`);
                    el._raf = null;
                  });
                }}
              >
                {/* Background Torch */}
                <div className="project-torch-bg">
                  <img
                    src={p.snap || (i % 2 === 0 ? metafurySnap : desitarzanSnap)}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(30px) brightness(0.2)', opacity: 0.35 }}
                  />
                </div>

                {/* Torch Reveal */}
                <div className="project-torch-reveal">
                  <img
                    src={p.snap || (i % 2 === 0 ? metafurySnap : desitarzanSnap)}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(10px) brightness(0.75)' }}
                  />
                </div>

                {/* Content Side */}
                <div className="project-content-v2">
                  <div className="project-date">— {p.when}</div>
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
                    <a href={p.url} className="magnetic-btn project-btn">
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        View Live <ExternalLink size={16} />
                      </span>
                    </a>
                    <a href={PERSONAL.github} className="magnetic-btn project-btn-alt">
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Github size={18} /> Source
                      </span>
                    </a>
                  </div>
                </div>
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

        {/* ═══════════ SCENE 06 — SKILLS + ACHIEVEMENTS ═══════════ */}
        < section id="skills" style={{ padding: '160px 48px', background: 'var(--dim)', position: 'relative' }}>
          <div className="section-watermark" style={{ top: '10%', right: '0' }}>06</div>

          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            {/* Change 5F — clip wipe title */}
            <h2 className="skills-title clip-wipe-title font-display" data-scramble="SKILLS & STATS" style={{ fontSize: 'clamp(60px, 8vw, 120px)', marginBottom: 80 }}>
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
                      <div
                        className="stat-counter stat-number"
                        data-target={s.value}
                        data-suffix={s.suffix}
                        data-decimals={s.decimals || 0}
                      >
                        0{s.suffix}
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
            <h2 className="font-display" style={{ fontSize: 'clamp(60px, 10vw, 140px)', color: '#fff', lineHeight: 0.8, marginTop: 20, marginBottom: 100 }}>
              CODING<br />
              <span className="text-outline-accent">PROFILES</span>
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 20px'
            }}>
              {CODING_PROFILES.map((profile, i) => (
                <CodingFlipCard key={i} {...profile} index={i} />
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
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: '#fff', marginTop: 12, textTransform: 'uppercase' }}>
              MY CERTIFICATIONS
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '24px',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {CERTS_DATA.map((cert, i) => (
              <div key={i} className="cert-card-premium" style={{
                position: 'relative',
                background: '#0a0a0a',
                borderRadius: '24px',
                padding: '40px',
                border: '1px solid rgba(255,255,255,0.03)',
                overflow: 'hidden',
                transition: 'transform 0.4s ease, border-color 0.4s ease'
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
                  <span className="font-mono" style={{ fontSize: 9, color: 'rgba(255,b,255,0.2)', letterSpacing: '0.1em' }}>
                    {cert.credentialId}
                  </span>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 14px',
                    borderRadius: '100px',
                    border: '1px solid rgba(255,b,255,0.1)',
                    background: 'rgba(255,255,255,0.02)'
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: cert.color }} />
                    <span className="font-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em' }}>VERIFIED</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 80, textAlign: 'center' }}>
            <a
              href={CERTS_DRIVE_LINK}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn"
              style={{ pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 32px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, color: '#fff', textDecoration: 'none' }}
            >
              <span className="font-mono" style={{ fontSize: 11 }}>VIEW ALL CREDENTIALS</span>
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
                <a href={resumeFile} download="Rakshit_Sharma_Resume.pdf" className="resume-btn font-mono" style={{
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
              gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1.2fr 1.6fr 1.2fr',
              gap: window.innerWidth < 1024 ? '40px' : '0',
              alignItems: 'center',
              position: 'relative',
              marginTop: 20
            }}>

              {/* Role Watermark */}
              <div className="font-display" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                fontSize: '14vw', color: 'var(--black)', opacity: 0.05, pointerEvents: 'none', fontWeight: 900,
                textAlign: 'center', lineHeight: 0.8, zIndex: 0
              }}>
                FULL<br />STACK<br />DEVELOPER
              </div>

              {/* Menu Links */}
              <div style={{ zIndex: 5, textAlign: window.innerWidth < 1024 ? 'center' : 'left' }}>
                <span className="font-mono" style={{ color: 'var(--black)', opacity: 0.3, fontSize: 9, letterSpacing: '0.4em' }}>LINKS / MENU</span>
                <ul style={{ listStyle: 'none', padding: 0, marginTop: 30 }}>
                  {['HOME', 'ABOUT', 'SKILLS', 'PROJECTS'].map((item, i) => (
                    <li key={i} style={{ marginBottom: 8 }}>
                      <a href={`#${item.toLowerCase()}`} className="font-display mega-link" style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 800 }}>{item}</a>
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
              <div style={{ textAlign: window.innerWidth < 1024 ? 'center' : 'right', zIndex: 5 }}>
                <span className="font-mono" style={{ color: 'var(--black)', opacity: 0.3, fontSize: 9, letterSpacing: '0.4em' }}>CONNECT / SOCIAL</span>
                <ul style={{ listStyle: 'none', padding: 0, marginTop: 30 }}>
                  {[
                    { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/rakshit-sharma99' },
                    { label: 'GITHUB', url: 'https://github.com/Rakshit-sharma99' },
                    { label: 'YOUTUBE', url: 'https://youtube.com/@raxhit_vlogs-e3i?si=wneeKHwRapKvGXpM' },
                    { label: 'INSTAGRAM', url: 'https://www.instagram.com/raxhitzz?igsh=MXQyNnhnYmFzMHQybg==' },
                  ].map((item, i) => (
                    <li key={i} style={{ marginBottom: 8 }}>
                      <a href={item.url} target="_blank" rel="noreferrer" className="font-display mega-link" style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 800 }}>{item.label}</a>
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
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1.2fr 2fr 1.2fr',
            gap: '20px',
            alignItems: 'center'
          }}>

            <div className="font-mono" style={{ fontSize: 9, color: 'var(--white)', opacity: 0.4, textAlign: window.innerWidth < 768 ? 'center' : 'left' }}>
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

            <div className="font-mono" style={{ textAlign: window.innerWidth < 768 ? 'center' : 'right', display: 'flex', justifyContent: window.innerWidth < 768 ? 'center' : 'flex-end', gap: 30, fontSize: 9, color: 'var(--white)', opacity: 0.4 }}>
              <span>MADE IN INDIA</span>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <button
            className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
            onClick={() => lenisRef.current?.scrollTo('#hero', { duration: 2 })}
          >
            <Zap size={20} fill="currentColor" />
          </button>
        </section >

        {/* Tubes Cursor Canvas — Moved to bottom to ensure it overlays while staying out of the way of layout */}
        <div className="tubes-canvas-wrapper" >
          <canvas id="hero-tubes-canvas" />
        </div>
      </div>
    </>
  );
}
