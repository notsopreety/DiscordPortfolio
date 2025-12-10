export default function PlayfulLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Bouncing pixels */}
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-4 h-4 bg-primary rounded-sm animate-bounce"
            style={{
              animationDelay: `${i * 150}ms`,
              animationDuration: '0.6s',
              imageRendering: 'pixelated'
            }}
            data-testid={`loader-pixel-${i}`}
          />
        ))}
      </div>
      
      {/* Loading text with pixel font */}
      <div className="text-center">
        <p 
          className="text-xl text-primary animate-pulse"
          style={{ fontFamily: 'var(--font-pixel)' }}
          data-testid="text-loading"
        >
          loading...
        </p>
      </div>

      
    </div>
  );
}
