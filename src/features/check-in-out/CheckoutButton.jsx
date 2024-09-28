import Button from '../../ui/Button';
import ConfirmWindow from '../../ui/ConfirmWindow.jsx';
import Modal from '../../ui/Modal.jsx';
import { useCheckout } from './useCheckout.js';

function CheckoutButton({ bookingId, guests }) {
  const { checkOut, isCheckingOut } = useCheckout();

  return (
    <Modal>
      <Modal.Open opens="check-out">
        <Button size="sm" variation="secondary">
          Check Out
        </Button>
      </Modal.Open>

      <Modal.Window name="check-out">
        <ConfirmWindow resourceName="Checkout" actionName={`check out ${guests.fullName}`} onConfirm={() => checkOut(bookingId)} disabled={isCheckingOut} />
      </Modal.Window>
    </Modal>
  );
}

export default CheckoutButton;
