import { useContext, useEffect, useState } from 'react'

import { agoraApi } from '@/api'
import countriesList from '@/db/countries'

import { IAnswer, IQuestion } from '@/interfaces'
import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'

export const useQuestionnaire = () => {
    const { user } = useContext(AuthContext)
    const { answeredQuestions, updateTotalQuestions, updateAnsweredQuestions, updateAllAnsweredQuestions } = useContext(QuestionnaireContext)

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [years, setYears] = useState<number[]>([])
    const [validJSON, setValidJSON] = useState(false)
    const [showQuestionnaire, setShowQuestionnaire] = useState(false)
    const [hide, setHide] = useState<string[]>([])
    const [questionsAnswered, setQuestionsAnswered] = useState<string[]>([])

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)

    const { countries } = countriesList

    useEffect(() => {
        loadQuestions()
    }, [])

    useEffect(() => {
        loadYears()
    }, [])

    useEffect(() => {
        const $page = document.querySelector(`#wrapper-${ start + 1 }`)
        const $wrapperPage = document.querySelectorAll(`.wrapper-page`)
        for (let i=0; i<$wrapperPage.length; i++) {
            $wrapperPage[i].classList.add('wrapper-hide')
        }
        $page?.classList.remove('wrapper-hide')
    })

    useEffect(() => {
        detectOrientation()

        return () => {
            let landscape = window.matchMedia("(orientation: landscape)")
            landscape.removeEventListener('change', detectOrientation)
        }
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
    }, [hide])

    const loadQuestions = async() => {
        setLoading(true)
        try {
            const { data: dataQuestion } = await agoraApi.get<IQuestion[]>('/question')
            const { data: dataAnswer } = await agoraApi.get<IAnswer[]>('/question/answer')
            loadData(dataQuestion, dataAnswer)
            const filter = dataQuestion.filter(question => question.type !== 'T' && question.type !== 'S')
            updateTotalQuestions(filter.length)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
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

        setQuestionsAnswered(arr)
        updateAllAnsweredQuestions(removeDuplicates)
    }

    return {
        loading,
        data,
        countries,
        years,
        showQuestionnaire,
        validJSON,
        hide,
        questionsAnswered,
        setHide,
        setStart,
        setEnd,
    }
}