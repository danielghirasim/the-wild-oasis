import { useRecentBookings } from './useRecentBookings.js';
import { useRecentStays } from './useRecentStays.js';
import { useCabins } from '../cabins/useCabins.js';
import styled from 'styled-components';
import Spinner from '../../ui/Spinner.jsx';
import Stats from './Stats.jsx';
import SalesChart from './SalesChart.jsx';
import DurationChart from './DurationChart.jsx';
import TodaysActivity from '../check-in-out/TodaysActivity.jsx';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, numDays, isLoading } = useRecentBookings();
  const { stays, confirmedStays, isLoading: isStaysLoading } = useRecentStays();
  const { cabins, isLoading: isCabinsLoading } = useCabins();

  if (isLoading || isStaysLoading || isCabinsLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
      <TodaysActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
