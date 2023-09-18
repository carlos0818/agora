import { HomeLoginWithoutMenuLayout } from '@/components/layouts/HomeLoginWithoutMenuLayout'
import { NextPage } from 'next'

const SectorAnalysisPage: NextPage = () => {
    return (
        <HomeLoginWithoutMenuLayout title='Agora' pageDescription=''>
            <iframe
                title="Report Section"
                width="1280"
                style={{ height: 1000, marginBlockStart: 16 }}
                src="https://sdginvestorplatform.undp.org/market-intelligence"
                frameBorder="0"
                allowFullScreen></iframe>
        </HomeLoginWithoutMenuLayout>
    )
}

export default SectorAnalysisPage