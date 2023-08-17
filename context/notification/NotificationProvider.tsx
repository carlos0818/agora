import React, { FC, useReducer } from 'react'

import { NotificationContext, notificationReducer } from '.'

import { INotification } from '../../interfaces'

export interface NotificationState {
    notifications: INotification
}

const NOTIFICATION_INITIAL_STATE: NotificationState = {
    notifications: {
        contactRequests: 0,
        messages: 0,
        views: 0,
    }
}

interface Props {
   children: JSX.Element
}

export const NotificationProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(notificationReducer, NOTIFICATION_INITIAL_STATE)

    const updateNotifications = (notifications: INotification) => {
        dispatch({ type: '[Notification] - Update Notification', payload: notifications })
    }

    return (
        <NotificationContext.Provider value={{
            ...state,
            updateNotifications
        }}>
            { children }
        </NotificationContext.Provider>
    )
}
