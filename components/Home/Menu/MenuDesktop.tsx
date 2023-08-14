import { FC, RefObject, useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import { useMenuDesktop } from '@/hooks/useMenuDesktop'
import { AuthContext } from '@/context/auth'
import { MenuContext } from '@/context/menu'

import styles from './menu-desktop.module.css'

import leftArrowIcon from '@/public/images/left-arrow-icon.svg'

interface Props {
    wrapperRef: RefObject<HTMLInputElement>
    notificationsRef: RefObject<HTMLInputElement>
}

export const MenuDesktop: FC<Props> = ({ wrapperRef, notificationsRef }) => {
    const { isDarkMode, toggleDarkMode } = useContext(MenuContext)
    const { user } = useContext(AuthContext)
    
    const menuRef = useRef<HTMLInputElement>(null)

    const { hideMenu, menuHideRef, handleToggleMenu } = useMenuDesktop(wrapperRef, notificationsRef, menuRef)
    const router = useRouter()

    useEffect(() => {
        const darkMode = JSON.parse(localStorage.getItem('DarkMode')!)
        toggleDarkMode(darkMode)
    }, [])

    const toggleDark = () => {
        const darkMode = !JSON.parse(localStorage.getItem('DarkMode')!)
        localStorage.setItem('DarkMode', JSON.stringify(darkMode))
        toggleDarkMode(darkMode)
    }

    return (
        <>
            <div
                className={ `${ styles['menu-button'] } ${ styles['menu-hide-button'] }` }
                ref={ menuHideRef }
                onClick={ handleToggleMenu }
            >
                <Image src={ leftArrowIcon } className={ styles['left-arrow'] } alt='left arrow icon' />
            </div>
            <div className={ styles['menu-container'] } ref={ menuRef }>
                <div className={ `${ styles['menu-wrapper'] } ${ hideMenu === 'hide' ? styles['hide'] : hideMenu === 'show' ? styles['show'] : '' }` }>
                    <div className={ `window-glass ${ styles['menu-box'] }` }>
                        <div className='window-glass-content' style={{ paddingInline: 0, paddingBlock: '10px', overflow: 'hidden' }}>
                            <ul className={ styles['options-container'] }>
                                <Link
                                    href='/'
                                    passHref
                                    prefetch={ false }
                                    legacyBehavior
                                >
                                    <li
                                        className={ `${ styles['option'] } ${ router.pathname === '/' ? styles['selected'] : '' }` }
                                        // onClick={ () => toggleSideMenuDesktop('original') }
                                    >
                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                        Home
                                    </li>
                                </Link>
                                <Link
                                    href={ `/profile/${ user?.id }` }
                                    passHref
                                    prefetch={ false }
                                    legacyBehavior
                                >
                                    <li
                                        className={ `${ styles['option'] } ${ router.query.id ? styles['selected'] : '' }` }
                                        // onClick={ () => toggleSideMenuDesktop('original') }
                                    >
                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                        My profile
                                    </li>
                                </Link>
                                <li>
                                    <details
                                        open={
                                            router.query.type === 'entrepreneur' ||
                                            router.query.type === 'investors' ||
                                            router.query.type === 'experts'
                                        }
                                    >
                                        <summary
                                            className={
                                                `
                                                ${ styles['option'] }
                                                ${
                                                    router.query.type === 'entrepreneur' ||
                                                    router.query.type === 'investors' ||
                                                    router.query.type === 'experts'
                                                    ? styles['selected'] : ''
                                                }
                                            ` }
                                        >
                                            {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                            Finder
                                        </summary>
                                        <div className={ styles['accordion-content'] }>
                                            <ul className={ styles['submenu-container'] }>
                                                {/* <Link
                                                    href='/finder/country-snapshot'
                                                    passHref
                                                    prefetch={ false }
                                                    legacyBehavior
                                                >
                                                    <li
                                                        className={ `${ styles['submenu-option'] } ${ router.pathname === '/finder/country-snapshot' ? styles['selected'] : '' }` }
                                                        // onClick={ () => toggleSideMenuDesktop('original') }
                                                    >
                                                        <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Countries
                                                    </li>
                                                </Link>
                                                <li className={ `${ styles['submenu-option'] } ${ router.pathname === '/finder/sector' ? styles['selected'] : '' }` }>
                                                    <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Sector
                                                </li>
                                                <li className={ `${ styles['submenu-option'] } ${ router.pathname === '/finder/portfolio' ? styles['selected'] : '' }` }>
                                                    <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Portfolio
                                                </li> */}
                                                <Link
                                                    href={ `/finder/entrepreneur` }
                                                    passHref
                                                    prefetch={ false }
                                                    legacyBehavior
                                                >
                                                    <li className={ `${ styles['submenu-option'] } ${ router.pathname === '/finder/entrepreneur' ? styles['selected'] : '' }` }>
                                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                                        Entrepreneur
                                                    </li>
                                                </Link>
                                                <Link
                                                    href={ `/finder/investors` }
                                                    passHref
                                                    prefetch={ false }
                                                    legacyBehavior
                                                >
                                                    <li className={ `${ styles['submenu-option'] } ${ router.pathname === '/finder/investors' ? styles['selected'] : '' }` }>
                                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                                        Investors
                                                    </li>
                                                </Link>
                                                <Link
                                                    href={ `/finder/experts` }
                                                    passHref
                                                    prefetch={ false }
                                                    legacyBehavior
                                                >
                                                    <li className={ `${ styles['submenu-option'] } ${ router.pathname === '/finder/experts' ? styles['selected'] : '' }` }>
                                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                                        Experts
                                                    </li>
                                                </Link>
                                            </ul>
                                        </div>
                                    </details>
                                </li>
                                <li>
                                    <details
                                        open={
                                            router.pathname === '/infographics/country-snapshot'
                                        }
                                    >
                                        <summary
                                            className={
                                                `
                                                ${ styles['option'] }
                                                ${
                                                    router.pathname === '/infographics/country-snapshot'
                                                    ? styles['selected'] : ''
                                                }
                                            ` }
                                        >
                                            {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                            Infographics
                                        </summary>
                                        <div className={ styles['accordion-content'] }>
                                            <ul className={ styles['submenu-container'] }>
                                                <Link
                                                    href='/infographics/country-snapshot'
                                                    passHref
                                                    prefetch={ false }
                                                    legacyBehavior
                                                >
                                                    <li
                                                        className={ `${ styles['submenu-option'] } ${ router.pathname === '/infographics/country-snapshot' ? styles['selected'] : '' }` }
                                                        // onClick={ () => toggleSideMenuDesktop('original') }
                                                    >
                                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                                        Countries
                                                    </li>
                                                </Link>
                                            </ul>
                                        </div>
                                    </details>
                                </li>
                                <li>
                                    <details
                                        open={
                                            router.pathname === '/contacts/my-contacts' ||
                                            router.pathname === '/contacts/contact-requests'
                                        }
                                    >
                                        <summary
                                            className={
                                                `
                                                ${ styles['option'] }
                                                ${
                                                    router.pathname === '/contacts/my-contacts' ||
                                                    router.pathname === '/contacts/contact-requests'
                                                    ? styles['selected'] : ''
                                                }
                                            ` }
                                        >
                                            {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                            Contacts
                                        </summary>
                                        <div className={ styles['accordion-content'] }>
                                            <ul className={ styles['submenu-container'] }>
                                                <Link
                                                    href='/contacts/my-contacts'
                                                    passHref
                                                    prefetch={ false }
                                                    legacyBehavior
                                                >
                                                    <li
                                                        className={ `${ styles['submenu-option'] } ${ router.pathname === '/contacts/my-contacts' ? styles['selected'] : '' }` }
                                                        // onClick={ () => toggleSideMenuDesktop('original') }
                                                    >
                                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                                        My contacts
                                                    </li>
                                                </Link>
                                                <Link
                                                    href='/contacts/contact-requests'
                                                    passHref
                                                    prefetch={ false }
                                                    legacyBehavior
                                                >
                                                    <li
                                                        className={ `${ styles['submenu-option'] } ${ router.pathname === '/contacts/contact-requests' ? styles['selected'] : '' }` }
                                                        // onClick={ () => toggleSideMenuDesktop('original') }
                                                    >
                                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                                        Contact requests
                                                    </li>
                                                </Link>
                                            </ul>
                                        </div>
                                    </details>
                                </li>
                                <li>
                                    <details
                                        open={
                                            router.pathname === '/dashboard' ||
                                            router.pathname === '/inbox' ||
                                            router.pathname === '/notifications'
                                        }
                                    >
                                        <summary
                                            className={
                                            `
                                                ${ styles['option'] }
                                                ${
                                                    router.pathname === '/dashboard' ||
                                                    router.pathname === '/inbox' ||
                                                    router.pathname === '/notifications'
                                                    ? styles['selected'] : ''
                                                }
                                            ` }
                                        >
                                            {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                            My data
                                        </summary>
                                        <div className={ styles['last-submenu'] }>
                                            <ul className={ styles['submenu-container'] }>
                                                {/* <li className={ styles['submenu-option'] }>
                                                    Dashboard
                                                </li> */}
                                                <Link
                                                    href='/inbox'
                                                    passHref
                                                    prefetch={ false }
                                                    legacyBehavior
                                                >
                                                    <li className={ styles['submenu-option'] }>
                                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                                        Inbox
                                                    </li>
                                                </Link>
                                                <li className={ styles['submenu-option'] }>
                                                    {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                                    Notifications
                                                </li>
                                                {
                                                    user?.type === 'E' && (
                                                        <li className={ styles['submenu-option'] }>
                                                            {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                                            Pitch Deck
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </details>
                                </li>
                                <li>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBlockStart: 20, paddingInline: 20 }}>
                                        <p style={{ color: '#10284F' }}>Dark mode</p>
                                        <label className="switch">
                                            <input type="checkbox" onChange={ toggleDark } checked={ isDarkMode } />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div
                        className={ styles['menu-button'] }
                        onClick={ handleToggleMenu }
                    >
                        <Image src={ leftArrowIcon } alt='left arrow icon' />
                    </div>
                </div>
            </div>
        </>
    )
}
