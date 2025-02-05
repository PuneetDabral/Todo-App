import { taskApiUrl } from '../../api';
import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTask: (_, { payload }) => payload,
    deleteTask: (state, { payload }) => {
      return state.filter((task) => task._id !== payload._id);
    },
    updateTask: (state, { payload }) => {
      const index = state.findIndex((task) => task._id === payload._id);
      if (index !== -1) {
        state[index] = { ...state[index], ...payload };
      }else{
        state.push(payload);
      }
    }
  }
});

export const { setTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;

export const fetchTasks = () => {
  return async (dispatch,getState) => {
    
    const token = getState().auth.token; 
    try {
      const response = await axios.get(taskApiUrl,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        dispatch(setTask(response.data));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
};
