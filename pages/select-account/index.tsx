import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'

import moneyIcon from '@/public/images/money-icon.svg'

import style from './select-accout.module.css'

const index: NextPage = () => {
    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <div className={ style['account-type-content'] }>
                <h3 className={ style['account-type-title'] }>HOW WOULD YOU LIKE TO JOIN?</h3>
                <div className={ style['account-type-container'] }>
                    <div className='window-glass' style={{ minInlineSize: 251, maxInlineSize: 270 }}>
                        <div className='window-glass-content'>
                            <div className={ style['content-wrapper'] }>
                                <p className={ style['account-title'] }>AS INVESTOR</p>
                                <Image src={ moneyIcon } alt='Investor Icon' className={ style['investor-icon'] } />
                                <p className={ style['account-description'] }>
                                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
                                    Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.
                                </p>
                                <Link
                                    href='/more-info/investor'
                                    passHref
                                    prefetch={ false }
                                    legacyBehavior
                                >
                                    <a className={ `button-filled ${ style['button-text-size'] }` }>
                                        More information
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='window-glass' style={{ minInlineSize: 260, maxInlineSize: 270 }}>
                        <div className='window-glass-content'>
                            <div className={ style['content-wrapper'] }>
                                <p className={ style['account-title'] }>AS ENTREPRENEUR</p>
                                <Image src={ moneyIcon } alt='Investor Icon' className={ style['investor-icon'] } />
                                <p className={ style['account-description'] }>
                                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
                                    Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.
                                </p>
                                <Link
                                    href='/more-info/entrepreneur'
                                    passHref
                                    prefetch={ false }
                                    legacyBehavior
                                >
                                    <a className={ `button-filled ${ style['button-text-size'] }` }>
                                        More information
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='window-glass' style={{ minInlineSize: 251, maxInlineSize: 270 }}>
                        <div className='window-glass-content'>
                            <div className={ style['content-wrapper'] }>
                                <p className={ style['account-title'] }>AS EXPERT</p>
                                <Image src={ moneyIcon } alt='Investor Icon' className={ style['investor-icon'] } />
                                <p className={ style['account-description'] }>
                                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
                                    Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.
                                </p>
                                <Link
                                    href='/more-info/expert'
                                    passHref
                                    prefetch={ false }
                                    legacyBehavior
                                >
                                    <a className={ `button-filled ${ style['button-text-size'] }` }>
                                        More information
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AgoraLayout>
    )
}

export default index