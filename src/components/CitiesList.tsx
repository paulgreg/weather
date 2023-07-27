import { useCallback, useEffect, useReducer, useState } from 'react'
import CityWeather from './CityWeather'
import useCities from '../utils/useCities'
import useConfig from '../utils/useConfig'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const CitiesList = ({}) => {
    const { cities, onDeleteCity, onTopCity, onCitiesRefreshed, refreshKey } = useCities()
    const { apiKey } = useConfig()
    const [refreshCityKey, setRefreshCityKey] = useState<number>(Date.now())
    const [cityResfreshNb, setCityRefreshNb] = useState<boolean[]>([])
    const { t } = useTranslation()

    const onRefreshedCallback = useCallback((success: boolean) => {
        setCityRefreshNb((state) => state.concat(success))
    }, [])

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
        'myposition' in city ? 'myposition' : `${city.label}-${city.lat}-${city.lng}`

    return (
        <section>
            {cities.length === 0 && (
                <div className="instructions">
                    <Link to="/add" className="button">
                        {t('addCity')}
                    </Link>
                </div>
            )}
            {cities.map((city, idx) => (
                <CityWeather
                    key={buildKey(city)}
                    apiKey={apiKey}
                    city={city}
                    refreshKey={refreshCityKey}
                    onDeleteCity={onDeleteCity(idx)}
                    onTopCity={idx > 0 ? onTopCity(idx) : undefined}
                    onCityRefreshed={onRefreshedCallback}
                />
            ))}
        </section>
    )
}

export default CitiesList
