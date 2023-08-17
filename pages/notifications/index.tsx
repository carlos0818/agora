import { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'

import { ISearch } from '@/interfaces'
import { AuthContext } from '@/context/auth'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'
import { ProfileCard } from '@/components/Common/ProfileCard'

import styles from './notifications.module.css'
import { agoraApi } from '@/api'

const Notifications: NextPage = () => {
    const { user } = useContext(AuthContext)

    const [entrepreneursProfile, setEntrepreneursProfile] = useState<ISearch[]>([])
    const [investorsProfile, setInvestorsProfile] = useState<ISearch[]>([])
    const [expertsProfile, setExpertsProfile] = useState<ISearch[]>([])

    useEffect(() => {
        if (user) {
            getShowNotifications()
        }
    }, [user])

    const getShowNotifications = async() => {
        const { data: entrepreneurs } = await agoraApi.get<ISearch[]>(`/entrepreneur/show-notifications?email=${ user?.email }`)
        const { data: investors } = await agoraApi.get<ISearch[]>(`/investor/show-notifications?email=${ user?.email }`)
        const { data: experts } = await agoraApi.get<ISearch[]>(`/expert/show-notifications?email=${ user?.email }`)
        setEntrepreneursProfile(entrepreneurs)
        setInvestorsProfile(investors)
        setExpertsProfile(experts)
        
    }

    return (
        <HomeLoginLayout
            title=''
            pageDescription=''
        >
            <div className={ `window-glass` }>
                <div className={ `window-glass-content` } style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                    <details className={ styles['details'] }>
                        <summary className={ styles['accordion-title'] }>
                            Investors who viewed my profile for more than 30 seconds
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
                        <summary className={ styles['accordion-title'] }>
                            Investors who viewed my profile for more than 30 seconds
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
                        <summary className={ styles['accordion-title'] }>
                            Investors who viewed my profile for more than 30 seconds
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
        </HomeLoginLayout>
    )
}

export default Notifications