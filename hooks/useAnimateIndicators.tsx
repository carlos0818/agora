import { useEffect, useState } from 'react'

import { animateNumber, commaSeparateNumber } from '@/utils'
import { ICountry } from '@/interfaces'

export const useAnimateIndicators = (indicators: ICountry[]) => {
    const [landArea, setLandArea] = useState('0')
    const [lifeExpectancy, setLifeExpectancy] = useState('0')
    const [populationSize, setPopulationSize] = useState('0')
    const [populationGrowth, setPopulationGrowth] = useState('0')
    const [ruralPoulation, setRuralPoulation] = useState('0')
    const [populationAge, setPopulationAge] = useState('0')
    const [urbanPopulation, setUrbanPopulation] = useState('0')
    const [populationAges, setPopulationAges] = useState('0')
    const [gdp, setGdp] = useState('0')
    const [gdpPerCapita, setGdpPerCapita] = useState('0')
    const [growthRate, setGrowthRate] = useState('0')
    const [unemploymentRate, setUnemploymentRate] = useState('0')
    const [males, setMales] = useState('0')
    const [females, setFemales] = useState('0')
    const [laborForce, setLaborForce] = useState('0')
    const [participationRate, setParticipationRate] = useState('0')
    const [laborForceFemale, setLaborForceFemale] = useState('0')
    const [youthUnemployment, setYouthUnemployment] = useState('0')
    const [govEffectiveness, setGovEffectiveness] = useState('0')
    const [govCorruption, setGovCorruption] = useState('0')
    const [govRegulatory, setGovRegulatory] = useState('0')
    const [politicalStability, setPoliticalStability] = useState('0')
    const [ruleLaw, setRuleLaw] = useState('0')
    const [govCompetitiveness, setGovCompetitiveness] = useState('0')
    const [tradeFdi, setTradeFdi] = useState('0')
    const [tradeBalance, setTradeBalance] = useState('0')
    const [tradeBalanceLeft, setTradeBalanceLeft] = useState('0')
    const [tradeBalanceRight, setTradeBalanceRight] = useState('0')
    const [govFiscal, setGovFiscal] = useState('0')
    const [govDebt, setGovDebt] = useState('0')
    const [inflationIndex, setInflationIndex] = useState('0')
    const [costLiving, setCostLiving] = useState('0')
    const [householdConsumption, setHouseholdConsumption] = useState('0')
    const [householdPieOne, setHouseholdPieOne] = useState('0')
    const [giniIndex, setGiniIndex] = useState('0')
    const [householdHuman, setHouseholdHuman] = useState('0')
    const [povertyRatio, setPovertyRatio] = useState('0')
    const [povertyRatio2, setPovertyRatio2] = useState('0')
    const [income, setIncome] = useState('0')
    const [happiness, setHappiness] = useState('0')
    const [forecastGrowth, setForecastGrowth] = useState('0')
    const [forecastInflation, setForecastInflation] = useState('0')
    const [BudgetBalance, setBudgetBalance] = useState('0')
    const [investmentForecast, setInvestmentForecast] = useState('0')
    const [forecastUnemployment, setForecastUnemployment] = useState('0')
    const [forecastCurrent, setForecastCurrent] = useState('0')
    const [tradeOpenness, setTradeOpenness] = useState('0')
    const [connectivityPatent, setConnectivityPatent] = useState('0')
    const [rd, setRd] = useState('0')
    const [globalization, setGlobalization] = useState('0')
    const [innovation, setInnovation] = useState('0')
    const [hightech, setHightech] = useState('0')

    const animateIndicators = () => {
        if (indicators.length > 0) {
            const ind378 = indicators.find(ind => ind.indicatorId === 378)
            if (ind378?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setLandArea(`${ animateNumber(commaSeparateNumber(Math.floor(ind378.indicatorValue))) } km²`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setLandArea(`${ commaSeparateNumber(Math.floor(ind378.indicatorValue)) } km²`)
                    }
                    cont ++
                }, 20)
            } else {
                setLandArea('0')
            }

            const ind26 = indicators.find(ind => ind.indicatorId === 26)
            if (ind26?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setLifeExpectancy(`${ animateNumber(ind26.indicatorValue) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setLifeExpectancy(`${ commaSeparateNumber(ind26.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setLifeExpectancy('0')
            }

            const ind25 = indicators.find(ind => ind.indicatorId === 25)
            if (ind25?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setPopulationSize(`${ animateNumber(ind25.indicatorValue) } Million`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setPopulationSize(`${ commaSeparateNumber(ind25.indicatorValue) } Million`)
                    }
                    cont ++
                }, 20)
            } else {
                setPopulationSize('0')
            }

            const ind726 = indicators.find(ind => ind.indicatorId === 726)
            if (ind726?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setPopulationGrowth(`${ animateNumber(ind726.indicatorValue) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setPopulationGrowth(`${ commaSeparateNumber(ind726.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setPopulationGrowth('0')
            }

            const ind375 = indicators.find(ind => ind.indicatorId === 375)
            if (ind375?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setRuralPoulation(`${ animateNumber(ind375.indicatorValue) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setRuralPoulation(`${ commaSeparateNumber(ind375.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setRuralPoulation('0')
            }

            const ind381 = indicators.find(ind => ind.indicatorId === 381)
            if (ind381?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setPopulationAge(`${ animateNumber(ind381.indicatorValue) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setPopulationAge(`${ commaSeparateNumber(ind381.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setPopulationAge('0')
            }

            const ind40 = indicators.find(ind => ind.indicatorId === 40)
            if (ind40?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setUrbanPopulation(`${ animateNumber(ind40.indicatorValue) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setUrbanPopulation(`${ commaSeparateNumber(ind40.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setUrbanPopulation('0')
            }

            const ind380 = indicators.find(ind => ind.indicatorId === 380)
            if (ind380?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setPopulationAges(`${ animateNumber(ind380.indicatorValue) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setPopulationAges(`${ commaSeparateNumber(ind380.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setPopulationAges('0')
            }

            const ind6 = indicators.find(ind => ind.indicatorId === 6)
            if (ind6?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setGdp(`${ animateNumber(ind6.indicatorValue) } Billion`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setGdp(`${ commaSeparateNumber(ind6.indicatorValue) } Billion`)
                    }
                    cont ++
                }, 20)
            } else {
                setGdp('0')
            }

            const ind338 = indicators.find(ind => ind.indicatorId === 338)
            if (ind338?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setGdpPerCapita(`$${ animateNumber(ind338.indicatorValue) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setGdpPerCapita(`$${ commaSeparateNumber(ind338.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setGdpPerCapita('0')
            }

            const ind2 = indicators.find(ind => ind.indicatorId === 2)
            if (ind2?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setGrowthRate(`${ animateNumber(ind2.indicatorValue) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setGrowthRate(`${ commaSeparateNumber(ind2.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setGrowthRate('0')
            }

            const ind10 = indicators.find(ind => ind.indicatorId === 10)
            if (ind10?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setUnemploymentRate(`${ animateNumber(ind10.indicatorValue) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setUnemploymentRate(`${ commaSeparateNumber(ind10.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setUnemploymentRate('0')
            }

            const ind76 = indicators.find(ind => ind.indicatorId === 76)
            if (ind76?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setMales(`${ animateNumber(ind76.indicatorValue) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setMales(`${ commaSeparateNumber(ind76.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setMales('0')
            }

            const ind75 = indicators.find(ind => ind.indicatorId === 75)
            if (ind75?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setFemales(`${ animateNumber(ind75.indicatorValue) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setFemales(`${ commaSeparateNumber(ind75.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setFemales('0')
            }

            const ind362 = indicators.find(ind => ind.indicatorId === 362)
            if (ind362?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setLaborForce(`${ animateNumber(ind362.indicatorValue) } million`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setLaborForce(`${ commaSeparateNumber(ind362.indicatorValue) } million`)
                    }
                    cont ++
                }, 20)
            } else {
                setLaborForce('0')
            }

            const ind43 = indicators.find(ind => ind.indicatorId === 43)
            if (ind43?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setParticipationRate(`${ animateNumber(ind43.indicatorValue) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setParticipationRate(`${ commaSeparateNumber(ind43.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setParticipationRate('0')
            }

            const ind77 = indicators.find(ind => ind.indicatorId === 77)
            if (ind77?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setLaborForceFemale(`${ animateNumber(ind77.indicatorValue) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setLaborForceFemale(`${ commaSeparateNumber(ind77.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setLaborForceFemale('0')
            }

            const ind36 = indicators.find(ind => ind.indicatorId === 36)
            if (ind36?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setYouthUnemployment(`${ animateNumber(ind36.indicatorValue) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setYouthUnemployment(`${ commaSeparateNumber(ind36.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setYouthUnemployment('0')
            }

            const ind482 = indicators.find(ind => ind.indicatorId === 482)
            if (ind482?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setGovEffectiveness(`${ animateNumber(ind482.indicatorValue) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setGovEffectiveness(`${ commaSeparateNumber(ind482.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setGovEffectiveness('0')
            }

            const ind108 = indicators.find(ind => ind.indicatorId === 108)
            if (ind108?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setGovCorruption(`${ animateNumber(commaSeparateNumber(Math.floor(ind108.indicatorValue))) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setGovCorruption(`${ commaSeparateNumber(Math.floor(ind108.indicatorValue)) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setGovCorruption('0')
            }

            const ind86 = indicators.find(ind => ind.indicatorId === 86)
            if (ind86?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setGovRegulatory(`${ animateNumber(commaSeparateNumber(ind86.indicatorValue)) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setGovRegulatory(`${ commaSeparateNumber(ind86.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setGovRegulatory('0')
            }

            const ind575 = indicators.find(ind => ind.indicatorId === 575)
            if (ind575?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setPoliticalStability(`${ animateNumber(commaSeparateNumber(ind575.indicatorValue)) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setPoliticalStability(`${ commaSeparateNumber(ind575.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setPoliticalStability('0')
            }

            const ind481 = indicators.find(ind => ind.indicatorId === 481)
            if (ind481?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setRuleLaw(`${ animateNumber(commaSeparateNumber(ind481.indicatorValue)) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setRuleLaw(`${ commaSeparateNumber(ind481.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setRuleLaw('0')
            }

            const ind579 = indicators.find(ind => ind.indicatorId === 579)
            if (ind579?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setGovCompetitiveness(`${ animateNumber(commaSeparateNumber(ind579.indicatorValue)) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setGovCompetitiveness(`${ commaSeparateNumber(ind579.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setGovCompetitiveness('0')
            }

            const ind22 = indicators.find(ind => ind.indicatorId === 22)
            if (ind22?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setTradeFdi(`${ animateNumber(commaSeparateNumber(ind22.indicatorValue)) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setTradeFdi(`${ commaSeparateNumber(ind22.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setTradeFdi('0')
            }

            const ind239 = indicators.find(ind => ind.indicatorId === 239)
            if (ind239?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setTradeBalance(`$${ animateNumber(commaSeparateNumber(ind239.indicatorValue)) } Billion`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setTradeBalance(`$${ commaSeparateNumber(ind239.indicatorValue) } Billion`)
                    }
                    cont ++
                }, 20)
            } else {
                setTradeBalance('0')
            }

            const ind229 = indicators.find(ind => ind.indicatorId === 229)
            if (ind229?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setTradeBalanceLeft(`$${ animateNumber(commaSeparateNumber(ind229.indicatorValue)) } Billion`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setTradeBalanceLeft(`$${ commaSeparateNumber(ind229.indicatorValue) } Billion`)
                    }
                    cont ++
                }, 20)
            } else {
                setTradeBalanceLeft('0')
            }

            const ind231 = indicators.find(ind => ind.indicatorId === 231)
            if (ind231?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setTradeBalanceRight(`$${ animateNumber(commaSeparateNumber(ind231.indicatorValue)) } Billion`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setTradeBalanceRight(`$${ commaSeparateNumber(ind231.indicatorValue) } Billion`)
                    }
                    cont ++
                }, 20)
            } else {
                setTradeBalanceRight('0')
            }

            const ind838 = indicators.find(ind => ind.indicatorId === 838)
            if (ind838?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setGovFiscal(`${ animateNumber(commaSeparateNumber(ind838.indicatorValue)) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setGovFiscal(`${ commaSeparateNumber(ind838.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setGovFiscal('0')
            }

            const ind9 = indicators.find(ind => ind.indicatorId === 9)
            if (ind9?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setGovDebt(`${ animateNumber(commaSeparateNumber(ind9.indicatorValue)) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setGovDebt(`${ commaSeparateNumber(ind9.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setGovDebt('0')
            }

            const ind7 = indicators.find(ind => ind.indicatorId === 7)
            if (ind7?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setInflationIndex(`${ animateNumber(commaSeparateNumber(ind7.indicatorValue)) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setInflationIndex(`${ commaSeparateNumber(ind7.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setInflationIndex('0')
            }

            const ind967 = indicators.find(ind => ind.indicatorId === 967)
            if (ind967?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setCostLiving(`${ animateNumber(commaSeparateNumber(Math.floor(ind967.indicatorValue))) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setCostLiving(`${ commaSeparateNumber(Math.floor(ind967.indicatorValue)) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setCostLiving('0')
            }

            const ind184 = indicators.find(ind => ind.indicatorId === 184)
            if (ind184?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setHouseholdConsumption(`${ animateNumber(commaSeparateNumber(ind184.indicatorValue)) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setHouseholdConsumption(`${ commaSeparateNumber(ind184.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setHouseholdConsumption('0')
            }

            const ind241 = indicators.find(ind => ind.indicatorId === 241)
            if (ind241?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setHouseholdPieOne(`${ animateNumber(commaSeparateNumber(ind241.indicatorValue)) } billion USD`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setHouseholdPieOne(`${ commaSeparateNumber(ind241.indicatorValue) } billion USD`)
                    }
                    cont ++
                }, 20)
            } else {
                setHouseholdPieOne('0')
            }

            const ind669 = indicators.find(ind => ind.indicatorId === 669)
            if (ind669?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setGiniIndex(`${ animateNumber(commaSeparateNumber(ind669.indicatorValue)) } Gini Index`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setGiniIndex(`${ commaSeparateNumber(ind669.indicatorValue) } Gini Index`)
                    }
                    cont ++
                }, 20)
            } else {
                setGiniIndex('0')
            }

            const ind104 = indicators.find(ind => ind.indicatorId === 104)
            if (ind104?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setHouseholdHuman(`${ animateNumber(commaSeparateNumber(ind104.indicatorValue)) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setHouseholdHuman(`${ commaSeparateNumber(ind104.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setHouseholdHuman('0')
            }

            const ind674 = indicators.find(ind => ind.indicatorId === 674)
            if (ind674?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setPovertyRatio(`${ animateNumber(commaSeparateNumber(ind674.indicatorValue)) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setPovertyRatio(`${ commaSeparateNumber(ind674.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setPovertyRatio('0')
            }

            const ind672 = indicators.find(ind => ind.indicatorId === 672)
            if (ind672?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setPovertyRatio2(`${ animateNumber(commaSeparateNumber(ind672.indicatorValue)) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setPovertyRatio2(`${ commaSeparateNumber(ind672.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setPovertyRatio2('0')
            }

            const ind671 = indicators.find(ind => ind.indicatorId === 671)
            if (ind671?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setIncome(`${ animateNumber(commaSeparateNumber(ind671.indicatorValue)) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setIncome(`${ commaSeparateNumber(ind671.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setIncome('0')
            }

            const ind361 = indicators.find(ind => ind.indicatorId === 361)
            if (ind361?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setHappiness(`${ animateNumber(commaSeparateNumber(ind361.indicatorValue)) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setHappiness(`${ commaSeparateNumber(ind361.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setHappiness('0')
            }

            const ind474 = indicators.find(ind => ind.indicatorId === 474)
            if (ind474?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setForecastGrowth(`${ animateNumber(commaSeparateNumber(ind474.indicatorValue)) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setForecastGrowth(`${ commaSeparateNumber(ind474.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setForecastGrowth('0')
            }

            const ind475 = indicators.find(ind => ind.indicatorId === 475)
            if (ind475?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setForecastInflation(`${ animateNumber(commaSeparateNumber(ind475.indicatorValue)) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setForecastInflation(`${ commaSeparateNumber(ind475.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setForecastInflation('0')
            }

            const ind478 = indicators.find(ind => ind.indicatorId === 478)
            if (ind478?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setBudgetBalance(`${ animateNumber(commaSeparateNumber(ind478.indicatorValue)) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setBudgetBalance(`${ commaSeparateNumber(ind478.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setBudgetBalance('0')
            }

            const ind476 = indicators.find(ind => ind.indicatorId === 476)
            if (ind476?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setInvestmentForecast(`${ animateNumber(commaSeparateNumber(ind476.indicatorValue)) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setInvestmentForecast(`${ commaSeparateNumber(ind476.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setInvestmentForecast('0')
            }

            const ind477 = indicators.find(ind => ind.indicatorId === 477)
            if (ind477?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setForecastUnemployment(`${ animateNumber(commaSeparateNumber(ind477.indicatorValue)) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setForecastUnemployment(`${ commaSeparateNumber(ind477.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setForecastUnemployment('0')
            }

            const ind479 = indicators.find(ind => ind.indicatorId === 479)
            if (ind479?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setForecastCurrent(`${ animateNumber(commaSeparateNumber(ind479.indicatorValue)) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setForecastCurrent(`${ commaSeparateNumber(ind479.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setForecastCurrent('0')
            }

            const ind359 = indicators.find(ind => ind.indicatorId === 359)
            if (ind359?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setTradeOpenness(`${ animateNumber(commaSeparateNumber(ind359.indicatorValue)) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setTradeOpenness(`${ commaSeparateNumber(ind359.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setTradeOpenness('0')
            }

            const ind127 = indicators.find(ind => ind.indicatorId === 127)
            if (ind127?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setConnectivityPatent(`${ animateNumber(commaSeparateNumber(Math.floor(ind127.indicatorValue))) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setConnectivityPatent(`${ commaSeparateNumber(Math.floor(ind127.indicatorValue)) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setConnectivityPatent('0')
            }

            const ind128 = indicators.find(ind => ind.indicatorId === 128)
            if (ind128?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setRd(`${ animateNumber(commaSeparateNumber(ind128.indicatorValue)) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setRd(`${ commaSeparateNumber(ind128.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setRd('0')
            }

            const ind93 = indicators.find(ind => ind.indicatorId === 93)
            if (ind93?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setGlobalization(`${ animateNumber(commaSeparateNumber(ind93.indicatorValue)) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setGlobalization(`${ commaSeparateNumber(ind93.indicatorValue) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setGlobalization('0')
            }

            const ind118 = indicators.find(ind => ind.indicatorId === 118)
            if (ind118?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setInnovation(`${ animateNumber(commaSeparateNumber(Math.floor(ind118.indicatorValue))) }`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setInnovation(`${ commaSeparateNumber(Math.floor(ind118.indicatorValue)) }`)
                    }
                    cont ++
                }, 20)
            } else {
                setInnovation('0')
            }

            const ind125 = indicators.find(ind => ind.indicatorId === 125)
            if (ind125?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setHightech(`${ animateNumber(commaSeparateNumber(ind125.indicatorValue)) }%`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setHightech(`${ commaSeparateNumber(ind125.indicatorValue) }%`)
                    }
                    cont ++
                }, 20)
            } else {
                setHightech('0')
            }
        }
    }

    useEffect(() => {
        animateIndicators()
    }, [indicators])

    return {
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
    }
}
