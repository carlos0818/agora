import { FC, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'

import { MenuDesktop } from '../Home/Menu/MenuDesktop'
import { MenuMobile } from '../Home/Menu/MenuMobile'
import { NavbarMobile } from '@/components/Navbar/NavbarMobile'

import styles from './homeLoginLayout.module.css'

import notificationIcon from '@/public/images/notification-icons.svg'

interface Props {
    children: JSX.Element
    showWrite?: boolean
}

export const HomeLoginLayout: FC<Props> = ({ children, showWrite = false }) => {
    const wrapperRef = useRef<HTMLInputElement>(null)
    const circleDiv = useRef<HTMLInputElement>(null)

    useLayoutEffect(() => {
        window.addEventListener('scroll', circleWrite)

        return () => {
            window.removeEventListener('scroll', circleWrite)
        }
    }, [])

    const circleWrite = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100) {
            circleDiv.current!.style.position = 'absolute'
            circleDiv.current!.style.bottom = '170px'
        } else {
            circleDiv.current!.style.position = 'fixed'
            circleDiv.current!.style.bottom = '70px'
        }
    }

    return (
        <div className={ styles['home-container'] }>
            <MenuMobile />
            <div className={ styles['home-wrapper'] } ref={ wrapperRef }>
                <MenuDesktop
                    wrapperRef={ wrapperRef }
                />
                <div className={ styles['content-container'] }>
                    { children }
                </div>
                <div className={ styles['notifications'] }>
                    <div className={ styles['notifications-wrapper'] }>
                        <Image
                            src={ notificationIcon }
                            alt='notification icon'
                        />
                    </div>
                    {
                        showWrite && (
                            <div className={ styles['circle-write-desktop'] } ref={ circleDiv }></div>
                        )
                    }
                </div>
            </div>
            <NavbarMobile />
        </div>
    )
}
