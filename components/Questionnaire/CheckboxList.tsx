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

    useEffect(() => {
        setAnswerValue(p => data)

        const storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        const idArr = data[0].id.split('-')
        const qnbr = idArr[0]
        const anbr = idArr[1]

        let counter = 0
        storage.map((store: any) => {
            if (Number(store.qnbr) === Number(qnbr) && Number(store.anbr) === Number(anbr)) {
                console.log('Son iguales')
                data[counter].checked = true
            } else {
                data[counter].checked = false
            }
            counter ++
        })

        setAnswerValue(p => data)
    }, [])

    const onSelectedOption = async(event: ChangeEvent<HTMLInputElement>) => {
        const id = event.target.value

        const storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        const resp = data.filter(ans => ans.id === id)
        const qnbr = Number(resp[0].qnbr)
        const anbr = Number(resp[0].anbr)
        const effdt = resp[0].effdt

        if (event.target.checked) {
            storage.push({ qnbr: Number(qnbr), anbr: Number(anbr) })
            localStorage.setItem('questionnaire', JSON.stringify(storage))
        } else {
            const remove = storage.filter((store: any) => {
                if (Number(store.qnbr) === Number(qnbr) && Number(store.anbr) === Number(anbr)) {
                    return null
                } else {
                    return store
                }
            })
            localStorage.setItem('questionnaire', JSON.stringify(remove))
        }

        agoraApi.post('/question/save-question', { email: user?.email, effdt, qnbr: qnbr.toString(), anbr: anbr.toString() })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBlockEnd: 20, gap: 8 }}>
            {
                answerValue.map(answer => (
                    <div key={ answer.id } style={{ alignItems: 'center', display: 'flex' }}>
                        <label className='checkbox'>
                            <input
                                type='checkbox'
                                onChange={ onSelectedOption }
                                value={ answer.id }
                                checked={ answer.checked }
                            /> { answer.descr } - {`Score: ${ answer.score } - ${ answer.checked }`}
                            <span className='check'></span>
                        </label>
                    </div>
                ))
            }
        </div>
    )
}
