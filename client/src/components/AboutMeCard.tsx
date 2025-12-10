import { Card } from '@/components/ui/card';
import { SiJavascript, SiTypescript, SiReact } from 'react-icons/si';

export default function AboutMeCard() {
  return (
    <Card 
      className="bg-card/80 backdrop-blur-xl border-card-border p-4 sm:p-6 transition-smooth hover:shadow-2xl"
      data-testid="card-about-me"
    >
      <div className="space-y-4">
        {/* Header with line separator */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-muted-foreground/30"></div>
          <h3 
            className="px-4 text-sm sm:text-base font-mono text-muted-foreground tracking-wider"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
            data-testid="text-about-me-header"
          >
            About Me
          </h3>
          <div className="flex-grow border-t border-muted-foreground/30"></div>
        </div>
        
        {/* Content */}
        <div 
          className="space-y-3 text-sm sm:text-base leading-relaxed font-mono"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          <p className="text-foreground" data-testid="text-about-intro">
            I'm a lazy noob dev and learner
          </p>
          
          <p className="text-foreground flex items-center flex-wrap gap-1.5" data-testid="text-about-projects">
            <span>i create simple projects just for fun in</span>
            <span className="inline-flex items-center gap-1.5 bg-primary/10 px-2 py-0.5 rounded">
              <SiReact className="w-4 h-4 text-[#61DAFB]" />
              <span>react</span>
            </span>
            <span>with</span>
            <span className="inline-flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded">
              <SiJavascript className="w-4 h-4 text-[#F7DF1E]" />
              <span>JS</span>
            </span>
            <span>and</span>
            <span className="inline-flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded">
              <SiTypescript className="w-4 h-4 text-[#3178C6]" />
              <span>TS</span>
            </span>
          </p>
          
          <p className="text-foreground" data-testid="text-about-hobby">
            and love scrapping other's sites data for fun Haha.
          </p>
        </div>
      </div>
    </Card>
  );
}
