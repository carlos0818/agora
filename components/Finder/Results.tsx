import { FC } from 'react'

import { IEntrepreneurSearch } from '@/interfaces'
import styles from './results.module.css'

interface Props {
    search: IEntrepreneurSearch[]
    loadingSearch: boolean
}

export const Results: FC<Props> = ({ search, loadingSearch }) => {
    return (
        <>
            <div className={ styles['results-container'] }>
                {
                    loadingSearch
                    ? <em className='spinner blue-agora' style={{ blockSize: 40, inlineSize: 40, justifySelf: 'center', alignSelf: 'center' }} />
                    : (
                        <div className={ styles['results-wrapper'] }>
                            {
                                search.map(res => (
                                    <div key={ res.name } className={ styles['card-container'] } tabIndex={ 0 }>
                                        <div className={ styles['user-circle'] }></div>
                                        <div className={ styles['card'] }>
                                            <div className={ styles['card-front'] }>
                                                <p className={ styles['card-title'] }>{ res.name }</p>
                                                <p className={ styles['card-subtitle'] }>Country</p>
                                                <p className={ styles['card-info'] }>{ res.country }</p>
                                                <p className={ styles['card-subtitle'] }>Funding</p>
                                                <p className={ styles['card-info'] }>{ res.extravalue }</p>
                                                <p className={ styles['card-subtitle'] }>Type</p>
                                                <p className={ styles['card-info'] }>{ res.descr }</p>
                                            </div>
                                            <div className={ styles['card-back'] }>
                                                <span>bbbbbbbbbb</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}
