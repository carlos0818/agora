import { Dispatch, FC, SetStateAction, useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import countriesList from '@/db/countries'
import { ICompanyType, ISearch } from '@/interfaces'
import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'

import styles from './search.module.css'

interface Props {
    types: ICompanyType[]
    setLoadingSearch: Dispatch<SetStateAction<boolean>>
    setSearch: Dispatch<SetStateAction<ISearch[]>>
}

export const Search: FC<Props> = ({ types, setLoadingSearch, setSearch }) => {
    const { user } = useContext(AuthContext)
    const { query } = useRouter()
    const accountType = query.type

    const { countries } = countriesList

    const termRef = useRef<HTMLInputElement>(null)
    const countryRef = useRef<HTMLSelectElement>(null)
    const minRef = useRef<HTMLInputElement>(null)
    const maxRef = useRef<HTMLInputElement>(null)
    const typeRef = useRef<HTMLSelectElement>(null)
    const alphabeticalRef = useRef<HTMLInputElement>(null)
    const fundingRef = useRef<HTMLInputElement>(null)
    const interestRef = useRef<HTMLSelectElement>(null)
    const expertiseRef = useRef<HTMLSelectElement>(null)

    let searchTimeout: any

    useEffect(() => {
        if (termRef.current) termRef.current.value = ''
        if (countryRef.current) countryRef.current.value = ''
        if (minRef.current) minRef.current.value = ''
        if (maxRef.current) maxRef.current.value = ''
        if (typeRef.current) typeRef.current.value = ''
        if (alphabeticalRef.current) alphabeticalRef.current.value = ''
        if (fundingRef.current) fundingRef.current.value = ''

        handleSearch()
    }, [accountType])

    const handleSearchTextfield = () => {
        clearTimeout(searchTimeout)

        searchTimeout = setTimeout(async() => {
            handleSearch()
        }, 600)
    }

    const handleSearchRange = () => {
        clearTimeout(searchTimeout)

        searchTimeout = setTimeout(async() => {
            if (minRef.current!.value !== '' && maxRef.current!.value !== '')
                handleSearch()
        }, 600)
    }

    const handleSearch = async() => {
        setLoadingSearch(true)
        let query = ''

        if (termRef.current && termRef.current.value !== '') {
            query += `&term=${ termRef.current.value }`
        }

        if (countryRef.current && countryRef.current.value !== '') {
            query += `&country=${ countryRef.current.value }`
        }

        if (minRef.current && minRef.current.value !== '' && maxRef.current && maxRef.current.value !== '') {
            query += `&from=${ minRef.current.value }&to=${ maxRef.current.value }`
        }

        if (typeRef.current && typeRef.current.value !== '') {
            query += `&anbr=${ typeRef.current.value }`
        }

        if (alphabeticalRef.current && alphabeticalRef.current.checked) {
            query += `&alphabetical=${ alphabeticalRef.current.value }`
        }

        if (fundingRef.current && fundingRef.current.checked) {
            query += `&funding=${ fundingRef.current.value }`
        }

        if (interestRef.current && interestRef.current.value !== '') {
            query += `&interest=${ interestRef.current.value }`
        }

        if (expertiseRef.current && expertiseRef.current.value !== '') {
            query += `&expertise=${ expertiseRef.current.value }`
        }

        console.log(query)

        try {
            switch (accountType) {
                case 'entrepreneur':
                    const { data: entrepreneur } = await agoraApi.get(`/entrepreneur/search?${ query }&email=${ user?.email }`)
                    setSearch(entrepreneur)
                    setLoadingSearch(false)
                    break
                case 'investors':
                    const { data: investors } = await agoraApi.get(`/investor/search?${ query }&email=${ user?.email }`)
                    setSearch(investors)
                    setLoadingSearch(false)
                    break
                case 'experts':
                    const { data: experts } = await agoraApi.get(`/expert/search?${ query }&email=${ user?.email }`)
                    setSearch(experts)
                    setLoadingSearch(false)
                    break
                default:
                    break
            }
        } catch (error) {
            setLoadingSearch(false)
        }
    }

    return (
        <div className={ styles['search-container'] }>
            <input
                ref={ termRef }
                type='text'
                className='field'
                style={{ paddingBlock: 8 }}
                placeholder={ `Search your ${ accountType === 'entrepreneur' ? 'entrepreneur...' : accountType === 'investors' ? 'investor...' : 'expert...' }` }
                onChange={ handleSearchTextfield }
            />
            <div className={ styles['search-containers'] }>
                <div className={ styles['container-one'] }>
                    <div className={ styles['form-row'] }>
                        <label className={ styles['form-row-label'] }>Country</label>
                        <select ref={ countryRef } className={ `select ${ styles['select'] }` } onChange={ handleSearch }>
                            {
                                countries.map(country => (
                                    <option key={ country.alpha3 } value={ country.alpha3 }>{ country.name }</option>
                                ))
                            }
                        </select>
                    </div>
                    {
                        accountType === 'investors' && (
                            <div className={ styles['form-row'] }>
                                <label className={ styles['form-row-label'] }>Sector of interest</label>
                                <select className={ `select ${ styles['select'] }` } ref={ interestRef } onChange={ handleSearch }>
                                    <option value="">Select a sector of interest</option>
                                    <option value="Business and legal services">Business and legal services</option>
                                    <option value="Data and technology">Data and technology</option>
                                    <option value="Education">Education</option>
                                    <option value="Energy">Energy</option>
                                    <option value="Environment and weather">Environment and weather</option>
                                    <option value="Finance and investment">Finance and investment</option>
                                    <option value="Food and agriculture">Food and agriculture</option>
                                    <option value="Geospatial/mapping">Geospatial/mapping</option>
                                    <option value="Governance">Governance</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Housing and real estate Insurance">Housing and real estate Insurance</option>
                                    <option value="Lifestyle and consumer">Lifestyle and consumer</option>
                                    <option value="Media">Media</option>
                                    <option value="Research and consulting">Research and consulting</option>
                                    <option value="Scientific research">Scientific research</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        )
                    }
                    {
                        accountType === 'experts' && (
                            <div className={ styles['form-row'] }>
                                <label className={ styles['form-row-label'] }>Area of expertise</label>
                                <select className={ `select ${ styles['select'] }` } ref={ expertiseRef } onChange={ handleSearch }>
                                    <option value="">Select an area of expertise</option>
                                    <option value="Financing">Financing</option>
                                    <option value="Financial management">Financial management</option>
                                    <option value="Legal">Legal</option>
                                    <option value="Operations">Operations</option>
                                    <option value="Human resources">Human resources</option>
                                    <option value="Vision and leadership">Vision and leadership</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Sales and commerce">Sales and commerce</option>
                                    <option value="CSR and impact">CSR and impact</option>
                                    <option value="Digital and innovation">Digital and innovation</option>
                                    <option value="Market development and research">Market development and research</option>
                                </select>
                            </div>
                        )
                    }
                    {
                        accountType === 'entrepreneur' && (
                            <>
                                <div className={ styles['form-row'] }>
                                    <label className={ styles['form-row-label'] }>Funding</label>
                                    <div className={ styles['max-min-container'] }>
                                        <div className={ styles['max-min-wrapper'] }>
                                            <label>Min.</label>
                                            <input
                                                ref={ minRef }
                                                type='text'
                                                className={ `field ${ styles['textfield'] }` }
                                                style={{ paddingBlock: 8 }}
                                                onChange={ handleSearchRange }
                                            />
                                        </div>
                                        <div className={ styles['max-min-wrapper'] }>
                                            <label>Max.</label>
                                            <input
                                                ref={ maxRef }
                                                type='text'
                                                className={ `field ${ styles['textfield'] }` }
                                                style={{ paddingBlock: 8 }}
                                                onChange={ handleSearchRange }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={ styles['form-row'] }>
                                    <label className={ styles['form-row-label'] }>Size of company</label>
                                    <select ref={ typeRef } className={ `select ${ styles['select'] }` } onChange={ handleSearch }>
                                        <option value="">Select a size of company</option>
                                        {
                                            types.map(type => (
                                                <option key={ type.anbr } value={ type.anbr }>{ type.descr }</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className={ styles['container-two'] }>
                    <label className='checkbox'>
                        <input
                            ref={ alphabeticalRef }
                            type='checkbox'
                            onChange={ handleSearch }
                            value='A'
                        /> Alphabetical
                        <span className='check-white'></span>
                    </label>
                    {
                        accountType === 'entrepreneur' && (
                            <>
                                <label className='checkbox'>
                                    <input
                                        ref={ fundingRef }
                                        type='checkbox'
                                        onChange={ handleSearch }
                                        value='F'
                                    /> Funding
                                    <span className='check-white'></span>
                                </label>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
