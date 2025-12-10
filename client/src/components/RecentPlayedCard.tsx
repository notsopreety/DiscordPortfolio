import { Link } from 'wouter';
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Music, ChevronRight } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import LazyImage from "@/components/LazyImage";

interface SpotifyTrack {
  played_at: string;
  id: string;
  track_name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    image: string;
  };
}

interface SpotifyResponse {
  success: boolean;
  tracks: SpotifyTrack[];
}

export default function RecentPlayedCard() {
  const { data, isLoading } = useQuery<SpotifyResponse>({
    queryKey: ['/spotify/recent-tracks'],
    queryFn: async () => {
      const response = await fetch('https://spot-rect.vercel.app/recent-tracks');
      if (!response.ok) throw new Error('Failed to fetch tracks');
      return response.json();
    },
    refetchInterval: 60000,
  });

  const recentTracks = data?.tracks?.slice(0, 3) || [];

  return (
    <Link href="/spotify">
      <Card 
        className="bg-card/80 backdrop-blur-xl border-card-border p-3 sm:p-4 md:p-5 cursor-pointer hover-elevate transition-smooth hover:shadow-2xl group relative overflow-hidden"
        data-testid="card-recent-played"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:to-green-500/5 transition-all duration-500 pointer-events-none" />
        
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-2">
            <SiSpotify className="w-4 h-4 sm:w-5 sm:h-5 text-[#1DB954]" />
            <h3 className="text-xs sm:text-sm font-bold uppercase text-muted-foreground transition-smooth group-hover:text-green-500">
              Recently Played
            </h3>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-green-500 transition-smooth group-hover:translate-x-1" />
        </div>

        {isLoading ? (
          <div className="space-y-2 relative z-10">
            {Array.from({ length: 3 }).map((_, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-2 rounded-md"
                data-testid={`skeleton-recent-track-${index}`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-muted/30 animate-pulse flex-shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="h-3 bg-muted/30 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-muted/30 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : recentTracks.length > 0 ? (
          <div className="space-y-2 relative z-10">
            {recentTracks.map((track, index) => (
              <div 
                key={`${track.id}-${index}`}
                className="flex items-center gap-3 p-2 rounded-md hover-elevate transition-smooth"
                data-testid={`recent-track-${index}`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-muted/10 flex-shrink-0">
                  <LazyImage
                    src={track.album.image}
                    alt={track.album.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-md shadow-md object-cover"
                    testId={`img-recent-album-${index}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-foreground truncate" data-testid={`text-track-name-${index}`}>
                    {track.track_name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate" data-testid={`text-artists-${index}`}>
                    {track.artists.map(a => a.name).join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-8 relative z-10">
            <div className="text-center">
              <Music className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">No recent tracks</p>
            </div>
          </div>
        )}
        
        <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 pointer-events-none z-20">
          <LazyImage
            src="https://www.bhandarimilan.info.np/pictures/anime"
            alt="Anime character"
            className="w-full h-full object-contain"
            testId="img-anime-decoration"
            fallbackIcon={false}
          />
        </div>
      </Card>
    </Link>
  );
}
