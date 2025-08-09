import { createSlice } from "@reduxjs/toolkit";

const initCount = {
  count: 0,
  toggleShow: true
}

const countSlice = createSlice({
  name: 'count',
  initialState: initCount,
  reducers: {
    increment(state) {
      state.count = state.count + 1;
    },
    decrement(state) {
      state.count = state.count - 1;
    },
    increase(state, action) {
      state.count = state.count + action.payload;
    },
    toggleShow(state) {
      state.toggleShow = !state.toggleShow;
    }
  }
});

export const countActions = countSlice.actions;
export default countSlice.reducer;