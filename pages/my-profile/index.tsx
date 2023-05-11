import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'

import styles from './my-profile.module.css'

const MyProfilePage: NextPage = () => {
    return (
        <HomeLoginLayout
            title=''
            pageDescription=''
        >
            <div className={ `window-glass` }>
                <div className={ `window-glass-content` } style={{ padding: 0, overflow: 'hidden' }}>
                    <div className={ styles['cover-image'] }>
                        <div className={ `window-glass ${ styles['profile-image-container'] }` }>
                            <div className={ `window-glass-content ${ styles['profile-image'] }` }>

                            </div>
                        </div>
                    </div>
                    <div className={ styles['profile-info-container'] }>
                        <p className={ `${ styles['info-text'] } ${ styles['company-name'] }` }>Brimstone Energy</p>
                        <p className={ styles['info-text'] }>By Carlos Benavides</p>
                        <p className={ `${ styles['info-text'] } ${ styles['member-text'] }` }>Member 2 months ago</p>
                    </div>
                </div>
            </div>
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