import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabin';
import toast from 'react-hot-toast';
import { supabaseQueryKeys } from '../../services/supabase';

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin Successfully edited');
      queryClient.invalidateQueries({
        queryKey: [supabaseQueryKeys.cabins],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error('There was an editing the cabin');
    },
  });

  return { isEditing, editCabin };
}
