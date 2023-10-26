import { FC, useState } from 'react'
import Head from 'next/head'

import { Navbar } from '../Navbar/Navbar'
import { FooterDesktop } from '../Footer/FooterDesktop'
import { FooterMobile } from '../Footer/FooterMobile'

import styles from './agoralayout.module.css'

interface Props {
    children: JSX.Element
    title: string
    pageDescription: string
    imageFullUrl?: string
    home?: boolean
}

export const AgoraLayout: FC<Props> = ({ children, title, pageDescription, home = false }) => {
    const [submenu, setSubmenu] = useState(false)

    return (
        <>
            <div
                className={ !home ? styles['background'] : '' }
                onClick={ () => setSubmenu(false) }
            >
                <Head>
                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
                    <title>{ title }</title>
                    <meta name="description" content={ pageDescription } />
                    <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
                </Head>
                <nav>
                    <Navbar
                        submenu={ submenu }
                        setSubmenu={ setSubmenu }
                    />
                </nav>
                { children }
                <FooterDesktop login={ false } />
            </div>
            <FooterMobile />
        </>
    )
}
