import { configureStore } from "@reduxjs/toolkit";
import auth from "Slices/auth";
import movieSlice from "Slices/movieSlice";
import userSlice from "Slices/userSlice";
const store = configureStore({
  reducer: {
    auth,
    movieSlice,
    userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
