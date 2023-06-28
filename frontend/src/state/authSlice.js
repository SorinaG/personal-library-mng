import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      username: null,
      email: null,
      id: null,
      role: localStorage.getItem('sorinaLibraryRole') ?? null
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
    // setEmail: (state, action) => {
    //   return {
    //     ...state,
    //     email: action.payload,
    //   };
    // },
    // setPassword: (state, action) => {
    //   return {
    //     ...state,
    //     password: action.payload,
    //   };
    // },
    // setUsername: (state, action) => {
    //   return {
    //     ...state,
    //     username: action.payload,
    //   };
    // },
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
// setToken, setEmail, setPassword,

export const { setUsername, setUser, setToken, setRole } = authSlice.actions;

export default authSlice.reducer;
