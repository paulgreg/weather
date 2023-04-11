import React, { useCallback, useEffect, useReducer, useState } from 'react'
import CityWeather from './CityWeather'

const RESET = 'RESET'
const CHILD_RESPONSE = 'RESP'

type CitiesListType = {
    cities: CityOrPosition[]
    apiKey?: string
    refreshKey: number
    onDeleteCity: (idx: number) => () => void
    onToggleCity: (idx: number) => () => void
    onTopCity: (idx: number) => () => void
    onCitiesRefreshed: (success: boolean) => void
}

const CitiesList: React.FC<CitiesListType> = ({
    cities,
    apiKey,
    refreshKey,
    onCitiesRefreshed,
    onDeleteCity,
    onToggleCity,
    onTopCity,
}) => {
    const [refreshCityKey, setRefreshCityKey] = useState<number>(Date.now())
    const [cityResfreshNb, setCityRefreshNb] = useState<boolean[]>([])

    const onRefreshedCallback = useCallback(
        (success: boolean) => {
            setCityRefreshNb((state) => state.concat(success))
        },
        [setCityRefreshNb]
    )

    useEffect(() => {
        setCityRefreshNb([])
        setRefreshCityKey(Date.now())
    }, [refreshKey])

    useEffect(() => {
        if (cityResfreshNb.length === cities.length) {
            const atLeastOneFailure = cityResfreshNb.find((success) => !success)
            onCitiesRefreshed(!atLeastOneFailure)
        }
    }, [cityResfreshNb])

    const buildKey = (city: CityOrPosition) =>
        'myposition' in city
            ? 'myposition'
            : `${city.label}-${city.lat}-${city.lng}`

    return (
        <section>
            {cities.map((city, idx) => (
                <CityWeather
                    key={buildKey(city)}
                    apiKey={apiKey}
                    city={city}
                    refreshKey={refreshCityKey}
                    onDeleteCity={onDeleteCity(idx)}
                    onToggleCity={onToggleCity(idx)}
                    onTopCity={idx > 0 ? onTopCity(idx) : undefined}
                    onCityRefreshed={onRefreshedCallback}
                />
            ))}
        </section>
    )
}

export default CitiesList
