import { FC } from 'react'
import Image from 'next/image'

import { IMessage } from '@/interfaces/message'

import { convertTimeZone } from '@/utils'

import styles from './messages.module.css'

interface Props {
    message: IMessage
}

export const Messages: FC<Props> = ({ message }) => {
    let date = convertTimeZone(message.dateAdded)

    return (
        <div className={ styles['messages-container'] }>
            <input type="radio" id={ message.index } name="sections" className={ styles['message-input'] } />
            <label className={ `window-glass ${ styles['message-container'] }` } htmlFor={ message.index }>
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
                            <p>{ message.companyName }</p>
                            <p>{ date }</p>
                        </div>
                        <p>{ message.subject }</p>
                    </div>
                </div>
                <div className={ styles['actions-container'] }>
                    <Image
                        src='/images/important.svg'
                        alt=''
                        width={ 40 }
                        height={ 40 }
                        className={ styles['action-icon'] }
                        title='Important'
                    />
                    <Image
                        src='/images/trash.svg'
                        alt=''
                        width={ 40 }
                        height={ 40 }
                        className={ styles['action-icon'] }
                        style={{ cursor: 'pointer' }}
                        title='Delete message'
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
