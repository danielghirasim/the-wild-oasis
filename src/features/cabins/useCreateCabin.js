import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabin';
import { supabaseQueryKeys } from '../../services/supabase';
import toast from 'react-hot-toast';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New Cabin Successfully created');
      queryClient.invalidateQueries({
        queryKey: [supabaseQueryKeys.cabins],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error('There was an error creating the cabin');
    },
  });

  return { isCreating, createCabin };
}
