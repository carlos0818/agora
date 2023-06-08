import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'

import { ISelectBox } from '@/interfaces'

interface Props {
    data: ISelectBox[]
}

export const CheckboxList: FC<Props> = ({ data }) => {
    const { user } = useContext(AuthContext)

    const [answerValue, setAnswerValue] = useState()

    useEffect(() => {

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
                data.map(answer => (
                    <div key={ answer.id } style={{ alignItems: 'center', display: 'flex' }}>
                        <label className='checkbox'>
                            <input
                                type='checkbox'
                                onChange={ onSelectedOption }
                                value={ answer.id }
                            /> { answer.descr } - {`Score: ${ answer.score }`}
                            <span className='check'></span>
                        </label>
                    </div>
                ))
            }
        </div>
    )
}
