import {configureStore} from '@reduxjs/toolkit';
import regionReducer from './regionSlice';

const store = configureStore({
    reducer: {
        region: regionReducer
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
