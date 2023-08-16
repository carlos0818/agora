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

export default CommentsPage