import { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'

import { HomeLoginWithoutMenuLayout } from '@/components/layouts/HomeLoginWithoutMenuLayout'
import { CheckboxList } from '@/components/Questionnaire/CheckboxList'
import { SelectBox } from '@/components/Questionnaire/SelectBox'
import { Textfield } from '@/components/Questionnaire/Textfield'
import { Matrix } from '@/components/Questionnaire/Matrix'
import { Paginate } from '@/components/Common/Paginate'

import { useQuestionnaire } from '@/hooks/useQuestionnaire'
import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { ISelectBox, ITextfield, IMatrix } from '@/interfaces'

import styles from './questionnaire.module.css'

const Questionnaire: NextPage = () => {
    const { user } = useContext(AuthContext)

    const [hide, setHide] = useState<string[]>([])
    const [years, setYears] = useState<number[]>([])
    const [validJSON, setValidJSON] = useState(false)
    const [showQuestionnaire, setShowQuestionnaire] = useState(false)

    const {
        loading,
        data,
        countries,
        setStart,
        setEnd,
    } = useQuestionnaire()

    const loadYears = () => {
        const date = new Date()
        let year = date.getFullYear()
        const arrYears = []
        for (let i=102; i>1; i--) {
            arrYears.push(year)
            year = year - 1
        }
        setYears(arrYears)
    }

    useEffect(() => {
        detectOrientation()

        return () => {
            let landscape = window.matchMedia("(orientation: landscape)")
            landscape.removeEventListener('change', detectOrientation)
        }
    }, [])

    useEffect(() => {
        loadYears()
    }, [])

    useEffect(() => {
        if(user) {
            if(!localStorage.getItem('questionnaire') || !validJSON) {
                getUserAnswers()
            }
        }
    }, [user])

    useEffect(() => {
        const $containerClass = document.querySelectorAll(`.container`)
        for (let i=0; i<$containerClass.length; i++) {
            $containerClass[i]?.classList.remove('wrapper-hide')
        }

        hide.map(hide => {
            const $container = document.querySelector(`#container-${ hide }`)
            $container?.classList.add('wrapper-hide')
        })

        console.log(hide)
    }, [hide])

    const detectOrientation = () => {
        let landscape = window.matchMedia("(orientation: landscape)")

        if (landscape.matches) {
            setShowQuestionnaire(true)
        } else {
            setShowQuestionnaire(false)
        }

        landscape.addEventListener('change', function (e) {
            if (e.matches) {
                setShowQuestionnaire(true)
            } else {
                setShowQuestionnaire(false)
            }
        })
    }

    const getUserAnswers = async() => {
        const { data } = await agoraApi.get(`/question/user-answers?email=${ user?.email }&type=${ user?.type }`)
        localStorage.setItem('questionnaire', JSON.stringify(data))
        setValidJSON(true)
    }

    return (
        <HomeLoginWithoutMenuLayout
            title=''
            pageDescription=''
        >
            {
                showQuestionnaire ? (
                    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        {
                            loading
                            ? <em className='spinner blue-agora' style={{ blockSize: 40, inlineSize: 40 }} />
                            : (
                                <>
                                {
                                    !validJSON
                                    ? <em className='spinner blue-agora' style={{ blockSize: 40, inlineSize: 40 }} />
                                    : (
                                        <div className={ `window-glass ${ styles['window-glass'] }` }>
                                            <div className={ `window-glass-content` }>
                                                {
                                                    data.map(({ questions }: any, index: number) => {
                                                        return (
                                                            <div
                                                                key={ `wrapper-${ index + 1 }` }
                                                                id={ `wrapper-${ index + 1 }` }
                                                                className='wrapper-page wrapper-hide'
                                                            >
                                                                {
                                                                    questions.map((question: any) => {
                                                                        const dataArray: ISelectBox[] = []
                                                                        const dataArray2: IMatrix[] = []
                                                                        const textfield: ITextfield = { qnbr: '', effdt: '', extravalue: '' }
                                                                        return (
                                                                            <div
                                                                                key={ `container-${ question.qnbr }` }
                                                                                id={ `container-${ question.qnbr }` }
                                                                                className='container'
                                                                            >
                                                                                <p
                                                                                    key={ `title-${ question.qnbr }` }
                                                                                    style={{ color: '#10284F', fontFamily: 'ebrima-bold', fontSize: 24 }}
                                                                                >
                                                                                    { question.type === 'T' ? question.descr : null }
                                                                                </p>
                                                                                <p
                                                                                    key={ `subtitle-${ question.qnbr }` } 
                                                                                    style={{ color: '#10284F', fontFamily: 'ebrima-bold', fontSize: 18 }}
                                                                                >
                                                                                    { question.type === 'S' ? question.descr : null }
                                                                                </p>
                                                                                <p
                                                                                    key={ `question-${ question.qnbr }` }
                                                                                    style={{ color: '#10284F' }}
                                                                                >
                                                                                    { question.type ==='Q' ? `${ question.qnbr }. ${ question.descr }` : null }
                                                                                </p>
                                                                                <div key={ `${ question.qnbr }-${ question.effdt }` } style={{ marginBlockStart: 12 }}>
                                                                                    {
                                                                                        question.answers?.map((answer: any) => {
                                                                                            if (answer.qnbr === question.qnbr && (question.object === 'L' || question.object === 'M')) {
                                                                                                dataArray.push({
                                                                                                    id: `${ answer.qnbr }-${ answer.anbr }`,
                                                                                                    score: answer.score,
                                                                                                    descr: answer.descr,
                                                                                                    qnbr: question.qnbr,
                                                                                                    anbr: answer.anbr,
                                                                                                    effdt: question.effdt,
                                                                                                    show: answer.show,
                                                                                                    hide: answer.hide,
                                                                                                    bobject: question.bobject
                                                                                                })
                                                                                            }
                                                                                            return null
                                                                                        })
                                                                                    }
                                                                                    {
                                                                                        (question.type === 'Q' && question.object === 'L') &&
                                                                                            <SelectBox
                                                                                                data={ dataArray }
                                                                                                hide={ hide }
                                                                                                setHide={ setHide }
                                                                                            />
                                                                                    }
                                                                                    {
                                                                                        (question.type === 'Q' && question.object === 'C') &&
                                                                                            countries.map(country => {
                                                                                                dataArray.push({
                                                                                                    id: `${ question.qnbr }-1-${ country.id }`,
                                                                                                    score: 0,
                                                                                                    descr: country.name,
                                                                                                    qnbr: question.qnbr,
                                                                                                    anbr: '1',
                                                                                                    effdt: question.effdt,
                                                                                                    extravalue: country.id
                                                                                                })
                                                                                                return null
                                                                                            })
                                                                                    }
                                                                                    {
                                                                                        (question.type === 'Q' && question.object === 'Y') &&
                                                                                            years.map(year => {
                                                                                                dataArray.push({
                                                                                                    id: `${ question.qnbr }-1-${ year }`,
                                                                                                    score: 0,
                                                                                                    descr: year.toString(),
                                                                                                    qnbr: question.qnbr,
                                                                                                    anbr: '1',
                                                                                                    effdt: question.effdt,
                                                                                                    extravalue: year.toString(),
                                                                                                })
                                                                                            })
                                                                                    }
                                                                                    {
                                                                                        (question.type === 'Q' && question.object === 'C') &&
                                                                                            <SelectBox
                                                                                                data={ dataArray }
                                                                                                setHide={ setHide }
                                                                                            />
                                                                                    }
                                                                                    {
                                                                                        (question.type === 'Q' && question.object === 'Y') &&
                                                                                            <SelectBox
                                                                                                data={ dataArray }
                                                                                                setHide={ setHide }
                                                                                            />
                                                                                    }
                                                                                    {
                                                                                        (question.type === 'Q' && question.object === 'M') &&
                                                                                            <CheckboxList
                                                                                                data={ dataArray }
                                                                                            />
                                                                                    }
                                                                                    {
                                                                                        (question.type === 'Q' && question.object === 'F') &&
                                                                                            question.answers.map((answer: any) => {
                                                                                                textfield.qnbr = answer.qnbr
                                                                                                textfield.effdt = question.effdt
                                                                                                textfield.extravalue = answer.extravalue
                                                                                            })
                                                                                    }
                                                                                    {
                                                                                        (question.type === 'Q' && question.object === 'F') &&
                                                                                            <Textfield
                                                                                                data={ textfield }
                                                                                            />
                                                                                    }
                                                                                    {
                                                                                        (question.type === 'Q' && question.object === 'B') &&
                                                                                        question.answers.map((answer: any) => {
                                                                                            dataArray2.push({
                                                                                                descr: answer.descr,
                                                                                                qnbr: question.qnbr,
                                                                                                anbr: answer.anbr,
                                                                                                effdt: question.effdt,
                                                                                                extravalue: ''
                                                                                            })
                                                                                        })
                                                                                    }
                                                                                    {
                                                                                        (question.type === 'Q' && question.object === 'B') &&
                                                                                            <Matrix
                                                                                                data={ dataArray2 }
                                                                                                quantity={ question.bobject }
                                                                                            />
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }

                                                <Paginate
                                                    items={ data }
                                                    itemsPerPage={ 1 }
                                                    setStart={ setStart }
                                                    setEnd={ setEnd }
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                                </>
                            )
                        }
                    </div>

                ) : (
                    <p style={{
                        blockSize: '100%',
                        color: '#10284F',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24,
                        marginBlockStart: 100,
                        textAlign: 'center',
                    }}>
                        To view the questionnaire in mobile version, it is necessary to rotate your device to horizontal or landscape mode.
                    </p>
                )
            }
        </HomeLoginWithoutMenuLayout>
    )
}

export default Questionnaire