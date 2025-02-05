// Authentication Slice (authSlice.js)
import { createSlice } from '@reduxjs/toolkit';

const RESET_STATE = 'RESET_STATE';

const initialState = null;


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserSessionStore: (_, { payload }) => payload
  }
});

export const { setUserSessionStore } = authSlice.actions;
export default authSlice.reducer;


export const onUserLogout = () => {
  return (dispatch) => {
    dispatch(setUserSessionStore(null));
    //removing our token from localStorage 
    localStorage.removeItem('token');

  };
};








