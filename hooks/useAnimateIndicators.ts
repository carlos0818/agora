import { useEffect, useState } from 'react'

import animateNumber from '@/utils/animateNumber'
import commaSeparateNumber from '@/utils/formatNumber'
import { ICountry } from '@/interfaces'

export const useAnimateIndicators = (indicators: ICountry[]) => {
    const [landArea, setLandArea] = useState('0')

    const animateIndicators = () => {
        if (indicators.length > 0) {
            const ind = indicators.find(ind => ind.indicatorId === 378)
            if (ind?.indicatorId) {
                let cont = 0
                let interval = setInterval(() => {
                    setLandArea(`${ animateNumber(commaSeparateNumber(Math.floor(ind!.indicatorValue!))) } km²`)
                    if (cont === 50) {
                        clearInterval(interval)
                        setLandArea(`${ commaSeparateNumber(Math.floor(ind!.indicatorValue!)) } km²`)
                    }
                    cont ++
                }, 20)
            }
        }
    }

    useEffect(() => {
        animateIndicators()
    }, [indicators])

    return {
        landArea,
    }
}
