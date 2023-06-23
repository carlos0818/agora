import Link from 'next/link'
import Image from 'next/image'

import style from './footer.module.css'

import agoralogo from '@/public/images/agoralogo.png'

export const FooterMobile = () => {
    return (
        <footer className={ style['footer-mobile'] }>
            <a>Terms and conditions</a>
            <a>FAQ</a>
            <a>Hub</a>
            <Link
                href='/about'
                passHref
                prefetch={ false }
                legacyBehavior
            >
                <a>About</a>
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
        </footer>
    )
}
