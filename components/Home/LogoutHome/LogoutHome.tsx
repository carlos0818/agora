import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import home from './logout.module.css'

import agoralogoShadow from '@/public/images/agoralogo_shadow.png'
import investorImage from '@/public/images/investor-image.png'
import entrepreneurImage from '@/public/images/entrepreneur-image.png'
import expertImage from '@/public/images/expert-image.png'
import backArrow from '@/public/images/back-arrow.png'
import nextArrow from '@/public/images/next-arrow.png'
import psfuLogo from '@/public/images/psfu.png'
import cciasLogo from '@/public/images/ccias.png'
import fsmeLogo from '@/public/images/fsme.png'
import ministeryLogo from '@/public/images/ministery.png'
import adepmeLogo from '@/public/images/adepme.png'
import wfpLogo from '@/public/images/wfp.png'
import uncdfLogo from '@/public/images/uncdf.png'
import amrefLogo from '@/public/images/amref.png'
import buaLogo from '@/public/images/bua.png'
import iccLogo from '@/public/images/icc.png'
import aldeliaLogo from '@/public/images/aldelia.png'

export const LogoutHome = () => {
    const [language, setLanguage] = useState('')

    useEffect(() => {
        getLanguage()
    }, [])

    const getLanguage = async() => {
        const userLang = await navigator.language.substring(0, 2)
        if (userLang === 'fr')
            setLanguage('fr')
        else
            setLanguage('en')
    }

    console.log('LANG:' + language)

    return (
        <>
            <section className={ home['rocket-main'] }>
                <div className={ home['title-container'] }>
                    <Image
                        src={ agoralogoShadow }
                        alt='Agora logo'
                        className={ home['logo-main'] }
                    />
                    <h1 className={ home['rocket-title'] }>Connecting for impact</h1>
                    <h2 className={ home['rocket-subtitle'] }>Capital, innovation and expertise at work</h2>
                </div>
                <div className={ home['account-type-wrapper'] }>
                    <Image src={ backArrow } alt='Previous Arrow' className={ home['arrow'] } />
                    <div className={ home['account-type-container'] }>
                        <Link
                            href='/more-info/investor'
                            passHref
                            prefetch={ false }
                            legacyBehavior
                        >
                            <div className={ home['account-image-container'] }>
                                <div className={ `window-glass ${ home['account-info-container'] }` }>
                                    <p className={ home['account-type-description'] }>
                                        Invest in impact and drive positive change for a better future
                                    </p>
                                    <h3 className={ home['account-type-title'] }>Investor</h3>
                                    <Image
                                        src={ investorImage }
                                        alt='Investor image'
                                        className={ home['type-image'] }
                                    />
                                </div>
                            </div>
                        </Link>
                        <Link
                            href='/more-info/entrepreneur'
                            passHref
                            prefetch={ false }
                            legacyBehavior
                        >
                            <div className={ home['account-image-container'] }>
                                <div className={ `window-glass ${ home['account-info-container'] }` }>
                                    <p className={ home['account-type-description'] }>
                                        Turn your vision into reality with strategic action and bold entrepreneurship
                                    </p>
                                    <h3 className={ home['account-type-title'] }>Entrepreneur</h3>
                                    <Image
                                        src={ entrepreneurImage }
                                        alt='Entrepreneur image'
                                        className={ home['type-image'] }
                                    />
                                </div>
                            </div>
                        </Link>
                        <Link
                            href='/more-info/expert'
                            passHref
                            prefetch={ false }
                            legacyBehavior
                        >
                            <div className={ home['account-image-container'] }>
                                <div className={ `window-glass ${ home['account-info-container'] }` }>
                                    <p className={ home['account-type-description'] }>
                                        Drive innovation and create positive change by sharing your expertise with the world
                                    </p>
                                    <h3 className={ home['account-type-title'] }>Expert</h3>
                                    <Image
                                        src={ expertImage }
                                        alt='Expert image'
                                        className={ home['type-image'] }
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <Image src={ nextArrow } alt='Next Arrow' className={ home['arrow'] } />
                </div>
            </section>
            <section className={ home['what-container'] }>
                <div className={ home['what-wrapper'] }>
                    <div className={ home['what-text-container'] }>
                        <h3 className={ home['what-title'] }>DISCOVER AGORA</h3>
                        <p className={ home['what-description'] }>
                            Agora is a public good launched by the United Nations Capital Development Fund (UNCDF) and supported by like - minded public and private partners.
                            It is designed to bring together investors, entrepreneurs, and experts who are passionate about exploring opportunities and driving economic growth
                            in frontier and emerging economies.
                        </p>
                        <p className={ home['what-description'] }>
                            The platform provides a space for networking, knowledge sharing, and investment opportunities in various sectors. It is completely free to use and
                            offers advantages to all its users, including entrepreneurs showcasing their ideas, investors discovering new opportunities, and experts sharing
                            their valuable insights.
                        </p>
                    </div>
                    {
                        language === 'fr' && (
                            <video className={ home['video'] } controls>
                                <source
                                    src='./videos/welcome_fr.mp4'
                                    type='video/mp4'
                                />
                            </video>
                        )
                    }
                    {
                        language === 'en' && (
                            <video className={ home['video'] } controls>
                                <source
                                    src='./videos/welcome_en.mp4'
                                    type='video/mp4'
                                />
                            </video>
                        )
                    }
                </div>
            </section>
            <section className={ home['supported-container-mobile'] }>
                <h3 className={ home['supported-title'] }>Supported by a partnership of like-minded partner</h3>
                <h4 className={ home['partners-title'] }>National</h4>
                <div className={ home['logos-container'] }>
                    <div className={ home['logos-row'] } style={{ marginBlockStart: 18 }}>
                        <Image src={ psfuLogo } alt='' style={{ width: 140, height: 140 }} />
                        <Image src={ cciasLogo } alt='' style={{ width: 140, height: 140 }} />
                    </div>
                    <div className={ home['logos-row'] } style={{ marginBlockStart: 18 }}>
                        <Image src={ fsmeLogo } alt='' style={{ width: 140, height: 140 }} />
                        <Image src={ ministeryLogo } alt='' style={{ width: 140, height: 140 }} />
                    </div>
                    <div className={ home['logos-row'] } style={{ marginBlockStart: -20 }}>
                        <Image src={ adepmeLogo } alt='' style={{ width: 140, height: 140 }} />
                    </div>
                </div>
                <h4 className={ home['partners-title'] }>International</h4>
                <div className={ home['logos-container'] }>
                    <div className={ home['logos-row'] }>
                        <Image src={ wfpLogo } alt='' style={{ width: 135, height: 135 }} />
                        <Image src={ uncdfLogo } alt='' style={{ width: 135, height: 135 }} />
                    </div>
                    <div className={ home['logos-row'] }>
                        <Image src={ amrefLogo } alt='' style={{ width: 135, height: 135 }} />
                        <Image src={ buaLogo } alt='' style={{ width: 135, height: 135 }} />
                    </div>
                    <div className={ home['logos-row'] }>
                        <Image src={ iccLogo } alt='' style={{ width: 135, height: 135 }} />
                        <Image src={ aldeliaLogo } alt='' style={{ width: 135, height: 135 }} />
                    </div>
                </div>
            </section>
            <section className={ home['supported-container-desktop'] }>
                <h3 className={ home['supported-title'] }>Supported by a partnership of like-minded partner</h3>
                <div className={ home['supported-wrapper-desktop'] }>
                    <div>
                        <h4 className={ home['partners-title'] }>National</h4>
                        <div className={ home['logos-container'] }>
                            <div className={ home['logos-row'] } style={{ marginBlockStart: 18 }}>
                                <Image src={ psfuLogo } alt='' style={{ width: 140, height: 140 }} />
                                <Image src={ cciasLogo } alt='' style={{ width: 140, height: 140 }} />
                                <Image src={ fsmeLogo } alt='' style={{ width: 140, height: 140 }} />
                            </div>
                            <div className={ home['logos-row'] } style={{ marginBlockStart: 18 }}>
                                <Image src={ ministeryLogo } alt='' style={{ width: 140, height: 140 }} />
                                <Image src={ adepmeLogo } alt='' style={{ width: 140, height: 140 }} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className={ home['partners-title'] }>International</h4>
                        <div className={ home['logos-container'] }>
                            <div className={ home['logos-row'] }>
                                <Image src={ wfpLogo } alt='' style={{ width: 135, height: 135 }} />
                                <Image src={ uncdfLogo } alt='' style={{ width: 135, height: 135 }} />
                                <Image src={ amrefLogo } alt='' style={{ width: 135, height: 135 }} />
                            </div>
                            <div className={ home['logos-row'] }>
                                <Image src={ buaLogo } alt='' style={{ width: 135, height: 135 }} />
                                <Image src={ iccLogo } alt='' style={{ width: 135, height: 135 }} />
                                <Image src={ aldeliaLogo } alt='' style={{ width: 135, height: 135 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
