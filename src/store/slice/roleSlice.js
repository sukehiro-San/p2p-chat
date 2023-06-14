import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdmin: null
}

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        handleAdmin: (state) => {
            state.isAdmin = true;
        },
        handleEmployee: (state) => {
            state.isAdmin = false;
        }
    }
}) 

export default roleSlice.reducer;
export const {handleAdmin, handleEmployee} = roleSlice.actions;