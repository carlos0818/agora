import { Dispatch, FC, SetStateAction } from 'react'
import Link from 'next/link'

import { Actions } from './Actions'

import styles from './card.module.css'

interface Props {
    index?: number
    title: string
    date?: string
    info: string
    actions: boolean
    agoraCard?: boolean
    readMore?: boolean
    setCardCloseId?: Dispatch<SetStateAction<number | null>>
}

export const CardInfo: FC<Props> = ({ index, title, date, info, actions, agoraCard = false, readMore = false, setCardCloseId }) => {
    return (
        <div className={ `window-glass` }>
            <div className='window-glass-content' style={{ paddingBlock: '16px', paddingInline: '20px' }}>
                <div className={ styles['card-content'] }>
                    <div className={ styles['card-header'] }>
                        <h4 className={ styles['card-title'] }>{ title }</h4>
                        {
                            agoraCard && (
                                <span
                                    className='popup-close'
                                    onClick={ () => setCardCloseId!(index!) }>✕</span>
                            )
                        }
                    </div>
                    {
                        title && (
                            <span className={ styles['card-date'] }>{ date }</span>
                        )
                    }
                    <p className={ styles['card-info'] }>{ info }</p>
                    <div className={ styles['buttons-container'] }>
                        {
                            readMore ? (
                                <Link
                                    href=''
                                    passHref
                                    prefetch={ false }
                                    legacyBehavior
                                >
                                    <a className='button-filled'>Read more</a>
                                </Link>
                            ) : (
                                <span></span>
                            )
                        }
                        {
                            actions && (
                                <Actions
                                    likes={ 16 }
                                    comments={ 4 }
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
