import { FC } from 'react'

import { IEntrepreneurSearch } from '@/interfaces'
import styles from './results.module.css'
import Link from 'next/link'

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
                                search.map((res, idx) => (
                                    <div key={ res.id } className={ styles['card-container'] } tabIndex={ idx }>
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
                                                <Link
                                                    href={ `/profile/${ res.id }` }
                                                    passHref
                                                    prefetch={ false }
                                                    legacyBehavior
                                                >
                                                    <a
                                                        type='button'
                                                        className='button-filled'
                                                    >View profile</a>
                                                </Link>
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
