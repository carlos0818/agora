import Image from 'next/image'

import style from './footer.module.css'

import agoralogo from '../../public/images/agoralogo.png'

export const FooterMobile = () => {
    return (
        <footer className={ style['footer-mobile'] }>
            <a>Terms and conditions</a>
            <a>FAQ</a>
            <a>Hub</a>
            <a>About</a>
            <a>Comments</a>
            <a>
              <Image src={ agoralogo } alt='' width={ 140 } height={ 48 } />
            </a>
        </footer>
    )
}
