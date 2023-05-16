import { createContext } from 'react'

type HideMenu = 'original' | 'hide' | 'show'

interface ContextProps {
    isOpen: HideMenu
    isOpenDesktop: HideMenu
    toggleSideMenu: (state: HideMenu) => void
    toggleSideMenuDesktop: (state: HideMenu) => void
}

export const MenuContext = createContext({} as ContextProps)
