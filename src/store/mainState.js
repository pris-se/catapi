import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "state",
  initialState: {
    q: "",
  },
  reducers: {
    search: (state, action) => {
      state.q = action.payload;
    },
  },
  extraReducers: {},
});

export const { search } = counterSlice.actions;

export default counterSlice.reducer;
