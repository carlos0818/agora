import { useEffect, useState } from 'react'

import { agoraApi } from '@/api'
import { ICompanyType, ISearch } from '@/interfaces'

import { Results } from '@/components/Finder/Results'
import { Search } from '@/components/Finder/Search'
import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'

const EntrepreneurFinder = () => {
    const [types, setTypes] = useState<ICompanyType[]>([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState<ISearch[]>([])
    const [loadingSearch, setLoadingSearch] = useState(false)

    useEffect(() => {
        getTypes()
    }, [])

    const getTypes = async() => {
        setLoading(true)
        try {
            const { data } = await agoraApi.get('/entrepreneur/get-company-size')
            setTypes(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <HomeLoginLayout
            title=''
            pageDescription=''
        >
            <div style={{ inlineSize: '100%', marginInline: 'auto' }}>
                {
                    loading
                    ? <em className='spinner blue-agora' style={{ blockSize: 40, inlineSize: 40 }} />
                    : (
                        <div className={ `window-glass` }>
                            <div className={ `window-glass-content` } style={{ padding: 0, overflow: 'hidden' }}>
                                <Search
                                    types={ types }
                                    setLoadingSearch={ setLoadingSearch }
                                    setSearch={ setSearch }
                                />
                                <em className='spinner blue-agora' style={{ blockSize: 400, inlineSize: 400 }} />
                                <Results
                                    search={ search }
                                    loadingSearch={ loadingSearch }
                                    setSearch={ setSearch }
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </HomeLoginLayout>
    )
}

export default EntrepreneurFinder