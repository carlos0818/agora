import { ChangeEvent, FC, FocusEvent, useContext, useEffect, useState } from 'react'

import { agoraApi } from '@/api'

import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'
import { ITextfield } from '@/interfaces/textfield'

interface Props {
    data: ITextfield
}

export const TextfieldAll: FC<Props> = ({ data }) => {
    const { user } = useContext(AuthContext)
    const { updateAnsweredQuestions, deleteAnsweredQuestions } = useContext(QuestionnaireContext)

    const [answer, setAnswer] = useState('')

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('questionnaire') || '')

        const isFound = storage.find((element: any) => Number(element.qnbr) === Number(data.qnbr))

        if (isFound) {
            setAnswer(isFound.extravalue)
        }
    }, [])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value)
    }

    const handleSave = async(event: FocusEvent<HTMLInputElement, Element>) => {
        const value = event.target.value

        if (value !== '') {
            const storage = JSON.parse(localStorage.getItem('questionnaire') || '')
            const isFound = storage.find((element: any) => Number(element.qnbr) === Number(data.qnbr))
            let flag = false
            
            if (isFound) {
                isFound.qnbr = data.qnbr
                isFound.anbr = 1
                isFound.extravalue = value
                flag = true
            }
            
            if (!flag) {
                storage.push({ qnbr: Number(data.qnbr), anbr: 1, extravalue: value })
                updateAnsweredQuestions(`${ data.qnbr }-1`)
            }
    
            localStorage.setItem('questionnaire', JSON.stringify(storage))
    
            await agoraApi.post('/question/save-question', { email: user?.email, qnbr: data.qnbr.toString(), type: user?.type, anbr: '1', effdt: data.effdt, extravalue: value })
        } else {
            deleteAnsweredQuestions(`${ data.qnbr }-1`)

            const storage = JSON.parse(localStorage.getItem('questionnaire') || '')
            const filter = storage.filter((element: any) => Number(element.qnbr) !== Number(data.qnbr))
            localStorage.setItem('questionnaire', JSON.stringify(filter))

            const { data: maxVersion } = await agoraApi.get<number>(`/question/get-user-question-version?email=${ user?.email }`)
            await agoraApi.post('/question/delete-question', { email: user?.email, qeffdt: data.effdt, qnbr: data.qnbr.toString(), anbr: '1', qversion: maxVersion.toString() })
        }
    }

    return (
        <div style={{ marginBlockEnd: 20 }}>
            <input type='text' className='textfield' onChange={ handleChange } onBlur={ handleSave } defaultValue={ answer } />
        </div>
    )
}
