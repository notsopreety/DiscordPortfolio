import { useEffect, useState } from 'react';
import { usePixelBackground } from '@/hooks/usePixelBackground';

interface PixelBackgroundProps {
  starCount?: number;
  particleCount?: number;
}

export default function PixelBackground({ 
  starCount = 30, 
  particleCount = 4 
}: PixelBackgroundProps = {}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const { stars, particles } = usePixelBackground({ 
    starCount, 
    particleCount, 
    reducedMotion 
  });

  return (
    <div className="pixel-bg">
      {!reducedMotion && (
        <>
          <div className="stars">
            {stars.map((star) => (
              <div
                key={star.id}
                className="star"
                style={{
                  left: star.left,
                  top: star.top,
                  animationDelay: star.animationDelay,
                  animationDuration: star.animationDuration
                }}
              />
            ))}
          </div>
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="pixel-particle"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
