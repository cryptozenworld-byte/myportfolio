import { sections } from '@/three/SectionAnchors';

interface ProgressBarProps {
  activeIndex: number;
  onJump: (index: number) => void;
}

export function ProgressBar({ activeIndex, onJump }: ProgressBarProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onJump(i)}
          className="group flex items-center gap-3 cursor-pointer"
          aria-label={`Navigate to ${s.label}`}
        >
          <span
            className="font-mono-tech text-[10px] uppercase tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
            style={{ color: s.color }}
          >
            {s.label}
          </span>
          <span
            className="block rounded-full transition-all duration-500"
            style={{
              width: i === activeIndex ? '12px' : '6px',
              height: i === activeIndex ? '12px' : '6px',
              backgroundColor: s.color,
              boxShadow:
                i === activeIndex ? `0 0 12px ${s.color}, 0 0 24px ${s.color}` : 'none',
              opacity: i === activeIndex ? 1 : 0.35,
            }}
          />
        </button>
      ))}
    </div>
  );
}
