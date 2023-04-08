import { useEffect, useState } from 'react'
import './CityWeather.css'
import { alert, OpenWeatherResponse } from '../types/OpenWeatherTypes'
import { requestMock } from '../utils/OpenWeatherMock'
import CurrentWeather from './CurrentWeather'
import HourlyWeather from './HourlyWeather'
import DailyWeather from './DailyWeather'
import WeatherAlerts from './WeatherAlerts'

type CityWeatherItemType = {
    city: City
    apiKey?: string
    refreshKey: number
    onDeleteCity: () => void
}

const RefreshedAt: React.FC<{ dt: number }> = ({ dt }) => (
    <small className="RefreshedAt">
        refreshed at {new Date(dt * 1000).toLocaleTimeString()}
    </small>
)

const CityWeather: React.FC<CityWeatherItemType> = ({
    city,
    onDeleteCity,
    apiKey,
    refreshKey,
}) => {
    const [weather, setWeather] = useState<OpenWeatherResponse>()
    const [alerts, setAlerts] = useState<alert[]>([])

    useEffect(() => {
        if (apiKey) {
            const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lng}&exclude=minutely&appid=${apiKey}&units=metric&lang=en`
            console.log('request url', url)

            //request<OpenWeatherResponse>(url).then((data) => {
            requestMock(url).then((data) => {
                setWeather(data)
                setAlerts(
                    (data?.alerts ?? []).filter(
                        (alert) =>
                            data.current.dt > alert.start &&
                            data.current.dt < alert.end
                    )
                )
            })
        }
    }, [city, apiKey, refreshKey, setWeather, setAlerts])

    return (
        <div className="CityWeatherItem">
            <div className="CityWeatherItemHeader">
                <h1>
                    {city.city}{' '}
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
            {weather && (
                <div>
                    <CurrentWeather current={weather.current} />
                    <HourlyWeather
                        hourly={weather.hourly}
                        listClassName="CityWeatherItemList"
                        itemClassName="CityWeatherItemItem"
                    />
                    <DailyWeather
                        daily={weather.daily}
                        listClassName="CityWeatherItemList"
                        itemClassName="CityWeatherItemItem"
                    />
                    <WeatherAlerts alerts={weather.alerts} />
                </div>
            )}
        </div>
    )
}

export default CityWeather
