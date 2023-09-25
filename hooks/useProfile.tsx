import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'

import { agoraApi } from '@/api'
import countriesList from '@/db/countries'

import { IComment, IEntrepreneur, IExpert, IInvestor } from '@/interfaces'
import { useLoadQuestions } from './useLoadQuestions'
import { getCurrentDateFormat } from '@/utils'

export const useProfile = (email: string, id: string, type: string) => {
    const { user, updateRequiredInformation } = useContext(AuthContext)

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
    const [loadingPitchDeck, setLoadingPitchDeck] = useState(false)
    const [hideRocket, setHideRocket] = useState(false)
    const [isMyAccount, setIsMyAccount] = useState(false)
    const [sendRequest, setSendRequest] = useState(false)
    const [messageRequest, setMessageRequest] = useState(false)
    const [comments, setComments] = useState<IComment[]>([])
    const [comment, setComment] = useState('')
    const [validateFriend, setValidateFriend] = useState(false)
    const [averageVote, setAverageVote] = useState(0)
    const [pitchDeck, setPitchDeck] = useState(false)
    const [messagePitchDeck, setMessagePitchDeck] = useState('')
    const [summaryPitchDeck, setSummaryPitchDeck] = useState('')

    const [language, setLanguage] = useState('en')
    const [video1, setVideo1] = useState('')
    const [video2, setVideo2] = useState('')
    const [video3, setVideo3] = useState('')
    const [video4, setVideo4] = useState('')
    const [video5, setVideo5] = useState('')
    const [video6, setVideo6] = useState('')
    const [video7, setVideo7] = useState('')
    const [video8, setVideo8] = useState('')
    const [video9, setVideo9] = useState('')
    const [video10, setVideo10] = useState('')
    const [video11, setVideo11] = useState('')
    const [video12, setVideo12] = useState('')

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
    const [since, setSince] = useState('')

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
        getLanguage()
    }, [])

    useEffect(() => {
        setVideo1(`https://res.cloudinary.com/dp779tmk6/video/upload/v1692975670/SYSVIDEOS/PITCHVIDEO/Entrepreneur/${ language }/1_Cracking_the_investor_pitch.webm`)
        setVideo2(`https://res.cloudinary.com/dp779tmk6/video/upload/v1692975672/SYSVIDEOS/PITCHVIDEO/Entrepreneur/${ language }/2_Cracking_the_investor_pitch_introduction.webm`)
        setVideo3(`https://res.cloudinary.com/dp779tmk6/video/upload/v1692975672/SYSVIDEOS/PITCHVIDEO/Entrepreneur/${ language }/3_Cracking_the_investor_pitch_Problem_statement.webm`)
        setVideo4(`https://res.cloudinary.com/dp779tmk6/video/upload/v1692975679/SYSVIDEOS/PITCHVIDEO/Entrepreneur/${ language }/4_Cracking_the_investor_pitch_Solution_showcase.webm`)
        setVideo5(`https://res.cloudinary.com/dp779tmk6/video/upload/v1692975681/SYSVIDEOS/PITCHVIDEO/Entrepreneur/${ language }/5_Cracking_the_investor_pitch_Unique_value_proposition.webm`)
        setVideo6(`https://res.cloudinary.com/dp779tmk6/video/upload/v1692975669/SYSVIDEOS/PITCHVIDEO/Entrepreneur/${ language }/6_Cracking_the_investor_pitch_Market_opportunity.webm`)
        setVideo7(`https://res.cloudinary.com/dp779tmk6/video/upload/v1692975671/SYSVIDEOS/PITCHVIDEO/Entrepreneur/${ language }/7_Cracking_the_investor_pitch_Business_model.webm`)
        setVideo8(`https://res.cloudinary.com/dp779tmk6/video/upload/v1692975677/SYSVIDEOS/PITCHVIDEO/Entrepreneur/${ language }/8_Cracking_the_investor_pitch_traction_and_milestones.webm`)
        setVideo9(`https://res.cloudinary.com/dp779tmk6/video/upload/v1692975680/SYSVIDEOS/PITCHVIDEO/Entrepreneur/${ language }/9_Cracking_the_investor_pitch_team_introduction.webm`)
        setVideo10(`https://res.cloudinary.com/dp779tmk6/video/upload/v1692975680/SYSVIDEOS/PITCHVIDEO/Entrepreneur/${ language }/10_Cracking_the_investor_pitch_go-to-market_strategy.webm`)
        setVideo11(`https://res.cloudinary.com/dp779tmk6/video/upload/v1692975672/SYSVIDEOS/PITCHVIDEO/Entrepreneur/${ language }/11_Cracking_the_investor_pitch_financial_projections.webm`)
        setVideo12(`https://res.cloudinary.com/dp779tmk6/video/upload/v1692975687/SYSVIDEOS/PITCHVIDEO/Entrepreneur/${ language }/12_Cracking_the_investor_pitch_call_to_action.webm`)
    }, [language])

    useEffect(() => {
        if (user) {
            if (user.email === email) {
                setIsMyAccount(true)
            } else {
                setIsMyAccount(false)

                setTimeout(() => {
                    agoraApi.post('/user/view-profile', { id, email: user.email })
                }, 30000)
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
                checkSendRequest(),
                getUserComments(),
                getValidateFriend(),
                getAverageVotes(),
                verifyPitchDeck(),
                getSummaryPitchDeck(),
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

                if (aboutUsRef.current) {
                    aboutUsRef.current!.value = entrepreneurData.aboutus ? entrepreneurData.aboutus : ''
                }

                if (videoDescRef.current) {
                    videoDescRef.current!.value = entrepreneurData.videodesc ? entrepreneurData.videodesc : ''
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
            setSince(entrepreneurData.since)
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

    const getLanguage = async() => {
        const userLang = await navigator.language.substring(0, 2)

        if (userLang === 'fr')
            setLanguage('fr')
        else if (userLang === 'es')
            setLanguage('es')
        else
            setLanguage('en')
    }

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
                    if (
                        companyNameRef.current &&
                        emailContactRef.current &&
                        phoneRef.current &&
                        countryRef.current &&
                        cityRef.current &&
                        addressRef.current &&
                        companyNameRef.current!.value !== '' &&
                        entrepreneurData?.profilepic &&
                        emailContactRef.current!.value !== '' &&
                        phoneRef.current!.value !== '' &&
                        countryRef.current!.value !== '' &&
                        cityRef.current!.value !== '' &&
                        addressRef.current!.value !== ''
                    ) {
                        updateRequiredInformation({
                            ...user,
                            required: 1
                        })
                    }
                    await agoraApi.post('/entrepreneur/update-entrepreneur-info', data)
                    break
                case 'I':
                    if (
                        companyNameRef.current &&
                        emailContactRef.current &&
                        phoneRef.current &&
                        countryRef.current &&
                        cityRef.current &&
                        addressRef.current &&
                        companyNameRef.current!.value !== '' &&
                        entrepreneurData?.profilepic &&
                        emailContactRef.current!.value !== '' &&
                        phoneRef.current!.value !== '' &&
                        countryRef.current!.value !== '' &&
                        cityRef.current!.value !== '' &&
                        addressRef.current!.value !== ''
                    ) {
                        updateRequiredInformation({
                            ...user,
                            required: 1
                        })
                    }
                    await agoraApi.post('/investor/update-investor-info', data)
                    break
                case 'X':
                    if (
                        companyNameRef.current &&
                        emailContactRef.current &&
                        phoneRef.current &&
                        countryRef.current &&
                        cityRef.current &&
                        addressRef.current &&
                        companyNameRef.current!.value !== '' &&
                        entrepreneurData?.profilepic &&
                        emailContactRef.current!.value !== '' &&
                        phoneRef.current!.value !== '' &&
                        countryRef.current!.value !== '' &&
                        cityRef.current!.value !== '' &&
                        addressRef.current!.value !== ''
                    ) {
                        updateRequiredInformation({
                            ...user,
                            required: 1
                        })
                    }
                    await agoraApi.post('/expert/update-expert-info', data)
                    break
                default:
                    break
            }
        } catch (error: any) {
            // console.log(error)
            // updateRequiredInformation({
            //     ...user!,
            //     required: 0
            // })
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
        setSendRequest(false)
        try {
            const { data } = await agoraApi.get(`/contact/check-send-request?id=${ id }&email=${ user?.email }`)
            if (data.verify > 0)
                setSendRequest(true)
        } catch (error) {
            
        }
    }

    const getAverageVotes = async() => {
        const { data } = await agoraApi.get(`/vote/get-average-votes?id=${ id }`)
        setAverageVote(data.average)
    }

    const getUserComments = async() => {
        const { data } = await agoraApi.get<IComment[]>(`/user-comment/get-user-comments?id=${ id }`)
        setComments(data)
    }

    const getValidateFriend = async() => {
        const { data } = await agoraApi.get(`/contact/validate-friend?email=${ user?.email }&id=${ id }`)
        if (data.isFriend === 1) {
            setValidateFriend(true)
        }
    }

    const verifyPitchDeck = async() => {
        const { data } = await agoraApi.get(`/entrepreneur/verify-pitch-deck?id=${ id }`)
        if (data.response === 1) {
            setPitchDeck(true)
        }
    }

    const getSummaryPitchDeck = async() => {
        const { data } = await agoraApi.get(`/pitch-deck/get-summary?id=${ id }`)
        if (data.text)
            setSummaryPitchDeck(data.text)
    }

    const handleComment = async() => {
        if (comment.length > 0) {
            setComment('')

            await agoraApi.post('/user-comment/save-user-comment', { email: user?.email, userId: id.toString(), body: comment })

            const currentDate = getCurrentDateFormat()

            setComments(
                [
                    ...comments,
                    {
                        index: Number(currentDate),
                        type: user?.type!,
                        companyName: entrepreneurData?.name!,
                        fullname: user?.fullname!,
                        body: comment,
                        dateAdded: currentDate,
                        profilepic: user?.profilepic!,
                        server: false,
                    }
                ]
            )
        }
    }

    const handlePitchDeck = async() => {
        setLoadingPitchDeck(true)

        try {
            setMessagePitchDeck('1/11 Processing Country Context...');
            await agoraApi.post('/pitch-deck/step-1', { email: user?.email, id: user?.id })
            setMessagePitchDeck('2/11 Processing Company/Firm Profile...');
            await agoraApi.post('/pitch-deck/step-2', { email: user?.email, id: user?.id })
            setMessagePitchDeck('3/11 Processing Business Activities...');
            await agoraApi.post('/pitch-deck/step-3', { email: user?.email, id: user?.id })
            setMessagePitchDeck('4/11 Processing Market Analysis and Business Strategy...');
            await agoraApi.post('/pitch-deck/step-4', { email: user?.email, id: user?.id })
            setMessagePitchDeck('5/11 Processing Business Related Risk...');
            await agoraApi.post('/pitch-deck/step-5', { email: user?.email, id: user?.id })
            setMessagePitchDeck('6/11 Processing Past Financial Performance...');
            await agoraApi.post('/pitch-deck/step-6', { email: user?.email, id: user?.id })
            setMessagePitchDeck('7/11 Processing Project Information...');
            await agoraApi.post('/pitch-deck/step-7', { email: user?.email, id: user?.id })
            setMessagePitchDeck('8/11 Processing Future Proyections...');
            await agoraApi.post('/pitch-deck/step-8', { email: user?.email, id: user?.id })
            setMessagePitchDeck('9/11 Processing Funding Request...');
            await agoraApi.post('/pitch-deck/step-9', { email: user?.email, id: user?.id })
            setMessagePitchDeck('10/11 Processing Pitch Deck Document...');
            await agoraApi.post('/pitch-deck/step-10', { email: user?.email, id: user?.id })
            setMessagePitchDeck('11/11 Processing Summary Pitch Deck...');
            await agoraApi.post('/pitch-deck/step-11', { email: user?.email, id: user?.id })

            const { data: verify } = await agoraApi.get(`/entrepreneur/verify-pitch-deck?id=${ id }`)
            if (verify.response === 1) {
                setPitchDeck(true)
            }

            const { data } = await agoraApi.get(`/pitch-deck/get-summary?id=${ id }`)
            if (data.text)
                setSummaryPitchDeck(data.text)

        } catch (error) {
            
        } finally {
            setLoadingPitchDeck(false)
        }
    }

    const handleSaveSummaryPitchDeck = async(event: ChangeEvent<HTMLTextAreaElement>) => {
        await agoraApi.post('/pitch-deck/save-summary', { text: event.target.value, email: user?.email, id: user?.id })
    }

    const handleUploadVideo = async({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return
        }

        const inputVideo = document.querySelector('#video') as HTMLInputElement

        if (inputVideo.files!.length > 0) {
            const formDataVideo = new FormData()
            formDataVideo.append('video', inputVideo.files![0])
            const { data: newVideo } = await agoraApi.post('/files/video', formDataVideo)

            const data = {
                email: user?.email,
                videoUrl: newVideo
            }
    
            switch (user?.type) {
                case 'E':
                    await agoraApi.post(`/entrepreneur/update-video`, data)
                    setVideoUrl(newVideo)
                    break
                case 'I':
                    await agoraApi.post(`/investor/update-video`, data)
                    setVideoUrl(videoUrl)
                    break
                case 'X':
                    await agoraApi.post(`/expert/update-video`, data)
                    setVideoUrl(videoUrl)
                    break
                default:
                    break
            }
        }

        
    }

    return {
        video1,
        video2,
        video3,
        video4,
        video5,
        video6,
        video7,
        video8,
        video9,
        video10,
        video11,
        video12,
        isMyAccount,
        countries,
        user,
        loading,
        loadingPic,
        loadingPitchDeck,
        hideRocket,
        profilePic,
        messagePitchDeck,
        summaryPitchDeck,
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
        since,
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
        comments,
        comment,
        validateFriend,
        averageVote,
        pitchDeck,
        setComment,
        onFileSelected,
        handleUpdateEntrepreneurInfo,
        handleSendRequest,
        handleComment,
        handlePitchDeck,
        handleSaveSummaryPitchDeck,
        getAverageVotes,
        handleUploadVideo,
    }
}