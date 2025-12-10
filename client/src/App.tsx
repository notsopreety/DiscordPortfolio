import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import Portfolio from "@/pages/Portfolio";
import Spotify from "@/pages/Spotify";
import Contact from "@/pages/Contact";
import GitHub from "@/pages/GitHub";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Sakura from "@/components/Sakura";
import ScrollToTop from "@/components/ScrollToTop";
import { AudioProvider } from "@/contexts/AudioContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route path="/spotify" component={Spotify} />
      <Route path="/contact" component={Contact} />
      <Route path="/github" component={GitHub} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AudioProvider>
        <TooltipProvider delayDuration={0} skipDelayDuration={0}>
          <ScrollToTop />
          <Sakura />
          <Header />
          <Toaster />
          <Router />
          <Footer />
          <BackToTop />
          <Analytics />
        </TooltipProvider>
      </AudioProvider>
    </QueryClientProvider>
  );
}

export default App;
