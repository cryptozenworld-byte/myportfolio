import { profile } from '@/data/content';

export function IntroSection() {
  return (
    <div className="h-full flex flex-col justify-center pl-[6vw] pr-[4vw] max-w-[700px]">
      <div className="animate-slide-in-left text-readable">
        <p className="font-mono-tech text-cyan-400 text-sm tracking-[0.3em] uppercase mb-6">
          [ Signal acquired ]
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-4 text-glow">
          {profile.name}
        </h1>
        <p className="text-xl md:text-2xl text-cyan-100 font-light leading-relaxed mb-8">
          {profile.tagline}
        </p>
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-12 bg-cyan-400/60" />
          <span className="font-mono-tech text-white/70 text-xs tracking-wider">
            Software Engineer
          </span>
        </div>
        <p className="text-white/75 text-base leading-relaxed max-w-md">
          {profile.shortBio}
        </p>
      </div>
    </div>
  );
}
