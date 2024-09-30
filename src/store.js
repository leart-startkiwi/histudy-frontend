import { configureStore } from "@reduxjs/toolkit";
import activeStatusesSlice from "./redux/activeStatusesSlice";
import searchSlice from "./redux/searchSlice";
import coursesFilterSlice from "./redux/coursesFilterSlice";
import courseViewSlice from "./redux/courseViewSlice";
import newCourseSlice from "./redux/newCourseSlice";
import manageCourseSlice from "./redux/manageCourseSlice";
import questionsSlice from "./redux/questionsSlice";
import messagesSlice from "./redux/messagesSlice";

const store = configureStore({
  reducer: {
    activeStatuses: activeStatusesSlice,
    search: searchSlice,
    filterOpen: coursesFilterSlice,
    courseView: courseViewSlice,
    newCourse: newCourseSlice,
    manageCourse: manageCourseSlice,
    questions: questionsSlice,
    messages: messagesSlice,
  },
});

export default store;
