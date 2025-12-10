import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Gamepad2 } from 'lucide-react';
import type { Activity } from '@/types/discord';

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const [elapsed, setElapsed] = useState('0:00:00');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!activity.timestamps?.start) return;

    const updateElapsed = () => {
      const now = Date.now();
      const elapsedMs = now - (activity.timestamps?.start || now);
      const hours = Math.floor(elapsedMs / 3600000);
      const minutes = Math.floor((elapsedMs % 3600000) / 60000);
      const seconds = Math.floor((elapsedMs % 60000) / 1000);
      
      setElapsed(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

      // Calculate progress if there's an end time
      if (activity.timestamps?.end && activity.timestamps?.start) {
        const totalMs = activity.timestamps.end - activity.timestamps.start;
        const progressPercent = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
        setProgress(progressPercent);
      }
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);

    return () => clearInterval(interval);
  }, [activity.timestamps]);

  let largeImageUrl = '';
  let smallImageUrl = '';

  if (activity.assets?.large_image) {
    if (activity.assets.large_image.startsWith('mp:external')) {
      largeImageUrl = `https://media.discordapp.net/${activity.assets.large_image.replace('mp:', '')}`;
    } else if (activity.application_id) {
      largeImageUrl = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
    }
  }

  if (activity.assets?.small_image) {
    if (activity.assets.small_image.startsWith('mp:external')) {
      smallImageUrl = `https://media.discordapp.net/${activity.assets.small_image.replace('mp:', '')}`;
    } else if (activity.application_id) {
      smallImageUrl = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png`;
    }
  }

  return (
    <Card className="bg-card/80 backdrop-blur-xl border-card-border p-3 sm:p-4 md:p-5 hover-elevate transition-smooth hover:shadow-xl group">
      <div className="mb-2">
        <h3 className="text-xs sm:text-sm font-bold uppercase text-muted-foreground transition-smooth group-hover:text-primary">Playing</h3>
      </div>
      
      <div className="flex gap-3 sm:gap-4 md:gap-5">
        <div className="relative flex-shrink-0">
          {largeImageUrl ? (
            <div className="relative">
              <img
                src={largeImageUrl}
                alt={activity.assets?.large_text || activity.name}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg object-cover transition-smooth group-hover:scale-105"
                data-testid="img-activity-large"
              />
              {smallImageUrl && (
                <img
                  src={smallImageUrl}
                  alt={activity.assets?.small_text || ''}
                  className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 md:-bottom-2.5 md:-right-2.5 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-card bg-card transition-bounce group-hover:scale-110"
                  data-testid="img-activity-small"
                />
              )}
            </div>
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg bg-primary/20 flex items-center justify-center">
              <Gamepad2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary animate-pulse" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm sm:text-base md:text-lg font-poppins mb-1" data-testid="text-activity-name">
            {activity.name}
          </h4>
          {activity.details && (
            <p className="text-xs sm:text-sm md:text-base text-foreground/90 mb-0.5 truncate" data-testid="text-activity-details">
              {activity.details}
            </p>
          )}
          {activity.state && (
            <p className="text-xs sm:text-sm md:text-base text-foreground/90 mb-1 truncate" data-testid="text-activity-state">
              {activity.state}
            </p>
          )}
          {activity.timestamps?.start && (
            <>
              {activity.timestamps?.end ? (
                <div className="space-y-1.5" data-testid="activity-progress">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-green-500 font-medium">
                    <Gamepad2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{elapsed}</span>
                    <span className="text-muted-foreground">/</span>
                    <span>{(() => {
                      const totalMs = activity.timestamps.end - activity.timestamps.start;
                      const hours = Math.floor(totalMs / 3600000);
                      const minutes = Math.floor((totalMs % 3600000) / 60000);
                      const seconds = Math.floor((totalMs % 60000) / 1000);
                      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    })()}</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all duration-300 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-green-500 font-medium flex items-center gap-1.5" data-testid="text-activity-elapsed">
                  <Gamepad2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  {elapsed}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
