import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../utils/httpClient';
import { PATH } from '../../utils/httpContants';




const initialState = {
    loading: false,
    users: [],
    error: ''
}

export const userRegistration = createAsyncThunk('users/addUsers', async(data) => {
    return new Promise((resolve, reject) => {
        axiosClient({
          method: "POST",
          url: PATH.auth.signup,
          data,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
})

export const userLogin = createAsyncThunk("user/userLogin", (data) => {
    return new Promise((resolve, reject) => {
        axiosClient({
            method: "POST",
            url: PATH.auth.login,
            data
        })
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })
})

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState
});

export default usersSlice.reducer;