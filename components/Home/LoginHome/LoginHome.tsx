import { KeyboardEvent, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { IEntrepreneur, IUserPosts, IWall } from '@/interfaces'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'
import { CardInfo } from '../Card/CardInfo'
import { Post } from '../Card/Post'

import { getCurrentDateFormat } from '@/utils'

import styles from './login.module.css'

export const LoginHome = () => {
    const { user } = useContext(AuthContext)

    const router = useRouter()

    const [agoraMessages, setAgoraMessages] = useState<IWall[]>([])
    const [userPosts, setUserPosts] = useState<IUserPosts[]>([])
    const [cardCloseId, setCardCloseId] = useState<number | null>(null)
    const [post, setPost] = useState('')
    const [data, setData] = useState<IEntrepreneur | null>(null)
    const [hideRocket, setHideRocket] = useState(true)

    useEffect(() => {
        if (user) {
            Promise.all([
                loadAgoraMessages(),
                loadUserPosts(),
            ]).then(() => {
            })
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
        const { data } = await agoraApi.get<IUserPosts[]>(`/wall/user-posts?email=${ user?.email }`)
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

    const handleSavePostClick = () => {
        if (post.length === 0) return

        savePost()
    }

    const handleSavePost = async(event: KeyboardEvent<HTMLInputElement>) => {
        if (post.length === 0) return

        if (event.key === 'Enter') {
            savePost()
        }
    }

    const savePost = async() => {
        await agoraApi.post('/wall/save-user-post', { email: user?.email, body: post })

        const currentDate = getCurrentDateFormat()

        setUserPosts([
            {
                post: {
                    index: Number(currentDate),
                    type: user!.type,
                    companyName: data!.name,
                    fullname: user!.fullname!,
                    profilepic: data!.profilepic,
                    dateposted: currentDate,
                    body: post,
                    likes: 0,
                    indexparent: null,
                    server: false
                },
                comments: [],
                like: false
            },
            ...userPosts
        ])
        setPost('')
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
                        src={ user?.profilepic ? user.profilepic : '/images/user-icon.svg' }
                        alt='user icon'
                        width={ 80 }
                        height={ 80 }
                        className={ styles['user-icon'] }
                    />
                    <div style={{ position: 'relative', inlineSize: '100%' }}>
                        <input
                            type='text'
                            id='txtShare'
                            className={ styles['textfield-idea'] }
                            placeholder='Share your idea with your contacts...'
                            onKeyDown={ handleSavePost }
                            onChange={ (e) => setPost(e.target.value) }
                            value={ post }
                        />
                        <em
                            className={ `icon-icon-arrow ${ styles['arrow-icon'] }` }
                            onClick={ handleSavePostClick }
                        ></em>
                    </div>
                </div>

                {
                    agoraMessages.map(message => (
                        <CardInfo
                            key={ message.index }
                            index={ message.index }
                            title={ message.title }
                            date={ message.dateposted }
                            info={ message.body }
                            agoraCard
                            readMore
                            setCardCloseId={ setCardCloseId }
                        />
                    ))
                }

                <CardInfo
                    title='Agora recommends you...'
                    info='Information on investment processes with the best security guaranteed.'

                />

                {
                    userPosts.map(post => (
                        <Post
                            key={ `${ post.post.index }-${ post.post.dateposted }` }
                            post={ post }
                        />
                    ))
                }
                
                {/* <div className={ styles['circle-write-mobile'] }>
                    <em className='icon-icon-up' style={{ color: 'white', fontSize: 22 }}></em>
                </div> */}
            </>
        </HomeLoginLayout>
    )
}
