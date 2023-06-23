import { ChangeEvent, FC, FocusEvent, useContext, useEffect, useState } from 'react'

import { InputNumberFormat } from '@react-input/number-format'
import { NumericFormat } from 'react-number-format'
import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { ITextfield } from '@/interfaces/textfield'

interface Props {
    data: ITextfield
}

export const Textfield: FC<Props> = ({ data }) => {
    const { user } = useContext(AuthContext)

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
        }

        localStorage.setItem('questionnaire', JSON.stringify(storage))

        await agoraApi.post('/question/save-question', { email: user?.email,  qnbr: data.qnbr.toString(), anbr: '1', effdt: data.effdt, extravalue: value })
    }

    return (
        <div style={{ marginBlockEnd: 20 }}>
            {/* <InputNumberFormat
                className='textfield'
                format='decimal'
                maximumFractionDigits={ 2 }
                maximumIntegerDigits={ 12 }
                placeholder='9999999.99'
                onBlur={ (e) => handleSave(e) }
                onChange={ handleChange }
                value={ answer }
            /> */}
            <NumericFormat
                className='textfield'
                allowLeadingZeros
                thousandSeparator=","
                decimalSeparator="."
                onBlur={ (e) => handleSave(e) }
                onChange={ handleChange }
                value={ answer }
            />
        </div>
    )
}
