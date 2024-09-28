import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateUser, isLoading } = useUpdateUser();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const isFormDisbaled = isLoading;

  function handleReset() {
    setFullName(currentFullName);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormRow labelName="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow labelName="Full name">
        <Input type="text" id="fullName" value={fullName} disabled={isLoading} onChange={(e) => setFullName(e.target.value)} />
      </FormRow>
      <FormRow labelName="Avatar image">
        <FileInput id="avatar" accept="image/*" disabled={isLoading} onChange={(e) => setAvatar(e.target.files[0])} />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" onClick={handleReset}>
          Reset
        </Button>
        <Button variation="primary" disabled={isLoading || isFormDisbaled}>
          {isLoading ? <SpinnerMini /> : 'Update Account'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
