import { createContext, useContext, useRef, useState, ReactNode, useCallback, useEffect } from 'react';

interface Track {
  id: string;
  played_at: string;
  track_name: string;
  artists: { name: string; id: string; url: string }[];
  album: {
    name: string;
    id: string;
    release_date: string;
    total_tracks: number;
    image: string;
    url: string;
  };
  external_url: string;
  duration_ms: number;
  duration_min: string;
  explicit: boolean;
  popularity: number;
  preview_url: string | null;
  available_markets: number;
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

interface AudioContextType {
  currentTrackIndex: number | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playlist: Track[];
  isLoadingAudio: boolean;
  setPlaylist: (tracks: Track[]) => void;
  playTrack: (index: number) => Promise<void>;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seekForward: (seconds: number) => void;
  seekBackward: (seconds: number) => void;
  seekTo: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

const audioUrlCache = new Map<string, string>();

const fetchTrackAudioUrl = async (track: Track): Promise<string | null> => {
  const trackId = `${track.id}-${track.played_at}`;
  
  if (audioUrlCache.has(trackId)) {
    return audioUrlCache.get(trackId)!;
  }
  
  try {
    const response = await fetch(
      `https://universaldownloaderapi.vercel.app/api/spotify/download?url=${track.external_url}`
    );
    const data: DownloadAPIResponse = await response.json();
    
    if (data.success && data.data.downloadLinks && data.data.downloadLinks.length > 0) {
      const url = data.data.downloadLinks[0].url;
      audioUrlCache.set(trackId, url);
      return url;
    }
  } catch (error) {
    console.error('Error fetching audio:', error);
  }
  return null;
};

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlistState, setPlaylistState] = useState<Track[]>([]);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [hasPreloaded, setHasPreloaded] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeUpdateIntervalRef = useRef<number | null>(null);
  const playRequestIdRef = useRef(0);
  const currentTrackIdRef = useRef<string | null>(null);

  const updateMediaSession = useCallback((track: Track) => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.track_name,
        artist: track.artists.map(a => a.name).join(', '),
        album: track.album.name,
        artwork: [
          { src: track.album.image, sizes: '640x640', type: 'image/jpeg' }
        ]
      });

      if (audioRef.current && 'setPositionState' in navigator.mediaSession) {
        navigator.mediaSession.setPositionState({
          duration: audioRef.current.duration || 0,
          playbackRate: 1,
          position: audioRef.current.currentTime || 0
        });
      }
    }
  }, []);

  const seekForward = useCallback((seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + seconds,
        audioRef.current.duration
      );
    }
  }, []);

  const seekBackward = useCallback((seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - seconds,
        0
      );
    }
  }, []);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setPlaylist = useCallback((tracks: Track[]) => {
    if (currentTrackIdRef.current && tracks.length > 0) {
      const newIndex = tracks.findIndex(t => `${t.id}-${t.played_at}` === currentTrackIdRef.current);
      
      if (newIndex !== -1) {
        setCurrentTrackIndex(newIndex);
        setPlaylistState(tracks);
      } else {
        setPlaylistState(tracks);
        setCurrentTrackIndex(null);
        currentTrackIdRef.current = null;
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    } else {
      setPlaylistState(tracks);
    }
  }, []);

  const playTrack = useCallback(async (index: number) => {
    if (index < 0 || index >= playlistState.length) return;
    
    playRequestIdRef.current += 1;
    const currentRequestId = playRequestIdRef.current;
    
    const track = playlistState[index];
    setIsLoadingAudio(true);
    setHasPreloaded(false);
    
    const url = await fetchTrackAudioUrl(track);
    
    if (currentRequestId !== playRequestIdRef.current) {
      return;
    }
    
    if (!url) {
      setIsLoadingAudio(false);
      throw new Error('Failed to fetch audio URL');
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onloadedmetadata = null;
      audioRef.current.onended = null;
      audioRef.current.src = url;
    } else {
      audioRef.current = new Audio(url);
    }

    const audio = audioRef.current;

    audio.onloadedmetadata = () => {
      if (currentRequestId === playRequestIdRef.current) {
        setDuration(audio.duration);
        updateMediaSession(track);
      }
    };

    audio.onended = () => {
      if (currentRequestId === playRequestIdRef.current) {
        setIsPlaying(false);
        setCurrentTime(0);
        setHasPreloaded(false);
        
        if (index < playlistState.length - 1) {
          playTrack(index + 1);
        }
      }
    };

    try {
      await audio.play();
      if (currentRequestId === playRequestIdRef.current) {
        const trackId = `${track.id}-${track.played_at}`;
        currentTrackIdRef.current = trackId;
        setCurrentTrackIndex(index);
        setIsPlaying(true);
        setIsLoadingAudio(false);
        updateMediaSession(track);
      }
    } catch (error) {
      console.error('Error playing track:', error);
      if (currentRequestId === playRequestIdRef.current) {
        setIsLoadingAudio(false);
        throw error;
      }
    }
  }, [playlistState, updateMediaSession]);

  const playNext = () => {
    if (currentTrackIndex !== null && currentTrackIndex < playlistState.length - 1) {
      playTrack(currentTrackIndex + 1);
    }
  };

  const playPrevious = () => {
    if (currentTrackIndex !== null && currentTrackIndex > 0) {
      playTrack(currentTrackIndex - 1);
    }
  };

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      timeUpdateIntervalRef.current = window.setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          
          if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
            try {
              navigator.mediaSession.setPositionState({
                duration: audioRef.current.duration || 0,
                playbackRate: 1,
                position: audioRef.current.currentTime || 0
              });
            } catch (e) {
              
            }
          }
          
          if (currentTrackIndex !== null && currentTrackIndex < playlistState.length - 1) {
            const timeRemaining = audioRef.current.duration - audioRef.current.currentTime;
            if (timeRemaining <= 5 && !hasPreloaded) {
              setHasPreloaded(true);
              const nextTrack = playlistState[currentTrackIndex + 1];
              if (nextTrack) {
                fetchTrackAudioUrl(nextTrack);
              }
            }
          }
        }
      }, 100);
    } else {
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
        timeUpdateIntervalRef.current = null;
      }
    }

    return () => {
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
      }
    };
  }, [isPlaying, currentTrackIndex, playlistState, hasPreloaded]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        audioRef.current?.play();
        setIsPlaying(true);
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        audioRef.current?.pause();
        setIsPlaying(false);
      });

      navigator.mediaSession.setActionHandler('seekbackward', () => {
        seekBackward(5);
      });

      navigator.mediaSession.setActionHandler('seekforward', () => {
        seekForward(5);
      });

      navigator.mediaSession.setActionHandler('previoustrack', playPrevious);

      navigator.mediaSession.setActionHandler('nexttrack', playNext);
    }
  }, [seekForward, seekBackward, currentTrackIndex, playlistState]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{
      currentTrackIndex,
      isPlaying,
      currentTime,
      duration,
      playlist: playlistState,
      isLoadingAudio,
      setPlaylist,
      playTrack,
      togglePlayPause,
      playNext,
      playPrevious,
      seekForward,
      seekBackward,
      seekTo,
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
