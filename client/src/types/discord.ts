export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  bot: boolean;
  global_name: string | null;
  avatar_decoration_data?: {
    asset: string;
    sku_id: string;
    expires_at?: number;
  } | null;
  primary_guild?: {
    tag: string;
    identity_guild_id: string;
    badge: string;
    identity_enabled: boolean;
  } | null;
}

export interface Activity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  application_id?: string;
  emoji?: {
    id: string;
    name: string;
    animated?: boolean;
  };
}

export interface SpotifyData {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface LanyardData {
  discord_user: DiscordUser;
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: Activity[];
  listening_to_spotify: boolean;
  spotify?: SpotifyData;
}

export interface LanyardResponse {
  success: boolean;
  data: LanyardData;
}

export interface Badge {
  id: string;
  description: string;
  icon: string;
  link?: string;
}

export interface ConnectedAccount {
  type: string;
  id: string;
  name: string;
  verified: boolean;
  metadata?: {
    verified?: string | boolean;
    follower_count?: string;
    following_count?: string;
    likes_count?: string;
    followers_count?: string;
    statuses_count?: string;
    created_at?: string;
    total_karma?: string;
    gold?: string;
    mod?: string;
  };
}

export interface DstnProfile {
  user: DiscordUser & {
    bio?: string;
  };
  user_profile?: {
    bio?: string;
    accent_color?: number;
    pronouns?: string;
  };
  badges: Badge[];
  banner_color?: string;
  connected_accounts?: ConnectedAccount[];
  legacy_username?: string;
}
