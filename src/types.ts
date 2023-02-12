export interface Task {
    id: string;
    completed: boolean;
    label: string;
    projectId: string;
}

export interface Project {
    id: string;
    name: string;
    color: string;
}
