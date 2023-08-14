import { NotificationState } from '.'
import { INotification } from '@/interfaces'

type NotificationActionType =
    | { type: '[Notification] - Update Notification', payload: INotification }

export const notificationReducer = (state: NotificationState, action: NotificationActionType): NotificationState => {
    switch (action.type) {
        case '[Notification] - Update Notification':
            return {
                ...state,
                notifications: action.payload
            }
        default:
            return state
    }
}