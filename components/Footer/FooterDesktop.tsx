import Link from 'next/link'
import Image from 'next/image'

import style from './footer.module.css'

import agoralogo from '../../public/images/agoralogo.png'

export const FooterDesktop = () => {
    return (
        <footer className={ style['footer-desktop'] }>
            <div className={ style['container-footer'] }>
                <div className={ style['options-container'] }>
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
                </div>
                <Image src={ agoralogo } alt='' className={ style['logo'] } />
            </div>
        </footer>
    )
}
