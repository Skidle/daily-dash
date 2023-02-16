import { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { TaskList } from './TaskList';
import { AddGoalForm } from './AddGoalForm';
import { TextKey } from '@/constants';
import { loadGoals, addGoal, deleteGoal } from '../features/goalsSlice';
import { Task, Project, Goal } from '@/types';
import { RootState } from '@/store';

export const GoalSection = ({ projects }: { projects: Project[] }) => {
    const goals = useSelector((state: RootState) => state.goals);
    const dispatch = useDispatch();

    useEffect(() => {
      const localGoals = JSON.parse(window.localStorage.getItem('goals') || '[]');
      dispatch(loadGoals(localGoals));
    }, [dispatch]);

    const handleDelete = (goalId: Goal['id']) => {
      dispatch(deleteGoal(goalId));
    };

    const handleAdd = ({ name, projectId, measure, period }: Pick<Goal, 'name' | 'projectId' | 'measure' | 'period' >)  => {
      const newGoal = {
        id: crypto.randomUUID(),
        name,
        projectId,
        measure,
        period,
      };

      console.log({ newGoal });

      dispatch(addGoal(newGoal));
    };

    return (
        <section>
            <Text fontSize='3xl' mt="8" mb="2">{TextKey.Goals}</Text>
            <AddGoalForm handleAdd={handleAdd} projects={projects} />
            {/* <TaskList
                tasks={tasks}
                projects={projects}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            /> */}
        </section>
    )
}
