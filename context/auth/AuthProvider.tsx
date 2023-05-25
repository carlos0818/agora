import React, { FC, useEffect, useReducer } from 'react'
import { useSession, signOut } from 'next-auth/react'

import { AuthContext, authReducer } from './'

import { agoraApi } from '@/api'
import axios from 'axios'

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

    const registerUser = async(fullname: string, email: string, password: string, type: string, captcha: string): Promise<{hasError: boolean; message?: string}> => {
        try {
            const { data } = await agoraApi.post('/user/register', { email, password, fullname, type, captcha })
            // console.log(data)
            dispatch({ type: '[Auth] - Login', payload: data })
            return {
                hasError: false
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    const logout = () => {
        signOut()
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            registerUser,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}
