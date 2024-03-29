import React, { FC, useReducer } from 'react'

import { MenuContext, menuReducer } from '.'

type HideMenu = 'original' | 'hide' | 'show'

export interface MenuState {
    isOpen: HideMenu
    isOpenDesktop: HideMenu
    isDarkMode: boolean
}


const MENU_INITIAL_STATE: MenuState = {
    isOpen: 'original',
    isOpenDesktop: 'original',
    isDarkMode: false
}

interface Props {
   children: JSX.Element
}

export const MenuProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(menuReducer, MENU_INITIAL_STATE)

    const toggleSideMenu = (state: HideMenu) => {
        dispatch({ type: '[Menu] - ToggleMenu', payload: state })
    }

    const toggleSideMenuDesktop = (state: HideMenu) => {
        dispatch({ type: '[Menu] - ToggleMenuDesktop', payload: state })
    }

    const toggleDarkMode = (state: boolean) => {
        dispatch({ type: '[Menu] - ToggleDarkMode', payload: state })
    }

    return (
        <MenuContext.Provider value={{
            ...state,
            toggleSideMenu,
            toggleSideMenuDesktop,
            toggleDarkMode,
        }}>
            { children }
        </MenuContext.Provider>
    )
}
