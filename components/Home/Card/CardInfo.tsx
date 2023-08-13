import { Dispatch, FC, SetStateAction } from 'react'
import Link from 'next/link'

import styles from './card.module.css'

interface Props {
    index?: number
    info: string
    title: string
    date?: string
    agoraCard?: boolean
    readMore?: boolean
    setCardCloseId?: Dispatch<SetStateAction<number | null>>
}

export const CardInfo: FC<Props> = ({ index, title, date, info, agoraCard = false, readMore = false, setCardCloseId }) => {
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
                    </div>
                </div>
            </div>
        </div>
    )
}
