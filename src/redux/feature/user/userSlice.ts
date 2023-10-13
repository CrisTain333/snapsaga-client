/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getUserProfile } from "@/lib/api";
import { IInitialState } from "@/types";
import { authKey } from "@/constants/storageKey";
import { getFromLocalStorage } from "@/lib/localStorage/localStorage";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async () => {
    const response = await getUserProfile();
    return response;
  }
);

const initialState: IInitialState = {
  user: null,
  token: getFromLocalStorage(authKey) as string,
  isLoading: false,
  error: false,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem(authKey, action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = "";
      localStorage.removeItem(authKey);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.user = null;
        state.errorMessage = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action?.payload?.data;
        state.isLoading = false;
        state.error = false;
        state.errorMessage = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.error.message!;
        state.token = "";
        localStorage.removeItem(authKey);
      });
  },
});

export const { setUser, setToken, logout } =
  authSlice.actions;

export default authSlice.reducer;
