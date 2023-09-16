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
import nextArrow from '@/public/images/next-arrow.png'
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
    }

    const [language, setLanguage] = useState('')
    const [setvalueEn, seturlEn] = useState(1)
    const [setvalueEx, seturlEx] = useState(1)
    const [setvalueIn, seturlIn] = useState(1)
    const [screenWidth, setScreenWidth] = useState(0)

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        setScreenWidth(screen.width)
        const url = window.location.href
        const split = url.split('#')
        if (split[1]) {
            window.location.href = split[0]
        }
    }, [])

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

    const communitySlide = (type: string) => {
        const totalPages = document.getElementsByClassName('community-page')
        const url = window.location.href
        const anchor = url.substring(url.indexOf("#")+1)
        const page = anchor.split('_')[1] ? Number(anchor.split('_')[1]) : 1

        if(page > 1 && type === 'prev') {
            window.location.href = '#page_' + (page - 1)
        }

        if (page < totalPages.length && type === 'next') {
            window.location.href = '#page_' + (page + 1)
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
                        <Image
                            src='/images/washy.jpg'
                            className={ home['portfolio-image'] }
                            alt=''
                            width={ 500 }
                            height={ 331 }
                        />
                        <h4 className={ home['portfolio-title'] }>WashyWash</h4>
                        <p className={ home['portfolio-description'] }>WashyWash is an eco-friendly on-demand cleaning service app focused on delivering professional cleaning services to clients at their locations. The goal is to transform the customer experience by innovating both the front and back ends of the cleaning industry. While initially specializing in garment cleaning, our vision is to expand and introduce various cleaning services, all accessible through a single platform. WashyWash is dedicated to reshaping global laundry practices, replacing the outdated PERC-Dryclean system with the cutting-edge EcoClean technology.</p>
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
                        <p className={ home['portfolio-description'] }>VOSS Consulting is a Togolese sole proprietorship founded in October 2021. We specialize in providing comprehensive training, coaching, and personal development services, focusing on leadership development, and utilizing Maxwell Leadership resources within the Francophone community. Our core mission is to guide and empower individuals who aspire to enhance their personal growth and unlock their full potential.</p>
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
                        <p className={ home['portfolio-description'] }>HPA was established in September 2015 with 100% Ugandan ownership. We specialize in apiculture, including beekeeping and honey processing, offering liquid honey, beeswax, and bee propolis. Our services include training farmers, providing technical support, modern hives, and a reliable honey market. HPA follows an inclusive business model, involving rural communities in the value chain. Our goal is to lead in sustainable beehive product production in the Great Lakes Region, benefiting farmers economically and environmentally.</p>
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
                        <p className={ home['portfolio-description'] }>PayGas is a pioneering tech-driven LPG retailer committed to serving low-income clients. Our unique cashless technology, known as Pay as you Gas™, empowers customers to refill their gas cylinders with the precise amount they can afford, starting from as little as 0.5 USD. By revolutionizing the conventional cylinder swapping process with cashless micro refills, we are actively combating deforestation caused by wood fuel usage in low-income households.</p>
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
                        <p className={ home['portfolio-description'] }>Carad Labs is a leading food engineering platform, supporting agri-food businesses in optimizing performance and risk management. We adhere to QHSE guidelines, ISO standards, and legal regulations. Our services include sensory analysis, industrial consulting, training, R&D, and laboratory analytics. We empower businesses to thrive in the agri-food industry.</p>
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
                                    <video className={ home['video'] } ref={ videoRef } onClick={ handleVideo }>
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
                    </Slider>
                </div>
                {/* <div className={ home['community-wrapper'] }> */}
                    
                    {/* <Image src={ backArrow } alt='Previous Arrow' className={ `${ home['arrow2'] } ${ home['prev-community'] }` } onClick={ () => communitySlide('prev') } />
                    <div className={ home['testimonial-container'] }>
                        {
                            screenWidth < 1200 && (
                                <>
                                    <div id='page_1' className={ `community-page ${ home['community-page'] }` }>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
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
                                        </div>
                                    </div>
                                    <div id='page_2' className={ `community-page ${ home['community-page'] }` }>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
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
                                        </div>
                                    </div>
                                    <div id='page_3' className={ `community-page ${ home['community-page'] }` }>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
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
                                        </div>
                                    </div>
                                    <div id='page_4' className={ `community-page ${ home['community-page'] }` }>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
                                                <p>&quot;We have been following the development of Agora closely, and we firmly believe it has the potential to emerge as a valuable bridge
                                                    that links institutions like ours to a diverse array of entrepreneurs and experts in emerging economies. Agora is a great resource that
                                                    broadens our horizons while enhancing our ability to achieve sustainable development by finding SDG-positive projects and companies.&quot;
                                                </p>
                                                <Image
                                                    src='/images/Lissette.jpg'
                                                    alt=''
                                                    width={ 50 }
                                                    height={ 50 }
                                                    className={ home['testimonial-image'] }
                                                />
                                                <p className={ home['testimonial-name'] }>Lisette Cipriano</p>
                                                <p className={ home['testimonial-position'] }>Senior Digital Technology Specialist, Asian Development Bank (ADB)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div id='page_5' className={ `community-page ${ home['community-page'] }` }>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
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
                                        </div>
                                    </div>
                                    <div id='page_6' className={ `community-page ${ home['community-page'] }` }>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
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
                                        </div>
                                    </div>
                                    <div id='page_7' className={ `community-page ${ home['community-page'] }` }>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
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
                                        </div>
                                    </div>
                                    <div id='page_8' className={ `community-page ${ home['community-page'] }` }>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
                                                <p>&quot;Business Africa sees great potential in Agora to connect African entrepreneurs with the capital and expertise they need to thrive.
                                                    Agora provides a unique opportunity for our members to access global networks and resources, opening doors to previously untapped growth
                                                    possibilities. We believe that Agora will play a pivotal role in advancing the African business landscape and promoting economic development
                                                    across the continent.&quot;
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
                                        </div>
                                    </div>
                                    <div id='page_9' className={ `community-page ${ home['community-page'] }` }>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
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
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        
                        {
                            screenWidth >= 1200 && (
                                <>
                                    <div id='page_1' className={ `community-page ${ home['community-page'] }` }>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
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
                                        </div>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
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
                                        </div>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
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
                                        </div>
                                    </div>
                                    <div id='page_2' className={ `community-page ${ home['community-page'] }` }>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
                                                <p>&quot;We have been following the development of Agora closely, and we firmly believe it has the potential to emerge as a valuable bridge
                                                    that links institutions like ours to a diverse array of entrepreneurs and experts in emerging economies. Agora is a great resource that
                                                    broadens our horizons while enhancing our ability to achieve sustainable development by finding SDG-positive projects and companies.&quot;
                                                </p>
                                                <Image
                                                    src='/images/Lissette.jpg'
                                                    alt=''
                                                    width={ 50 }
                                                    height={ 50 }
                                                    className={ home['testimonial-image'] }
                                                />
                                                <p className={ home['testimonial-name'] }>Lisette Cipriano</p>
                                                <p className={ home['testimonial-position'] }>Senior Digital Technology Specialist, Asian Development Bank (ADB)</p>
                                            </div>
                                        </div>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
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
                                        </div>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
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
                                        </div>
                                    </div>
                                    <div id='page_3' className={ `community-page ${ home['community-page'] }` }>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
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
                                        </div>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
                                                <p>&quot;Business Africa sees great potential in Agora to connect African entrepreneurs with the capital and expertise they need to thrive.
                                                    Agora provides a unique opportunity for our members to access global networks and resources, opening doors to previously untapped growth
                                                    possibilities. We believe that Agora will play a pivotal role in advancing the African business landscape and promoting economic development
                                                    across the continent.&quot;
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
                                        </div>
                                        <div className={ home['testimonial-content'] }>
                                            <div className={ home['testimonial-info-container'] }>
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
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        
                    </div> */}

                    {/* <div className={ home['carrusel']}>
                    <Slider {... settings}>
                            <div className={home['cajaC']}>
                                <h3>1</h3>
                            </div>
                            <div className={home['cajaC']}>
                                <h3>2</h3>
                            </div>
                            <div className={home['cajaC']}>
                                <h3>3</h3>
                            </div>
                            <div className={home['cajaC']}>
                                <h3>4</h3>
                            </div>
                            <div className={home['cajaC']}>
                                <h3>5</h3>
                            </div>
                            <div className={home['cajaC']}>
                                <h3>6</h3>
                            </div>
                    </Slider>
                    </div> */}


                    {/* <Slider { ...settings }>
                        <div className={ home['testimonial-info-container'] }>
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
                        <div className={ home['testimonial-info-container'] }>
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
                        <div className={ home['testimonial-info-container'] }>
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
                        <div className={ home['testimonial-info-container'] }>
                            <p>&quot;We have been following the development of Agora closely, and we firmly believe it has the potential to emerge as a valuable bridge
                                that links institutions like ours to a diverse array of entrepreneurs and experts in emerging economies. Agora is a great resource that
                                broadens our horizons while enhancing our ability to achieve sustainable development by finding SDG-positive projects and companies.&quot;
                            </p>
                            <Image
                                src='/images/Lissette.jpg'
                                alt=''
                                width={ 50 }
                                height={ 50 }
                                className={ home['testimonial-image'] }
                            />
                            <p className={ home['testimonial-name'] }>Lisette Cipriano</p>
                            <p className={ home['testimonial-position'] }>Senior Digital Technology Specialist, Asian Development Bank (ADB)</p>
                        </div>
                        <div className={ home['testimonial-info-container'] }>
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
                        <div className={ home['testimonial-info-container'] }>
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
                        <div className={ home['testimonial-info-container'] }>
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
                        <div className={ home['testimonial-info-container'] }>
                            <p>&quot;Business Africa sees great potential in Agora to connect African entrepreneurs with the capital and expertise they need to thrive.
                                Agora provides a unique opportunity for our members to access global networks and resources, opening doors to previously untapped growth
                                possibilities. We believe that Agora will play a pivotal role in advancing the African business landscape and promoting economic development
                                across the continent.&quot;
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
                        <div className={ home['testimonial-info-container'] }>
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
                    </Slider> */}

                    {/* <Image src={ nextArrow } alt='Next Arrow' className={ `${ home['arrow2'] } ${ home['next-community'] }` } onClick={ () => communitySlide('next') } /> */}
                {/* </div> */}
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
                    src='https://res.cloudinary.com/dp779tmk6/image/upload/v1694531765/SYSPICS/logosp.jpg'
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
                    src='https://res.cloudinary.com/dp779tmk6/image/upload/v1694531765/SYSPICS/logosp.jpg'
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
