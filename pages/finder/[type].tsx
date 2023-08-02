import { Results } from '@/components/Finder/Results'
import { Search } from '@/components/Finder/Search'
import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'

const EntrepreneurFinder = () => {
    return (
        <HomeLoginLayout
            title=''
            pageDescription=''
        >
            <div className={ `window-glass` }>
                <div className={ `window-glass-content` } style={{ padding: 0, overflow: 'hidden' }}>
                    <Search />
                    <Results />
                </div>
            </div>
        </HomeLoginLayout>
    )
}

export default EntrepreneurFinder