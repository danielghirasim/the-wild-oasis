import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';

const StyledConfirmWindow = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmWindow({ resourceName, actionName = resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmWindow>
      <Heading as="h3">{resourceName}</Heading>

      <p>Are you sure you want to {actionName} ?</p>

      <div>
        <Button variation="secondary" disabled={disabled} onClick={() => onCloseModal?.()}>
          No
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Yes
        </Button>
      </div>
    </StyledConfirmWindow>
  );
}

export default ConfirmWindow;
