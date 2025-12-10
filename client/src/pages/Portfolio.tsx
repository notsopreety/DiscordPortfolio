import { useEffect, useState } from 'react';
import { useDiscordPresence } from '@/hooks/useDiscordPresence';
import { useDstnProfile } from '@/hooks/useDstnProfile';
import DiscordProfile from '@/components/DiscordProfile';
import ActivityCard from '@/components/ActivityCard';
import SpotifyPlayer from '@/components/SpotifyPlayer';
import SpotifyPlaylistEmbed from '@/components/SpotifyPlaylistEmbed';
import RecentPlayedCard from '@/components/RecentPlayedCard';
import AboutMeCard from '@/components/AboutMeCard';
import TechStackCard from '@/components/TechStackCard';
import SEO from '@/components/SEO';
import PixelBackground from '@/components/PixelBackground';

export default function Portfolio() {
  const { data: presenceData, isLoading: presenceLoading, error: presenceError } = useDiscordPresence();
  const { data: profileData } = useDstnProfile();
  const [currentVariant, setCurrentVariant] = useState(2);

  const variants = ["classic", "dog", "maia", "tora", "vaporwave"];

  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  const changeOnekoVariant = () => {
    const nextVariant = (currentVariant + 1) % variants.length;
    setCurrentVariant(nextVariant);
    
    const event = new CustomEvent('onekoVariantChanged', {
      detail: { variant: variants[nextVariant] }
    });
    window.dispatchEvent(event);
  };

  const { discord_user, discord_status, activities, listening_to_spotify, spotify } = presenceData?.data || {
    discord_user: null,
    discord_status: 'offline',
    activities: [],
    listening_to_spotify: false,
    spotify: null
  };

  const customStatus = activities?.find((activity) => activity.type === 4);
  const regularActivities = activities?.filter(
    (activity) => activity.type !== 4 && activity.name !== 'Spotify'
  ) || [];

  return (
    <div className="min-h-screen relative overflow-hidden page-transition">
      <SEO 
        title="notsopreety - Samir Badaila"
        description="I code and stuff, probably write stuff. Into programming, dev, and GitHub projects."
        keywords="samir badaila, samir thakuri, notsopreety, code, dev, programming, github, developer, portfolio, projects, react, javascript, typescript"
      />
      <PixelBackground />

      {/* Content */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 sm:pt-24 pb-12">
        {/* Error State - Only shown if there's an error */}
        {presenceError && (
          <div className="text-center mb-8 animate-fade-in">
            <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4 sm:p-6 max-w-2xl mx-auto">
              <h2 className="text-lg sm:text-xl font-bold text-destructive mb-2">Failed to load Discord presence</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Some features may be limited. Please try again later.</p>
            </div>
          </div>
        )}

        {/* Greeting Section */}
        <div className="mb-6 sm:mb-8 md:mb-12 animate-fade-in">
          <div className="flex items-center gap-3 sm:gap-4 mb-2 flex-wrap">
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground"
              data-testid="text-greeting"
            >
              haiiii
            </h1>
            <button
              onClick={changeOnekoVariant}
              className="hover-elevate active-elevate-2 rounded-md p-2 transition-smooth"
              data-testid="button-change-oneko"
              aria-label="Change oneko variant"
            >
              <img 
                src={`/images/oneko/heads/${variants[currentVariant]}.png`}
                alt="Oneko cat head"
                className="w-8 h-8 sm:w-10 sm:h-10"
                style={{ imageRendering: 'pixelated' }}
              />
            </button>
            <img 
              src="https://count.getloli.com/get/@notsopreety?theme=gelbooru"
              alt="Profile views counter"
              className="h-8 sm:h-10 md:h-12 lg:h-16"
              data-testid="img-view-counter"
            />
          </div>
          <p 
            className="text-base sm:text-lg text-muted-foreground italic"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            "UwU~♡ You’re here! Teehee, so nice to see you, fren! ✧"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-5 xl:col-span-4" id="profile">
            <div className="lg:sticky lg:top-24 space-y-4 animate-slide-in-left">
              {discord_user && (
                <DiscordProfile 
                  user={discord_user} 
                  status={discord_status} 
                  badges={profileData?.badges}
                  profileData={profileData}
                  customStatus={customStatus}
                />
              )}
              <div className="hidden lg:block">
                <SpotifyPlaylistEmbed />
              </div>
            </div>
          </div>

          {/* Right Column - Activities & Spotify */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-3 sm:space-y-4" id="activities">
            {regularActivities.map((activity, index) => (
              <div 
                key={activity.id} 
                className={`animate-fade-in-up ${index === 0 ? 'relative' : ''}`}
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                <ActivityCard activity={activity} />
                {index === 0 && (
                  <img 
                    src="/images/anime/1.png" 
                    alt="Anime character"
                    className="hidden lg:block absolute bottom-0 right-0 pointer-events-none z-10"
                    style={{ 
                      width: '110px',
                      height: 'auto',
                      transform: 'translateY(-100%) translateX(-5%)'
                    }}
                  />
                )}
              </div>
            ))}

            {listening_to_spotify && spotify && (
              <div 
                className={`animate-fade-in-up ${regularActivities.length === 0 ? 'relative' : ''}`}
                style={{ animationDelay: `${(regularActivities.length + 1) * 150}ms` }}
              >
                <SpotifyPlayer spotify={spotify} />
                {regularActivities.length === 0 && (
                  <img 
                    src="/images/anime/1.png" 
                    alt="Anime character"
                    className="hidden lg:block absolute bottom-0 right-0 pointer-events-none z-10"
                    style={{ 
                      width: '110px',
                      height: 'auto',
                      transform: 'translateY(-100%) translateX(-5%)'
                    }}
                  />
                )}
              </div>
            )}

            <div 
              className="animate-fade-in-up"
              style={{ animationDelay: `${(regularActivities.length + (listening_to_spotify ? 2 : 1)) * 150}ms` }}
            >
              <RecentPlayedCard />
            </div>

            <div 
              className="animate-fade-in-up"
              style={{ animationDelay: `${(regularActivities.length + (listening_to_spotify ? 3 : 2)) * 150}ms` }}
            >
              <AboutMeCard />
            </div>

            <div 
              className="animate-fade-in-up"
              style={{ animationDelay: `${(regularActivities.length + (listening_to_spotify ? 4 : 3)) * 150}ms` }}
            >
              <TechStackCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
