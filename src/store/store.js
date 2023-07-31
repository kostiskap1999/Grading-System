import { createStore } from "redux";
import { LOGIN_USER } from "./types";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const intitialState = {
  authenticated: false
};

const reducer = (state = intitialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, authenticated: true };

    default:
      return state;
  }
};


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer);
export const persistor = persistStore(store)
export default store;