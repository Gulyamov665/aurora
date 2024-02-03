import { configureStore } from "@reduxjs/toolkit";
import appReducer from './appSlice'
import { productsApi } from "./productsApi";
import { categoriesApi } from "./categoryApi";

export default configureStore({
    reducer: {
        modals: appReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware, categoriesApi.middleware)
})