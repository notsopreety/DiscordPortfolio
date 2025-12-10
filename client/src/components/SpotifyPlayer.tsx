import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import type { SpotifyData } from '@/types/discord';
import LazyImage from '@/components/LazyImage';

interface SpotifyPlayerProps {
  spotify: SpotifyData;
}

export default function SpotifyPlayer({ spotify }: SpotifyPlayerProps) {
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState('0:00');

  useEffect(() => {
    const updateProgress = () => {
      const now = Date.now();
      const totalDuration = spotify.timestamps.end - spotify.timestamps.start;
      const elapsedDuration = now - spotify.timestamps.start;
      const progressPercent = Math.min((elapsedDuration / totalDuration) * 100, 100);
      
      const elapsedMinutes = Math.floor(elapsedDuration / 60000);
      const elapsedSeconds = Math.floor((elapsedDuration % 60000) / 1000);
      
      setProgress(progressPercent);
      setElapsed(`${elapsedMinutes}:${elapsedSeconds.toString().padStart(2, '0')}`);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);

    return () => clearInterval(interval);
  }, [spotify.timestamps]);

  const totalDuration = spotify.timestamps.end - spotify.timestamps.start;
  const totalMinutes = Math.floor(totalDuration / 60000);
  const totalSeconds = Math.floor((totalDuration % 60000) / 1000);
  const totalTime = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
  
  const spotifyUrl = `https://open.spotify.com/track/${spotify.track_id}`;

  const handleClick = () => {
    window.open(spotifyUrl, '_blank');
  };

  return (
    <Card 
      className="bg-card/80 backdrop-blur-xl border-card-border p-3 sm:p-4 md:p-5 cursor-pointer hover-elevate transition-smooth hover:shadow-2xl group relative overflow-hidden" 
      onClick={handleClick}
      data-testid="card-spotify"
    >
      {/* Spotify green accent glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:to-green-500/5 transition-all duration-500 pointer-events-none" />
      
      <div className="mb-2 sm:mb-3 relative z-10">
        <h3 className="text-xs sm:text-sm font-bold uppercase text-muted-foreground transition-smooth group-hover:text-green-500">Listening to Spotify</h3>
      </div>

      <div className="flex gap-3 sm:gap-4 md:gap-5 relative z-10">
        <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
          <div className="w-full h-full rounded-full overflow-hidden shadow-lg animate-cd-spin group-hover:shadow-2xl group-hover:shadow-green-500/30 relative bg-gradient-to-br from-gray-800 to-gray-900">
            {/* CD shine effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-40 pointer-events-none" />
            
            <LazyImage
              src={spotify.album_art_url}
              alt={spotify.album}
              className="w-full h-full object-cover opacity-90"
              testId="img-spotify-album"
            />
            
            {/* CD center hole with gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-gray-600/50 shadow-inner" />
            
            {/* Inner ring for CD look */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-white/10 pointer-events-none" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm sm:text-base md:text-lg font-poppins truncate transition-smooth group-hover:text-green-500" data-testid="text-spotify-song">
            {spotify.song}
          </h4>
          <p className="text-xs sm:text-sm md:text-base text-foreground/80 truncate mb-2" data-testid="text-spotify-artist">
            {spotify.artist}
          </p>

          <div className="mt-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
              <span className="text-xs sm:text-sm text-muted-foreground transition-smooth group-hover:text-green-500" data-testid="text-elapsed-time">{elapsed}</span>
              <div className="flex-1 bg-muted/30 rounded-full h-1 sm:h-1.5 overflow-hidden">
                <div
                  className="h-full bg-foreground group-hover:bg-green-500 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                  data-testid="progress-bar"
                />
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground transition-smooth group-hover:text-green-500" data-testid="text-total-time">{totalTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
