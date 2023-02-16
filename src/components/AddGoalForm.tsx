import { FieldValues, useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Button, FormErrorMessage, Card, CardBody, Flex, Select } from '@chakra-ui/react';
import { GoalPeriod, TextKey } from '@/constants';
import { Goal, Project } from '@/types';

interface AddGoalFormProps {
  handleAdd: ({ name, projectId, measure, period }: Pick<Goal, 'name' | 'projectId' | 'measure' | 'period' >) => void;
  projects: Project[];
}

export const AddGoalForm = ({ handleAdd, projects }: AddGoalFormProps) => {
    const { register, handleSubmit, reset, formState, clearErrors } = useForm({
        shouldUnregister: true,
        defaultValues: { name: '', projectId: '', measure: 0, period: GoalPeriod.Week },
    });

    const onSubmit = ({ name, projectId, measure, period }: FieldValues) => {
        handleAdd({ name, projectId, measure: parseInt(measure, 10), period });
        reset();
        clearErrors();
    };

    const errors = Object.values(formState.errors);

    return (
        <Card mb="5" minW="400" size="sm">
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl mr="3" isInvalid={errors.length > 0} isRequired>
                        <FormLabel>{TextKey.Name}</FormLabel>
                        <Input {...register('name', { required: true })} />
                        {/* TODO error messages are random */}
                        <FormErrorMessage>{errors.length && errors[0].message}</FormErrorMessage>
                    </FormControl>

                    <FormControl mt="3" mr="3" isInvalid={errors.length > 0} isRequired>
                        <FormLabel>{TextKey.Project}</FormLabel>
                        <Select {...register('projectId', { required: true })}>
                        {projects.map(({ name, id }) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                        </Select>
                        <FormErrorMessage>{errors.length && errors[0].message}</FormErrorMessage>
                    </FormControl>

                    <FormControl mt="3" mr="3" isInvalid={errors.length > 0} isRequired>
                        <FormLabel>{TextKey.Period}</FormLabel>
                        <Select {...register('period', { required: true })}>
                        {(Object.keys(GoalPeriod) as Array<keyof typeof GoalPeriod>).map((goalPeriodKey) => (
                            <option key={GoalPeriod[goalPeriodKey]} value={GoalPeriod[goalPeriodKey]}>{goalPeriodKey}</option>
                        ))}
                        </Select>
                        <FormErrorMessage>{errors.length && errors[0].message}</FormErrorMessage>
                    </FormControl>

                    <FormControl mt="3" mr="3" isInvalid={errors.length > 0} isRequired>
                        <FormLabel>{TextKey.Measure}</FormLabel>
                        <Input type='number' {...register('measure', { required: true })} />
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
