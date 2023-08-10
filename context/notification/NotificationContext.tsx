import { createContext } from 'react'

interface ContextProps {
    contactRequests: number
    updateContactRequests: (requests: number) => void
}

export const NotificationContext = createContext({} as ContextProps)
