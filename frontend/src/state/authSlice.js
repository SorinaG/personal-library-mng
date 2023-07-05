import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem('sorinaLibraryUser')) ?? {
      username: null,
      email: null,
      id: null,
      role: null
    },
    token: localStorage.getItem('sorinaLibraryToken') ?? null
  },
  reducers: {
    setToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    setUsername: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload,
        },
      };
    },
    setRole: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          role: action.payload,
        },
      };
    },
  },
});

export const { setUsername, setUser, setToken, setRole } = authSlice.actions;

export default authSlice.reducer;
