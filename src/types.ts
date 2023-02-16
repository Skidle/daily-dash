import { GoalPeriod } from './constants';

export interface Task {
    id: string;
    completed: boolean;
    name: string;
    projectId: Project['id'];
    goalId?: Goal['id'];
}

export interface Project {
    id: string;
    name: string;
    color: string;
}

export interface Goal {
    id: string;
    name: string;
    period: GoalPeriod;
    projectId: Project['id'];
    // if 1, show as checkbox, otherwise show as percentage
    measure: number;
}
