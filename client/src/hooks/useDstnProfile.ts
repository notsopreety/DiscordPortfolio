import { useQuery } from '@tanstack/react-query';
import type { DstnProfile } from '@/types/discord';

const DISCORD_ID = '931511745284038696';

export function useDstnProfile() {
  return useQuery<DstnProfile>({
    queryKey: ['dstn-profile', DISCORD_ID],
    queryFn: async () => {
      const response = await fetch(`https://dcdn.dstn.to/profile/${DISCORD_ID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch DSTN profile');
      }
      return response.json();
    },
    staleTime: 60000,
  });
}
