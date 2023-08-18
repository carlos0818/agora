import { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'

import { ISearch } from '@/interfaces'
import { AuthContext } from '@/context/auth'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'
import { ProfileCard } from '@/components/Common/ProfileCard'

import styles from './notifications.module.css'
import { agoraApi } from '@/api'
import { NotificationContext } from '@/context/notification'

const Notifications: NextPage = () => {
    const { user } = useContext(AuthContext)
    const { notifications, updateNotifications } = useContext(NotificationContext)

    const [entrepreneursProfile, setEntrepreneursProfile] = useState<ISearch[]>([])
    const [investorsProfile, setInvestorsProfile] = useState<ISearch[]>([])
    const [expertsProfile, setExpertsProfile] = useState<ISearch[]>([])

    const [entrepreneursCount, setEntrepreneursCount] = useState(0)
    const [investorsCount, setInvestorsCount] = useState(0)
    const [expertsCount, setExpertsCount] = useState(0)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            getShowNotifications()
        }
    }, [user])

    const getShowNotifications = async() => {
        setLoading(true)
        const { data: entrepreneurs } = await agoraApi.get<ISearch[]>(`/entrepreneur/show-notifications-15-ago?email=${ user?.email }`)
        const { data: investors } = await agoraApi.get<ISearch[]>(`/investor/show-notifications-15-ago?email=${ user?.email }`)
        const { data: experts } = await agoraApi.get<ISearch[]>(`/expert/show-notifications-15-ago?email=${ user?.email }`)
        setEntrepreneursProfile(entrepreneurs)
        setInvestorsProfile(investors)
        setExpertsProfile(experts)

        const { data: entrepreneursCount } = await agoraApi.get(`/entrepreneur/show-notifications?email=${ user?.email }`)
        const { data: investorsCount } = await agoraApi.get(`/investor/show-notifications?email=${ user?.email }`)
        const { data: expertsCount } = await agoraApi.get(`/expert/show-notifications?email=${ user?.email }`)
        setEntrepreneursCount(entrepreneursCount.notifications)
        setInvestorsCount(investorsCount.notifications)
        setExpertsCount(expertsCount.notifications)
        setLoading(false)
    }

    const handleUpdateShowEntrepreneurs = async() => {
        const $entrepreneurs = document.querySelector('#entrepreneurs') as any
        if (!$entrepreneurs.open) {
            await agoraApi.post('/entrepreneur/update-show-notifications', { email: user?.email })
        }
        setEntrepreneursCount(0)
        updateNotifications({ ...notifications, views: notifications.views - 1 })
    }

    const handleUpdateShowInvestors = async() => {
        const $investors = document.querySelector('#investors') as any
        if (!$investors.open) {
            await agoraApi.post('/investor/update-show-notifications', { email: user?.email })
        }
        setInvestorsCount(0)
        updateNotifications({ ...notifications, views: notifications.views - 1 })
    }

    const handleUpdateShowExperts = async() => {
        const $experts = document.querySelector('#experts') as any
        if (!$experts.open) {
            await agoraApi.post('/expert/update-show-notifications', { email: user?.email })
        }
        setExpertsCount(0)
        updateNotifications({ ...notifications, views: notifications.views - 1 })
    }

    return (
        <HomeLoginLayout
            title=''
            pageDescription=''
        >
            <>
            {
                loading
                ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBlockStart: 60 }}>
                        <em className='spinner blue-agora' style={{ blockSize: 40, inlineSize: 40 }} />
                    </div>
                ) : (
                    <div className={ `window-glass` }>
                        <div className={ `window-glass-content` } style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                            <details
                                id='entrepreneurs'
                                className={ styles['details'] }
                                onClick={ handleUpdateShowEntrepreneurs }
                            >
                                <summary className={ styles['accordion-title'] }>
                                    Entrepreneurs who have viewed my profile for more than 30 seconds
                                    {
                                        entrepreneursCount > 0 && (
                                            <div className={ styles['notification-balloon'] }>
                                                <span>{ entrepreneursProfile.length }</span>
                                            </div>
                                        )
                                    }
                                    <Image
                                        src='/images/arrow-down.svg'
                                        className={ styles['arrow'] }
                                        alt=''
                                        width={ 24 }
                                        height={ 24 }
                                    />
                                </summary>
                                <div className={ styles['accordion-content'] }>
                                    <div className={ styles['results-wrapper'] }>
                                        {
                                            entrepreneursProfile.map((profile, idx) => (
                                                <ProfileCard
                                                    key={ profile.id }
                                                    result={ profile }
                                                    index={ idx }
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </details>
                            <details className={ styles['details'] }>
                                <summary
                                    id='investors'
                                    className={ styles['accordion-title'] }
                                    onClick={ handleUpdateShowInvestors }
                                >
                                    Investors who have viewed my profile for more than 30 seconds
                                    {
                                        investorsCount > 0 && (
                                            <div className={ styles['notification-balloon'] }>
                                                <span>{ investorsProfile.length }</span>
                                            </div>
                                        )
                                    }
                                    <Image
                                        src='/images/arrow-down.svg'
                                        className={ styles['arrow'] }
                                        alt=''
                                        width={ 24 }
                                        height={ 24 }
                                    />
                                </summary>
                                <div className={ styles['accordion-content'] }>
                                    <div className={ styles['results-wrapper'] }>
                                        {
                                            investorsProfile.map((profile, idx) => (
                                                <ProfileCard
                                                    key={ profile.id }
                                                    result={ profile }
                                                    index={ idx }
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </details>
                            <details className={ styles['details'] }>
                                <summary
                                    id='experts'
                                    className={ styles['accordion-title'] }
                                    onClick={ handleUpdateShowExperts }
                                >
                                    Experts who have viewed my profile for more than 30 seconds
                                    {
                                        expertsCount > 0 && (
                                            <div className={ styles['notification-balloon'] }>
                                                <span>{ expertsProfile.length }</span>
                                            </div>
                                        )
                                    }
                                    <Image
                                        src='/images/arrow-down.svg'
                                        className={ styles['arrow'] }
                                        alt=''
                                        width={ 24 }
                                        height={ 24 }
                                    />
                                </summary>
                                <div className={ styles['accordion-content'] }>
                                    <div className={ styles['results-wrapper'] }>
                                        {
                                            expertsProfile.map((profile, idx) => (
                                                <ProfileCard
                                                    key={ profile.id }
                                                    result={ profile }
                                                    index={ idx }
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </details>
                        </div>
                    </div>
                )
            }
            </>
        </HomeLoginLayout>
    )
}

export default Notifications