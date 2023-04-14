import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'
import { FooterMobile } from '@/components/Footer/FooterMobile'
import { FooterDesktop } from '@/components/Footer/FooterDesktop'

import investorIcon from '../../public/images/investor-icon.svg'
import entrepreneurIcon from '../../public/images/entrepreneur-icon.svg'
import expertIcon from '../../public/images/expert-icon.svg'

import style from './select-accout.module.css'

const index: FC = () => {
    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <>
                <div className={ style['account-type-content'] }>
                    <h3 className={ style['account-type-title'] }>HOW WOULD YOU LIKE TO JOIN?</h3>
                    <div className={ style['account-type-container'] }>
                        <div className='window-glass' style={{ minInlineSize: 251, maxInlineSize: 270 }}>
                            <div className='window-glass-content'>
                                <div className={ style['content-wrapper'] }>
                                    <p className={ style['account-title'] }>AS INVESTOR</p>
                                    <Image src={ investorIcon } alt='Investor Icon' className={ style['investor-icon'] } />
                                    <p className={ style['account-description'] }>
                                        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
                                        Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.
                                    </p>
                                    <Link
                                        href='/signup/investor'
                                        passHref
                                        prefetch={ false }
                                        legacyBehavior
                                    >
                                        <span className={ `button-filled ${ style['button-text-size'] }` }>More information</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='window-glass' style={{ minInlineSize: 260, maxInlineSize: 270 }}>
                            <div className='window-glass-content'>
                                <div className={ style['content-wrapper'] }>
                                    <p className={ style['account-title'] }>AS ENTREPRENEUR</p>
                                    <Image src={ investorIcon } alt='Investor Icon' className={ style['investor-icon'] } />
                                    <p className={ style['account-description'] }>
                                        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
                                        Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.
                                    </p>
                                    <Link
                                        href='/signup/entrepreneur'
                                        passHref
                                        prefetch={ false }
                                        legacyBehavior
                                    >
                                        <span className={ `button-filled ${ style['button-text-size'] }` }>More information</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='window-glass' style={{ minInlineSize: 251, maxInlineSize: 270 }}>
                            <div className='window-glass-content'>
                                <div className={ style['content-wrapper'] }>
                                    <p className={ style['account-title'] }>AS EXPERT</p>
                                    <Image src={ investorIcon } alt='Investor Icon' className={ style['investor-icon'] } />
                                    <p className={ style['account-description'] }>
                                        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
                                        Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.
                                    </p>
                                    <Link
                                        href='/signup/expert'
                                        passHref
                                        prefetch={ false }
                                        legacyBehavior
                                    >
                                        <span className={ `button-filled ${ style['button-text-size'] }` }>More information</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <FooterMobile />
                <FooterDesktop />
            </>
        </AgoraLayout>
    )
}

export default index