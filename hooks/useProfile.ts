import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'

import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'

import { agoraApi } from '@/api'
import countriesList from '@/db/countries'
import { useQuestionnaire } from './useQuestionnaire'
import { IEntrepreneur } from '@/interfaces/entrepreneur'

export const useProfile = (email: string, id: string) => {
    const { user } = useContext(AuthContext)

    const { countries } = countriesList

    const {
        percentage,
        hide: globalHide,
        answeredQuestions,
        masterHide,
        updateMasterHide,
        updateHide,
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
    const [countryId, setCountryId] = useState<string>('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')

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
            validateCompleteQuestionnaire()
            loadDataEntrepreneur()
        }
    }, [user])

    useEffect(() => {
        if (entrepreneurData) {
            if (companyNameRef.current && emailContactRef.current && phoneRef.current && countryRef.current && cityRef.current && addressRef.current) {
                companyNameRef.current!.value = entrepreneurData.name
                emailContactRef.current!.value = entrepreneurData.email_contact
                phoneRef.current!.value = entrepreneurData.phone
                countryRef.current!.value = entrepreneurData.country
                cityRef.current!.value = entrepreneurData.city
                addressRef.current!.value = entrepreneurData.address
            }

            setProfilePic(entrepreneurData.profilepic)
            setCompanyName(entrepreneurData.name)
            setEmailContact(entrepreneurData.email_contact)
            setPhone(entrepreneurData.phone)
            setCountry(countries.find(c => c.alpha3 === entrepreneurData.country && entrepreneurData.country !== '')?.name!)
            setCountryId(countries.find(c => c.alpha3 === entrepreneurData.country && entrepreneurData.country !== '')?.alpha3!)
            setCity(entrepreneurData.city)
            setAddress(entrepreneurData.address)
        }
    }, [entrepreneurData])

    useEffect(() => {
        data.map((page: any) => {
            page.questions.map((question: any) => {
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

                            if (respHideSplit) {
                                updateMasterHide([...respHideSplit])
                            }
                        }
                    }
                }
            })
        })
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

    const loadDataEntrepreneur = async() => {
        setLoading(true)
        const { data } = await agoraApi.get<IEntrepreneur>(`/entrepreneur/get-data-by-id?id=${ id }`)
        setEntrepreneurData(data)
        setLoading(false)
    }

    const validateCompleteQuestionnaire = async() => {
        try {
            await agoraApi.get(`/question/validate-complete-questionnaire?email=${ user?.email }`)
            setShowRocket(true)
        } catch (error) {
            setShowRocket(false)
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
            await agoraApi.post('/entrepreneur/update-entrepreneur-info', data)
            setProfilePic(url)

            setLoadingPic(false)
        } catch (error) {
            console.log(error)
            setLoadingPic(false)
        }
    }

    const handleUpdateEntrepreneurInfo = async(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, type: string) => {
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
            await agoraApi.post('/entrepreneur/update-entrepreneur-info', data)
        } catch (error: any) {
            console.log(error)
        }
    }

    return {
        isMyAccount,
        countries,
        loading,
        loadingPic,
        showRocket,
        profilePic,
        user,
        companyName,
        emailContact,
        city,
        countryId,
        country,
        address,
        phone,
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