import { KeyboardEvent, useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'
import { CardInfo } from '../Card/CardInfo'

import { IUserPosts, IWall } from '@/interfaces'

import styles from './login.module.css'

import userIcon from '@/public/images/user-icon.svg'
import pencilIcon from '@/public/images/pencil-icon.svg'
import { convertTimeZone } from '@/utils'

export const LoginHome = () => {
    const { user } = useContext(AuthContext)

    const [agoraMessages, setAgoraMessages] = useState<IWall[]>([])
    const [userPosts, setUserPosts] = useState<IUserPosts[]>([])
    const [cardCloseId, setCardCloseId] = useState<number | null>(null)
    const [post, setPost] = useState('')

    useEffect(() => {
        if(user) {
            loadAgoraMessages()
            loadUserPosts()
        }
    }, [user])

    useEffect(() => {
        if (cardCloseId) {
            closeAgoraCard(cardCloseId)
        }
    }, [cardCloseId])

    const loadAgoraMessages = async() => {
        const { data } = await agoraApi.get<IWall[]>(`/wall/agora-messages?email=${ user?.email }`)
        setAgoraMessages(data)
    }

    const loadUserPosts = async() => {
        const { data } = await agoraApi.get<IUserPosts[]>('/wall/user-posts')
        setUserPosts(data)
    }

    const closeAgoraCard = async(index: number) => {
        try {
            await agoraApi.post('/wall/close-agora-message', { email: user?.email, index })
            const filter = agoraMessages.filter(message => message.index !== index)
            setAgoraMessages(filter)
        } catch (error) {
            
        }
    }

    const handleSavePost = async(event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && post.length > 5) {
            await agoraApi.post('/wall/save-user-post', { email: user?.email, body: post })

            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            const date = new Date()
            const year = date.getFullYear()
            const month = monthNames[date.getMonth()]
            const day = date.getDate()

            setUserPosts([{ index: Number(date), fullname: user!.fullname!, dateposted: `${ day } ${ month } ${ year }`, body: post }, ...userPosts])
            setPost('')
        }
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
                    <input
                        type='text'
                        id='txtShare'
                        className={ styles['textfield-idea'] }
                        placeholder='Share your idea with your contacts...'
                        onKeyDown={ handleSavePost }
                        onChange={ (e) => setPost(e.target.value) }
                        value={ post }
                    />
                    <Image src={ pencilIcon } alt='pencil icon' className={ styles['pencil-icon'] } />
                </div>

                {
                    agoraMessages.map(message => (
                        <CardInfo
                            key={ message.index }
                            index={ message.index }
                            title={ message.title }
                            date={ message.dateposted }
                            info={ message.body }
                            actions={ false }
                            agoraCard
                            readMore
                            setCardCloseId={ setCardCloseId }
                        />
                    ))
                }

                <CardInfo
                    title='Agora recommends you...'
                    info='Information on investment processes with the best security guaranteed.'
                    actions={ false }
                />

                {
                    userPosts.map(post => {
                        const date = convertTimeZone(post.dateposted)

                        return <CardInfo
                            key={ `${ post.index }-${ post.dateposted }` }
                            title={ post.fullname }
                            date={ date }
                            info={ post.body }
                            actions
                        />
                    })
                }
                
                <div className={ styles['circle-write-mobile'] }></div>
            </>
        </HomeLoginLayout>
    )
}
