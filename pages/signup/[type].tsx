import { FormEvent, useCallback, useContext, useState } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { useReCaptcha } from 'next-recaptcha-v3'
import { useForm } from 'react-hook-form'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'
import { AuthContext } from '@/context/auth'

import style from './signup.module.css'

import loginButtons from '@/public/images/login-buttons.svg'

type FormData = {
    fullname: string
    email: string
    password: string
    confirmPassword: string
    checkbox: boolean
}

const SignUpPage: NextPage = () => {
    const { query } = useRouter()
    const { registerUser } = useContext(AuthContext)
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { executeRecaptcha } = useReCaptcha()

    const { register, handleSubmit, getValues, setError, formState: { errors } } = useForm<FormData>()

    const onRegister = async({ fullname, email, password }: FormData) => {
        const captcha = await executeRecaptcha("form_register")
        // console.log(captcha)
        setShowError(false)
        const { hasError, message } = await registerUser(fullname, email, password, query.type!.toString().toUpperCase().substring(0,1), captcha)

        if (hasError) {
            // setShowError(true)
            // setErrorMessage(message!)
            setError('email', { type: 'exists', message })
            return
        }

        await signIn('credentials', { email, password })
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
                                <div style={{ display: 'grid' }}>
                                    <label className={ style['checkbox'] }>
                                        <input
                                            type='checkbox'
                                            id='checkbox'
                                            { ...register('checkbox', {
                                                required: 'Please, accept our terms and conditions'
                                            })}
                                        /> Accept terms and conditions
                                        <span className={ style['check'] }></span>
                                    </label>
                                    { errors.checkbox && <><span className={ style['message-error'] } style={{ marginBlockStart: 8 }}>{ errors.checkbox.message }</span></> }
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <input type='submit' value='Sign Up' className={ `button-filled ${ style['button-style'] }` } />
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