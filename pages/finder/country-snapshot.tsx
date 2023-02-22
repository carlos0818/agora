import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import { CountrySnapshotLayout } from '@/components/layouts'
const MapWithNoSSR = dynamic(() => import('../../components/Map'), {ssr: false });

import countriesList from '../../db/countries'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { snapshot } from '@/redux/slices/country'
import { agoraApi } from '@/api'

import styles from './country-snapshot.module.css'
import { ICountry } from '@/interfaces';
import commaSeparateNumber from '@/utils/formatNumber';
import { useAnimateIndicators } from '@/hooks';

const CountrySnapshot = () => {
    const { countries } = countriesList

    const dispatch = useAppDispatch()
    const indicators = useAppSelector((state) => state.countryReducer)

    const {
        landArea,
        lifeExpectancy,
        populationSize,
        populationGrowth,
        ruralPoulation,
        populationAge,
        urbanPopulation,
        populationAges,
        gdp,
        gdpPerCapita,
        growthRate,
        unemploymentRate,
        males,
        females,
        laborForce,
        participationRate,
        laborForceFemale,
        youthUnemployment,
        govEffectiveness,
        govCorruption,
        govRegulatory,
        politicalStability,
        ruleLaw,
        govCompetitiveness,
        tradeFdi,
        tradeBalance,
        tradeBalanceLeft,
        tradeBalanceRight,
        govFiscal,
        govDebt,
        inflationIndex,
        costLiving,
        householdConsumption,
        householdPieOne,
        giniIndex,
        householdHuman,
        povertyRatio,
        povertyRatio2,
        income,
        happiness,
        forecastGrowth,
        forecastInflation,
        BudgetBalance,
        investmentForecast,
        forecastUnemployment,
        forecastCurrent,
        tradeOpenness,
        connectivityPatent,
        rd,
        globalization,
        innovation,
        hightech,
    } = useAnimateIndicators(indicators)
    
    const [country, setCountry] = useState('')
    const [flag, setFlag] = useState<string | null>(null)
    
    const [dolls, setDolls] = useState([
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
        21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
        41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,
        61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
        81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100
    ])
    
    const handleData = async(value: string) => {
        if (value !== '') {
            const { data } = await agoraApi.get<ICountry[]>(`/country/${ value }`);
            dispatch(snapshot(data))
            setCountry(value)
        }
    }

    return (
        <CountrySnapshotLayout>
            <>
                <div className={ styles["country-container"] }>
                    <select
                        className={ styles["select"] }
                        defaultValue="0"
                        onChange={ (ev) => handleData(ev.target.value) }
                    >
                        {
                            countries.map(country => (
                                <option key={ country.alpha3 } value={ country.alpha3 }>{ country.name }</option>
                            ))
                        }
                    </select>
                    {
                        flag && (<img className={ styles["flag"] } src={ flag } />)
                    }
                </div>
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
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-area"] }` }>{ landArea }</p>
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-lifeexpentancy"] }` }>Life expectancy</p>
                                <em className={ `${ styles["indicator-icon"] } icon-expec ${ styles["geography-icon-expec"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-expec"] }` }>{ lifeExpectancy }</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-expec"] }` }>
                                    {
                                        indicators.length === 0 ? "(0)" :
                                        indicators.map(ind => ind.indicatorId === 26 ? `(${ ind.indicatorYear })` : null)
                                    }
                                </p>
                            </div>

                            <div className={ `${ styles["geography-row"] }` }>
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-pop-size"] }` }>Population size</p>
                                <em className={ `${ styles["indicator-icon"] } icon-pop ${ styles["geography-icon-pop-size"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-pop-size"] }` }>{ populationSize }</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-pop-size"] }` }>
                                    {
                                        indicators.length === 0 ? "(0)" :
                                        indicators.map(ind => ind.indicatorId === 25 ? `(${ ind.indicatorYear })` : null)
                                    }
                                </p>
            
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-pop-growth"] }` }>Population growth</p>
                                <em className={ `${ styles["indicator-icon"] } icon-gro ${ styles["geography-icon-pop-growth"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-pop-growth"] }` }>{ populationGrowth }</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-pop-growth"] }` }>
                                    {
                                        indicators.length === 0 ? "(0)" :
                                        indicators.map(ind => ind.indicatorId === 726 ? `(${ ind.indicatorYear })` : null)
                                    }
                                </p>
                            </div>

                            <div className={ `${ styles["geography-row"] }` }>
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-rural-pop"] }` }>Rural population</p>
                                <em className={ `${ styles["indicator-icon"] } icon-rur ${ styles["geography-icon-rural-pop"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-rural-pop"] }` }>{ ruralPoulation }</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-rural-pop"] }` }>
                                    {
                                        indicators.length === 0 ? "(0)" :
                                        indicators.map(ind => ind.indicatorId === 375 ? `(${ ind.indicatorYear })` : null)
                                    }
                                </p>
            
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-pop-age"] }` }>Population age 65 and above</p>
                                <em className={ `${ styles["indicator-icon"] } icon-old ${ styles["geography-icon-pop-age"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-pop-age"] }` }>{ populationAge }</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-pop-age"] }` }>
                                    {
                                        indicators.length === 0 ? "(0)" :
                                        indicators.map(ind => ind.indicatorId === 381 ? `(${ ind.indicatorYear })` : null)
                                    }
                                </p>
                            </div>

                            <div className={ `${ styles["geography-row"] }` }>
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-urban-pop"] }` }>Urban population</p>
                                <em className={ `${ styles["indicator-icon"] } icon-city ${ styles["geography-icon-urban-pop"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-urban-pop"] }` }>{ urbanPopulation }</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-urban-pop"] }` }>
                                    {
                                        indicators.length === 0 ? "(0)" :
                                        indicators.map(ind => ind.indicatorId === 40 ? `(${ ind.indicatorYear })` : null)
                                    }
                                </p>
            
                                <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-pop-ages"] }` }>Population ages 0-14</p>
                                <em className={ `${ styles["indicator-icon"] } icon-kids ${ styles["geography-icon-pop-ages"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-pop-ages"] }` }>{ populationAges }</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-pop-ages"] }` }>
                                    {
                                        indicators.length === 0 ? "(0)" :
                                        indicators.map(ind => ind.indicatorId === 380 ? `(${ ind.indicatorYear })` : null)
                                    }
                                </p>
                            </div>
                            <div className={ `${ styles["map-container"] }` }>
                                <MapWithNoSSR country={ country } setFlag={ setFlag } />
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
                                    <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gdp"] }` }>{ gdp }</p>

                                    <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gdp-per-capita"] }` }>GDP Per Capita</p>
                                    <em className={ `${ styles["indicator-icon"] } icon-gdp-perc ${ styles["gdp-icon-gdp-per-capita"] }` }></em>
                                    <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gdp-per-capita"] }` }>{ gdpPerCapita }</p>

                                    <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-growth-rate"] }` }>Growth rate</p>
                                    <em className={ `${ styles["indicator-icon"] } icon-gdp-grow ${ styles["gdp-icon-growth-rate"] }` }></em>
                                    <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gdp-growth-rate"] }` }>{ growthRate }</p>
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
                                            {
                                                dolls.map((doll, idx) => {
                                                    const indicator = indicators.find(ind => ind.indicatorId === 10)
                                                    if (indicator?.indicatorValue! > idx) {
                                                        return (
                                                            <em
                                                                key={ doll }
                                                                className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }
                                                            ></em>
                                                        )
                                                    } else {
                                                        return (
                                                            <em
                                                                key={ doll }
                                                                className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }
                                                            ></em>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-unemployment-rate"] }` }>{ unemploymentRate }</p>
                                        <div className={ `${ styles["genres-container"] }` }>
                                            <em className={ `${ styles["indicator-icon"] } icon-labour-wm ${ styles["labor-icon-wm"] }` }></em>
                                            <div className={ `${ styles["genres-wrapper"] }` }>
                                                <p>Males:</p>
                                                <p>{ males }</p>
                                            </div>
                                            <div className={ `${ styles["genres-wrapper"] }` }>
                                                <p>Females:</p>
                                                <p>{ females }</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={ `${ styles["labor-column-two"] }` }>
                                        <div className={ `${ styles["labor-row"] }` }>
                                            <em className={ `${ styles["indicator-icon"] } icon-labour-force ${ styles["labor-icon-force"] }` }></em>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-labor-force"] }` }>Labor Force</p>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-labor-force"] }` }>{ laborForce }</p>
                                        </div>
                                        <div className={ `${ styles["labor-row"] }` }>
                                            <em className={ `${ styles["indicator-icon"] } icon-labour-part ${ styles["labor-icon-participation"] }` }></em>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-labor-participation"] }` }>Participation rate</p>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-labor-participation"] }` }>{ participationRate }</p>
                                        </div>
                                        <div className={ `${ styles["labor-row"] }` }>
                                            <em className={ `${ styles["indicator-icon"] } icon-labour-women ${ styles["labor-icon-force-female"] }` }></em>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-labor-force-female"] }` }>Labor force female</p>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-labor-force-female"] }` }>{ laborForceFemale }</p>
                                        </div>
                                        <div className={ `${ styles["labor-row"] } ${ styles[""] }` }>
                                            <em className={ `${ styles["indicator-icon"] } icon-labour-yu ${ styles["labor-icon-youth"] }` }></em>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-labor-youth"] }` }>Youth unemployment</p>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-labor-youth"] }` }>{ youthUnemployment }</p>
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
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-effectiveness"] }` }>{ govEffectiveness }</p>
                                        </div>
                                        <div className={ `${ styles["governance-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gov-corruption"] }` }>Corruption perceptions index</p>
                                            <p className={ `${ styles["indicator-values"] } ${ styles["indicator-values-gov-corruption"] }` }>(100 = no corruption)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-gov-b-corr ${ styles["gov-icon-gov-corruption"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-corruption"] }` }>{ govCorruption }</p>
                                        </div>
                                        <div className={ `${ styles["governance-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gov-regulatory"] }` }>Regulatory quality index</p>
                                            <p className={ `${ styles["indicator-values"] } ${ styles["indicator-values-gov-regulatory"] }` }>(-2.5 weak; 2.5 strong)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-gov-b-reg ${ styles["gov-icon-gov-regulatory"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-regulatory"] }` }>{ govRegulatory }</p>
                                        </div>
                                    </div>
                                    <div className={ `${ styles["governance-column"] }` }>
                                        <div className={ `${ styles["governance-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gov-political"] }` }>Political stability index</p>
                                            <p className={ `${ styles["indicator-values"] } ${ styles["indicator-values-gov-political"] }` }>(-2.5 weak; 2.5 strong)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-gov-b-poli ${ styles["gov-icon-gov-political"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-political"] }` }>{ politicalStability }</p>
                                        </div>
                                        <div className={ `${ styles["governance-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gov-rule"] }` }>Rule of law index</p>
                                            <p className={ `${ styles["indicator-values"] } ${ styles["indicator-values-gov-rule"] }` }>(-2.5 weak; 2.5 strong)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-gov-b-jud ${ styles["gov-icon-gov-rule"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-rule"] }` }>{ ruleLaw }</p>
                                        </div>
                                        <div className={ `${ styles["governance-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-gov-competitiveness"] }` }>Competitiveness index</p>
                                            <p className={ `${ styles["indicator-values"] } ${ styles["indicator-values-gov-competitiveness"] }` }>(World Economic Forum 0-100)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-gov-b-comp ${ styles["gov-icon-gov-competitiveness"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-competitiveness"] }` }>{ govCompetitiveness }</p>
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
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-trade-fdi"] }` }>{ tradeFdi }</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-trade-fdi"] }` }>
                                    {
                                        indicators.length === 0 ? "0" :
                                        indicators.map(ind => ind.indicatorId === 22 ? `(${ ind.indicatorYear })` : null)
                                    }
                                </p>
                                <em className={ `${ styles["indicator-icon"] } icon-trade-exp ${ styles["trade-icon-balance"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-trade-balance"] }` }>{ tradeBalance }</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-trade-balance"] }` }>
                                    {
                                        indicators.length === 0 ? "0" :
                                        indicators.map(ind => ind.indicatorId === 239 ? `(${ ind.indicatorYear })` : null)
                                    }
                                </p>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-trade-balance-left"] }` }>{ tradeBalanceLeft }</p>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-trade-balance-right"] }` }>{ tradeBalanceRight }</p>
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
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-fiscal"] }` }>{ govFiscal }</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-gov-fiscal"] }` }>
                                    {
                                        indicators.length === 0 ? "0" :
                                        indicators.map(ind => ind.indicatorId === 838 ? `(${ ind.indicatorYear })` : null)
                                    }
                                </p>
                                <em className={ `${ styles["indicator-icon"] } icon-gov-m-deb ${ styles["gov-icon-debt"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-gov-debt"] }` }>{ govDebt }<span>of GDP</span></p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-gov-debt"] }` }>
                                    {
                                        indicators.length === 0 ? "0" :
                                        indicators.map(ind => ind.indicatorId === 9 ? `(${ ind.indicatorYear })` : null)
                                    }
                                </p>
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
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-infl-rate"] }` }>{ inflationIndex }</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-infl-rate"] }` }>(2019)</p>
                                <p>Cost of living index, world average = 100</p>
                                <em className={ `${ styles["indicator-icon"] } icon-infl-cost ${ styles["infl-icon-cost"] }` }></em>
                                <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-infl-cost"] }` }>{ costLiving }</p>
                                <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-infl-cost"] }` }>
                                    {
                                        indicators.length === 0 ? "0" :
                                        indicators.map(ind => ind.indicatorId === 967 ? `(${ ind.indicatorYear })` : null)
                                    }
                                </p>
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
                                        <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-household-cons"] }` }>{ householdConsumption }</p>
                                        <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-household-cons"] }` }>
                                            {
                                                indicators.length === 0 ? "0" :
                                                indicators.map(ind => ind.indicatorId === 184 ? `(${ ind.indicatorYear })` : null)
                                            }
                                        </p>
                                    </div>
                                    <div className={ `${ styles["household-row"] }` }>
                                        <em className={ `${ styles["indicator-icon"] } icon-house-pie ${ styles["gov-icon-household-pie"] }` }></em>
                                        <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-household-pie-one"] }` }>{ householdPieOne }</p>
                                        <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-household-pie-one"] }` }>
                                            {
                                                indicators.length === 0 ? "0" :
                                                indicators.map(ind => ind.indicatorId === 241 ? `(${ ind.indicatorYear })` : null)
                                            }
                                        </p>
                                        <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-household-pie-two"] }` }>{ giniIndex }</p>
                                        <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-household-pie-two"] }` }>
                                            {
                                                indicators.length === 0 ? "0" :
                                                indicators.map(ind => ind.indicatorId === 669 ? `(${ ind.indicatorYear })` : null)
                                            }
                                        </p>
                                    </div>
                                    <div className={ `${ styles["household-row"] }` }>
                                        <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-household-human"] }` }>Human Development Index</p>
                                        <em className={ `${ styles["indicator-icon"] } icon-house-dev ${ styles["gov-icon-household-human"] }` }></em>
                                        <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-household-human"] }` }>{ householdHuman }</p>
                                        <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-household-human"] }` }>
                                            {
                                                indicators.length === 0 ? "0" :
                                                indicators.map(ind => ind.indicatorId === 104 ? `(${ ind.indicatorYear })` : null)
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className={ `${ styles["household-column"] }` }>
                                    <div className={ `${ styles["household-row"] }` }>
                                        <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-household-poverty"] }` }>Poverty ratio</p>
                                        <div className={ `${ styles["household-doll-container"] }` }>
                                            {
                                                dolls.map((doll, idx) => {
                                                    const indicator = indicators.find(ind => ind.indicatorId === 674)
                                                    if (indicator?.indicatorValue! > idx) {
                                                        return (
                                                            <em
                                                                key={ doll }
                                                                className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] } ${ styles["painted"] }` }
                                                            ></em>
                                                        )
                                                    } else {
                                                        return (
                                                            <em
                                                                key={ doll }
                                                                className={ `${ styles["indicator-icon"] } icon-man ${ styles["man-icon-rate"] }` }
                                                            ></em>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-household-poverty"] }` }>{ povertyRatio }</p>
                                    </div>
                                    <div className={ `${ styles["household-row"] }` }>
                                        <div className={ `${ styles["income-container"] }` }>
                                            <p>Poverty ratio</p>
                                            <p className={ `${ styles["indicator-result"] }` }>{ povertyRatio2 }</p>
                                            <p>% of income earned by 10$ of earners</p>
                                            <p className={ `${ styles["indicator-result"] }` }>{ income }</p>
                                        </div>
                                    </div>
                                    <div className={ `${ styles["household-row"] }` }>
                                        <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-household-happiness"] }` }>Happiness index</p>
                                        <em className={ `${ styles["indicator-icon"] } icon-house-hap ${ styles["household-icon-household-happiness"] }` }></em>
                                        <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-household-happiness"] }` }>{ happiness }</p>
                                        <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-household-happiness"] }` }>
                                            {
                                                indicators.length === 0 ? "0" :
                                                indicators.map(ind => ind.indicatorId === 361 ? `(${ ind.indicatorYear })` : null)
                                            }
                                        </p>
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
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-forecast-growth"] }` }>{ forecastGrowth }</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-forecast-growth"] }` }>
                                                {
                                                    indicators.length === 0 ? "0" :
                                                    indicators.map(ind => ind.indicatorId === 474 ? `(${ ind.indicatorYear })` : null)
                                                }
                                            </p>
                                        </div>
                                        <div className={ `${ styles["forecast-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-forecast-inflation"] }` }>Inflation forecast</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-forecast-infl ${ styles["forecast-icon-forecast-inflation"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-forecast-inflation"] }` }>{ forecastInflation }</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-forecast-inflation"] }` }>
                                                {
                                                    indicators.length === 0 ? "0" :
                                                    indicators.map(ind => ind.indicatorId === 475 ? `(${ ind.indicatorYear })` : null)
                                                }
                                            </p>
                                        </div>
                                        <div className={ `${ styles["forecast-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-forecast-budget"] }` }>Budget balance forecast (% of GDP)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-forecast-bal ${ styles["forecast-icon-forecast-budget"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-forecast-budget"] }` }>{ BudgetBalance }</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-forecast-budget"] }` }>
                                                {
                                                    indicators.length === 0 ? "0" :
                                                    indicators.map(ind => ind.indicatorId === 478 ? `(${ ind.indicatorYear })` : null)
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className={ `${ styles["forecast-column"] }` }>
                                        <div className={ `${ styles["forecast-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-forecast-investment"] }` }>Investment forecast</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-forecast-invest ${ styles["forecast-icon-forecast-investment"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-forecast-investment"] }` }>{ investmentForecast }</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-forecast-investment"] }` }>
                                                {
                                                    indicators.length === 0 ? "0" :
                                                    indicators.map(ind => ind.indicatorId === 476 ? `(${ ind.indicatorYear })` : null)
                                                }
                                            </p>
                                        </div>
                                        <div className={ `${ styles["forecast-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-forecast-unemployment"] }` }>Unemployment rate forecast</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-forecast-unem ${ styles["forecast-icon-forecast-unemployment"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-forecast-unemployment"] }` }>{ forecastUnemployment }</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-forecast-unemployment"] }` }>
                                                {
                                                    indicators.length === 0 ? "0" :
                                                    indicators.map(ind => ind.indicatorId === 477 ? `(${ ind.indicatorYear })` : null)
                                                }
                                            </p>
                                        </div>
                                        <div className={ `${ styles["forecast-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-forecast-current"] }` }>Current account balance forecast (% of GDP)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-forecast-curr ${ styles["forecast-icon-forecast-current"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-forecast-current"] }` }>{ forecastCurrent }</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-forecast-current"] }` }>
                                                {
                                                    indicators.length === 0 ? "0" :
                                                    indicators.map(ind => ind.indicatorId === 479 ? `(${ ind.indicatorYear })` : null)
                                                }
                                            </p>
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
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-connectivity-trade"] }` }>{ tradeOpenness }</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-connectivity-trade"] }` }>
                                                {
                                                    indicators.length === 0 ? "0" :
                                                    indicators.map(ind => ind.indicatorId === 359 ? `(${ ind.indicatorYear })` : null)
                                                }
                                            </p>
                                        </div>
                                        <div className={ `${ styles["connectivity-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-connectivity-patent"] }` }>Patent applications by residents</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-conn-patent ${ styles["connectivity-icon-connectivity-patent"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-connectivity-patent"] }` }>{ connectivityPatent }</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-connectivity-patent"] }` }>
                                                {
                                                    indicators.length === 0 ? "0" :
                                                    indicators.map(ind => ind.indicatorId === 127 ? `(${ ind.indicatorYear })` : null)
                                                }
                                            </p>
                                        </div>
                                        <div className={ `${ styles["connectivity-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-connectivity-rd"] }` }>R&D expenditure</p>
                                            <p className={ `${ styles["indicator-subtitle-rd"] }` }>(as % of GDP)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-conn-rd ${ styles["connectivity-icon-connectivity-rd"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-connectivity-rd"] }` }>{ rd }</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-connectivity-rd"] }` }>
                                                {
                                                    indicators.length === 0 ? "0" :
                                                    indicators.map(ind => ind.indicatorId === 128 ? `(${ ind.indicatorYear })` : null)
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className={ `${ styles["connectivity-column"] }` }>
                                        <div className={ `${ styles["connectivity-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-connectivity-globalization"] }` }>Globalization</p>
                                            <p className={ `${ styles["indicator-subtitle-globalization"] }` }>(index from the KOF institute)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-conn-glob ${ styles["connectivity-icon-connectivity-globalization"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-connectivity-globalization"] }` }>{ globalization }</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-connectivity-globalization"] }` }>
                                                {
                                                    indicators.length === 0 ? "0" :
                                                    indicators.map(ind => ind.indicatorId === 93 ? `(${ ind.indicatorYear })` : null)
                                                }
                                            </p>
                                        </div>
                                        <div className={ `${ styles["connectivity-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-connectivity-innovation"] }` }>Innovation</p>
                                            <p className={ `${ styles["indicator-subtitle-innovation"] }` }>(Global innovation index)</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-conn-inno ${ styles["connectivity-icon-connectivity-innovation"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-connectivity-innovation"] }` }>{ innovation }</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-connectivity-innovation"] }` }>
                                                {
                                                    indicators.length === 0 ? "0" :
                                                    indicators.map(ind => ind.indicatorId === 118 ? `(${ ind.indicatorYear })` : null)
                                                }
                                            </p>
                                        </div>
                                        <div className={ `${ styles["connectivity-row"] }` }>
                                            <p className={ `${ styles["indicator-title"] } ${ styles["indicator-title-connectivity-hightech"] }` }>High tech exports,</p>
                                            <p className={ `${ styles["indicator-subtitle-hightech"] }` }>percent of manufactured exports</p>
                                            <em className={ `${ styles["indicator-icon"] } icon-conn-tech ${ styles["connectivity-icon-connectivity-hightech"] }` }></em>
                                            <p className={ `${ styles["indicator-result"] } ${ styles["indicator-result-connectivity-hightech"] }` }>{ hightech }</p>
                                            <p className={ `${ styles["indicator-year"] } ${ styles["indicator-year-connectivity-hightech"] }` }>
                                                {
                                                    indicators.length === 0 ? "0" :
                                                    indicators.map(ind => ind.indicatorId === 125 ? `(${ ind.indicatorYear })` : null)
                                                }
                                            </p>
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
