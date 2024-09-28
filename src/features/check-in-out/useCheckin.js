import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking as updateBookingAPI } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => updateBookingAPI(bookingId, { status: 'checked-in', isPaid: true, ...breakfast }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} was checked in successfully!`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: (error) => {
      console.error(error);
      toast.error('There was an error checking in');
    },
  });

  return { isCheckingIn, checkIn };
}
