import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { LoginValues } from "Interfaces/Login";
import { RegisterValues } from "Interfaces/Register";

import { User, UserRegister } from "Interfaces/User";
import UserAPI from "Services/userAPI";

interface State {
  user: User | null;
  registerValues: UserRegister | null;
  isLoading: boolean;
  errorLogin: string | null;
  errorRegister: string | null;
}
const initialState: State = {
  user: JSON.parse(localStorage.getItem("user") as string) || null,
  isLoading: false,
  errorLogin: null,
  errorRegister: null,
  registerValues: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginValues: LoginValues, { rejectWithValue }) => {
    try {
      const data = await UserAPI.getUser(loginValues);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (RegisterValues: RegisterValues, { rejectWithValue }) => {
    try {
      const data = await UserAPI.postRegisterUser(RegisterValues);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.setItem("user", JSON.stringify(null));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.errorLogin = null;
      state.user = payload;
      state.isLoading = false;
    });
    builder.addCase(loginUser.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      if (typeof payload === "string") {
        state.errorLogin = payload;
      }
    });

    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.registerValues = payload;
      state.isLoading = false;
      state.errorRegister = null;
    });
    builder.addCase(registerUser.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      if (typeof payload === "string") {
        state.errorRegister = payload;
      }
    });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
