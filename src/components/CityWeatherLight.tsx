import './CityWeather.css'
import { useCallback, useEffect, useState } from 'react'
import { OpenWeatherResponse } from '../types/OpenWeatherTypes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import fetchWeather from '../utils/fetchWeather'
import useConfig from '../utils/useConfig'
import CityTitle from './CityTitle'
import RefreshedAt from './RefreshedAt'
import CurrentWeather from './CurrentWeather'
import useRefreshKey from '../utils/useRefreshKey'
import { CitySkeletonLight } from './CitySkeleton'
import { ArrowUpIcon, DashIcon, InfoIcon, RefreshIcon } from './WeatherIcon'

type CityWeatherLightItemType = {
    city: CityOrPosition
    onDeleteCity: (e: React.MouseEvent) => void
    onTopCity?: (e: React.MouseEvent) => void
}

const CityWeatherLight: React.FC<CityWeatherLightItemType> = ({ city, onDeleteCity, onTopCity }) => {
    const [weather, setWeather] = useState<OpenWeatherResponse>()
    const [loading, setLoading] = useState<boolean>(true)
    const [osmUrl, setOsmUrl] = useState<string>()
    const [error, setError] = useState<Error>()
    const { apiKey } = useConfig()
    const { t, i18n } = useTranslation()
    const { refreshKey, updateRefreshKey } = useRefreshKey()
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            if (!apiKey) {
                return
            }
            try {
                setError(undefined)
                const { weatherData, weatherOsmUrl } = await fetchWeather(
                    city,
                    refreshKey,
                    apiKey,
                    i18n.language,
                    t('error')
                )
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

    const nativageToWeatherFull = useCallback(() => {
        navigate(`/city/${city.label}`)
    }, [city.label, navigate])

    const navigageToOsmUrl = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            window.open(osmUrl)
        },
        [osmUrl]
    )

    return (
        <div className="CityWeatherItem CityWeatherClick" onClick={nativageToWeatherFull} title={t('cityDetails')}>
            <div className="CityWeatherItemHeader">
                <CityTitle city={city} />
                <div>
                    {onTopCity && (
                        <button onClick={onTopCity} title={t('top')}>
                            <ArrowUpIcon />
                        </button>
                    )}
                    <button onClick={onDeleteCity} title={t('delete')}>
                        <DashIcon />
                    </button>
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
            {error && (
                <p>
                    🔥 <strong>{error.message}</strong>
                </p>
            )}
            {loading && <CitySkeletonLight />}
            {weather && <CurrentWeather current={weather.current} full={false} />}
            {weather && <RefreshedAt dt={weather.current.dt} />}
        </div>
    )
}

export default CityWeatherLight
