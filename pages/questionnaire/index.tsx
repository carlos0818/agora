import { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'

import { HomeLoginWithoutMenuLayout } from '@/components/layouts/HomeLoginWithoutMenuLayout'
import { CheckboxList } from '@/components/Questionnaire/CheckboxList'
import { SelectBox } from '@/components/Questionnaire/SelectBox'
import { Textfield } from '@/components/Questionnaire/Textfield'
import { Paginate } from '@/components/Common/Paginate'

import { useQuestionnaire } from '@/hooks/useQuestionnaire'
import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { ISelectBox } from '@/interfaces'

import styles from './questionnaire.module.css'

const Questionnaire: NextPage = () => {
    const { user } = useContext(AuthContext)

    const [hide, setHide] = useState<string[]>([])

    const {
        loading,
        data,
        countries,
        setStart,
        setEnd,
    } = useQuestionnaire()

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

    useEffect(() => {
        if(user) {
            if(!localStorage.getItem('questionnaire')) {
                getUserAnswers()
            }
        }
    }, [user])

    const getUserAnswers = async() => {
        const { data } = await agoraApi.get(`/question/user-answers?email=${ user?.email }&type=${ user?.type }`)
        localStorage.setItem('questionnaire', JSON.stringify(data))
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
                                                        return (
                                                            <div
                                                                key={ `container-${ question.qnbr }` }
                                                                id={ `container-${ question.qnbr }` }
                                                                className='container'
                                                            >
                                                                <p
                                                                    key={ `title-${ question.qnbr }` }
                                                                    style={{ fontFamily: 'ebrima-bold', fontSize: 24 }}
                                                                >
                                                                    { question.type === 'T' ? question.descr : null }
                                                                </p>
                                                                <p
                                                                    key={ `subtitle-${ question.qnbr }` } 
                                                                    style={{ fontFamily: 'ebrima-bold', fontSize: 18 }}
                                                                >
                                                                    { question.type === 'S' ? question.descr : null }
                                                                </p>
                                                                <p
                                                                    key={ `question-${ question.qnbr }` }
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
                                                                                    show: answer.show,
                                                                                    hide: answer.hide,
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
                                                                                    id: country.id,
                                                                                    score: 0,
                                                                                    descr: country.name,
                                                                                })
                                                                                return null
                                                                            })
                                                                    }
                                                                    {
                                                                        (question.type === 'Q' && question.object === 'C') &&
                                                                            <SelectBox
                                                                                data={ dataArray }
                                                                            />
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
            </div>
        </HomeLoginWithoutMenuLayout>
    )
}

export default Questionnaire