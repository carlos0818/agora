import { useRef } from 'react'
import { NextPage } from 'next'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'
import { WriteMessage } from '@/components/Inbox/WriteMessage'

import styles from './inbox.module.css'
import { Messages } from '@/components/Inbox/Messages'

const InboxPage: NextPage = () => {
    const windowRef = useRef<HTMLDivElement>(null)

    return (
        <HomeLoginLayout
            title=''
            pageDescription=''
        >
            <div className={ `window-glass` } ref={ windowRef }>
                <div className={ `window-glass-content` } style={{ padding: 0, overflow: 'hidden' }}>
                    <WriteMessage />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                </div>
            </div>
        </HomeLoginLayout>
    )
}

export default InboxPage