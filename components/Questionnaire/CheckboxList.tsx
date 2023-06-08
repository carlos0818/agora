import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'

import { ISelectBox } from '@/interfaces'

interface Props {
    data: ISelectBox[]
}

export const CheckboxList: FC<Props> = ({ data }) => {
    const { user } = useContext(AuthContext)

    const [answerValue, setAnswerValue] = useState<ISelectBox[]>([])
    const [checks, setChecks] = useState(0)
    const [error, setError] = useState(true)
    const [checkValue, setCheckValue] = useState('')

    useEffect(() => {
        setAnswerValue(p => data)

        const storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        
        for (let i=0; i<data.length; i++) {
            const isFound = storage.some((element: any) => Number(element.qnbr) === Number(data[i].qnbr) && Number(element.anbr) === Number(data[i].anbr))
            if (isFound) {
                console.log('Encontrado')
                data[i].checked = true
            } else {
                console.log('No encontrado')
                data[i].checked = false
            }
        }

        setAnswerValue(p => data)
    }, [])

    const onSelectedOption = async(event: ChangeEvent<HTMLInputElement>) => {
        const id = event.target.value

        let storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        const resp = data.filter(ans => ans.id === id)
        const qnbr = Number(resp[0].qnbr)
        const anbr = Number(resp[0].anbr)
        const effdt = resp[0].effdt
        const bobject = resp[0].bobject
        const arr = bobject!.split(',')
        const min = arr[0]
        const max = arr[1]
        
        const { data: response } = await agoraApi.get(`/question/get-user-question-version?email=${ user?.email }`)
        const info = { email: user?.email, qeffdt: effdt, qnbr: qnbr.toString(), anbr: anbr.toString(), qversion: response.maxVersion }

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
                            /> { answer.descr } - {`Score: ${ answer.score } - ${ answer.checked }`}
                            <span className='check'></span>
                        </label>
                    </div>
                ))
            }
        </div>
    )
}
