import { useContext, useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { IMessage } from '@/interfaces/message'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'
import { WriteMessage } from '@/components/Inbox/WriteMessage'
import { Messages } from '@/components/Inbox/Messages'
import { Modal } from '@/components/Common/Modal'

// import styles from './inbox.module.css'

const InboxPage: NextPage = () => {
    const { user } = useContext(AuthContext)

    const windowRef = useRef<HTMLDivElement>(null)

    const [messages, setMessages] = useState<IMessage[]>([])
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [messageId, setMessageId] = useState<string | null>(null)

    useEffect(() => {
        if (user) {
            getUserMessages()
        }
    }, [user])

    const getUserMessages = async() => {
        const { data } = await agoraApi.get<IMessage[]>(`/message/get-user-messages?id=${ user?.id }`)
        setMessages(data)
    }

    const handleDelete = async(index: string) => {
        await agoraApi.post('/message/delete-message', { index })
        setConfirmDelete(false)
        setMessageId(null)
        const filter = messages.filter(message => message.index !== index)
        setMessages(filter)
    }

    return (
        <>
            <HomeLoginLayout
                title=''
                pageDescription=''
            >
                <div className={ `window-glass` } ref={ windowRef }>
                    <div className={ `window-glass-content` } style={{ padding: 0, overflow: 'hidden' }}>
                        <WriteMessage />
                        {
                            messages.map(message => (
                                <Messages
                                    key={ message.index }
                                    message={ message }
                                    setMessageId={ setMessageId }
                                    setConfirmDelete={ setConfirmDelete }
                                />
                            ))
                        }
                    </div>
                </div>
            </HomeLoginLayout>
            {
                confirmDelete && (
                    <Modal setError={ setConfirmDelete }>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p>Are you sure you want to delete this message?</p>
                            <div style={{ display: 'flex', gap: 16, marginBlockStart: 20, textAlign: 'end' }}>
                                <button
                                    className='button-filled'
                                    onClick={ () => handleDelete(messageId!) }
                                >Delete</button>
                                <button
                                    className='button-filled'
                                    onClick={ () => {
                                        setMessageId(null)
                                        setConfirmDelete(false)
                                    }}
                                >Cancel</button>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}

export default InboxPage