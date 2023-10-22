import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from "@redux-saga/core";
import ProductStore from './ProductStore'
import rootSaga from '../saga/main';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { persistReducer, persistStore } from 'redux-persist';
import FavoriteStore from './FavoriteStore';
import CartStore from './CartStore';
import reduxStorage from './localstore';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  version: 1,
  storage: reduxStorage,
  timeout: 0,
  blacklist: ['product'],
};

const rootReducer = combineReducers({
  product: ProductStore,
  favorite: FavoriteStore,
  cart: CartStore
});

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
})



sagaMiddleware.run(rootSaga);

export const persistStorage = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch