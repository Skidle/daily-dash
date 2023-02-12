import { Card, Accordion } from '@chakra-ui/react';
import { ProjectItem } from './ProjectItem';
import { Task, Project } from '@/types';

interface TaskListProps {
    tasks: Task[],
    handleComplete: (taskId: string) => void;
    handleDelete: (taskId: string) => void;
    handleEdit: (id: string) => (label: string) => void;
    projects: Project[];
}

export const TaskList = ({ tasks, handleComplete, handleDelete, handleEdit, projects }: TaskListProps) => {
    return (
      <Card>
        <Accordion allowMultiple>
            {projects.map(({ id, name, color }) => (
                <ProjectItem
                    key={id}
                    projectName={name}
                    color={color}
                    tasks={tasks.filter(({ projectId }) => projectId === id)}
                    handleComplete={handleComplete}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ))}
        </Accordion>
      </Card>
    );
}