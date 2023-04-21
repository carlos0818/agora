import Image from 'next/image'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'
import { FooterMobile } from '@/components/Footer/FooterMobile'
import { FooterDesktop } from '@/components/Footer/FooterDesktop'

import style from './about.module.css'

import aboutImage from '../../public/images/about-image.png'
import cciasImage from '../../public/images/ccias.png'
import uncdfImage from '../../public/images/uncdf.png'
import carbonChartIcon from '../../public/images/carbon-chart-icon.svg'

const AboutPage = () => {
    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <>
                <div className={ style['about-content'] }>
                    <div className='window-glass' style={{ maxInlineSize: 1226 }}>
                        <div className='window-glass-content'>
                            <div className={ style['section-one-container'] }>
                                <h3 className={ style['about-title'] }>ABOUT AGORA</h3>
                                <h4 className={ style['about-subtitle'] }>Connecting for impact - capital, innovation, and expertise at work.</h4>
                                <div className={ style['about-wrapper'] }>
                                    <div className={ style['left'] }>
                                        <p>
                                            Agora is a dynamic platform that connects entrepreneurs from emerging and frontier economies with the resources they need
                                            to grow their businesses. Sponsored by the United Capital Development Fund (UNCDF), the platform offers investment managers
                                            a range of features, including innovative lead sourcing, flexible screening, direct connections to entrepreneurs, and potential
                                            collaboration with co-investors. Entrepreneurs, in turn, have access to similar tools for connecting with capital providers and
                                            showcasing their companies to investors and partners in their ecosystem.
                                        </p>
                                        <p>
                                            The platform is a two-year collaboration between UNCDF and partner institutions, launched by a group of dedicated and passionate
                                            staff who believe in the power of digital solutions to bridge the gap between capital and entrepreneurship. Tested on a pilot
                                            basis in Senegal and Uganda in 2022, an improved version 2.0, with added features and improvements, was announced in 2023 at
                                            the Fifth United Nations Conference on the Least Developed Countries (LDC5) in Doha, Qatar.
                                        </p>
                                        <p>
                                            Agora is dedicated to continuously evolving based on user, partner, and UNCDF staff input. The platform is designed to adapt
                                            and respond to the changing needs of the communities it serves, ensuring that it remains a valuable resource for entrepreneurs
                                            and investment managers alike.
                                        </p>
                                    </div>
                                    <Image
                                        src={ aboutImage }
                                        alt='About Image'
                                        className={ style['about-image'] }
                                    />
                                </div>
                            </div>
                            <div className={ style['section-two-container'] }>
                                <h3 className={ style['partners-title'] }>PARTNERSHIP MODEL</h3>
                                <h4 className={ style['partners-subtitle'] }>Empowering entrepreneurs, connecting capital: The Agora Partnership</h4>
                                <p>
                                    Agora leverages its partnership and co-creation ecosystem to continuously improve and respond to the evolving needs of the
                                    entrepreneurs and investment managers it serves. The Agora Partnership is a collaborative effort between institutional members
                                    with the goal of implementing impactful investments and connecting entrepreneurs with funding sources in frontier, emerging,
                                    and developing markets. The Partnership&apos;s principles include working together to connect impactful ventures with funding,
                                    promoting international coverage of impact investment and entrepreneurship, and advocating for reducing the gap between capital
                                    and impactful investment opportunities.
                                </p>
                                <p>
                                    To achieve its objectives, the Partnership aims to:
                                </p>
                                <ul>
                                    <li>- Share knowledge and resources about attracting private investment capital in emerging and frontier economies</li>
                                    <li>- Develop standards for collecting and assessing data on entrepreneurs and investors in developing economies</li>
                                    <li>- Create a networking environment for stakeholders in the impact investment space</li>
                                    <li>- Raise awareness of impact investment issues through events, workshops, training, and publications</li>
                                    <li>- Showcase the social impact, commercial viability, innovativeness, and investment potential of SDG-positive enterprises in emerging and frontier economies.</li>
                                    <li>- The partnership network is currently comprised of the following institutional members.</li>
                                </ul>
                            </div>
                            <div className={ style['section-three-container'] }>
                                <div className={ style['logos-container'] }>
                                    <h3 className={ style['logos-title'] }>NATIONAL</h3>
                                    <Image
                                        src={ cciasImage }
                                        alt='CCIAS Image'
                                        className={ style['logo-image'] }
                                    />
                                </div>
                                <div className={ style['logos-container'] }>
                                    <h3 className={ style['logos-title'] }>INTERNATIONAL</h3>
                                    <Image
                                        src={ uncdfImage }
                                        alt='UNCDF Image'
                                        className={ style['logo-image'] }
                                    />
                                </div>
                            </div>
                            <div className={ style['section-four-container'] }>
                                <h3 className={ style['collaborate-title'] }>COLLABORATE WITH A PURPOSE</h3>
                                <h4 className={ style['collaborate-subtitle'] }>Collaborate with a purpose to empower entrepreneurs and drive growth</h4>
                                <p className={ style['collaborate-description'] }>
                                    Agora is guided by a set of unwavering principles that drive its mission and shape its approach. These seven principles are deeply
                                    ingrained and serve as the guiding force in all its functionalities.
                                </p>
                            </div>
                            <div className={ style['section-five-container'] }>
                                <div className={ style['specs-container'] }>
                                    <h3 className={ style['specs-title'] }>ACCESIBILITY</h3>
                                    <Image
                                        src={ carbonChartIcon }
                                        alt='Accesibility Icon'
                                    />
                                    <p className={ style['specs-description'] }>
                                        Agora is committed to making its services and resources accessible to entrepreneurs from frontier and emerging economies,
                                        regardless of their location or background.
                                    </p>
                                </div>
                                <div className={ style['specs-container'] }>
                                    <h3 className={ style['specs-title'] }>INCLUSIVENESS</h3>
                                    <Image
                                        src={ carbonChartIcon }
                                        alt='Inclusiveness Icon'
                                    />
                                    <p className={ style['specs-description'] }>
                                        Agora is designed to be inclusive, fostering an environment where all entrepreneurs, regardless of their size or stage of
                                        development, can connect with potential partners and investors and receive the support they need.
                                    </p>
                                </div>
                                <div className={ style['specs-container'] }>
                                    <h3 className={ style['specs-title'] }>FAIRNESS</h3>
                                    <Image
                                        src={ carbonChartIcon }
                                        alt='Fairness Icon'
                                    />
                                    <p className={ style['specs-description'] }>
                                        Agora is designed to be inclusive, fostering an environment where all entrepreneurs, regardless of their size or stage of
                                        development, can connect with potential partners and investors and receive the support they need.
                                    </p>
                                </div>
                                <div className={ style['specs-container'] }>
                                    <h3 className={ style['specs-title'] }>CO-CREATION</h3>
                                    <Image
                                        src={ carbonChartIcon }
                                        alt='Co-creation Icon'
                                    />
                                    <p className={ style['specs-description'] }>
                                        Agora is built on the principles of co-creation, working with a wide range of partners to help entrepreneurs access the
                                        resources and support they need in a participatory and inclusive manner.
                                    </p>
                                </div>
                                <div className={ style['specs-container'] }>
                                    <h3 className={ style['specs-title'] }>TRANSPARENCY</h3>
                                    <Image
                                        src={ carbonChartIcon }
                                        alt='Transparency Icon'
                                    />
                                    <p className={ style['specs-description'] }>
                                        Agora is committed to transparency in all its operations, providing users with clear and accurate information about the
                                        enterprises they are interested in and the partners they are connecting with.
                                    </p>
                                </div>
                                <div className={ style['specs-container'] }>
                                    <h3 className={ style['specs-title'] }>INNOVATION</h3>
                                    <Image
                                        src={ carbonChartIcon }
                                        alt='Innovation Icon'
                                    />
                                    <p className={ style['specs-description'] }>
                                        Agora is dedicated to continuous innovation and improvement, developing new technologies and services supporting the
                                        growth and development of enterprises in frontier and emerging economies.
                                    </p>
                                </div>
                                <div className={ style['specs-container'] }>
                                    <h3 className={ style['specs-title'] }>OWNERSHIP</h3>
                                    <Image
                                        src={ carbonChartIcon }
                                        alt='Ownership Icon'
                                    />
                                    <p className={ style['specs-description'] }>
                                        Agora places a strong emphasis on ownership, ensuring that the countries partnering with it are driving the deployment
                                        of the platform and own the process.
                                    </p>
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

export default AboutPage