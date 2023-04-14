import { AgoraLayout } from '@/components/layouts/AgoraLayout'
import { NextPage } from 'next'
import Image from 'next/image'

import home from '../styles/Home.module.css'

import rocket from '../public/images/rocket.png'
import investorImage from '../public/images/investor-image.png'
import entrepreneurImage from '../public/images/entrepreneur-image.png'
import expertImage from '../public/images/expert-image.png'
import backArrow from '../public/images/back-arrow.png'
import nextArrow from '../public/images/next-arrow.png'
import psfuLogo from '../public/images/psfu.png'
import cciasLogo from '../public/images/ccias.png'
import fsmeLogo from '../public/images/fsme.png'
import ministeryLogo from '../public/images/ministery.png'
import adepmeLogo from '../public/images/adepme.png'
import wfpLogo from '../public/images/wfp.png'
import uncdfLogo from '../public/images/uncdf.png'
import amrefLogo from '../public/images/amref.png'
import buaLogo from '../public/images/bua.png'
import iccLogo from '../public/images/icc.png'
import aldeliaLogo from '../public/images/aldelia.png'
import investorIcon from '../public/images/investor-icon.svg'
import entrepreneurIcon from '../public/images/entrepreneur-icon.svg'
import expertIcon from '../public/images/expert-icon.svg'
import { FooterDesktop } from '@/components/Footer/FooterDesktop'
import { FooterMobile } from '@/components/Footer/FooterMobile'

const Home: NextPage = () => {
  return (
    <AgoraLayout title='Agora' pageDescription=''>
      <>
        <section className={ home['rocket-main'] }>
          <div className={ home['rocket-container'] }>
            <Image src={ rocket } alt='Rocket Image' className={ home['rocket-image'] } />
            <div className={ home['rocket-title-container'] }>
              <h1 className={ home['rocket-title'] }>CONNECTING FOR IMPACT</h1>
              <h2 className={ home['rocket-subtitle'] }>Capital, innovation and expertise at work</h2>
            </div>
          </div>
          <div className={ home['account-type-wrapper'] }>
            <Image src={ backArrow } alt='Previous Arrow' className={ home['arrow'] } />
            <div className={ home['account-type-container'] }>
              <div className={ home['account-image-container'] }>
                <Image src={ investorImage } alt='Investor Image' className={ home['investor-image'] } />
                <div className={ home['account-type-title-container'] }>
                  <Image src={ investorIcon } alt='' className={ home['account-icon'] } />
                  <h3 className={ home['account-type-title'] }>Investor</h3>
                </div>
                <p className={ home['account-type-description'] }>
                  A bright future starts with smart investment.
                </p>
                <a
                  className='button-filled'
                  style={{
                    paddingInline: 17,
                    paddingBlock: 8,
                    fontFamily: 'Hind Siliguri',
                    fontSize: 20,
                    fontWeight: 600,
                    lineHeight: '21px',
                  }}>
                    Read more
                  </a>
              </div>
              <div className={ home['account-image-container'] }>
                <Image src={ investorImage } alt='Entrepreneur Image' className={ home['investor-image'] } />
                <div className={ home['account-type-title-container'] }>
                  <Image src={ entrepreneurIcon } alt='' className={ home['account-icon'] } />
                  <h3 className={ home['account-type-title'] }>Entrepreneur</h3>
                </div>
                <p className={ home['account-type-description'] }>
                  The only limit to our realization of tomorrow will be our doubts of today.
                </p>
                <a
                  className='button-filled'
                  style={{
                    paddingInline: 17,
                    paddingBlock: 8,
                    fontFamily: 'Hind Siliguri',
                    fontSize: 20,
                    fontWeight: 600,
                    lineHeight: '21px',
                  }}>
                    Read more
                  </a>
              </div>
              <div className={ home['account-image-container'] }>
                <Image src={ investorImage } alt='Expert Image' className={ home['investor-image'] } />
                <div className={ home['account-type-title-container'] }>
                  <Image src={ expertIcon } alt='' className={ home['account-icon'] } />
                  <h3 className={ home['account-type-title'] }>Expert</h3>
                </div>
                <p className={ home['account-type-description'] }>
                  Empowering entrepreneurs to reach their full potential.
                </p>
                <a
                  className='button-filled'
                  style={{
                    paddingInline: 17,
                    paddingBlock: 8,
                    fontFamily: 'Hind Siliguri',
                    fontSize: 20,
                    fontWeight: 600,
                    lineHeight: '21px',
                  }}>
                    Read more
                  </a>
              </div>
            </div>
            <Image src={ nextArrow } alt='Next Arrow' className={ home['arrow'] } />
          </div>
        </section>
        <section className={ home['what-container'] }>
          <div className={ home['what-wrapper'] }>
            <div className={ home['what-text-container'] }>
              <h3 className={ home['what-title'] }>WHAT IS AGORA?</h3>
              <p className={ home['what-description'] }>
                Agora is a global public good launched by the United Capital Development Fund (UNCDF) which connects entrepreneurs from developing
                economies with the knowledge, technical support and capital needed to seize opportunities for growth. It also enables the scaling-up
                of sourcing of new investment lead opportunities through a digital pathway.
              </p>
              <p className={ home['what-description'] }>
                Agora uses a proprietary algorithm to provide investment managers with innovative lead sourcing, screening flexibility, direct connection
                to principals, and a possible collaboration with co-inverstors. Similarly, entrepreneurs have access to similar functionalities to connect
                with inverstors and partners.
              </p>
            </div>
            <video className={ home['video'] } controls>
              <source src='./videos/coming.mp4' type='video/mp4' />
            </video>
          </div>
        </section>
        <section className={ home['supported-container-mobile'] }>
          <h3 className={ home['supported-title'] }>Supported by a partnership of like-minded institutions</h3>
          <h4 className={ home['partners-title'] }>National Partners</h4>
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
          <h4 className={ home['partners-title'] }>International Partners</h4>
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
          <h3 className={ home['supported-title'] }>Supported by a partnership of like-minded institutions</h3>
          <div className={ home['supported-wrapper-desktop'] }>
            <div>
              <h4 className={ home['partners-title'] }>National Partners</h4>
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
              <h4 className={ home['partners-title'] }>International Partners</h4>
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

        <FooterMobile />
        <FooterDesktop />
      </>
    </AgoraLayout>
  )
}

export default Home
