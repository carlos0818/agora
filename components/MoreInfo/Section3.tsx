import { FC } from 'react'

import style from '../../pages/more-info/more-info.module.css'

interface Props {
    subtitle: string
}

export const Section3: FC<Props> = ({ subtitle }) => {
    return (
        <div className={ style['section-three-container'] }>
            <h3 className={ style['benefits-title'] }>Benefits</h3>
            <p className={ style['benefits-subtitle'] }>{ subtitle }</p>
        </div>
    )
}
