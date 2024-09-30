import { createSlice } from "@reduxjs/toolkit";

export const ALL_LECTURES = "All lectures";
export const CURRENT_LECTURE = "Current lecture";

export const UPVOTED_SORT = "Sort by most upvoted";
export const RECENT_SORT = "Sort by most recent";

export const MY_QUESTIONS = "Questions I asked";
export const NO_RESPONSE_QUESTIONS = "Questions without responses";

const initialState = {
  filterType: ALL_LECTURES,
  sortFilter: UPVOTED_SORT,
  filterQuestions: "Filter Questions",
  contents: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestionFilterType(state, action) {
      state.filterType = action.payload;
    },
    setQuestionSortFilter(state, action) {
      state.sortFilter = action.payload;
    },
    setFilterQuestions(state, action) {
      state.filterQuestions = action.payload;
    },
    setQuestionContents(state, action) {
      state.contents = action.payload;
    },
  },
});

export const {
  setQuestionFilterType,
  setQuestionSortFilter,
  setFilterQuestions,
  setQuestionContents,
} = questionsSlice.actions;

export default questionsSlice.reducer;
