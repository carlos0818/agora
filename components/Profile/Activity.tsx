import { FC } from 'react'
import styles from './activity.module.css'

interface Props {
    title: string
    date: string
    description: string
}

export const Activity: FC<Props> = ({ title, date, description }) => {
    return (
        <div className={ styles['activity-container'] }>
            <div className={ styles['activity-title-actions-container'] }>
                <p className={ styles['activity-title'] }>{ title }</p>
                <div className={ styles['actions-container-desktop'] }>

                </div>
            </div>
            <p className={ styles['activity-date'] }>{ date }</p>
            <p className={ styles['activity-description'] }>{ description }</p>
            <div className={ styles['actions-container-mobile'] }>

            </div>
        </div>
    )
}
