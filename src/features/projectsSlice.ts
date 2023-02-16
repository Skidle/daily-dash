import { createSlice } from '@reduxjs/toolkit';
import type { Project } from '../types';

export interface ProjectsState {
    data: Project[];
}

const initialState: ProjectsState = {
    data: [],
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.data.push(action.payload);
    },
    deleteProject: (state, action) => {
      state.data = state.data.filter(project => project.id !== action.payload);
    },
    loadProjects: (state, action) => {
      state.data = action.payload;
    },
  },
});
  
export const { addProject, deleteProject, loadProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
