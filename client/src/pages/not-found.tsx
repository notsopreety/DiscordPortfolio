import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import PixelBackground from "@/components/PixelBackground";

export default function NotFound() {

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <SEO 
        title="404 - Page Not Found | notsopreety"
        description="Oops! The page you're looking for doesn't exist. Return to homepage to explore my portfolio."
        keywords="samir badaila, samir thakuri, notsopreety, code, dev, programming, github, developer, portfolio, projects, react, javascript, typescript, 404, page not found"
      />
      <PixelBackground />

      {/* Content */}
      <Card className="w-full max-w-lg mx-4 bg-card/80 backdrop-blur-xl border-card-border shadow-xl relative z-10">
        <CardContent className="pt-8 pb-10 px-6 text-center">
          {/* Header */}
          <div className="flex flex-col items-center mb-6 gap-4">
            <div className="relative">
              <AlertCircle className="h-12 w-12 text-primary animate-[pulse_2s_ease-in-out_infinite]" />
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full blur-lg opacity-70" />
            </div>
            <h1 
              className="text-4xl sm:text-5xl font-bold tracking-wider text-foreground"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              404 - Not Found
            </h1>
          </div>

          {/* Playful Message */}
          <p 
            className="mt-4 text-base sm:text-lg text-muted-foreground mb-8"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Oh no, senpai! This page wandered off into a sakura storm! 🌸
            Maybe it's hiding in a magical realm or got stuck in a pixelated dungeon?
          </p>

          {/* Return Home Button */}
          <Link href="/">
            <a data-testid="link-return-home">
              <Button 
                className="inline-flex items-center gap-2"
                data-testid="button-return-home"
              >
                <ArrowLeft className="w-5 h-5" />
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>Return to Home</span>
              </Button>
            </a>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
