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
                <input
                    type='button'
                    className='button-filled'
                    style={{ width: 'fit-content', margin: 'auto', marginBlockStart: 20 }}
                    value='Return to my profile'
                    onClick={ () => router.push(`/profile/${ user?.id }`) }
                />
                <iframe
                    title="Report Section"
                    width="1280"
                    style={{ height: '100%', marginBlockStart: 16 }}
                    src="https://app.powerbi.com/view?r=eyJrIjoiMTEzYTQ1NzktZmJhZC00YTU0LWFlZjQtYzc4OGY2NWIxYTA1IiwidCI6ImIzZTVkYjVlLTI5NDQtNDgzNy05OWY1LTc0ODhhY2U1NDMxOSIsImMiOjh9&embedImagePlaceholder=true&pageName=ReportSection"
                    frameBorder="0"
                    allowFullScreen></iframe>
            </>
        </HomeLoginWithoutMenuLayout>
    )
}

export default DashboardPage