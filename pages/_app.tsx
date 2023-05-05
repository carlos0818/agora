import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'

import { Provider } from 'react-redux'
import { store } from '../redux/store'

import { AuthProvider } from '@/context/auth'
import { MenuProvider } from '@/context/menu'

import { ReCaptchaProvider } from 'next-recaptcha-v3'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <Provider store={ store }>
          <MenuProvider>
            <ReCaptchaProvider
                  reCaptchaKey={ `${ process.env.NEXT_PUBLIC_RECAPTCHA_KEY }` }
                  useEnterprise
              >
              <Component {...pageProps} />
            </ReCaptchaProvider>
          </MenuProvider>
        </Provider>
      </AuthProvider>
    </SessionProvider>
  )
}
