import React, { FC, FocusEvent, useContext } from 'react'

import { InputNumberFormat } from '@react-input/number-format'
import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { ITextfield } from '@/interfaces/textfield'

interface Props {
    data: ITextfield
}

export const Textfield: FC<Props> = ({ data }) => {
    const { user } = useContext(AuthContext)

    console.log(data)

    const handleSave = async(event: FocusEvent<HTMLInputElement, Element>) => {
        console.log(event.target.value)
        await agoraApi.post('/question/save-question', { email: user?.email,  qnbr: data.qnbr.toString(), anbr: '1', effdt: data.effdt, extravalue: event.target.value })
    }

    return (
        <div style={{ marginBlockEnd: 20 }}>
            <InputNumberFormat
                className='textfield'
                format='decimal'
                maximumFractionDigits={ 2 }
                maximumIntegerDigits={ 12 }
                placeholder='9999999.99'
                onBlur={ (e) => handleSave(e) }
                value={ data.extravalue }
            />
        </div>
    )
}
