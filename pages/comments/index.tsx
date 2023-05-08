import { FormEvent, useCallback } from 'react'

import { useReCaptcha } from 'next-recaptcha-v3'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'

import style from './comments.module.css'

const CommentsPage = () => {
    const { executeRecaptcha } = useReCaptcha()

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
      
            // Generate ReCaptcha token
            const token = await executeRecaptcha("form_submit")

            console.log(token)
      
            // Attach generated token to your API requests and validate it on the server
            // fetch("/api/form-submit", {
            //   method: "POST",
            //   body: {
            //     data: { name },
            //     token,
            //   },
            // });
        }, [executeRecaptcha])

    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <div className={ style['login-container'] }>
                <div className='window-glass' style={{ maxInlineSize: 810, margin: 'auto' }}>
                    <div className='window-glass-content'>
                        <p className={ style['login-title'] }>SEND US YOUR COMMENT</p>
                        <form onSubmit={ e => handleSubmit(e) }>
                            <div className={ style['form-container'] }>
                                <div className={ style['form-row'] }>
                                    <label>Full name</label>
                                    <input type='text' className={ style['textfield'] } />
                                </div>
                                <div className={ style['form-row'] }>
                                    <label>Your e-mail</label>
                                    <input type='email' className={ style['textfield'] } />
                                </div>
                                <div className={ style['form-row'] }>
                                    <label>Subject</label>
                                    <input type='text' className={ style['textfield'] } />
                                </div>
                                <div className={ style['form-row'] }>
                                    <label>Your comment</label>
                                    <textarea className={ style['textarea'] } />
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <input type='submit' value='Send' className={ `button-filled ${ style['button-style'] }` } />
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