import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { productsApi } from "./admin/api/productsApi";
import { categoriesApi } from "./admin/api/categoryApi";
import { tokenApi } from "./tokenApi";
import { promosApi } from "./admin/api/promoApi";
import { categoriesApiUser } from "./user/api/categoryApi";
import { productsApiUser } from "./user/api/productsApi";
import { promosApiUser } from "./user/api/promoApi";
import { qrCodeApi } from "./admin/api/qrCode";
import { vendorApi } from "./admin/api/vendorApi";
import { dispatcher } from "./user/api/dispatcherApi";
import { userRegistration } from "./user/api/userRegistrationApi";
import { registerMiddleware } from "./middlewares/registrationMiddleware";
import { authMiddleware } from "./middlewares/authMiddleware";
import { ordersApi } from "./admin/api/orders";
import { locationApi } from "./user/api/locationApi";
import { sharedApi } from "./user/api/shared";
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
  [ordersApi.reducerPath]: ordersApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
  [sharedApi.reducerPath]: sharedApi.reducer,
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
      registerMiddleware,
      authMiddleware,
      ordersApi.middleware,
      locationApi.middleware,
      sharedApi.middleware
    ),
});

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
