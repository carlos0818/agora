import { useContext, useEffect, useState } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { getSession, signIn, getProviders } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { useReCaptcha } from 'next-recaptcha-v3'
import { useForm } from 'react-hook-form'
import Cookie from 'js-cookie'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'
import { AuthContext } from '@/context/auth'

import style from './signup.module.css'

import facebook from '@/public/images/fb-letter-white.png'
import google from '@/public/images/google-logo-button.png'

type FormData = {
    fullname: string
    email: string
    password: string
    confirmPassword: string
}

const SignUpPage: NextPage = () => {
    const { query } = useRouter()
    const { registerUser } = useContext(AuthContext)

    const { executeRecaptcha } = useReCaptcha()

    const [providers, setProviders] = useState<any>({})
    const { register, handleSubmit, getValues, setError, reset, formState: { errors } } = useForm<FormData>()
    const [loading, setLoading] = useState(false)
    const [ok, setOk] = useState(false)

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov)
        })
    }, [])

    useEffect(() => {
        Cookie.set(
            'additionalAuthParams',
            JSON.stringify({
              login: 'N',
              accountType: query.type!.toString().toUpperCase() === 'INVESTOR' ? 'I': query.type!.toString().toUpperCase() === 'ENTREPRENEUR' ? 'E' : 'X'
            })
        )
    }, [query.type])

    const onRegister = async({ fullname, email, password }: FormData) => {
        setLoading(true)

        const captcha = await executeRecaptcha("form_register")
        const { hasError, message } = await registerUser(fullname, email, password, query.type!.toString().toUpperCase().substring(0,1), captcha)

        if (hasError) {
            setError('email', { type: 'exists', message })
        } else {
            setOk(true)
            reset({
                fullname: '',
                email: '',
                password: '',
                confirmPassword: '',
            })
            document.getElementById('txtFullname')!.focus()
        }

        setLoading(false)
    }
    
    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <div className={ style['signup-container'] }>
                <div className='window-glass' style={{ maxInlineSize: 810, margin: 'auto' }}>
                    <div className='window-glass-content'>
                        <p className={ style['account-title'] }>CREATE YOUR ACCOUNT AS { query.type?.toString().toUpperCase() }</p>
                        <form onSubmit={ handleSubmit(onRegister) } noValidate>
                            <div className={ style['form-container'] }>
                                <div className={ style['form-row'] }>
                                    <label>Full name</label>
                                    <input
                                        type='text'
                                        id='txtFullname'
                                        className={ `${ style['field'] } ${ errors.fullname && style['field-error'] }` }
                                        { ...register('fullname', {
                                            required: 'Fullname is required',
                                            maxLength: 60
                                        })}
                                    />
                                    { errors.fullname && <span className={ style['message-error'] }>{ errors.fullname.message }</span> }
                                    { errors.fullname && errors.fullname.type === 'maxLength' && <span className={ style['message-error'] }>The maximum character limit for fullname is 60</span> }
                                </div>
                                <div className={ style['form-row'] }>
                                    <label>Email</label>
                                    <input
                                        type='email'
                                        className={ `${ style['field'] } ${ errors.email && style['field-error'] }` }
                                        { ...register('email', {
                                            required: 'Email is required',
                                            validate: {
                                                matchPattern: (v) => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(v) || 'Not a valid email'
                                            }
                                        })}
                                    />
                                    { errors.email && <span className={ style['message-error'] }>{ errors.email.message }</span> }
                                </div>
                                <div className={ style['form-row'] }>
                                    <label>Password</label>
                                    <input
                                        type='password'
                                        className={ `${ style['field'] } ${ errors.password && style['field-error'] }` }
                                        { ...register('password', {
                                            required: 'Password is required',
                                            validate: {
                                                password: (v) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,}$/.test(v) || 'The password must have at least 10 characters, Uppercase and lowercase letter, a number, and special character'
                                            }
                                        })}
                                    />
                                    { errors.password && <span className={ style['message-error'] }>{ errors.password.message }</span> }
                                </div>
                                <div className={ style['form-row'] }>
                                    <label>Confirm password</label>
                                    <input
                                        type='password'
                                        className={ `${ style['field'] } ${ errors.confirmPassword && style['field-error'] }` }
                                        { ...register('confirmPassword', {
                                            required: 'Confirm password is required',
                                            validate: value => value === getValues('password') || 'Passwords don\'t match'
                                        })}
                                    />
                                    { errors.confirmPassword && <span className={ style['message-error'] }>{ errors.confirmPassword.message }</span> }
                                </div>
                            </div>
                            {
                                ok && (
                                    <div className={ style['form-row'] } style={{ alignItems: 'center', marginBlockStart: 30 }}>
                                        <span style={{ color: '#006f0d' }}>Please check your email and confirm it</span>
                                    </div>
                                )
                            }
                            <div style={{ alignItems: 'center', blockSize: 40, display: 'flex', justifyContent: 'center', marginBlockStart: 40, marginBlockEnd: 30 }}>
                                {
                                    loading
                                    ? <em className='spinner blue-agora' style={{ blockSize: 36, inlineSize: 36 }} />
                                    : <input type='submit' value='Sign up' className={ `button-filled ${ style['button-style'] }` } />
                                }
                            </div>
                        </form>
                        <div className={ style['or-container'] }>
                            <hr className={ style['line'] } />
                            <span>OR</span>
                            <hr className={ style['line'] } />
                        </div>
                        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 16, inlineSize: 230, marginLeft: 'auto', marginRight: 'auto', marginBlock: 24 }}>
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
                                                Sign up with Facebook
                                            </button>
                                        )
                                    }
                                    if (provider.id === 'google') {
                                        return (
                                            <button
                                                key={ provider.id }
                                                onClick={ () => {
                                                    signIn(provider.id)
                                                }}
                                                className={ style['google-button'] }
                                            >
                                                <Image src={ google } alt='' className={ style['google-logo'] } />
                                                Sign up with Google
                                            </button>
                                        )
                                    }
                                })
                            }
                        </div>
                        <p className={ style['terms'] }>
                            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el
                            texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica
                            a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos
                            especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos,
                            quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las
                            cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus
                            PageMaker, el cual incluye versiones de Lorem Ipsum.
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

export default SignUpPage