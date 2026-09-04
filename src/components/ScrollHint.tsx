interface ScrollHintProps {
  visible: boolean;
}

export function ScrollHint({ visible }: ScrollHintProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-pulse-glow">
      <span className="font-mono-tech text-cyan-400/60 text-[10px] uppercase tracking-[0.3em]">
        Scroll to traverse
      </span>
      <svg
        className="w-4 h-4 text-cyan-400/50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
      </svg>
    </div>
  );
}
