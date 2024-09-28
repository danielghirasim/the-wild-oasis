import { useForm } from 'react-hook-form';
import { useEditCabin } from './useEditCabin';
import { useCreateCabin } from './useCreateCabin';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

function CreateCabinForm({ cabinForEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinForEdit;
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isEditMode = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset: resetForm,
    getValues,
    formState,
  } = useForm({
    defaultValues: isEditMode ? editValues : {},
  });
  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  function onSubmit(newCabin) {
    const image = typeof newCabin.image === 'string' ? newCabin.image : newCabin.image[0];
    if (isEditMode) {
      editCabin(
        { newCabinData: { ...newCabin, image }, id: editId },
        {
          onSuccess: () => {
            resetForm(getValues());
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...newCabin, image: image },
        {
          onSuccess: () => {
            resetForm();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow labelName="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This filed is required',
          })}
        />
      </FormRow>

      <FormRow labelName="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This filed is required',
            min: {
              value: 1,
              message: 'Capacity should be atleast 1',
            },
          })}
        />
      </FormRow>

      <FormRow labelName="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
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
          disabled={isWorking}
          {...register('discount', {
            required: 'This filed is required',
            validate: (value) => value <= +getValues()['regularPrice'] || 'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow labelName="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', {
            required: 'This filed is required',
          })}
        />
      </FormRow>

      <FormRow labelName="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register('image', {
            required: isEditMode ? false : 'Image is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button variation="primary" disabled={isWorking}>
          {isEditMode ? 'Edit Cabin' : 'Add Cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
