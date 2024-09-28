import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';
import Spinner from '../../ui/Spinner';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading: isSingingUp } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    if (!fullName || !email || !password) return;

    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  if (isSingingUp) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow labelName="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" disabled={isSingingUp} {...register('fullName', { required: 'This field is required.' })} />
      </FormRow>

      <FormRow labelName="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSingingUp}
          {...register('email', { required: 'This field is required.', pattern: /\S+@\S+\.\S+/, message: 'Please enter a valid email address' })}
        />
      </FormRow>

      <FormRow labelName="Password (min 8 characters)" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isSingingUp}
          {...register('password', {
            required: 'This field is required.',
            minLength: {
              value: 8,
              message: 'Password must be atleast 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow labelName="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSingingUp}
          {...register('passwordConfirm', { required: 'This field is required.', validate: (value) => value === getValues().password || 'Passwords do not match' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Reset
        </Button>
        <Button variation="primary" disabled={isSingingUp}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
