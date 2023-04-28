import { configureStore } from '@reduxjs/toolkit'
import { countrySlice } from './slices'

export const store = configureStore({
    reducer: {
        countryReducer: countrySlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
