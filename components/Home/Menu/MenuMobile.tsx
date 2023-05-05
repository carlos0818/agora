import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { MenuContext } from '@/context/menu'

import styles from './menu-mobile.module.css'

import homeIcon from '../../../public/images/home-icon.svg'

export const MenuMobile = () => {
    const { isOpen } = useContext(MenuContext)

    console.log(isOpen)

    // ${ isOpen === 'show' ? styles['show'] : isOpen === 'hide' ? styles['hide'] : '' }

    return (
        <div className={ `window-glass ${ styles['menu-container'] } ${ isOpen === 'show' ? styles['show'] : isOpen === 'hide' ? styles['hide'] : '' }` }>
            <div className={ `window-glass-content ${ styles['menu-content'] }` } style={{ paddingBlock: '16px', paddingInline: '20px' }}>
                <ul className={ styles['options-container'] }>
                    <Link
                        href='/'
                        passHref
                        prefetch={ false }
                        legacyBehavior
                    >
                        <li className={ `${ styles['option'] } ${ styles['selected'] }` }>
                            <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Home
                        </li>
                    </Link>
                    <Link
                        href='/my-profile'
                        passHref
                        prefetch={ false }
                        legacyBehavior
                    >
                        <li className={ `${ styles['option'] }` }>
                            <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> My profile
                        </li>
                    </Link>
                    <Link
                        href='/finder/country-snapshot'
                        passHref
                        prefetch={ false }
                        legacyBehavior
                    >
                        <li className={ `${ styles['option'] }` }>
                            <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Finder
                        </li>
                    </Link>
                    <li className={ `${ styles['option'] }` }>
                        <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Contacts
                    </li>
                    <li className={ `${ styles['option'] }` }>
                        <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> My data
                    </li>
                    <li className={ `${ styles['option'] }` }>
                        <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> More info
                    </li>
                </ul>
            </div>
        </div>
    )
}
