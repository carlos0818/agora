import { FC } from 'react'
import Image from 'next/image'

import style from '../../pages/more-info/more-info.module.css'

import investor1 from '@/public/images/investor-1.png'

interface Props {
    type: string | undefined
}

const data = [
    {
        type: 'investor',
        info: [
            {
                title: 'Access to new investment opportunities',
                description: 'Agora provides a platform for investors to learn about new investment opportunities in frontier, emerging and developing economies that they may have otherwise overlooked.',
            },
            {
                title: 'Trusted source',
                description: 'Agora is a trusted source for information on investment opportunities, providing credibility to the enterprises and investment opportunities presented on the platform.'
            },
            {
                title: 'Improved market knowledge',
                description: 'By accessing Agora, investors can increase their understanding of local markets, reducing the risk perceptions and lack of market knowledge that are critical barriers to investment.'
            },
            {
                title: 'Diversification of portfolio',
                description: 'Investors can diversify their portfolios by investing in new opportunities and markets that they may have otherwise overlooked.'
            },
            {
                title: 'Improved screening',
                description: 'Agora provides a platform for enterprises to showcase their potential, making the screening diligence process for investors easier and more efficient.'
            },
            {
                title: 'Increased returns',
                description: 'By accessing new investment opportunities, investors have the potential to increase their returns and achieve their investment goals.'
            }
        ]
    },
    {
        type: 'entrepreneur',
        info: [
            {
                title: 'Increased visibility',
                description: 'Agora provides a platform for enterprises to showcase their potential to investors and capital markets, increasing their visibility and exposure.'
            },
            {
                title: 'Access to capital',
                description: 'The platform enables enterprises to connect with potential investors, increasing their chances of securing the capital they need to grow their business.'
            },
            {
                title: 'Improved business processes',
                description: 'Even if not all enterprises secure financing, Agora incentivizes them to strengthen their business processes, making them more attractive to investors in the future.'
            },
            {
                title: 'Trusted source',
                description: 'Agora is a trusted source for capital market actors to learn about investment opportunities in frontier, emerging, and developing economies, providing credibility to enterprises.'
            },
            {
                title: 'Easy matching process',
                description: 'The matching process on Agora is easy, allowing enterprises to quickly connect with potential investors.'
            },
            {
                title: 'Opportunity for growth and sucess',
                description: 'By registering on Agora, enterprises have the opportunity to grow their business, secure capital, and reach new heights.'
            },
        ]
    },
    {
        type: 'expert',
        info: [
            {
                title: 'Access to new opportunities',
                description: 'Agora provides a platform for pro bono advisors to learn about new opportunities to provide their services in frontier, emerging, and developing economies.'
            },
            {
                title: 'Support for enterprises',
                description: 'By accessing Agora, pro bono advisors can support entrepreneurs and their businesses, helping them to grow and succeed.'
            },
            {
                title: 'Building a network',
                description: 'Agora provides an opportunity for pro bono advisors to connect with other advisors and investors, building their professional network.'
            },
            {
                title: 'Increased impact',
                description: 'By accessing new opportunities, pro bono advisors can increase their impact, helping to promote economic growth and development in frontier, emerging, and developing economies.'
            },
            {
                title: 'Improved skills',
                description: 'By working with a variety of entrepreneurs and businesses, pro bono advisors can improve their skills and gain new experience, enhancing their professional development.'
            },
            {
                title: 'Contribution to global public good',
                description: 'By accessing Agora, pro bono advisors can contribute to the global public good, helping to scale up the sourcing of new investment lead opportunities in frontier, emerging, and developing economies.'
            },
        ]
    }
]

export const Section4: FC<Props> = ({ type }) => {
    return (
        <div className={ style['section-four-container'] }>
            {
                (type === 'investor') && (
                    data[0].info.map((inf, idx) => {
                        return (
                            <div key={ inf.title } className={ style['specs-container'] }>
                                <h3 className={ style['specs-title'] }>{ inf.title }</h3>
                                <Image src={ `/images/inv-${ idx + 1 }.png` } alt='' width={ 448 } height={ 672 } className={ style['specs-icon'] } />
                                <p className={ style['specs-description'] }>{ inf.description }</p>
                            </div>
                        )
                    })
                )
            }
            {
                (type === 'entrepreneur') && (
                    data[1].info.map((inf, idx) => {
                        return (
                            <div key={ inf.title } className={ style['specs-container'] }>
                                <h3 className={ style['specs-title'] }>{ inf.title }</h3>
                                <Image src={ `/images/entre-${ idx + 1 }.png` } alt='' width={ 448 } height={ 672 } className={ style['specs-icon'] } />
                                <p className={ style['specs-description'] }>{ inf.description }</p>
                            </div>
                        )
                    })
                )
            }
            {
                (type === 'expert') && (
                    data[2].info.map((inf, idx) => {
                        return (
                            <div key={ inf.title } className={ style['specs-container'] }>
                                <h3 className={ style['specs-title'] }>{ inf.title }</h3>
                                <Image src={ `/images/exp-${ idx + 1 }.png` } alt='' width={ 448 } height={ 672 } className={ style['specs-icon'] } />
                                <p className={ style['specs-description'] }>{ inf.description }</p>
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}
