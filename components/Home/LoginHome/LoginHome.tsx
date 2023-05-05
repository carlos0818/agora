import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'

import { CardInfo } from '../Card/CardInfo'

import styles from './login.module.css'

import userIcon from '../../../public/images/user-icon.svg'
import pencilIcon from '../../../public/images/pencil-icon.svg'
import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'

export const LoginHome = () => {
    return (
        <HomeLoginLayout showWrite>
            <>
                <div className={ `${ styles['idea-container'] }` }>
                    <Image
                        src={ userIcon }
                        alt='user icon'
                        className={ styles['user-icon'] }
                    />
                    <input type='text' className={ styles['textfield-idea'] } placeholder='Share your idea with your contacts...' />
                    <Image src={ pencilIcon } alt='pencil icon' className={ styles['pencil-icon'] } />
                </div>

                <CardInfo
                    title='Job Opportunity'
                    date='Monday 5th 22:08'
                    info='Nestlé is working on the integration of an application for the purchase and sale of its entire product line. It requires knowledgeable personnel in computer science and design. The integrated project together with Concreto Company will be starting this coming July 2023.'
                    actions={ false }
                />

                <CardInfo
                    title='AGORA RECOMMENDS YOU...'
                    info='Information on investment processes with the best security guaranteed.'
                    actions={ false }
                />

                <CardInfo
                    title='IAN CURTIS'
                    date='1 minute ago'
                    info='I am very satisfied with Gloria company. It is admirable the professional way they present their work logistics. Undoubtedly, one of the best options to invest.'
                    actions
                />

                <CardInfo
                    title='JOHNNY MARR'
                    date='2 hours ago'
                    info='To be constant is to be intelligent.EIt isWe are We are working with the Backus team to bring the best beverages to the whole country at a good price and with a good taste. Soon we will be going abroad to take our product to the world and bring great experiences to their families. One step at a time, one step to success. Thank you Backus'
                    actions
                />

                <CardInfo
                    title='RICHARD PAGE'
                    date='Yesterday 22:34'
                    info='I am grateful to be able to work with a great group of entrepreneurs. We are restructuring projects and adjusting details to be able to harvest the ideas well. We are working on the brand image and various launching campaigns that will make our products and services stand out. Our method is singular and collective.'
                    actions
                />
                <div className={ styles['circle-write-mobile'] }></div>
                {/* <div className={ styles['circle-write-desktop'] } ref={ circleDiv }></div> */}
            </>
        </HomeLoginLayout>
    )
}
