import { configureStore, createStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { authReducer } from "./auth/slice";

// const rootReducer = combineReducers({ authSlice });

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// export const persistor = persistStore(store);
