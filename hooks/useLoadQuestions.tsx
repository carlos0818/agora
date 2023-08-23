import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/auth'
import { IAnswer, IQuestion } from '@/interfaces'
import { agoraApi } from '@/api'
import { QuestionnaireContext } from '@/context/questionnaire'

export const useLoadQuestions = () => {
    const { user } = useContext(AuthContext)
    const {
        answeredQuestions,
        newMasterHide,
        totalQuestions,
        hide: globalHide,
        masterHide,
        updateTotalQuestions,
        updateHide,
        updatePercentage,
        updateAllAnsweredQuestions
    } = useContext(QuestionnaireContext)

    const [data, setData] = useState<any>([])
    const [validJSON, setValidJSON] = useState(false)
    const [language, setLanguage] = useState('en')

    useEffect(() => {
        getLanguage()
    }, [])

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
                                const respHideSplit = resp[0].hide?.split(',') || null

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
        if (answeredQuestions.length > 0 && totalQuestions > 0) {
            const filter = masterHide.filter(master => Number(master) < 1000)
            // Restamos 1 a answeredQuestion para quitar el qnbr 0, que es el validator
            const result = Number((((answeredQuestions.length - 1) * 100) / ((totalQuestions - 1) - (filter.length - 1))).toFixed(0)) > 100 ? 100 : Number((((answeredQuestions.length - 1) * 100) / ((totalQuestions - 1) - (filter.length -1))).toFixed(0))
            updatePercentage(result)
        } else {
            updatePercentage(0)
        }
    }, [globalHide, answeredQuestions, totalQuestions])

    const getLanguage = async() => {
        const userLang = await navigator.language.substring(0, 2)
        console.log(userLang)

        if (userLang === 'fr')
            setLanguage('fr')
        else if (userLang === 'es')
            setLanguage('es')
        else
            setLanguage('en')
    }

    const loadQuestions = async() => {
        try {
            switch (user?.type) {
                case 'E':
                    const { data: dataQuestionEnt } = await agoraApi.get<IQuestion[]>(`/question/entrepreneur?lang=${ language }`)
                    const { data: dataAnswerEnt } = await agoraApi.get<IAnswer[]>('/question/answer-entrepreneur')
                    loadData(dataQuestionEnt, dataAnswerEnt)
                    const filterEnt = dataQuestionEnt.filter(question => question.type !== 'T' && question.type !== 'S')
                    updateTotalQuestions(filterEnt.length)
                    break
                case 'I':
                    const { data: dataQuestionInv } = await agoraApi.get<IQuestion[]>(`/question/investor?lang=${ language }`)
                    const { data: dataAnswerInv } = await agoraApi.get<IAnswer[]>('/question/answer-investor')
                    loadData(dataQuestionInv, dataAnswerInv)
                    const filterInv = dataQuestionInv.filter(question => question.type !== 'T' && question.type !== 'S')
                    updateTotalQuestions(filterInv.length)
                    break
                case 'X':
                    const { data: dataQuestionExp } = await agoraApi.get<IQuestion[]>(`/question/expert?lang=${ language }`)
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
        validJSON,
        data,
        loadQuestions,
        getUserAnswers,
    }
}