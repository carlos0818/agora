import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import style from '../../pages/more-info/more-info.module.css'

import investorImage from '../../public/images/investor-image.png'

interface Props {
    title: string
    subtitle: string
    type: string | undefined
}

export const Section1: FC<Props> = ({ title, subtitle, type }) => {
    return (
        <div className={ style['section-one-container'] }>
            <div className={ style['container-one'] }>
                <div className={ style['info-wrapper'] }>
                    <h3 className={ style['info-title'] }>{ title }</h3>
                    <p className={ style['info-subtitle'] }>{ subtitle }</p>
                </div>
                <Link
                    href={ `/signup/${ type }` }
                    passHref
                    prefetch={ false }
                    legacyBehavior
                >
                    <span className={`button-filled ${ style['button-desktop'] }`}>Sign up as { type }</span>
                </Link>
            </div>
            <div className={ style['container-two'] }>
                <Image src={ investorImage } alt='Investor Image' className={ style['type-image'] } />
                <Link
                    href={ `/signup/${ type }` }
                    passHref
                    prefetch={ false }
                    legacyBehavior
                >
                    <span className={`button-filled ${ style['button-mobile'] }`}>Sign up as { type }</span>
                </Link>
            </div>
        </div>
    )
}
