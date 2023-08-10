import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'

import { useForm } from 'react-hook-form'

import { HomeLoginWithoutMenuLayout } from '@/components/layouts/HomeLoginWithoutMenuLayout'

import { AuthContext } from '@/context/auth'
import countriesList from '@/db/countries'
import { agoraApi } from '@/api'

import { IUser, IEntrepreneur, IInvestor, IExpert } from '@/interfaces'

import styles from './edit-profile.module.css'

type FormData = {
    name: string
    profilePicture: string
    emailContact: string
    phone: string
    country: string
    city: string
    address: string
    video: string
    companyUrl: string
    facebookUrl: string
    linkedinUrl: string
    twitterUrl: string
    backgroundPicture: string
}

const EditProfile: NextPage = () => {
    const { user, updateName, updateProfilePic } = useContext(AuthContext)

    const { countries } = countriesList

    const { register, handleSubmit, getValues, setValue, setError, formState: { errors } } = useForm<FormData>()

    const fullnameRef = useRef<HTMLInputElement>(null)
    const [fullname, setFullname] = useState('')

    const [fullnameError, setFullnameError] = useState(false)
    const [profilePic, setProfilePic] = useState('')
    const [backgroundPic, setBackgroundPic] = useState('')
    const [video, setVideo] = useState('')
    const [showUserMessage, setShowUserMessage] = useState(false)
    const [showDataMessage, setShowDataMessage] = useState(false)

    useEffect(() => {
        if (user) {
            loadUserData()
            loadAccountTypeData()
        }
    }, [user])

    const onFileSelected = async({ target }: ChangeEvent<HTMLInputElement>, type: string) => {
        if (!target.files || target.files.length === 0) {
            return
        }

        switch (type) {
            case 'profile':
                setProfilePic(URL.createObjectURL(target.files[0]))
                break
            case 'background':
                setBackgroundPic(URL.createObjectURL(target.files[0]))
                break
            case 'video':
                setVideo(URL.createObjectURL(target.files[0]))
                break
            default:
                break
        }
    }

    const loadUserData = async() => {
        const { data } = await agoraApi.get<IUser>(`/user/load-user-data?email=${ user?.email }`)
        setFullname(data?.fullname)
    }

    const loadAccountTypeData = async() => {
        let data = null

        switch (user?.type) {
            case 'E':
                const { data: entrepreneur } = await agoraApi.get<IEntrepreneur>(`/entrepreneur/get-data-by-email?email=${ user?.email }`)
                data = entrepreneur
                break
            case 'I':
                const { data: investor } = await agoraApi.get<IInvestor>(`/investor/get-data-by-email?email=${ user?.email }`)
                data = investor
                break
            case 'X':
                const { data: expert } = await agoraApi.get<IExpert>(`/expert/get-data-by-email?email=${ user?.email }`)
                data = expert
                break
            default:
                break
        }

        setProfilePic(data!.profilepic)
        setBackgroundPic(data!.backpic)
        setVideo(data!.videourl)

        setValue('profilePicture', data!.profilepic)
        setValue('name', data!.name)
        setValue('emailContact', data!.email_contact)
        setValue('phone', data!.phone)
        setValue('country', data!.country)
        setValue('city', data!.city)
        setValue('address', data!.address)
        setValue('companyUrl', data!.web)
        setValue('facebookUrl', data!.facebook)
        setValue('linkedinUrl', data!.linkedin)
        setValue('twitterUrl', data!.twitter)
        setValue('backgroundPicture', data!.backpic)
    }

    const handleSaveUser = async() => {
        if (fullnameRef.current?.value === '') {
            setFullnameError(true)
            fullnameRef.current.focus()
            return
        }

        updateName({
            id: user?.id!,
            email: user?.email!,
            type: user?.type!,
            token: user?.token!,
            fullname: fullnameRef.current?.value!,
            name: fullnameRef.current?.value!,
        })

        await agoraApi.post('/user/update-user-info', { email: user?.email, fullname: fullnameRef.current?.value })

        setShowUserMessage(true)

        setTimeout(() => {
            setShowUserMessage(false)
        }, 3000)
    }

    const onSaveTypeAccountData = async({
        name,
        profilePicture,
        emailContact,
        phone,
        country,
        city,
        address,
        video,
        companyUrl,
        facebookUrl,
        linkedinUrl,
        twitterUrl,
        backgroundPicture
    }: FormData) => {
        if (getValues('profilePicture') === '' || !getValues('profilePicture')) {
            setError('profilePicture', {})
        }

        const inputProfile = document.querySelector('#profilePic') as HTMLInputElement
        const inputBackground = document.querySelector('#backgroundPic') as HTMLInputElement
        const inputVideo = document.querySelector('#video') as HTMLInputElement
        
        let profileString = ''
        let backgroundString = ''
        let videoString = ''

        try {
            if (inputProfile.files!.length > 0) {
                const formDataProfile = new FormData()
                formDataProfile.append('file', profilePicture[0])
                const { data: profileUrl } = await agoraApi.post('/files/user-profile', formDataProfile)
                profileString = profileUrl
            }
            if (inputBackground.files!.length > 0) {
                const formDataBackground = new FormData()
                formDataBackground.append('file', backgroundPicture[0])
                const { data: backgroundUrl } = await agoraApi.post('/files/user-background', formDataBackground)
                backgroundString = backgroundUrl
            }
            if (inputVideo.files!.length > 0) {
                const formDataVideo = new FormData()
                formDataVideo.append('video', video[0])
                const { data: videoUrl } = await agoraApi.post('/files/video', formDataVideo)
                videoString = videoUrl
            }

            const data = {
                email: user?.email,
                name,
                email_contact: emailContact,
                phone,
                country,
                city,
                address,
                profilepic: profileString ? profileString : '',
                backpic: backgroundString ? backgroundString : '',
                videourl: videoString ? videoString : '',
                web: companyUrl ? companyUrl : '',
                facebook: facebookUrl ? facebookUrl : '',
                linkedin: linkedinUrl ? linkedinUrl : '',
                twitter: twitterUrl ? twitterUrl : '',
            }

            updateProfilePic({
                id: user?.id!,
                email: user?.email!,
                type: user?.type!,
                token: user?.token!,
                fullname: user?.fullname!,
                name: user?.fullname!,
                profilepic: profileString
            })

            switch (user?.type) {
                case 'E':
                    await agoraApi.post(`/entrepreneur/update`, data)
                    break
                case 'I':
                    await agoraApi.post(`/investor/update`, data)
                    break
                case 'X':
                    await agoraApi.post(`/expert/update`, data)
                    break
                default:
                    break
            }

            setShowDataMessage(true)

            setTimeout(() => {
                setShowDataMessage(false)
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <HomeLoginWithoutMenuLayout
            title=''
            pageDescription=''
        >
            <>
                <div className={ `window-glass ${ styles['window-glass'] }` }>
                    <div className={ `window-glass-content` }>
                        <div className={ styles['group'] }>
                            <h3 className={ styles['title'] }>User information</h3>
                            <div className={ styles['form-group'] }>
                                <label>Username</label>
                                <label>{ user?.email }</label>
                            </div>
                            <div className={ styles['form-group'] }>
                                <label>Full name *</label>
                                <input
                                    ref={ fullnameRef }
                                    type='text'
                                    className={ `field ${ styles['textfield'] } ${ fullnameError ? styles['error'] : '' }` }
                                    defaultValue={ fullname }
                                />
                            </div>
                            <div style={{ display: 'inline-block', inlineSize: '100%', textAlign: 'center', marginBlockStart: 16 }}>
                                <input
                                    type='submit'
                                    value='Save user information'
                                    className={ `button-filled` }
                                    style={{ paddingInline: 20 }}
                                    onClick={ handleSaveUser }
                                />
                            </div>
                            {
                                showUserMessage && (
                                    <div style={{ display: 'inline-block', inlineSize: '100%', textAlign: 'center', marginBlockStart: 16 }}>
                                        <span style={{ color: '#006f0d' }}>Your information has been updated</span>
                                    </div>
                                )
                            }
                        </div>
                        <hr style={{ borderBlockStart: '1px solid rgba(0,0,0,0.1)', marginBlock: 30 }} />
                        <form onSubmit={ handleSubmit(onSaveTypeAccountData) } noValidate>
                            <div className={ styles['group'] }>
                                <h3 className={ styles['title'] }>Entrepreneur information</h3>
                                <div className={ styles['form-group'] }>
                                    <label>Company name *</label>
                                    <input
                                        type='text'
                                        className={ `field ${ styles['textfield'] }` }
                                        { ...register('name', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Profile picture *</label>
                                    <div style={{ alignItems: 'center', display: 'flex', gap: 16, inlineSize: 'calc(100% - 24px)' }}>
                                        <input
                                            type='button'
                                            className={ `button-filled` }
                                            style={{ blockSize: 34, backgroundColor: errors.profilePicture ? 'red' : '#10284F' }}
                                            value='Upload image'
                                            onClick={ () => document.getElementById('profilePic')!.click() }
                                        />
                                        <input
                                            id='profilePic'
                                            type="file"
                                            accept='image/png, image/jpg, image/jpeg'
                                            style={{ display: 'none' }}
                                            { ...register('profilePicture', {
                                                // required: true,
                                                onChange: (event) => onFileSelected(event, 'profile')
                                            })}
                                        />
                                        <div style={{ inlineSize: 40, blockSize: 40 }}>
                                            {
                                                profilePic && (
                                                    <Image
                                                        src={ profilePic }
                                                        alt=''
                                                        width={ 40 }
                                                        height={ 40 }
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Email contact *</label>
                                    <input
                                        type='text'
                                        className={ `field ${ styles['textfield'] } ${ errors.emailContact ? styles['error'] : '' }` }
                                        { ...register('emailContact', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Phone *</label>
                                    <input
                                        type='text'
                                        className={ `field ${ styles['textfield'] }` }
                                        { ...register('phone', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Country *</label>
                                    <select
                                        className={ `field select ${ styles['select'] }` }
                                        style={{ borderRadius: 100 }}
                                        // defaultValue={ country }
                                        { ...register('country', {
                                            required: true,
                                        })}
                                    >
                                        {
                                            countries.map(country => (
                                                <option key={ country.alpha3 } value={ country.alpha3 }>{ country.name }</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>City *</label>
                                    <input
                                        type='text'
                                        className={ `field ${ styles['textfield'] }` }
                                        { ...register('city', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Address *</label>
                                    <input
                                        type='text'
                                        className={ `field ${ styles['textfield'] }` }
                                        { ...register('address', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Video</label>
                                    <div style={{ alignItems: 'center', display: 'flex', gap: 16, inlineSize: 'calc(100% - 24px)', position: 'relative' }}>
                                        <input
                                            type='button'
                                            className={ `button-filled` }
                                            value='Upload video'
                                            onClick={ () => document.getElementById('video')!.click() }
                                        />
                                        <input
                                            id='video'
                                            type="file"
                                            accept='video/mp4'
                                            style={{ display: 'none' }}
                                            { ...register('video', {
                                                onChange: (event) => onFileSelected(event, 'video')
                                            }) }
                                        />
                                        <div style={{ position: 'absolute', inlineSize: 80, blockSize: 80, left: 170 }}>
                                            {
                                                video && (
                                                    <video width={ 80 } height={ 80 } autoPlay muted loop>
                                                        <source src={ video } />
                                                    </video>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Company URL</label>
                                    <input
                                        type='text'
                                        className={ `field ${ styles['textfield'] }` }
                                        { ...register('companyUrl') }
                                    />
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Facebook URL</label>
                                    <div className={ styles['social-container'] }>
                                        <label>https://www.facebook.com/</label>
                                        <input
                                            type='text'
                                            className={ `field ${ styles['textfield'] }` }
                                            { ...register('facebookUrl') }
                                        />
                                    </div>
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Linkedin URL</label>
                                    <div className={ styles['social-container'] }>
                                        <label>https://www.linkedin.com/in/</label>
                                        <input
                                            type='text'
                                            className={ `field ${ styles['textfield'] }` }
                                            { ...register('linkedinUrl') }
                                        />
                                    </div>
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Twitter URL</label>
                                    <div className={ styles['social-container'] }>
                                        <label>https://www.twitter.com/</label>
                                        <input
                                            type='text'
                                            className={ `field ${ styles['textfield'] }` }
                                            { ...register('twitterUrl') }
                                        />
                                    </div>
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Background picture</label>
                                    <div style={{ alignItems: 'center', display: 'flex', gap: 16, inlineSize: 'calc(100% - 24px)' }}>
                                        <input
                                            type='button'
                                            className={ `button-filled` }
                                            value='Upload image'
                                            onClick={ () => document.getElementById('backgroundPic')!.click() }
                                        />
                                        <input
                                            id='backgroundPic'
                                            type="file"
                                            accept='image/png, image/jpg, image/jpeg'
                                            style={{ display: 'none' }}
                                            { ...register('backgroundPicture', {
                                                onChange: (event) => onFileSelected(event, 'background')
                                            }) }
                                        />
                                        <div style={{ inlineSize: 40, blockSize: 40 }}>
                                            {
                                                backgroundPic && (
                                                    <Image
                                                        src={ backgroundPic }
                                                        alt=''
                                                        width={ 40 }
                                                        height={ 40 }
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'inline-block', inlineSize: '100%', textAlign: 'center', marginBlockStart: 16 }}>
                                    <input type='submit' value='Save entrepreneur information' className={ `button-filled` } style={{ paddingInline: 20 }} />
                                </div>
                                {
                                    showDataMessage && (
                                        <div style={{ display: 'inline-block', inlineSize: '100%', textAlign: 'center', marginBlockStart: 16 }}>
                                            <span style={{ color: '#006f0d' }}>Your information has been updated</span>
                                        </div>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </>
        </HomeLoginWithoutMenuLayout>
    )
}

export default EditProfile