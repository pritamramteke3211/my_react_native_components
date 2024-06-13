import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user_loggined_id: '',
};

export const authenticationSlice = createSlice({
  name: 'authenticate',

  initialState,

  reducers: {
    setUserLogginedId: (state, action) => {
      state.user_loggined_id = action.payload;
    },
  },
});

export const {setUserLogginedId} = authenticationSlice.actions;

export default authenticationSlice.reducer;
