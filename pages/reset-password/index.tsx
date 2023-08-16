import { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { useReCaptcha } from 'next-recaptcha-v3'

import { agoraApi } from '@/api'
import { AgoraLayout } from '@/components/layouts/AgoraLayout'

import styles from './reset-password.module.css'

type FormData = {
    password: string
    repeatPassword: string
}

const ResetPasswordPage: NextPage = () => {
    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<FormData>()
    const { executeRecaptcha } = useReCaptcha()

    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)
    const [ok, setOk] = useState(false)
    const [error, setError] = useState(true)
    const [email, setEmail] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const email = urlParams.get('email')
        const token = urlParams.get('token')
        setEmail(email)
        setToken(token)
    }, [])
    
    useEffect(() => {
        if (email)
            updateVerify()
    }, [email])

    const updateVerify = async() => {
        try {
            await agoraApi.post('/user/update-verified', { email, token })
            setError(false)
        } catch (error) {
            setError(true)
        } finally {
            setLoadingPage(false)
        }
    }

    const onRegister = async({ password }: FormData) => {
        setLoading(true)
        try {
            const captcha = await executeRecaptcha("form_reset_password")
            await agoraApi.post('/user/change-password', { email, password, token, captcha })
    
            setValue('password', '')
            setValue('repeatPassword', '')

            setOk(true)
            setTimeout(() => {
                router.replace('/login')
            }, 3000)
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <div className={ styles['reset-container'] }>
                {
                    loadingPage
                    ? (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <em className='spinner blue-agora' style={{ blockSize: 40, inlineSize: 40 }} />
                        </div>
                    ) : (
                        <div className='window-glass' style={{ maxInlineSize: 810, margin: 'auto' }}>
                            <div className='window-glass-content'>
                                {
                                    error ? (
                                        <div className={ styles['form-container'] }>
                                            <div className={ styles['form-row'] }>
                                                <label style={{ color: '#CE0915', margin: 'auto', marginBlockEnd: 20 }}>
                                                    Your password has already been changed
                                                </label>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <p className={ styles['reset-title'] }>RESET PASSWORD</p>
                                            <form onSubmit={ handleSubmit(onRegister) } noValidate>
                                                <div className={ styles['form-container'] }>
                                                    <div className={ styles['form-row'] }>
                                                        <label>New password</label>
                                                        <input
                                                            type='password'
                                                            className={ `field ${ errors.password && 'field-error' }` }
                                                            { ...register('password', {
                                                                required: 'This field is required',
                                                                validate: {
                                                                    strong: (v) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,}$/.test(v) || 'The password must have at least 10 characters, Uppercase and lowercase letter, a number, and special character',
                                                                }
                                                            })}
                                                        />
                                                        { errors.password && <span className={ styles['message-error'] }>{ errors.password.message }</span> }
                                                    </div>
                                                    <div className={ styles['form-row'] }>
                                                        <label>Repeat new password</label>
                                                        <input
                                                            type='password'
                                                            className={ `field ${ errors.repeatPassword && 'field-error' }` }
                                                            { ...register('repeatPassword', {
                                                                required: 'This field is required',
                                                                validate: value => value === getValues('password') || 'Passwords don\'t match'
                                                            })}
                                                        />
                                                        { errors.repeatPassword && <span className={ styles['message-error'] }>{ errors.repeatPassword.message }</span> }
                                                    </div>
                                                    <div className={ styles['form-row'] }>
                                                        <div style={{ alignItems: 'center', blockSize: 40, display: 'flex', justifyContent: 'center', marginBlockStart: 20 }}>
                                                            {
                                                                loading
                                                                ? <em className='spinner blue-agora' style={{ blockSize: 36, inlineSize: 36 }} />
                                                                : <input
                                                                    type='submit'
                                                                    value='Send'
                                                                    className={ `button-filled ${ styles['button-style'] }` }
                                                                    // onClick={ handleSend }
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                    {
                                                        ok && (
                                                            <div className={ styles['form-row'] } style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <p style={{ color: '#006f0d', width: 'fit-content', margin: 'auto' }}>Your password has been updated</p>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </form>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
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

export default ResetPasswordPage