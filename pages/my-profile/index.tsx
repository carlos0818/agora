import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'
import { Activity } from '@/components/Profile/Activity'
import { Comment } from '@/components/Profile/Comment'
import { useQuestionnaire } from '@/hooks/useQuestionnaire'

import countriesList from '@/db/countries';

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'

import styles from './my-profile.module.css'

import arrowDownIcon from '@/public/images/arrow-down.svg'
import { IEntrepreneur } from '@/interfaces/entrepreneur'

const MyProfilePage: NextPage = () => {
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

    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(0)
    const [value3, setValue3] = useState(0)
    const [value4, setValue4] = useState(0)
    const [value5, setValue5] = useState(0)
    const [value6, setValue6] = useState(0)
    const [value7, setValue7] = useState(0)
    const [value8, setValue8] = useState(0)
    const [value9, setValue9] = useState(0)
    const [value10, setValue10] = useState(0)
    const [value11, setValue11] = useState(0)
    const [value12, setValue12] = useState(0)
    const [value13, setValue13] = useState(0)
    const [value14, setValue14] = useState(0)

    const [showRocket, setShowRocket] = useState(false)
    const [myProfile, setMyProfile] = useState(false)

    const [entrepreneurData, setEntrepreneurData] = useState<IEntrepreneur | null>(null)
    const [companyName, setCompanyName] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [emailContact, setEmailContact] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
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
            validateCompleteQuestionnaire()
            loadDataEntrepreneur()
        }
    }, [user])

    useEffect(() => {
        if (entrepreneurData) {
            companyNameRef.current!.value = entrepreneurData.name
            emailContactRef.current!.value = entrepreneurData.email_contact
            phoneRef.current!.value = entrepreneurData.phone
            countryRef.current!.value = entrepreneurData.country
            cityRef.current!.value = entrepreneurData.city
            addressRef.current!.value = entrepreneurData.address

            setProfilePic(entrepreneurData.profilepic)
            setCompanyName(entrepreneurData.name)
            setEmailContact(entrepreneurData.email_contact)
            setPhone(entrepreneurData.phone)
            setCountry(countries.find(c => c.alpha3 === entrepreneurData.country && entrepreneurData.country !== '')?.name!)
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
        const { data } = await agoraApi.get<IEntrepreneur>(`/entrepreneur/get-data?email=${ user?.email }`)
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
            console.log(url)
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

    const isMyProfile = async() => {
        try {
            await agoraApi.get(`/question/validate-complete-questionnaire?email=${ user?.email }`)
            setMyProfile(true)
        } catch (error) {
            setMyProfile(false)
        }
    }
    
    const handleValues = () => {
        setTimeout(() => {
            setValue1(70)
            setValue2(50)
            setValue3(80)
            setValue4(84)
            setValue5(67)
            setValue6(85)
            setValue7(54)
            setValue8(22)
            setValue9(48)
            setValue10(61)
            setValue11(77)
            setValue12(100)
            setValue13(39)
            setValue14(44)
        }, 100)
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
                console.log(country)
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

    return (
        <HomeLoginLayout
            title=''
            pageDescription=''
        >
            <>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 0, overflow: 'hidden' }}>
                        <div className={ styles['cover-image'] }>
                            <div className={ `window-glass ${ styles['profile-image-container'] }` }>
                                <div className={ `window-glass-content ${ styles['profile-image'] }` }>
                                    {
                                        profilePic && (
                                            <Image
                                                src={ decodeURI(profilePic) }
                                                alt=''
                                                className={ styles['profile-picture'] }
                                                width={ 300 }
                                                height={ 300 }
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={ styles['profile-info-container-mobile'] }>
                            <p className={ `${ styles['info-text'] } ${ styles['company-name'] }` }>{ companyName }</p>
                            <p className={ styles['info-text'] }>by { user?.fullname }</p>
                            <p className={ `${ styles['info-text'] } ${ styles['member-text'] }` }>Member 2 months ago</p>
                            <div className={ styles['stars-container'] }>

                            </div>
                            <p className={ `${ styles['info-text'] }` }>{ city }-{ country }</p>
                            <p className={ `${ styles['info-text'] }` }>{ address }</p>
                            <p className={ `${ styles['info-text'] }` }>{ entrepreneurData?.web }</p>
                            <p className={ `${ styles['info-text'] }` }>{ phone }</p>
                            <div className={ styles['social-container'] }>

                            </div>
                        </div>
                        <div className={ styles['profile-info-container-desktop'] }>
                            <div className={ styles['profile-info-row1'] }>
                                <div className={ styles['profile-info-content-left'] }>
                                    <p className={ `${ styles['info-text'] } ${ styles['company-name'] }` }>
                                        { companyName }
                                    </p>
                                    <p className={ `${ styles['info-text'] } ${ styles['user-name'] }` }>
                                        by { user?.fullname }
                                    </p>
                                    <p className={ `${ styles['info-text'] } ${ styles['member-text'] }` }>
                                        Member 2 months ago
                                    </p>
                                    <div className={ styles['stars-container'] }>
                                        <i className='icon-star' data-star="3.5"></i>
                                    </div>
                                </div>
                                <div className={ styles['profile-info-content-right'] }>
                                    <p className={ `${ styles['info-text'] }` }>
                                        { city } - { country }
                                    </p>
                                    <p className={ `${ styles['info-text'] }` }>
                                        { address }
                                    </p>
                                    <p className={ `${ styles['info-text'] }` }>
                                        { entrepreneurData?.web }
                                    </p>
                                    <p className={ `${ styles['info-text'] }` }>
                                        { phone }
                                    </p>
                                </div>
                            </div>
                            <div style={{ marginInlineStart: 24, marginBlockStart: 20 }}>
                                <div className={ styles['social-container'] }>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 16 }}>
                        <p className={ styles['card-title'] }>Required information</p>
                        <div className={ styles['required-text-container'] }>
                            <div className={ styles['form-group'] }>
                                <label>Company name</label>
                                <input
                                    ref={ companyNameRef }
                                    type='text'
                                    className={ `field ${ styles['textfield'] }` }
                                    onBlur={ (event) => handleUpdateEntrepreneurInfo(event, 'name') }
                                />
                            </div>
                            <div className={ styles['form-group'] }>
                                <label>Profile picture</label>
                                    {
                                        !loadingPic ? (
                                            <div style={{ inlineSize: 'calc(100% - 24px)' }}>
                                                <input
                                                    type='button'
                                                    className={ `button-filled` }
                                                    value='Upload image'
                                                    onClick={ () => fileInputRef.current?.click() }
                                                />
                                                <input
                                                    ref={ fileInputRef }
                                                    type="file"
                                                    accept='image/png, image/jpg, image/jpeg'
                                                    style={{ display: 'none' }}
                                                    onChange={ onFileSelected }
                                                />
                                            </div>
                                        ) : (
                                            <em className='spinner blue-agora' style={{ blockSize: 24, inlineSize: 24 }} />
                                        )
                                    }
                            </div>
                            <div className={ styles['form-group'] }>
                                <label>Email contact</label>
                                <input
                                    ref={ emailContactRef }
                                    type='text'
                                    className={ `field ${ styles['textfield'] }` }
                                    onBlur={ (event) => handleUpdateEntrepreneurInfo(event, 'email_contact') }
                                />
                            </div>
                            <div className={ styles['form-group'] }>
                                <label>Phone</label>
                                <input
                                    ref={ phoneRef }
                                    type='text'
                                    className={ `field ${ styles['textfield'] }` }
                                    onBlur={ (event) => handleUpdateEntrepreneurInfo(event, 'phone') }
                                />
                            </div>
                            <div className={ styles['form-group'] }>
                                <label>Country</label>
                                <div style={{ inlineSize: 'calc(100% - 24px)' }}>
                                    <select
                                        ref={ countryRef }
                                        className='field select'
                                        style={{ borderRadius: 100, paddingBlock: '6px !important' }}
                                        onChange={ (event) => handleUpdateEntrepreneurInfo(event, 'country') }
                                        defaultValue={ country }
                                    >
                                        {
                                            countries.map(country => (
                                                <option key={ country.alpha3 } value={ country.alpha3 }>{ country.name }</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className={ styles['form-group'] }>
                                <label>City</label>
                                <input
                                    ref={ cityRef }
                                    type='text'
                                    className={ `field ${ styles['textfield'] }` }
                                    onBlur={ (event) => handleUpdateEntrepreneurInfo(event, 'city') }
                                />
                            </div>
                            <div className={ styles['form-group'] }>
                                <label>Address</label>
                                <input
                                    ref={ addressRef }
                                    type='text'
                                    className={ `field ${ styles['textfield'] }` }
                                    onBlur={ (event) => handleUpdateEntrepreneurInfo(event, 'address') }
                                />
                            </div>

                            {/* <hr style={{ border: '1px solid red', width: '100%' }} />
                            <p className={ styles['required-text'] }>Youtube video (optional)</p>
                            <p className={ styles['required-text'] }>Company URL (optional)</p>
                            <p className={ styles['required-text'] }>Facebook URL (optional)</p>
                            <p className={ styles['required-text'] }>Linkedin URL (optional)</p>
                            <p className={ styles['required-text'] }>Twitter URL (optional)</p>
                            <p className={ styles['required-text'] }>Background picture (optional)</p> */}
                        </div>
                        <p className={ styles['required-description'] }>
                            In order to move forward with the process, we kindly request that you provide us with the necessary information as mentioned above.
                            This information is crucial to ensure a smooth and efficient process.
                        </p>
                    </div>
                </div>
                <Link
                    href='/questionnaire'
                    passHref
                    prefetch={ false }
                    legacyBehavior
                >
                    <div className={ `window-glass` } style={{ cursor: 'pointer' }}>
                        <div className={ `window-glass-content` }>
                            <div className={ styles['progress-container'] }>
                                <progress className={ styles['progress-bar'] } value={ percentage } max="100" />
                            </div>
                            <div className={ styles['progress-image'] }>

                            </div>
                            <p className={ styles['progress-title'] }>CONGRATULATIONS!!!</p>
                            <p className={ styles['progress-description'] }>Click here to continue with your profile</p>
                        </div>
                    </div>
                </Link>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 16 }}>
                        <p className={ styles['card-title'] }>About us</p>
                        <textarea
                            className='textfield'
                            style={{ blockSize: 150, inlineSize: 'calc(100% - 25px)' }}
                            value='We promote the growing, protection and consumption of Moringa and Shea nut health and skin Care products. We produce Aica Moringa
                            dried leaf powder, tea leaves, Moringa seed oil, Shea nut butter, Moringa and shea cosmetics for the improvement of the livelihoods,
                            food security and the environment of North Eastern Uganda.'
                        />
                        {/* <p className={ styles['about-description'] }>
                            We promote the growing, protection and consumption of Moringa and Shea nut health and skin Care products. We produce Aica Moringa
                            dried leaf powder, tea leaves, Moringa seed oil, Shea nut butter, Moringa and shea cosmetics for the improvement of the livelihoods,
                            food security and the environment of North Eastern Uganda.
                        </p> */}
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content ${ styles['video-container'] }` }>
                        <div className={ styles['video'] }>

                        </div>
                        <div className={ styles['video-text-container'] }>
                            <p className={ styles['card-title'] }>Video</p>
                            {/* <p className={ styles['video-description'] }>
                                We promote the growing, protection and consumption of Moringa and Shea nut health and skin Care products. We produce Aica Moringa
                                dried leaf powder, tea leaves, Moringa seed oil, Shea nut butter, Moringa and shea cosmetics for the improvement of the livelihoods,
                                food security and the environment of North Eastern Uganda. We promote the growing, protection and consumption of Moringa and Shea nut health and skin Care products. We produce Aica Moringa
                                dried leaf powder, tea leaves, Moringa seed oil, Shea nut butter, Moringa and shea cosmetics for the improvement of the livelihoods,
                                food security and the environment of North Eastern Uganda.
                            </p> */}
                            <textarea
                                className='textfield'
                                style={{ blockSize: 150, inlineSize: 'calc(100% - 25px)' }}
                                value='We promote the growing, protection and consumption of Moringa and Shea nut health and skin Care products. We produce Aica Moringa
                                dried leaf powder, tea leaves, Moringa seed oil, Shea nut butter, Moringa and shea cosmetics for the improvement of the livelihoods,
                                food security and the environment of North Eastern Uganda. We promote the growing, protection and consumption of Moringa and Shea nut health and skin Care products. We produce Aica Moringa
                                dried leaf powder, tea leaves, Moringa seed oil, Shea nut butter, Moringa and shea cosmetics for the improvement of the livelihoods,
                                food security and the environment of North Eastern Uganda.'
                            />
                        </div>
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 16 }}>
                        <div style={{ position: 'relative' }}>
                            <details className={ styles['title-container'] }>
                                <summary className={ styles['accordion-title'] }>
                                    Pitch Deck
                                    <Image
                                        src={ arrowDownIcon }
                                        alt=''
                                        style={{ position: 'absolute', marginBlockStart: 6, top: 0, right: 10 }}
                                    />
                                </summary>
                                <p className={ styles['accordion-content'] }>
                                    Pitch Deck content
                                </p>
                            </details>
                            
                        </div>
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content ${ styles['window-content'] }` }>
                        <div style={{ position: 'relative' }}>
                            <details className={ styles['title-container'] }>
                                <summary className={ styles['accordion-title'] } onClick={ handleValues }>
                                    Qualification
                                    <Image
                                        src={ arrowDownIcon }
                                        alt=''
                                        style={{ position: 'absolute', marginBlockStart: 6, top: 0, right: 10 }}
                                    />
                                </summary>
                                <div className={ styles['accordion-content'] }>
                                    <div className={ styles['qualification-section-container'] }>
                                        <hr className={ styles['center-line'] } />

                                        <p className={ styles['texts'] }>Future prospect and Innovation projects</p>

                                        <span></span>
                                        <progress className={ styles['progress-bar-qualification'] } value={ value1 } max="100" />
                                        <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Outlook</p>

                                        <span></span>
                                        <progress className={ styles['progress-bar-qualification'] } value={ value2 } max="100" />
                                        <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Innovations Projects</p>
                                    </div>
                                    <div className={ styles['qualification-section-container'] }>
                                        <hr className={ styles['center-line'] } />

                                        <p className={ styles['texts'] }>Governance and enterprise risk management (ERM)</p>

                                        <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value3 } max="100" />
                                        <span></span>
                                        <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Governance</p>

                                        <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value4 } max="100" />
                                        <span></span>
                                        <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Enterprise Risk Management</p>
                                    </div>
                                    <div className={ styles['qualification-section-container'] }>
                                        <hr className={ styles['center-line'] } />

                                        <p className={ `${ styles['texts'] } ${ styles['group-risk'] }` }>Risk assessment</p>

                                        <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value5 } max="100" />
                                        <span></span>
                                        <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Credit risk</p>

                                        <span></span>
                                        <progress className={ styles['progress-bar-qualification'] } value={ value6 } max="100" />
                                        <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Market risk</p>

                                        <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value7 } max="100" />
                                        <span></span>
                                        <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Country risk</p>

                                        <span></span>
                                        <progress className={ styles['progress-bar-qualification'] } value={ value8 } max="100" />
                                        <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Operational risk</p>

                                        <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value9 } max="100" />
                                        <span></span>
                                        <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Business and strategic risk</p>

                                        <span></span>
                                        <progress className={ styles['progress-bar-qualification'] } value={ value10 } max="100" />
                                        <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Social and environment risk</p>

                                        <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value11 } max="100" />
                                        <span></span>
                                        <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Funding liquidity and Solvency risk</p>
                                    </div>
                                    <div className={ styles['qualification-section-container'] }>
                                        <hr className={ styles['center-line'] } />

                                        <p className={ `${ styles['texts'] } ${ styles['group-sdg'] }` }>Type of SME and Sustainable Development Goals (SDG)</p>

                                        <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value12 } max="100" />
                                        <p></p>
                                        <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>SDGs and impact</p>
                                    </div>
                                    <div className={ styles['qualification-section-container'] }>
                                        <hr className={ styles['center-line'] } />

                                        <p className={ styles['texts'] }>Business strategy market conditions</p>

                                        <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value13 } max="100" />
                                        <span></span>
                                        <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Market conditions</p>

                                        <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value14 } max="100" />
                                        <span></span>
                                        <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Business lines strategy</p>
                                    </div>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
                {/* <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 16 }}>
                        <div style={{ position: 'relative' }}>
                            <details className={ styles['title-container'] }>
                                <summary className={ styles['accordion-title'] }>
                                    Technical Support
                                    <Image
                                        src={ arrowDownIcon }
                                        alt=''
                                        style={{ position: 'absolute', marginBlockStart: 6, top: 0, right: 10 }}
                                    />
                                </summary>
                                <p className={ styles['accordion-content'] }>
                                    Technical Support content
                                </p>
                            </details>
                        </div>
                    </div>
                </div> */}
                {/* <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 16 }}>
                        <p className={ styles['card-title'] }>Activity</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBlockStart: 24 }}>
                            <Activity
                                title='Make happy'
                                date='2 weeks ago'
                                description='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                            />

                            <Activity
                                title='The new dream'
                                date='1 week ago'
                                description='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                            />

                            <Activity
                                title='Best plan'
                                date='1 week ago'
                                description='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                            />

                            <Activity
                                title='Raise your business'
                                date='1 week ago'
                                description='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                            />

                            <Activity
                                title='We all together'
                                date='1 week ago'
                                description='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                            />
                        </div>
                    </div>
                </div> */}
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 16 }}>
                        <p className={ styles['card-title'] }>Comments</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBlockStart: 24 }}>
                            <Comment
                                name='Nidia Sanchez'
                                date='Monday 22th Jun'
                                comment='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                            />
                            <Comment
                                name='Raul Rodriguez'
                                date='Tuesday 13th May'
                                comment='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                            />
                            <Comment
                                name='Martha Camacho'
                                date='Friday 08th Apr'
                                comment='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                            />
                        </div>
                    </div>
                </div>
            </>
        </HomeLoginLayout>
    )
}

export default MyProfilePage