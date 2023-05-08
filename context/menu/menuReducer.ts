import { MenuState } from './'

type HideMenu = 'original' | 'hide' | 'show'

type MenuActionType =
    | { type: '[Menu] - ToggleMenu', payload: HideMenu}

export const menuReducer = (state: MenuState, action: MenuActionType): MenuState => {
    switch (action.type) {
        case '[Menu] - ToggleMenu':
            return {
                ...state,
                isOpen: action.payload
            }
        default:
            return state
    }
}