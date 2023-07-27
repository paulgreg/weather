import './CityWeather.css'
import { useEffect, useState } from 'react'
import { OpenWeatherResponse } from '../types/OpenWeatherTypes'
import CurrentWeather from './CurrentWeather'
import HourlyWeather from './HourlyWeather'
import DailyWeather from './DailyWeather'
import WeatherAlerts from './WeatherAlerts'
import request from '../utils/request'
import { GearIcon } from './WeatherIcon'
import { formatDate, wait } from '../utils/Date'
import { useTranslation } from 'react-i18next'
import { requestMock } from '../utils/OpenWeatherMock'

type CityWeatherItemType = {
    city: CityOrPosition
    apiKey?: string
    refreshKey: number
    onDeleteCity: () => void
    onTopCity?: () => void
    onCityRefreshed: (success: boolean) => void
}

const RefreshedAt: React.FC<{ dt: number }> = ({ dt }) => {
    const { t } = useTranslation()
    const d = formatDate(dt)
    return (
        <small className="RefreshedAt">
            {t('refreshedAt')}{' '}
            <strong>
                {d.hour}:{d.minute}
            </strong>{' '}
            ({d.date}/{d.month}/{d.year})
        </small>
    )
}
const getCurrentPosition = () =>
    new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10_000,
            enableHighAccuracy: true,
        })
    )

const getCityOrMyPositionLatLng = async (city: CityOrPosition) => {
    if ('myposition' in city) {
        const position = await getCurrentPosition()
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        return { lat, lng }
    }
    const { lat, lng } = city
    return Promise.resolve({ lat, lng })
}

const CityTitle: React.FC<{ city: CityOrPosition; osmUrl?: string }> = ({ city, osmUrl }) => {
    const { t } = useTranslation()
    if ('myposition' in city) {
        return (
            <h1>
                <a href={osmUrl} target="_blank">
                    {t('myPosition')}
                </a>
            </h1>
        )
    }
    return (
        <h1>
            <a href={osmUrl} target="_blank">
                {city.label}{' '}
                <small title={city.country} tabIndex={0}>
                    ({city.code})
                </small>
            </a>
        </h1>
    )
}

const CityWeather: React.FC<CityWeatherItemType> = ({
    city,
    apiKey,
    refreshKey,
    onCityRefreshed,
    onDeleteCity,
    onTopCity,
}) => {
    const [weather, setWeather] = useState<OpenWeatherResponse>()
    const [loading, setLoading] = useState<boolean>(true)
    const [osmUrl, setOsmUrl] = useState<string>()
    const [error, setError] = useState<any>()
    const { t, i18n } = useTranslation()
    const language = i18n.language

    useEffect(() => {
        ;(async () => {
            if (!apiKey) {
                onCityRefreshed(true)
                return
            }

            try {
                setError(undefined)
                const { lat, lng } = await getCityOrMyPositionLatLng(city)
                setOsmUrl(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=12`)
                const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&appid=${apiKey}&units=metric&lang=${language}`
                console.log('request url', url)

                const [data] = [
                    import.meta.env.PROD ? await request<OpenWeatherResponse>(url) : await requestMock(url),
                    await wait(500), // make request a little longer to display reloading
                ]

                setWeather(data)
                onCityRefreshed(true)
            } catch (e: unknown) {
                console.error(e)
                setError(e)
                onCityRefreshed(false)
            } finally {
                setLoading(false)
            }
        })()
    }, [refreshKey, city, apiKey])

    return (
        <div className="CityWeatherItem">
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
            {loading && (
                <div className="CityWeatherLoading">
                    <GearIcon className="CityWeatherGear" />
                </div>
            )}
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

export default CityWeather
