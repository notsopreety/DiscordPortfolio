import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Music2 } from 'lucide-react';

export default function SpotifyPlaylistEmbed() {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylistId = async () => {
      try {
        const response = await fetch('https://spot-rect.vercel.app/update-top-tracks');
        const data = await response.json();
        
        if (data.success && data.playlist_id) {
          setPlaylistId(data.playlist_id);
        } else {
          setError('Failed to load playlist');
        }
      } catch (err) {
        setError('Failed to fetch playlist');
        console.error('Error fetching playlist:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylistId();
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-card/80 backdrop-blur-xl border-card-border p-4 animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <Music2 className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Loading Playlist...</h3>
        </div>
        <div className="w-full h-[380px] bg-muted/20 rounded-md" />
      </Card>
    );
  }

  if (error || !playlistId) {
    return null;
  }

  return (
    <Card className="bg-card/80 backdrop-blur-xl border-card-border p-4 transition-smooth hover:shadow-2xl" data-testid="card-spotify-embed">
      <div className="flex items-center gap-2 mb-3">
        <Music2 className="w-5 h-5 text-primary" data-testid="icon-music" />
        <h3 className="text-sm font-semibold text-foreground" data-testid="text-spotify-title">Top Tracks</h3>
      </div>
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: '0', height: '345px' }}>
        <div style={{ transform: 'scale(0.7)', transformOrigin: 'top left', width: '142.86%' }}>
          <iframe 
            src={`https://open.spotify.com/embed/playlist/${playlistId}`}
            width="100%" 
            height="480"
            style={{ border: 0 }}
            allow="encrypted-media"
            className="rounded-md"
            title="Spotify Top Tracks Playlist"
            data-testid="iframe-spotify-embed"
          />
        </div>
      </div>
    </Card>
  );
}
