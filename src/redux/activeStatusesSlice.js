import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStatuses: [],
};

const activeStatusesSlice = createSlice({
  name: "activeStatuses",
  initialState,
  reducers: {
    setActiveStatus(state, action) {
      state.activeStatuses = [...state.activeStatuses, action.payload];
    },
    removeActiveStatus(state, action) {
      state.activeStatuses = state.activeStatuses.filter(
        (s) => s !== action.payload,
      );
    },
    removeAllStatuses(state) {
      state.activeStatuses = [];
    },
  },
});

export const { setActiveStatus, removeActiveStatus, removeAllStatuses } =
  activeStatusesSlice.actions;

export default activeStatusesSlice.reducer;
