import { IAnswer } from '@/interfaces'
import { FC } from 'react'

interface Props {
    answers: IAnswer[]
}

export const CheckboxList: FC<Props> = ({ answers }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {
                answers.map(answer => (
                    <div key={ `${ answer.qnbr }-${ answer.anbr }` } style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
                        <input type='checkbox' /> { answer.descr }
                    </div>
                ))
            }
        </div>
    )
}
