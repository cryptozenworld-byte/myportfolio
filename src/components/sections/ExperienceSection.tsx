import { profile } from '@/data/content';

export function ExperienceSection() {
  return (
    <div className="h-full flex flex-col justify-center pl-[6vw] pr-[4vw] max-w-[600px] gap-6 py-20">
      <div className="animate-slide-in-left text-readable">
        <p className="font-mono-tech text-emerald-400 text-sm tracking-[0.3em] uppercase mb-4">
          [ Memory Lobe — Experience ]
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Experience</h2>
        <p className="text-white/70 text-sm">
          Stacked impulse rings — each a chapter of the journey.
        </p>
      </div>

      <div className="content-backdrop rounded-xl border border-emerald-500/20 p-6">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-400/50 via-emerald-400/25 to-transparent" />

          <div className="space-y-6">
            {profile.experiences.map((exp, i) => (
              <div
                key={exp.id}
                className="relative pl-8 animate-float-in"
                style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-emerald-400/60 bg-[#030208]"
                  style={{ boxShadow: '0 0 10px rgba(52,211,153,0.4)' }}
                />
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-mono-tech text-emerald-400 text-xs">
                    {exp.period}
                  </span>
                </div>
                <h3 className="text-lg text-white font-semibold">{exp.role}</h3>
                <p className="text-emerald-300 text-sm mb-2">{exp.company}</p>
                <p className="text-white/75 text-xs leading-relaxed mb-2">{exp.description}</p>
                <ul className="space-y-1">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-white/65 text-xs leading-relaxed flex gap-2">
                      <span className="text-emerald-400/60 mt-1">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
