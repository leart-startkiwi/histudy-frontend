import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  allChats: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAllChats(state, action) {
      state.allChats = action.payload;
    },
  },
});

export const { setUser, setAllChats } = messagesSlice.actions;

export default messagesSlice.reducer;
