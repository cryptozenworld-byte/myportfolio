import { IntroSection } from './sections/IntroSection';
import { AboutSection } from './sections/AboutSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ContactSection } from './sections/ContactSection';
import { sections } from '@/three/SectionAnchors';

interface SectionContentProps {
  activeIndex: number;
}

export function SectionContent({ activeIndex }: SectionContentProps) {
  const section = sections[activeIndex];
  const color = section?.color || '#22d3ee';

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      {/* Dimming layer behind text for readability */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background:
            'linear-gradient(105deg, rgba(3,2,8,0.72) 0%, rgba(3,2,8,0.45) 45%, transparent 70%)',
        }}
      />

      <div
        key={activeIndex}
        className="absolute inset-0 pointer-events-auto"
      >
        {/* Color tint accent — kept subtle and behind text */}
        <div
          className="absolute left-0 top-1/4 w-[35vw] h-1/2 blur-[140px] opacity-[0.05] transition-colors duration-1000 pointer-events-none"
          style={{ backgroundColor: color }}
        />
        {activeIndex === 0 && <IntroSection />}
        {activeIndex === 1 && <AboutSection />}
        {activeIndex === 2 && <ProjectsSection />}
        {activeIndex === 3 && <ExperienceSection />}
        {activeIndex === 4 && <ContactSection />}
      </div>
    </div>
  );
}
