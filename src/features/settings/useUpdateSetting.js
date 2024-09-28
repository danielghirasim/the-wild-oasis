import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingAPI } from '../../services/apiSettings';
import toast from 'react-hot-toast';
import { supabaseQueryKeys } from '../../services/supabase';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: (newSetting) => updateSettingAPI(newSetting),
    onSuccess: () => {
      toast.success('Setting Successfully edited');
      queryClient.invalidateQueries({
        queryKey: [supabaseQueryKeys.settings],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error('There was an editing the setting');
    },
  });

  return { isUpdating, updateSetting };
}
