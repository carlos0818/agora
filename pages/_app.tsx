import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'

import { Provider } from 'react-redux'
import { store } from '../redux/store'

import { ReCaptchaProvider } from 'next-recaptcha-v3'

import '@/styles/globals.css'
import { AuthProvider } from '@/context/auth'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <Provider store={ store }>
          <ReCaptchaProvider
                reCaptchaKey={ `${ process.env.NEXT_PUBLIC_RECAPTCHA_KEY }` }
                useEnterprise
            >
            <Component {...pageProps} />
          </ReCaptchaProvider>
        </Provider>
      </AuthProvider>
    </SessionProvider>
  )
}
