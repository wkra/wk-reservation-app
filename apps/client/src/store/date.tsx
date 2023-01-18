import {createSlice} from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { DateType} from '../interfaces';


interface DateState {
  selected: DateType
}

const initialState: DateState = {
  selected: dayjs().format('YYYY-MM-DD')
}

const slice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate(state, action) {
      state.selected = action.payload;
    },
  }
});

export const dateActions = slice.actions;

export default slice.reducer;
