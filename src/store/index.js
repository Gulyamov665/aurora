import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import appReducer from './appSlice'
import vendorReducer from './admin/slices/vendorSlice'
import { productsApi } from "./admin/productsApi";
import { categoriesApi } from "./admin/categoryApi";
import { tokenApi } from "./tokenApi";
import { promosApi } from "./admin/promoApi";
import { categoriesApiUser } from "./user/categoryApi";
import { productsApiUser } from "./user/productsApi";
import { promosApiUser } from "./user/promoApi";
import { qrCodeApi } from "./admin/qrCode";
import { vendorApi } from "./admin/vendorApi";
import cartSlice from "./cartSlice";
import { dispatcher } from "./user/dispatcherApi";


const rootReducer = combineReducers({
    cart: cartSlice,
    modals: appReducer,
    vendor: vendorReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [tokenApi.reducerPath]: tokenApi.reducer,
    [promosApi.reducerPath]: promosApi.reducer,
    [categoriesApiUser.reducerPath]: categoriesApiUser.reducer,
    [productsApiUser.reducerPath]: productsApiUser.reducer,
    [promosApiUser.reducerPath]: promosApiUser.reducer,
    [qrCodeApi.reducerPath]: qrCodeApi.reducer,
    [vendorApi.reducerPath]: vendorApi.reducer,
    [dispatcher.reducerPath]: dispatcher.reducer
})


const persistConfig = {
    key: 'cart',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
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
    )
})

export const persistor = persistStore(store)
export default store