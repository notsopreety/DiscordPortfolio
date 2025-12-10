import { useMemo } from 'react';

interface PixelBackgroundConfig {
  starCount?: number;
  particleCount?: number;
  reducedMotion?: boolean;
}

export function usePixelBackground({ 
  starCount = 50, 
  particleCount = 8,
  reducedMotion = false 
}: PixelBackgroundConfig = {}) {
  const stars = useMemo(() => {
    if (reducedMotion) return [];
    
    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 2}s`
    }));
  }, [starCount, reducedMotion]);

  const particles = useMemo(() => {
    if (reducedMotion) return [];
    
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${15 + Math.random() * 10}s`
    }));
  }, [particleCount, reducedMotion]);

  return { stars, particles };
}
