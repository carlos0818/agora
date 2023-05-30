import { FC } from 'react'

import { ISelectBox } from '@/interfaces'

interface Props {
    data: ISelectBox[]
}

export const SelectBox: FC<Props> = ({ data }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBlockEnd: 20 }}>
            <select className='select'>
                {
                    data.map(resp => (
                        <option key={ resp.id } value={ `${ resp.id }` }>{ resp.descr }</option>
                    ))
                }
            </select>
        </div>
    )
}
