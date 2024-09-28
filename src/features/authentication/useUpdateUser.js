import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    mutate: updateUser,
    error,
  } = useMutation({
    mutationFn: ({ password, fullName, avatar }) => updateCurrentUser({ password, fullName, avatar }),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(['user'], user);
      toast.success('User update successfully!');
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return { updateUser, isLoading, error };
}
