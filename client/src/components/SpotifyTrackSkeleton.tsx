import { Card, CardContent } from "@/components/ui/card";

export default function SpotifyTrackSkeleton() {
  return (
    <Card 
      className="bg-card/80 backdrop-blur-xl border-card-border overflow-hidden"
      data-testid="skeleton-track-card"
    >
      <CardContent className="p-0">
        {/* Top section: Album cover + Track info */}
        <div className="flex gap-4 p-4">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-md bg-muted/30 animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Track name skeleton */}
            <div className="h-4 bg-muted/30 rounded animate-pulse w-3/4" />
            
            {/* Artists skeleton */}
            <div className="h-3 bg-muted/30 rounded animate-pulse w-1/2 mt-1" />
            
            {/* Badges skeleton */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <div className="h-6 bg-muted/30 rounded animate-pulse w-16" />
              <div className="h-6 bg-muted/30 rounded animate-pulse w-14" />
            </div>
          </div>
        </div>

        {/* Middle section: Play controls with progress bar and download button */}
        <div className="px-4 pb-4 pt-2">
          <div className="flex items-center gap-3 mb-2">
            {/* Play button skeleton */}
            <div className="h-8 w-8 rounded-full bg-muted/30 animate-pulse" />
            
            {/* Progress bar skeleton */}
            <div className="flex-1 h-1 bg-muted/30 rounded-full" />
            
            {/* Download button skeleton */}
            <div className="h-8 w-8 bg-muted/30 rounded animate-pulse" />
          </div>
        </div>

        {/* Bottom section: Album name with "Open" link */}
        <div className="px-4 pb-4 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="h-3 bg-muted/30 rounded animate-pulse w-24" />
            <div className="h-3 bg-muted/30 rounded animate-pulse w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
