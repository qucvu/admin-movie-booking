import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieAdd } from "Interfaces/Movie";
import movieAPI from "Services/movieAPI";

interface State {
  isLoading: boolean;
  errorRegister: string | null;
  movie: any;
}
const initialState: State = {
  isLoading: false,
  errorRegister: null,
  movie: null,
};

export const addMovie = createAsyncThunk(
  "movie/addmovie",
  async (movie: any, { rejectWithValue }) => {
    try {
      const data = await movieAPI.addMovie(movie);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addMovie.fulfilled, (state, { payload }) => {
      state.movie = payload;
      state.isLoading = false;
    });
    builder.addCase(addMovie.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(addMovie.rejected, (state, { payload }) => {
      state.isLoading = false;
      if (typeof payload === "string") state.errorRegister = payload;
    });
  },
});

export default movieSlice.reducer;
