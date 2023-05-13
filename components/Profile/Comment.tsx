import { FC } from 'react'
import Image from 'next/image'

import styles from './comment.module.css'

import userPhoto from '@/public/images/user-photo.jpeg'

interface Props {
    name: string
    date: string
    comment: string
}

export const Comment: FC<Props> = ({ name, date, comment }) => {
    return (
        <div className={ styles['comment-container'] }>
            <div className={ styles['user-image'] }>
                <Image
                    src={ userPhoto }
                    alt=''
                    style={{ width: 86, height: 86, backgroundSize: 'cover' }}
                />
            </div>
            <div className={ styles['info-container'] }>
                <p className={ styles['user-name'] }>{ name }</p>
                <p className={ styles['date'] }>{ date }</p>
                <p className={ styles['comment'] }>{ comment }</p>
            </div>
        </div>
    )
}
