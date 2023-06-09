import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Navbar } from '../Navbar/Navbar'
import { FooterDesktop } from '../Footer/FooterDesktop'

import styles from './homeLoginWithoutMenuLayout.module.css'
import { MenuContext } from '@/context/menu'

interface Props {
    children: JSX.Element
    title: string
    pageDescription: string
    showBack?: boolean
}

export const HomeLoginWithoutMenuLayout: FC<Props> = ({ children, title, pageDescription, showBack = true }) => {
    const { isDarkMode, toggleDarkMode } = useContext(MenuContext)

    const circleDiv = useRef<HTMLInputElement>(null)

    const [submenu, setSubmenu] = useState(false)

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
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100) {
                circleDiv.current.style.position = 'absolute'
                circleDiv.current.style.bottom = '170px'
            } else {
                circleDiv.current.style.position = 'fixed'
                circleDiv.current.style.bottom = '70px'
            }
        }
    }

    return (
        <>
            <div>
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
                    <div className={ styles['home-wrapper'] }>
                        <div className={ styles['content-container'] }>
                            { children }
                        </div>
                        {
                            showBack && (
                                <Link
                                    href='/my-profile'
                                    passHref
                                    prefetch={ false }
                                    legacyBehavior
                                >
                                    <div className={ styles['circle-back'] } ref={ circleDiv }></div>
                                </Link>
                            )
                        }
                    </div>
                    <FooterDesktop />
                </div>
            </div>
        </>
    )
}
