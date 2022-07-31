import { configureStore } from "@reduxjs/toolkit";
import auth from "Slices/auth";
import user from "Slices/UserSlice";
import movie from "Slices/MovieSlice";
const store = configureStore({
  reducer: {
    auth,
    user,
    movie,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
