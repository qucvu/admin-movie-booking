import { configureStore } from "@reduxjs/toolkit";
import auth from "Slices/auth";
import movieSlice from "Slices/movieSlice";
import userSlice from "Slices/userSlice";
import cinema from "Slices/cinema";
const store = configureStore({
  reducer: {
    auth,
    movieSlice,
    userSlice,
    cinema,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
