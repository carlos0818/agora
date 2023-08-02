import countriesList from '@/db/countries'

import styles from './search.module.css'
import { useRouter } from 'next/router'

export const Search = () => {
    const { query } = useRouter()
    const accountType = query.type

    const { countries } = countriesList

    return (
        <div className={ styles['search-container'] }>
            <input
                type='text'
                className='field'
                style={{ paddingBlock: 8 }}
                placeholder={ `Search your ${ accountType === 'entrepreneur' ? 'entrepreneur...' : accountType === 'investors' ? 'investor...' : 'expert...' }` }
            />
            <div className={ styles['search-containers'] }>
                <div className={ styles['container-one'] }>
                    <div className={ styles['form-row'] }>
                        <label>Country</label>
                        <select className={ `select ${ styles['select'] }` }>
                            {
                                countries.map(country => (
                                    <option key={ country.alpha3 } value={ country.alpha3 }>{ country.name }</option>
                                ))
                            }
                        </select>
                    </div>
                    {
                        accountType === 'entrepreneur' && (
                            <>
                                <div className={ styles['form-row'] }>
                                    <label className={ styles['form-row-label'] }>Funding</label>
                                    <div className={ styles['max-min-container'] }>
                                        <div className={ styles['max-min-wrapper'] }>
                                            <label>Min.</label>
                                            <input type='text' className={ `field ${ styles['textfield'] }` } style={{ paddingBlock: 8 }} />
                                        </div>
                                        <div className={ styles['max-min-wrapper'] }>
                                            <label>Max.</label>
                                            <input type='text' className={ `field ${ styles['textfield'] }` } style={{ paddingBlock: 8 }} />
                                        </div>
                                    </div>
                                </div>
                                <div className={ styles['form-row'] }>
                                    <label className={ styles['form-row-label'] }>Type</label>
                                    <select className={ `select ${ styles['select'] }` }>
                                        <option value=""></option>
                                    </select>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className={ styles['container-two'] }>
                    <label className='checkbox'>
                        <input
                            type='checkbox'
                            id='checkbox'
                        /> Alphabetical
                        <span className='check-white'></span>
                    </label>
                    {
                        accountType === 'entrepreneur' && (
                            <>
                                <label className='checkbox'>
                                    <input
                                        type='checkbox'
                                        id='checkbox'
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
