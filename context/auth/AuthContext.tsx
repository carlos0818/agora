import { createContext } from 'react'
import { IUser } from '../../interfaces'

interface ContextProps {
    isLoggedIn: boolean
    user?: IUser
    // loginUser: (email: string, password: string) => Promise<boolean>
    registerUser: (fullname: string, email: string, password: string, type: string, captcha: string) => Promise<{hasError: boolean; message?: string;}>
    updateName: (user: IUser) => void
    logout: () => void
}

export const AuthContext = createContext({} as ContextProps)
