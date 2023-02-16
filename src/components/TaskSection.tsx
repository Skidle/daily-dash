import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';
import { TaskList } from './TaskList';
import { AddTaskForm } from './AddTaskForm';
import { addTask, completeTask, deleteTask, editTask, loadTasks } from '../features/tasksSlice';
import { TextKey } from '@/constants';
import { Task, Project } from '@/types';
import { RootState } from '@/store';

export const TaskSection = ({ projects }: { projects: Project[] }) => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.data);

    // load tasks
    useEffect(() => {
      const localTasks = JSON.parse(window.localStorage.getItem('tasks') || '[]');
      dispatch(loadTasks(localTasks));
    }, [dispatch]);

    // CRUD handlers
    const handleComplete = (taskId: Task['id']) => {
      dispatch(completeTask(taskId));
    };

    const handleDelete = (taskId: Task['id']) => {
      dispatch(deleteTask(taskId));
    };

    const handleAdd = ({ name, projectId }: Pick<Task, 'name' | 'projectId'>) => {
      dispatch(addTask({ name, projectId, completed: false, id: crypto.randomUUID() }));
    };

    const handleEdit = (taskId: Task['id']) => (name: Task['name']) => {
      dispatch(editTask({ id: taskId, name }));
    };

    console.log({ tasks })

    return (
        <section>
            <Text fontSize='3xl' mb="2">{TextKey.Tasks}</Text>
            <AddTaskForm handleAdd={handleAdd} projects={projects} />
            <TaskList
                tasks={tasks}
                projects={projects}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </section>
    )
}
