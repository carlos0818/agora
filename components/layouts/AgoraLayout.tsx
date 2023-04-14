import { FC } from 'react'
import Head from 'next/head'

import { Navbar } from '../Navbar/Navbar'

import styles from '../layouts/agoralayout.module.css'

interface Props {
    children: JSX.Element
    title: string
    pageDescription: string
    imageFullUrl?: string
}

export const AgoraLayout: FC<Props> = ({ children, title, pageDescription }) => {
    return (
        <div>
            <Head>
                <title>{ title }</title>
                <meta name="description" content={ pageDescription } />
                {/* <meta name="og:title" content={ title } />
                <meta name="og:description" content={ pageDescription } /> */}
            </Head>
            <nav>
                <Navbar />
            </nav>
            { children }
        </div>
    )
}
