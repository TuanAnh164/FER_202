import { configureStore, createSlice } from '@reduxjs/toolkit';

// Tạo slice counter
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});

export const { increment, decrement } = counterSlice.actions;

// Tạo store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export default store;
