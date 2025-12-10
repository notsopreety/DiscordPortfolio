
export const env = {
  DISCORD_ID: import.meta.env.VITE_DISCORD_ID || '931511745284038696',
  SPOTIFY_API_BASE_URL: import.meta.env.VITE_SPOTIFY_API_BASE_URL || 'https://spot-rect.vercel.app',
} as const;
