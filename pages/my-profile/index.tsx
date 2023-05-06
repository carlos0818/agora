import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'

const MyProfilePage: NextPage = () => {
    return (
        <HomeLoginLayout
            showWrite
            title=''
            pageDescription=''
        >
            <>
                <div className={ `window-glass` }>
                    <div className='window-glass-content'>

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