import { Card } from '@/components/ui/card';
import { Code } from 'lucide-react';
import { 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
  SiPhp, 
  SiC,
  SiGnubash,
  SiNodedotjs,
  SiExpress,
  SiNextdotjs,
  SiFlask,
  SiFastapi,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiGit,
  SiDocker,
  SiLinux,
  SiPostman
} from 'react-icons/si';
import { FaReact } from "react-icons/fa";

interface Tech {
  name: string;
  icon: React.ElementType;
  color: string;
}

const techStack = {
  languages: [
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'PHP', icon: SiPhp, color: '#777BB4' },
    { name: 'C', icon: SiC, color: '#A8B9CC' },
    { name: 'Bash', icon: SiGnubash, color: '#4EAA25' },
  ],
  backend: [
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Express.js', icon: SiExpress, color: '#000000' },
    { name: 'NestJS', icon: SiNextdotjs, color: '#000000' },
    { name: 'Flask', icon: SiFlask, color: '#000000' },
    { name: 'React', icon: FaReact, color: '#58c4dc' },
  ],
  databases: [
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
    { name: 'Redis', icon: SiRedis, color: '#DC382D' },
  ],
  tools: [
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Linux', icon: SiLinux, color: '#FCC624' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    { name: 'VS Code', icon: Code, color: '#007ACC' },
  ],
};

function TechBadge({ tech }: { tech: Tech }) {
  const Icon = tech.icon;
  return (
    <span 
      className="inline-flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded hover-elevate transition-all"
      data-testid={`badge-tech-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Icon className="w-4 h-4" style={{ color: tech.color }} />
      <span className="text-xs sm:text-sm">{tech.name}</span>
    </span>
  );
}

export default function TechStackCard() {
  return (
    <Card 
      className="bg-card/80 backdrop-blur-xl border-card-border p-4 sm:p-6 transition-smooth hover:shadow-2xl"
      data-testid="card-tech-stack"
    >
      <div className="space-y-5">
        {/* Header with line separator */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-muted-foreground/30"></div>
          <h3 
            className="px-4 text-sm sm:text-base font-mono text-muted-foreground tracking-wider"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
            data-testid="text-tech-stack-header"
          >
            Tech Stack
          </h3>
          <div className="flex-grow border-t border-muted-foreground/30"></div>
        </div>
        
        {/* Content */}
        <div 
          className="space-y-4 text-sm sm:text-base font-mono"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          <p className="text-foreground" data-testid="text-intro">
            ✨ Code‑chan’s Toolbox ♡ My go‑to techie for projecty adventures &gt;3
          </p>
          {/* Languages */}
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm text-muted-foreground/70 uppercase tracking-wide" data-testid="text-languages-title">
              Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.languages.map((tech) => (
                <TechBadge key={tech.name} tech={tech} />
              ))}
            </div>
          </div>

          {/* Backend & Frameworks */}
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm text-muted-foreground/70 uppercase tracking-wide" data-testid="text-backend-title">
              Backend & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.backend.map((tech) => (
                <TechBadge key={tech.name} tech={tech} />
              ))}
            </div>
          </div>

          {/* Databases */}
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm text-muted-foreground/70 uppercase tracking-wide" data-testid="text-databases-title">
              Databases
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.databases.map((tech) => (
                <TechBadge key={tech.name} tech={tech} />
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm text-muted-foreground/70 uppercase tracking-wide" data-testid="text-tools-title">
              Tools & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.tools.map((tech) => (
                <TechBadge key={tech.name} tech={tech} />
              ))}
            </div>
          </div>
          <p className="text-foreground" data-testid="text-ending">
            ...and many more.
          </p>
        </div>
      </div>
    </Card>
  );
}
