import { FC } from 'react'
import Link from 'next/link'

import style from '../../pages/more-info/more-info.module.css'

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
                    <a className={`button-filled ${ style['button-desktop'] }`}>Sign up as { type }</a>
                </Link>
            </div>
            {/* <div className={ style['container-two'] }>
                <Image
                    src={ type === 'investor' ? investorImage : type === 'entrepreneur' ? entrepreneurImage : expertImage }
                    alt={ type === 'investor' ? 'Investor Image' : type === 'entrepreneur' ? 'Entrepreneur image' : 'Expert image'}
                    className={ style['type-image'] }
                />
                <Link
                    href={ `/signup/${ type }` }
                    passHref
                    prefetch={ false }
                    legacyBehavior
                >
                    <a className={`button-filled ${ style['button-mobile'] }`}>Sign up as { type }</a>
                </Link>
            </div> */}
        </div>
    )
}
