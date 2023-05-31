import { useEffect, useState } from 'react'
import { NextPage } from 'next'

import { agoraApi } from '@/api'
import { IQuestion, IAnswer, ISelectBox } from '@/interfaces'

import { HomeLoginWithoutMenuLayout } from '@/components/layouts/HomeLoginWithoutMenuLayout'
import { CheckboxList } from '@/components/Questionnaire/CheckboxList'
import { SelectBox } from '@/components/Questionnaire/SelectBox'
import { Textfield } from '@/components/Questionnaire/Textfield'
import { Paginate } from '@/components/Common/Paginate'

import countriesList from '@/db/countries'

import styles from './questionnaire.module.css'

const Questionnaire: NextPage = () => {

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)

    const { countries } = countriesList

    useEffect(() => {
        loadQuestions()
    }, [])

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
                    const answersFilter = answers.filter((ans: IAnswer) => ans.qnbr === respPage[i].qnbr)

                    data[j-1].questions[i] = {
                        ...data[j-1].questions[i],
                        answers: answersFilter
                    }
                }
            }
        }

        setData(data)
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
                        <div className={ `window-glass ${ styles['window-glass'] }` }>
                            <div className={ `window-glass-content` }>
                                {
                                    data.slice(start, end).map(({ questions }: any) => {
                                        return questions.map((question: any) => {
                                            const dataArray: ISelectBox[] = []
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
                                                            question.answers?.map((answer: any) => {
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
                                                        {
                                                            (question.type === 'Q' && question.object === 'F') &&
                                                                <Textfield />
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
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
            </div>
        </HomeLoginWithoutMenuLayout>
    )
}

export default Questionnaire