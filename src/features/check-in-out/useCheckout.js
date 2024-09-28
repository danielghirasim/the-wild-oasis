import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking as updateBookingAPI } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingOut, mutate: checkOut } = useMutation({
    mutationFn: (bookingId) => updateBookingAPI(bookingId, { status: 'checked-out' }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} was checked out successfully!`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      console.error(error);
      toast.error('There was an error checking out');
    },
  });

  return { isCheckingOut, checkOut };
}
