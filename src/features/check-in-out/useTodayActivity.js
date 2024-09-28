import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings.js';

export function useTodaysActivity() {
  const { data: todaysActivity, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['todays-activity'],
  });

  return { todaysActivity, isLoading };
}
