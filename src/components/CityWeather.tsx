import { useEffect, useState } from 'react'
import { OpenWeatherResponse } from '../types/OpenWeatherTypes'
import CurrentWeather from './CurrentWeather'
import HourlyWeather from './HourlyWeather'
import DailyWeather from './DailyWeather'
import WeatherAlerts from './WeatherAlerts'
import request from '../utils/request'
import { GearIcon } from './WeatherIcon'
import { formatDate, wait } from '../utils/Date'
import './CityWeather.css'
import { requestMock } from '../utils/OpenWeatherMock'

type CityWeatherItemType = {
    city: CityOrPosition
    apiKey?: string
    refreshKey: number
    onDeleteCity: () => void
    onToggleCity: () => void
    onTopCity?: () => void
    onCityRefreshed: (success: boolean) => void
}

const RefreshedAt: React.FC<{ dt: number }> = ({ dt }) => {
    const d = formatDate(dt)
    return (
        <small className="RefreshedAt">
            refreshed at{' '}
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

const CityTitle: React.FC<{ city: CityOrPosition }> = ({ city }) => {
    if ('myposition' in city) {
        return <h1>My position</h1>
    }
    return (
        <h1>
            {city.label}{' '}
            <small title={city.country} tabIndex={0}>
                ({city.code})
            </small>
        </h1>
    )
}

const CityWeather: React.FC<CityWeatherItemType> = ({
    city,
    apiKey,
    refreshKey,
    onCityRefreshed,
    onDeleteCity,
    onToggleCity,
    onTopCity,
}) => {
    const [weather, setWeather] = useState<OpenWeatherResponse>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>()

    useEffect(() => {
        ;(async () => {
            if (!apiKey || !city.opened) {
                onCityRefreshed(true)
                return
            }

            try {
                setError(undefined)
                const { lat, lng } = await getCityOrMyPositionLatLng(city)
                const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&appid=${apiKey}&units=metric&lang=en`
                console.log('request url', url)

                const [data] = [
                    await request<OpenWeatherResponse>(url),
                    //await requestMock(url),
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
                <CityTitle city={city} />
                <div className="CityWeatherItemHeaderDetails">
                    <span>
                        <button onClick={onDeleteCity}>❌ delete</button>
                        <button onClick={onToggleCity}>
                            {city.opened ? '👻 hide' : '🔍 unhide'}
                        </button>
                        {onTopCity && (
                            <button onClick={onTopCity}>⬆️ top</button>
                        )}
                    </span>
                    {city.opened && weather && (
                        <RefreshedAt dt={weather.current.dt} />
                    )}
                </div>
            </div>
            {city.opened && loading && (
                <div className="CityWeatherLoading">
                    <GearIcon className="CityWeatherGear" />
                </div>
            )}
            {city.opened && error && (
                <p>
                    🔥 <strong>{error.message}</strong>
                </p>
            )}
            {city.opened && weather && (
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
                    <WeatherAlerts
                        dt={weather.current.dt}
                        alerts={weather.alerts}
                    />
                </div>
            )}
        </div>
    )
}

export default CityWeather
