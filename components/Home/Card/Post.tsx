import { FC } from 'react'

import { IUserPosts } from '@/interfaces'
import { Actions } from './Actions'

import styles from './post.module.css'
import Image from 'next/image'

import { convertTimeZone } from '@/utils'

interface Props {
    post: IUserPosts
}

export const Post: FC<Props> = ({ post }) => {
    const date = convertTimeZone(post.post.dateposted)
    const countComments = post.comments.length

    return (
        <div className={ `window-glass` }>
            <div className='window-glass-content' style={{ paddingBlock: '16px', paddingInline: '20px' }}>
                <div className={ styles['post-content'] }>
                    <div className={ styles['post-header'] }>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Image
                                src={ post.post.profilepic }
                                alt=''
                                width={ 60 }
                                height={ 60 }
                                className={ styles['profile-pic'] }
                            />
                            <div className={ styles['container-names-pic'] }>
                                <div className={ styles['container-names'] }>
                                    <h4 className={ styles['post-company-name'] }>{ post.post.companyName }</h4>
                                    <p className={ styles['post-fullname'] }>by { post.post.fullname }</p>
                                </div>
                                <span className={ styles['post-date'] }>{ date }</span>
                            </div>
                        </div>
                    </div>
                    <p className={ styles['post-info'] }>{ post.post.body }</p>
                    <div className={ styles['buttons-container'] }>
                        <Actions
                            likes={ post.post.likes }
                            comments={ countComments }
                            response={ false }
                        />
                    </div>

                    {
                        post.comments.map(comment => (
                            <div className={ styles['response-container'] }>
                                <div className={ styles['post-header'] }>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Image
                                            src={ comment.profilepic }
                                            alt=''
                                            width={ 60 }
                                            height={ 60 }
                                            className={ styles['profile-pic'] }
                                        />
                                        <div className={ styles['container-names-pic'] }>
                                            <div className={ styles['container-names'] }>
                                                <h4 className={ styles['post-company-name'] }>{ comment.companyName }</h4>
                                                <p className={ styles['post-fullname'] }>by { comment.fullname }</p>
                                            </div>
                                            <span className={ styles['post-date'] }>{ date }</span>
                                        </div>
                                    </div>
                                </div>
                                <p className={ styles['post-info'] }>{ comment.body }</p>
                                <div className={ styles['buttons-container'] }>
                                    <Actions
                                        likes={ comment.likes }
                                        comments={ countComments }
                                        response={ true }
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
