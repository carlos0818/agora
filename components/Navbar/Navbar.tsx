import { Dispatch, FC, MouseEvent, SetStateAction, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { AuthContext } from '@/context/auth'

import styles from './navbar.module.css'

import agoralogo from '@/public/images/agoralogo.png'
import userIcon from '@/public/images/user-icon.svg'
import editIcon from '@/public/images/edit-icon.svg'
import signoutIcon from '@/public/images/signout-icon.svg'

interface Props {
    submenu: boolean
    setSubmenu: Dispatch<SetStateAction<boolean>>
}

export const Navbar: FC<Props> = ({ submenu, setSubmenu }) => {
    const { user, logout } = useContext(AuthContext)
    
    const handleClickUserIcon = (ev: MouseEvent) => {
        setSubmenu(!submenu)
        ev.stopPropagation()
    }

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
                {
                    !user
                    ? (
                        <>
                            <Link
                                href='/select-account'
                                passHref
                                prefetch={ false }
                                legacyBehavior
                            >
                                <a className={ `button-filled` }>Sign up</a>
                            </Link>
                            <Link
                                href='/login'
                                passHref
                                prefetch={ false }
                                legacyBehavior
                            >
                                <a className={ `button-outline` }>Log In</a>
                            </Link>
                        </>
                    ) : (
                        <>
                            <span>{ user.firstname } { user.lastname }</span>
                            <Image
                                src={ userIcon }
                                alt=''
                                className={ styles['user-icon'] }
                                onClick={ (ev) => handleClickUserIcon(ev) }
                            />
                        </>
                    )
                }
                {
                    submenu && (
                        <div className={ `window-glass ${ styles['submenu'] }` } onClick={ ev => ev.stopPropagation() }>
                            <div className={ `window-glass-content ${ styles['window-glass-content'] }` }>
                                <ul className={ styles['options-container'] }>
                                    <li>
                                        <Image
                                            src={ editIcon }
                                            alt=''
                                        />
                                        <span>Edit my profile</span>
                                    </li>
                                    <li onClick={ logout }>
                                        <Image
                                            src={ signoutIcon }
                                            alt=''
                                        />
                                        <span>Log out</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
