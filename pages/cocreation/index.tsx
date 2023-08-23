import { useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'

import { useForm } from 'react-hook-form'

import { agoraApi } from '@/api'
import { AgoraLayout } from '@/components/layouts/AgoraLayout'

import style from './cocreation.module.css'
import { useReCaptcha } from 'next-recaptcha-v3'

type FormData = {
    title: string
    description: string
    category: string
    impact: string
    implementation: string
    contactInfo: string
}

const CoCreation: NextPage = () => {
    const { executeRecaptcha } = useReCaptcha()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>()

    const [loading, setLoading] = useState(false)

    const onSubmit = async({
        title,
        description,
        category,
        impact,
        implementation,
        contactInfo
    }: FormData) => {
        setLoading(true)

        const captcha = await executeRecaptcha("form_cocreation")

        try {
            await agoraApi.post('/comment-info/send-cocreation', { title, description, category, impact, implementation, contactInfo, captcha })
            setValue('title', '')
            setValue('description', '')
            setValue('category', '')
            setValue('impact', '')
            setValue('implementation', '')
            setValue('contactInfo', '')
        } catch (error) {
            
        } finally {
            setLoading(false)
        }

    }

    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <div className={ style['discover-content'] }>
                <div className='window-glass' style={{ maxInlineSize: 1226 }}>
                    <div className='window-glass-content'>
                        <div className={ style['section-one-container'] }>
                            <h3 className={ style['discover-title'] }>Join Agora&apos;s innovation community and create together!</h3>
                            <h4 className={ style['discover-subtitle'] }>Collective efforts fuel successful innovation</h4>
                            <div className={ style['discover-wrapper'] }>
                                <div className={ style['left'] }>
                                    <p>
                                        Welcome to Agora&apos;s Co-Creation page, where your ideas and feedback can help shape the future of our platform!
                                        As a global public good, Agora benefits from the collective creativity of its users, partners, and UNCDF staff.
                                        We believe that by working together, we can create a more inclusive and impactful ecosystem for entrepreneurs and
                                        investors in developing economies.
                                    </p>
                                    <p>
                                        The platform is a two-year collaboration between UNCDF and partner institutions, launched by a group of dedicated and passionate
                                        staff who believe in the power of digital solutions to bridge the gap between capital and entrepreneurship. Tested on a pilot
                                        basis in Senegal and Uganda in 2022, an improved version 2.0, with added features and improvements, was announced in 2023 at
                                        the Fifth United Nations Conference on the Least Developed Countries (LDC5) in Doha, Qatar.
                                    </p>
                                    <p>
                                        Agora is dedicated to continuously evolving based on user, partner, and UNCDF staff input. The platform is designed to adapt
                                        and respond to the changing needs of the communities it serves, ensuring that it remains a valuable resource for entrepreneurs
                                        and investment managers alike.
                                    </p>
                                </div>
                                <Image
                                    src='/images/about-image.png'
                                    alt='About Image'
                                    width={ 300 }
                                    height={ 300 }
                                    className={ style['discover-image'] }
                                />
                            </div>
                        </div>
                        <div className={ style['section-discover-container'] }>
                            <h3 className={ style['approach-title'] }>Discover Agora&apos;s participatory approach</h3>
                            <p>
                                At Agora, co-creation is all about working together to build a platform that is future-proof, inclusive, and responsive
                                to the needs of our users. We believe that by tapping into the collective creativity of our community, we can develop a public
                                good that nourishes everyone and helps create positive change in the world.
                            </p>
                            <p>
                                Our platform is designed to connect you with other co-creators who share your passion for social innovation and community-driven
                                initiatives. Whether you&apos;re looking for a co-working space, a demo lab, or simply a place to connect with like-minded individuals,
                                Agora has everything you need to start co-creating.
                            </p>
                            <p>
                                We are open, inclusive, and committed to building a platform that reflects the diverse perspectives and experiences of our users.
                                So, join us today and let&apos;s co-create a public good that benefits everyone!
                            </p>
                        </div>
                        <div className={ style['section-form-container'] }>
                            <h3 className={ style['form-title'] }>Share your creative ideas and help enhance our platform</h3>
                            <h4 className={ style['form-subtitle'] }>To submit your ideas, simply fill out the form below with the following information:</h4>
                            <form onSubmit={ handleSubmit(onSubmit) } className={ style['form'] }>
                                <div className={ style['form-group'] }>
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className='textfield'
                                        style={{ border: `${ errors.title ? '2px solid #CE0915' : '' }` }}
                                        placeholder='Provide a clear and concise title for your idea.'
                                        { ...register('title', {
                                            required: 'Title is required',
                                            maxLength: 60
                                        })}
                                    />
                                    { errors.title && <span className={ style['message-error'] }>{ errors.title.message }</span> }
                                </div>
                                <div className={ style['form-group'] }>
                                    <label>Description</label>
                                    <textarea
                                        className={ `textfield ${ style['textarea'] }` }
                                        style={{ border: `${ errors.description ? '2px solid #CE0915' : '' }` }}
                                        placeholder='Describe your idea in detail, including how it would work and what benefits it would bring to Agora users.'
                                        { ...register('description', {
                                            required: 'Description is required',
                                            maxLength: 60
                                        })}
                                    />
                                </div>
                                <div className={ style['form-group'] }>
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        className='textfield'
                                        style={{ border: `${ errors.category ? '2px solid #CE0915' : '' }` }}
                                        placeholder='Select the category that best fits your idea, such as "User Experience," "Functionality," or "Design."'
                                        { ...register('category', {
                                            required: 'Category is required',
                                            maxLength: 60
                                        })}
                                    />
                                </div>
                                <div className={ style['form-group'] }>
                                    <label>Impact</label>
                                    <textarea
                                        className={ `textfield ${ style['textarea'] }` }
                                        style={{ border: `${ errors.impact ? '2px solid #CE0915' : '' }` }}
                                        placeholder='Explain the potential impact of your idea, including any metrics or data to support your proposal.'
                                        { ...register('impact', {
                                            required: 'Impact is required',
                                            maxLength: 60
                                        })}
                                    />
                                </div>
                                <div className={ style['form-group'] }>
                                    <label>Implementation</label>
                                    <textarea
                                        className={ `textfield ${ style['textarea'] }` }
                                        style={{ border: `${ errors.implementation ? '2px solid #CE0915' : '' }` }}
                                        placeholder='Share any insights or recommendations for how your idea could be implemented on Agora&apos;s platform.'
                                        { ...register('implementation', {
                                            required: 'Implementation is required',
                                            maxLength: 60
                                        })}
                                    />
                                </div>
                                <div className={ style['form-group'] }>
                                    <label>Contact information</label>
                                    <textarea
                                        className={ `textfield ${ style['textarea'] }` }
                                        style={{ border: `${ errors.contactInfo ? '2px solid #CE0915' : '' }` }}
                                        placeholder='Provide your name and email address so that we can contact you if we have any questions or follow-up.'
                                        { ...register('contactInfo', {
                                            required: 'Contact information is required',
                                            maxLength: 60
                                        })}
                                    />
                                </div>
                                <div className={ style['form-group'] }>
                                    {
                                        loading
                                        ? (
                                            <div style={{ alignItems: 'center', blockSize: 40, display: 'flex', justifyContent: 'center' }}>
                                                <em className='spinner blue-agora' style={{ blockSize: 36, inlineSize: 36 }} />
                                            </div>
                                        )
                                        : <button className='button-filled' style={{ inlineSize: 120, margin: 'auto' }}>Send</button>
                                    }
                                </div>
                            </form>
                            <p>
                                We encourage you to be creative and think outside the box when submitting your ideas. We value all suggestions, big or small,
                                as they help us to continue improving Agora&apos;s platform for our users.
                            </p>
                            <p>
                                Thank you for your participation in Agora&apos;s Co-Creation Page. We look forward to hearing your ideas and working together to
                                build a better platform.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AgoraLayout>
    )
}

export default CoCreation