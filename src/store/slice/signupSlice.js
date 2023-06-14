const { default: axiosClient } = require('../../utils/httpClient');
const { PATH } = require('../../utils/httpContants');

const createSlice = require('@reduxjs/toolkit').createSlice;
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;
const axios = require('axios').default;

const initialState = {
    loading: false,
    users: [],
    error: ''
}

//  const userRegistration = (data) => (dispatch) => {
//     return new Promise((resolve, reject) => {
//       axiosClient({
//         method: "POST",
//         url: PATH.auth.signup,
//         data,
//       })
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   };

const userRegistration = createAsyncThunk('users/fetchUsers', async(data) => {
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

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(fetchusers.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchusers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = '';
        })
        builder.addCase(fetchusers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        })
    }
});

module.exports = usersSlice.reducer;
module.exports.fetchusers = fetchusers;