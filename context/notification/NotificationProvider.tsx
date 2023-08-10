import React, { FC, useReducer } from 'react'

import { NotificationContext, notificationReducer } from '.'

import { agoraApi } from '@/api'
import axios from 'axios'

import { IUser } from '../../interfaces'

export interface NotificationState {
    contactRequests: number
}

const NOTIFICATION_INITIAL_STATE: NotificationState = {
    contactRequests: 0
}

interface Props {
   children: JSX.Element
}

export const NotificationProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(notificationReducer, NOTIFICATION_INITIAL_STATE)

    const updateContactRequests = (requests: number) => {
        dispatch({ type: '[Notification] - Update', payload: requests })
    }

    return (
        <NotificationContext.Provider value={{
            ...state,
            updateContactRequests
        }}>
            { children }
        </NotificationContext.Provider>
    )
}
