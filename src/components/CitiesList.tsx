import React, { useCallback, useEffect, useReducer, useState } from 'react'
import CityWeather from './CityWeather'

const RESET = 'RESET'
const CHILD_RESPONSE = 'RESP'

type CitiesListType = {
    cities: City[]
    apiKey?: string
    refreshKey: number
    onDeleteCity: (idx: number) => () => void
    onCitiesRefreshed: () => void
}

const CitiesList: React.FC<CitiesListType> = ({
    cities,
    apiKey,
    refreshKey,
    onCitiesRefreshed,
    onDeleteCity,
}) => {
    const [refreshCityKey, setRefreshCityKey] = useState<number>(Date.now())
    const [cityResfreshNb, setCityRefreshNb] = useState<number>(0)

    const onRefreshedCallback = useCallback(
        (success: boolean) => {
            console.log('child refreshed, succes:', success)
            setCityRefreshNb((nb) => nb + 1)
        },
        [setCityRefreshNb]
    )

    useEffect(() => {
        setCityRefreshNb(0)
        setRefreshCityKey(Date.now())
    }, [refreshKey])

    useEffect(() => {
        if (cityResfreshNb === cities.length) {
            onCitiesRefreshed()
        }
    }, [cityResfreshNb])

    return (
        <section>
            {cities.map((city, idx) => (
                <CityWeather
                    key={`${city.city}-${city.lat}-${city.lng}-${idx}`}
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
