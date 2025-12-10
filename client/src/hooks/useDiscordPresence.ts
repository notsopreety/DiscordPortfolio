import { useQuery } from '@tanstack/react-query';
import type { LanyardResponse } from '@/types/discord';
import { env } from '@/config/env';

export function useDiscordPresence() {
  return useQuery<LanyardResponse>({
    queryKey: ['discord-presence', env.DISCORD_ID],
    queryFn: async () => {
      const response = await fetch(`https://api.lanyard.rest/v1/users/${env.DISCORD_ID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Discord presence');
      }
      return response.json();
    },
    refetchInterval: 10000,
  });
}
