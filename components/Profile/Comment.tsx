import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import styles from './comment.module.css'

import { IComment } from '@/interfaces'
import { convertTimeZone } from '@/utils'

interface Props {
    comment: IComment
}

export const Comment: FC<Props> = ({ comment }) => {
    const router = useRouter()

    let date = comment.dateAdded
    if (comment.server === undefined) {
        date = convertTimeZone(comment.dateAdded!)
    }

    const handleNavigateProfile = (userId: string) => {
        router.push(`/profile/${ userId }`)
    }

    return (
        <div className={ styles['comment-container'] }>
            <div className={ styles['user-image'] } onClick={ () => handleNavigateProfile(comment.id!) }>
                <Image
                    src={ comment.profilepic! }
                    alt=''
                    width={ 90 }
                    height={ 90 }
                    style={{ width: 86, height: 86, backgroundSize: 'cover' }}
                />
            </div>
            <div className={ styles['info-container'] }>
                <p className={ styles['user-name'] } onClick={ () => handleNavigateProfile(comment.id!) }>{ comment.fullname }</p>
                <p className={ styles['date'] }>{ date }</p>
                <p className={ styles['comment'] }>{ comment.body }</p>
            </div>
        </div>
    )
}
