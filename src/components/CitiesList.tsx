import React, { useCallback, useEffect, useReducer, useState } from 'react'
import CityWeather from './CityWeather'

const RESET = 'RESET'
const CHILD_RESPONSE = 'RESP'

type CitiesListType = {
    cities: City[]
    apiKey?: string
    refreshKey: number
    onDeleteCity: (idx: number) => () => void
    onCitiesRefreshed: (success: boolean) => void
}

const CitiesList: React.FC<CitiesListType> = ({
    cities,
    apiKey,
    refreshKey,
    onCitiesRefreshed,
    onDeleteCity,
}) => {
    const [refreshCityKey, setRefreshCityKey] = useState<number>(Date.now())
    const [cityResfreshNb, setCityRefreshNb] = useState<boolean[]>([])

    const onRefreshedCallback = useCallback(
        (success: boolean) => {
            console.log('child refreshed, succes:', success)
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

    return (
        <section>
            {cities.map((city, idx) => (
                <CityWeather
                    key={`${city.label}-${city.lat}-${city.lng}-${idx}`}
                    apiKey={apiKey}
                    city={city}
                    refreshKey={refreshCityKey}
                    onDeleteCity={onDeleteCity(idx)}
                    onCityRefreshed={onRefreshedCallback}
                />
            ))}
        </section>
    )
}

export default CitiesList
