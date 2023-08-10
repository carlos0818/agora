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
    const { data, status, update } = useSession()

    useEffect(() => {
        if (status === 'authenticated') {
            dispatch({ type: '[Auth] - Login', payload: data?.user as IUser })
        }
    }, [status])

    const updateName = (user: IUser) => {
        update({
            ...data,
            user: {
                ...data?.user,
                name: user.fullname,
                fullname: user.fullname,
            }
        })
        dispatch({ type: '[Auth] - Update User', payload: user as IUser })
    }

    const updateProfilePic = (user: IUser) => {
        update({
            ...data,
            user: {
                ...data?.user,
                profilepic: user.profilepic,
            }
        })
        dispatch({ type: '[Auth] - Update User', payload: user as IUser })
    }

    const registerUser = async(fullname: string, email: string, password: string, type: string, captcha: string): Promise<{hasError: boolean; message?: string}> => {
        try {
            await agoraApi.post('/user/register', { email, password, fullname, type, captcha })
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
        localStorage.removeItem('questionnaire')
        signOut()
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            registerUser,
            updateName,
            updateProfilePic,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}
