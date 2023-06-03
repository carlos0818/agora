import { Dispatch, FC, SetStateAction, useContext } from 'react'

import { AuthContext } from '@/context/auth'
import { ISelectBox } from '@/interfaces'
import { agoraApi } from '@/api'

interface Props {
    data: ISelectBox[]
    hide?: string[]
    setHide?: Dispatch<SetStateAction<string[]>>
}

export const SelectBox: FC<Props> = ({ data, hide = [], setHide }) => {
    const onSelectedOption = async(id: string) => {
        if (setHide) {
            const storage = JSON.parse(localStorage.getItem('questionnaire') || '')
            const resp = data.filter(ans => ans.id === id)
            const respArr = resp[0].id.split('-')
            const qnbr = respArr[0]
            const anbr = respArr[1]

            let flag = false
            for (let i=0; i<storage.length; i++) {
                if (storage[i].qnbr === qnbr) {
                    storage[i].qnbr = storage[i].qnbr
                    storage[i].anbr = anbr
                    flag = true
                    break
                }
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
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBlockEnd: 20 }}>
            <select className='select' onChange={ (e) => onSelectedOption(e.target.value) }>
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
