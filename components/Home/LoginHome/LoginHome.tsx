import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'
import { CardInfo } from '../Card/CardInfo'

import { IWall } from '@/interfaces'

import styles from './login.module.css'

import userIcon from '@/public/images/user-icon.svg'
import pencilIcon from '@/public/images/pencil-icon.svg'

export const LoginHome = () => {
    const { user } = useContext(AuthContext)

    const [agoraMessages, setAgoraMessages] = useState<IWall[]>([])

    useEffect(() => {
        if(user) {
            loadAgoraMessages()
        }
    }, [user])

    const loadAgoraMessages = async() => {
        const { data } = await agoraApi.get<IWall[]>(`/wall/agora-messages?email=${ user?.email }`)
        setAgoraMessages(data)
    }

    return (
        <HomeLoginLayout
            showWrite
            title=''
            pageDescription=''
        >
            <>
                <div className={ `${ styles['idea-container'] }` }>
                    <Image
                        src={ userIcon }
                        alt='user icon'
                        className={ styles['user-icon'] }
                    />
                    <input type='text' id='txtShare' className={ styles['textfield-idea'] } placeholder='Share your idea with your contacts...' />
                    <Image src={ pencilIcon } alt='pencil icon' className={ styles['pencil-icon'] } />
                </div>

                {
                    agoraMessages.map(message => (
                        <CardInfo
                            key={ message.index }
                            title={ message.title }
                            date={ message.dateposted }
                            info={ message.body }
                            actions={ false }
                        />
                    ))
                }

                <CardInfo
                    title='Agora recommends you...'
                    info='Information on investment processes with the best security guaranteed.'
                    actions={ false }
                />

                <CardInfo
                    title='Ian Curtis'
                    date='1 minute ago'
                    info='I am very satisfied with Gloria company. It is admirable the professional way they present their work logistics. Undoubtedly, one of the best options to invest.'
                    actions
                />

                <CardInfo
                    title='Johnny Marr'
                    date='2 hours ago'
                    info='To be constant is to be intelligent.EIt isWe are We are working with the Backus team to bring the best beverages to the whole country at a good price and with a good taste. Soon we will be going abroad to take our product to the world and bring great experiences to their families. One step at a time, one step to success. Thank you Backus'
                    actions
                />

                <CardInfo
                    title='Richard Page'
                    date='Yesterday 22:34'
                    info='I am grateful to be able to work with a great group of entrepreneurs. We are restructuring projects and adjusting details to be able to harvest the ideas well. We are working on the brand image and various launching campaigns that will make our products and services stand out. Our method is singular and collective.'
                    actions
                />
                <div className={ styles['circle-write-mobile'] }></div>
            </>
        </HomeLoginLayout>
    )
}
