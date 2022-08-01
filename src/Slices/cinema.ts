import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cinema, CinemaInfo } from "Interfaces/Cinema";
import { ShowTimeAdd } from "Interfaces/Movie";
import cinemaAPI from "Services/cinemaAPI";

interface State {
  isLoading: boolean;
  errorCinema: string | null;
  cinemaList: Cinema[];
  cinemaInfo: CinemaInfo[];
}

const initialState: State = {
  isLoading: false,
  errorCinema: null,
  cinemaList: [],
  cinemaInfo: [],
};

export const getCinemaList = createAsyncThunk(
  "cinema/getCinema",
  async (values, { rejectWithValue }) => {
    try {
      const data = await cinemaAPI.getCinemaList();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCinemaInfo = createAsyncThunk(
  "cinema/getCinemaInfor",
  async (cinemaId: string, { rejectWithValue }) => {
    try {
      const data = await cinemaAPI.getCinemaInfo(cinemaId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addShowTimeCinema = createAsyncThunk(
  "cinema/addShowTime",
  async (calendar: ShowTimeAdd, { rejectWithValue }) => {
    try {
      const data = await cinemaAPI.addShowTimeCinema(calendar);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCinemaList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCinemaList.fulfilled, (state, { payload }) => {
      state.cinemaList = payload;
      state.isLoading = false;
    });
    builder.addCase(getCinemaList.rejected, (state, { payload }) => {
      state.isLoading = false;
      if (typeof payload === "string") state.errorCinema = payload;
    });

    builder.addCase(getCinemaInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCinemaInfo.fulfilled, (state, { payload }) => {
      state.cinemaInfo = payload;
      state.isLoading = false;
    });
    builder.addCase(getCinemaInfo.rejected, (state, { payload }) => {
      state.isLoading = false;
      if (typeof payload === "string") state.errorCinema = payload;
    });

    // -----------------
    builder.addCase(addShowTimeCinema.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addShowTimeCinema.fulfilled, (state, { payload }) => {
      state.isLoading = false;
    });
    builder.addCase(addShowTimeCinema.rejected, (state, { payload }) => {
      state.isLoading = false;
      if (typeof payload === "string") state.errorCinema = payload;
    });
  },
});

export default cinemaSlice.reducer;
