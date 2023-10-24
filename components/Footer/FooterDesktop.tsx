import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import style from './footer.module.css'

import agoralogo from '@/public/images/agoralogo.png'

interface Props {
    login?: boolean
}

export const FooterDesktop: FC<Props> = ({ login = true }) => {
    return (
        <footer className={ style['footer-desktop'] }>
            <div className={ `${ style['container-footer'] } ${ !login && style['container-footer-logout'] }` }>
                <div className={ style['options-container'] }>
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
                </div>
                <Link
                    href='/'
                    passHref
                    prefetch={ false }
                    legacyBehavior
                >
                    <Image src={ agoralogo } alt='' className={ style['logo'] } />
                </Link>
            </div>
        </footer>
    )
}
