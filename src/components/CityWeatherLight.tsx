import './CityWeather.css'
import { useCallback, useEffect, useState } from 'react'
import { OpenWeatherResponse } from '../types/OpenWeatherTypes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { AnimatedWeatherIcon, ThermometerIcon, WeatherIconSize } from './WeatherIcon'
import fetchWeather from '../utils/fetchWeather'
import useConfig from '../utils/useConfig'
import CityTitle from './CityTitle'
import RefreshedAt from './RefreshedAt'
import Humidity from './Humidify'
import useRefreshKey from '../utils/useRefreshKey'
import { CitySkeletonLight } from './CitySkeleton'

type CityWeatherLightItemType = {
    city: CityOrPosition
    onDeleteCity: (e: React.MouseEvent) => void
    onTopCity?: (e: React.MouseEvent) => void
}

const CityWeatherLight: React.FC<CityWeatherLightItemType> = ({ city, onDeleteCity, onTopCity }) => {
    const [weather, setWeather] = useState<OpenWeatherResponse>()
    const [loading, setLoading] = useState<boolean>(true)
    const [osmUrl, setOsmUrl] = useState<string>()
    const [error, setError] = useState<any>()
    const { apiKey } = useConfig()
    const { t, i18n } = useTranslation()
    const { refreshKey } = useRefreshKey()
    const navigate = useNavigate()

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

    const nativageToWeatherFull = useCallback(() => {
        navigate(`/city/${city.label}`)
    }, [])

    return (
        <div className="CityWeatherItem" onClick={nativageToWeatherFull}>
            <div className="CityWeatherItemHeader">
                <CityTitle city={city} osmUrl={osmUrl} />
                <div className="CityWeatherItemHeaderDetails">
                    <span>
                        <button onClick={onDeleteCity}>❌ {t('delete')}</button>
                        {onTopCity && <button onClick={onTopCity}>⬆️ {t('top')}</button>}
                    </span>
                    {weather && <RefreshedAt dt={weather.current.dt} />}
                </div>
            </div>
            {error && (
                <p>
                    🔥 <strong>{error.message}</strong>
                </p>
            )}
            {loading && <CitySkeletonLight />}
            {weather && (
                <div className="CurrentWeather">
                    <div className="CurrentWeatherDesc">
                        <div className="CurrentWeatherTempAndFeelsLike">
                            <div className="CurrentWeatherRealTemp">
                                <ThermometerIcon size={WeatherIconSize.S} />
                                {Math.round(weather.current.temp)}°
                            </div>
                            <span>
                                {t('feelsLike')} {Math.round(weather.current.feels_like)}°
                            </span>
                        </div>
                        <div>
                            <Humidity humidity={weather.current.humidity} />
                        </div>
                        <div>
                            <h3>{t(weather.current.weather[0].main)}</h3>
                        </div>
                    </div>
                    <AnimatedWeatherIcon icon={weather.current.weather[0].icon} size={WeatherIconSize.L} />
                </div>
            )}
        </div>
    )
}

export default CityWeatherLight
