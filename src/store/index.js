import { configureStore } from "@reduxjs/toolkit";
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

export default configureStore({
    reducer: {
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
        [vendorApi.reducerPath]: vendorApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        productsApi.middleware,
        categoriesApi.middleware,
        tokenApi.middleware,
        promosApi.middleware,
        categoriesApiUser.middleware,
        productsApiUser.middleware,
        promosApiUser.middleware,
        qrCodeApi.middleware,
        vendorApi.middleware
    )
})