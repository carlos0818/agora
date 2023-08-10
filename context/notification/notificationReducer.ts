import { NotificationState } from '.'

type NotificationActionType =
    | { type: '[Notification] - Update', payload: number }

export const notificationReducer = (state: NotificationState, action: NotificationActionType): NotificationState => {
    switch (action.type) {
        case '[Notification] - Update':
            return {
                ...state,
                contactRequests: action.payload
            }
        default:
            return state
    }
}