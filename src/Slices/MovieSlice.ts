import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieAdd } from "Interfaces/Movie";
import movieAPI from "Services/movieAPI";
import { Movie } from "Interfaces/movieInterfaces";

interface State {
  movieList: Movie[] | null;
  isMovieList: boolean;
  movieListError: string | null;
  movie: Movie | null;
  isMovieLoading: boolean;
  movieError: string | null;
  srcPreview: string;
  errorRegister: string | null;
  searchList: Movie[] | null;
  searchText: string;
}
const initialState: State = {
  movieList: null,
  isMovieList: false,
  movieListError: null,
  movie: null,
  isMovieLoading: false,
  movieError: null,
  srcPreview: "",
  errorRegister: null,
  searchList: null,
  searchText: "",
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
      state.searchText = payload;
      if (payload !== "") {
        const temp: Movie[] = [];
        state.movieList?.map((movie: Movie) => {
          state.searchList = temp;
          if (movie.tenPhim.includes(payload)) {
            return state.searchList.push(movie);
          }
        });
      } else state.searchList = [];
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
    builder.addCase(getMovieList.rejected, (state, { error }) => {
      state.isMovieList = false;
      if (typeof error === "string") state.movieListError = error;
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
    //---------------------------------------------------
    builder.addCase(addMovie.fulfilled, (state, { payload }) => {
      state.movie = payload;
      state.isMovieLoading = false;
    });
    builder.addCase(addMovie.pending, (state, { payload }) => {
      state.isMovieLoading = true;
    });
    builder.addCase(addMovie.rejected, (state, { payload }) => {
      state.isMovieLoading = false;
      if (typeof payload === "string") state.errorRegister = payload;
    });
  },
});

export const { getSrcPreview, handleSearchMovie } = movieSlice.actions;
export default movieSlice.reducer;
