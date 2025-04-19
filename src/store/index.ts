import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { productsApi } from "./admin/api/productsApi.js";
import { categoriesApi } from "./admin/api/categoryApi.js";
import { tokenApi } from "./tokenApi";
import { promosApi } from "./admin/api/promoApi.js";
import { categoriesApiUser } from "./user/api/categoryApi";
import { productsApiUser } from "./user/api/productsApi";
import { promosApiUser } from "./user/api/promoApi";
import { qrCodeApi } from "./admin/api/qrCode.js";
import { vendorApi } from "./admin/api/vendorApi.js";
import { dispatcher } from "./user/api/dispatcherApi";
import { userRegistration } from "./user/api/userRegistrationApi";
import { userAuth } from "./user/api/userAuthApi.js";
import { registerMiddleware } from "./middlewares/registrationMiddleware.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { ordersApi } from "./admin/api/orders";
import { locationApi } from "./user/api/locationApi.js";
import cartSlice from "./cartSlice";
import storage from "redux-persist/lib/storage";
import appReducer from "./appSlice";
import vendorReducer from "./admin/slices/vendorSlice";
import authState from "./user/slices/authSlice";

const rootReducer = combineReducers({
  cart: cartSlice,
  modals: appReducer,
  vendor: vendorReducer,
  authState,
  [productsApi.reducerPath]: productsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [tokenApi.reducerPath]: tokenApi.reducer,
  [promosApi.reducerPath]: promosApi.reducer,
  [categoriesApiUser.reducerPath]: categoriesApiUser.reducer,
  [productsApiUser.reducerPath]: productsApiUser.reducer,
  [promosApiUser.reducerPath]: promosApiUser.reducer,
  [qrCodeApi.reducerPath]: qrCodeApi.reducer,
  [vendorApi.reducerPath]: vendorApi.reducer,
  [dispatcher.reducerPath]: dispatcher.reducer,
  [userRegistration.reducerPath]: userRegistration.reducer,
  [userAuth.reducerPath]: userAuth.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
});

const persistConfig = {
  key: "cart",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.MODE !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      productsApi.middleware,
      categoriesApi.middleware,
      tokenApi.middleware,
      promosApi.middleware,
      categoriesApiUser.middleware,
      productsApiUser.middleware,
      promosApiUser.middleware,
      qrCodeApi.middleware,
      vendorApi.middleware,
      dispatcher.middleware,
      userRegistration.middleware,
      userAuth.middleware,
      registerMiddleware,
      authMiddleware,
      ordersApi.middleware,
      locationApi.middleware
    ),
});

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
