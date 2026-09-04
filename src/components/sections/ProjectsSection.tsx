import { useState } from 'react';
import { profile } from '@/data/content';
import { ExternalLink, ChevronRight } from 'lucide-react';

export function ProjectsSection() {
  const [selected, setSelected] = useState(0);
  const project = profile.projects[selected];

  return (
    <div className="h-full flex flex-col justify-center pl-[6vw] pr-[4vw] max-w-[640px] gap-5">
      <div className="animate-slide-in-left text-readable">
        <p className="font-mono-tech text-fuchsia-400 text-sm tracking-[0.3em] uppercase mb-4">
          [ Synapse Cluster — Projects ]
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Projects</h2>
        <p className="text-white/70 text-sm">
          Each synapse fires a distinct pattern — explore the connections.
        </p>
      </div>

      {/* Project selector tabs */}
      <div className="flex flex-wrap gap-2 animate-float-in text-readable" style={{ animationDelay: '0.15s', opacity: 0 }}>
        {profile.projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setSelected(i)}
            className="px-3 py-1.5 rounded-full text-xs font-mono-tech transition-all duration-300 cursor-pointer border"
            style={{
              backgroundColor: i === selected ? 'rgba(232,121,249,0.18)' : 'rgba(255,255,255,0.04)',
              borderColor: i === selected ? 'rgba(232,121,249,0.6)' : 'rgba(255,255,255,0.12)',
              color: i === selected ? '#f0abfc' : 'rgba(255,255,255,0.6)',
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Project detail */}
      <div
        key={project.id}
        className="content-backdrop rounded-xl border border-fuchsia-500/30 p-5 animate-float-in"
        style={{ animationDelay: '0.1s', opacity: 0 }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono-tech text-fuchsia-400/90 text-[10px] uppercase tracking-widest">
            {project.category}
          </span>
        </div>
        <h3 className="text-xl text-white font-semibold mb-3">{project.title}</h3>
        <p className="text-white/80 text-sm leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-white/8 text-fuchsia-200 border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-fuchsia-300 hover:text-fuchsia-200 transition-colors cursor-pointer"
            >
              {link.label}
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>

      {/* Navigation hint */}
      <div className="flex items-center gap-2 text-white/55 text-xs font-mono-tech animate-float-in text-readable" style={{ animationDelay: '0.3s', opacity: 0 }}>
        <ChevronRight className="w-3 h-3" />
        <span>Continue scrolling to traverse experience</span>
      </div>
    </div>
  );
}
