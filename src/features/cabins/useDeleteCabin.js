import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinAPI } from '../../services/apiCabin';
import toast from 'react-hot-toast';
import { supabaseQueryKeys } from '../../services/supabase';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [supabaseQueryKeys.cabins] });
      toast.success('Cabin successfully deleted');
    },
    onError: (error) => {
      console.error(error);
      toast.error('There was an error deleting the cabin');
    },
  });

  return { isDeleting, deleteCabin };
}
