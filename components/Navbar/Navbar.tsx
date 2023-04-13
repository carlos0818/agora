import { FC } from 'react'
import Image from 'next/image'

import styles from './navbar.module.css'

import agoralogo from '../../public/images/agoralogo.png'

export const Navbar: FC = () => {
    return (
        <div className={ styles['container'] }>
            <Image src={ agoralogo } alt='' className={ styles['logo'] } />
            <div className={ styles['buttons-container'] }>
                <a className={ `button-filled ${ styles['button-text-size'] }` }>Sign Up</a>
                <a className={ `button-outline ${ styles['button-text-size'] }` }>Log In</a>
            </div>
        </div>
    )
}
