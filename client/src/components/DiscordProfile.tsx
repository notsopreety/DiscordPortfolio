import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Link2, ExternalLink, Moon, Minus, BadgeCheck } from 'lucide-react';
import { SiGithub, SiReddit, SiSpotify, SiTiktok, SiX, SiFacebook, SiDiscord  } from 'react-icons/si';
import { MessageCircle } from 'lucide-react';
import type { DiscordUser, Badge, Activity, ConnectedAccount } from '@/types/discord';

interface DiscordProfileProps {
  user: DiscordUser;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  badges?: Badge[];
  profileData?: {
    user_profile?: {
      bio?: string;
      pronouns?: string;
    };
    connected_accounts?: ConnectedAccount[];
    user?: {
      bio?: string;
    };
  };
  customStatus?: Activity;
}

const statusColors = {
  online: '#57F287',
  offline: '#808080',
  idle: '#F0B232',
  dnd: '#ED4245',
};

const connectionIcons: Record<string, any> = {
  github: SiGithub,
  reddit: SiReddit,
  spotify: SiSpotify,
  tiktok: SiTiktok,
  twitter: SiX,
  facebook: SiFacebook,
  discord: SiDiscord,
};

const connectionUrls: Record<string, (account: ConnectedAccount) => string> = {
  github: (account) => `https://github.com/${account.name}`,
  reddit: (account) => `https://reddit.com/user/${account.name}`,
  spotify: (account) => `https://open.spotify.com/user/${account.id}`,
  tiktok: (account) => `https://tiktok.com/@${account.name}`,
  twitter: (account) => `https://twitter.com/${account.name}`,
  facebook: (account) => `https://facebook.com/dev.samir.xyz`,
  discord: () => `https://discord.com/users/931511745284038696`,
};

export default function DiscordProfile({ user, status, badges, profileData, customStatus }: DiscordProfileProps) {
  const isAnimated = user.avatar?.startsWith('a_');
  const avatarExtension = isAnimated ? 'gif' : 'png';
  const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${avatarExtension}?size=256`;
  const decorationUrl = user.avatar_decoration_data?.asset 
    ? `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png`
    : null;

  const guildBadgeUrl = user.primary_guild
    ? `https://cdn.discordapp.com/guild-tag-badges/${user.primary_guild.identity_guild_id}/${user.primary_guild.badge}.png`
    : null;

  const bio = profileData?.user_profile?.bio || profileData?.user?.bio;
  const pronouns = profileData?.user_profile?.pronouns;
  const connectedAccounts = profileData?.connected_accounts || [];

  // Add Discord account manually since it's not in the API
  const discordAccount = {
    id: 'discord-static',
    name: 'Samir Thakuri', // You can customize this
    type: 'discord',
    verified: true
  };

  const allConnectedAccounts = [...connectedAccounts, discordAccount];

  const emoji = customStatus?.emoji;
  const emojiUrl = emoji?.id 
    ? `https://cdn.discordapp.com/emojis/${emoji.id}.webp?animated=true`
    : null;

  return (
    <Card className="relative overflow-visible bg-card/80 backdrop-blur-xl border-card-border p-6 pt-20 transition-smooth hover:shadow-2xl">
      <div className="flex flex-col">
        {/* Avatar and Custom Status */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative flex-shrink-0 mb-4 group">
            {customStatus && (
              <div className="absolute -top-16 -left-10 speech-bubble animate-scale-in">
                <div className="bub-part-a-top"></div>
                <div className="bub-part-b-top"></div>
                <div className="bub-part-c-top"></div>
                <div className="speech-txt flex items-center justify-center gap-1.5" data-testid="text-custom-status">
                  {emojiUrl ? (
                    <img 
                      src={emojiUrl} 
                      alt={emoji?.name || 'emoji'} 
                      className="w-4 h-4 inline-block"
                      width="16"
                      height="16"
                      loading="lazy"
                      data-testid="img-custom-emoji"
                    />
                  ) : emoji?.name && (
                    <span>{emoji.name}</span>
                  )}
                  <span className="whitespace-nowrap">{customStatus.state}</span>
                </div>
                <div className="bub-part-c-bottom"></div>
                <div className="bub-part-b-bottom"></div>
                <div className="bub-part-a-bottom"></div>
                <div className="speech-arrow">
                  <div className="arrow-w"></div>
                  <div className="arrow-x"></div>
                  <div className="arrow-y"></div>
                  <div className="arrow-z"></div>
                </div>
              </div>
            )}
            
            <div 
              className="w-20 h-20 rounded-full overflow-hidden transition-smooth group-hover:scale-110 animate-glow"
              style={{ 
                boxShadow: `0 0 20px ${statusColors[status]}40`,
                outline: `3px solid ${statusColors[status]}` 
              }}
            >
              <img 
                src={avatarUrl} 
                alt={user.username}
                className="w-full h-full object-cover transition-smooth"
                width="80"
                height="80"
                loading="eager"
                data-testid="img-discord-avatar"
              />
            </div>
            
            {decorationUrl && (
              <img
                src={decorationUrl}
                alt="Avatar decoration"
                className="absolute inset-0 w-full h-full pointer-events-none transition-smooth scale-[1.35] group-hover:scale-[1.485] origin-center"
                width="80"
                height="80"
                loading="lazy"
              />
            )}
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="absolute bottom-0 right-0 w-6 h-6 rounded-full border-4 border-card flex items-center justify-center cursor-pointer transition-smooth group-hover:scale-110"
                  style={{ backgroundColor: statusColors[status] }}
                  data-testid="status-indicator"
                >
                  {status === 'online' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-card animate-pulse" />
                  )}
                  {status === 'idle' && (
                    <Moon className="w-3 h-3 text-card fill-card" />
                  )}
                  {status === 'dnd' && (
                    <Minus className="w-3.5 h-3.5 text-card stroke-[3]" />
                  )}
                  {status === 'offline' && (
                    <div className="w-3 h-3 rounded-full bg-gray-800 dark:bg-gray-300" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="capitalize font-medium">{status === 'dnd' ? 'Do Not Disturb' : status}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* User Info */}
          <div className="text-center w-full">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-2xl font-bold font-poppins" data-testid="text-discord-username">
                {user.global_name || user.username}
              </h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <BadgeCheck className="w-5 h-5 text-primary fill-primary/20" data-testid="icon-verified" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verified Account</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
              <p className="text-sm text-muted-foreground" data-testid="text-username">
                {user.username}
              </p>
              {pronouns && (
                <>
                  <span className="text-muted-foreground text-sm">•</span>
                  <p className="text-sm text-muted-foreground" data-testid="text-pronouns">
                    {pronouns}
                  </p>
                </>
              )}
            </div>

            {guildBadgeUrl && user.primary_guild && (
              <div className="flex justify-center mb-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1.5 bg-primary/20 px-3 py-1 rounded transition-smooth hover:bg-primary/30 hover:scale-105 cursor-pointer" data-testid="badge-guild">
                      <img 
                        src={guildBadgeUrl} 
                        alt={user.primary_guild.tag}
                        className="w-4 h-4 transition-smooth"
                      />
                      <span className="text-sm font-bold">{user.primary_guild.tag}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Guild Badge: {user.primary_guild.tag}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}

            {/* Badges and Connected Accounts (Mobile) */}
            {badges && badges.length > 0 && (
              <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
                <div className="flex gap-2 flex-wrap justify-center">
                  {badges.map((badge) => (
                    <Tooltip key={badge.id}>
                      <TooltipTrigger asChild>
                        <div className="cursor-pointer transition-bounce hover:scale-125" data-testid={`badge-${badge.id}`}>
                          <img
                            src={`https://cdn.discordapp.com/badge-icons/${badge.icon}.png`}
                            alt={badge.description}
                            className="w-6 h-6"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{badge.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
                
                {/* Connected Accounts Link Icon (Mobile only) */}
                {allConnectedAccounts.length > 0 && (
                  <div className="md:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid="button-connections-mobile">
                          <Link2 className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="w-64 touch-scroll-safe">
                        <DropdownMenuLabel>Connected Accounts</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {/* Discord Account - First */}
                        {(() => {
                          const discordAccount = allConnectedAccounts.find(acc => acc.type === 'discord');
                          if (!discordAccount) return null;

                          const Icon = connectionIcons[discordAccount.type];
                          const getUrl = connectionUrls[discordAccount.type];
                          const url = getUrl ? getUrl(discordAccount) : '#';

                          return (
                            <DropdownMenuItem
                              key={discordAccount.id}
                              className="cursor-pointer"
                              onClick={() => window.open(url, '_blank')}
                              data-testid={`connection-${discordAccount.type}`}
                            >
                              <div className="flex items-center gap-2 w-full">
                                {Icon && <Icon className="h-4 w-4" />}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <p className="text-sm font-medium truncate">{discordAccount.name}</p>
                                    {discordAccount.verified && (
                                      <BadgeCheck className="h-3 w-3 text-primary flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground capitalize">{discordAccount.type}</p>
                                </div>
                                <ExternalLink className="h-3 w-3 opacity-50 flex-shrink-0" />
                              </div>
                            </DropdownMenuItem>
                          );
                        })()}

                        {/* Other Connected Accounts */}
                        {allConnectedAccounts.filter(acc => acc.type !== 'discord').map((account) => {
                          const Icon = connectionIcons[account.type];
                          const getUrl = connectionUrls[account.type];
                          const url = getUrl ? getUrl(account) : '#';

                          return (
                            <DropdownMenuItem
                              key={account.id}
                              className="cursor-pointer"
                              onClick={() => window.open(url, '_blank')}
                              data-testid={`connection-${account.type}`}
                            >
                              <div className="flex items-center gap-2 w-full">
                                {Icon && <Icon className="h-4 w-4" />}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <p className="text-sm font-medium truncate">{account.name}</p>
                                    {account.verified && (
                                      <BadgeCheck className="h-3 w-3 text-primary flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground capitalize">{account.type}</p>
                                </div>
                                <ExternalLink className="h-3 w-3 opacity-50 flex-shrink-0" />
                              </div>
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            )}

            {/* Connected Accounts - Responsive */}
            {allConnectedAccounts.length > 0 && (
              <>
                {/* Desktop - Grid */}
                <div className="hidden md:block mb-4">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 text-center">
                    Connected Accounts
                  </h3>

                  {/* Discord Account - Centered */}
                  {(() => {
                    const discordAccount = allConnectedAccounts.find(acc => acc.type === 'discord');
                    if (!discordAccount) return null;

                    const Icon = connectionIcons[discordAccount.type];
                    const getUrl = connectionUrls[discordAccount.type];
                    const url = getUrl ? getUrl(discordAccount) : '#';

                    return (
                      <div className="mb-3">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => window.open(url, '_blank')}
                              className="flex items-center justify-center gap-3 p-3 rounded-md bg-card/50 border border-card-border hover-elevate active-elevate-2 transition-smooth w-full text-center"
                              data-testid="connection-discord"
                            >
                              <div className="flex-1 -mr-20"></div>
                              {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-start gap-1.5">
                                  <p className="text-sm font-medium">{discordAccount.name}</p>
                                  {discordAccount.verified && (
                                    <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0" />
                                  )}
                                </div>
                                <div className="flex justify-start">
                                  <p className="text-xs text-muted-foreground capitalize">{discordAccount.type}</p>
                                </div>
                              </div>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View on {discordAccount.type.charAt(0).toUpperCase() + discordAccount.type.slice(1)}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    );
                  })()}

                  {/* Other Connected Accounts - 2 Column Grid */}
                  {(() => {
                    const otherAccounts = allConnectedAccounts.filter(acc => acc.type !== 'discord');
                    if (otherAccounts.length === 0) return null;

                    return (
                      <div className="grid grid-cols-2 gap-2">
                        {otherAccounts.map((account) => {
                          const Icon = connectionIcons[account.type];
                          const getUrl = connectionUrls[account.type];
                          const url = getUrl ? getUrl(account) : '#';

                          return (
                            <Tooltip key={account.id}>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => window.open(url, '_blank')}
                                  className="flex items-center gap-2 p-2 rounded-md bg-card/50 border border-card-border hover-elevate active-elevate-2 transition-smooth text-left"
                                  data-testid={`connection-${account.type}`}
                                >
                                  {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <p className="text-xs font-medium truncate">{account.name}</p>
                                      {account.verified && (
                                        <BadgeCheck className="h-3 w-3 text-primary flex-shrink-0" />
                                      )}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground capitalize">{account.type}</p>
                                  </div>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View on {account.type.charAt(0).toUpperCase() + account.type.slice(1)}</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bio */}
        {bio && (
          <div className="border-t border-card-border pt-4">
            <p className="text-sm font-medium text-center" data-testid="text-bio">
              {bio}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
