import { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import { TaskList } from './TaskList';
import { AddTaskForm } from './AddTaskForm';
import { TextKey } from '@/constants';
import { useLocalStorage } from '@/hooks';
import { Task, Project } from '@/types';

export const TaskSection = ({ projects }: { projects: Project[] }) => {
    const [localTasks, setLocalTasks] = useLocalStorage<Task[]>('tasks', []);
    const [tasks, setTasks] = useState<Task[]>([]);

    // load tasks
    useEffect(() => {
        if (localTasks.length > 0) {
            setTasks(localTasks);
        }
      }, [localTasks]);
    
      useEffect(() => {
        setLocalTasks(tasks);
      }, [tasks, setLocalTasks])

    // CRUD handlers
    const handleComplete = (taskId: Task['id']) => {
      const updatedTasks = tasks.map((task) => {
        const completed = !task.completed;
        return task.id === taskId ? { ...task, completed } : task;
      });
      setTasks(updatedTasks);
    };
  
    const handleDelete = (taskId: Task['id']) => {
      setTasks(tasks.filter(({ id }) => taskId !== id));
    };
  
    const handleAdd = ({ label, projectId }: Pick<Task, 'label' | 'projectId'>) => {
      const newTask = {
        id: crypto.randomUUID(),
        completed: false,
        label,
        projectId,
      };
      setTasks([...tasks, newTask]);
    };

    const handleEdit = (taskId: Task['id']) => (label: Task['label']) => {
        const updatedTasks = tasks.map((task) => {
            return task.id === taskId ? { ...task, label } : task;
          });
        setTasks(updatedTasks);
    };

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
