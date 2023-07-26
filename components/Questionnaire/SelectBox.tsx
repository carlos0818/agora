import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'

import { ISelectBox } from '@/interfaces'

interface Props {
    data: ISelectBox[]
    setSelectBox?: Dispatch<SetStateAction<string | null>>
}

export const SelectBox: FC<Props> = ({ data, setSelectBox }) => {
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
            let respHideSplit: any

            // console.log(respShowSplit)
            
            if (resp[0].hide?.substring(0, 4) === 'qnbr') {
                // const storage = JSON.parse(localStorage.getItem('questionnaire')!)
                // const numberQuestion = Number(resp[0].hide?.substring(4, 7))
                // const numberAnswer = resp[0].hide?.substring(8).split(':')
                // for (let i=0; i<storage.length; i++) {
                //     if (Number(storage[i].qnbr) === numberQuestion) {
                //         for (let j=0; j<numberAnswer.length; j++) {
                //             if (Number(storage[i].anbr) === Number(numberAnswer[j].substring(0, 2))) {
                //                 respHideSplit = numberAnswer[j].substring(3).split(',')
                //             }
                //         }
                //     }
                // }
            } else {
                respHideSplit = resp[0].hide?.split(',') || null
            }

            setAnswer(id)

            if (extravalue) {
                await agoraApi.post('/question/save-question', { email: user?.email, type: user?.type, effdt, qnbr: qnbr.toString(), anbr: anbr.toString(), extravalue })
                return
            }
            await agoraApi.post('/question/save-question', { email: user?.email, type: user?.type, effdt, qnbr: qnbr.toString(), anbr: anbr.toString() })

            if (setSelectBox && (respHideSplit || respShowSplit))
                setSelectBox(id)
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
