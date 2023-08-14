import { Dispatch, FC, SetStateAction, useContext } from 'react'
import Image from 'next/image'

import { agoraApi } from '@/api'
import { IMessage } from '@/interfaces/message'
import { NotificationContext } from '@/context/notification'

import { convertTimeZone } from '@/utils'

import styles from './messages.module.css'

interface Props {
    message: IMessage
    messages: IMessage[]
    setMessages: Dispatch<SetStateAction<IMessage[]>>
    setMessageId: Dispatch<SetStateAction<string | null>>
    setConfirmDelete: Dispatch<SetStateAction<boolean>>
}

export const Messages: FC<Props> = ({ message, messages, setMessages, setMessageId, setConfirmDelete }) => {
    const { notifications, updateNotifications } = useContext(NotificationContext)

    let date = convertTimeZone(message.dateAdded)

    const handleOpenModal = (index: string) => {
        setMessageId(index)
        setConfirmDelete(true)
    }

    const handleReadMessage = async(message: IMessage) => {
        if (message.status === 'S') {
            await agoraApi.post('/message/read-message', { index: message.index })
    
            const newMessages = messages.map(mess => {
                if (message.index === mess.index) {
                    mess.status = 'R'
                }
                return mess
            })
            setMessages(newMessages)
            updateNotifications({ ...notifications, messages: notifications.messages - 1 })
        }
    }

    return (
        <div className={ styles['messages-container'] }>
            <input type="radio" id={ message.index } name="sections" className={ styles['message-input'] } />
            <label
                className={ `window-glass ${ styles['message-container'] }` }
                htmlFor={ message.index }
                onClick={ () => handleReadMessage(message) }
            >
                <div className={ styles['info-container'] }>
                    <Image
                        src={ message.profilepic }
                        alt=''
                        width={ 80 }
                        height={ 80 }
                        className={ styles['contact-image'] }
                    />
                    <div className={ styles['message-info-container'] }>
                        <div className={ styles['company-date-container'] }>
                            <p style={{ fontFamily: message.status === 'S' ? 'ebrima-bold' : 'ebrima' }}>{ message.companyName }</p>
                            <p style={{ fontFamily: message.status === 'S' ? 'ebrima-bold' : 'ebrima' }}>{ date }</p>
                        </div>
                        <p style={{ fontFamily: message.status === 'S' ? 'ebrima-bold' : 'ebrima' }}>{ message.subject }</p>
                    </div>
                </div>
                <div className={ styles['actions-container'] }>
                    {
                        message.important === 1 && (
                            <Image
                                src='/images/important.svg'
                                alt=''
                                width={ 40 }
                                height={ 40 }
                                className={ styles['action-icon'] }
                                title='Important'
                            />
                        )
                    }
                    <Image
                        src='/images/trash.svg'
                        alt=''
                        width={ 40 }
                        height={ 40 }
                        className={ styles['action-icon'] }
                        style={{ cursor: 'pointer' }}
                        title='Delete message'
                        onClick={ () => handleOpenModal(message.index) }
                    />
                </div>
            </label>
            <div className={ styles['message-content'] }>
                <textarea
                    className='textfield'
                    style={{ blockSize: 200, inlineSize: 'calc(100% - 26px)', marginBlockStart: 8 }}
                    defaultValue={ message.body }
                />
            </div>
        </div>
    )
}
