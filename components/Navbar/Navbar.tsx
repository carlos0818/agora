import { FC } from 'react'
import Image from 'next/image'

import styles from './navbar.module.css'

import agoralogo from '../../public/images/agoralogo.png'

export const Navbar: FC = () => {
    return (
        <div className={ styles['container'] }>
            <Image src={ agoralogo } alt='' className={ styles['logo'] } />
            <div className={ styles['buttons-container'] }>
                <a className='button-filled' style={{ fontSize: 15, lineHeight: '16px' }}>Sign Up</a>
                <a className='button-outline' style={{ fontSize: 15, lineHeight: '16px' }}>Log In</a>
            </div>
        </div>
    )
}
