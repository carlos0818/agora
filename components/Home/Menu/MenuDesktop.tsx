import { FC, RefObject, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import { useMenuDesktop } from '@/hooks/useMenuDesktop'

import styles from './menu-desktop.module.css'

import homeIcon from '@/public/images/home-icon.svg'
import leftArrowIcon from '@/public/images/left-arrow-icon.svg'
import { MenuContext } from '@/context/menu'

interface Props {
    wrapperRef: RefObject<HTMLInputElement>
}

export const MenuDesktop: FC<Props> = ({ wrapperRef }) => {
    const { toggleDarkMode } = useContext(MenuContext)

    const { hideMenu, menuHideRef, handleToggleMenu } = useMenuDesktop(wrapperRef)
    const router = useRouter()

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

            <div className={ styles['menu-container'] }>
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
                                        <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Home
                                    </li>
                                </Link>
                                <Link
                                    href='/my-profile'
                                    passHref
                                    prefetch={ false }
                                    legacyBehavior
                                >
                                    <li
                                        className={ `${ styles['option'] } ${ router.pathname === '/my-profile' ? styles['selected'] : '' }` }
                                        // onClick={ () => toggleSideMenuDesktop('original') }
                                    >
                                        <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> My profile
                                    </li>
                                </Link>
                                <li>
                                    <details
                                        open={
                                            router.pathname === '/finder/country-snapshot' ||
                                            router.pathname === '/finder/sector' ||
                                            router.pathname === '/finder/portfolio' ||
                                            router.pathname === '/finder/entrepreneur' ||
                                            router.pathname === '/finder/investors' ||
                                            router.pathname === '/finder/experts'
                                        }
                                    >
                                        <summary
                                            className={
                                                `
                                                ${ styles['option'] }
                                                ${
                                                    router.pathname === '/finder/country-snapshot' ||
                                                    router.pathname === '/finder/sector' ||
                                                    router.pathname === '/finder/portfolio' ||
                                                    router.pathname === '/finder/entrepreneur' ||
                                                    router.pathname === '/finder/investors' ||
                                                    router.pathname === '/finder/experts'
                                                    ? styles['selected'] : ''
                                                }
                                            ` }
                                        >
                                            <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Finder
                                        </summary>
                                        <div className={ styles['accordion-content'] }>
                                            <ul className={ styles['submenu-container'] }>
                                                <Link
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
                                                </li>
                                                <li className={ `${ styles['submenu-option'] } ${ router.pathname === '/finder/entrepreneur' ? styles['selected'] : '' }` }>
                                                    <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Entrepreneur
                                                </li>
                                                <li className={ `${ styles['submenu-option'] } ${ router.pathname === '/finder/investors' ? styles['selected'] : '' }` }>
                                                    <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Investors
                                                </li>
                                                <li className={ `${ styles['submenu-option'] } ${ router.pathname === '/finder/experts' ? styles['selected'] : '' }` }>
                                                    <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Experts
                                                </li>
                                            </ul>
                                        </div>
                                    </details>
                                </li>
                                <li className={ `${ styles['option'] } ${ router.pathname === '/contacts' ? styles['selected'] : '' }` }>
                                    <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Contacts
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
                                            <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> My data
                                        </summary>
                                        <div className={ styles['last-submenu'] }>
                                            <ul className={ styles['submenu-container'] }>
                                                <li className={ styles['submenu-option'] }>
                                                    <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Dashboard
                                                </li>
                                                <li className={ styles['submenu-option'] }>
                                                    <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Inbox
                                                </li>
                                                <li className={ styles['submenu-option'] }>
                                                    <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Notifications
                                                </li>
                                            </ul>
                                        </div>
                                    </details>
                                </li>
                                <li>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBlockStart: 20, paddingInline: 20 }}>
                                        <p style={{ color: '#10284F' }}>Dark mode</p>
                                        <label className="switch">
                                            <input type="checkbox" onChange={ toggleDark } />
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
