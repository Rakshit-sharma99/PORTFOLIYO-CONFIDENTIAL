import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ACCENT_COLORS = [
    '#39FF14', '#00FFFF', '#0055FF', '#8A2BE2', '#FF69B4', '#FFBF00'
];

export default function MatrixEntry({ onEnter }) {
    const canvasRef = useRef(null);
    const robotRef = useRef(null);
    const leftArmRef = useRef(null);
    const rightArmRef = useRef(null);
    const legsRef = useRef(null);
    const antennaLedRef = useRef(null);
    const eyesGroupRef = useRef(null);
    const terminalTextRef = useRef(null);
    
    const [kaomoji, setKaomoji] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}<>/[]()=*+-#$@?!%^~'.split('');
        const fontSize = 16;
        let columns = Math.ceil(width / fontSize);
        let drops = [];
        let speeds = [];
        for(let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100;
            speeds[x] = 0.5 + Math.random() * 0.5;
        }

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move eyes
            if (eyesGroupRef.current) {
                const rect = eyesGroupRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const dx = (e.clientX - centerX) * 0.05;
                const dy = (e.clientY - centerY) * 0.05;
                gsap.to(eyesGroupRef.current, { x: dx, y: dy, duration: 0.1 });
            }
        };
        
        window.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.ceil(width / fontSize);
            drops = [];
            speeds = [];
            for(let x = 0; x < columns; x++) {
                drops[x] = Math.random() * -100;
                speeds[x] = 0.5 + Math.random() * 0.5;
            }
        };
        window.addEventListener('resize', handleResize);
        
        let colorIndex = 0;
        let colorProgress = 0;
        
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
        };
        const rgbColors = ACCENT_COLORS.map(hexToRgb);
        
        let animationFrameId;
        const draw = () => {
            colorProgress += 0.003;
            if (colorProgress >= 1) {
                colorProgress = 0;
                colorIndex = (colorIndex + 1) % rgbColors.length;
            }
            const nextIndex = (colorIndex + 1) % rgbColors.length;
            const c1 = rgbColors[colorIndex];
            const c2 = rgbColors[nextIndex];
            const r = Math.round(c1.r + (c2.r - c1.r) * colorProgress);
            const g = Math.round(c1.g + (c2.g - c1.g) * colorProgress);
            const b = Math.round(c1.b + (c2.b - c1.b) * colorProgress);
            
            const currentColor = `rgb(${r}, ${g}, ${b})`;
            const currentDimColor = `rgba(${r}, ${g}, ${b}, 0.08)`;
            document.documentElement.style.setProperty('--matrix-color', currentColor);

            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);
            
            ctx.font = 'bold ' + fontSize + 'px "JetBrains Mono", monospace';
            
            for(let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                
                const dx = x - mouseX;
                const dy = y - mouseY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < 160) {
                    const intensity = 1 - (dist / 160);
                    ctx.shadowBlur = 15 * intensity;
                    ctx.shadowColor = currentColor;
                    ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + intensity * 0.4})`;
                } else {
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = currentDimColor;
                }
                
                ctx.fillText(text, x, y);
                
                if(y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i] += speeds[i];
            }
            animationFrameId = requestAnimationFrame(draw);
        };
        draw();
        
        const rRef = robotRef.current;
        const lRef = leftArmRef.current;
        const riRef = rightArmRef.current;
        const leRef = legsRef.current;
        const antRef = antennaLedRef.current;

        gsap.to(rRef, { y: -15, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        gsap.to(lRef, { rotation: 10, transformOrigin: 'top center', duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        gsap.to(riRef, { rotation: -10, transformOrigin: 'top center', duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.5 });
        gsap.to(leRef, { y: -5, duration: 1, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        
        const blinkCtx = gsap.context(() => {
            gsap.to(antRef, { opacity: 0.2, duration: 0.5, yoyo: true, repeat: -1 });
        });

        const logs = [
            'npm init', 'installing dependencies...', 'loading environment...', 'compiling Matrix...',
            '> start sys.js', 'mounting component...', 'dev.environment.ready = true', 'awaiting user interaction...'
        ];
        let logIndex = 0;
        const logInt = setInterval(() => {
            if (terminalTextRef.current) {
                const span = document.createElement('div');
                span.innerText = `> ${logs[logIndex]}`;
                terminalTextRef.current.appendChild(span);
                terminalTextRef.current.scrollTop = terminalTextRef.current.scrollHeight;
                logIndex = (logIndex + 1) % logs.length;
            }
        }, 800);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            clearInterval(logInt);
            blinkCtx.revert();
            gsap.killTweensOf([rRef, lRef, riRef, leRef, antRef]);
        };
    }, []);

    const handleRobotClick = (e) => {
        e.stopPropagation();
        gsap.to(robotRef.current, { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1 });
        gsap.to(leftArmRef.current, { rotation: -45, duration: 0.1, yoyo: true, repeat: 3 });
        setKaomoji('( ﾟヮﾟ) yay!');
        setTimeout(() => setKaomoji(''), 2000);
    };

    const handleScreenClick = () => {
        gsap.to('.matrix-wrapper', {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                if (onEnter) onEnter();
            }
        });
    };

    return (
        <div 
            className="matrix-wrapper" 
            onClick={handleScreenClick}
            style={{
                position: 'fixed', inset: 0, zIndex: 99999, background: '#000',
                cursor: 'crosshair', userSelect: 'none'
            }}
        >
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
            
            <div 
                style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none'
                }}
            >
                <div 
                    ref={robotRef}
                    onClick={handleRobotClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ 
                        pointerEvents: 'auto', cursor: 'pointer', position: 'relative',
                        filter: isHovered ? 'drop-shadow(0 0 20px var(--matrix-color))' : 'drop-shadow(0 0 5px var(--matrix-color))',
                        transition: 'filter 0.3s'
                    }}
                >
                    {kaomoji && (
                        <div style={{
                            position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)',
                            color: 'var(--matrix-color)', fontFamily: 'monospace', fontWeight: 'bold',
                            textShadow: '0 0 10px var(--matrix-color)', whiteSpace: 'nowrap',
                            pointerEvents: 'none'
                        }}>
                            {kaomoji}
                        </div>
                    )}
                    <svg width="200" height="240" viewBox="0 0 200 240" fill="none" stroke="var(--matrix-color)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        {/* Antenna */}
                        <line x1="100" y1="40" x2="100" y2="10" />
                        <circle ref={antennaLedRef} cx="100" cy="10" r="5" fill="var(--matrix-color)" />
                        
                        {/* Head */}
                        <rect x="70" y="40" width="60" height="50" rx="8" />
                        <rect x="60" y="55" width="10" height="20" rx="2" />
                        <rect x="130" y="55" width="10" height="20" rx="2" />
                        <rect x="75" y="50" width="50" height="20" rx="4" fill="#050505" strokeWidth="2" />
                        <g ref={eyesGroupRef}>
                            <rect x="85" y="55" width="8" height="10" rx="2" fill="var(--matrix-color)" stroke="none" />
                            <rect x="107" y="55" width="8" height="10" rx="2" fill="var(--matrix-color)" stroke="none" />
                        </g>

                        {/* Neck */}
                        <rect x="90" y="90" width="20" height="10" />

                        {/* Torso */}
                        <rect x="50" y="100" width="100" height="90" rx="12" />
                        
                        <g ref={leftArmRef} style={{ transformOrigin: '40px 110px' }}>
                            <path d="M 50 110 Q 20 120 20 150 T 40 180" />
                            <circle cx="40" cy="180" r="8" />
                        </g>
                        <g ref={rightArmRef} style={{ transformOrigin: '160px 110px' }}>
                            <path d="M 150 110 Q 180 120 180 150 T 160 180" />
                            <circle cx="160" cy="180" r="8" />
                        </g>

                        {/* Legs */}
                        <g ref={legsRef}>
                            <path d="M 80 190 v 30 h -10" />
                            <path d="M 120 190 v 30 h 10" />
                        </g>

                        {/* Chest screen */}
                        <foreignObject x="60" y="110" width="80" height="60">
                            <div style={{
                                background: '#050505',
                                width: '100%', height: '100%',
                                border: '2px solid var(--matrix-color)',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                padding: '4px',
                            }}>
                                <div ref={terminalTextRef} style={{
                                    color: 'var(--matrix-color)',
                                    fontFamily: 'monospace',
                                    fontSize: '8px',
                                    lineHeight: '1.2',
                                    maxHeight: '100%',
                                    overflowY: 'hidden',
                                    textShadow: '0 0 2px var(--matrix-color)',
                                    wordWrap: 'break-word',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    height: '100%'
                                }}>
                                    <div>{'> boot system...'}</div>
                                </div>
                            </div>
                        </foreignObject>
                    </svg>
                </div>

                <div style={{ 
                    marginTop: 40, textAlign: 'center', 
                    color: 'var(--matrix-color)', 
                    textShadow: '0 0 15px var(--matrix-color)',
                    fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                    fontWeight: 700
                }}>
                    <div style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', letterSpacing: '0.15em' }}>
                        TAP TO INITIATE OVERRIDE
                    </div>
                </div>
                <div className="font-mono" style={{ 
                    marginTop: 10, 
                    color: 'var(--matrix-color)', 
                    opacity: 0.6,
                    fontSize: '12px'
                }}>
                    // dev.environment.ready = true
                </div>
            </div>
        </div>
    );
}
