import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "../features/company/companySlice";

export const store = configureStore({
  reducer: {
    company: companyReducer,
  },
});

// Types utiles
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
