import { FC, useRef, useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { MenuDesktop } from '../Home/Menu/MenuDesktop'
import { MenuMobile } from '../Home/Menu/MenuMobile'
import { Navbar } from '../Navbar/Navbar'
import { NavbarMobile } from '@/components/Navbar/NavbarMobile'
import { FooterDesktop } from '../Footer/FooterDesktop'

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

    useEffect(() => {
        window.addEventListener('scroll', circleWrite)

        return () => {
            window.removeEventListener('scroll', circleWrite)
        }
    }, [])

    const circleWrite = () => {
        if (circleDiv.current) {
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100) {
                circleDiv.current.style.position = 'absolute'
                circleDiv.current.style.bottom = '170px'
            } else {
                circleDiv.current.style.position = 'fixed'
                circleDiv.current.style.bottom = '70px'
            }
        }
    }

    const moveTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        document.getElementById('txtShare')!.focus();
    }

    return (
        <>
            <div
                style={{ scrollBehavior: 'smooth' }}
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
                                    <div
                                        className={ styles['circle-write-desktop'] }
                                        ref={ circleDiv }
                                        onClick={ moveTop }></div>
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
