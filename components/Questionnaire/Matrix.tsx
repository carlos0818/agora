import { ChangeEvent, FC, Fragment, useContext, useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'

import { IMatrix } from '@/interfaces'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'

import styles from './matrix.module.css'

interface Props {
    data: IMatrix[]
    quantity: number
}

export const Matrix: FC<Props> = ({ data, quantity }) => {
    const { user } = useContext(AuthContext)

    const [years, setYears] = useState<number[]>([])
    const [values, setValues] = useState<any[]>([])

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('questionnaire')!)

        const quantityValue = quantity < 0 ? quantity * -1 : quantity
        let extravalues: any = []
        for (let i=0; i<data.length; i++) {
            let pipes = ''
            for (let j=0; j<quantityValue-1; j++) {
                pipes += '|'
            }
            extravalues.push({ qnbr: data[i].qnbr, descr: data[i].descr, anbr: data[i].anbr, effdt: data[i].effdt, extravalue: pipes })
        }

        let count = 0
        for (let i=0; i<extravalues.length; i++) {
            const isFound = storage.find((element: IMatrix) => Number(element.qnbr) === Number(extravalues[i].qnbr) && Number(element.anbr) === Number(extravalues[i].anbr))
            if (isFound) {
                const quantityValue = quantity < 0 ? quantity * -1 : quantity
                const split = isFound.extravalue.split('|')
                const diff = Number(quantityValue) - split.length
                extravalues[i].extravalue = isFound.extravalue

                if (diff > 0) {
                    for (let i=0; i<diff; i++) {
                        extravalues[i].extravalue += '|' 
                    }
                }
                count ++
            }
        }
        
        setValues(extravalues)
    }, [])

    useEffect(() => {
        loadYears()
    }, [])

    const loadYears = () => {
        const date = new Date()
        const arrYears = []
        let year = quantity < 0 ? date.getFullYear() - 2 : date.getFullYear()
        let quantityValue = quantity < 0 ? quantity * -1 : quantity

        for (let i=0; i<quantityValue; i++) {
            arrYears.push(year)
            year = year + 1
        }
        setYears(arrYears)
    }

    const handleSave = async(event: ChangeEvent<HTMLInputElement>, answer: any, index: number) => {
        const value = event.target.value

        const storage = JSON.parse(localStorage.getItem('questionnaire')!)
        let split: any[] = []
        let flagSplit = false
        for (let i=0; i<storage.length; i++) {
            if (Number(answer.qnbr) === Number(storage[i].qnbr) && Number(answer.anbr) === Number(storage[i].anbr)) {
                split = storage[i].extravalue.split('|')
                flagSplit = true
                break
            }
        }

        if (!flagSplit) {
            split = ['', '', '']
        }

        let answerValues = ''
        for (let i=0; i<split.length; i++) {
            if (i === index) {
                answerValues += value + '|'
            } else {
                answerValues += split[i] + '|'
            }
        }

        answerValues = answerValues.substring(0, answerValues.length-1)

        let flag = false
        for (let i=0; i<storage.length; i++) {
            if (Number(answer.qnbr) === Number(storage[i].qnbr) && Number(answer.anbr) === Number(storage[i].anbr)) {
                storage[i].extravalue = answerValues
                flag = true
                break
            }
        }

        if (!flag) {
            storage.push({ qnbr: answer.qnbr, anbr: answer.anbr, extravalue: answerValues })
        }

        localStorage.setItem('questionnaire', JSON.stringify(storage))

        const { data: maxVersion } = await agoraApi.get<number>(`/question/get-user-question-version?email=${ user?.email }`)
        const info = { email: user?.email, qeffdt: answer.effdt, qnbr: answer.qnbr.toString(), anbr: answer.anbr.toString(), qversion: maxVersion.toString(), extravalue: answerValues }

        await agoraApi.post('/question/delete-question', { email: user?.email, qeffdt: answer.effdt, qnbr: answer.qnbr.toString(), anbr: answer.anbr.toString(), qversion: maxVersion.toString() })
        await agoraApi.post('/question/save-question-without-validation', info)
    }

    return (
        <div className={ styles['table-three'] }>
            <div className={ styles['cell-three'] }></div>
            {
                years.map(year => (
                    <div
                        key={ year }
                        className={ styles['cell-three'] }
                    >
                        { year }
                    </div>
                ))
            }
            {
                values.map(answer => {
                    const arrValues = answer.extravalue.split('|')
                    
                    return (
                        <Fragment key={ `${ answer.qnbr }-${ answer.anbr }` }>
                            <div className={ `${ styles['cell-three'] } ${ styles['cell-question'] }` }>{ answer.descr }</div>
                            {
                                arrValues.map((value: any, index: number) => (
                                    <div
                                        key={ `${ answer.qnbr }-${ answer.anbr }-${ value }-${ index }` }
                                        className={ styles['cell-three'] }
                                        style={{ padding: 0 }}
                                    >
                                        <NumericFormat
                                            className={ styles['textfield'] }
                                            allowLeadingZeros
                                            thousandSeparator=","
                                            decimalSeparator="."
                                            onBlur={ (e) => handleSave(e, answer, index) }
                                            defaultValue={ value }
                                        />
                                    </div>
                                ))
                            }
                        </Fragment>
                    )
                })
            }
        </div>
    )
}
