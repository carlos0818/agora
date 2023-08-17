import { FC } from 'react'

import { ISearch } from '@/interfaces'

import styles from './results.module.css'
import { ProfileCard } from '../Common/ProfileCard'

interface Props {
    search: ISearch[]
    loadingSearch: boolean
}

export const Results: FC<Props> = ({ search, loadingSearch }) => {
    return (
        <>
            <div className={ styles['results-container'] }>
                {
                    loadingSearch
                    ? (
                        <div style={{ display: 'flex', inlineSize: '100%', justifyContent: 'center' }}>
                            <em className='spinner blue-agora' style={{ blockSize: 40, inlineSize: 40, justifySelf: 'center', alignSelf: 'center' }} />
                        </div>
                    )
                    : (
                        <div className={ styles['results-wrapper'] }>
                            {
                                search.length === 0 && <p style={{ margin: 'auto' }}>No results</p>
                            }
                            {
                                search.map((result, idx) => (
                                    <ProfileCard
                                        result={ result }
                                        index={ idx }
                                    />
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}
