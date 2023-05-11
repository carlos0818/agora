import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'

import styles from './my-profile.module.css'

import rocketProgressImage from '@/public/images/rocket-progress.svg'

const MyProfilePage: NextPage = () => {
    return (
        <HomeLoginLayout
            title=''
            pageDescription=''
        >
            <>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 0, overflow: 'hidden' }}>
                        <div className={ styles['cover-image'] }>
                            <div className={ `window-glass ${ styles['profile-image-container'] }` }>
                                <div className={ `window-glass-content ${ styles['profile-image'] }` }>

                                </div>
                            </div>
                        </div>
                        <div className={ styles['profile-info-container'] }>
                            <p className={ `${ styles['info-text'] } ${ styles['company-name'] }` }>QuarkLink</p>
                            <p className={ styles['info-text'] }>By Carlos Benavides</p>
                            <p className={ `${ styles['info-text'] } ${ styles['member-text'] }` }>Member 2 months ago</p>
                            <div className={ styles['stars-container'] }>

                            </div>
                            <p className={ `${ styles['info-text'] }` }>Lima, Lima - Perú</p>
                            <p className={ `${ styles['info-text'] } ${ styles['address-text'] }` }>Insert your address</p>
                            <p className={ `${ styles['info-text'] }` }>www.brimstonenergy.com</p>
                            <p className={ `${ styles['info-text'] }` }>+151004285311</p>
                            <div className={ styles['social-container'] }>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` }>
                        <p className={ styles['required-title'] }>Required information</p>
                        <div className={ styles['required-text-container'] }>
                            <p className={ styles['required-text'] }>Youtube video</p>
                            <p className={ styles['required-text'] }>Profile photo</p>
                            <p className={ styles['required-text'] }>Email contact</p>
                            <p className={ styles['required-text'] }>Phone</p>
                            <p className={ styles['required-text'] }>Address</p>
                        </div>
                        <p className={ styles['required-description'] }>
                            In order to move forward with the process, we kindly request that you provide us with the necessary information as mentioned above.
                            This information is crucial to ensure a smooth and efficient process.
                        </p>
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` }>
                        <div className={ styles['progress-container'] }>
                            <progress className={ styles['progress-bar'] } value="100" max="100" />
                            <Image
                                src={ rocketProgressImage }
                                alt='Rocket image'
                                className={ styles['rocket-image'] }
                            />
                        </div>
                        <div className={ styles['progress-image'] }>

                        </div>
                        <p className={ styles['progress-title'] }>CONGRATULATIONS!!!</p>
                        <p className={ styles['progress-description'] }>Click here to continue with your profile</p>
                    </div>
                </div>
            </>
        </HomeLoginLayout>
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