import './CityWeather.css'
import { useEffect, useState } from 'react'
import { OpenWeatherResponse } from '../types/OpenWeatherTypes'
import CurrentWeather from './CurrentWeather'
import HourlyWeather from './HourlyWeather'
import DailyWeather from './DailyWeather'
import WeatherAlerts from './WeatherAlerts'
import { useTranslation } from 'react-i18next'
import fetchWeather from '../utils/fetchWeather'
import useConfig from '../utils/useConfig'
import CityTitle from './CityTitle'
import RefreshedAt from './RefreshedAt'
import useRefreshKey from '../utils/useRefreshKey'
import { CitySkeletonFull } from './CitySkeleton'

type CityWeatherFullItemType = {
    city: CityOrPosition
}

const CityWeatherFull: React.FC<CityWeatherFullItemType> = ({ city }) => {
    const [weather, setWeather] = useState<OpenWeatherResponse>()
    const [loading, setLoading] = useState<boolean>(true)
    const [osmUrl, setOsmUrl] = useState<string>()
    const [error, setError] = useState<any>()
    const { refreshKey } = useRefreshKey()
    const { apiKey } = useConfig()
    const { t, i18n } = useTranslation()

    useEffect(() => {
        ;(async () => {
            if (!apiKey) {
                return
            }
            try {
                setError(undefined)
                const { weatherData, weatherOsmUrl } = await fetchWeather(city, refreshKey, apiKey, i18n.language)
                setOsmUrl(weatherOsmUrl)
                setWeather(weatherData)
            } catch (e: unknown) {
                console.error(e)
                setError(e)
            } finally {
                setLoading(false)
            }
        })()
    }, [city, apiKey, refreshKey])

    return (
        <div className="CityWeatherItem">
            <div className="CityWeatherItemHeader">
                <CityTitle city={city} osmUrl={osmUrl} />
                <div className="CityWeatherItemHeaderDetails">{weather && <RefreshedAt dt={weather.current.dt} />}</div>
            </div>
            {loading && <CitySkeletonFull />}
            {error && (
                <p>
                    🔥 <strong>{error.message}</strong>
                </p>
            )}
            {weather && (
                <div>
                    <CurrentWeather current={weather.current} />
                    <HourlyWeather
                        hourly={weather.hourly}
                        sunrise={weather.current.sunrise}
                        sunset={weather.current.sunset}
                        listClassName="CityWeatherItemList"
                        itemClassName="CityWeatherListItem"
                    />
                    <DailyWeather
                        daily={weather.daily}
                        listClassName="CityWeatherItemList"
                        itemClassName="CityWeatherListItem"
                    />
                    <WeatherAlerts dt={weather.current.dt} alerts={weather.alerts} />
                </div>
            )}
        </div>
    )
}

export default CityWeatherFull
