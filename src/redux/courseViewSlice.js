import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseView: "grid",
};

const courseViewSlice = createSlice({
  name: "courseView",
  initialState,
  reducers: {
    setView(state, action) {
      state.courseView = action.payload;
    },
  },
});

export const { setView } = courseViewSlice.actions;

export default courseViewSlice.reducer;
