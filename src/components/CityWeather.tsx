import { useEffect, useState } from 'react'
import { OpenWeatherResponse } from '../types/OpenWeatherTypes'
import CurrentWeather from './CurrentWeather'
import HourlyWeather from './HourlyWeather'
import DailyWeather from './DailyWeather'
import WeatherAlerts from './WeatherAlerts'
import request from '../utils/request'
import { GearIcon } from './WeatherIcon'
import './CityWeather.css'

type CityWeatherItemType = {
    city: City
    apiKey?: string
    refreshKey: number
    onCityRefreshed: (success: boolean) => void
    onDeleteCity: () => void
}

const RefreshedAt: React.FC<{ dt: number }> = ({ dt }) => (
    <small className="RefreshedAt">
        refreshed at {new Date(dt * 1000).toLocaleTimeString()}
    </small>
)

const CityWeather: React.FC<CityWeatherItemType> = ({
    city,
    apiKey,
    refreshKey,
    onCityRefreshed,
    onDeleteCity,
}) => {
    const [weather, setWeather] = useState<OpenWeatherResponse>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>()

    useEffect(() => {
        ;(async () => {
            if (apiKey) {
                const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lng}&exclude=minutely&appid=${apiKey}&units=metric&lang=en`
                console.log('request url', url)

                try {
                    setError(undefined)
                    const data = await request<OpenWeatherResponse>(url)
                    //const data = await requestMock(url)
                    setWeather(data)
                    onCityRefreshed(true)
                } catch (e: unknown) {
                    console.error(e)
                    setError(e)
                    onCityRefreshed(false)
                } finally {
                    setLoading(false)
                }
            }
        })()
    }, [refreshKey, city, apiKey, setWeather])

    return (
        <div className="CityWeatherItem">
            <div className="CityWeatherItemHeader">
                <h1>
                    {city.label}{' '}
                    <small title={city.country} tabIndex={0}>
                        ({city.code})
                    </small>
                </h1>
                <div className="CityWeatherItemHeaderDetails">
                    <span>
                        <button className="delete" onClick={onDeleteCity}>
                            ❌ delete
                        </button>
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
