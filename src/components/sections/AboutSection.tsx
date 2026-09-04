import { profile } from '@/data/content';

export function AboutSection() {
  return (
    <div className="h-full flex flex-col justify-center pl-[6vw] pr-[4vw] max-w-[600px] gap-6">
      <div className="animate-slide-in-left text-readable">
        <p className="font-mono-tech text-indigo-400 text-sm tracking-[0.3em] uppercase mb-4">
          [ Identity Cluster ]
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">About</h2>
      </div>

      <div className="space-y-4 animate-float-in text-readable" style={{ animationDelay: '0.2s', opacity: 0 }}>
        {profile.aboutParagraphs.map((p, i) => (
          <p key={i} className="text-white/80 text-sm md:text-base leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="pt-4 animate-float-in text-readable" style={{ animationDelay: '0.4s', opacity: 0 }}>
        <p className="font-mono-tech text-indigo-400 text-xs uppercase tracking-widest mb-3">
          Synaptic Strength
        </p>
        <div className="space-y-2.5 max-w-md">
          {profile.skills.map((skill) => (
            <div key={skill.name} className="flex items-center gap-3">
              <span className="text-white/75 text-xs w-32 shrink-0 font-mono-tech">
                {skill.name}
              </span>
              <div className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className="text-white/60 text-[10px] font-mono-tech tabular-nums w-8">
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
