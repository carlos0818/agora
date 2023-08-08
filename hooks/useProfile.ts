import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'

import { agoraApi } from '@/api'
import countriesList from '@/db/countries'

import { IEntrepreneur, IExpert, IInvestor } from '@/interfaces'
import { useLoadQuestions } from './useLoadQuestions'

export const useProfile = (email: string, id: string, type: string) => {
    const { user } = useContext(AuthContext)

    const router = useRouter()

    const { countries } = countriesList

    const {
        percentage,
        hide: globalHide,
        masterHide,
        updateHide,
    } = useContext(QuestionnaireContext)

    const [loading, setLoading] = useState(false)
    const [loadingPic, setLoadingPic] = useState(false)
    const [hideRocket, setHideRocket] = useState(false)
    const [isMyAccount, setIsMyAccount] = useState(false)
    const [sendRequest, setSendRequest] = useState(false)
    const [messageRequest, setMessageRequest] = useState(false)

    const [entrepreneurData, setEntrepreneurData] = useState<IEntrepreneur | null>(null)
    const [companyName, setCompanyName] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [emailContact, setEmailContact] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [countryId, setCountryId] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [aboutUs, setAboutUs] = useState('')
    const [videoDesc, setVideoDesc] = useState('')
    const [backPic, setBackPic] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [facebook, setFacebook] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [twitter, setTwitter] = useState('')

    const fileInputRef = useRef<HTMLInputElement>(null)
    const companyNameRef = useRef<HTMLInputElement>(null)
    const emailContactRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const countryRef = useRef<HTMLSelectElement>(null)
    const cityRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)

    const aboutUsRef = useRef<HTMLTextAreaElement>(null)
    const videoDescRef = useRef<HTMLTextAreaElement>(null)

    const { loadQuestions, getUserAnswers } = useLoadQuestions()

    useEffect(() => {
        if (user) {
            if (user.email === email) {
                setIsMyAccount(true)
            }
            loadQuestions()
            getUserAnswers()
        }
    }, [user, id])
    
    useEffect(() => {
        if (user) {
            setLoading(true)
            Promise.all([
                loadData(),
                validateRequiredData(),
                validateCompleteQuestionnaire(),
                checkSendRequest()
            ]).then(() => {
                setLoading(false)
            })
        }
    }, [user, id])

    useEffect(() => {
        if (entrepreneurData) {
            setTimeout(() => {
                if (
                    companyNameRef.current &&
                    emailContactRef.current &&
                    phoneRef.current &&
                    countryRef.current &&
                    cityRef.current &&
                    addressRef.current
                ) {
                    companyNameRef.current!.value = entrepreneurData.name
                    emailContactRef.current!.value = entrepreneurData.email_contact
                    phoneRef.current!.value = entrepreneurData.phone
                    countryRef.current!.value = entrepreneurData.country
                    cityRef.current!.value = entrepreneurData.city
                    addressRef.current!.value = entrepreneurData.address
                }

                if (
                    aboutUsRef.current &&
                    videoDescRef.current
                ) {
                    aboutUsRef.current!.value = entrepreneurData.aboutus
                    videoDescRef.current!.value = entrepreneurData.videodesc
                }
            }, 500)

            setProfilePic(entrepreneurData.profilepic)
            setCompanyName(entrepreneurData.name)
            setEmailContact(entrepreneurData.email_contact)
            setPhone(entrepreneurData.phone)
            setCountry(countries.find(c => c.alpha3 === entrepreneurData.country && entrepreneurData.country !== '')?.name!)
            setCountryId(countries.find(c => c.alpha3 === entrepreneurData.country && entrepreneurData.country !== '')?.alpha3!)
            setCity(entrepreneurData.city)
            setAddress(entrepreneurData.address)
            setAboutUs(entrepreneurData.aboutus)
            setVideoDesc(entrepreneurData.videodesc)
            setBackPic(entrepreneurData.backpic)
            setVideoUrl(entrepreneurData.videourl)
            setFacebook(entrepreneurData.facebook)
            setLinkedin(entrepreneurData.linkedin)
            setTwitter(entrepreneurData.twitter)
        }
    }, [entrepreneurData, id])
    
    useEffect(() => {
        let removeDuplicates: any = []
        for (let i=0; i<masterHide.length; i++) {
            const find = removeDuplicates.find((remove: any) => remove === masterHide[i])
            if (!find)
                removeDuplicates.push(masterHide[i])
        }
        updateHide(removeDuplicates.length)
    }, [masterHide, globalHide, id])

    const loadData = async() => {
        switch (type) {
            case 'E':
                const { data: entrepreneur } = await agoraApi.get<IEntrepreneur>(`/entrepreneur/get-data-by-id?id=${ id }`)
                setEntrepreneurData(entrepreneur)
                break
            case 'I':
                const { data: investor } = await agoraApi.get<IInvestor>(`/investor/get-data-by-id?id=${ id }`)
                setEntrepreneurData(investor)
                break
            case 'X':
                const { data: expert } = await agoraApi.get<IExpert>(`/expert/get-data-by-id?id=${ id }`)
                setEntrepreneurData(expert)
                break
            default:
                break
        }
    }

    const validateCompleteQuestionnaire = async() => {
        try {
            await agoraApi.get(`/question/validate-complete-questionnaire-by-email?email=${ user?.email }`)
            setHideRocket(false)
        } catch (error) {
            setHideRocket(true)
        }
    }

    const validateRequiredData = async() => {
        try {
            switch (type) {
                case 'E':
                    await agoraApi.get(`/entrepreneur/validate-required-data?id=${ id }`, { headers: { 'Authorization': `Bearer ${ user?.token }` } })
                    break
                case 'I':
                    await agoraApi.get(`/investor/validate-required-data?id=${ id }`, { headers: { 'Authorization': `Bearer ${ user?.token }` } })
                    break
                case 'X':
                    await agoraApi.get(`/expert/validate-required-data?id=${ id }`, { headers: { 'Authorization': `Bearer ${ user?.token }` } })
                    break
                default:
                    break
            }
        } catch (error) {
            router.replace('/')
        }
    }

    const onFileSelected = async({ target }: ChangeEvent<HTMLInputElement>) => {
        setLoadingPic(true)

        if (!target.files || target.files.length === 0) {
            return
        }

        const formData = new FormData()
        formData.append('file', target.files[0])

        try {
            const { data: url } = await agoraApi.post('/files/user-profile', formData)
            const data = {
                profilepic: url,
                email: user?.email
            }
            switch (type) {
                case 'E':
                    await agoraApi.post('/entrepreneur/update-entrepreneur-info', data)
                    break
                case 'I':
                    await agoraApi.post('/investor/update-investor-info', data)
                    break
                case 'X':
                    await agoraApi.post('/expert/update-expert-info', data)
                    break
                default:
                    break
            }
            setProfilePic(url)
            setLoadingPic(false)
        } catch (error) {
            // console.log(error)
            setLoadingPic(false)
        }
    }

    const handleUpdateEntrepreneurInfo = async(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, type: string) => {
        const value = event.target.value
        let data = {
            [type]: value,
            email: user?.email
        }

        switch (type) {
            case 'name':
                setCompanyName(value)
                break
            case 'email_contact':
                setEmailContact(value)
                break
            case 'phone':
                setPhone(value)
                break
            case 'country':
                const country: string = countries.find(c => c.alpha3 === value && value !== '')?.name!
                setCountry(country)
                break
            case 'city':
                setCity(value)
                break
            case 'address':
                setAddress(value)
                break
            default:
                break
        }

        try {
            switch (user?.type) {
                case 'E':
                    console.log('E')
                    await agoraApi.post('/entrepreneur/update-entrepreneur-info', data)
                    break
                case 'I':
                    console.log('I')
                    await agoraApi.post('/investor/update-investor-info', data)
                    break
                case 'X':
                    console.log('X')
                    await agoraApi.post('/expert/update-expert-info', data)
                    break
                default:
                    break
            }
        } catch (error: any) {
            // console.log(error)
        }
    }

    const handleSendRequest = async() => {
        try {
            await agoraApi.post(`/contact/send-request`, { id, email:  user?.email })
            setSendRequest(true)

            setMessageRequest(true)
            setTimeout(() => {
                setMessageRequest(false)
            }, 3000)
        } catch (error) {
            
        }
    }

    const checkSendRequest = async() => {
        try {
            const { data } = await agoraApi.get(`/contact/check-send-request?id=${ id }&email=${ user?.email }`)
            if (data.verify === 1)
                setSendRequest(true)
        } catch (error) {
            
        }
    }

    return {
        isMyAccount,
        countries,
        user,
        loading,
        loadingPic,
        hideRocket,
        profilePic,
        companyName,
        emailContact,
        city,
        countryId,
        country,
        address,
        phone,
        aboutUs,
        videoDesc,
        backPic,
        videoUrl,
        facebook,
        linkedin,
        twitter,
        companyNameRef,
        emailContactRef,
        fileInputRef,
        phoneRef,
        countryRef,
        cityRef,
        addressRef,
        aboutUsRef,
        videoDescRef,
        entrepreneurData,
        percentage,
        sendRequest,
        messageRequest,
        onFileSelected,
        handleUpdateEntrepreneurInfo,
        handleSendRequest,
    }
}