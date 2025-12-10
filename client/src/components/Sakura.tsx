import { useEffect, useState } from "react";

export default function Sakura() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setShouldRender(false);
      return;
    }

    // Enable sakura on all screen sizes
    setShouldRender(true);
  }, []);

  // Don't render if conditions aren't met
  if (!shouldRender) {
    return null;
  }

  return (
    <div className="sakura">
      {Array.from({ length: 15 }, (_, i) => (
        <span key={i}></span>
      ))}
    </div>
  );
}
