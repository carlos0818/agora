import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'
import { FooterMobile } from '@/components/Footer/FooterMobile'
import { FooterDesktop } from '@/components/Footer/FooterDesktop'

import style from './more-info.module.css'

import investorImage from '../../public/images/investor-image.png'
import investorIcon from '../../public/images/investor-icon.svg'
import infoInvestorImage from '../../public/images/info-investor-image.png'

const MoreInfoPage: NextPage = () => {
    const { query } = useRouter()

    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <>
                <div className={ style['info-content'] }>
                    <div className='window-glass' style={{ maxInlineSize: 1226 }}>
                        <div className='window-glass-content'>
                            <div className={ style['section-one-container'] }>
                                <div className={ style['container-one'] }>
                                    <div className={ style['info-wrapper'] }>
                                        <h3 className={ style['info-title'] }>HARNESSING THE POWER OF UNTAPPED MARKETS</h3>
                                        <p className={ style['info-subtitle'] }>Maximize your returns while supporting sustainable growth in emerging economies</p>
                                    </div>
                                    <Link
                                        href={ `/signup/${ query.type }` }
                                        passHref
                                        prefetch={ false }
                                        legacyBehavior
                                    >
                                        <span className={`button-filled ${ style['button-desktop'] }`}>Sign up as { query.type }</span>
                                    </Link>
                                </div>
                                <div className={ style['container-two'] }>
                                    <Image src={ investorImage } alt='Investor Image' className={ style['type-image'] } />
                                    <Link
                                        href={ `/signup/${ query.type }` }
                                        passHref
                                        prefetch={ false }
                                        legacyBehavior
                                    >
                                        <span className={`button-filled ${ style['button-mobile'] }`}>Sign up as { query.type }</span>
                                    </Link>
                                </div>
                            </div>
                            <div className={ style['section-two-container'] }>
                                <div>
                                    <h3 className={ style['type-title'] }>{ query.type?.toString().toUpperCase() }</h3>
                                    <p className={ style['type-subtitle'] }>Unlock growth through frontier market investments</p>
                                    <p className={ style['type-info'] }>
                                        The global financial system does not support riskier and smaller investments needed for building private sector in
                                        frontier, emerging and developing economies. Information gap and market knowledge barrier pose challenges for
                                        investors. They seek investment opportunities but lack access to information and pipeline.
                                    </p>
                                    <p className={ style['type-info'] }>
                                        Agora is a digital platform that promotes new investment opportunities in these economies as a global public good.
                                        It enables companies in these markets to showcase themselves and connects investors with promising opportunities.
                                        Investors benefit from a platform that brings entrepreneurs, investments, and projects to their attention with a
                                        snapshot of business model, financing needs and commitment to sustainability. This supports informed investment
                                        decisions. Agora highlights investment potential in these markets and may attract more financing in the long term,
                                        even if not all investors pursue investment opportunities.
                                    </p>
                                    <p className={ style['type-info'] }>
                                        Getting started on Agora is straightforward. Investors can register and connect with potential enterprises or receive
                                        connections from those interested in investment thesis and investment opportunities. The matching process is simple, 
                                        and investors can start exploring new growth and investment opportunities right away. Take advantage of this unique
                                        platform to discover new markets and connect with innovative investment leads.
                                    </p>
                                </div>
                                <Image src={ infoInvestorImage } alt='' className={ style['info-image'] } />
                            </div>
                            <div className={ style['section-three-container'] }>
                                <h3 className={ style['benefits-title'] }>BENEFITS</h3>
                                <p className={ style['benefits-subtitle'] }>
                                    Through Agora, Investors eager to look for opportunities in frontier, and emerging economies have access to a pipeline and
                                    knowledge about promising opportunities.
                                </p>
                            </div>
                            <div className={ style['section-four-container'] }>
                                <div className={ style['specs-container'] }>
                                    <h3 className={ style['specs-title'] }>ACCESS TO NEW INVESTMENT OPPORTUNITIES</h3>
                                    <Image src={ investorIcon } alt='' className={ style['specs-icon'] } />
                                    <p className={ style['specs-description'] }>
                                        Agora provides a platform for investors to learn about new investment opportunities in frontier, emerging
                                        and developing economies that they may have otherwise overlooked.
                                    </p>
                                </div>
                                <div className={ style['specs-container'] }>
                                    <h3 className={ style['specs-title'] }>TRUSTED SOURCE</h3>
                                    <Image src={ investorIcon } alt='' className={ style['specs-icon'] } />
                                    <p className={ style['specs-description'] }>
                                        Agora is a trusted source for information on investment opportunities, providing credibility to the enterprises
                                        and investment opportunities presented on the platform.
                                    </p>
                                </div>
                                <div className={ style['specs-container'] }>
                                    <h3 className={ style['specs-title'] }>IMPROVED MARKET KNOWLEDGE</h3>
                                    <Image src={ investorIcon } alt='' className={ style['specs-icon'] } />
                                    <p className={ style['specs-description'] }>
                                        By accessing Agora, investors can increase their understanding of local markets, reducing the risk perceptions
                                        and lack of market knowledge that are critical barriers to investment.
                                    </p>
                                </div>
                                <div className={ style['specs-container'] }>
                                    <h3 className={ style['specs-title'] }>DIVERSIFICATION OF PORTFOLIO</h3>
                                    <Image src={ investorIcon } alt='' className={ style['specs-icon'] } />
                                    <p className={ style['specs-description'] }>
                                        Investors can diversify their portfolios by investing in new opportunities and markets that they may have
                                        otherwise overlooked.
                                    </p>
                                </div>
                                <div className={ style['specs-container'] }>
                                    <h3 className={ style['specs-title'] }>IMPROVED SCREENING</h3>
                                    <Image src={ investorIcon } alt='' className={ style['specs-icon'] } />
                                    <p className={ style['specs-description'] }>
                                        Agora provides a platform for enterprises to showcase their potential, making the screening diligence process
                                        for investors easier and more efficient.
                                    </p>
                                </div>
                                <div className={ style['specs-container'] }>
                                    <h3 className={ style['specs-title'] }>INCREASED RETURNS</h3>
                                    <Image src={ investorIcon } alt='' className={ style['specs-icon'] } />
                                    <p className={ style['specs-description'] }>
                                        By accessing new investment opportunities, investors have the potential to increase their returns and achieve
                                        their investment goals.
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

export default MoreInfoPage