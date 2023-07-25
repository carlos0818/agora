import { useContext, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { HomeLoginWithoutMenuLayout } from '@/components/layouts/HomeLoginWithoutMenuLayout'
import { CheckboxList } from '@/components/Questionnaire/CheckboxList'
import { SelectBox } from '@/components/Questionnaire/SelectBox'
import { Textfield } from '@/components/Questionnaire/Textfield'
import { Matrix } from '@/components/Questionnaire/Matrix'
import { Paginate } from '@/components/Common/Paginate'

import { useQuestionnaire } from '@/hooks/useQuestionnaire'
import { ISelectBox, ITextfield, IMatrix } from '@/interfaces'

import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'
import { agoraApi } from '@/api'

import styles from './questionnaire.module.css'

import { Modal } from '@/components/Common/Modal'

const Questionnaire: NextPage = () => {
    const {
        loading,
        data,
        countries,
        years,
        showQuestionnaire,
        validJSON,
        setStart,
        setEnd,
        setSelectBox,
    } = useQuestionnaire()

    const router = useRouter()

    const { user } = useContext(AuthContext)
    const { percentage } = useContext(QuestionnaireContext)

    const [errorMessage, setErrorMessage] = useState(null)
    const [error, setError] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)

    const handleSubmit = async() => {
        setError(false)
        setSubmitLoading(true)

        try {
            switch (user?.type) {
                case 'E':
                    await agoraApi.post('/question/submit-questionnaire-entrepreneur', { email: user?.email })
                    setSubmitLoading(false)
                    router.replace(`/profile/${ user?.id }`)
                    break
                case 'I':
                    await agoraApi.post('/question/submit-questionnaire-investor', { email: user?.email })
                    setSubmitLoading(false)
                    router.replace(`/profile/${ user?.id }`)
                    break
                case 'X':
                    await agoraApi.post('/question/submit-questionnaire-expert', { email: user?.email })
                    setSubmitLoading(false)
                    router.replace(`/profile/${ user?.id }`)
                    break
                default:
                    break
            }
        } catch (error: any) {
            setError(true)
            setErrorMessage(error.response.data.message)
            setSubmitLoading(false)
        }
    }
    
    return (
        <>
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
                                                    <div className={ styles['progress-container'] }>
                                                        <progress className={ styles['progress-bar'] } value={ percentage } max="100" />
                                                        <span className={ styles['percent-text'] }>
                                                            { (percentage !== Infinity && !isNaN(percentage)) && percentage } %
                                                        </span>
                                                    </div>
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
                                                                                        style={{ color: '#10284F', fontFamily: 'ebrima-bold', fontSize: 24, textAlign: 'center' }}
                                                                                        >
                                                                                        { question.type === 'T' ? question.descr : null }
                                                                                    </p>
                                                                                    {
                                                                                        question.video && (
                                                                                            <div className={ `window-glass ${ styles['window-glass-video'] }` }>
                                                                                                <div className={ styles['video-container'] }>
                                                                                                    <video className={ styles['video'] } controls>
                                                                                                        <source src={ question.video } type='video/webm' />
                                                                                                    </video>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    }
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
                                                                                                    setSelectBox={ setSelectBox }
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
                                                                                                />
                                                                                        }
                                                                                        {
                                                                                            (question.type === 'Q' && question.object === 'Y') &&
                                                                                                <SelectBox
                                                                                                    data={ dataArray }
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

                                                    {
                                                        percentage === 100 && (
                                                            <div style={{
                                                                alignItems: 'center',
                                                                blockSize: 40,
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                marginBlockStart: 40,
                                                                marginBlockEnd: 30
                                                            }}>
                                                                {
                                                                    submitLoading
                                                                    ? <em className='spinner blue-agora' style={{ blockSize: 36, inlineSize: 36 }} />
                                                                    : <input
                                                                        type='button'
                                                                        value='Submit'
                                                                        className={ `button-filled` }
                                                                        style={{ borderRadius: 6 }}
                                                                        onClick={ handleSubmit }
                                                                    />
                                                                }
                                                            </div>
                                                        )
                                                    }
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

            {
                error && (
                    <Modal setError={ setError }>
                        <p className='popup-body'>{ errorMessage }</p>
                    </Modal>
                )
            }
        </>
    )
}

export default Questionnaire