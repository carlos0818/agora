import { NextPage, GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react'
import Image from 'next/image'

import { useReCaptcha } from 'next-recaptcha-v3'
import { useForm } from 'react-hook-form'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'
import { FooterMobile } from '@/components/Footer/FooterMobile'
import { FooterDesktop } from '@/components/Footer/FooterDesktop'

import style from './login.module.css'

import loginButtons from '../../public/images/login-buttons.svg'

type FormData = {
    email: string
    password: string
}

const LoginPage: NextPage = () => {
    const { executeRecaptcha } = useReCaptcha()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    const onLogin = async({ email, password }: FormData) => {
        const captcha = await executeRecaptcha("form_login")
        await signIn('credentials', { email, password, captcha })
    }
    
    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <>
                <div className={ style['login-container'] }>
                    <div className='window-glass' style={{ maxInlineSize: 810, margin: 'auto' }}>
                        <div className='window-glass-content'>
                            <p className={ style['login-title'] }>LOGIN</p>
                            <form onSubmit={ handleSubmit(onLogin) } noValidate>
                                <div className={ style['form-container'] }>
                                    <div className={ style['form-row'] }>
                                        <label>Your e-mail</label>
                                        <input
                                            type='email'
                                            className={ style['textfield'] }
                                            { ...register('email', {
                                                required: 'This field is required'
                                            })}
                                        />
                                    </div>
                                    <div className={ style['form-row'] }>
                                        <label>Password</label>
                                        <input
                                            type='password'
                                            className={ style['textfield'] }
                                            { ...register('password', {
                                                required: 'This field is required'
                                            })}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <input type='submit' value='Log In' className={ `button-filled ${ style['button-style'] }` } />
                                </div>
                            </form>
                            <div className={ style['or-container'] }>
                                <hr className={ style['line'] } />
                                <span>OR</span>
                                <hr className={ style['line'] } />
                            </div>
                            <Image src={ loginButtons } alt='' style={{ display: 'block', margin: 'auto', marginBlock: 20 }} />
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

                <FooterMobile />
                <FooterDesktop />
            </>
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