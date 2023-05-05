import { useRef } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'
import { MenuDesktop } from '@/components/Home/Menu/MenuDesktop'
import { FooterMobile } from '@/components/Footer/FooterMobile'
import { FooterDesktop } from '@/components/Footer/FooterDesktop'

import styles from './my-profile.module.css'

import notificationIcon from '../../public/images/notification-icons.svg'

const MyProfilePage: NextPage = () => {
    const wrapperRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <AgoraLayout title='Agora' pageDescription=''>
                <div className={ styles['profile-container'] }>
                    <div className={ styles['profile-wrapper'] } ref={ wrapperRef }>
                        <MenuDesktop
                            wrapperRef={ wrapperRef }
                        />
                        <div className={ styles['content-container'] }>
                            <div className={ `window-glass` }>
                                <div className='window-glass-content'>

                                </div>
                            </div>
                        </div>
                        <div className={ styles['notifications'] }>
                            <div className={ styles['notifications-wrapper'] }>
                                <Image
                                    src={ notificationIcon }
                                    alt='notification icon'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </AgoraLayout>

            <FooterMobile />
            <FooterDesktop />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            // user: session.user
        }
    }
}

export default MyProfilePage