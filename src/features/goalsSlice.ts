import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Goal } from '../types';

interface GoalsState {
    data: Goal[];
  }
  
  const initialState: GoalsState = {
      data: [],
  };

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    loadGoals: (state, action) => {
        state.data = action.payload;
    },
    addGoal: (state, action: PayloadAction<Goal>) => {
      state.data.push(action.payload);
    },
    deleteGoal: (state, action) => {
        state.data = state.data.filter(project => project.id !== action.payload);
    },
  },
});

export const { loadGoals, addGoal, deleteGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
