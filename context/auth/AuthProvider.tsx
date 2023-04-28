import React, { FC, useEffect, useReducer } from 'react'
import { useSession, signOut } from 'next-auth/react'

import { AuthContext, authReducer } from './'

import { IUser } from '../../interfaces'

export interface AuthState {
    isLoggedIn: boolean
    user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

interface Props {
   children: JSX.Element
}

export const AuthProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
    const { data, status } = useSession()

    useEffect(() => {
        if (status === 'authenticated') {
            dispatch({ type: '[Auth] - Login', payload: data?.user as IUser })
        }
    }, [status, data])

    const logout = () => {
        signOut()
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}
