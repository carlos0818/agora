import { FC } from 'react'
import Image from 'next/image'

import styles from './actions.module.css'

import likeIcon from '@/public/images/like-icon.svg'
import commentIcon from '@/public/images/comment-icon.svg'
import messageIcon from '@/public/images/message-icon.svg'

interface Props {
    likes: number
    comments: number
}

export const Actions: FC<Props> = ({ likes, comments }) => {
    return (
        <div className={ styles['actions-container'] }>
            <div className={ styles['action-wrapper'] }>
                <Image
                    src={ likeIcon }
                    alt='Like icon'
                    className={ styles['like-icon'] }
                    title='Likes'
                />
                <span className={ styles['number-action'] }>{ likes }</span>
            </div>
            <div className={ styles['action-wrapper'] }>
                <Image
                    src={ commentIcon }
                    alt='Comment icon'
                    className={ styles['comment-icon'] }
                    title='Comments'
                />
                <span className={ styles['number-action'] }>{ comments }</span>
            </div>
            <div className={ styles['action-wrapper'] }>
                <Image
                    src={ messageIcon }
                    alt='Message icon'
                    className={ styles['message-icon'] }
                    title='Message'
                />
            </div>
        </div>
    )
}
