import { createSlice } from '@reduxjs/toolkit';
import { Reservation} from '../interfaces';

interface ReservationState {
  items: Reservation[]
}

const initialState: ReservationState = {
  items: []
}

const slice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    replaceItems(state, action) {
      state.items = action.payload || [];
    },
    addItem(state, action) {
      if (action.payload) {
        state.items.push(action.payload)
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    }
  }
});

export const reservationsActions = slice.actions;

export default slice.reducer;
