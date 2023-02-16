import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  completed: boolean;
  name: string;
  projectId: string;
}

interface TaskState {
  data: Task[];
}

const initialState: TaskState = {
    data: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.data.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((task) => task.id !== action.payload);
    },
    completeTask: (state, action: PayloadAction<string>) => {
      const task = state.data.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    editTask: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const task = state.data.find((task) => task.id === action.payload.id);
      if (task) {
        task.name = action.payload.name;
      }
    },
    loadTasks: (state, action) => {
        state.data = action.payload;
      },
  },
});

export const { addTask, deleteTask, completeTask, editTask, loadTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
