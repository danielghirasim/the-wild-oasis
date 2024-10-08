import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useCheckin';
import { useSettings } from '../settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settings = {}, isLoading: isLoadingSettings } = useSettings();
  const { booking = {}, isLoading } = useBooking();
  const { isCheckingIn, checkIn } = useCheckin();
  const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights, isPaid, status } = booking;
  const moveBack = useMoveBack();
  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;

  useEffect(() => {
    setConfirmPaid(isPaid || false);
  }, [isPaid]);

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: optionalBreakfastPrice + totalPrice,
        },
      });
    }

    if (!addBreakfast) {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  if (isLoading || isCheckingIn || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          id="breakfast"
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((add) => !add);
            setConfirmPaid(false);
          }}
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)} ?
        </Checkbox>
      </Box>
      {!hasBreakfast && (
        <Box>
          <Checkbox id="confirm" checked={confirmPaid} disabled={confirmPaid || isCheckingIn} onChange={() => setConfirmPaid((confirm) => !confirm)}>
            I confirm that {guests.fullName} has paid the total amount of{' '}
            {addBreakfast
              ? `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`
              : formatCurrency(totalPrice)}
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        <Button variation="primary" onClick={handleCheckin} disabled={isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
