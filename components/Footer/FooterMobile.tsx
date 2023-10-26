import Link from 'next/link'
import Image from 'next/image'

import style from './footer.module.css'

import agoralogo from '@/public/images/agoralogo.png'

export const FooterMobile = () => {
    return (
        <footer className={ style['footer-mobile'] }>
            <Link
                href='/about'
                passHref
                prefetch={ false }
                legacyBehavior
            >
                <a>About</a>
            </Link>
            <Link
                href='/terms'
                passHref
                prefetch={ false }
                legacyBehavior
            >
                <a>Terms and conditions</a>
            </Link>
            <Link
                href='/faq'
                passHref
                prefetch={ false }
                legacyBehavior
            >
                <a>FAQ</a>
            </Link>
            <Link
                href='/hub'
                passHref
                prefetch={ false }
                legacyBehavior
            >
                <a>Hub</a>
            </Link>
            <Link
                href='/comments'
                passHref
                prefetch={ false }
                legacyBehavior
            >
                <a>Comments</a>
            </Link>
            <Link
                href='/'
                passHref
                prefetch={ false }
                legacyBehavior
            >
              <Image src={ agoralogo } alt='' width={ 140 } height={ 48 } />
            </Link>
            <div className="elfsight-app-b9b69cbf-2495-4494-b7f6-8a7f23b6f04a" data-elfsight-app-lazy></div>
        </footer>
    )
}
