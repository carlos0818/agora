import { NextPage } from 'next'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'

import style from './faq.module.css'

const FaqPage: NextPage = () => {
    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <div className={ style['faq-container'] }>
                <div className='window-glass' style={{ maxInlineSize: 1280, margin: 'auto' }}>
                    <div className='window-glass-content' style={{ color: '#10284F' }}>
                        <h2>FAQs</h2>
                        <ol>
                            <li>Questions Regarding the Operation of Agora</li>
                            <br />
                            <ol type='a'>
                                <li>What is Agora?</li>
                                <ol type='i'>
                                    <li>
                                        Agora is a global public good that will facilitate connections between entrepreneurs from frontier, emerging, and developing
                                        economies with prospective partners, including investors, who can provide critical knowledge, technical support, and capital
                                        to foster opportunities for growth.
                                    </li>
                                </ol>
                                <br />
                                <li>How does the Agora algorithm work?</li>
                                <ol type='i'>
                                    <li>
                                        Agora intends to provide investment managers with innovative lead sourcing, screening flexibility, direct connection to principals,
                                        and a possible collaboration with co-investors. Likewise, capital seekers will have access to similar functionalities to connect
                                        with capital providers, and will be able to make themselves known to investors, companies in their ecosystem, and other partners.
                                        This will give entrepreneurs in frontier, emerging, and developing economies visibility to investors all over the world, making access
                                        to local, regional and global non-traditional financing easier.
                                    </li>
                                </ol>
                                <br />
                                <li>How does Agora work?</li>
                                <ol type='i'>
                                    <li>
                                        Agora uses the information provided by participant enterprises through a structured and multiple-choice questionnaire, and the
                                        qualification of the company is then calculated utilizing a proprietary algorithm called EQUAL (Enterprise Qualification Algorithm)
                                        using the fundamental, technical, and market data points. Currently being deployed on a gradual basis, Agora hopes to become a
                                        milestone in connecting enterprises with partners and new funding pools looking to invest in frontier, emerging, and developing economies.
                                    </li>
                                </ol>
                            </ol>
                            <br />
                            <li>Questions Regarding Agora Engagement with Entrepreneurs and Investors</li>
                            <br />
                            <ol type='a'>
                                <li>What is the role that Agora plays or the gap that Agora fills?</li>
                                <ol type='i' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <li>
                                        The gap that currently exists in the global financial architecture where actors in the capital markets are unaware of promising
                                        commercial companies and projects in frontier, emerging, and developing economies.
                                    </li>
                                    <li>
                                        Agora fills this information gap by scaling up the sourcing of new investment lead opportunities in frontier, emerging and
                                        developing economies. Agora is a platform for companies operating in these overlooked markets to promote themselves to support
                                        a pipeline of commercial investment that could lead towards the capital markets. Agora also provides a connecting platform for
                                        actors in capital markets to learn of such opportunities through a trusted resource in the form of global public good.
                                    </li>
                                </ol>
                                <br />
                                <li>What companies and entrepreneurs will Agora promote?</li>
                                <ol type='i' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <li>
                                        Any company or entrepreneur in frontier, emerging, and developing economies will have the opportunity to register into and
                                        benefit from the Agora platform. Inputs placed into the algorithm will be stress tested, and all entrepreneurs will attest
                                        to the veracity of the information they submit into Agora. With the transparency that Agora will deliver, actors in the capital
                                        markets will be able to make informed decisions as to which opportunities/projects/companies to consider for capital investment
                                        as well as other means of support.
                                    </li>
                                    <li>
                                        Additionally, Agora relies on crowd-sourced peer review of entrepreneurs to support informed decision-making and strengthened
                                        partnership development. The peer review includes the opportunity to rate and comment on entrepreneurs registered on Agora.
                                    </li>
                                </ol>
                                <br />
                                <li>What countries does Agora look to support?</li>
                                <ol type='i' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <li>
                                        Agora is dedicated to frontier, emerging and developing economies. Agora has commenced pilots in two countries: Uganda and Senegal.
                                    </li>
                                </ol>
                                <br />
                                <li>How can companies join the platform?</li>
                                <ol type='i' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <li>
                                        As a global public good, Agora is open for registration to any interested company. Any company that wants to utilize the platform
                                        will have to adequately complete the questionnaire to generate its profile and access the features offered by Agora.
                                    </li>
                                </ol>
                            </ol>
                            <br />
                            <li>Questions Regarding Data Provided Through Agora</li>
                            <br />
                            <ol type='a'>
                                <li>What snapshot or information is the questionnaire intended to provide?</li>
                                <ol type='i' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <li>
                                        The questionnaire that supports the EQUAL algorithm is intended to provide a probative snapshot of companies/entrepreneurs
                                        registered on the Agora platform.
                                    </li>
                                    <li>
                                        The entrepreneur snapshot provides data such as market outlook, desired financing instrument, management practices, an overview
                                        of products/services offering(s), and alignment with sustainable impact principles.
                                    </li>
                                    <li>
                                        The investor snapshot provides data such as return expectations, return-risk exposure, geographies of operation, and business
                                        sectors of investment.
                                    </li>
                                </ol>
                                <br />
                                <li>Who has access to the data?</li>
                                <ol type='i' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <li>
                                        Anyone who has not registered to the Agora platform will only be able to access basic information (name of investor or entrepreneur,
                                        country of operation, and the desired financing instrument (entrepreneur) or investment range (investor). Only registrants will be
                                        able to access the full schematic of investors and entrepreneurs, including the snapshot data of registered entrepreneurs and investors.
                                    </li>
                                </ol>
                            </ol>
                            <br />
                            <li>Questions Regarding Any Remuneration Via Agora</li>
                            <br />
                            <ol type='a'>
                                <li>Does Agora endorse in commercial terms any of the companies on its platform?</li>
                                <ol type='i' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <li>
                                        Agora does not endorse any of the companies registered on its platform, either in commercial or in development terms.
                                        Agora is merely providing a service for entrepreneurs and investors to connect in the interest of prospective partnerships.
                                        Registrants must take full responsibility for their participation via Agora, including for any and all engagement as a result
                                        of Agora. Agora bears no responsibility for any engagement between registrants or any related actions thereof.
                                    </li>
                                </ol>
                                <br />
                                <li>Does Agora endorse in sustainability terms any of the companies on its platform?</li>
                                <ol type='i' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <li>
                                        Agora does not endorse any of the companies registered on its platform, either in commercial or in development terms. Agora is
                                        merely providing a service for entrepreneurs and investors to connect in the interest of prospective partnerships. Registrants
                                        must take full responsibility for their participation via Agora, including for any and all engagement as a result of Agora.
                                        Agora bears no responsibility for any engagement between registrants or any related actions thereof.
                                    </li>
                                </ol>
                                <br />
                                <li>Is Agora responsible for the business transactions that take place between companies and entrepreneurs?</li>
                                <ol type='i' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <li>
                                        Agora does not endorse any of the companies registered on its platform, either in commercial or in development terms. Agora is
                                        merely providing a service for entrepreneurs and investors to connect in the interest of prospective partnerships. Registrants
                                        must take full responsibility for their participation via Agora, including for any and all engagement as a result of Agora.
                                        Agora bears no responsibility for any engagement between registrants or any related actions thereof.
                                    </li>
                                </ol>
                                <br />
                                <li>Does Agora provide any form of concessional or commercial financing towards companies, investors, or transactions?</li>
                                <ol type='i' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <li>
                                        Agora provides no financing of any kind to any registrant, whether an investor or entrepreneur. This includes any commercial
                                        financing in the form of loans or guarantees or concessional finance in the form of grants. However, Agora intends to connect
                                        capital seekers to financing from capital providers.
                                    </li>
                                </ol>
                                <br />
                                <li>Does Agora receive any remuneration or financial benefit from any partnership or transaction?</li>
                                <ol type='i' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <li>
                                        Agora operates as a global public good. Because of this designation, Agora does not receive any remuneration or financial
                                        benefit from any partnership or transaction pursued through Agora. At no point in the operation of Agora will the platform
                                        incur a financial benefit, even to cover any associated costs.
                                    </li>
                                </ol>
                                <br />
                                <li>Does Agora charge any company or investor a fee?</li>
                                <ol type='i' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <li>
                                        Agora operates as a global public good. Because of this designation, no entrepreneur or investor will have to pay a fee to
                                        utilize the Agora platform.
                                    </li>
                                </ol>
                            </ol>
                            <br />
                            <li>Questions Regarding the Agora Network</li>
                            <br />
                            <ol type='a'>
                                <li>Is this a project of the United Nations?</li>
                                <ol type='i' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <li>
                                        Agora is a global public good and represents a collective project of its network. UNCDF holds the secretariat of Agora, thereby
                                        overseeing the day-to-day duties but any decisions of management regarding Agora requires support of the Agora network.
                                    </li>
                                </ol>
                                <br />
                                <li>What companies and organizations comprise the Agora network?</li>
                                <ol type='i' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <li>
                                        The Agora Network Members are a collection of public and private sector actors; spanning the areas of investment, media,
                                        and development. In the context of Agora, they have agreed to work together to connect entrepreneurs with partners and
                                        new funding pools looking to invest in frontier, emerging, and developing economies. All network members have agreed to
                                        provide their respective support to Agora for no compensation or financial benefit of any kind.
                                    </li>
                                </ol>
                            </ol>
                            <br />
                            <li>Questions Regarding Taxation and Special Treatments from Government Hosts/Partners</li>
                            <br />
                            <ol type='a'>
                                <li>
                                    Does registration on the Agora platform offer any special considerations and treatment from the host Governments such as tax exemptions?
                                </li>
                                <br />
                                <li>
                                    No. Enterprises and Investors on the platform are still obligated to fulfill all the requirements in the jurisdictions in which
                                    they operate. Agora does not offer tax exemptions or any benefits of that nature but only offers an opportunity for entrepreneurs
                                    to meet with prospective investors. 
                                </li>
                            </ol>
                        </ol>
                    </div>
                </div>
            </div>
        </AgoraLayout>
    )
}

export default FaqPage