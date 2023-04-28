import { FC, MouseEvent, useState } from 'react'
import Head from 'next/head'

import { Navbar } from '../Navbar/Navbar'
import { IUser } from '@/interfaces'

interface Props {
    children: JSX.Element
    title: string
    pageDescription: string
    imageFullUrl?: string
    user?: IUser
}

export const AgoraLayout: FC<Props> = ({ children, title, pageDescription }) => {
    const [submenu, setSubmenu] = useState(false)

    return (
        <div onClick={ () => setSubmenu(false) }>
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
