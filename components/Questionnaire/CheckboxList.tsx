import { ChangeEvent, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'

import { IQuestion, ISelectBox } from '@/interfaces'

interface Props {
    data: ISelectBox[]
    totalQuestions: IQuestion[]
    questionsAnswered: string[]
    hide: string[]
    setTotalUserQuestions: Dispatch<SetStateAction<number>>
    getQuestionsAnswered: () => void
}

export const CheckboxList: FC<Props> = ({ data, totalQuestions, questionsAnswered, hide, setTotalUserQuestions, getQuestionsAnswered }) => {
    const { user } = useContext(AuthContext)

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
        const bobject = data[0].bobject
        const arr = bobject!.split(',')
        const min = arr[0]
        const max = arr[1]
        const storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        const checked = storage.filter((store: any) => store.qnbr === qnbr)
        if (checked.length >= min && checked.length <= max) {
            setError(false)

            getQuestionsAnswered()
    
            const total = Number(((questionsAnswered.length * 100) / (totalQuestions.length - hide.length)).toFixed(0))
            setTotalUserQuestions(total)
            console.log(total)
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

            getQuestionsAnswered()
    
            const total = Number(((questionsAnswered.length * 100) / (totalQuestions.length - hide.length)).toFixed(0))
            setTotalUserQuestions(total)
            console.log(total)
        } else {
            setError(true)
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
                answerValue.map(answer => (
                    <div key={ answer.id } style={{ alignItems: 'center', display: 'flex' }}>
                        <label className='checkbox'>
                            <input
                                type='checkbox'
                                onChange={ onSelectedOption }
                                value={ answer.id }
                                defaultChecked={ answer.checked }
                            /> { answer.descr }
                            <span className='check'></span>
                        </label>
                    </div>
                ))
            }
        </div>
    )
}
