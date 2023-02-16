import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './features/projectsSlice';
import tasksReducer from './features/tasksSlice';
import goalsReducer from './features/goalsSlice';

const localStorageMiddleware = ({ getState }) => next => action => {
    const result = next(action);
  
    const projectActions = [
      'projects/addProject',
      'projects/deleteProject',
      'projects/loadProjects',
    ];
  
    if (projectActions.includes(action.type)) {
      window.localStorage.setItem('projects', JSON.stringify(getState().projects.data));
    }

    const taskActions = [
        'tasks/addTask',
        'tasks/deleteTask',
        'tasks/completeTask',
        'tasks/editTask',
        'tasks/loadProjects',
    ];
    
    if (taskActions.includes(action.type)) {
        window.localStorage.setItem('tasks', JSON.stringify(getState().tasks.data));
    }

    const goalsActions = [
        'goals/addGoal',
        'goals/deleteGoal',
        'goals/loadGoals',
    ];
    
    if (goalsActions.includes(action.type)) {
        window.localStorage.setItem('goals', JSON.stringify(getState().goals.data));
    }
  
    return result;
};
  
const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    goals: goalsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>

export default store;
