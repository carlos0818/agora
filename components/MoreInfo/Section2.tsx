import { FC } from 'react'
import Image from 'next/image'

import style from '../../pages/more-info/more-info.module.css'

import infoInvestorImage from '../../public/images/info-investor-image.png'

interface Props {
    type: string | undefined
    paragraph1: string
    paragraph2: string
    paragraph3?: string | undefined
    paragraph4?: string | undefined
    paragraph5?: string | undefined
}

export const Section2: FC<Props> = ({ type, paragraph1, paragraph2, paragraph3, paragraph4, paragraph5 }) => {
    return (
        <div className={ style['section-two-container'] }>
            <div>
                <h3 className={ style['type-title'] }>{ type?.toUpperCase() }</h3>
                <p className={ style['type-subtitle'] }>Unlock growth through frontier market investments</p>
                <p className={ style['type-info'] }>{ paragraph1 }</p>
                <p className={ style['type-info'] }>{ paragraph2 }</p>
                <p className={ style['type-info'] }>{ paragraph3 }</p>
                <p className={ style['type-info'] }>{ paragraph4 }</p>
                {
                    paragraph5 && (
                        <p className={ style['type-info'] }>{ paragraph5 }</p>
                    )
                }
            </div>
            <Image src={ infoInvestorImage } alt='' className={ style['info-image'] } />
        </div>
    )
}
