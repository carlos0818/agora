import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface LoginState {
    id: number  | null
    name: string | null
}

// Define the initial state using that type
const initialState: LoginState = {
    id: null,
    name: null
}

export const authSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginState>) => {
            const { id, name } = action.payload
            return {
                ...state,
                id,
                name
            }
        }
    },
})

export const { login } = authSlice.actions
