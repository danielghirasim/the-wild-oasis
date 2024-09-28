import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';
import ButtonIcon from '../../ui/ButtonIcon';
import Modal from '../../ui/Modal';
import ConfirmWindow from '../../ui/ConfirmWindow';

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <Modal>
      <Modal.Open opens="log-out">
        <ButtonIcon>{!isLoading ? <HiArrowRightOnRectangle>Logout</HiArrowRightOnRectangle> : <SpinnerMini />}</ButtonIcon>
      </Modal.Open>

      <Modal.Window name="log-out">
        <ConfirmWindow resourceName="Log Out" actionName="log out" onConfirm={() => logout()} disabled={isLoading} />
      </Modal.Window>
    </Modal>
  );
}

export default Logout;
