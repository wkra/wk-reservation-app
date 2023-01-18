import { configureStore } from '@reduxjs/toolkit';
import desks from './desks';
import reservations from './reservations';
import user from './user';
import date from './date';


const store = configureStore({
  reducer: {
    desks,
    reservations,
    user,
    date
  }
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
