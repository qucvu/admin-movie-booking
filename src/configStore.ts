import { configureStore } from "@reduxjs/toolkit";
import auth from "Slices/auth";
const store = configureStore({
  reducer: {
    auth,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
