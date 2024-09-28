import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabin';
import toast from 'react-hot-toast';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { supabaseQueryKeys } from '../../services/supabase';

function CreateCabinForm() {
  const { register, handleSubmit, reset: resetForm, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { isLoading: isSubmitting, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New Cabin Successfully created');
      queryClient.invalidateQueries({
        queryKey: [supabaseQueryKeys.cabins],
      });
      resetForm();
    },
    onError: (error) => {
      console.error(error);
      toast.error('There was an error creating the cabin');
    },
  });

  function onSubmit(newCabin) {
    mutate({ ...newCabin, image: newCabin.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow labelName="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isSubmitting}
          {...register('name', {
            required: 'This filed is required',
          })}
        />
      </FormRow>

      <FormRow labelName="Max Capacity" error={errors?.['max_capacity']?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isSubmitting}
          {...register('max_capacity', {
            required: 'This filed is required',
            min: {
              value: 1,
              message: 'Capacity should be atleast 1',
            },
          })}
        />
      </FormRow>

      <FormRow labelName="Regular Price" error={errors?.['regular_price']?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isSubmitting}
          {...register('regular_price', {
            required: 'This filed is required',
            min: {
              value: 1,
              message: 'Price should be atleast 1',
            },
          })}
        />
      </FormRow>

      <FormRow labelName="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isSubmitting}
          {...register('discount', {
            required: 'This filed is required',
            validate: (value) => value <= +getValues()['regular_price'] || 'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow labelName="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isSubmitting}
          {...register('description', {
            required: 'This filed is required',
          })}
        />
      </FormRow>

      <FormRow labelName="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isSubmitting}
          {...register('image', {
            required: 'Image is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSubmitting}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
