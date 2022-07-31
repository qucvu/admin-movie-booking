import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movie } from "Interfaces/movieInterfaces";
import movieAPI from "Services/movieAPI";

interface State {
  movieList: Movie[] | null;
  isMovieList: boolean;
  movieListError: string | null;
  movie: Movie | null;
  isMovieLoading: boolean;
  movieError: string | null;
  srcPreview: string;
}
const initialState: State = {
  movieList: null,
  isMovieList: false,
  movieListError: null,
  movie: null,
  isMovieLoading: false,
  movieError: null,
  srcPreview: "",
};

export const getMovieList = createAsyncThunk(
  `movie/getMovieList`,
  async (payload?: string) => {
    try {
      const data = await movieAPI.getMovieList(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getMovieInfo = createAsyncThunk(
  `movie/getMovieInfo`,
  async (payload: string | number) => {
    try {
      const data = await movieAPI.getMovieInfo(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteMovie = createAsyncThunk(
  `movie/deleteMovie`,
  async (payload: string | number) => {
    try {
      await movieAPI.deleteMovie(payload);
    } catch (error) {
      throw error;
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async (payload: Movie) => {
    try {
      await movieAPI.updateMovie(payload);
    } catch (error) {
      throw error;
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getSrcPreview: (state, { payload }) => {
      state.srcPreview = payload;
    },
    handleSearchMovie: (state, { payload }) => {
      if (state.movieList) {
        const temp: Movie[] = [];
        state.movieList.map((movie: Movie) => {
          if (movie.tenPhim.includes(payload) || movie.biDanh.includes(payload))
            return temp.push(movie);
          return undefined;
        });
        state.movieList = temp;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovieList.pending, (state) => {
      state.isMovieList = true;
    });
    builder.addCase(getMovieList.fulfilled, (state, { payload }) => {
      state.movieList = payload;
      state.isMovieList = false;
    });
    //---------------------------------------------------
    builder.addCase(getMovieInfo.pending, (state) => {
      state.isMovieLoading = true;
    });
    builder.addCase(getMovieInfo.fulfilled, (state, { payload }) => {
      state.isMovieLoading = false;
      state.movie = payload;
    });
    builder.addCase(getMovieInfo.rejected, (state, { error }) => {
      state.isMovieLoading = false;
      state.movieError = error as any;
    });
  },
});

export const { getSrcPreview, handleSearchMovie } = movieSlice.actions;
export default movieSlice.reducer;
