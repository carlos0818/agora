import { FC, useState } from 'react'
import Head from 'next/head'

import { Navbar } from '../Navbar/Navbar'

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
        <div
            className={ !home ? styles['background'] : '' }
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
            { children }
        </div>
    )
}
