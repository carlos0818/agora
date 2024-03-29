import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'

import { agoraApi } from '@/api'

import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'

import { ISelectBox } from '@/interfaces'

interface Props {
    data: ISelectBox[]
}

export const CheckboxList: FC<Props> = ({ data }) => {
    const { user } = useContext(AuthContext)
    const { answeredQuestions, updateAnsweredQuestions, deleteAnsweredQuestions } = useContext(QuestionnaireContext)

    const [answerValue, setAnswerValue] = useState<ISelectBox[]>([])
    const [checks, setChecks] = useState(0)
    const [error, setError] = useState(true)

    useEffect(() => {
        setAnswerValue(p => data)

        const storage = JSON.parse(localStorage.getItem('questionnaire') || '')

        let countChecks = 0
        for (let i=0; i<data.length; i++) {
            const isFound = storage.some((element: any) => Number(element.qnbr) === Number(data[i].qnbr) && Number(element.anbr) === Number(data[i].anbr))
            if (isFound) {
                data[i].checked = true
                countChecks ++
            } else {
                data[i].checked = false
            }
        }

        setChecks(countChecks)
        setAnswerValue(p => data)
    }, [])

    useEffect(() => {
        const qnbr = data[0].qnbr
        const anbr = data[0].anbr
        const bobject = data[0].bobject
        const arr = bobject!.split(',')
        const min = arr[0]
        const max = arr[1]
        const storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        const checked = storage.filter((store: any) => store.qnbr === qnbr)

        if (!(checked.length >= min && checked.length <= max)) {
            for (let i=0; i<answeredQuestions.length; i++) {
                const split = answeredQuestions[i].split('-')
                if (Number(split[0]) === Number(qnbr)) {
                    deleteAnsweredQuestions(answeredQuestions[i])
                }
            }
        }
    }, [])

    useEffect(() => {
        const qnbr = data[0].qnbr
        const bobject = data[0].bobject
        const arr = bobject!.split(',')
        const min = arr[0]
        const max = arr[1]
        const storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        const checked = storage.filter((store: any) => store.qnbr === qnbr)
        if (checked.length >= min && checked.length <= max) {
            setError(false)
        } else {
            setError(true)
        }
    }, [checks])

    const onSelectedOption = async(event: ChangeEvent<HTMLInputElement>) => {
        const id = event.target.value

        let storage = []
        try {
            storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        } catch (error) {
            const { data } = await agoraApi.get(`/question/user-answers?email=${ user?.email }&type=${ user?.type }`)
            localStorage.setItem('questionnaire', JSON.stringify(data))
            storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        }
        
        const resp = data.filter(ans => ans.id === id)
        const qnbr = Number(resp[0].qnbr)
        const anbr = Number(resp[0].anbr)
        const effdt = resp[0].effdt
        const bobject = resp[0].bobject
        const arr = bobject!.split(',')
        const min = arr[0]
        const max = arr[1]
        
        const { data: maxVersion } = await agoraApi.get<number>(`/question/get-user-question-version?email=${ user?.email }`)
        const info = { email: user?.email, qeffdt: effdt, qnbr: qnbr.toString(), anbr: anbr.toString(), qversion: maxVersion.toString() }

        if (event.target.checked) {
            storage.push({ qnbr: Number(qnbr), anbr: Number(anbr) })
            localStorage.setItem('questionnaire', JSON.stringify(storage))

            agoraApi.post('/question/save-question-without-validation', info)
        } else {
            const remove = storage.filter((store: any) => {
                if (Number(store.qnbr) === Number(qnbr) && Number(store.anbr) === Number(anbr)) {
                    return null
                } else {
                    return store
                }
            })
            localStorage.setItem('questionnaire', JSON.stringify(remove))

            await agoraApi.post('/question/delete-question', info)
        }

        storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        const checked = storage.filter((store: any) => store.qnbr === qnbr)

        setChecks(checked.length)
        if (checked.length >= min && checked.length <= max) {
            setError(false)

            let flag = false
            for (let i=0; i<answeredQuestions.length; i++) {
                const split = answeredQuestions[i].split('-')
                if (Number(split[0]) === Number(qnbr)) {
                    flag = true
                }
            }
            if (!flag)
                updateAnsweredQuestions(`${ qnbr }-${ anbr }`)
        } else {
            setError(true)
            for (let i=0; i<answeredQuestions.length; i++) {
                const split = answeredQuestions[i].split('-')
                if (Number(split[0]) === Number(qnbr)) {
                    deleteAnsweredQuestions(`${ qnbr }-${ split[1] }`)
                }
            }
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBlockEnd: 20, gap: 8 }}>
            {
                error
                ? <p style={{ color: 'red' }}>Selected options: { checks }</p>
                : <p style={{ color: 'green' }}>Correctly selected options</p>
            }
            {
                answerValue.map(answer => {
                    const split = answer.descr.split('<br>')
                    return (
                        <div key={ answer.id }>
                            <div style={{ alignItems: 'center', display: 'flex' }}>
                                <label className='checkbox'>
                                    <input
                                        type='checkbox'
                                        onChange={ onSelectedOption }
                                        value={ answer.id }
                                        defaultChecked={ answer.checked }
                                    /> { split[0] }
                                    <span className='check-blue'></span>
                                </label>
                            </div>
                            { split.length > 1 && <span style={{ marginBlock: 8 }}>{ split[1] }</span> }
                        </div>
                    )
                })
            }
        </div>
    )
}
