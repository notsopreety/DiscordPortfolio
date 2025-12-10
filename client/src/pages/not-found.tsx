
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import PixelBackground from "@/components/PixelBackground";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <SEO 
        title="404 - Page Not Found | notsopreety"
        description="Oops! The page you're looking for doesn't exist. Return to homepage to explore my portfolio."
        keywords="samir badaila, samir thakuri, notsopreety, code, dev, programming, github, developer, portfolio, projects, react, javascript, typescript, 404, page not found"
      />
      <PixelBackground />

      {/* Floating sakura petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Content */}
      <Card 
        className={`w-full max-w-2xl mx-3 sm:mx-4 bg-card/90 backdrop-blur-2xl border-card-border shadow-2xl relative z-10 transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <CardContent className="pt-8 pb-8 px-4 sm:pt-10 sm:pb-10 sm:px-6 md:pt-12 md:pb-12 md:px-10 text-center relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 animate-gradient-shift pointer-events-none" />
          
          {/* Decorative corner elements - responsive sizes */}
          <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />

          {/* Header with enhanced icon */}
          <div className="flex flex-col items-center mb-6 sm:mb-8 gap-4 sm:gap-6 relative">
            <div className="relative animate-bounce-slow">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-xl sm:blur-2xl opacity-50 animate-pulse" />
              <div className="relative bg-background/80 backdrop-blur-sm rounded-full p-4 sm:p-5 md:p-6 border-2 border-primary/50">
                <AlertCircle className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-primary animate-pulse" />
                <Sparkles className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-accent animate-spin-slow" />
              </div>
            </div>
            
            <div className="relative">
              <h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider text-foreground relative z-10 animate-glitch"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                404
              </h1>
              <div 
                className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider text-primary/30 blur-sm animate-glitch-offset"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                404
              </div>
            </div>
            
            <h2 
              className="text-xl sm:text-2xl md:text-3xl font-bold text-muted-foreground px-2"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Not Found
            </h2>
          </div>

          {/* Enhanced playful message */}
          <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 relative px-2">
            <p 
              className="text-base sm:text-lg md:text-xl text-foreground/90 font-semibold"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Oh no, senpai! 😱
            </p>
            <p 
              className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              This page wandered off into a sakura storm! 🌸 
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Maybe it's hiding in a magical realm or got stuck in a pixelated dungeon? 🎮
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground/80 mt-4 sm:mt-6 px-2">
              <span className="inline-block animate-bounce">⚠️</span>
              <p className="break-words text-center" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Error Code: PAGE_WENT_ON_AN_ADVENTURE
              </p>
              <span className="inline-block animate-bounce animation-delay-200">⚠️</span>
            </div>
          </div>

          {/* Enhanced return button */}
          <Link href="/">
            <a data-testid="link-return-home">
              <Button 
                className="inline-flex items-center gap-2 sm:gap-3 px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                data-testid="button-return-home"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform duration-300" />
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>Return to Home</span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" />
              </Button>
            </a>
          </Link>

          {/* Additional helpful text */}
          <p 
            className="mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground/60 px-2"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Lost? Don't worry, even the best adventurers take wrong turns sometimes! 🗺️
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
