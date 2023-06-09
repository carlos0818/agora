import { useEffect, useState } from 'react'

import { agoraApi } from '@/api'
import countriesList from '@/db/countries'

import { IAnswer, IQuestion } from '@/interfaces'

export const useQuestionnaire = () => {
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(true)

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)

    const { countries } = countriesList

    useEffect(() => {
        loadQuestions()
    }, [])

    // useEffect(() => {
    //     // console.log('start, data')
    //     // console.log('START:', start)
    //     // console.log('DATA:', data)
    //     const $page = document.querySelector(`#wrapper-${ start + 1 || 1 }`)
    //     console.log($page)
    //     $page?.classList.remove('wrapper-hide')
    // }, [start, data])

    useEffect(() => {
        console.log('start:', start)
        // console.log('START:', start)
        const $page = document.querySelector(`#wrapper-${ start + 1 }`)
        console.log($page)
        if (!$page) {
            setStatus(false)
        }
        const $wrapperPage = document.querySelectorAll(`.wrapper-page`)
        for (let i=0; i<$wrapperPage.length; i++) {
            $wrapperPage[i].classList.add('wrapper-hide')
        }
        $page?.classList.remove('wrapper-hide')
    })

    const loadQuestions = async() => {
        setLoading(true)
        try {
            const { data: dataQuestion } = await agoraApi.get<IQuestion[]>('/question')
            const { data: dataAnswer } = await agoraApi.get<IAnswer[]>('/question/answer')
            loadData(dataQuestion, dataAnswer)
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

    return {
        loading,
        data,
        countries,
        setStart,
        setEnd,
    }
}