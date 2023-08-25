import { useState } from 'react'
import { useReCaptcha } from 'next-recaptcha-v3'
import { useForm } from 'react-hook-form'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'

import style from './comments.module.css'
import { agoraApi } from '@/api'

type FormData = {
    fullname: string
    email: string
    subject: string
    comment: string
}

const CommentsPage = () => {
    const { executeRecaptcha } = useReCaptcha()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>()

    const [loading, setLoading] = useState(false)

    const onSubmit = async({ fullname, email, subject, comment }: FormData) => {
        setLoading(true)

        try {
            const captcha = await executeRecaptcha("form_register")
            await agoraApi.post('/comment-info/send-email', { fullname, email, subject, comment, captcha })

            setValue('fullname', '')
            setValue('email', '')
            setValue('subject', '')
            setValue('comment', '')
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <div className={ style['login-container'] }>
                <div className='window-glass' style={{ maxInlineSize: 810, margin: 'auto' }}>
                    <div className='window-glass-content'>
                        <p className={ style['login-title'] }>SEND US YOUR COMMENT</p>
                        <form onSubmit={ handleSubmit(onSubmit) }>
                            <div className={ style['form-container'] }>
                                <div className={ style['form-row'] }>
                                    <label>Full name</label>
                                    <input
                                        type='text'
                                        className={ `field ${ errors.fullname && 'field-error' }` }
                                        { ...register('fullname', {
                                            required: 'Fullname is required',
                                            maxLength: 60
                                        })}
                                    />
                                    { errors.fullname && <span className={ style['message-error'] }>{ errors.fullname.message }</span> }
                                </div>
                                <div className={ style['form-row'] }>
                                    <label>Your e-mail</label>
                                    <input
                                        type='email'
                                        className={ `field ${ errors.email && 'field-error' }` }
                                        { ...register('email', {
                                            required: 'Email is required',
                                            maxLength: 60
                                        })}
                                    />
                                    { errors.email && <span className={ style['message-error'] }>{ errors.email.message }</span> }
                                </div>
                                <div className={ style['form-row'] }>
                                    <label>Subject</label>
                                    <input
                                        type='text'
                                        className={ `field ${ errors.subject && 'field-error' }` }
                                        { ...register('subject', {
                                            required: 'Subject is required',
                                            maxLength: 60
                                        })}
                                    />
                                    { errors.subject && <span className={ style['message-error'] }>{ errors.subject.message }</span> }
                                </div>
                                <div className={ style['form-row'] }>
                                    <label>Your comment</label>
                                    <textarea
                                        className={ `${ style['textarea'] } ${ errors.comment && 'field-error' }` }
                                        { ...register('comment', {
                                            required: 'Comment is required',
                                            maxLength: 60
                                        })}
                                    />
                                    { errors.comment && <span className={ style['message-error'] }>{ errors.comment.message }</span> }
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {
                                    loading
                                    ? <em className='spinner blue-agora' style={{ blockSize: 36, inlineSize: 36, marginBlockStart: 20 }} />
                                    : (
                                        <input
                                            type='submit'
                                            value='Send'
                                            className={ `button-filled ${ style['button-style'] }` }
                                        />
                                    )
                                }
                            </div>
                        </form>
                        <p className={ style['terms'] }>
                            Important Notice: Guidelines for Sending Comments Dear User, We kindly remind you that when sending comments, it is essential to adhere to
                            specific guidelines to maintain an atmosphere of respect and collaboration. Please take into consideration the following: 1. Mutual Respect:
                            Ensure that your comments are respectful and constructive. Avoid offensive, discriminatory, or harmful language towards any individual, group,
                            or entity. 2. Accuracy: Share accurate and truthful information. Refrain from spreading false news, baseless rumors, or misleading data.
                            3. Good Intent: Your aim should be to contribute positively. Avoid comments with ill intentions, provocations, or any form of hostility.
                            4. Relevance to the Topic: Keep your comments related to the subject of discussion. Avoid straying from the main issue.
                            5. Appropriate Length: Be concise and relevant in your comments. Avoid overly long messages that might hinder understanding.
                            6. Valuable Contributions: Strive to provide ideas, viewpoints, and arguments that enrich the conversation. Avoid empty or insubstantial comments.
                            7. Respect for Guidelines: Adhere to the policies and regulations established by this platform for comment exchange.
                            Your contributions are valuable, and we want to ensure that interaction here is constructive and friendly for all users. Any violation of these
                            guidelines could result in the removal of your comments or further actions as necessary. Thank you for your understanding and cooperation in
                            creating a harmonious environment for communication! Sincerely, Agora Team.
                        </p>
                    </div>
                </div>
            </div>
        </AgoraLayout>
    )
}

export default CommentsPage