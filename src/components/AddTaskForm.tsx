import { FieldValues, useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Button, FormErrorMessage, Card, CardBody, Flex, Select } from '@chakra-ui/react';
import { TextKey } from '@/constants';
import { Task, Project } from '@/types';

interface AddTaskFormProps {
  handleAdd: ({ label, projectId }: Pick<Task, 'label' | 'projectId'>) => void;
  projects: Project[];
}

export const AddTaskForm = ({ handleAdd, projects }: AddTaskFormProps) => {
  const { register, handleSubmit, reset, formState, clearErrors } = useForm({
    shouldUnregister: true,
    defaultValues: { label: '', projectId: '' },
  });

  const onSubmit = ({ label, projectId }: FieldValues) => {
    handleAdd({ label, projectId });
    reset();
    clearErrors();
  };

  const errors = Object.values(formState.errors);

  return (
    <Card mb="5" minW="400" size="sm">
        <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mr="3" isInvalid={errors.length > 0} isRequired>
                    <FormLabel>{TextKey.Label}</FormLabel>
                    <Input
                        id="label"
                        {...register('label', { required: true })}
                    />
                    <FormErrorMessage>{errors.length && errors[0].message}</FormErrorMessage>
                </FormControl>
                <FormControl mt="2" mr="3" isInvalid={errors.length > 0} isRequired>
                    <FormLabel>{TextKey.Project}</FormLabel>
                    <Select {...register('projectId', { required: true })}>
                      {projects.map(({ name, id }) => (
                          <option key={id} value={id}>{name}</option>
                      ))}
                    </Select>
                    <FormErrorMessage>{errors.length && errors[0].message}</FormErrorMessage>
                </FormControl>
                <Flex justify='end'>
                    <Button mt="3" type="submit" colorScheme='blue' >{TextKey.Add}</Button>
                </Flex>
            </form>
        </CardBody>
    </Card>
  );
}