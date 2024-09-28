import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers.js';
import Stat from './Stat.jsx';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1. Total Bookings
  const numBookings = bookings.length;

  // 2. Sales
  const sales = formatCurrency(bookings.reduce((accumulator, booking) => accumulator + booking.totalPrice, 0));

  // 3. Checkins
  const checkins = confirmedStays.length;

  // 4. Occupancy Rate
  // Num checked in nights divided by all available nights
  const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);
  return (
    <>
      <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings} />
      <Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={sales} />
      <Stat title="Check Ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkins} />
      <Stat title="Occupancy Rate" color="yellow" icon={<HiOutlineChartBar />} value={`${Math.round(occupation * 100)}%`} />
    </>
  );
}

export default Stats;
