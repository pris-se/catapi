import { configureStore } from "@reduxjs/toolkit";
import { petApi } from "./petApi";
import mainState from "./mainState";

export const store = configureStore({
  reducer: {
    [petApi.reducerPath]: petApi.reducer,
    state: mainState,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(petApi.middleware),
});
