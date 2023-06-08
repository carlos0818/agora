import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'

import { ISelectBox } from '@/interfaces'

interface Props {
    data: ISelectBox[]
    hide?: string[]
    setHide?: Dispatch<SetStateAction<string[]>>
}

export const SelectBox: FC<Props> = ({ data, hide = [], setHide }) => {
    const { user } = useContext(AuthContext)

    const [answer, setAnswer] = useState('')

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('questionnaire') || '')
        const idArr = data[0].id.split('-')
        const qnbr = idArr[0]
        const extravalue = data[0].extravalue || null
        let answer = ''
        for (let i=0; i<storage.length; i++) {
            if (Number(storage[i].qnbr) === Number(qnbr)) {
                if (extravalue)
                    answer = `${ storage[i].qnbr }-${ storage[i].anbr }-${ extravalue }`
                else
                    answer = `${ storage[i].qnbr }-${ storage[i].anbr }`
                break
            }
        }
        setAnswer(answer)
    }, [])

    const onSelectedOption = async(id: string) => {
        setAnswer(id)
        if (setHide) {
            const storage = JSON.parse(localStorage.getItem('questionnaire') || '')
            const resp = data.filter(ans => ans.id === id)
            const qnbr = Number(resp[0].qnbr)
            const anbr = Number(resp[0].anbr)
            const effdt = resp[0].effdt
            const extravalue = resp[0].extravalue || null

            let flag = false
            for (let i=0; i<storage.length; i++) {
                if (Number(storage[i].qnbr) === Number(qnbr)) {
                    storage[i].qnbr = storage[i].qnbr
                    storage[i].anbr = anbr
                    flag = true
                    break
                }
            }

            if (!flag) {
                storage.push({ qnbr: Number(qnbr), anbr: Number(anbr) })
            }

            localStorage.setItem('questionnaire', JSON.stringify(storage))

            if (resp.length > 0) {
                const respShowSplit = resp[0].show?.split(',') || null
                let respHideSplit: any
                
                if (resp[0].hide?.substring(0, 4) === 'qnbr') {
                    const storage = JSON.parse(localStorage.getItem('questionnaire')!)
                    const numberQuestion = Number(resp[0].hide?.substring(4, 7))
                    const numberAnswer = resp[0].hide?.substring(8).split(':')
                    for (let i=0; i<storage.length; i++) {
                        if (Number(storage[i].qnbr) === numberQuestion) {
                            for (let j=0; j<numberAnswer.length; j++) {
                                if (Number(storage[i].anbr) === Number(numberAnswer[j].substring(0, 2))) {
                                    respHideSplit = numberAnswer[j].substring(3).split(',')
                                }
                            }
                        }
                    }
                } else {
                    respHideSplit = resp[0].hide?.split(',') || null
                }

                let filter: string[] = []
                if (respShowSplit) {
                    filter = hide.filter((value: any) => {
                        return !respShowSplit.includes(value)
                    })
                    setHide(p => filter)
                }

                if(respHideSplit) {
                    setHide(p => ([...p, ...respHideSplit]))
                } else {
                    setHide(p => ([...p]))
                }
            }

            if (extravalue) {
                console.log({ email: user?.email, effdt, qnbr: qnbr.toString(), anbr: anbr.toString(), extravalue })
                agoraApi.post('/question/save-question', { email: user?.email, effdt, qnbr: qnbr.toString(), anbr: anbr.toString(), extravalue })
                return
            }
            agoraApi.post('/question/save-question', { email: user?.email, effdt, qnbr: qnbr.toString(), anbr: anbr.toString() })
        }

    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBlockEnd: 20 }}>
            <select className='select' onChange={ (e) => onSelectedOption(e.target.value) } value={ answer }>
                <option value="">Select an option</option>
                {
                    data.map(resp => (
                        <option
                            key={ resp.id }
                            value={ `${ resp.id }` }
                        >
                            { resp.descr } - Score: { resp.score }
                        </option>
                    ))
                }
            </select>
        </div>
    )
}
