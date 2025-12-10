import { useQuery } from '@tanstack/react-query';
import type { DiscordProfileResponse } from '@/types/discord';
import { env } from '@/config/env';

export function useDstnProfile() {
  return useQuery<DiscordProfileResponse>({
    queryKey: ['dstn-profile', env.DISCORD_ID],
    queryFn: async () => {
      const response = await fetch(`https://dstn.to/api/users/${env.DISCORD_ID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch DSTN profile');
      }
      return response.json();
    },
    staleTime: 60000,
  });
}