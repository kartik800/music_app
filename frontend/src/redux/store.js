import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userSlice from "./userSlice";
import playListSlice from "./playListSlice";
import authSlice from "./authSlice";
import audioPlayer from "./audioPlayer";

const reducers = combineReducers({
  user: userSlice,
  playlists: playListSlice,
  audioPlayer: audioPlayer,
  auth: authSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "audioPlayer"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
