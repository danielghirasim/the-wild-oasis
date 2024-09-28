import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabin';
import { supabaseQueryKeys } from '../../services/supabase';

export function useCabins() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: [supabaseQueryKeys.cabins],
    queryFn: getCabins,
  });

  return { cabins, isLoading, error };
}
