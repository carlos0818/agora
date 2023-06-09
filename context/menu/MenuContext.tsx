import { createContext } from 'react'

type HideMenu = 'original' | 'hide' | 'show'

interface ContextProps {
    isOpen: HideMenu
    isOpenDesktop: HideMenu
    isDarkMode: Boolean
    toggleSideMenu: (state: HideMenu) => void
    toggleSideMenuDesktop: (state: HideMenu) => void
    toggleDarkMode: (state: boolean) => void
}

export const MenuContext = createContext({} as ContextProps)
