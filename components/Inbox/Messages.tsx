import { Dispatch, FC, SetStateAction, useContext } from 'react'
import Image from 'next/image'

import { agoraApi } from '@/api'
import { IMessage, IContact } from '@/interfaces'
import { NotificationContext } from '@/context/notification'

import { convertTimeZone } from '@/utils'

import styles from './messages.module.css'

interface Props {
    message: IMessage
    messages: IMessage[]
    setMessages: Dispatch<SetStateAction<IMessage[]>>
    setMessageId: Dispatch<SetStateAction<string | null>>
    setConfirmDelete: Dispatch<SetStateAction<boolean>>
    setSelectedContact: Dispatch<SetStateAction<any>>
    setSendMessage: Dispatch<any>
}

export const Messages: FC<Props> = ({ message, messages, setMessages, setMessageId, setConfirmDelete, setSelectedContact, setSendMessage }) => {
    const { notifications, updateNotifications } = useContext(NotificationContext)

    let date = convertTimeZone(message.dateAdded)

    let messageWithFormat = ''

    const convertText = () => {
        messageWithFormat = message.body.replace(/\n/g, "<br />")
        return { __html: messageWithFormat };
    }

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

    const handleForward = (message:IMessage) => {
        setSelectedContact(null)

        setSendMessage({
            subject: `Fwd: ${ message.subject }`,
            body: `

----------------------
${ message.body }`,
            important: message.important,
            pitch: message.pitch
        })
    }

    const handleReply = (message:IMessage) => {
        setSelectedContact({
            companyName: message.companyName,
            email: message.emailcontact,
            fullname: message.fullname,
            profilepic: message.profilepic,
        })

        setSendMessage({
            subject: `Re: ${ message.subject }`,
            body: `

----------------------
${ message.body }`,
            important: message.important,
            pitch: message.pitch
        })
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
                        src='/images/reply.svg'
                        alt=''
                        width={ 40 }
                        height={ 40 }
                        className={ styles['action-icon'] }
                        style={{ cursor: 'pointer' }}
                        title='Reply'
                        onClick={ () => handleReply(message) }
                    />
                    <Image
                        src='/images/forward.svg'
                        alt=''
                        width={ 40 }
                        height={ 40 }
                        className={ styles['action-icon'] }
                        style={{ cursor: 'pointer' }}
                        title='Forward'
                        onClick={ () => handleForward(message) }
                    />
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
                {/* <textarea
                    className='textfield'
                    style={{ blockSize: 200, inlineSize: 'calc(100% - 26px)', marginBlockStart: 8 }}
                    defaultValue={ message.body }
                    readOnly
                    spellCheck={ false }
                /> */}
                <p
                    dangerouslySetInnerHTML={ convertText() }
                    style={{
                        backgroundColor: 'white',
                        blockSize: 200,
                        border: '2px solid #10284F',
                        borderRadius: 6,
                        color: '#10284F',
                        overflowY: 'scroll',
                        paddingBlock: 8,
                        paddingInline: 12,
                    }}
                ></p>
            </div>
        </div>
    )
}
