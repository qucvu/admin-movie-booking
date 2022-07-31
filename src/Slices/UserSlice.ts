import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "Interfaces/User";
import userAPI from "Services/userAPI";

interface State {
  userList: User[] | null;
  isUserListLoading: boolean;
  userListError: string | null;
  user: User | null;
  isUserLoading: boolean;
  userError: string | null;
  searchText: string | undefined;
}

const initialState: State = {
  userList: [],
  isUserListLoading: false,
  userListError: null,
  user: null,
  isUserLoading: false,
  userError: null,
  searchText: undefined,
};
export const getUserList = createAsyncThunk(
  `user/getUserList`,
  async (payload?: string) => {
    try {
      const data = await userAPI.getUserList(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getUserInfo = createAsyncThunk(
  `user/getUserInfo`,
  async (payload: string) => {
    try {
      const data = await userAPI.getUserInfo(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk(
  `user/deleteUser`,
  async (payload: string) => {
    try {
      const data = await userAPI.deleteUser(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleSearch: (state, { payload }) => {
      // if (!payload || payload === "") {
      //   return (state.searchText = null);
      // } else
      state.searchText = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserList.pending, (state) => {
      state.isUserListLoading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, { payload }) => {
      state.isUserListLoading = false;
      state.userList = payload;
    });
    builder.addCase(getUserList.rejected, (state, { error }) => {
      state.isUserListLoading = false;
      state.userListError = error as any;
    });
    //---------------------------------------------
    builder.addCase(getUserInfo.pending, (state) => {
      state.isUserLoading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.isUserLoading = false;
      state.user = payload;
    });
    builder.addCase(getUserInfo.rejected, (state, { error }) => {
      state.isUserLoading = false;
      state.userError = error as any;
    });
    //-----------------------------------------------
  },
});
export const { handleSearch } = userSlice.actions;
export default userSlice.reducer;
