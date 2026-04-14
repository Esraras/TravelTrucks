import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './Camper/slice';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
});

export default store;
