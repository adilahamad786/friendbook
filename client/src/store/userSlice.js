import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {},
    reducers : {
        replace(state, action) {
            state = action.payload;
            return state;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice;