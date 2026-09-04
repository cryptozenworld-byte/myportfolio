export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  links: { label: string; url: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface ProfileContent {
  name: string;
  tagline: string;
  shortBio: string;
  aboutParagraphs: string[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  email: string;
  socials: { label: string; url: string }[];
}

export const profile: ProfileContent = {
  name: 'Alex Chen',
  tagline: 'Software Engineer crafting systems that think',
  shortBio:
    'I build distributed systems, developer tools, and immersive interfaces at the intersection of engineering and design.',
  aboutParagraphs: [
    "I'm a software engineer who lives at the boundary between complex systems and human experience. My work spans distributed backends, real-time data pipelines, and the occasional shader experiment — anything where deep technical challenges meet tangible, human-facing outcomes.",
    'Over the last several years I have shipped products used by millions, led architecture decisions across teams, and developed a philosophy: the best systems feel effortless precisely because enormous thought went into their internals.',
    'When I am not architecting services or profiling hot paths, you will find me exploring generative art, contributing to open source, or mentoring engineers who are earlier in their journey.',
  ],
  skills: [
    { name: 'TypeScript', level: 95 },
    { name: 'Go', level: 88 },
    { name: 'Rust', level: 75 },
    { name: 'React', level: 92 },
    { name: 'Distributed Systems', level: 85 },
    { name: 'PostgreSQL', level: 90 },
    { name: 'Three.js / WebGL', level: 80 },
    { name: 'Kubernetes', level: 78 },
  ],
  projects: [
    {
      id: 'neuraldb',
      title: 'NeuralDB',
      category: 'Distributed Systems',
      description:
        'A vector-native database engine built from scratch in Rust, optimized for sub-millisecond similarity search across billion-scale embeddings with tunable consistency models.',
      tech: ['Rust', 'LSM Trees', 'SIMD', 'gRPC'],
      links: [
        { label: 'GitHub', url: 'https://github.com' },
        { label: 'Paper', url: 'https://arxiv.org' },
      ],
    },
    {
      id: 'flowstream',
      title: 'FlowStream',
      category: 'Real-time Data',
      description:
        'A streaming data pipeline platform processing 2M events/sec with exactly-once semantics, visual pipeline builder, and auto-scaling based on backpressure signals.',
      tech: ['Go', 'Kafka', 'Kubernetes', 'WebSockets'],
      links: [{ label: 'GitHub', url: 'https://github.com' }],
    },
    {
      id: 'shaderlab',
      title: 'ShaderLab',
      category: 'Creative Coding',
      description:
        'An in-browser GLSL shader playground with live multi-pass rendering, collaborative editing, and a node-based shader graph that compiles to optimized WGSL.',
      tech: ['TypeScript', 'WebGPU', 'React', 'CodeMirror'],
      links: [
        { label: 'Live', url: 'https://example.com' },
        { label: 'GitHub', url: 'https://github.com' },
      ],
    },
    {
      id: 'edgeforge',
      title: 'EdgeForge',
      category: 'Developer Tools',
      description:
        'A CLI + dashboard suite for deploying serverless functions to 300+ edge locations with unified logging, distributed tracing, and cost anomaly detection.',
      tech: ['Go', 'WebAssembly', 'OpenTelemetry', 'React'],
      links: [{ label: 'GitHub', url: 'https://github.com' }],
    },
  ],
  experiences: [
    {
      id: 'exp1',
      role: 'Staff Software Engineer',
      company: 'Helix Systems',
      period: '2023 — Present',
      description:
        'Leading the platform architecture team building the next generation of real-time data infrastructure.',
      highlights: [
        'Designed and shipped a streaming engine processing 2M+ events/sec with 99.99% uptime',
        'Mentored 8 engineers across two teams; established architecture review process',
        'Reduced p99 latency by 60% through a ground-up rewrite of the ingestion layer',
      ],
    },
    {
      id: 'exp2',
      role: 'Senior Software Engineer',
      company: 'Nimbus Cloud',
      period: '2020 — 2023',
      description:
        'Owned the core API gateway and developer experience for a cloud platform serving 50K+ developers.',
      highlights: [
        'Built the multi-tenant API gateway handling 10B requests/month',
        'Designed the internal CLI used by every engineer in the org',
        'Drove adoption of OpenTelemetry across 40+ services',
      ],
    },
    {
      id: 'exp3',
      role: 'Software Engineer',
      company: 'Atlas Labs',
      period: '2018 — 2020',
      description:
        'Full-stack engineer on the data visualization platform, bridging backend analytics with interactive frontend experiences.',
      highlights: [
        'Implemented the real-time charting engine rendering 100K+ points at 60fps',
        'Built a plugin system enabling customer-specific dashboard extensions',
        'Shipped the first GraphQL API in the company',
      ],
    },
  ],
  email: 'alex@example.com',
  socials: [
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
    { label: 'Twitter', url: 'https://twitter.com' },
  ],
};
