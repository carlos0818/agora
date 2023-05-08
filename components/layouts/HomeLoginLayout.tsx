import { FC, useRef, useLayoutEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { MenuDesktop } from '../Home/Menu/MenuDesktop'
import { MenuMobile } from '../Home/Menu/MenuMobile'
import { Navbar } from '../Navbar/Navbar'
import { NavbarMobile } from '@/components/Navbar/NavbarMobile'
import { FooterDesktop } from '../Footer/FooterDesktop'
import { FooterMobile } from '../Footer/FooterMobile'

import styles from './homeLoginLayout.module.css'

import notificationIcon from '@/public/images/notification-icons.svg'

interface Props {
    children: JSX.Element
    title: string
    pageDescription: string
    showWrite?: boolean
}

export const HomeLoginLayout: FC<Props> = ({ children, title, pageDescription, showWrite = false }) => {
    const wrapperRef = useRef<HTMLInputElement>(null)
    const circleDiv = useRef<HTMLInputElement>(null)

    const [submenu, setSubmenu] = useState(false)

    useLayoutEffect(() => {
        window.addEventListener('scroll', circleWrite)

        return () => {
            window.removeEventListener('scroll', circleWrite)
        }
    }, [])

    const circleWrite = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100) {
            circleDiv.current!.style.position = 'absolute'
            circleDiv.current!.style.bottom = '170px'
        } else {
            circleDiv.current!.style.position = 'fixed'
            circleDiv.current!.style.bottom = '70px'
        }
    }

    return (
        <>
            <div
                onClick={ () => setSubmenu(false) }
            >
                <Head>
                    <title>{ title }</title>
                    <meta name="description" content={ pageDescription } />
                    {/* <meta name="og:title" content={ title } />
                    <meta name="og:description" content={ pageDescription } /> */}
                </Head>
                <nav>
                    <Navbar
                        submenu={ submenu }
                        setSubmenu={ setSubmenu }
                    />
                </nav>
                <div className={ styles['home-container'] }>
                    <MenuMobile />
                    <div className={ styles['home-wrapper'] } ref={ wrapperRef }>
                        <MenuDesktop
                            wrapperRef={ wrapperRef }
                        />
                        <div className={ styles['content-container'] }>
                            { children }
                        </div>
                        <div className={ styles['notifications'] }>
                            <div className={ styles['notifications-wrapper'] }>
                                <Image
                                    src={ notificationIcon }
                                    alt='notification icon'
                                />
                            </div>
                            {
                                showWrite && (
                                    <div className={ styles['circle-write-desktop'] } ref={ circleDiv }></div>
                                )
                            }
                        </div>
                    </div>
                    <NavbarMobile />
                </div>
            </div>
            <FooterDesktop />
            <FooterMobile />
        </>
    )
}