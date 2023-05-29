import { useEffect, useState } from 'react'
import { NextPage } from 'next'

import { agoraApi } from '@/api'
import { IQuestion, IAnswer } from '@/interfaces'

import { HomeLoginWithoutMenu } from '@/components/layouts/HomeLoginWithoutMenu'

const Questionnaire: NextPage = () => {

    const [questions, setQuestions] = useState<IQuestion[]>([])
    const [answers, setAnswers] = useState<IAnswer[]>([])

    useEffect(() => {
        loadQuestions()
    }, [])

    const loadQuestions = async() => {
        try {
            const { data: dataQuestion } = await agoraApi.get<IQuestion[]>('/question')
            const { data: dataAnswer } = await agoraApi.get<IAnswer[]>('/question/answer')
            setQuestions(dataQuestion)
            setAnswers(dataAnswer)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <HomeLoginWithoutMenu
            title=''
            pageDescription=''
        >
            <>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` }>
                        {
                            questions.map((question, index) => (
                                <div key={ `container-${ question.qnbr }-${ question.effdt }` }>
                                    <p key={ `title-${ question.qnbr }-${ question.effdt }` } style={{ fontFamily: 'ebrima-bold', fontSize: 24 }}>{ question.type === 'T' ? question.descr : null }</p>
                                    <p key={ `title-${ question.qnbr }-${ question.effdt }` } style={{ fontFamily: 'ebrima-bold', fontSize: 18 }}>{ question.type === 'S' ? question.descr : null }</p>
                                    <p key={ `subtitle-${ question.qnbr }-${ question.effdt }` }>{ question.type ==='Q' ? `${ question.correlative }. ${ question.descr }` : null }</p>
                                    <ul key={ `${ question.qnbr }-${ question.effdt }` }>
                                        {
                                            answers.map(answer => {
                                                if (answer.qnbr === question.qnbr) {
                                                    return (
                                                        <li key={ `${ answer.qnbr }-${ answer.effdt }-${ answer.anbr }` }>{ answer.descr } - Score: { answer.score }</li>
                                                    )
                                                }
                                            })
                                        }
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </>
        </HomeLoginWithoutMenu>
    )
}

export default Questionnaire