import { useEffect, useState } from 'react'
import { NextPage } from 'next'

import { agoraApi } from '@/api'
import { IQuestion, IAnswer, ISelectBox } from '@/interfaces'

import { HomeLoginWithoutMenuLayout } from '@/components/layouts/HomeLoginWithoutMenuLayout'
import { CheckboxList } from '@/components/Questionnaire/CheckboxList'
import { SelectBox } from '@/components/Questionnaire/SelectBox'
import countriesList from '@/db/countries'

const Questionnaire: NextPage = () => {

    const [questions, setQuestions] = useState<IQuestion[]>([])
    const [answers, setAnswers] = useState<IAnswer[]>([])
    const [loading, setLoading] = useState(false)

    const { countries } = countriesList

    useEffect(() => {
        loadQuestions()
    }, [])

    const loadQuestions = async() => {
        setLoading(true)
        try {
            const { data: dataQuestion } = await agoraApi.get<IQuestion[]>('/question')
            const { data: dataAnswer } = await agoraApi.get<IAnswer[]>('/question/answer')
            setQuestions(dataQuestion)
            setAnswers(dataAnswer)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <HomeLoginWithoutMenuLayout
            title=''
            pageDescription=''
        >
            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                {
                    loading
                    ? <em className='spinner blue-agora' style={{ blockSize: 40, inlineSize: 40 }} />
                    : (
                        <div className={ `window-glass` }>
                            <div className={ `window-glass-content` }>
                                {
                                    questions.map(question => {
                                        const dataArray: ISelectBox[] = [];
                                        return (
                                            <div key={ `container-${ question.qnbr }-${ question.effdt }` }>
                                                <p
                                                    key={ `title-${ question.qnbr }-${ question.effdt }` }
                                                    style={{ fontFamily: 'ebrima-bold', fontSize: 24 }}
                                                >
                                                    { question.type === 'T' ? question.descr : null }
                                                </p>
                                                <p
                                                    key={ `subtitle-${ question.qnbr }-${ question.effdt }` } 
                                                    style={{ fontFamily: 'ebrima-bold', fontSize: 18 }}
                                                >
                                                    { question.type === 'S' ? question.descr : null }
                                                </p>
                                                <p
                                                    key={ `question-${ question.qnbr }-${ question.effdt }` }
                                                >
                                                    { question.type ==='Q' ? `${ question.correlative }. ${ question.descr }` : null }
                                                </p>
                                                <div key={ `${ question.qnbr }-${ question.effdt }` } style={{ marginBlockStart: 12 }}>
                                                    {
                                                        answers.map(answer => {
                                                            if (answer.qnbr === question.qnbr && (question.object === 'L' || question.object === 'M')) {
                                                                dataArray.push({
                                                                    id: `${ answer.qnbr }-${ answer.anbr }`,
                                                                    score: answer.score,
                                                                    descr: answer.descr,
                                                                    show: answer.show,
                                                                    hide: answer.hide,
                                                                })
                                                            }
                                                            return null
                                                        })
                                                    }
                                                    {
                                                        (question.type === 'Q' && question.object === 'L') && <SelectBox data={ dataArray } />
                                                    }
                                                    {
                                                        (question.type === 'Q' && question.object === 'C') &&
                                                            countries.map(country => {
                                                                dataArray.push({
                                                                    id: country.id,
                                                                    score: 0,
                                                                    descr: country.name,
                                                                })
                                                                return null
                                                            })
                                                    }
                                                    {
                                                        (question.type === 'Q' && question.object === 'C') &&
                                                            <SelectBox data={ dataArray } />
                                                    }
                                                    {
                                                        (question.type === 'Q' && question.object === 'M') &&
                                                            <CheckboxList data={ dataArray } />
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </HomeLoginWithoutMenuLayout>
    )
}

export default Questionnaire