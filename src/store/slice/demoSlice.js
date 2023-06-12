import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    num: 10
}

const demoSlice = createSlice({
    name: 'demo',
    initialState: initialState,
    reducers: {
        ordered: (state) => {
            state.num--;
        },
        restoked: (state, actions) => {
            state.num += actions.payload
        }
    }
});

export default demoSlice.reducer;
export const {ordered, restoked} = demoSlice.actions;