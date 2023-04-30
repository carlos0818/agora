import Image from 'next/image'
import Link from 'next/link'

import styles from './login.module.css'

import userIcon from '../../public/images/user-icon.svg'
import notificationIcon from '../../public/images/notification-icons.svg'
import homeIcon from '../../public/images/home-icon.svg'
import pencilIcon from '../../public/images/pencil-icon.svg'
import leftArrowIcon from '../../public/images/left-arrow-icon.svg'

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
                            <Image src={ leftArrowIcon } alt='' />
                        </div>
                    </div>
                </div>
                <div className={ styles['content-container'] }>
                    <div className={ `${ styles['idea-container'] }` }>
                        <Image
                            src={ userIcon }
                            alt=''
                            className={ styles['user-icon'] }
                        />
                        <input type='text' className={ styles['textfield-idea'] } placeholder='Share your idea with your contacts...' />
                        <Image src={ pencilIcon } alt='' className={ styles['pencil-icon'] } />
                    </div>

                    <div className={ `window-glass` }>
                        <div className='window-glass-content' style={{ paddingBlock: '16px', paddingInline: '20px' }}>
                            <div className={ styles['card-content'] }>
                                <h4 className={ styles['card-title'] }>Job Opportunity</h4>
                                <span className={ styles['card-date'] }>Monday 5th 22:08</span>
                                <p className={ styles['card-info'] }>
                                    Nestlé is working on the integration of an application for the purchase and sale of its entire product line. It requires
                                    knowledgeable personnel in computer science and design. The integrated project together with Concreto Company will be starting
                                    this coming July 2023.
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'row-reverse', marginBlockStart: '10px' }}>
                                    <Link
                                        href=''
                                        passHref
                                        prefetch={ false }
                                        legacyBehavior
                                    >
                                        <a className={ `button-filled ${ styles['button-style'] }` }>Read more</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={ `window-glass` }>
                        <div className='window-glass-content' style={{ paddingBlock: '16px', paddingInline: '20px' }}>
                            <div className={ styles['card-content'] }>
                                <h4 className={ styles['card-title'] }>AGORA RECOMMENDS YOU...</h4>
                                <span className={ styles['card-date'] }>Monday 5th 22:08</span>
                                <p className={ styles['card-info'] }>
                                    Nestlé is working on the integration of an application for the purchase and sale of its entire product line. It requires
                                    knowledgeable personnel in computer science and design. The integrated project together with Concreto Company will be starting
                                    this coming July 2023.
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'row-reverse', marginBlockStart: '10px' }}>
                                    <Link
                                        href=''
                                        passHref
                                        prefetch={ false }
                                        legacyBehavior
                                    >
                                        <a className={ `button-filled ${ styles['button-style'] }` }>Read more</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
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
