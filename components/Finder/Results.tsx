import { FC } from 'react'
import { useRouter } from 'next/router'

import { ISearch } from '@/interfaces'
import styles from './results.module.css'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
    search: ISearch[]
    loadingSearch: boolean
}

export const Results: FC<Props> = ({ search, loadingSearch }) => {
    const router = useRouter()

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
                                search.map((res, idx) => (
                                    <div key={ res.id } className={ styles['card-container'] } tabIndex={ idx }>
                                        <div className={ styles['user-circle'] }>
                                            {
                                                res.profilepic && (
                                                    <Image
                                                        src={ res.profilepic }
                                                        alt=''
                                                        width={ 66 }
                                                        height={ 66 }
                                                    />
                                                )
                                            }
                                        </div>
                                        <div className={ styles['card'] }>
                                            <div className={ styles['card-front'] }>
                                                <p className={ styles['card-title'] }>{ res.name }</p>
                                                <div className={ styles['card-wrapper'] }>
                                                    <p className={ styles['card-subtitle'] }>Country</p>
                                                    <p className={ styles['card-info'] }>{ res.country }</p>
                                                </div>
                                                <div className={ styles['card-wrapper'] }>
                                                    {
                                                        router.query.type === 'entrepreneur'
                                                        ? (
                                                            <>
                                                                <p className={ styles['card-subtitle'] }>Sector</p>
                                                                <p className={ styles['card-info'] }>{ res.front1 }</p>
                                                            </>
                                                        )
                                                        : router.query.type === 'investors'
                                                        ? (
                                                            <>
                                                                <p className={ styles['card-subtitle'] }>Activity Areas</p>
                                                                <p className={ styles['card-info'] }>{ res.front1 }</p>
                                                            </>
                                                        )
                                                        : (
                                                            <>
                                                                <p className={ styles['card-subtitle'] }>Type of Expert</p>
                                                                <p className={ styles['card-info'] }>{ res.front1 }</p>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <div className={ styles['card-wrapper'] }>
                                                    {
                                                        router.query.type === 'entrepreneur'
                                                        ? (
                                                            <>
                                                                <p className={ styles['card-subtitle'] }>Size of company</p>
                                                                <p className={ styles['card-info'] }>{ res.front2 }</p>
                                                            </>
                                                        )
                                                        : router.query.type === 'investors'
                                                        ? (
                                                            <>
                                                                <p className={ styles['card-subtitle'] }>Order priority investment</p>
                                                                <p className={ styles['card-info'] }>{ res.front2 }</p>
                                                            </>
                                                        )
                                                        : (
                                                            <>
                                                                <p className={ styles['card-subtitle'] }>Areas of Expertise</p>
                                                                <p className={ styles['card-info'] }>{ res.front2 }</p>
                                                            </>
                                                        )
                                                    }
                                                    
                                                </div>
                                            </div>
                                            <div className={ styles['card-back'] }>
                                                <div className={ styles['card-wrapper'] }>
                                                    {
                                                        router.query.type === 'entrepreneur'
                                                        ? (
                                                            <>
                                                                <p className={ styles['card-subtitle'] }>Funding Needs (USD)</p>
                                                                <p className={ styles['card-info'] }>${ res.back1 }</p>
                                                            </>
                                                        )
                                                        : router.query.type === 'investors'
                                                        ? (
                                                            <>
                                                                <p className={ styles['card-subtitle'] }>Risk Preference</p>
                                                                <p className={ styles['card-info'] }>{ res.back1 }</p>
                                                            </>
                                                        )
                                                        : (
                                                            <>
                                                                <p className={ styles['card-subtitle'] }>Years of Experience</p>
                                                                <p className={ styles['card-info'] }>{ res.back1 }</p>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <div className={ styles['card-wrapper'] }>
                                                    {
                                                        router.query.type === 'entrepreneur'
                                                        ? (
                                                            <>
                                                                <p className={ styles['card-subtitle'] }>Utilization of funding</p>
                                                                <p className={ styles['card-info'] }>{ res.back2 }</p>
                                                            </>
                                                        )
                                                        : router.query.type === 'investors'
                                                        ? (
                                                            <>
                                                                <p className={ styles['card-subtitle'] }>Type of Investment Offered</p>
                                                                <p className={ styles['card-info'] }>{ res.back2 }</p>
                                                            </>
                                                        )
                                                        : (
                                                            <>
                                                                <p className={ styles['card-subtitle'] }>Avaibility 16 hours per week</p>
                                                                <p className={ styles['card-info'] }>{ res.back2 }</p>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <div className={ styles['card-wrapper'] }>
                                                    {
                                                        router.query.type === 'entrepreneur'
                                                        ? (
                                                            <>
                                                                <p className={ styles['card-subtitle'] }>Type of support</p>
                                                                <p className={ styles['card-info'] }>{ res.back3 }</p>
                                                            </>
                                                        )
                                                        : router.query.type === 'investors'
                                                        ? (
                                                            <>
                                                                <p className={ styles['card-subtitle'] }>Minimum investment (USD)</p>
                                                                <p className={ styles['card-info'] }>{ res.back3 }</p>
                                                            </>
                                                        )
                                                        : (
                                                            <>
                                                                {/* <p className={ styles['card-subtitle'] }>Project length</p>
                                                                <p className={ styles['card-info'] }>{ res.back3 }</p> */}
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <Link
                                                    href={ `/profile/${ res.id }` }
                                                    passHref
                                                    prefetch={ false }
                                                    legacyBehavior
                                                >
                                                    <a
                                                        type='button'
                                                        className={ `button-outline ${ styles['connect-button'] }` }
                                                    >Connect</a>
                                                </Link>
                                                <Link
                                                    href={ `/profile/${ res.id }` }
                                                    passHref
                                                    prefetch={ false }
                                                    legacyBehavior
                                                >
                                                    <a
                                                        type='button'
                                                        className={ `button-filled ${ styles['profile-button'] }` }
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
