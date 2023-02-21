import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CountryState {
    id: string  | null
    indicatorId: number | null
    indicatorName: string | null
    indicatorYear: number | null
    indicatorValue: number | null
}

// Define the initial state using that type
const initialState: CountryState[] = []

export const countrySlice = createSlice({
    name: 'snapshot',
    initialState,
    reducers: {
        snapshot: (state, action: PayloadAction<CountryState[]>) => {
            return [...action.payload]
        }
    },
})

export const { snapshot } = countrySlice.actions
