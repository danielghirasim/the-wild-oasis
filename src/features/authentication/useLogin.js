import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading,
    mutate: login,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('Log in was successfull');
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return { login, isLoading, error };
}
