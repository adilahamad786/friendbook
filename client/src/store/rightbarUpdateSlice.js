import { createSlice } from "@reduxjs/toolkit";

const rightbarUpdateSlice = createSlice({
    name : "rightbarUpdate",
    initialState : { updateCounter : 0 },
    reducers : {
        update : (state) => {
            state.updateCounter = state.updateCounter + 1;
            return state;
        }
    }
});

export const rightbarUpdateActions = rightbarUpdateSlice.actions;

export default rightbarUpdateSlice;