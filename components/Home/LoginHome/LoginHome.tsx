import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Card } from '../Card/Card'

import styles from './login.module.css'

import userIcon from '../../../public/images/user-icon.svg'
import notificationIcon from '../../../public/images/notification-icons.svg'
import homeIcon from '../../../public/images/home-icon.svg'
import pencilIcon from '../../../public/images/pencil-icon.svg'
import leftArrowIcon from '../../../public/images/left-arrow-icon.svg'

type HideMenu = 'original' | 'hide' | 'show'

export const LoginHome = () => {
    const [hideMenu, setHideMenu] = useState<HideMenu>('original')

    const wrapperRef = useRef<HTMLInputElement>(null)
    const menuHideRef = useRef<HTMLInputElement>(null)
    const circleDiv = useRef<HTMLInputElement>(null)

    useLayoutEffect(() => {
        window.addEventListener('resize', validateScreen)
        window.addEventListener('scroll', circleWrite)

        return () => {
            window.removeEventListener('resize', validateScreen)
            window.removeEventListener('scroll', circleWrite)
        }
    }, [])

    const circleWrite = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100) {
            console.log('bottom')
            circleDiv.current!.style.position = 'absolute'
            circleDiv.current!.style.bottom = '170px'
        } else {
            circleDiv.current!.style.position = 'fixed'
            circleDiv.current!.style.bottom = '70px'
        }
    }

    const validateScreen = () => {
        if (window.screen.width >= 1024) {
            wrapperRef.current!.style.gridTemplateColumns = '236px 1fr 70px'
            wrapperRef.current!.style.gap = '36px'
        } else {
            wrapperRef.current!.style.gridTemplateColumns = '1fr'
            wrapperRef.current!.style.gap = '0'
        }

        if (window.screen.width < 768) {
            wrapperRef.current!.style.paddingInline = '14px'
        } else if (window.screen.width < 1024) {
            wrapperRef.current!.style.paddingInline = '20px'
        } else if (window.screen.width < 1370) {
            wrapperRef.current!.style.paddingInline = '40px'
        } else {
            wrapperRef.current!.style.paddingInline = '20px'
        }

        menuHideRef.current!.style.display = 'none'

        if (window.screen.width >= 1024 && hideMenu === 'original') {
            setHideMenu('original')
        }
    }
    
    const handleToggleMenu = () => {
        if(hideMenu === 'hide') {
            setHideMenu('show')
            setTimeout(() => {
                wrapperRef.current!.style.gridTemplateColumns = '236px 1fr 70px'
                wrapperRef.current!.style.gap = '36px'
                menuHideRef.current!.style.display = 'none'

                if (window.screen.width < 1370) {
                    wrapperRef.current!.style.paddingInline = '40px'
                } else {
                    wrapperRef.current!.style.paddingInline = '20px'
                }
            }, 300)
        } else {
            setHideMenu('hide')
            setTimeout(() => {
                wrapperRef.current!.style.gridTemplateColumns = '1fr'
                wrapperRef.current!.style.gap = '0'
                menuHideRef.current!.style.display = 'flex'
            }, 300)
        }
    }

    return (
        <div className={ styles['home-container'] }>
            <div
                className={ `${ styles['menu-button'] } ${ styles['menu-hide-button'] }` }
                ref={ menuHideRef }
                onClick={ handleToggleMenu }
            >
                <Image src={ leftArrowIcon } alt='left arrow icon' />
            </div>

            <div className={ styles['home-wrapper'] } ref={ wrapperRef }>
                <div className={ styles['menu-container'] }>
                    <div className={ `${ styles['menu-wrapper'] } ${ hideMenu === 'hide' ? styles['hide'] : hideMenu === 'show' ? styles['show'] : '' }` }>
                        <div className={ `window-glass ${ styles['menu-box'] }` }>
                            <div className='window-glass-content' style={{ paddingInline: '16px', paddingBlock: '10px' }}>
                                <ul className={ styles['options-container'] }>
                                    <li className={ `${ styles['option'] } ${ styles['selected'] }` }>
                                        <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> Home
                                    </li>
                                    <li className={ `${ styles['option'] }` }>
                                        <Image src={ homeIcon } alt='home icon' width={ 24 } height={ 24 } /> My page
                                    </li>
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
                <div className={ styles['content-container'] }>
                    <div className={ `${ styles['idea-container'] }` }>
                        <Image
                            src={ userIcon }
                            alt='user icon'
                            className={ styles['user-icon'] }
                        />
                        <input type='text' className={ styles['textfield-idea'] } placeholder='Share your idea with your contacts...' />
                        <Image src={ pencilIcon } alt='pencil icon' className={ styles['pencil-icon'] } />
                    </div>

                    <Card
                        title='Job Opportunity'
                        date='Monday 5th 22:08'
                        info='Nestlé is working on the integration of an application for the purchase and sale of its entire product line. It requires knowledgeable personnel in computer science and design. The integrated project together with Concreto Company will be starting this coming July 2023.'
                        actions={ false }
                    />

                    <Card
                        title='AGORA RECOMMENDS YOU...'
                        info='Information on investment processes with the best security guaranteed.'
                        actions={ false }
                    />

                    <Card
                        title='IAN CURTIS'
                        date='1 minute ago'
                        info='I am very satisfied with Gloria company. It is admirable the professional way they present their work logistics. Undoubtedly, one of the best options to invest.'
                        actions
                    />

                    <Card
                        title='JOHNNY MARR'
                        date='2 hours ago'
                        info='To be constant is to be intelligent.EIt isWe are We are working with the Backus team to bring the best beverages to the whole country at a good price and with a good taste. Soon we will be going abroad to take our product to the world and bring great experiences to their families. One step at a time, one step to success. Thank you Backus'
                        actions
                    />

                    <Card
                        title='RICHARD PAGE'
                        date='Yesterday 22:34'
                        info='I am grateful to be able to work with a great group of entrepreneurs. We are restructuring projects and adjusting details to be able to harvest the ideas well. We are working on the brand image and various launching campaigns that will make our products and services stand out. Our method is singular and collective.'
                        actions
                    />
                    <div className={ styles['circle-write-mobile'] }>

                    </div>
                </div>
                <div className={ styles['notifications'] }>
                    <div className={ styles['notifications-wrapper'] }>
                        <Image
                            src={ notificationIcon }
                            alt='notification icon'
                        />
                    </div>
                    <div className={ styles['circle-write-desktop'] } ref={ circleDiv }>

                    </div>
                </div>
            </div>
        </div>
    )
}
