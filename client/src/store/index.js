import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import rightbarUpdateSlice from './rightbarUpdateSlice';

const store = configureStore({
    reducer : { user : userSlice.reducer, rightbarUpdate : rightbarUpdateSlice.reducer },
    devTools: false
});

export default store;