import './CityWeather.css'
import { useCallback, useEffect, useState } from 'react'
import { OpenWeatherResponse } from '../types/OpenWeatherTypes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import fetchWeather from '../utils/fetchWeather'
import useConfig from '../utils/useConfig'
import CityTitle from './CityTitle'
import RefreshedAt from './RefreshedAt'
import useRefreshKey from '../utils/useRefreshKey'
import { CitySkeletonLight } from './CitySkeleton'
import { ReactComponent as ArrowUpSvg } from '../assets/arrow-up-circle-fill.svg'
import { ReactComponent as DashSvg } from '../assets/dash-circle-fill.svg'
import { ReactComponent as InfoSvg } from '../assets/info-circle.svg'
import { ReactComponent as RefreshSvg } from '../assets/arrow-clockwise.svg'
import CurrentWeather from './CurrentWeather'

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
    const { refreshKey, updateRefreshKey } = useRefreshKey()
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

    const navigageToOsmUrl = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            window.open(osmUrl)
        },
        [osmUrl]
    )

    return (
        <div className="CityWeatherItem" onClick={nativageToWeatherFull}>
            <div className="CityWeatherItemHeader">
                <CityTitle city={city} />
                <div>
                    {onTopCity && (
                        <button onClick={onTopCity} title={t('top')}>
                            <ArrowUpSvg />
                        </button>
                    )}
                    <button onClick={onDeleteCity} title={t('delete')}>
                        <DashSvg />
                    </button>
                    {osmUrl && (
                        <button onClick={navigageToOsmUrl} title={t('positionOnMap')}>
                            <InfoSvg />
                        </button>
                    )}
                    <button onClick={updateRefreshKey} title={t('refresh')}>
                        <RefreshSvg />
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
