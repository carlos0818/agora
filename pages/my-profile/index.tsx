import { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'
import { Activity } from '@/components/Profile/Activity'
import { Comment } from '@/components/Profile/Comment'
import { useQuestionnaire } from '@/hooks/useQuestionnaire'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'

import styles from './my-profile.module.css'

import arrowDownIcon from '@/public/images/arrow-down.svg'

const MyProfilePage: NextPage = () => {
    const { user } = useContext(AuthContext)
    const {
        percentage,
        hide: globalHide,
        answeredQuestions,
        masterHide,
        updateMasterHide,
        updateHide,
    } = useContext(QuestionnaireContext)

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

    const { data } = useQuestionnaire()
    
    useEffect(() => {
        if (user) {
            validateCompleteQuestionnaire()
        }
    }, [user])

    useEffect(() => {
        // console.log('entró 1')
        // updateMasterHide([])
        // if (masterHide.length === 0) {
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
    
                                if (respHideSplit) {
                                    updateMasterHide([...respHideSplit])
                                }
                            }
                        }
                    }
                })
            })
        // }
    }, [data])
    
    useEffect(() => {
        // console.log('entró 2')
        let removeDuplicates: any = []
        for (let i=0; i<masterHide.length; i++) {
            const find = removeDuplicates.find((remove: any) => remove === masterHide[i])
            if (!find)
                removeDuplicates.push(masterHide[i])
        }
        updateHide(removeDuplicates.length)
    }, [masterHide, globalHide])

    const validateCompleteQuestionnaire = async() => {
        try {
            await agoraApi.get(`/question/validate-complete-questionnaire?email=${ user?.email }`)
            setShowRocket(true)
        } catch (error) {
            setShowRocket(false)
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

                                </div>
                            </div>
                        </div>
                        <div className={ styles['profile-info-container-mobile'] }>
                            <p className={ `${ styles['info-text'] } ${ styles['company-name'] }` }>QuarkLink</p>
                            <p className={ styles['info-text'] }>by Carlos Benavides</p>
                            <p className={ `${ styles['info-text'] } ${ styles['member-text'] }` }>Member 2 months ago</p>
                            <div className={ styles['stars-container'] }>

                            </div>
                            <p className={ `${ styles['info-text'] }` }>Lima, Lima - Perú</p>
                            <p className={ `${ styles['info-text'] } ${ styles['address-text'] }` }>Insert your address</p>
                            <p className={ `${ styles['info-text'] }` }>www.brimstonenergy.com</p>
                            <p className={ `${ styles['info-text'] }` }>+151004285311</p>
                            <div className={ styles['social-container'] }>

                            </div>
                        </div>
                        <div className={ styles['profile-info-container-desktop'] }>
                            <div className={ styles['profile-info-row1'] }>
                                <div className={ styles['profile-info-content-left'] }>
                                    <p className={ `${ styles['info-text'] } ${ styles['company-name'] }` }>QuarkLink</p>
                                    <p className={ `${ styles['info-text'] } ${ styles['user-name'] }` }>by Carlos Benavides</p>
                                    <p className={ `${ styles['info-text'] } ${ styles['member-text'] }` }>Member 2 months ago</p>
                                    <div className={ styles['stars-container'] }>
                                        <i className='icon-star' data-star="3.5"></i>
                                    </div>
                                </div>
                                <div className={ styles['profile-info-content-right'] }>
                                    <p className={ `${ styles['info-text'] }` }>Lima, Lima - Perú</p>
                                    <p className={ `${ styles['info-text'] } ${ styles['address-text'] }` }>Insert your address</p>
                                    <p className={ `${ styles['info-text'] }` }>https://www.quarklink.com</p>
                                    <p className={ `${ styles['info-text'] }` }>+51991049432</p>
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
                                <input type='text' className={ `field ${ styles['textfield'] }` } />
                            </div>
                            <div className={ styles['form-group'] }>
                                <label>Profile photo</label>
                                <input type='file' className={ `field ${ styles['textfield'] }` } />
                            </div>
                            <div className={ styles['form-group'] }>
                                <label>Email contact</label>
                                <input type='text' className={ `field ${ styles['textfield'] }` } />
                            </div>
                            <div className={ styles['form-group'] }>
                                <label>Phone</label>
                                <input type='text' className={ `field ${ styles['textfield'] }` } />
                            </div>
                            <div className={ styles['form-group'] }>
                                <label>Country</label>
                                <input type='text' className={ `field ${ styles['textfield'] }` } />
                            </div>
                            <div className={ styles['form-group'] }>
                                <label>City</label>
                                <input type='text' className={ `field ${ styles['textfield'] }` } />
                            </div>
                            <div className={ styles['form-group'] }>
                                <label>Address</label>
                                <input type='text' className={ `field ${ styles['textfield'] }` } />
                            </div>

                            {/* <p className={ styles['required-text'] }>Company name</p>
                            <p className={ styles['required-text'] }>Profile photo</p>
                            <p className={ styles['required-text'] }>Email contact</p>
                            <p className={ styles['required-text'] }>Phone</p>
                            <p className={ styles['required-text'] }>Country</p>
                            <p className={ styles['required-text'] }>City</p>
                            <p className={ styles['required-text'] }>Address</p> */}

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
                {
                    showRocket && (
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
                                        {/* <Image
                                            src={ rocketProgressIcon }
                                            alt='Rocket image'
                                            className={ styles['rocket-image'] }
                                        /> */}
                                    </div>
                                    <div className={ styles['progress-image'] }>

                                    </div>
                                    <p className={ styles['progress-title'] }>CONGRATULATIONS!!!</p>
                                    <p className={ styles['progress-description'] }>Click here to continue with your profile</p>
                                </div>
                            </div>
                        </Link>
                    )
                }
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 16 }}>
                        <p className={ styles['card-title'] }>About us</p>
                        <p className={ styles['about-description'] }>
                            We promote the growing, protection and consumption of Moringa and Shea nut health and skin Care products. We produce Aica Moringa
                            dried leaf powder, tea leaves, Moringa seed oil, Shea nut butter, Moringa and shea cosmetics for the improvement of the livelihoods,
                            food security and the environment of North Eastern Uganda.
                        </p>
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content ${ styles['video-container'] }` }>
                        <div className={ styles['video'] }>

                        </div>
                        <div className={ styles['video-text-container'] }>
                            <p className={ styles['card-title'] }>Video</p>
                            <p className={ styles['video-description'] }>
                                We promote the growing, protection and consumption of Moringa and Shea nut health and skin Care products. We produce Aica Moringa
                                dried leaf powder, tea leaves, Moringa seed oil, Shea nut butter, Moringa and shea cosmetics for the improvement of the livelihoods,
                                food security and the environment of North Eastern Uganda. We promote the growing, protection and consumption of Moringa and Shea nut health and skin Care products. We produce Aica Moringa
                                dried leaf powder, tea leaves, Moringa seed oil, Shea nut butter, Moringa and shea cosmetics for the improvement of the livelihoods,
                                food security and the environment of North Eastern Uganda.
                            </p>
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
                <div className={ `window-glass` }>
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
                </div>
                <div className={ `window-glass` }>
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
                </div>
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