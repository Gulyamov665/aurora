import { configureStore } from "@reduxjs/toolkit";
import appReducer from './appSlice'
import { productsApi } from "./productsApi";
import { categoriesApi } from "./categoryApi";
import { tokenApi } from "./tokenApi";

export default configureStore({
    reducer: {
        modals: appReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [tokenApi.reducerPath]: tokenApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware, categoriesApi.middleware, tokenApi.middleware)
})