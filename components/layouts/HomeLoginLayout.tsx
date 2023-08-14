import { FC, useRef, useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { MenuContext } from '@/context/menu'
import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { NotificationContext } from '@/context/notification'
import { INotification } from '@/interfaces'

import { MenuDesktop } from '../Home/Menu/MenuDesktop'
import { MenuMobile } from '../Home/Menu/MenuMobile'
import { Navbar } from '../Navbar/Navbar'
import { NavbarMobile } from '@/components/Navbar/NavbarMobile'
import { FooterDesktop } from '../Footer/FooterDesktop'

import styles from './homeLoginLayout.module.css'

interface Props {
    children: JSX.Element
    title: string
    pageDescription: string
    showWrite?: boolean
}

export const HomeLoginLayout: FC<Props> = ({ children, title, pageDescription, showWrite = false }) => {
    const { user } = useContext(AuthContext)
    const { isDarkMode, toggleDarkMode } = useContext(MenuContext)
    const { notifications, updateNotifications } = useContext(NotificationContext)

    const router = useRouter()

    const wrapperRef = useRef<HTMLInputElement>(null)
    const notificationsRef = useRef<HTMLInputElement>(null)
    const circleDiv = useRef<HTMLDivElement>(null)

    const [submenu, setSubmenu] = useState(false)

    useEffect(() => {
        if (user) {
            getNotifications()
        }
    }, [user]);

    useEffect(() => {
        window.addEventListener('scroll', circleWrite)

        return () => {
            window.removeEventListener('scroll', circleWrite)
        }
    }, [])

    useEffect(() => {
        toggleDarkMode(JSON.parse(localStorage.getItem('DarkMode')!))
    }, [isDarkMode])

    const circleWrite = () => {
        if (circleDiv.current) {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                circleDiv.current.style.position = 'absolute'
                circleDiv.current.style.bottom = '170px'
            } else {
                circleDiv.current.style.position = 'fixed'
                circleDiv.current.style.bottom = '70px'
            }
        }
    }

    const moveTop = () => {
        document.getElementById('txtShare')!.focus()
        window.scrollTo({ top: 0, behavior: 'auto' })
    }

    const getNotifications = async() => {
        const { data: contactRequests } = await agoraApi.get<INotification>(`/contact/get-contact-requests-notification?email=${ user?.email }`)
        const { data: messages } = await agoraApi.get<INotification>(`/message/get-messages-notification?email=${ user?.email }`)
        updateNotifications({
            contactRequests: contactRequests.contactRequests,
            messages: messages.messages,
        })
    }

    return (
        <>
            <div
                onClick={ () => setSubmenu(false) }
            >
                <Head>
                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
                    <title>{ title }</title>
                    <meta name="description" content={ pageDescription } />
                </Head>
                <nav>
                    <Navbar
                        submenu={ submenu }
                        setSubmenu={ setSubmenu }
                    />
                </nav>
                <div className={ `${ styles['home-container'] } ${ isDarkMode ? styles['background-dark'] : '' }` }>
                    <MenuMobile />
                    <div className={ styles['home-wrapper'] } ref={ wrapperRef }>
                        <MenuDesktop
                            wrapperRef={ wrapperRef }
                            notificationsRef={ notificationsRef }
                        />
                        <div className={ styles['content-container'] }>
                            { children }
                        </div>
                        <div className={ styles['notifications'] } ref={ notificationsRef }>
                            <div className={ styles['notifications-container'] }>
                                <div className={ styles['notification-wrapper'] } onClick={ () => router.push('/contacts/contact-requests') }>
                                    <em className='icon-icon-user' style={{ color: 'white', fontSize: 28 }}></em>
                                    {
                                        notifications.contactRequests > 0 && (
                                            <div className={ styles['notification-balloon'] }>
                                                <span>{ notifications.contactRequests }</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className={ styles['notification-wrapper'] }>
                                    <em className='icon-icon-eye' style={{ color: 'white', fontSize: 28 }}></em>
                                    {
                                        notifications.messages > 0 && (
                                            <div className={ styles['notification-balloon'] }>
                                                <span>{ notifications.messages }</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className={ styles['notification-wrapper'] }>
                                    <em className='icon-icon-mail' style={{ color: 'white', fontSize: 28 }}></em>
                                    <div className={ styles['notification-balloon'] }>
                                        <span>38</span>
                                    </div>
                                </div>
                            </div>
                            {
                                showWrite && (
                                    <div
                                        className={ styles['circle-write-desktop'] }
                                        ref={ circleDiv }
                                        onClick={ moveTop }
                                    >
                                        <em className='icon-icon-up' style={{ color: 'white', fontSize: 30 }}></em>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <NavbarMobile />
                    <FooterDesktop />
                </div>
            </div>
        </>
    )
}
