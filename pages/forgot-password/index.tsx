import { useRef, useState } from 'react'
import { NextPage } from 'next'

import { useReCaptcha } from 'next-recaptcha-v3'

import { agoraApi } from '@/api'
import { AgoraLayout } from '@/components/layouts/AgoraLayout'

import styles from './forgot-password.module.css'

const ForgotPasswordPage: NextPage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [ok, setOk] = useState(false)

    const emailRef = useRef<HTMLInputElement>(null)

    const { executeRecaptcha } = useReCaptcha()

    const handleSend = async() => {
        setError('')
        const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

        if (!pattern.test(emailRef.current!.value)) {
            console.log('Email')
            setError('Incorrect email')
            return
        }

        setLoading(true)

        try {
            const captcha = await executeRecaptcha("form_forgot_password")
            await agoraApi.post('/user/send-link-forgot-password', { email: emailRef.current!.value, captcha })
            emailRef.current!.value = ''
            setOk(true)
            setTimeout(() => {
                setOk(false)
            }, 3000)
        } catch (error) {
            setError('The email does not exist')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <div className={ styles['forgot-container'] }>
                <div className='window-glass' style={{ maxInlineSize: 810, margin: 'auto' }}>
                    <div className='window-glass-content'>
                        <p className={ styles['forgot-title'] }>FORGOT PASSWORD</p>
                        <div className={ styles['form-container'] }>
                            <div className={ styles['form-row'] }>
                                <label>Email</label>
                                <input
                                    ref={ emailRef }
                                    type='text'
                                    className={ `field ${ error !== '' && 'field-error' }` }
                                />
                                { error !== '' && <span style={{ color: '#CE0915', fontSize: 12 }}>{ error }</span> }
                            </div>
                            <div className={ styles['form-row'] }>
                                <div style={{ alignItems: 'center', blockSize: 40, display: 'flex', justifyContent: 'center', marginBlockStart: 20 }}>
                                    {
                                        loading
                                        ? <em className='spinner blue-agora' style={{ blockSize: 36, inlineSize: 36 }} />
                                        : <input
                                            type='button'
                                            value='Send'
                                            className={ `button-filled ${ styles['button-style'] }` }
                                            onClick={ handleSend }
                                        />
                                    }
                                </div>
                            </div>
                            {
                                ok && (
                                    <div className={ styles['form-row'] } style={{ display: 'flex', justifyContent: 'center' }}>
                                        <p style={{ color: '#006f0d', width: 'fit-content', margin: 'auto' }}>Check your email</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AgoraLayout>
    )
}

export default ForgotPasswordPage