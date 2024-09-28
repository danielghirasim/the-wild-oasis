import { useState } from 'react';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const [updatingField, setUpdatingField] = useState(null);
  const { settings: { breakfastPrice, maxGuestsPerBooking, maxBookingLength, minBookingLength } = {}, isLoading } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e) {
    const { value, defaultValue, name: fieldName } = e.target;

    if (!value || !fieldName || defaultValue === value) return;

    setUpdatingField(fieldName);

    updateSetting(
      { [fieldName]: value },
      {
        onSuccess: () => {
          setUpdatingField(null);
        },
        onError: () => {
          setUpdatingField(null);
        },
      }
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow labelName="Minimum nights/booking">
        <Input
          type="number"
          name="minBookingLength"
          defaultValue={minBookingLength}
          disabled={isUpdating && updatingField === 'minBookingLength'}
          onBlur={(e) => handleUpdate(e)}
        />
      </FormRow>
      <FormRow labelName="Maximum nights/booking">
        <Input
          type="number"
          name="maxBookingLength"
          defaultValue={maxBookingLength}
          disabled={isUpdating && updatingField === 'maxBookingLength'}
          onBlur={(e) => handleUpdate(e)}
        />
      </FormRow>
      <FormRow labelName="Maximum guests/booking">
        <Input
          type="number"
          name="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating && updatingField === 'maxGuestsPerBooking'}
          onBlur={(e) => handleUpdate(e)}
        />
      </FormRow>
      <FormRow labelName="Breakfast price">
        <Input type="number" name="breakfastPrice" defaultValue={breakfastPrice} disabled={isUpdating && updatingField === 'breakfastPrice'} onBlur={(e) => handleUpdate(e)} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
