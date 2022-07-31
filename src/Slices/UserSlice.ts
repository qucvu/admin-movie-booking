import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserRegister } from "Interfaces/User";
import userAPI from "Services/userAPI";

interface State {
  userRegister: UserRegister | null;
  isLoading: boolean;
  errorRegister: string | null;
}

const initialState: State = {
  userRegister: null,
  isLoading: false,
  errorRegister: null,
};

export const addUser = createAsyncThunk(
  "user/add",
  async (values: UserRegister, { rejectWithValue }) => {
    try {
      const data = await userAPI.addUser(values);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addUser.fulfilled, (state, { payload }) => {
      state.userRegister = payload;
      state.isLoading = false;
    });
    builder.addCase(addUser.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      if (typeof payload === "string") {
        state.errorRegister = payload;
      }
    });
  },
});

export default userSlice.reducer;
