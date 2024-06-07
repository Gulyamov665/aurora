import { createSlice } from "@reduxjs/toolkit";


const vendorSlice = createSlice({
    name: 'vendor',
    initialState: {
        id: null
    },

    reducers: {
        getVendorId(state, action) {
            state.id = action.payload
        }
    }
})

export const { getVendorId } = vendorSlice.actions
export default vendorSlice.reducer