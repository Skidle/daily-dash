import { FieldValues, useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Button, FormErrorMessage, Flex } from '@chakra-ui/react';
import { TextKey } from '@/constants';
import { Project } from '@/types';

interface AddProjectFormProps {
  handleAdd: ({ name, color }: Pick<Project, 'name' | 'color'>) => void;
}

export const AddProjectForm = ({ handleAdd }: AddProjectFormProps) => {
  const { register, handleSubmit, reset, formState, clearErrors } = useForm({
    shouldUnregister: true,
    defaultValues: { name: '', color: '' },
  });

  const onSubmit = ({ name, color }: FieldValues) => {
    handleAdd({ name, color });
    reset();
    clearErrors();
  };

  const errors = Object.values(formState.errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mr="3" isInvalid={errors.length > 0} isRequired>
            <FormLabel>{TextKey.Name}</FormLabel>
            <Input
                id="name"
                {...register('name', { required: true })}
            />
            <FormErrorMessage>{errors.length && errors[0].message}</FormErrorMessage>
        </FormControl>
        <FormControl mt="2" mr="3" isInvalid={errors.length > 0} isRequired>
            <FormLabel>{TextKey.Color}</FormLabel>
            <Input id="color" {...register('color', { required: true })} />
            <FormErrorMessage>{errors.length && errors[0].message}</FormErrorMessage>
        </FormControl>
        <Flex justify='end'>
            <Button mt="3" type="submit">{TextKey.Add}</Button>
        </Flex>
    </form>
  );
}