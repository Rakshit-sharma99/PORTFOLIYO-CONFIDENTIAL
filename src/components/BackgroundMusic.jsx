import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import bgMusic from '../assets/BGMMUSIC/0309.MP3';

const BackgroundMusic = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0;
        audio.loop = true;

        const handleFirstInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
                audio.play().then(() => {
                    setIsPlaying(true);
                    // Fade in
                    let vol = 0;
                    const interval = setInterval(() => {
                        if (vol < 0.4) {
                            vol += 0.02;
                            audio.volume = Math.min(vol, 0.4);
                        } else {
                            clearInterval(interval);
                        }
                    }, 100);
                }).catch(err => console.log("Autoplay blocked:", err));

                window.removeEventListener('click', handleFirstInteraction);
                window.removeEventListener('keydown', handleFirstInteraction);
                window.removeEventListener('touchstart', handleFirstInteraction);
            }
        };

        window.addEventListener('click', handleFirstInteraction);
        window.addEventListener('keydown', handleFirstInteraction);
        window.addEventListener('touchstart', handleFirstInteraction);

        return () => {
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
        };
    }, [hasInteracted]);

    const toggleMute = () => {
        if (audioRef.current) {
            const nextMuted = !isMuted;
            audioRef.current.muted = nextMuted;
            setIsMuted(nextMuted);
        }
    };

    return (
        <>
            <audio ref={audioRef} src={bgMusic} />
            <button
                className={`music-control-btn ${isPlaying ? 'playing' : ''} ${isMuted ? 'muted' : ''}`}
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute music" : "Mute music"}
            >
                <div className="music-btn-glass">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </div>
                {isPlaying && !isMuted && (
                    <div className="music-pulse">
                        <div className="pulse-ring"></div>
                        <div className="pulse-ring"></div>
                    </div>
                )}
            </button>
        </>
    );
};

export default BackgroundMusic;
