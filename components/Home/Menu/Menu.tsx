import { FC, RefObject, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from './menu.module.css'

import homeIcon from '../../../public/images/home-icon.svg'
import leftArrowIcon from '../../../public/images/left-arrow-icon.svg'
import { useMenu } from '@/hooks/useMenu'

interface Props {
    wrapperRef: RefObject<HTMLInputElement>
}

export const Menu: FC<Props> = ({ wrapperRef }) => {
    const { hideMenu, menuHideRef, handleToggleMenu } = useMenu(wrapperRef)

    return (
        <>
            <div
                className={ `${ styles['menu-button'] } ${ styles['menu-hide-button'] }` }
                ref={ menuHideRef }
                onClick={ handleToggleMenu }
            >
                <Image src={ leftArrowIcon } alt='left arrow icon' />
            </div>

            <div className={ styles['menu-container'] }>
                <div className={ `${ styles['menu-wrapper'] } ${ hideMenu === 'hide' ? styles['hide'] : hideMenu === 'show' ? styles['show'] : '' }` }>
                    <div className={ `window-glass ${ styles['menu-box'] }` }>
                        <div className='window-glass-content' style={{ paddingInline: '16px', paddingBlock: '10px' }}>
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
                            </ul>
                        </div>
                    </div>
                    <div
                        className={ styles['menu-button'] }
                        onClick={ handleToggleMenu }
                    >
                        <Image src={ leftArrowIcon } alt='left arrow icon' />
                    </div>
                </div>
            </div>
        </>
    )
}
