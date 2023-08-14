import { createContext } from 'react'
import { INotification } from '@/interfaces'

interface ContextProps {
    notifications: INotification
    updateNotifications: (notifications: INotification) => void
}

export const NotificationContext = createContext({} as ContextProps)
