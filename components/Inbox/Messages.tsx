import Image from 'next/image'
import styles from './messages.module.css'

export const Messages = () => {
    return (
        <div className={ styles['messages-container'] }>
            <div className={ `window-glass ${ styles['message-container'] }` }>
                <div className={ styles['info-container'] }>
                    <Image
                        src='/images/user-photo.jpeg'
                        alt=''
                        width={ 80 }
                        height={ 80 }
                        className={ styles['contact-image'] }
                    />
                    <div className={ styles['message-info-container'] }>
                        <div className={ styles['company-date-container'] }>
                            <p>Investor CO</p>
                            <p>23-Dec-2023 1:04 PM</p>
                        </div>
                        <p>Nuevo mensaje de bienvenida ajjahdad hjhkdhadgyefiwegf eyg</p>
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
            </div>
        </div>
    )
}
