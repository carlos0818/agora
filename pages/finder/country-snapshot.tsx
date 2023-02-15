import { useState } from 'react'
import dynamic from 'next/dynamic'

// import { useAppDispatch } from '../../redux/hooks'

import { CountrySnapshotLayout } from '@/components/layouts'
// const MapWithNoSSR = dynamic(() => import('../../components/Map'), {ssr: false });

import countriesList from '../../db/countries'
// import { login } from '@/redux/slices/auth';

import styles from './country-snapshot.module.css'

const CountrySnapshot = () => {
    // const dispatch = useAppDispatch()

    const { countries } = countriesList

    const [country, setCountry] = useState('')

    // const handleLogin = () => {
    //     dispatch(login({
    //         id: 64107523559805,
    //         name: 'Carlos Benavides'
    //     }))
    // }

    return (
        <CountrySnapshotLayout>
            <>
                {/* <button onClick={ handleLogin }>
                    Login
                </button> */}
                <select
                    className={ styles["select"] }
                    defaultValue="0"
                    onChange={ (ev) => setCountry(ev.target.value) }
                >
                    {
                        countries.map(country => (
                            <option key={ country.id } value={ country.id }>{ country.name }</option>
                        ))
                    }
                </select>
                <div className={ styles["data-grid"] }>
                    <div className={ styles["grid-column"] }>
                        <div className={ `${ styles["statistics-container"] } ${ styles["geography-container"] }` }>
                            <div className={ `${ styles["title-container"] }` }>
                                <div className={ `${ styles["title-icon-border"] }` }>
                                    <em className={ `${ styles["title-icon"] } icon-geo-main` }></em>
                                </div>
                                <span className={ `${ styles["title-data-section"] }` }>GEOGRAPHY AND DEMOGRAPHICS</span>
                            </div>

                            <div className={ `${ styles["geography-row"] }` }>
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-area"] }` }>Land Area</p>
                                <em className={ `${ styles["indicator-icon"] } icon-area ${ styles["geography-icon-area"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-area"] }` }>512,120 km²</p>
            
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-lifeexpentancy"] }` }>Life expentancy</p>
                                <em className={ `${ styles["indicator-icon"] } icon-expec ${ styles["geography-icon-expec"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-expec"] }` }>78.2</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-expec"] }` }>(2022)</p>
                            </div>

                            <div className={ `${ styles["geography-row"] }` }>
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-pop-size"] }` }>Population size</p>
                                <em className={ `${ styles["indicator-icon"] } icon-pop ${ styles["geography-icon-pop-size"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-pop-size"] }` }>33.6 Million</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-pop-size"] }` }>(2022)</p>
            
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-pop-growth"] }` }>Population growth</p>
                                <em className={ `${ styles["indicator-icon"] } icon-gro ${ styles["geography-icon-pop-growth"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-pop-growth"] }` }>3.5 %</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-pop-growth"] }` }>(2022)</p>
                            </div>

                            <div className={ `${ styles["geography-row"] }` }>
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-rural-pop"] }` }>Rural population</p>
                                <em className={ `${ styles["indicator-icon"] } icon-rur ${ styles["geography-icon-rural-pop"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-rural-pop"] }` }>50.3 %</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-rural-pop"] }` }>(2022)</p>
            
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-pop-age"] }` }>Population age 65 and above</p>
                                <em className={ `${ styles["indicator-icon"] } icon-old ${ styles["geography-icon-pop-age"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-pop-age"] }` }>12.2 %</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-pop-age"] }` }>(2022)</p>
                            </div>

                            <div className={ `${ styles["geography-row"] }` }>
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-urban-pop"] }` }>Urban population</p>
                                <em className={ `${ styles["indicator-icon"] } icon-city ${ styles["geography-icon-urban-pop"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-urban-pop"] }` }>22.4 %</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-urban-pop"] }` }>(2022)</p>
            
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-pop-ages"] }` }>Population ages 0-14</p>
                                <em className={ `${ styles["indicator-icon"] } icon-kids ${ styles["geography-icon-pop-ages"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-pop-ages"] }` }>11.9 %</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-pop-ages"] }` }>(2022)</p>
                            </div>
                            <div className={ `${ styles["map-container"] }` }>
                                {/* <MapWithNoSSR country={ country } /> */}
                            </div>
                        </div>
                    </div>
                    <div className={ `${ styles["grid-column"] }` }>
                        <div className={ `${ styles["column-container"] }` }>
                            <div className={ `${ styles["statistics-container"] } ${ styles["gdp-container"] }` }>
                                <div className={ `${ styles["title-container"] }` }>
                                    <div className={ `${ styles["title-icon-border"] }` }>
                                        <em className={ `${ styles["title-icon"] } icon-gdp-main` }></em>
                                    </div>
                                    <h4 className={ `${ styles["title-data-section"] }` }>GDP AND ECONOMIC GROWTH</h4>
                                </div>
                                <div className={ `${ styles["gdp-row"] }` }>
                                    <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gdp"] }` }>GDP</p>
                                    <em className={ `${ styles["indicator-icon"] } icon-gdp-case ${ styles["gdp-icon-gdp"] }` }></em>
                                    <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gdp"] }` }>1.78 Billon</p>

                                    <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gdp-per-capita"] }` }>GDP Per Capita</p>
                                    <em className={ `${ styles["indicator-icon"] } icon-gdp-perc ${ styles["gdp-icon-gdp-per-capita"] }` }></em>
                                    <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gdp-per-capita"] }` }>$ 12,570.85</p>

                                    <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-growth-rate"] }` }>Growth rate</p>
                                    <em className={ `${ styles["indicator-icon"] } icon-gdp-grow ${ styles["gdp-icon-growth-rate"] }` }></em>
                                    <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gdp-growth-rate"] }` }>4.6 %</p>
                                </div>
                            </div>
                            <div className={ `${ styles["statistics-container"] } ${ styles["labor-container"] }` }>
                                <div className={ `${ styles["title-container"] }` }>
                                    <div className={ `${ styles["title-icon-border"] }` }>
                                        <em className={ `${ styles["title-icon"] } icon-labour-main` }></em>
                                    </div>
                                    <h4 className={ `${ styles["title-data-section"] }` }>LABOR FORCE AND UNEMPLOYMENT</h4>
                                </div>
                                <div className={ `${ styles["labor-columns-container"] }` }>
                                    <div className={ `${ styles["labor-column-one"] }` }>
                                        <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-unemployment-rate"] }` }>Unemployment rate</p>
                                        <div className={ `${ styles["labor-doll-container"] }` }>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                        </div>
                                        <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-unemployment-rate"] }` }>12.3 %</p>
                                        <div className={ `${ styles["genres-container"] }` }>
                                            <em className={ `${ styles["indicator-icon"] } icon-labour-wm" } ${ styles["labor-icon-wm"] }` }></em>
                                            <div className={ `${ styles["genres-wrapper"] }` }>
                                                <p>Males:</p>
                                                <p>4.1%</p>
                                            </div>
                                            <div className={ `${ styles["genres-wrapper"] }` }>
                                                <p>Females:</p>
                                                <p>8.2%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={ `${ styles["labor-column-two"] }` }>
                                        <div className={ `${ styles["labor-row"] }` }>
                                            <em className={ `${ styles["indicator-icon"] } icon-labour-force ${ styles["labor-icon-force"] }` }></em>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-labor-force"] }` }>Labor Force</p>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-labor-force"] }` }>143.1 million</p>
                                        </div>
                                        <div className={ `${ styles["labor-row"] }` }>
                                            <em className={ `${ styles["indicator-icon"] } icon-labour-part ${ styles["labor-icon-participation"] }` }></em>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-labor-participation"] }` }>Participation rate</p>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-labor-participation"] }` }>13.5%</p>
                                        </div>
                                        <div className={ `${ styles["labor-row"] }` }>
                                            <em className={ `${ styles["indicator-icon"] } icon-labour-women ${ styles["labor-icon-force-female"] }` }></em>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-labor-force-female"] }` }>Labor force female</p>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-labor-force-female"] }` }>12%</p>
                                        </div>
                                        <div className={ `${ styles["labor-row"] } ${ styles[""] }` }>
                                            <em className={ `${ styles["indicator-icon"] } icon-labour-yu ${ styles["labor-icon-youth"] }` }></em>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-labor-youth"] }` }>Youth unemployment</p>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-labor-youth"] }` }>23.9%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={ `${ styles["statistics-container"] } ${ styles["governance-container"] }` }>
                                <div className={ `${ styles["title-container"] }` }>
                                    <div className={ `${ styles["title-icon-border"] }` }>
                                        <em className={ `${ styles["title-icon"] } icon-gov-b-main` }></em>
                                    </div>
                                    <h4 className={ `${ styles["title-data-section"] }` }>GOVERNANCE AND BUSINESS ENVIRONMENT</h4>
                                </div>
                                <div className={ `${ styles["governance-columns-container"] }` }>
                                    <div className={ `${ styles["governance-column"] }` }>
                                        <div className={ `${ styles["governance-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gov-effectiveness"] }` }>Government effectiveness index</p>
                                            <p className={ `${ styles["indicator-values"] } ${ styles["indicator-values-gov-effectiveness"] }` }>(-2.5 weak; 2.5 strong)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-gov-b-ef ${ styles["gov-icon-gov-effectiveness"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-effectiveness"] }` }>0.4</p>
                                        </div>
                                        <div className={ `${ styles["governance-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gov-corruption"] }` }>Corruption perceptions index</p>
                                            <p className={ `${ styles["indicator-values"] } ${ styles["indicator-values-gov-corruption"] }` }>(100 = no corruption)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-gov-b-corr ${ styles["gov-icon-gov-corruption"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-corruption"] }` }>79</p>
                                        </div>
                                        <div className={ `${ styles["governance-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gov-regulatory"] }` }>Regulatory quality index</p>
                                            <p className={ `${ styles["indicator-values"] } ${ styles["indicator-values-gov-regulatory"] }` }>(-2.5 weak; 2.5 strong)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-gov-b-reg ${ styles["gov-icon-gov-regulatory"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-regulatory"] }` }>-1.1</p>
                                        </div>
                                    </div>
                                    <div className={ `${ styles["governance-column"] }` }>
                                        <div className={ `${ styles["governance-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gov-political"] }` }>Political stability index</p>
                                            <p className={ `${ styles["indicator-values"] } ${ styles["indicator-values-gov-political"] }` }>(-2.5 weak; 2.5 strong)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-gov-b-poli ${ styles["gov-icon-gov-political"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-political"] }` }>1.2</p>
                                        </div>
                                        <div className={ `${ styles["governance-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gov-rule"] }` }>Rule of law index</p>
                                            <p className={ `${ styles["indicator-values"] } ${ styles["indicator-values-gov-rule"] }` }>(-2.5 weak; 2.5 strong)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-gov-b-jud ${ styles["gov-icon-gov-rule"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-rule"] }` }>-1.1</p>
                                        </div>
                                        <div className={ `${ styles["governance-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gov-competitiveness"] }` }>Competitiveness index</p>
                                            <p className={ `${ styles["indicator-values"] } ${ styles["indicator-values-gov-competitiveness"] }` }>(World Economic Forum 0-100)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-gov-b-comp ${ styles["gov-icon-gov-competitiveness"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-competitiveness"] }` }>88</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={ `${ styles["grid-column"] }` }>
                        <div className={ `${ styles["statistics-container"] } ${ styles["trade-container"] }` }>
                            <div className={ `${ styles["title-container"] }` }>
                                <div className={ `${ styles["title-icon-border"] }` }>
                                    <em className={ `${ styles["title-icon"] } icon-trade-main` }></em>
                                </div>
                                <h4 className={ `${ styles["title-data-section"] }` }>INTERNATIONAL TRADE AND INVESTMENT</h4>
                            </div>
                            <div className={ `${ styles["trade-row"] }` }>
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-trade-fdi"] }` }>FDI<br /><span>as percentage of</span></p>
                                <em className={ `${ styles["indicator-icon"] } icon-trade-fdi ${ styles["trade-icon-fdi"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-trade-fdi"] }` }>45%</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-trade-fdi"] }` }>(2022)</p>
                                <em className={ `${ styles["indicator-icon"] } icon-trade-exp ${ styles["trade-icon-balance"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-trade-balance"] }` }>$169.71 Billion</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-trade-balance"] }` }>(2022)</p>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-trade-balance-left"] }` }>$56.57 Billion</p>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-trade-balance-right"] }` }>$113.14 Billion</p>
                            </div>
                        </div>
                        <div className={ `${ styles["government-inflation-container"] }` }>
                            <div className={ `${ styles["statistics-container"] } ${ styles["government"] }` }>
                                <div className={ `${ styles["title-container-column"] }` }>
                                    <div className={ `${ styles["title-icon-border"] }` }>
                                        <em className={ `${ styles["title-icon"] } icon-gov-m-main` }></em>
                                    </div>
                                    <h4 className={ `${ styles["title-data-section"] } ${ styles["short-section"] }` }>GOVERNMENT</h4>
                                </div>
                                <p>Government spending $4.5 billion, 45% of GDP</p>
                                <em className={ `${ styles["indicator-icon"] } icon-gov-m-bal ${ styles["gov-icon-bal"] }` }></em>
                                <p>Fiscal balance</p>
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gov-debt"] }` }>Govern debt</p>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-fiscal"] }` }>13.7%</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-gov-debt"] }` }>(2019)</p>
                                <em className={ `${ styles["indicator-icon"] } icon-gov-m-deb ${ styles["gov-icon-debt"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-debt"] }` }>16.99%<span>of GDP</span></p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-gov-debt"] }` }>(2019)</p>
                            </div>
                            <div className={ `${ styles["statistics-container"] } ${ styles["inflation-rate"] }` }>
                                <div className={ `${ styles["title-container-column"] }` }>
                                    <div className={ `${ styles["title-icon-border"] }` }>
                                        <em className={ `${ styles["title-icon"] } icon-infl-main` }></em>
                                    </div>
                                    <p>INFLATION AND COST OF LIVING</p>
                                    <h4 className={ `${ styles["title-data-section"] } ${ styles["short-section"] }` }>Inflation index</h4>
                                </div>
                                <em className={ `${ styles["indicator-icon"] } icon-infl-rate ${ styles["infl-icon-rate"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-infl-rate"] }` }>11.9%</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-infl-rate"] }` }>(2019)</p>
                                <p>Cost of living index, world average = 100</p>
                                <em className={ `${ styles["indicator-icon"] } icon-infl-cost ${ styles["infl-icon-cost"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-infl-cost"] }` }>86</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-infl-cost"] }` }>(2019)</p>
                            </div>
                        </div>
                        <div className={ `${ styles["statistics-container"] } ${ styles["household-container"] }` }>
                            <div className={ `${ styles["title-container"] }` }>
                                <div className={ `${ styles["title-icon-border"] }` }>
                                    <em className={ `${ styles["title-icon"] } icon-house-main` }></em>
                                </div>
                                <h4 className={ `${ styles["title-data-section"] }` }>HOUSEHOLD AND POVERTY STATUS</h4>
                            </div>
                            <div className={ `${ styles["household-columns-container"] }` }>
                                <div className={ `${ styles["household-column"] }` }>
                                    <div className={ `${ styles["household-row"] }` }>
                                        <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-household-cons"] }` }>Household consumption</p>
                                        <em className={ `${ styles["indicator-icon"] } icon-house-cons ${ styles["gov-icon-household-cons"] }` }></em>
                                        <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-household-cons"] }` }>0.02% of GDP</p>
                                        <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-household-cons"] }` }>(2019)</p>
                                    </div>
                                    <div className={ `${ styles["household-row"] }` }>
                                        <em className={ `${ styles["indicator-icon"] } icon-house-pie ${ styles["gov-icon-household-pie"] }` }></em>
                                        <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-household-pie-one"] }` }>3.4 billion USD</p>
                                        <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-household-pie-one"] }` }>(2019)</p>
                                        <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-household-pie-two"] }` }>0.36 Gini Index</p>
                                        <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-household-pie-two"] }` }>(2022)</p>
                                    </div>
                                    <div className={ `${ styles["household-row"] }` }>
                                        <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-household-human"] }` }>Human Development Index</p>
                                        <em className={ `${ styles["indicator-icon"] } icon-house-dev ${ styles["gov-icon-household-human"] }` }></em>
                                        <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-household-human"] }` }>0.913</p>
                                        <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-household-human"] }` }>(2022)</p>
                                    </div>
                                </div>
                                <div className={ `${ styles["household-column"] }` }>
                                    <div className={ `${ styles["household-row"] }` }>
                                        <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-household-poverty"] }` }>Poverty ratio</p>
                                        <div className={ `${ styles["household-doll-container"] }` }>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                            <em className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }></em>
                                        </div>
                                        <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-household-poverty"] }` }>12.1%</p>
                                    </div>
                                    <div className={ `${ styles["household-row"] }` }>
                                        <div className={ `${ styles["income-container"] }` }>
                                            <p>Poverty ratio</p>
                                            <p className={ `${ styles["indicator-result"] }` }>11.2%</p>
                                            <p>% of income earned by 10$ of earners</p>
                                            <p className={ `${ styles["indicator-result"] }` }>55.1%</p>
                                        </div>
                                    </div>
                                    <div className={ `${ styles["household-row"] }` }>
                                        <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-household-happiness"] }` }>Happiness index</p>
                                        <em className={ `${ styles["indicator-icon"] } icon-house-hap ${ styles["household-icon-household-happiness"] }` }></em>
                                        <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-household-happiness"] }` }>4.5</p>
                                        <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-household-happiness"] }` }>(2022)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={ `${ styles["grid-column"] }` }>
                        <div className={ `${ styles["column-container"] }` }>
                            <div className={ `${ styles["statistics-container"] } ${ styles["economic-container"] }` }>
                                <div className={ `${ styles["title-container"] }` }>
                                    <div className={ `${ styles["title-icon-border"] }` }>
                                        <em className={ `${ styles["title-icon"] } icon-forecast-main` }></em>
                                    </div>
                                    <h4 className={ `${ styles["title-data-section"] }` }>
                                        ECONOMIC FORECAST
                                        <span className={ `${ styles["subtitle-data-section"] }` }>(Based on IMF projections)</span>
                                    </h4>
                                </div>
                                <div className={ `${ styles["forecast-columns-container"] }` }>
                                    <div className={ `${ styles["forecast-column"] }` }>
                                        <div className={ `${ styles["forecast-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-forecast-growth"] }` }>Economic growth forecast</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-forecast-grow ${ styles["forecast-icon-forecast-growth"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-forecast-growth"] }` }>4.74</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-forecast-growth"] }` }>(2020)</p>
                                        </div>
                                        <div className={ `${ styles["forecast-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-forecast-inflation"] }` }>Inflation forecast</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-forecast-infl ${ styles["forecast-icon-forecast-inflation"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-forecast-inflation"] }` }>10.23</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-forecast-inflation"] }` }>(2020)</p>
                                        </div>
                                        <div className={ `${ styles["forecast-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-forecast-budget"] }` }>Budget balance forecast (% of GDP)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-forecast-bal ${ styles["forecast-icon-forecast-budget"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-forecast-budget"] }` }>1.47</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-forecast-budget"] }` }>(2020)</p>
                                        </div>
                                    </div>
                                    <div className={ `${ styles["forecast-column"] }` }>
                                        <div className={ `${ styles["forecast-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-forecast-investment"] }` }>Investment forecast</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-forecast-invest ${ styles["forecast-icon-forecast-investment"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-forecast-investment"] }` }>4.74</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-forecast-investment"] }` }>(2020)</p>
                                        </div>
                                        <div className={ `${ styles["forecast-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-forecast-unemployment"] }` }>Unemployment rate forecast</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-forecast-unem ${ styles["forecast-icon-forecast-unemployment"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-forecast-unemployment"] }` }>9.46</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-forecast-unemployment"] }` }>(2020)</p>
                                        </div>
                                        <div className={ `${ styles["forecast-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-forecast-current"] }` }>Current account balance forecast (% of GDP)</p>
                                            <em className={ `${ styles["indicator-icon icon-forecast-curr"] } ${ styles["forecast-icon-forecast-current"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-forecast-current"] }` }>2.71</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-forecast-current"] }` }>(2020)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={ `${ styles["statistics-container"] } ${ styles["connectivity-container"] }` }>
                                <div className={ `${ styles["title-container"] }` }>
                                    <div className={ `${ styles["title-icon-border"] }` }>
                                        <em className={ `${ styles["title-icon"] } icon-conn-main` }></em>
                                    </div>
                                    <h4 className={ `${ styles["title-data-section"] }` }>CONNECTIVITY WITH THE WORLD AND INNOVATION</h4>
                                </div>
                                <div className={ `${ styles["connectivity-columns-container"] }` }>
                                    <div className={ `${ styles["connectivity-column"] }` }>
                                        <div className={ `${ styles["connectivity-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-connectivity-trade"] }` }>Trade openness</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-conn-trade ${ styles["connectivity-icon-connectivity-trade"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-connectivity-trade"] }` }>-8.5%</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-connectivity-trade"] }` }>(2020)</p>
                                        </div>
                                        <div className={ `${ styles["connectivity-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-connectivity-patent"] }` }>Patent applications by residents</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-conn-patent ${ styles["connectivity-icon-connectivity-patent"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-connectivity-patent"] }` }>235</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-connectivity-patent"] }` }>(2020)</p>
                                        </div>
                                        <div className={ `${ styles["connectivity-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-connectivity-rd"] }` }>R&D expenditure</p>
                                            <p className={ `${ styles["indicator-subtitle-rd"] }` }>(as % of GDP)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-conn-rd ${ styles["connectivity-icon-connectivity-rd"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-connectivity-rd"] }` }>0.22%</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-connectivity-rd"] }` }>(2020)</p>
                                        </div>
                                    </div>
                                    <div className={ `${ styles["connectivity-column"] }` }>
                                        <div className={ `${ styles["connectivity-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-connectivity-globalization"] }` }>Globalization</p>
                                            <p className={ `${ styles["indicator-subtitle-globalization"] }` }>(index from the KOF institute)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-conn-glob ${ styles["connectivity-icon-connectivity-globalization"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-connectivity-globalization"] }` }>0.913</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-connectivity-globalization"] }` }>(2020)</p>
                                        </div>
                                        <div className={ `${ styles["connectivity-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-connectivity-innovation"] }` }>Innovation</p>
                                            <p className={ `${ styles["indicator-subtitle-innovation"] }` }>(Global innovation index)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-conn-inno ${ styles["connectivity-icon-connectivity-innovation"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-connectivity-innovation"] }` }>67</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-connectivity-innovation"] }` }>(2020)</p>
                                        </div>
                                        <div className={ `${ styles["connectivity-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-connectivity-hightech"] }` }>High tech exports,</p>
                                            <p className={ `${ styles["indicator-subtitle-hightech"] }` }>percent of manufactured exports</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-conn-tech ${ styles["connectivity-icon-connectivity-hightech"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-connectivity-hightech"] }` }>13%</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-connectivity-hightech"] }` }>(2020)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </CountrySnapshotLayout>
    )
}

export default CountrySnapshot
