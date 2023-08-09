import { FC, useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { IUserPosts, IPost, IEntrepreneur, IInvestor, IExpert } from '@/interfaces'
import { Actions } from './Actions'

import { convertTimeZone } from '@/utils'

import styles from './post.module.css'

interface Props {
    post: IUserPosts
}

export const Post: FC<Props> = ({ post }) => {
    const { user } = useContext(AuthContext)

    const date = convertTimeZone(post.post.dateposted!)
    const countComments = post.comments.length

    const [comments, setComments] = useState<IPost[]>([])
    const [data, setData] = useState<IEntrepreneur | null>(null)
    const [comment, setComment] = useState('')

    useEffect(() => {
        setComments(post.comments)
    }, [])

    useEffect(() => {
        if (user) {
            loadData()
        }
    }, [user])

    const loadData = async() => {
        switch (user?.type) {
            case 'E':
                const { data: entrepreneur } = await agoraApi.get<IEntrepreneur>(`/entrepreneur/get-data-by-id?id=${ user.id }`)
                setData(entrepreneur)
                break
            case 'I':
                const { data: investor } = await agoraApi.get<IInvestor>(`/investor/get-data-by-id?id=${ user.id }`)
                setData(investor)
                break
            case 'X':
                const { data: expert } = await agoraApi.get<IExpert>(`/expert/get-data-by-id?id=${ user.id }`)
                setData(expert)
                break
            default:
                break
        }
    }

    const handleComment = async() => {
        if (comment.length > 0) {
            setComment('')

            await agoraApi.post('/wall/save-comment-post', { email: user?.email, index: post.post.index.toString(), body: comment })

            setComments(
                [
                    ...comments,
                    {
                        index: Number(date),
                        body: comment,
                        dateposted: date,
                        companyName: data?.name,
                        likes: 0,
                        profilepic: data?.profilepic
                    }
                ]
            )
        }
    }

    return (
        <div className={ `window-glass` }>
            <div className='window-glass-content' style={{ paddingBlock: '16px', paddingInline: '20px' }}>
                <div className={ styles['post-content'] }>
                    <div className={ styles['post-header'] }>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Image
                                src={ post.post.profilepic! }
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
                            likes={ post.post.likes! }
                            comments={ countComments }
                            response={ false }
                        />
                    </div>

                    {
                        comments.map(comment => (
                            <div key={ comment.index } className={ styles['response-container'] }>
                                <div className={ styles['post-header'] }>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Image
                                            src={ comment.profilepic! }
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
                                        likes={ comment.likes! }
                                        comments={ countComments }
                                        response={ true }
                                    />
                                </div>
                            </div>
                        ))
                    }
                    <div style={{ position: 'relative', inlineSize: '100%' }}>
                        <input
                            type='text'
                            className='textfield'
                            placeholder='Write a comment...'
                            style={{ marginBlockStart: 16, inlineSize: 'calc(100% - 80px)', paddingInlineEnd: 60 }}
                            // onKeyDown={ handleComment }
                            onChange={ (e) => setComment(e.target.value) }
                            value={ comment }
                        />
                        <em
                            className='icon-icon-arrow'
                            style={{ fontSize: 40, position: 'absolute', right: 10, top: 16, cursor: 'pointer' }}
                            onClick={ handleComment }
                        ></em>
                        {/* <Image
                            src='/images/arrow.svg'
                            alt=''
                            title='Send message'
                            width={ 30 }
                            height={ 30 }
                            style={{ position: 'absolute', right: 0 }}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
