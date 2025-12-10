
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
        className={`w-full max-w-2xl mx-4 bg-card/90 backdrop-blur-2xl border-card-border shadow-2xl relative z-10 transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <CardContent className="pt-12 pb-12 px-6 sm:px-10 text-center relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 animate-gradient-shift pointer-events-none" />
          
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />

          {/* Header with enhanced icon */}
          <div className="flex flex-col items-center mb-8 gap-6 relative">
            <div className="relative animate-bounce-slow">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="relative bg-background/80 backdrop-blur-sm rounded-full p-6 border-2 border-primary/50">
                <AlertCircle className="h-16 w-16 text-primary animate-pulse" />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-accent animate-spin-slow" />
              </div>
            </div>
            
            <div className="relative">
              <h1 
                className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-wider text-foreground relative z-10 animate-glitch"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                404
              </h1>
              <div 
                className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl font-bold tracking-wider text-primary/30 blur-sm animate-glitch-offset"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                404
              </div>
            </div>
            
            <h2 
              className="text-2xl sm:text-3xl font-bold text-muted-foreground"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Not Found
            </h2>
          </div>

          {/* Enhanced playful message */}
          <div className="space-y-4 mb-10 relative">
            <p 
              className="text-lg sm:text-xl text-foreground/90 font-semibold"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Oh no, senpai! 😱
            </p>
            <p 
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              This page wandered off into a sakura storm! 🌸 
              <br />
              Maybe it's hiding in a magical realm or got stuck in a pixelated dungeon? 🎮
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/80 mt-6">
              <span className="inline-block animate-bounce">⚠️</span>
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Error Code: PAGE_WENT_ON_AN_ADVENTURE
              </p>
              <span className="inline-block animate-bounce animation-delay-200">⚠️</span>
            </div>
          </div>

          {/* Enhanced return button */}
          <Link href="/">
            <a data-testid="link-return-home">
              <Button 
                className="inline-flex items-center gap-3 px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                data-testid="button-return-home"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>Return to Home</span>
                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              </Button>
            </a>
          </Link>

          {/* Additional helpful text */}
          <p 
            className="mt-8 text-sm text-muted-foreground/60"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Lost? Don't worry, even the best adventurers take wrong turns sometimes! 🗺️
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
