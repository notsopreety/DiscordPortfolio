interface AudioWaveProps {
  isPlaying: boolean;
  barCount?: number;
}

export default function AudioWave({ isPlaying, barCount = 20 }: AudioWaveProps) {
  return (
    <div className={`flex items-center justify-center gap-0.5 h-8 w-full ${isPlaying ? 'audio-wave-playing' : ''}`}>
      {Array.from({ length: barCount }).map((_, index) => (
        <div
          key={index}
          className="audio-wave-bar flex-1 bg-[#1DB954]/40 rounded-full min-h-[2px]"
          style={{
            animationDelay: `${index * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}
