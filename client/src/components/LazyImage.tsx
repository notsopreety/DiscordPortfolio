import { useState } from "react";
import { Music } from "lucide-react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  testId?: string;
  fallbackIcon?: boolean;
}

export default function LazyImage({ 
  src, 
  alt, 
  className = "", 
  testId = "lazy-image",
  fallbackIcon = true 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {!isLoaded && !hasError && (
        <div className={`${className} bg-muted/30 animate-pulse`} />
      )}
      {hasError && fallbackIcon ? (
        <div className={`${className} bg-muted/30 flex items-center justify-center`}>
          <Music className="w-8 h-8 text-muted-foreground" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          data-testid={testId}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{ display: hasError && !fallbackIcon ? 'none' : undefined }}
        />
      )}
    </>
  );
}
