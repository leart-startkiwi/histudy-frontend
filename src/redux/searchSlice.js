import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  category: null,
  skip: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    clearSearch(state) {
      state.search = "";
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSkip(state, action) {
      state.skip = state.skip + 6;
    },
    resetSkip(state, action) {
      state.skip = 0;
    },
  },
});

export const { setSearch, clearSearch, setCategory, setSkip, resetSkip } =
  searchSlice.actions;

export default searchSlice.reducer;
