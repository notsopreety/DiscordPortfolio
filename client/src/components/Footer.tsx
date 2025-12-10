import { Link } from 'wouter';
import { Github, Heart, Sparkles, Coffee, ExternalLink } from 'lucide-react';
import { FaDiscord, FaReact } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 border-t border-border/40 bg-background/50 backdrop-blur-sm">
      {/* Decorative top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <div className="flex items-center gap-2">
              <span
                className="text-lg sm:text-xl md:text-2xl font-bold text-foreground"
                style={{ fontFamily: 'var(--font-pixel)' }}
              >
                notsopreety
              </span>
              <Sparkles className="w-5 h-5 text-primary animate-scale" />
            </div>
            <p
              className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              "A lazy dev making weirdo stufs on the internet~ ♡ Building with love, one pixel at a time!"
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Arigato, fren!</span>
              <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
              <span>Can’t wait to see ya again !</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <h3
              className="text-sm font-semibold text-foreground tracking-wider"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Quick Links
            </h3>
            <nav className="flex flex-col gap-1 sm:gap-2">
              <Link
                href="/"
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth group flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                Home
              </Link>
              <Link
                href="/spotify"
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth group flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                Recently Played
              </Link>
              <Link
                href="/contact"
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth group flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                Contact
              </Link>
            </nav>
          </div>

          {/* Social & Info */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <h3
              className="text-sm font-semibold text-foreground tracking-wider"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Let's Connect
            </h3>
            <div className="flex flex-col gap-2 sm:gap-3">
              <a
                href="https://github.com/notsopreety"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth group p-2 -m-2 rounded-lg hover:bg-primary/5"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://discord.com/users/931511745284038696"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth group p-2 -m-2 rounded-lg hover:bg-primary/5"
              >
                <FaDiscord className="w-4 h-4" />
                <span>Discord</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
            <div className="pt-2 border-t border-border/40">
              <p
                className="text-xs text-muted-foreground"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                © {currentYear} notsopreety. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decorative section */}
        <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-border/40">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Coffee className="w-3 h-3" />
              <span>Fueled by madness & caffeine</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Built with</span>
              <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
              <span>in React</span>
              <FaReact className="w-3 h-3 text-primary animate-spin-slow" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
