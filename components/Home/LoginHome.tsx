import Image from 'next/image'
import styles from './login.module.css'

import userIcon from '../../public/images/user-icon.svg'
import notificationIcon from '../../public/images/notification-icons.svg'
import homeIcon from '../../public/images/home-icon.svg'
import pencilIcon from '../../public/images/pencil-icon.svg'

export const LoginHome = () => {
    return (
        <div className={ styles['home-container'] }>
            <div className={ styles['home-wrapper'] }>
                <div className={ styles['menu-container'] }>
                    <div className={ styles['menu-wrapper'] }>
                        <div className={ `window-glass ${ styles['menu-box'] }` }>
                            <div className='window-glass-content' style={{ paddingInline: '16px', paddingBlock: '10px' }}>
                                <ul className={ styles['options-container'] }>
                                    <li className={ `${ styles['option'] } ${ styles['selected'] }` }>
                                        <Image src={ homeIcon } alt='' width={ 24 } height={ 24 } /> Home
                                    </li>
                                    <li className={ `${ styles['option'] }` }>
                                        <Image src={ homeIcon } alt='' width={ 24 } height={ 24 } /> My page
                                    </li>
                                    <li className={ `${ styles['option'] }` }>
                                        <Image src={ homeIcon } alt='' width={ 24 } height={ 24 } /> Finder
                                    </li>
                                    <li className={ `${ styles['option'] }` }>
                                        <Image src={ homeIcon } alt='' width={ 24 } height={ 24 } /> Contacts
                                    </li>
                                    <li className={ `${ styles['option'] }` }>
                                        <Image src={ homeIcon } alt='' width={ 24 } height={ 24 } /> My data
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={ `${ styles['menu-button'] }` }>

                        </div>
                    </div>
                </div>
                <div>
                    <div className={ `${ styles['idea-container'] }` }>
                        <Image
                            src={ userIcon }
                            alt=''
                            className={ styles['user-icon'] }
                        />
                        <input type='text' className={ styles['textfield-idea'] } placeholder='Share your idea with your contacts' />
                        <Image src={ pencilIcon } alt='' style={{ position: 'absolute', right: 30, top: 24 }} />
                    </div>
                </div>
                <div className={ styles['notifications'] }>
                    <div className={ styles['notifications-wrapper'] }>
                        <Image
                            src={ notificationIcon }
                            alt=''
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
