import { useContext } from 'react'
import Image from 'next/image'

import { MenuContext } from '@/context/menu'

import styles from './navbar-mobile.module.css'

import openMenuIcon from '@/public/images/open-menu-icon.svg'

export const NavbarMobile = () => {
    const { isOpen, toggleSideMenu } = useContext(MenuContext)

    const handleMenu = () => {
        if (isOpen === 'original' || isOpen === 'hide')
            toggleSideMenu('show')
        else
            toggleSideMenu('hide')
    }

    return (
        <div className={ styles['navbar-container'] }>
            <Image
                src={ openMenuIcon }
                alt=''
                onClick={ handleMenu }
            />
            
        </div>
    )
}
