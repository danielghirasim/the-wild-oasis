import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { supabaseQueryKeys } from '../../services/supabase';
import { useParams } from 'react-router-dom';

export function useBooking() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: [supabaseQueryKeys.booking, bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { booking, isLoading, error };
}
