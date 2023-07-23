import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'

import { ISelectBox } from '@/interfaces'

interface Props {
    questionsAnswered: string[]
    data: ISelectBox[]
    hide: string[]
    setHide: Dispatch<SetStateAction<string[]>>
}

export const SelectBox: FC<Props> = ({ questionsAnswered, data, hide = [], setHide }) => {
    // console.log('data', data)
    const { user } = useContext(AuthContext)
    const { updateHide, updateAnsweredQuestions, newMasterHide, removeMasterHide } = useContext(QuestionnaireContext)

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

    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log('aaaaaa')
    //         // console.log(new Date())
    //         if (questionsAnswered) {
    //             const idArr = data[0].id.split('-')
    //             const qnbr = idArr[0]
    
    //             const find = questionsAnswered.find(ans => {
    //                 const idArr2 = ans.split('-')
    //                 const qnbr2 = idArr2[0]
    //                 if (qnbr2 === qnbr) {
    //                     return ans
    //                 }
    //             })
    
    //             if (find) {
    //                 onSelectedOption(find, false)
    //             }
    //         }
    //     }, 1000)
    // }, [])

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

            // if (save)
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

            let filter: string[] = []
            if (respShowSplit) {
                filter = hide.filter((value: any) => respShowSplit.indexOf(value) < 0)
                // if (save) {
                    // setHide(p => filter)
                    updateHide(filter.length)
                    removeMasterHide(filter)
                // }
            }

            if(respHideSplit) {
                // setHide(p => ([...p, ...respHideSplit]))
                newMasterHide(respHideSplit)
            }

            // if (save) {
                setAnswer(id)

                if (extravalue) {
                    agoraApi.post('/question/save-question', { email: user?.email, type: user?.type, effdt, qnbr: qnbr.toString(), anbr: anbr.toString(), extravalue })
                    return
                }
                agoraApi.post('/question/save-question', { email: user?.email, type: user?.type, effdt, qnbr: qnbr.toString(), anbr: anbr.toString() })
            // }
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
