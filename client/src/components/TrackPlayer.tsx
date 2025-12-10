import { useState, useRef, useCallback, memo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, Clock, ExternalLink, Download, Play, Pause } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import LazyImage from "@/components/LazyImage";
import { useToast } from "@/hooks/use-toast";
import { useAudio } from "@/contexts/AudioContext";
import AudioWave from "@/components/AudioWave";

interface SpotifyArtist {
  name: string;
  id: string;
  url: string;
}

interface SpotifyAlbum {
  name: string;
  id: string;
  release_date: string;
  total_tracks: number;
  image: string;
  url: string;
}

interface SpotifyTrack {
  played_at: string;
  id: string;
  track_name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration_ms: number;
  duration_min: string;
  explicit: boolean;
  popularity: number;
  preview_url: string | null;
  external_url: string;
  available_markets: number;
}

interface TrackPlayerProps {
  track: SpotifyTrack;
  index: number;
  formatTimeAgo: (date: string) => string;
}

interface DownloadAPIResponse {
  success: boolean;
  data: {
    title: string;
    author: string;
    duration: string;
    thumbnail: string;
    downloadLinks: Array<{
      url: string;
      quality: string;
      extension: string;
      type: string;
    }>;
  };
}

const formatTime = (time: number) => {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

function TrackPlayer({ track, index, formatTimeAgo }: TrackPlayerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  
  const { toast } = useToast();
  const { 
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    isLoadingAudio,
    playTrack,
    togglePlayPause,
    seekTo,
  } = useAudio();
  
  const isCurrentTrack = currentTrackIndex === index;
  const isThisTrackPlaying = isCurrentTrack && isPlaying;
  const isThisTrackLoading = isCurrentTrack && isLoadingAudio;

  const handlePlayPause = useCallback(async () => {
    try {
      if (isCurrentTrack) {
        togglePlayPause();
      } else {
        await playTrack(index);
      }
    } catch (error) {
      toast({
        title: "Playback Error",
        description: "Failed to play track. Please try again.",
        variant: "destructive",
      });
    }
  }, [isCurrentTrack, togglePlayPause, playTrack, index, toast]);

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(
        `https://universaldownloaderapi.vercel.app/api/spotify/download?url=${track.external_url}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch download link');
      }
      
      const data: DownloadAPIResponse = await response.json();
      
      if (data.success && data.data.downloadLinks && data.data.downloadLinks.length > 0) {
        const url = data.data.downloadLinks[0].url;
        const link = document.createElement('a');
        link.href = url;
        link.download = `${track.track_name} - ${track.artists.map(a => a.name).join(', ')}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Download Started",
          description: `Downloading "${track.track_name}"`,
        });
      } else {
        throw new Error('No download links available');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : "Failed to download track. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  }, [track, toast]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isCurrentTrack || !progressBarRef.current || duration === 0) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * duration;
    
    seekTo(newTime);
  }, [isCurrentTrack, duration, seekTo]);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      handleSeek(e);
    }
  }, [isDragging, handleSeek]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleSeek(e);
  }, [handleSeek]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleSeek(e);
    }
  }, [isDragging, handleSeek]);

  const progress = isCurrentTrack && duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card 
      className="bg-card/80 backdrop-blur-xl border-card-border hover-elevate transition-smooth overflow-hidden group"
      data-testid={`card-track-${index}`}
    >
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          <a
            href={track.album.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
            data-testid={`link-album-${index}`}
          >
            <div className="relative w-20 h-20 rounded-md overflow-hidden bg-muted/10">
              <LazyImage
                src={track.album.image}
                alt={track.album.name}
                className="w-full h-full object-cover rounded-md transition-smooth group-hover:scale-110"
                testId={`img-album-cover-${index}`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth flex items-center justify-center pointer-events-none">
                <SiSpotify className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-smooth" />
              </div>
            </div>
          </a>

          <div className="flex-1 min-w-0">
            <a
              href={track.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group/title"
              data-testid={`link-track-${index}`}
            >
              <h3 
                className="font-semibold text-sm truncate group-hover/title:text-primary transition-smooth"
                title={track.track_name}
                data-testid={`text-track-name-${index}`}
              >
                {track.track_name}
              </h3>
            </a>
            
            <p 
              className="text-xs text-muted-foreground truncate mt-1"
              title={track.artists.map(a => a.name).join(', ')}
              data-testid={`text-artists-${index}`}
            >
              {track.artists.map(a => a.name).join(', ')}
            </p>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant="secondary" className="text-xs" data-testid={`badge-time-${index}`}>
                <Clock className="w-3 h-3 mr-1" />
                {isCurrentTrack && duration > 0 ? formatTime(duration) : track.duration_min} min
              </Badge>
              <Badge variant="outline" className="text-xs" data-testid={`badge-played-${index}`}>
                {formatTimeAgo(track.played_at)}
              </Badge>
              {track.explicit && (
                <Badge variant="destructive" className="text-xs" data-testid={`badge-explicit-${index}`}>
                  E
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 pt-2">
          <div className="flex items-center gap-3 mb-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={handlePlayPause}
              disabled={isThisTrackLoading}
              className="h-8 w-8 rounded-full"
              data-testid={`button-play-pause-${index}`}
            >
              {isThisTrackLoading ? (
                <div className="w-4 h-4 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin" />
              ) : isThisTrackPlaying ? (
                <Pause className="w-4 h-4 text-[#1DB954] fill-[#1DB954]" />
              ) : (
                <Play className="w-4 h-4 text-[#1DB954] fill-[#1DB954]" />
              )}
            </Button>

            <div 
              ref={progressBarRef}
              className="flex-1 h-1 bg-muted/30 rounded-full cursor-pointer relative group/progress"
              onClick={handleProgressClick}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsDragging(false)}
              data-testid={`progress-bar-${index}`}
            >
              <div 
                className="h-full bg-[#1DB954] rounded-full transition-all relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1DB954] rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
              </div>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={handleDownload}
              disabled={isDownloading}
              className="h-8 w-8"
              data-testid={`button-download-${index}`}
            >
              {isDownloading ? (
                <div className="w-4 h-4 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4 text-[#1DB954]" />
              )}
            </Button>
          </div>

          {isCurrentTrack && duration > 0 && (
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span data-testid={`text-current-time-${index}`}>{formatTime(currentTime)}</span>
              <span data-testid={`text-duration-${index}`}>{formatTime(duration)}</span>
            </div>
          )}

          {isThisTrackPlaying && (
            <div className="mt-2">
              <AudioWave isPlaying={isThisTrackPlaying} barCount={40} />
            </div>
          )}
        </div>

        <div className="px-4 pb-4 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="truncate flex items-center gap-1" title={track.album.name} data-testid={`text-album-name-${index}`}>
              <Music className="w-3 h-3" />
              {track.album.name}
            </span>
            <a
              href={track.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-smooth ml-2 flex-shrink-0"
              data-testid={`link-open-spotify-${index}`}
            >
              <span>Open</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(TrackPlayer);
