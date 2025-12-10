import { useCallback, memo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Music } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import SEO from "@/components/SEO";
import PixelBackground from "@/components/PixelBackground";
import SpotifyTrackSkeleton from "@/components/SpotifyTrackSkeleton";
import TrackPlayer from "@/components/TrackPlayer";
import { useAudio } from "@/contexts/AudioContext";

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

interface SpotifyResponse {
  success: boolean;
  total: number;
  tracks: SpotifyTrack[];
}

const Spotify = memo(() => {
  const { setPlaylist } = useAudio();
  
  const formatTimeAgo = useCallback((date: string): string => {
    const now = new Date().getTime();
    const then = new Date(date).getTime();
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  }, []);

  const { data, isLoading, error } = useQuery<SpotifyResponse>({
    queryKey: ['/spotify/recent-tracks'],
    queryFn: async () => {
      const response = await fetch('https://spot-rect.vercel.app/recent-tracks');
      if (!response.ok) throw new Error('Failed to fetch tracks');
      return response.json();
    },
    refetchInterval: 120000,
    staleTime: 60000,
  });

  useEffect(() => {
    if (data && data.tracks) {
      setPlaylist(data.tracks);
    }
  }, [data, setPlaylist]);

  return (
    <div className="min-h-screen relative overflow-hidden page-transition">
      <SEO 
        title="Recently Played - Spotify Tracks | notsopreety"
        description="Check out my recently played Spotify tracks. Discover what music I'm listening to right now."
        keywords="samir badaila, samir thakuri, notsopreety, code, dev, programming, github, developer, portfolio, projects, react, javascript, typescript, spotify tracks, recently played, music taste, playlists"
      />
      <PixelBackground />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <SiSpotify className="w-10 h-10 text-[#1DB954]" />
            <h1 className="text-4xl font-bold" data-testid="text-page-title">Recently Played</h1>
          </div>
          <p className="text-muted-foreground" data-testid="text-page-description">
            My lil' ongaku adventure — come peek at what my ears have been vibin' to~!
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up">
            {Array.from({ length: 6 }).map((_, index) => (
              <SpotifyTrackSkeleton key={index} />
            ))}
          </div>
        )}

        {error && !isLoading && (
          <Card className="border-destructive bg-card/80 backdrop-blur-xl animate-fade-in" data-testid="card-error">
            <CardContent className="p-6">
              <p className="text-destructive text-center" data-testid="text-error-message">
                Failed to load tracks. Please try again later.
              </p>
            </CardContent>
          </Card>
        )}

        {data && data.success && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up">
            {data.tracks.map((track, index) => (
              <TrackPlayer
                key={`${track.id}-${track.played_at}`}
                track={track}
                index={index}
                formatTimeAgo={formatTimeAgo}
              />
            ))}
          </div>
        )}

        {data && data.tracks.length === 0 && !isLoading && (
          <Card className="bg-card/80 backdrop-blur-xl border-card-border animate-fade-in" data-testid="card-no-tracks">
            <CardContent className="p-12 text-center">
              <Music className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground" data-testid="text-no-tracks">
                No recently played tracks found.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
});

export default Spotify;
