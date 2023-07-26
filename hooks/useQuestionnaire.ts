import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { agoraApi } from '@/api'
import countriesList from '@/db/countries'

import { IAnswer, IQuestion } from '@/interfaces'
import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'

export const useQuestionnaire = () => {
    const { user } = useContext(AuthContext)
    const { masterHide, newMasterHide } = useContext(QuestionnaireContext)

    const router = useRouter()

    const {
        totalQuestions,
        hide: globalHide,
        answeredQuestions,
        updateTotalQuestions,
        updateHide,
        updatePercentage,
        updateAllAnsweredQuestions,
    } = useContext(QuestionnaireContext)

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [years, setYears] = useState<number[]>([])
    const [validJSON, setValidJSON] = useState(false)
    const [showQuestionnaire, setShowQuestionnaire] = useState(false)
    const [selectBox, setSelectBox] = useState<string | null>(null)

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)

    const { countries } = countriesList

    useEffect(() => {
        const $page = document.querySelector(`#wrapper-${ start + 1 }`)
        const $wrapperPage = document.querySelectorAll(`.wrapper-page`)
        for (let i=0; i<$wrapperPage.length; i++) {
            $wrapperPage[i].classList.add('wrapper-hide')
        }
        $page?.classList.remove('wrapper-hide')
    })

    useEffect(() => {
        loadYears()
    }, [])

    useEffect(() => {
        detectOrientation()

        return () => {
            let landscape = window.matchMedia("(orientation: landscape)")
            landscape.removeEventListener('change', detectOrientation)
        }
    }, [])

    useEffect(() => {
        if (user) {
            setLoading(true)
            if(!localStorage.getItem('questionnaire') || !validJSON) {
                Promise.all([
                    loadQuestions(),
                    getUserAnswers(),
                    validateCompleteQuestionnaire()
                ]).then(() => {
                    setLoading(false)
                })
            } else {
                Promise.all([
                    loadQuestions(),
                    validateCompleteQuestionnaire()
                ]).then(() => {
                    setLoading(false)
                })
            }
        }
    }, [user])

    useEffect(() => {
        if (user) {
            Promise.all([
                loadQuestions(),
                getUserAnswers(),
                validateCompleteQuestionnaire()
            ])
        }
    }, [selectBox])

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
    }, [data, answeredQuestions])

    useEffect(() => {
        const $containerClass = document.querySelectorAll(`.container`)
        for (let i=0; i<$containerClass.length; i++) {
            $containerClass[i]?.classList.remove('wrapper-hide')
        }

        masterHide.map(hide => {
            const $container = document.querySelector(`#container-${ hide }`)
            $container?.classList.add('wrapper-hide')
        })
    }, [masterHide, selectBox])

    useEffect(() => {
        if (answeredQuestions.length > 0 && totalQuestions > 0) {
            // Restamos 1 a answeredQuestion para quitar el qnbr 0, que es el validator
            const result = Number((((answeredQuestions.length - 1) * 100) / ((totalQuestions - 1) - (globalHide - 1))).toFixed(0)) > 100 ? 100 : Number((((answeredQuestions.length - 1) * 100) / ((totalQuestions - 1) - (globalHide -1))).toFixed(0))
            updatePercentage(result)
        } else {
            updatePercentage(0)
        }
    }, [globalHide, answeredQuestions, totalQuestions])

    const validateCompleteQuestionnaire = async() => {
        try {
            await agoraApi.get(`/question/validate-complete-questionnaire-by-email?email=${ user?.email }`)
        } catch (error) {
            router.replace(`/profile/${ user?.id }`)
        }
    }

    const loadQuestions = async() => {
        try {
            switch (user?.type) {
                case 'E':
                    const { data: dataQuestionEnt } = await agoraApi.get<IQuestion[]>('/question/entrepreneur')
                    const { data: dataAnswerEnt } = await agoraApi.get<IAnswer[]>('/question/answer-entrepreneur')
                    loadData(dataQuestionEnt, dataAnswerEnt)
                    const filterEnt = dataQuestionEnt.filter(question => question.type !== 'T' && question.type !== 'S')
                    updateTotalQuestions(filterEnt.length)
                    break
                case 'I':
                    const { data: dataQuestionInv } = await agoraApi.get<IQuestion[]>('/question/investor')
                    const { data: dataAnswerInv } = await agoraApi.get<IAnswer[]>('/question/answer-investor')
                    loadData(dataQuestionInv, dataAnswerInv)
                    const filterInv = dataQuestionInv.filter(question => question.type !== 'T' && question.type !== 'S')
                    updateTotalQuestions(filterInv.length)
                    break
                case 'X':
                    const { data: dataQuestionExp } = await agoraApi.get<IQuestion[]>('/question/expert')
                    const { data: dataAnswerExp } = await agoraApi.get<IAnswer[]>('/question/answer-expert')
                    loadData(dataQuestionExp, dataAnswerExp)
                    const filterExp = dataQuestionExp.filter(question => question.type !== 'T' && question.type !== 'S')
                    updateTotalQuestions(filterExp.length)
                    break
                default:
                    break
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loadData = (questions: IQuestion[], answers: IAnswer[]) => {
        let data: any = []

        let count = 0
        for (let j=0; j<questions.length; j++) {
            if (Number(count) < Number(questions[j].page)) {
                count = questions[j].page
            }
        }
        
        for (let j=1; j<=count; j++) {
            const respPage = questions.filter((question: IQuestion) => Number(question.page) === j)

            for (let i=0; i<respPage.length; i++) {
                data[j-1] = {
                    questions: respPage,
                }
                if (respPage[i].type === 'Q') {
                    const answersFilter = answers.filter((ans: IAnswer) => ans.qnbr === respPage[i].qnbr && ans.effdt === respPage[i].effdt)

                    data[j-1].questions[i] = {
                        ...data[j-1].questions[i],
                        answers: answersFilter
                    }
                }
            }
        }

        setData(data)
    }

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
                location.reload()
            } else {
                setShowQuestionnaire(false)
            }
        })
    }

    const getUserAnswers = async() => {
        const { data } = await agoraApi.get(`/question/user-answers?email=${ user?.email }&type=${ user?.type }`)
        localStorage.setItem('questionnaire', JSON.stringify(data))
        setValidJSON(true)
        getQuestionsAnswered()
    }

    const getQuestionsAnswered = () => {
        const storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        const arr = []
        for (let i=0; i<storage.length; i++) {
            const id = `${ storage[i].qnbr }-${ storage[i].anbr }`
            arr.push(id)
        }

        let removeDuplicates: any = []
        for (let i=0; i<arr.length; i++) {
            const split = arr[i].split('-')
            const find = removeDuplicates.find((remove: any) => {
                const split2 = remove.split('-')
                if (split[0] === split2[0]) {
                    return remove
                }
            })
            if (!find)
                removeDuplicates.push(`${ split[0] }-${ split[1] }`)
        }

        updateAllAnsweredQuestions(removeDuplicates)
    }

    return {
        loading,
        data,
        countries,
        years,
        showQuestionnaire,
        validJSON,
        selectBox,
        setStart,
        setEnd,
        setSelectBox,
    }
}