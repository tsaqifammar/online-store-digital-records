/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getBackendUrl from '../utils/getBackendUrl';

const initialState = {
  loading: false,
  user: null,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startFetchUser: (state) => {
      state.loading = true;
    },
    successFetchUser: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    },
    failureFetchUser: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { startFetchUser, successFetchUser, failureFetchUser } = userSlice.actions;

export const login = (user) => (dispatch) => {
  dispatch(startFetchUser());
  axios
    .post(`${getBackendUrl()}/users/login`, user)
    .then((response) => {
      const userData = response.data.data;
      dispatch(successFetchUser(userData));
    })
    .catch((error) => {
      console.log(error.message);
      dispatch(failureFetchUser(error.message));
    });
};

export default userSlice.reducer;