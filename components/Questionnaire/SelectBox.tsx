import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'

import { ISelectBox } from '@/interfaces'

interface Props {
    data: ISelectBox[]
    selectBox?: string | null
    setSelectBox?: Dispatch<SetStateAction<string | null>>
}

export const SelectBox: FC<Props> = ({ data, selectBox = null, setSelectBox }) => {
    const { user } = useContext(AuthContext)
    const { updateAnsweredQuestions } = useContext(QuestionnaireContext)

    const [answer, setAnswer] = useState('')

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        
        let answerValue = ''
        for (let i=0; i<data.length; i++) {
            if (data[i].extravalue && data[i].extravalue !== undefined) {
                const isFound = storage.some((element: any) => Number(element.qnbr) === Number(data[i].qnbr) && element.extravalue === data[i].extravalue)
                if (isFound) {
                    answerValue = `${ data[i].qnbr }-${ data[i].anbr }-${ data[i].extravalue }`
                }
            } else {
                const isFound = storage.some((element: any) => Number(element.qnbr) === Number(data[i].qnbr) && Number(element.anbr) === Number(data[i].anbr))

                if (isFound)
                    answerValue = `${ data[i].qnbr }-${ data[i].anbr }`
            }
        }
        
        setAnswer(answerValue)
    }, [])

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        
        for (let i=0; i<data.length; i++) {
            const isFound = storage.some((element: any) => Number(element.qnbr) === Number(data[i].qnbr))
            if (!isFound) {
                setAnswer('')
            }
        }
    }, [selectBox])

    const onSelectedOption = async(id: string) => {
        if (answer === '') {
            updateAnsweredQuestions(id)
        }

        let storage = []
        try {
            storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        } catch (error) {
            const { data } = await agoraApi.get(`/question/user-answers?email=${ user?.email }&type=${ user?.type }`)
            localStorage.setItem('questionnaire', JSON.stringify(data))
            storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        }

        const resp = data.filter(ans => ans.id === id)

        if (resp.length > 0) {
            const qnbr = Number(resp[0].qnbr)
            const anbr = Number(resp[0].anbr)
            const effdt = resp[0].effdt
            const extravalue = resp[0].extravalue || null

            let flag = false
            for (let i=0; i<storage.length; i++) {
                if (Number(storage[i].qnbr) === Number(qnbr)) {
                    storage[i].qnbr = storage[i].qnbr
                    storage[i].anbr = anbr
                    storage[i].extravalue = extravalue
                    flag = true
                    break
                }
            }

            if (!flag) {
                storage.push({ qnbr: Number(qnbr), anbr: Number(anbr), extravalue: extravalue })
            }

            localStorage.setItem('questionnaire', JSON.stringify(storage))

            const respShowSplit = resp[0].show?.split(',') || null
            const respHideSplit = resp[0].hide?.split(',') || null

            setAnswer(id)

            if (extravalue) {
                await agoraApi.post('/question/save-question', { email: user?.email, type: user?.type, effdt, qnbr: qnbr.toString(), anbr: anbr.toString(), extravalue })
                return
            }
            await agoraApi.post('/question/save-question', { email: user?.email, type: user?.type, effdt, qnbr: qnbr.toString(), anbr: anbr.toString() })

            if (setSelectBox && (respHideSplit || respShowSplit)) {
                setSelectBox(id)
            }
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBlockEnd: 20 }}>
            <select
                className='select'
                style={{ fontFamily: answer !== '' ? 'ebrima' : 'ebrima-bold' }}
                onChange={ (e) => onSelectedOption(e.target.value) } value={ answer }
            >
                <option value="" disabled hidden style={{ color: 'red' }}>Select an option</option>
                {
                    data.map(resp => (
                        <option
                            key={ resp.id }
                            value={ resp.id }
                        >
                            { resp.descr }
                        </option>
                    ))
                }
            </select>
        </div>
    )
}
