import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  totalPages: 4,
  name: "",
  description: "",
  photo: null,
  category: null,
};

const newCourseSlice = createSlice({
  name: "newCourse",
  initialState,
  reducers: {
    setNewCoursePage(state, action) {
      if (action.payload < 1 || action.payload > state.totalPages) return;
      state.currentPage = action.payload;
    },
    setNewCourseName(state, action) {
      state.name = action.payload;
    },
    setNewCourseDescription(state, action) {
      state.description = action.payload;
    },
    setNewCourseCategory(state, action) {
      state.category = action.payload;
    },
    resetNewCourseData() {
      return initialState;
    },
    setNewCourseImage(state, action) {
      state.photo = action.payload;
    },
  },
});

export const {
  setNewCoursePage,
  setNewCourseName,
  setNewCourseDescription,
  setNewCourseCategory,
  resetNewCourseData,
  setNewCourseImage,
} = newCourseSlice.actions;

export default newCourseSlice.reducer;
