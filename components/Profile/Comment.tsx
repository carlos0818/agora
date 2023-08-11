import { FC } from 'react'
import Image from 'next/image'

import styles from './comment.module.css'

import { IComment } from '@/interfaces'
import { convertTimeZone } from '@/utils'

interface Props {
    comment: IComment
}

export const Comment: FC<Props> = ({ comment }) => {
    let date = comment.dateAdded
    if (comment.server === undefined) {
        date = convertTimeZone(comment.dateAdded!)
    }

    // const date = convertTimeZone(comment.dateAdded)

    return (
        <div className={ styles['comment-container'] }>
            <div className={ styles['user-image'] }>
                <Image
                    src={ comment.profilepic! }
                    alt=''
                    width={ 90 }
                    height={ 90 }
                    style={{ width: 86, height: 86, backgroundSize: 'cover' }}
                />
            </div>
            <div className={ styles['info-container'] }>
                <p className={ styles['user-name'] }>{ comment.fullname }</p>
                <p className={ styles['date'] }>{ date }</p>
                <p className={ styles['comment'] }>{ comment.body }</p>
            </div>
        </div>
    )
}
