import { FC } from 'react'
import Link from 'next/link'

import styles from './card.module.css'
import { Actions } from './Actions'

interface Props {
    title: string
    date?: string
    info: string
    actions: boolean
}

export const Card: FC<Props> = ({ title, date, info, actions }) => {
    return (
        <div className={ `window-glass` }>
            <div className='window-glass-content' style={{ paddingBlock: '16px', paddingInline: '20px' }}>
                <div className={ styles['card-content'] }>
                    <h4 className={ styles['card-title'] }>{ title }</h4>
                    {
                        title && (
                            <span className={ styles['card-date'] }>{ date }</span>
                        )
                    }
                    <p className={ styles['card-info'] }>{ info }</p>
                    <div className={ styles['buttons-container'] }>
                        <Link
                            href=''
                            passHref
                            prefetch={ false }
                            legacyBehavior
                        >
                            <a className='button-filled'>Read more</a>
                        </Link>
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
