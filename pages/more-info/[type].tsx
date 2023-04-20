import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'
import { FooterMobile } from '@/components/Footer/FooterMobile'
import { FooterDesktop } from '@/components/Footer/FooterDesktop'
import { Section1 } from '@/components/MoreInfo/Section1'
import { Section2 } from '@/components/MoreInfo/Section2'
import { Section3 } from '@/components/MoreInfo/Section3'
import { Section4 } from '@/components/MoreInfo/Section4'

import style from './more-info.module.css'

const MoreInfoPage: NextPage = () => {
    const { query } = useRouter()
    
    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <>
                <div className={ style['info-content'] }>
                    <div className='window-glass' style={{ maxInlineSize: 1226 }}>
                        <div className='window-glass-content'>
                            <Section1
                                title={
                                    query.type === 'investor'
                                    ? 'HARNESSING THE POWER OF UNTAPPED MARKETS'
                                    : query.type === 'entrepreneur'
                                    ? 'PARTNERING WITH INVESTORS FOR UNSTOPPABLE BUSINESS SUCCESS'
                                    : 'SHAPING THE FUTURE THROUGH SKILLS AND EXPERTISE'
                                }
                                subtitle={
                                    query.type === 'investor'
                                    ? 'Maximize your returns while supporting sustainable growth in emerging economies'
                                    : query.type === 'entrepreneur'
                                    ? 'Empower your business with strategic investors and partnerships to unlock new opportunities'
                                    : 'Use your know-how to drive change and empower enterprises to reach new heights'
                                }
                                type={ query.type?.toString() }
                            />
                            <Section2
                                type={ query.type?.toString() }
                                paragraph1={
                                    query.type === 'investor'
                                    ? `The global financial system does not support riskier and smaller investments needed for building private sector in
                                        frontier, emerging and developing economies. Information gap and market knowledge barrier pose challenges for
                                        investors. They seek investment opportunities but lack access to information and pipeline.`
                                    : query.type === 'entrepreneur'
                                    ? `Traditional financial systems often overlook the smaller, riskier investments essential for building a thriving
                                        private sector in emerging, frontier, and developing economies. As a result, many promising entrepreneurs and
                                        investments with both commercial and development potential are left behind. Risk perception and a lack of local
                                        market knowledge are major obstacles for investors.`
                                    : `Agora is a dynamic platform that connects entrepreneurs from emerging and frontier Agora offers a unique opportunity
                                        for impact-driven professionals and institutions to engage in skills-based advisory and make a difference. Join a
                                        cohort of like-minded individuals and work directly with an entrepreneur in emerging and frontier economies to help
                                        solve their business challenges and pave the way for their growth.`
                                }
                                paragraph2={
                                    query.type === 'investor'
                                    ? `Agora is a digital platform that promotes new investment opportunities in these economies as a global public good.
                                        It enables companies in these markets to showcase themselves and connects investors with promising opportunities.
                                        Investors benefit from a platform that brings entrepreneurs, investments, and projects to their attention with a
                                        snapshot of business model, financing needs and commitment to sustainability. This supports informed investment
                                        decisions. Agora highlights investment potential in these markets and may attract more financing in the long term,
                                        even if not all investors pursue investment opportunities.`
                                    : query.type === 'entrepreneur'
                                    ? `Agora solves this problem by offering a digital platform that connects businesses with impact-driven professionals
                                        and institutions, including potential investors. As a registered enterprise on Agora, you have the chance to showcase
                                        your products, services, business model, and commitment to impact, and to connect with investors who can provide not
                                        only expertise but also the capital needed for growth and success.`
                                    : `If you have expertise in areas such as finance, marketing, human resources, sales, operations, digital innovation,
                                        and more, and are willing to commit some of your time, apply to be a pro-bono advisor. Ideal candidates are comfortable
                                        with ambiguity, have strong research skills, a high emotional intelligence, and above all, love supporting businesses.`
                                }
                                paragraph3={
                                    query.type === 'investor'
                                    ? `Getting started on Agora is straightforward. Investors can register and connect with potential enterprises or receive
                                        connections from those interested in investment thesis and investment opportunities. The matching process is simple, 
                                        and investors can start exploring new growth and investment opportunities right away.`
                                    : query.type === 'entrepreneur'
                                    ? `Through Agora, entrepreneurs can position themselves for investment and support from the capital markets. Even if not
                                        all registered enterprises will secure financing or support, Agora provides a platform for entrepreneurs to be seen by
                                        investors and to strengthen their business processes for future opportunities.`
                                    : `To join, simply register your profile. Upon registration, you will be able to connect directly with enterprises or receive
                                        connections from enterprises seeking your expertise, and when you see an enterprise, you want to volunteer for you can begin
                                        the matching process.`
                                }
                                paragraph4={
                                    query.type === 'investor'
                                    ? `Take advantage of this unique platform to discover new markets and connect with innovative investment leads.`
                                    : query.type === 'entrepreneur'
                                    ? `Getting started is simple. Register your enterprise profile on Agora and connect with potential investors or receive
                                        connections from those interested in your business. The matching process is easy, and you can start your journey to
                                        growth and success in no time.`
                                    : `Make an immediate impact in the business community from emerging and frontier economies, use your professional skills
                                        for good, and grow your network. Ready to support the growth of a business owner? Apply now.`
                                }
                                paragraph5={
                                    query.type === 'investor'
                                    ? undefined
                                    : query.type === 'entrepreneur'
                                    ? `Take advantage of this unique opportunity to grow your business, secure the capital you need, and reach new heights.
                                        Register now and start making an impact.`
                                    : undefined
                                }
                            />
                            <Section3
                                subtitle={
                                    query.type === 'investor'
                                    ? `Through Agora, Investors eager to look for opportunities in frontier, and emerging economies have access
                                        to a pipeline and knowledge about promising opportunities.`
                                    : query.type === 'entrepreneur'
                                    ? `By partnering with investors through Agora, enterprises can benefit from access to capital
                                        and expertise needed for growth and success`
                                    : `By partnering with a pro bono advisor, enterprises can tap into a wealth of experience and expertise,
                                        leading to increased growth, competitiveness, and long-term success`
                                }
                            />
                            <Section4
                                type={ query.type?.toString() }
                            />
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