import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabaseQueryKeys } from '../../services/supabase';
import { deleteBooking as deleteBookingAPI } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingAPI(bookingId),
    onSuccess: () => {
      toast.success('Booking was deleted successfully');
      queryClient.invalidateQueries({
        queryKey: [supabaseQueryKeys.bookings],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error('There was an error deleting the booking');
    },
  });

  return { isDeleting, deleteBooking };
}
