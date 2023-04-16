import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './navbar.module.css'

import agoralogo from '../../public/images/agoralogo.png'

export const Navbar: FC = () => {
    return (
        <div className={ styles['container'] }>
            <Link
                href='/'
                passHref
                prefetch={ false }
                legacyBehavior
            >
                <Image src={ agoralogo } alt='' className={ styles['logo'] } />
            </Link>
            <div className={ styles['buttons-container'] }>
                <Link
                    href='/select-account'
                    passHref
                    prefetch={ false }
                    legacyBehavior
                >
                    <span className={ `button-filled ${ styles['button-text-size'] }` }>Sign up</span>
                </Link>
                <Link
                    href='/login'
                    passHref
                    prefetch={ false }
                    legacyBehavior
                >
                    <a className={ `button-outline ${ styles['button-text-size'] }` }>Log In</a>
                </Link>
            </div>
        </div>
    )
}
