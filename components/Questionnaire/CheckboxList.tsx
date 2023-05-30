import { FC } from 'react'
import { ISelectBox } from '@/interfaces'

interface Props {
    data: ISelectBox[]
}

export const CheckboxList: FC<Props> = ({ data }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBlockEnd: 20, gap: 8 }}>
            {
                data.map(answer => (
                    <div key={ answer.id } style={{ alignItems: 'center', display: 'flex' }}>
                        <label className='checkbox'>
                            <input type='checkbox' /> { answer.descr }
                            <span className='check'></span>
                        </label>
                    </div>
                ))
            }
        </div>
    )
}
