
import { Link, useLocation } from 'wouter';
import { Github, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [location] = useLocation();
  const [currentHash, setCurrentHash] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/spotify', label: 'recently played', testId: 'link-spotify' },
    { href: '/github', label: 'projects', testId: 'link-github' },
    { href: '/contact', label: 'contact', testId: 'link-contact' },
  ];

  return (
    <>
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

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-0.5 sm:gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`nav-link-wavy text-xs sm:text-base text-muted-foreground hover:text-foreground px-2 sm:px-3 py-1.5 transition-smooth relative inline-block ${
                    location === link.href ? 'nav-link-active' : ''
                  }`}
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  data-testid={link.testId}
                >
                  {link.label}
                  <svg className="wavy-underline" viewBox="0 0 100 8" preserveAspectRatio="none">
                    <path d="M0,4 Q5,0 10,4 T20,4 T30,4 T40,4 T50,4 T60,4 T70,4 T80,4 T90,4 T100,4" 
                          stroke="currentColor" 
                          strokeWidth="3" 
                          fill="none" 
                          vectorEffect="non-scaling-stroke"/>
                  </svg>
                </Link>
              ))}
              <a
                href="https://github.com/notsopreety"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-smooth p-1.5 sm:p-2"
                data-testid="link-github-external"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-muted-foreground hover:text-foreground transition-smooth p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          data-testid="mobile-menu-overlay"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-card/95 backdrop-blur-xl border-l border-border/40 z-50 md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        data-testid="mobile-sidebar"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/40">
            <span 
              className="text-xl font-bold text-foreground" 
              style={{ fontFamily: 'var(--font-pixel)' }}
            >
              Menu
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-smooth p-1"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="space-y-2 px-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`block text-base font-medium px-4 py-3 rounded-lg transition-all ${
                    location === link.href 
                      ? 'bg-primary/20 text-primary border-l-4 border-primary' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  data-testid={`${link.testId}-mobile`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border/40">
            <a
              href="https://github.com/notsopreety"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-smooth px-4 py-3 rounded-lg hover:bg-muted/50"
              data-testid="link-github-external-mobile"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                GitHub Profile
              </span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
