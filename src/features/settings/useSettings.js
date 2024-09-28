import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';
import { supabaseQueryKeys } from '../../services/supabase';

export function useSettings() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: [supabaseQueryKeys.settings],
    queryFn: getSettings,
  });

  return { settings, isLoading, error };
}
