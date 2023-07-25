import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'

import { agoraApi } from '@/api'
import countriesList from '@/db/countries'
import { useQuestionnaire } from './useQuestionnaire'

import { IEntrepreneur, IExpert, IInvestor } from '@/interfaces'

export const useProfile = (email: string, id: string, type: string) => {
    const { user } = useContext(AuthContext)

    const router = useRouter()

    const { countries } = countriesList

    const {
        percentage,
        hide: globalHide,
        answeredQuestions,
        masterHide,
        updateHide,
        newMasterHide,
    } = useContext(QuestionnaireContext)

    const [loading, setLoading] = useState(false)
    const [loadingPic, setLoadingPic] = useState(false)
    const [showRocket, setShowRocket] = useState(false)
    const [isMyAccount, setIsMyAccount] = useState(false)

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

    const fileInputRef = useRef<HTMLInputElement>(null)
    const companyNameRef = useRef<HTMLInputElement>(null)
    const emailContactRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const countryRef = useRef<HTMLSelectElement>(null)
    const cityRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)

    const { data } = useQuestionnaire()

    useEffect(() => {
        if (user) {
            if (user.email === email) {
                setIsMyAccount(true)
            }
        }
    }, [user])
    
    useEffect(() => {
        if (user) {
            setLoading(true)
            Promise.all([
                loadData(),
                validateRequiredData(),
                validateCompleteQuestionnaire()
            ]).then(() => {
                setLoading(false)
            })
        }
    }, [user])

    useEffect(() => {
        if (entrepreneurData) {
            setTimeout(() => {
                if (companyNameRef.current && emailContactRef.current && phoneRef.current && countryRef.current && cityRef.current && addressRef.current) {
                    companyNameRef.current!.value = entrepreneurData.name
                    emailContactRef.current!.value = entrepreneurData.email_contact
                    phoneRef.current!.value = entrepreneurData.phone
                    countryRef.current!.value = entrepreneurData.country
                    cityRef.current!.value = entrepreneurData.city
                    addressRef.current!.value = entrepreneurData.address
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
        }
    }, [entrepreneurData])

    useEffect(() => {
        if (data.length > 0) {
            let hideArr: string[] = []
            for (let i = 0; i<data.length; i++) {
                const questions = data[i].questions
                for (let j=0; j<questions.length; j++) {
                    const question = questions[j]
                    if (question.answers && question.object === 'L') {
                        const answers = question.answers
                        const find = answeredQuestions.find((answered: any) => {
                            const split = answered.split('-')
                            if (Number(split[0]) === Number(question.qnbr)) {
                                return answered
                            }
                            return null
                        })
                        
                        if (find) {
                            const split = find.split('-')
                            const resp = answers.filter((ans: any) => Number(ans.anbr) === Number(split[1]))
                            if (resp.length > 0) {
                                const respShowSplit = resp[0].show?.split(',') || null
                                let respHideSplit: any
                                if (resp[0].hide?.substring(0, 4) === 'qnbr') {
                                    // const storage = JSON.parse(localStorage.getItem('questionnaire')!)
                                    // const numberQuestion = Number(resp[0].hide?.substring(4, 7))
                                    // const numberAnswer = resp[0].hide?.substring(8).split(':')
                                    // for (let i=0; i<storage.length; i++) {
                                    //     if (Number(storage[i].qnbr) === numberQuestion) {
                                    //         for (let j=0; j<numberAnswer.length; j++) {
                                    //             if (Number(storage[i].anbr) === Number(numberAnswer[j].substring(0, 2))) {
                                    //                 respHideSplit = numberAnswer[j].substring(3).split(',')
                                    //             }
                                    //         }
                                    //     }
                                    // }
                                } else {
                                    respHideSplit = resp[0].hide?.split(',') || null
                                }

                                if (respShowSplit) {
                                    if (respShowSplit.length > 0) {
                                        for (let k=0; k<respShowSplit.length; k++) {
                                            const showSplit = respShowSplit[k]
                                            for(let l=0; l<hideArr.length; l++) {
                                                const hide = hideArr[l]
                                                if (showSplit === hide) {
                                                    hideArr.splice(l, 1)
                                                }
                                            }
                                        }
                                    }
                                }
    
                                if (respHideSplit) {
                                    if(respHideSplit.length > 0) {
                                        for (let k=0; k<respHideSplit.length; k++) {
                                            const hideSplit = respHideSplit[k]
                                            let flag = false
                                            for (let l=0; l<hideArr.length; l++) {
                                                const hide = hideArr[l]
                                                if (hideSplit === hide) {
                                                    flag = true
                                                }
                                            }
    
                                            if (!flag) {
                                                hideArr.push(hideSplit)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            updateHide(hideArr.length)
            newMasterHide(hideArr)
        }
    }, [data])
    
    useEffect(() => {
        let removeDuplicates: any = []
        for (let i=0; i<masterHide.length; i++) {
            const find = removeDuplicates.find((remove: any) => remove === masterHide[i])
            if (!find)
                removeDuplicates.push(masterHide[i])
        }
        updateHide(removeDuplicates.length)
    }, [masterHide, globalHide])

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
            setShowRocket(true)
        } catch (error) {
            setShowRocket(false)
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
            console.log(error)
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
        } catch (error: any) {
            console.log(error)
        }
    }

    return {
        isMyAccount,
        countries,
        user,
        loading,
        loadingPic,
        showRocket,
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
        companyNameRef,
        emailContactRef,
        fileInputRef,
        phoneRef,
        countryRef,
        cityRef,
        addressRef,
        entrepreneurData,
        percentage,
        onFileSelected,
        handleUpdateEntrepreneurInfo,
    }
}