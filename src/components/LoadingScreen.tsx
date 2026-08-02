import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import avatarLoading from "@/assets/avatar-loading.png.asset.json";


const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        const increment = prev < 40 ? 4 : prev < 70 ? 2.5 : prev < 90 ? 1.2 : 0.4;
        return Math.min(prev + increment, 100);
      });
    }, 35);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {progress <= 100 && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glowing orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20 blur-[120px]"
              style={{ background: "hsl(var(--primary))" }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/3 right-1/4 w-[200px] h-[200px] rounded-full opacity-10 blur-[80px]"
              style={{ background: "hsl(var(--glow-blue))" }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/40"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 2.5 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>

          {/* Name with staggered letter animation */}
          <motion.div
            className="relative z-10 mb-1 flex overflow-hidden"
            initial="hidden"
            animate="visible"
          >
            {"PUSHP DEV RAJ".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="text-2xl font-bold text-foreground tracking-wider"
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            className="text-xs font-mono text-muted-foreground mb-8 tracking-[0.3em] uppercase relative z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            A Unknown Guy
          </motion.p>

          {/* Progress bar */}
          <div className="w-56 h-[3px] rounded-full bg-secondary/50 overflow-hidden relative z-10">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--glow-blue)), hsl(var(--primary)))",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <motion.span
            className="mt-3 text-[10px] font-mono text-muted-foreground/60 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
