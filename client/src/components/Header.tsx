import { Link, useLocation } from 'wouter';
import { Github } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [location] = useLocation();
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };
    
    updateHash();
    window.addEventListener('hashchange', updateHash);
    window.addEventListener('popstate', updateHash);
    
    return () => {
      window.removeEventListener('hashchange', updateHash);
      window.removeEventListener('popstate', updateHash);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-border/40">
      <div className="container max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo/Brand with pixel font */}
          <Link href="/">
            <span 
              className="text-lg sm:text-2xl font-bold text-foreground px-2 sm:px-3 py-1.5 transition-smooth cursor-pointer leading-none" 
              style={{ fontFamily: 'var(--font-pixel)' }}
              data-testid="link-home"
            >
              notsopreety
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-0.5 sm:gap-2">
            <Link 
              href="/spotify"
              className={`nav-link-wavy text-xs sm:text-base text-muted-foreground hover:text-foreground px-2 sm:px-3 py-1.5 transition-smooth relative inline-block ${
                location === '/spotify' ? 'nav-link-active' : ''
              }`}
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
              data-testid="link-spotify"
            >
              recently played
              <svg className="wavy-underline" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M0,4 Q5,0 10,4 T20,4 T30,4 T40,4 T50,4 T60,4 T70,4 T80,4 T90,4 T100,4" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      fill="none" 
                      vectorEffect="non-scaling-stroke"/>
              </svg>
            </Link>
            <Link 
              href="/contact"
              className={`nav-link-wavy text-xs sm:text-base text-muted-foreground hover:text-foreground px-2 sm:px-3 py-1.5 transition-smooth relative inline-block ${
                location === '/contact' ? 'nav-link-active' : ''
              }`}
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
              data-testid="link-contact"
            >
              contact
              <svg className="wavy-underline" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M0,4 Q5,0 10,4 T20,4 T30,4 T40,4 T50,4 T60,4 T70,4 T80,4 T90,4 T100,4" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      fill="none" 
                      vectorEffect="non-scaling-stroke"/>
              </svg>
            </Link>
            <a
              href="https://github.com/notsopreety"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-smooth p-1.5 sm:p-2"
              data-testid="link-github"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
