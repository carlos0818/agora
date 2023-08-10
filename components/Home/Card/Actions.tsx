import { FC, useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import styles from './actions.module.css'

import { AuthContext } from '@/context/auth'
import { agoraApi } from '@/api'

interface Props {
    index: number
    likes: number
    comments: number
    response: boolean
    like: boolean
}

export const Actions: FC<Props> = ({ index, likes, like, comments, response }) => {
    const { user } = useContext(AuthContext)

    const [likeState, setLikeState] = useState(false)
    const [likesState, setLikesState] = useState(0)

    useEffect(() => {
        setLikeState(like)
        setLikesState(likes)
    }, [])

    const handleSavePost = async() => {
        await agoraApi.post('/wall/save-like-post', { index: index.toString(), email: user?.email })
        if (likeState) {
            setLikesState(likesState - 1)
        } else {
            setLikesState(likesState + 1)
        }
        setLikeState(!likeState)
    }

    return (
        <div className={ styles['actions-container'] }>
            <div className={ styles['action-wrapper'] }>
                <Image
                    src={ likeState ? '/images/handblue.svg' : '/images/handwhite.svg' }
                    alt='Like icon'
                    width={ 25 }
                    height={ 25 }
                    className={ styles['like-icon'] }
                    title='Likes'
                    onClick={ handleSavePost }
                />
                <span className={ styles['number-action'] }>{ likesState }</span>
            </div>
            {
                !response && (
                    <>
                        <div className={ styles['action-wrapper'] }>
                            <Image
                                src='/images/comment.svg'
                                alt='Comment icon'
                                width={ 25 }
                                height={ 25 }
                                className={ styles['comment-icon'] }
                                title='Comments'
                            />
                            <span className={ styles['number-action'] }>{ comments }</span>
                        </div>
                        {/* <div className={ styles['action-wrapper'] }>
                            <Image
                                src={ messageIcon }
                                alt='Message icon'
                                className={ styles['message-icon'] }
                                title='Message'
                            />
                        </div> */}
                    </>
                )
            }
        </div>
    )
}
