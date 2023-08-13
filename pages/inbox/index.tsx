import { useContext, useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { IMessage } from '@/interfaces/message'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'
import { WriteMessage } from '@/components/Inbox/WriteMessage'
import { Messages } from '@/components/Inbox/Messages'

// import styles from './inbox.module.css'

const InboxPage: NextPage = () => {
    const { user } = useContext(AuthContext)

    const windowRef = useRef<HTMLDivElement>(null)

    const [messages, setMessages] = useState<IMessage[]>([])

    useEffect(() => {
        if (user) {
            getUserMessages()
        }
    }, [user])

    const getUserMessages = async() => {
        const { data } = await agoraApi.get<IMessage[]>(`/message/get-user-messages?id=${ user?.id }`)
        setMessages(data)
    }

    return (
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
                            />
                        ))
                    }
                </div>
            </div>
        </HomeLoginLayout>
    )
}

export default InboxPage