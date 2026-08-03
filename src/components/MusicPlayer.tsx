import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import musicBanner from "@/assets/music-banner.png";

// Served from /public so it works on any host (Lovable or self-hosted)
const songAsset = "/music/espresso.mp3";

// Created at module load (while the loading screen is still showing) so the
// song is already buffered by the time the player mounts.
let sharedAudio: HTMLAudioElement | null = null;
const getAudio = () => {
  if (typeof window === "undefined") return null;
  if (!sharedAudio) {
    sharedAudio = new Audio();
    sharedAudio.preload = "auto";
    sharedAudio.src = songAsset;
    sharedAudio.load();
  }
  return sharedAudio;
};
if (typeof window !== "undefined") getAudio();

const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;
    audio.volume = volume;
    audioRef.current = audio;

    const onMeta = () => setDuration(audio.duration);
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };
    if (audio.duration) setDuration(audio.duration);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);

    // Autoplay once, as early as possible; if blocked, start on first interaction
    let cleanup = () => {};
    const tryPlay = () => {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          const events = ["pointerdown", "keydown", "touchstart", "wheel"] as const;
          const onGesture = () => {
            events.forEach((e) => window.removeEventListener(e, onGesture));
            audio.play().then(() => setIsPlaying(true)).catch(() => {});
          };
          cleanup = () => events.forEach((e) => window.removeEventListener(e, onGesture));
          events.forEach((e) => window.addEventListener(e, onGesture, { once: true }));
        });
    };

    // readyState >= 2 means the first chunk is decodable — no need to wait for the full file
    if (audio.readyState >= 2) tryPlay();
    else audio.addEventListener("loadeddata", tryPlay, { once: true });

    return () => {
      cleanup();
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadeddata", tryPlay);
      audio.pause();
    };
  }, []);


  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
      if (v === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  }, []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    audio.currentTime = pct * audio.duration;
  }, []);

  return (
    <motion.div
      className="glass rounded-2xl overflow-hidden w-full lg:w-80"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      {/* Album Art */}
      <div className="relative">
        <img src={musicBanner} alt="Album Art" className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs bg-background/80 text-muted-foreground font-mono">
          {isPlaying ? "PLAYING" : "PAUSED"}
        </div>
        <div className="absolute bottom-2 right-2 flex gap-1 text-muted-foreground/60 text-xs">
          ★ ★ ★ ★ ★
        </div>
      </div>

      {/* Track info + equalizer */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">Espresso</h3>
            <p className="text-sm text-muted-foreground">Sabrina Carpenter</p>
          </div>
          <div className="flex items-end gap-[3px] h-5">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full bg-primary"
                animate={isPlaying ? {
                  height: [4, 12 + Math.random() * 8, 6, 16 + Math.random() * 4, 4],
                } : { height: 4 }}
                transition={isPlaying ? {
                  duration: 0.8 + Math.random() * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                } : {}}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Controls section */}
      <div className="mx-4 mb-4 p-3 rounded-xl bg-secondary/50">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={togglePlay}
            className="w-11 h-11 rounded-full flex items-center justify-center text-primary-foreground bg-gradient-purple shadow-glow flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </motion.button>

          {/* Progress bar (clickable to seek) */}
          <div className="flex-1 flex flex-col gap-1">
            <div
              className="h-1 rounded-full bg-background/50 cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="music-progress transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <button
            onClick={toggleMute}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default MusicPlayer;
