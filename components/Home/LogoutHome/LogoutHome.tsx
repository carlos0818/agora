import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css' 
// import 'slick-carousel/slick/slick-theme.css'

import home from './logout.module.css'

import agoralogoShadow from '@/public/images/agoralogo_shadow.png'
import backArrow from '@/public/images/back-arrow.png'
import backArrowWhite from '@/public/images/back-arrow-white.png'
import nextArrow from '@/public/images/next-arrow.png'
import nextArrowWhite from '@/public/images/next-arrow-white.png'
// import psfuLogo from '@/public/images/psfu.png'
// import cciasLogo from '@/public/images/ccias.png'
// import fsmeLogo from '@/public/images/fsme.png'
// import ministeryLogo from '@/public/images/ministery.png'
// import adepmeLogo from '@/public/images/adepme.png'
// import wfpLogo from '@/public/images/wfp.png'
// import uncdfLogo from '@/public/images/uncdf.png'
// import amrefLogo from '@/public/images/amref.png'
// import buaLogo from '@/public/images/bua.png'
// import iccLogo from '@/public/images/icc.png'
// import aldeliaLogo from '@/public/images/aldelia.png'

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

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: <Image src={ backArrow } alt='Next Arrow' className={ `${ home['arrow2'] } ${ home['prev-community'] }` } />,
        nextArrow: <Image src={ nextArrow } alt='Previous Arrow' className={ `${ home['arrow2'] } ${ home['prev-community'] }` } />,
        responsive: [
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    }

    const settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: <Image src={ backArrowWhite } alt='Next Arrow' className={ `${ home['arrow2'] } ${ home['prev-community'] }` } />,
        nextArrow: <Image src={ nextArrowWhite } alt='Previous Arrow' className={ `${ home['arrow2'] } ${ home['prev-community'] }` } />,
        responsive: [
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    }

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
                {/* <h4 className={ home['meet-subtitle'] }>Take a glimpse at some of enterprises in our portfolio</h4> */}
                <p className={ home['meet-description'] }>
                    Discover a selection of enterprises featured in Agora&lsquo;s portfolio, offering a glimpse into the diverse array of businesses driving innovation
                    and impact within our collaborative ecosystem
                </p>
                <div className={ home['portfolio-container'] }>
                    <Slider {... settings2} className={ home['custom-slider'] } useCSS>
                        <div className={ home['portfolio-wrapper'] }>
                            <Image
                                src='/images/washy.jpg'
                                className={ home['portfolio-image'] }
                                alt=''
                                width={ 500 }
                                height={ 331 }
                            />
                            <h4 className={ home['portfolio-title'] }>WashyWash</h4>
                            <p style={{ color: 'white', fontFamily: 'ebrima-bold', marginBlockEnd: 8 }}>Jordan</p>
                            <p className={ home['portfolio-description'] }>WashyWash is an eco-friendly on-demand cleaning app, revolutionizing both the customer experience and industry standards. Initially focused on garment cleaning, our vision is to introduce diverse cleaning services on a single platform. We are dedicated to replacing outdated PERC-Dryclean with innovative EcoClean technology, reshaping global laundry practices.</p>
                        </div>
                        <div className={ home['portfolio-wrapper'] }>
                            <Image
                                src='/images/voss.jpg'
                                className={ home['portfolio-image'] }
                                alt=''
                                width={ 500 }
                                height={ 331 }
                            />
                            <h4 className={ home['portfolio-title'] }>VOSS Consulting</h4>
                            <p style={{ color: 'white', fontFamily: 'ebrima-bold', marginBlockEnd: 8 }}>Togo</p>
                            <p className={ home['portfolio-description'] }>VOSS Consulting specializes in providing comprehensive training, coaching, and personal development services, focusing on leadership development, and utilizing Maxwell Leadership resources within the Francophone community. Our core mission is to guide and empower individuals who aspire to enhance their personal growth and unlock their full potential.</p>
                        </div>
                        <div className={ home['portfolio-wrapper'] }>
                            <Image
                                src='/images/honeypride.jpg'
                                className={ home['portfolio-image'] }
                                alt=''
                                width={ 500 }
                                height={ 331 }
                            />
                            <h4 className={ home['portfolio-title'] }>Honey Pride Arua (HPA)</h4>
                            <p style={{ color: 'white', fontFamily: 'ebrima-bold', marginBlockEnd: 8 }}>Uganda</p>
                            <p className={ home['portfolio-description'] }>HPA specializes in apiculture, including beekeeping and honey processing, offering liquid honey, beeswax, and bee propolis. Our services include training farmers, providing technical support, modern hives, and a reliable honey market. Our goal is to lead in sustainable beehive product production in the Great Lakes Region, benefiting farmers economically and environmentally.</p>
                        </div>
                        <div className={ home['portfolio-wrapper'] }>
                            <Image
                                src='/images/paygas.jpg'
                                className={ home['portfolio-image'] }
                                alt=''
                                width={ 500 }
                                height={ 331 }
                            />
                            <h4 className={ home['portfolio-title'] }>PayGas</h4>
                            <p style={{ color: 'white', fontFamily: 'ebrima-bold', marginBlockEnd: 8 }}>South Africa</p>
                            <p className={ home['portfolio-description'] }>PayGas is a pioneering tech-driven LPG retailer committed to serving low-income clients. Our unique cashless technology empowers customers to refill their gas cylinders with the precise amount they can afford. By revolutionizing the conventional cylinder swapping process with cashless micro refills, we actively combat deforestation caused by wood fuel usage in low-income households.</p>
                        </div>
                        <div className={ home['portfolio-wrapper'] }>
                            <Image
                                src='/images/carad.jpg'
                                className={ home['portfolio-image'] }
                                alt=''
                                width={ 500 }
                                height={ 331 }
                            />
                            <h4 className={ home['portfolio-title'] }>Carad Labs</h4>
                            <p style={{ color: 'white', fontFamily: 'ebrima-bold', marginBlockEnd: 8 }}>Senegal</p>
                            <p className={ home['portfolio-description'] }>Carad Labs is a leading food engineering platform, supporting agri-food businesses in optimizing performance and risk management. We adhere to QHSE guidelines, ISO standards, and legal regulations. Our services include sensory analysis, industrial consulting, training, R&D, and laboratory analytics. We empower businesses to thrive in the agri-food industry.</p>
                        </div>
                    </Slider>
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
                        <div className={ `window-glass ${ home['window-glass'] }` } style={{ overflow: 'hidden' }}>
                            {
                                language === 'fr' ? (
                                    <video className={ home['video'] } ref={ videoRef } onClick={ handleVideo }>
                                        <source
                                            src='https://res.cloudinary.com/dp779tmk6/video/upload/v1694707811/SYSVIDEOS/Main/Welcome_to_website_FR.webm'
                                            type='video/webm'
                                        />
                                    </video>
                                )
                                : language === 'es' ?
                                (
                                    <video className={ home['video'] } ref={ videoRef } onClick={ handleVideo }>
                                        <source
                                            src='https://res.cloudinary.com/dp779tmk6/video/upload/v1694707813/SYSVIDEOS/Main/Welcome_to_website_ES.webm'
                                            type='video/webm'
                                        />
                                    </video>
                                )
                                : (
                                    <video
                                        className={ home['video'] }
                                        ref={ videoRef }
                                        onClick={ handleVideo }
                                        poster='https://res.cloudinary.com/dp779tmk6/image/upload/v1698108973/SYSVIDEOS/Main/videoprev_nspwsj.jpg'
                                    >
                                        <source
                                            src='https://res.cloudinary.com/dp779tmk6/video/upload/v1698108173/SYSVIDEOS/Main/welcomeEN_iaknwg.mov'
                                            type='video/quicktime'
                                        />
                                        <source
                                            src='https://res.cloudinary.com/dp779tmk6/video/upload/v1694707813/SYSVIDEOS/Main/Welcome_to_website_EN.webm'
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
            <section className={ home['community-container'] } style={{ position: 'relative' }}>
                <h3 className={ home['community-title'] }>Hear from the community</h3>
                <div className={ home['community-wrapper'] }>
                    <Slider {... settings} className={ home['custom-slider'] } useCSS>
                        <div className={ home['testimonial-container'] }>
                            <p>&quot;Agora has been a helpful addition to our toolkit, complementing what ADEPME already has in place to support SME development. The platform
                                facilitates connections with investors and experts globally, enriching our local support ecosystem for entrepreneurs. It is a valuable resource
                                in our mission to empower SMEs and foster economic growth in Senegal.&quot;
                            </p>
                            <Image
                                src='/images/Idrissa.jpg'
                                alt=''
                                width={ 50 }
                                height={ 50 }
                                className={ home['testimonial-image'] }
                            />
                            <p className={ home['testimonial-name'] }>Idrissa Diabira</p>
                            <p className={ home['testimonial-position'] }>CEO, Development Agency and Supervision of Small and Medium Enterprises (ADEPME)</p>
                        </div>
                        <div className={ home['testimonial-container'] }>
                            <p>&quot;Business Africa sees tremendous potential in Agora to connect African entrepreneurs with the capital and expertise they need
                                to thrive. Agora&lsquo;s innovative platform provides a unique opportunity for our members to access global networks and resources,
                                opening doors to previously untapped growth possibilities. We believe that Agora will play a pivotal role in advancing the African
                                business landscape and promoting economic development across the continent.&quot;
                            </p>
                            <Image
                                src='/images/Jackeline.jpg'
                                alt=''
                                width={ 50 }
                                height={ 50 }
                                className={ home['testimonial-image'] }
                            />
                            <p className={ home['testimonial-name'] }>Jacqueline Mugo</p>
                            <p className={ home['testimonial-position'] }>Secretary-General, Business Africa</p>
                        </div>
                        <div className={ home['testimonial-container'] }>
                            <p>&quot;Agora offers a distinct bridge between legal expertise and businesses in emerging and frontier markets. This platform opens up new avenues
                                for law firms like ours to connect with enterprises seeking legal guidance, fostering collaborative relationships that can drive growth and
                                sustainable development. Agora&lsquo;s interactive features and global reach make it an attractive resource for legal professionals and businesses
                                alike.&quot;
                            </p>
                            <Image
                                src='/images/Benedetta.jpg'
                                alt=''
                                width={ 50 }
                                height={ 50 }
                                className={ home['testimonial-image'] }
                            />
                            <p className={ home['testimonial-name'] }>Benedetta Audia</p>
                            <p className={ home['testimonial-position'] }>Partner and Chair International Development Practice, DLA Piper</p>
                        </div>
                        <div className={ home['testimonial-container'] }>
                            <p>&quot;Through Agora, we have discovered innovative ways to connect with investors, experts, and a diverse array of potential partners.
                                Its valuable connections and resources have been instrumental in accessing new opportunities. With Agora&lsquo;s support, we are confident
                                that our company can continue to explore avenues for steady growth.&quot;
                            </p>
                            <Image
                                src='/images/Simon.jpg'
                                alt=''
                                width={ 50 }
                                height={ 50 }
                                className={ home['testimonial-image'] }
                            />
                            <p className={ home['testimonial-name'] }>Simon Schwall</p>
                            <p className={ home['testimonial-position'] }>CEO, OKO Finance</p>
                        </div>
                        <div className={ home['testimonial-container'] }>
                            <p>&quot;Utilizing Agora positively impacted our investment approach. Its intuitive interface and data-driven insights allow us to discover
                                promising ventures and make informed investment choices. Agora&lsquo;s innovative approach to connecting investors and entrepreneurs in emerging
                                and frontier markets aligns perfectly with our goals, broadening the horizons of investment possibilities for the economic development of
                                West Africa.&quot;
                            </p>
                            <Image
                                src='/images/Mathieu.jpg'
                                alt=''
                                width={ 50 }
                                height={ 50 }
                                className={ home['testimonial-image'] }
                            />
                            <p className={ home['testimonial-name'] }>Mathieu Soglonou</p>
                            <p className={ home['testimonial-position'] }>Managing Director, Confederation of Financial Institutions of West Africa (CIF)</p>
                        </div>
                        <div className={ home['testimonial-container'] }>
                            <p>&quot;Agora represents a new frontier in connecting global expertise and capital with the untapped potential of emerging and frontier
                                economies. It is a dynamic intersection where ideas meet investment, innovation sparks transformation, and communities thrive. At UNCDF,
                                we are proud to see Agora making a tangible impact and pushing the boundaries of what is possible.&quot;
                            </p>
                            <Image
                                src='/images/Michon.jpg'
                                alt=''
                                width={ 50 }
                                height={ 50 }
                                className={ home['testimonial-image'] }
                            />
                            <p className={ home['testimonial-name'] }>Xavier Michon</p>
                            <p className={ home['testimonial-position'] }>Deputy Executive Secretary, United Nations Capital Development Fund (UNCDF)</p>
                        </div>
                        <div className={ home['testimonial-container'] }>
                            <p>&quot;Agora offers a unique opportunity to catalyze entrepreneurship in the CEMAC region. This platform can play a pivotal role in
                                connecting our vibrant ecosystem of entrepreneurs with the resources they need to thrive. With Agora&lsquo;s support, we can foster collaboration,
                                share knowledge, and unlock new avenues for growth. This initiative aligns with our commitment to nurturing innovation and sustainable
                                economic development in the CEMAC region.&quot;
                            </p>
                            <Image
                                src='/images/richard.jpg'
                                alt=''
                                width={ 50 }
                                height={ 50 }
                                className={ home['testimonial-image'] }
                            />
                            <p className={ home['testimonial-name'] }>Richard Zogo Ekassi</p>
                            <p className={ home['testimonial-position'] }>Advisor, Economic and Monetary Community of Central Africa (CEMAC)</p>
                        </div>
                        <div className={ home['testimonial-container'] }>
                            <p>&quot;SMEs around the world, but particularly in emerging and frontier markets, are at a disadvantage when it comes to accessing finance
                                and other assistance. Agora can level the playing field by providing a high-profile tool that will help focus on SMEs that are largely
                                overlooked in the capital markets. Agora can inspire a wave of tools that will help these SMEs better compete for capital with larger
                                enterprises.&quot;
                            </p>
                            <Image
                                src='/images/Gabriel.jpg'
                                alt=''
                                width={ 50 }
                                height={ 50 }
                                className={ home['testimonial-image'] }
                            />
                            <p className={ home['testimonial-name'] }>Gabriel Petrus</p>
                            <p className={ home['testimonial-position'] }>Head of Global Relations, International Chamber of Commerce (ICC)</p>
                        </div>
                        <div className={ home['testimonial-container'] }>
                            <p>&quot;Agora offers a distinctive platform for the provision of customized knowledge to businesses on a pro bono basis. Through its
                                interactive features and dynamic community, the platform fosters meaningful engagements to support shared learning and foster collective
                                growth among entrepreneurs from various backgrounds.&quot;
                            </p>
                            <Image
                                src='/images/Nyagaka.jpg'
                                alt=''
                                width={ 50 }
                                height={ 50 }
                                className={ home['testimonial-image'] }
                            />
                            <p className={ home['testimonial-name'] }>Nyagaka Ongeri</p>
                            <p className={ home['testimonial-position'] }>CEO, Ubora Advisors</p>
                        </div>
                    </Slider>
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
                <Image
                    src='https://res.cloudinary.com/dp779tmk6/image/upload/v1695845850/SYSPICS/logosp.jpg'
                    alt=''
                    width={ 1200 }
                    height={ 698 }
                    style={{ marginBlockStart: 50, inlineSize: '100%', maxInlineSize: 1200, blockSize: 'auto' }}
                />
                {/* <h4 className={ home['partners-title'] }>National</h4>
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
                </div> */}
            </section>
            <section className={ home['supported-container-desktop'] }>
                <h3 className={ home['supported-title'] }>Supported by a partnership of like-minded entities</h3>
                <h5 className={ home['supported-subtitle'] }>
                    Meet partners, united by shared values, who amplify Agora&lsquo;s impact by championing the mission to connect entrepreneurs from
                    emerging and frontier economies with the needed capital and expertise.
                </h5>
                <Image
                    src='https://res.cloudinary.com/dp779tmk6/image/upload/v1695845850/SYSPICS/logosp.jpg'
                    alt=''
                    width={ 1200 }
                    height={ 698 }
                    style={{ marginBlockStart: 50, inlineSize: '100%', maxInlineSize: 1200, blockSize: 'auto' }}
                />
                {/* <div className={ home['supported-wrapper-desktop'] }>
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
                </div> */}
            </section>
        </>
    )
}
