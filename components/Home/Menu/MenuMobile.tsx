import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import { AuthContext } from '@/context/auth'
import { MenuContext } from '@/context/menu'

import styles from './menu-mobile.module.css'

import homeIcon from '@/public/images/home-icon.svg'

export const MenuMobile = () => {
    const { isOpen, toggleSideMenu } = useContext(MenuContext)
    const { user } = useContext(AuthContext)

    const router = useRouter()

    const [openFinder, setOpenFinder] = useState(false)
    const [openMyData, setOpenMyData] = useState(false)
    const [openMoreInfo, setOpenMoreInfo] = useState(false)
    const [openContacts, setContacts] = useState(false)

    return (
        <div className={ `window-glass ${ styles['menu-container'] } ${ isOpen === 'show' ? styles['show'] : isOpen === 'hide' ? styles['hide'] : '' }` }>
            <div className={ `window-glass-content ${ styles['menu-content'] }` } style={{ paddingBlock: '10px', paddingInline: 0, overflow: 'hidden' }}>
                <ul className={ styles['options-container'] }>
                    <Link
                        href='/'
                        passHref
                        prefetch={ false }
                        legacyBehavior
                    >
                        <li
                            className={ `${ styles['option'] } ${ router.pathname === '/' ? styles['selected'] : '' }` }
                            onClick={ () => toggleSideMenu('original') }
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
                            onClick={ () => toggleSideMenu('original') }
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
                                            onClick={ () => toggleSideMenu('original') }
                                        >
                                            <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Countries
                                        </li>
                                    </Link>
                                    <li className={ styles['submenu-option'] }>
                                        <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Sector
                                    </li>
                                    <li className={ styles['submenu-option'] }>
                                        <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Portfolio
                                    </li> */}
                                    <Link
                                        href={ `/finder/entrepreneur` }
                                        passHref
                                        prefetch={ false }
                                        legacyBehavior
                                    >
                                        <li
                                            className={ styles['submenu-option'] }
                                            onClick={ () => toggleSideMenu('original') }
                                        >
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
                                        <li
                                            className={ styles['submenu-option'] }
                                            onClick={ () => toggleSideMenu('original') }
                                        >
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
                                        <li
                                            className={ styles['submenu-option'] }
                                            onClick={ () => toggleSideMenu('original') }
                                        >
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
                                            onClick={ () => toggleSideMenu('original') }
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
                                            onClick={ () => toggleSideMenu('original') }
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
                                            onClick={ () => toggleSideMenu('original') }
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
                        <details open={ openMyData }>
                            <summary className={ styles['option'] }>
                                {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                My data
                            </summary>
                            <div className={ styles['accordion-content'] }>
                                <ul className={ styles['submenu-container'] }>
                                    {/* <Link
                                        href='/finder/country-snapshot'
                                        passHref
                                        prefetch={ false }
                                        legacyBehavior
                                    >
                                        <li className={ styles['submenu-option'] }>
                                            Dashboard
                                        </li>
                                    </Link> */}
                                    <li className={ styles['submenu-option'] }>
                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                        Inbox
                                    </li>
                                    <li className={ styles['submenu-option'] }>
                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                        Notifications
                                    </li>
                                </ul>
                            </div>
                        </details>
                    </li>
                    <li>
                        <details open={ openMoreInfo }>
                            <summary className={ styles['option'] }>
                                {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                More info
                            </summary>
                            <div className={ styles['last-submenu'] }>
                                <ul className={ styles['submenu-container'] }>
                                    <Link
                                        href='/finder/country-snapshot'
                                        passHref
                                        prefetch={ false }
                                        legacyBehavior
                                    >
                                        <li
                                            className={ styles['submenu-option'] }
                                            onClick={ () => toggleSideMenu('original') }
                                        >
                                            {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                            T&C
                                        </li>
                                    </Link>
                                    <li className={ styles['submenu-option'] }>
                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                        FAQ
                                    </li>
                                    <li className={ styles['submenu-option'] }>
                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                        Hub
                                    </li>
                                    <li className={ styles['submenu-option'] }>
                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                        About
                                    </li>
                                    <li className={ styles['submenu-option'] }>
                                        {/* <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> */}
                                        Comments
                                    </li>
                                </ul>
                            </div>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}
