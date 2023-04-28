import Image from 'next/image'
import styles from './login.module.css'

import userIcon from '../../public/images/user-icon.svg'
import notificationIcon from '../../public/images/notification-icons.svg'

export const LoginHome = () => {
    return (
        <div className={ styles['home-container'] }>
            <div className={ styles['home-wrapper'] }>
                <div className={ styles['menu-container'] }>
                    <div className={ styles['menu-wrapper'] }>
                        <div className={ `window-glass ${ styles['menu-box'] }` }>

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
                        <input type='text' className={ styles['textfield-idea'] } />
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
