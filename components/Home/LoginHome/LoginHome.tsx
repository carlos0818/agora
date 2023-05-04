import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'

import { Card } from '../Card/Card'
import { Menu } from '../Menu/Menu'

import styles from './login.module.css'

import userIcon from '../../../public/images/user-icon.svg'
import notificationIcon from '../../../public/images/notification-icons.svg'
import pencilIcon from '../../../public/images/pencil-icon.svg'

export const LoginHome = () => {
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
            <div className={ styles['home-wrapper'] } ref={ wrapperRef }>
                <Menu
                    wrapperRef={ wrapperRef }
                />

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
