import { useContext } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { AuthContext } from '@/context/auth'

import { HomeLoginWithoutMenuLayout } from '@/components/layouts/HomeLoginWithoutMenuLayout'

const DashboardPage: NextPage = () => {
    const router = useRouter()
    const { user } = useContext(AuthContext)

    return (
        <HomeLoginWithoutMenuLayout
            title=''
            pageDescription=''
        >
            <>
                <iframe
                    title="Report Section"
                    width="1280"
                    // height="373.5"
                    style={{ height: '100%' }}
                    src="https://app.powerbi.com/view?r=eyJrIjoiMTEzYTQ1NzktZmJhZC00YTU0LWFlZjQtYzc4OGY2NWIxYTA1IiwidCI6ImIzZTVkYjVlLTI5NDQtNDgzNy05OWY1LTc0ODhhY2U1NDMxOSIsImMiOjh9&embedImagePlaceholder=true&pageName=ReportSection"
                    frameBorder="0"
                    allowFullScreen></iframe>

                <input
                    type='button'
                    className='button-filled'
                    style={{ boxShadow: '0px 0px 20px white', width: 'fit-content', margin: 'auto', marginBlockStart: 20 }}
                    value='Return to my profile'
                    onClick={ () => router.push(`/profile/${ user?.id }`) }
                />
            </>
        </HomeLoginWithoutMenuLayout>
    )
}

export default DashboardPage