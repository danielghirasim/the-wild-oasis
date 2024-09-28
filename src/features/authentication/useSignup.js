import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup as signupAPI } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    mutate: signup,
    error,
  } = useMutation({
    mutationFn: ({ fullName, email, password }) => signupAPI({ fullName, email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('Account created successfully!');
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return { signup, isLoading, error };
}
