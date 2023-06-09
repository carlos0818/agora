import React from 'react'
import InputMask from 'react-input-mask'
import { InputNumberFormat, useNumberFormat } from '@react-input/number-format'

export const Textfield = () => {
    const firstLetter = /(?!.*[DFIOQU])[A-VXY]/i;
    const letter = /(?!.*[DFIOQU])[A-Z]/i;
    const digit = /[0-9]/;
    const mask = [firstLetter, digit, letter, " ", digit, letter, digit];

    const inputRef = useNumberFormat({ locales: 'en', maximumFractionDigits: 2 });

    return (
        <div style={{ marginBlockEnd: 20 }}>
            {/* <input type='text' className='textfield' /> */}

            {/* <input ref={inputRef} /> */}

            <InputNumberFormat
                className='textfield'
                format='decimal'
                maximumFractionDigits={ 2 }
                maximumIntegerDigits={ 12 }
                placeholder='9999999.99'
                // commaSeparateNumber={ 0 }
                // onChange={(event) => console.log(event.target.value)} // "123.456,789"
            />

            {/* <InputMask mask='99/99/9999' maskPlaceholder={ '' } /> */}
            {/* <InputMask mask='[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9].[0-9][0-9]' /> */}
        </div>
    )
}
