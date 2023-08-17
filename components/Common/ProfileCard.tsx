import { FC, Fragment, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'
import { ISearch } from '@/interfaces'

import styles from './profile-card.module.css'

interface Props {
    result: ISearch
    index: number
}

export const ProfileCard: FC<Props> = ({ result, index }) => {
    const { user } = useContext(AuthContext)

    const router = useRouter()

    const handleSendRequest = async(id: string) => {
        try {
            await agoraApi.post(`/contact/send-request`, { id, email:  user?.email })

            const $connectId = document.getElementById('connect-' + id)
            $connectId!.style.display = 'none'
        } catch (error) {
            
        }
    }

    return (
        <Fragment key={ result.id }>
            {
                result.email !== user?.email && (
                    <div className={ styles['card-container'] } tabIndex={ index }>
                        <div className={ styles['user-circle'] }>
                            {
                                result.profilepic && (
                                    <Image
                                        src={ result.profilepic }
                                        alt=''
                                        width={ 66 }
                                        height={ 66 }
                                    />
                                )
                            }
                        </div>
                        <div className={ styles['card'] }>
                            <div className={ styles['card-front'] }>
                                <p className={ styles['card-title'] }>{ result.name }</p>
                                <div className={ styles['card-wrapper'] }>
                                    <p className={ styles['card-subtitle'] }>Country</p>
                                    <p className={ styles['card-info'] }>{ result.country }</p>
                                </div>
                                <div className={ styles['card-wrapper'] }>
                                    {
                                        router.query.type === 'entrepreneur'
                                        ? (
                                            <>
                                                <p className={ styles['card-subtitle'] }>Sector</p>
                                                <p className={ styles['card-info'] }>{ result.front1 }</p>
                                            </>
                                        )
                                        : router.query.type === 'investors'
                                        ? (
                                            <>
                                                <p className={ styles['card-subtitle'] }>Activity Areas</p>
                                                <p className={ styles['card-info'] }>{ result.front1 }</p>
                                            </>
                                        )
                                        : (
                                            <>
                                                <p className={ styles['card-subtitle'] }>Type of Expert</p>
                                                <p className={ styles['card-info'] }>{ result.front1 }</p>
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
                                                <p className={ styles['card-info'] }>{ result.front2 }</p>
                                            </>
                                        )
                                        : router.query.type === 'investors'
                                        ? (
                                            <>
                                                <p className={ styles['card-subtitle'] }>Order priority investment</p>
                                                <p className={ styles['card-info'] }>{ result.front2 }</p>
                                            </>
                                        )
                                        : (
                                            <>
                                                <p className={ styles['card-subtitle'] }>Areas of Expertise</p>
                                                <p className={ styles['card-info'] }>{ result.front2 }</p>
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
                                                <p className={ styles['card-info'] }>${ result.back1 }</p>
                                            </>
                                        )
                                        : router.query.type === 'investors'
                                        ? (
                                            <>
                                                <p className={ styles['card-subtitle'] }>Risk Preference</p>
                                                <p className={ styles['card-info'] }>{ result.back1 }</p>
                                            </>
                                        )
                                        : (
                                            <>
                                                <p className={ styles['card-subtitle'] }>Years of Experience</p>
                                                <p className={ styles['card-info'] }>{ result.back1 }</p>
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
                                                <p className={ styles['card-info'] }>{ result.back2 }</p>
                                            </>
                                        )
                                        : router.query.type === 'investors'
                                        ? (
                                            <>
                                                <p className={ styles['card-subtitle'] }>Type of Investment Offered</p>
                                                <p className={ styles['card-info'] }>{ result.back2 }</p>
                                            </>
                                        )
                                        : (
                                            <>
                                                <p className={ styles['card-subtitle'] }>Avaibility 16 hours per week</p>
                                                <p className={ styles['card-info'] }>{ result.back2 }</p>
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
                                                <p className={ styles['card-info'] }>{ result.back3 }</p>
                                            </>
                                        )
                                        : router.query.type === 'investors'
                                        ? (
                                            <>
                                                <p className={ styles['card-subtitle'] }>Minimum investment (USD)</p>
                                                <p className={ styles['card-info'] }>{ result.back3 }</p>
                                            </>
                                        )
                                        : (
                                            <>
                                                {/* <p className={ styles['card-subtitle'] }>Project length</p>
                                                <p className={ styles['card-info'] }>{ result.back3 }</p> */}
                                            </>
                                        )
                                    }
                                </div>
                                {
                                    !result.contact && (
                                        <a
                                            id={ `connect-${ result.id }` }
                                            type='button'
                                            className={ `button-outline ${ styles['connect-button'] }` }
                                            onClick={ () => handleSendRequest(result.id) }
                                        >
                                            Connect
                                        </a>
                                    )
                                }
                                <Link
                                    href={ `/profile/${ result.id }` }
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
                )
            }
        </Fragment>
    )
}
