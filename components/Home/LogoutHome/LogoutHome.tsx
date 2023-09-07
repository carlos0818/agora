import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import home from './logout.module.css'

import agoralogoShadow from '@/public/images/agoralogo_shadow.png'
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

import investorImage1 from '@/public/images/investor-image1.png'
import entrepreneurImage1 from '@/public/images/entrepreneur-image1.png'
import expertImage1 from '@/public/images/expert-image1.png'

import investorImage2 from '@/public/images/investor-image2.png'
import entrepreneurImage2 from '@/public/images/entrepreneur-image2.png'
import expertImage2 from '@/public/images/expert-image2.png'
import investorImage3 from '@/public/images/investor-image3.png'
import entrepreneurImage3 from '@/public/images/entrepreneur-image3.png'
import expertImage3 from '@/public/images/expert-image3.png'

export const LogoutHome = () => {
    const router = useRouter()

    const [language, setLanguage] = useState('')
    const [setvalueEn, seturlEn] = useState(1)
    const [setvalueEx, seturlEx] = useState(1)
    const [setvalueIn, seturlIn] = useState(1)

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        getLanguage()
        const IntervalID = setInterval(ImgEffect,5000);
        return () => { clearInterval(IntervalID) }
    }, [])

    const ImgEffect = () => {
        const getrandom = () => Math.floor(Math.random() * 3);
        let newIndexIn = getrandom() + 1;
        let newIndexEx = getrandom() + 1;
        let newIndexEn = getrandom() + 1;
        
        seturlEn(newIndexEx)
        seturlEx(newIndexEn)
        seturlIn(newIndexIn)
    }

    const getLanguage = async() => {
        const userLang = await navigator.language.substring(0, 2)
        if (userLang === 'fr')
            setLanguage('fr')
        else
            setLanguage('en')
    }

    const handleVideo = () => {
        if (!videoRef.current?.paused && !videoRef.current?.ended) {
            videoRef.current?.pause()
        } else {
            videoRef.current?.play()
        }
    }

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
                                    { setvalueIn === 1 && ( <Image src={ investorImage1 } alt='Investor image' className={ `${home['type-image']} ${home['image-transition']} ${home['efecto']}` } /> )  }
                                    { setvalueIn === 2 && ( <Image src={ investorImage2 } alt='Investor image' className={ `${home['type-image']} ${home['image-transition']} ${home['efecto']}` } /> )  }
                                    { setvalueIn === 3 && ( <Image src={ investorImage3 } alt='Investor image' className={ `${home['type-image']} ${home['image-transition']} ${home['efecto']}` } /> )  }
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
                                    { setvalueEn === 1 && ( <Image src={ entrepreneurImage1 } alt='Investor image' className={ `${home['type-image']} ${home['image-transition']} ${home['efecto']}` } /> )  }
                                    { setvalueEn === 2 && ( <Image src={ entrepreneurImage2 } alt='Investor image' className={ `${home['type-image']} ${home['image-transition']} ${home['efecto']}` } /> )  }
                                    { setvalueEn === 3 && ( <Image src={ entrepreneurImage3 } alt='Investor image' className={ `${home['type-image']} ${home['image-transition']} ${home['efecto']}` } /> )  }
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
                                    { setvalueEx === 1 && ( <Image src={ expertImage1 } alt='Investor image' className={ `${home['type-image']} ${home['image-transition']} ${home['efecto']}` } /> )  }
                                    { setvalueEx === 2 && ( <Image src={ expertImage2 } alt='Investor image' className={ `${home['type-image']} ${home['image-transition']} ${home['efecto']}` } /> )  }
                                    { setvalueEx === 3 && ( <Image src={ expertImage3 } alt='Investor image' className={ `${home['type-image']} ${home['image-transition']} ${home['efecto']}` } /> )  }
                                </div>
                            </div>
                        </Link>
                    </div>
                    <Image src={ nextArrow } alt='Next Arrow' className={ home['arrow'] } />
                </div>
            </section>
            <section className={ home['meet-container'] }>
                <h3 className={ home['meet-title'] }>Meet the Portfolio</h3>
                <p className={ home['meet-description'] }>
                    Discover a selection of enterprises featured in Agora&lsquo;s portfolio, offering a glimpse into the diverse array of businesses driving innovation
                    and impact within our collaborative ecosystem
                </p>
                <div className={ home['portfolio-container'] }>
                    <div className={ home['portfolio-wrapper'] }>
                        <div className={ home['portfolio-image'] }></div>
                        <h4 className={ home['portfolio-title'] }>Upside Foods</h4>
                        <p className={ home['portfolio-description'] }>Making your favorite food a force for good.</p>
                    </div>
                    <div className={ home['portfolio-wrapper'] }>
                        <div className={ home['portfolio-image'] }></div>
                        <h4 className={ home['portfolio-title'] }>Upside Foods</h4>
                        <p className={ home['portfolio-description'] }>Making your favorite food a force for good.</p>
                    </div>
                    <div className={ home['portfolio-wrapper'] }>
                        <div className={ home['portfolio-image'] }></div>
                        <h4 className={ home['portfolio-title'] }>Upside Foods</h4>
                        <p className={ home['portfolio-description'] }>Making your favorite food a force for good.</p>
                    </div>
                </div>
            </section>
            <section className={ home['what-container'] }>
                <div className={ home['what-wrapper'] }>
                    <div className={ home['what-text-container'] }>
                        <h3 className={ home['what-title'] }>Discover Agora</h3>
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
                    <div className={ `${ home['video-container'] }` }>
                        <div className={ `window-glass ${ home['window-glass'] }` }>
                            {
                                language === 'fr' ? (
                                    <video className={ home['video'] } ref={ videoRef } onClick={ handleVideo }>
                                        <source
                                            src='https://res.cloudinary.com/dp779tmk6/video/upload/v1693061656/SYSVIDEOS/Main/Welcome_to_website_FR_w5r2ao.webm'
                                            type='video/webm'
                                        />
                                    </video>
                                )
                                : language === 'es' ?
                                (
                                    <video className={ home['video'] } ref={ videoRef } onClick={ handleVideo }>
                                        <source
                                            src='https://res.cloudinary.com/dp779tmk6/video/upload/v1693061656/SYSVIDEOS/Main/Welcome_to_website_ESP_wq6bfd.webm'
                                            type='video/webm'
                                        />
                                    </video>
                                )
                                : (
                                    <video className={ home['video'] } ref={ videoRef } onClick={ handleVideo }>
                                        <source
                                            src='https://res.cloudinary.com/dp779tmk6/video/upload/v1693061656/SYSVIDEOS/Main/Welcome_to_website_r8wevo.webm'
                                            type='video/webm'
                                        />
                                    </video>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
            <section className={ home['mission-container'] }>
                <div className={ home['mission-wrapper'] }>
                    <div className={ home['mission-text-wrapper'] }>
                        <p className={ home['mission-title'] }>Mission</p>
                        <p className={ home['mission-description'] }>
                            Connect entrepreneurs from emerging and frontier economies with investors and experts, fostering a dynamic ecosystem that accelerates
                            economic growth and sustainable development.
                        </p>
                    </div>
                    <div className={ home['mission-text-wrapper'] }>
                        <p className={ home['mission-title'] }>Vision</p>
                        <p className={ home['mission-description'] }>
                            Agora envisions a world where entrepreneurship, expertise and capital seamlessly connect, creating a thriving ecosystem of impactful
                            ventures in emerging and frontier economies. Through its digital platform, Agora strives to unlock the full potential of these economies,
                            driving sustainable growth, and empowering entrepreneurs to make a positive and lasting impact on their communities.
                        </p>
                    </div>
                </div>
            </section>
            <section className={ home['community-container'] }>
                <h3 className={ home['community-title'] }>Hear from the community</h3>
                <div className={ home['community-wrapper'] }>
                    <div className={ home['testimonial-container'] }>
                        <p>&quot;I was struggling to find the right investors for my business in Sengal until I joined Agora. The platform&lsquo;s connections
                            and resources opened doors I never thought possible. My companyhas grown exponentially, thanks to Agora support.&quot;
                        </p>
                        <div className={ home['testimonial-image'] }></div>
                        <p className={ home['testimonial-name'] }>Aminata Diop</p>
                        <p className={ home['testimonial-position'] }>Founder & CEO, SenTech Solutions, Senegal</p>
                    </div>
                    <div className={ home['testimonial-container'] }>
                        <p>&quot;As an investor, Agora has been a game-changer for me. The ease of discovering promising ventures, coupled with the platform&lsquo;s
                            data-driven insights, has allowed me to make informed investment decisions that align with my values and goals.&quot;
                        </p>
                        <div className={ home['testimonial-image'] }></div>
                        <p className={ home['testimonial-name'] }>David Reynolds</p>
                        <p className={ home['testimonial-position'] }>Angel Investor, USA</p>
                    </div>
                    <div className={ home['testimonial-container'] }>
                        <p>&quot;Agora represents a new frontier in connecting global expertise and capital with the untapped potential of emerging economies.
                            It&lsquo;s a dynamic intersection where ideas meet investment, innovation sparks transformation, and communities thrive. I&lsquo;m proud to see
                            Agora making a tangible impact and pushing the boundaries of what&lsquo;s possible.&quot;
                        </p>
                        <div className={ home['testimonial-image'] }></div>
                        <p className={ home['testimonial-name'] }>Xavier Michon</p>
                        <p className={ home['testimonial-position'] }>Deputy Executive Secretary, UNCDF, USA</p>
                    </div>
                    <div className={ home['testimonial-container'] }>
                        <p>&quot;Agora has emerged as a valuable bridge that links our institution to a diverse array of entrepreneurs and experts in emerging
                            economies. This platform not only facilitates access to innovative projects and impactful ventures but also enriches our understanding
                            of local contexts. Agora is an invaluable resource that broadens our horizons and enhances our ability to drive positive change across
                            the region.&quot;
                        </p>
                        <div className={ home['testimonial-image'] }></div>
                        <p className={ home['testimonial-name'] }>Sarah Patel</p>
                        <p className={ home['testimonial-position'] }>Manager, Asian Development Bank, Philippines</p>
                    </div>
                    <div className={ home['testimonial-container'] }>
                        <p>&quot;Agora has provided me with a unique opportunity to share my expertise and insights with entrepreneurs from diverse backgrounds.
                            The platform&lsquo;s interactive features and vibrant community enable meaningful engagements that drive mutual learning and growth.&quot;
                        </p>
                        <div className={ home['testimonial-image'] }></div>
                        <p className={ home['testimonial-name'] }>Dr. Li Wei</p>
                        <p className={ home['testimonial-position'] }>Technology Consultant, China</p>
                    </div>
                </div>
            </section>
            <section className={ home['cocreate-container'] }>
                <div className={ home['cocreate-wrapper'] }>
                    {/* <img className={ home['cocreate-image'] } alt="" /> */}
                    <div className={ home['cocreate-image'] }>
                        <h3 className={ home['cocreate-title'] }>Let&apos;s co-create</h3>
                        <p className={ home['cocreate-description'] }>
                            Discover a vibrant ecosystem of innovation at Agora! Connect with us and let&lsquo;s co-create a world of endless posibilities!
                        </p>
                        <button
                            className={ home['cocreate-button'] }
                            onClick={ () => router.push('/cocreation') }
                        >
                            CONTACT US
                        </button>
                    </div>
                </div>
            </section>
            <section className={ home['supported-container-mobile'] }>
                <h3 className={ home['supported-title'] }>Supported by a partnership of like-minded entities</h3>
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
                <h3 className={ home['supported-title'] }>Supported by a partnership of like-minded entities</h3>
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
