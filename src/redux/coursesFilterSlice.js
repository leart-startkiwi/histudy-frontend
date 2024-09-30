import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterOpen: false,
};

const coursesFilterSlice = createSlice({
  name: "filterOpen",
  initialState,
  reducers: {
    setFilter(state) {
      state.filterOpen = true;
    },
    removeFilter(state) {
      state.filterOpen = false;
    },
  },
});

export const { setFilter, removeFilter } = coursesFilterSlice.actions;

export default coursesFilterSlice.reducer;
