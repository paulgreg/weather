import './CityWeather.css'
import { useCallback, useEffect, useState } from 'react'
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
import { InfoIcon, RefreshIcon } from './WeatherIcon'

type CityWeatherFullItemType = {
    city: CityOrPosition
}

const CityWeatherFull: React.FC<CityWeatherFullItemType> = ({ city }) => {
    const [weather, setWeather] = useState<OpenWeatherResponse>()
    const [loading, setLoading] = useState<boolean>(true)
    const [osmUrl, setOsmUrl] = useState<string>()
    const [error, setError] = useState<Error>()
    const { refreshKey, updateRefreshKey } = useRefreshKey()
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
            } catch (error: unknown) {
                const e = error as Error
                console.error(e)
                setError(e)
            } finally {
                setLoading(false)
            }
        })()
    }, [city, apiKey, refreshKey, i18n.language, t])

    const navigageToOsmUrl = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            window.open(osmUrl)
        },
        [osmUrl]
    )

    return (
        <div className="CityWeatherItem">
            <div className="CityWeatherItemHeader">
                <CityTitle city={city} />
                <div>
                    {osmUrl && (
                        <button onClick={navigageToOsmUrl} title={t('positionOnMap')}>
                            <InfoIcon />
                        </button>
                    )}
                    <button onClick={updateRefreshKey} title={t('refresh')}>
                        <RefreshIcon />
                    </button>
                </div>
            </div>
            {loading && <CitySkeletonFull />}
            {error && (
                <p>
                    🔥 <strong>{error.message}</strong>
                </p>
            )}
            {weather && (
                <>
                    <CurrentWeather current={weather.current} full={true} />
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
                    <RefreshedAt dt={weather.current.dt} />
                </>
            )}
        </div>
    )
}

export default CityWeatherFull
