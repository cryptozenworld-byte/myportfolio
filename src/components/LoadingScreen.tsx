import { useState, useEffect } from 'react';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030208] transition-opacity duration-500 ${
        done ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated neuron pulse */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping" />
          <div className="absolute inset-2 rounded-full border border-cyan-400/50 animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-cyan-400/20 animate-pulse-glow" />
          <div className="absolute inset-7 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.8)]" />
        </div>

        <div className="text-center">
          <p className="font-mono-tech text-cyan-400/80 text-sm tracking-[0.3em] uppercase mb-2">
            Initializing Neural Pathway
          </p>
          <p className="text-white/40 text-xs font-mono-tech">
            Establishing synaptic connections...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 transition-all duration-100"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="font-mono-tech text-white/30 text-xs tabular-nums">
          {Math.min(Math.floor(progress), 100)}%
        </p>
      </div>
    </div>
  );
}
