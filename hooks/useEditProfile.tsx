import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'

import { useForm } from 'react-hook-form'

import { AuthContext } from '@/context/auth'
import countriesList from '@/db/countries'
import { agoraApi } from '@/api'

import { IUser, IEntrepreneur, IInvestor, IExpert } from '@/interfaces'

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

type FormData2 = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export const useEditProfile = () => {
    const { user, updateName, updateProfilePic, updateRequiredInformation } = useContext(AuthContext)

    const { countries } = countriesList

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        formState: { errors }
    } = useForm<FormData>()

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        getValues: getValues2,
        setValue: setValue2,
        setError: setError2,
        formState: { errors: errors2 }
    } = useForm<FormData2>()

    const fullnameRef = useRef<HTMLInputElement>(null)
    const [fullname, setFullname] = useState('')

    const [fullnameError, setFullnameError] = useState(false)
    const [profilePic, setProfilePic] = useState('')
    const [backgroundPic, setBackgroundPic] = useState('')
    const [video, setVideo] = useState('')
    const [showUserMessage, setShowUserMessage] = useState(false)
    const [showPasswordMessage, setShowPasswordMessage] = useState(false)
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
            source: user?.source!,
            required: user?.required!,
            qversion: user?.qversion!,
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
                profilepic: profileString,
                source: user?.source!,
                required: user?.required!,
                qversion: user?.qversion!,
            })

            if (name !== '' && profilePicture && emailContact !== '' && phone !== '' && country !== '' && city !== '' && address !== '') {
                updateRequiredInformation({
                    ...user!,
                    required: 1
                })
            }

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
            // console.log(error)
        }
    }

    const onChangePassword = async({ newPassword, currentPassword }: FormData2) => {
        const data = {
            email: user?.email,
            currentPassword,
            newPassword,
        }

        try {
            await agoraApi.post('/user/edit-password', data)
            setValue2('currentPassword', '')
            setValue2('newPassword', '')
            setValue2('confirmPassword', '')
            setShowPasswordMessage(true)
            setTimeout(() => {
                setShowPasswordMessage(false)
            }, 3000)
        } catch (error) {
            setError2('currentPassword', { type: 'currentPassword', message: 'Incorrect current password' })
        }

    }

    return {
        user,
        countries,
        fullname,
        profilePic,
        video,
        backgroundPic,
        showUserMessage,
        showPasswordMessage,
        showDataMessage,
        fullnameError,
        fullnameRef,
        register,
        register2,
        errors,
        errors2,
        getValues2,
        onSaveTypeAccountData,
        onFileSelected,
        handleSaveUser,
        handleSubmit,
        handleSubmit2,
        onChangePassword,
    }
}