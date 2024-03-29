import { FC } from 'react'
import Image from 'next/image'

import style from '../../pages/more-info/more-info.module.css'

import investorImage from '@/public/images/inv-main.png'
import entrepreneurImage from '@/public/images/entre-main.png'
import expertImage from '@/public/images/exp-main.png'

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
                <h3 className={ style['type-title'] }>{ type === 'investor' ? 'Investor' : type === 'entrepreneur' ? 'Entrepreneur' : 'Expert' }</h3>
                <p className={ style['type-subtitle'] }>
                    {
                        type === 'investor' || type === 'entrepreneur'
                        ? 'Unlock growth through frontier market investments'
                        : 'Make an impact with the pro-bono expert journey'
                    }
                </p>
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
            <Image
                src={ type === 'investor' ? investorImage : type === 'entrepreneur' ? entrepreneurImage : expertImage }
                alt={ type === 'investor' ? 'Investor Image' : type === 'entrepreneur' ? 'Entrepreneur image' : 'Expert image'}
                className={ style['type-image'] }
            />
        </div>
    )
}
