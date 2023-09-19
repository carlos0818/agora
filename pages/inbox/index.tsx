import { useContext, useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { IMessage, IContact } from '@/interfaces'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'
import { WriteMessage } from '@/components/Inbox/WriteMessage'
import { Messages } from '@/components/Inbox/Messages'
import { Modal } from '@/components/Common/Modal'

const InboxPage: NextPage = () => {
    const { user } = useContext(AuthContext)

    const windowRef = useRef<HTMLDivElement>(null)

    const [messages, setMessages] = useState<IMessage[]>([])
    const [loading, setLoading] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [messageId, setMessageId] = useState<string | null>(null)
    const [selectedContact, setSelectedContact] = useState<any>(null)
    const [sendMessage, setSendMessage] = useState<any>(null)
    const [contacts, setContacts] = useState<IContact[]>([])

    useEffect(() => {
        if (user) {
            getUserMessages()
            getUserContacts()
        }
    }, [user])

    const getUserContacts = async() => {
        const { data } = await agoraApi.get<IContact[]>(`/contact/search-contacts?email=${ user?.email }`)
        setContacts(data)
    }

    const getUserMessages = async() => {
        setLoading(true)
        try {
            const { data } = await agoraApi.get<IMessage[]>(`/message/get-user-messages?id=${ user?.id }`)
            setMessages(data)
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
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
                        <WriteMessage
                            contacts={ contacts }
                            selectedContact={ selectedContact }
                            sendMessage={ sendMessage }
                            setSelectedContact={ setSelectedContact }
                        />
                        {
                            !loading ? (
                                messages.map(message => (
                                    <Messages
                                        key={ message.index }
                                        message={ message }
                                        messages={ messages }
                                        setMessages={ setMessages }
                                        setMessageId={ setMessageId }
                                        setConfirmDelete={ setConfirmDelete }
                                        setSelectedContact={ setSelectedContact }
                                        setSendMessage={ setSendMessage }
                                    />
                                ))
                            ) : (
                                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', paddingBlock: 20 }}>
                                    <em className='spinner blue-agora' style={{ blockSize: 40, inlineSize: 40 }} />
                                </div>
                            )
                        }
                        {
                            messages.length === 0 && (
                                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', paddingBlock: 20 }}>
                                    <p style={{ color: '#10284F' }}>There are no messages yet</p>
                                </div>
                            )
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