import { useEffect, useState } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { getSession, signIn, getProviders } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { useReCaptcha } from 'next-recaptcha-v3'
import { useForm } from 'react-hook-form'
import Cookie from 'js-cookie'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'

import style from './login.module.css'

import facebook from '@/public/images/fb-letter-white.png'
import google from '@/public/images/google-logo-button.png'

type FormData = {
    email: string
    password: string
}

interface Props {

}

const LoginPage: NextPage = ({  }) => {
    const router = useRouter()
    const { executeRecaptcha } = useReCaptcha()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    const [providers, setProviders] = useState<any>({})
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showErrorSocial, setShowErrorSocial] = useState(false)
    const [errorMessageSocial, setErrorMessageSocial] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov)
        })
    }, [])

    useEffect(() => {
        if (router.query.error === 'CredentialsSignin') {
            setShowError(true)
            setErrorMessage('Incorrect credentials')
        } else if (router.query.error === 'Callback') {
            setShowErrorSocial(true)
            setErrorMessageSocial('The user does not exist, please click on Sign up.')
        }
    }, [router.query.error])

    useEffect(() => {
        Cookie.set(
            'additionalAuthParams',
            JSON.stringify({
              login: 'Y',
              accountType: ''
            })
        )
    }, [])

    const onLogin = async({ email, password }: FormData) => {
        try {
            setLoading(true)
            const captcha = await executeRecaptcha("form_login")
            await signIn('credentials', { email, password, captcha, loginToken: 'N', token: '' })
            setLoading(false)
        } catch (error: any) {
            // console.log(error.response)
        }
    }
    
    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <div className={ style['login-container'] }>
                <div className='window-glass' style={{ maxInlineSize: 810, margin: 'auto' }}>
                    <div className='window-glass-content'>
                        <p className={ style['login-title'] }>LOGIN</p>
                        <form onSubmit={ handleSubmit(onLogin) } noValidate>
                            <div className={ style['form-container'] }>
                                <div className={ style['form-row'] }>
                                    <label>Email</label>
                                    <input
                                        type='text'
                                        className={ `field ${ errors.email && 'field-error' }` }
                                        { ...register('email', {
                                            required: 'This field is required',
                                        })}
                                    />
                                    { errors.email && <span className={ style['message-error'] }>{ errors.email.message }</span> }
                                </div>
                                <div className={ style['form-row'] }>
                                    <label>Password</label>
                                    <input
                                        type='password'
                                        className={ `field ${ errors.password && 'field-error' }` }
                                        { ...register('password', {
                                            required: 'This field is required'
                                        })}
                                    />
                                    { errors.password && <span className={ style['message-error'] }>{ errors.password.message }</span> }
                                </div>
                            </div>
                            {
                                showError && (
                                    <div className={ style['form-row'] } style={{ alignItems: 'center', marginBlockStart: 8 }}>
                                        <span style={{ color: '#CE0915' }}>{ errorMessage }</span>
                                    </div>
                                )
                            }
                            <div style={{ alignItems: 'center', blockSize: 40, display: 'flex', justifyContent: 'center', marginBlockStart: 20 }}>
                                {
                                    loading
                                    ? <em className='spinner blue-agora' style={{ blockSize: 36, inlineSize: 36 }} />
                                    : <input type='submit' value='Login' className={ `button-filled ${ style['button-style'] }` } />
                                }
                            </div>
                            <div style={{ alignItems: 'center', blockSize: 40, display: 'flex', justifyContent: 'center', marginBlockStart: 0, marginBlockEnd: 30 }}>
                                <a
                                    className={ style['forgot'] }
                                    onClick={ () => router.push('/forgot-password') }
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </form>
                        <div className={ style['or-container'] }>
                            <hr className={ style['line'] } />
                            <span>OR</span>
                            <hr className={ style['line'] } />
                        </div>
                        {
                            showErrorSocial && (
                                <div style={{ marginBlockStart: 24, marginInline: 'auto', textAlign: 'center' }}>
                                    <span style={{ color: '#CE0915' }}>{ errorMessageSocial }</span>
                                </div>
                            )
                        }
                        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 16, inlineSize: 210, marginLeft: 'auto', marginRight: 'auto', marginBlock: 24 }}>
                            {
                                Object.values(providers).map((provider: any) => {
                                    if (provider.id === 'credentials') return (<div key='credentials'></div>)
                                    if (provider.id === 'facebook') {
                                        return (
                                            <button
                                                key={ provider.id }
                                                onClick={ () => signIn(provider.id) }
                                                className={ style['facebook-button'] }
                                            >
                                                <Image src={ facebook } alt='' className={ style['facebook-logo'] } />
                                                Login with Facebook
                                            </button>
                                        )
                                    }
                                    if (provider.id === 'google') {
                                        return (
                                            <button
                                                key={ provider.id }
                                                onClick={ () => signIn(provider.id) }
                                                className={ style['google-button'] }
                                            >
                                                <Image src={ google } alt='' className={ style['google-logo'] } />
                                                Login with Google
                                            </button>
                                        )
                                    }
                                })
                            }
                        </div>
                        <p className={ style['terms'] }>
                            We make all reasonable efforts to ensure the accuracy and security of the entered data. However, the security of your login
                            credentials is of utmost importance. We strongly recommend that you use secure passwords and keep your login information confidential.
                            We are not responsible for any unauthorized disclosure of your login data.
                            We advise you to periodically check this section to stay informed about any changes. By using this login section, you accept the terms
                            and conditions set forth in this disclaimer. If you do not agree with these terms, we recommend that you do not use this section.
                        </p>
                    </div>
                </div>
            </div>
        </AgoraLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            },
            props: {
                user: session.user
            }
        }
    }

    return {
        props: {}
    }
}

export default LoginPage