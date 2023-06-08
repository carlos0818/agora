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
        // console.log('STORAGE:', storage)
        const idArr = data[0].id.split('-')
        const qnbr = idArr[0]
        const anbr = idArr[1]
        
        for (let i=0; i<data.length; i++) {
            const isFound = storage.some((element: any) => Number(element.qnbr) === Number(data[i].qnbr) && Number(element.anbr) === Number(data[i].anbr))
            if (isFound) {
                console.log('Encontrado')
                data[i].checked = true
            } else {
                console.log('No encontrado')
                data[i].checked = false
            }

            // console.log(storage.includes(data[i], 0))
        }

        // data.map((resp: any) => {
        //     storage.map((store: any) => {
        //         // console.log(resp)
        //         console.log(`${ Number(resp.qnbr) } === ${ Number(qnbr) }`)
        //         console.log(`${ Number(resp.anbr) } === ${ Number(anbr) }`)
        //         // if (Number(resp.qnbr) === Number(qnbr) && Number(resp.anbr) === Number(anbr)) {
        //         if (Number(resp.qnbr) === Number(store.qnbr) && Number(resp.anbr) === Number(store.anbr)) {
        //             // console.log('Son iguales')
        //             // data[counter].checked = true
        //             resp.checked = true
        //         } else {
        //             // console.log('No son iguales')
        //             resp.checked = false
        //         }
        //     })
        //     // console.log(counter)
        //     counter ++
        // })

        // console.log('DATA:', data)

        setAnswerValue(p => data)
        // setCheckValue(data[0].id)
    }, [])

    const onSelectedOption = async(event: ChangeEvent<HTMLInputElement>) => {
        const id = event.target.value
        console.log(id)
        const arrId = id.split('-')
        // console.log('ID:', arrId[1])
        setCheckValue(id)

        let storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        const resp = data.filter(ans => ans.id === id)
        console.log('DATA:', data)
        console.log('RESP:', resp)
        const qnbr = Number(resp[0].qnbr)
        const anbr = Number(resp[0].anbr)
        const effdt = resp[0].effdt
        const bobject = resp[0].bobject
        const arr = bobject!.split(',')
        const min = arr[0]
        const max = arr[1]
        
        const { data: response } = await agoraApi.get(`/question/get-user-question-version?email=${ user?.email }`)
        const info = { email: user?.email, qeffdt: effdt, qnbr: qnbr.toString(), anbr: anbr.toString(), qversion: response.maxVersion }

        console.log('INFO:', info)

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
                                // checked={ answer.checked }
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
